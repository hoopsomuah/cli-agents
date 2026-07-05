// timeline.js — the narration DSL: parse, bind against a graph, schedule.
//
// The DSL is line-based; each non-empty line is one step. A step has actions,
// an optional caption after ":", and an optional duration override "@2.5s".
//
//   timeline "How a Pull Request works"
//
//   show origin                 : GitHub hosts the shared repository
//   origin ->> local            : git clone copies it to your machine  @2s
//   show local -> feature       : reveal an edge explicitly
//   highlight feature           : this is where the work happens
//   dim origin, local
//   show all                    : the whole picture at once
//
// Actions: show / hide / highlight / unhighlight / dim / undim <ref[, ref…]>,
// `a ->> b` (message pulse along the edge, mermaid-sequence flavored — works
// in reverse if only the opposite edge exists), and `pause`.
// A ref is a node id, `a->b` for an edge, or `all`.

const KEYWORDS = new Set(['show', 'hide', 'highlight', 'unhighlight', 'dim', 'undim', 'pause', 'wait']);
const PULSE_RE = /^([\w.-]+)\s*(?:->>|-->)\s*([\w.-]+)$/;
const EDGE_REF_RE = /^([\w.-]+)\s*->\s*([\w.-]+)$/;

export class TimelineError extends Error {
  constructor(message, line) {
    super(line ? `${message} (line ${line})` : message);
    this.line = line;
  }
}

export function parseTimeline(src) {
  const steps = [];
  let title = '';

  const lines = src.split('\n');
  for (let li = 0; li < lines.length; li++) {
    let line = lines[li].replace(/(?:\/\/|#).*$/, '').trim();
    if (!line) continue;

    const titleMatch = /^(?:timeline|title)\s+"([^"]*)"\s*$/.exec(line);
    if (titleMatch) { title = titleMatch[1]; continue; }

    let durOverride = null;
    const durMatch = /@\s*([\d.]+)\s*s?\s*$/.exec(line);
    if (durMatch) {
      durOverride = parseFloat(durMatch[1]);
      line = line.slice(0, durMatch.index).trim();
    }

    let caption = '';
    const colon = line.indexOf(':');
    if (colon !== -1) {
      caption = line.slice(colon + 1).trim();
      line = line.slice(0, colon).trim();
    }

    const actions = [];
    let currentVerb = null;
    for (const segment of line.split(',').map((s) => s.trim()).filter(Boolean)) {
      const pulse = PULSE_RE.exec(segment);
      if (pulse) {
        actions.push({ type: 'pulse', from: pulse[1], to: pulse[2], line: li + 1 });
        currentVerb = null;
        continue;
      }
      const word = segment.split(/\s+/)[0].toLowerCase();
      if (KEYWORDS.has(word)) {
        currentVerb = word === 'wait' ? 'pause' : word;
        const rest = segment.slice(segment.split(/\s+/)[0].length).trim();
        if (currentVerb === 'pause') {
          actions.push({ type: 'pause', line: li + 1 });
        } else if (rest) {
          actions.push({ type: currentVerb, ref: rest, line: li + 1 });
        } else {
          throw new TimelineError(`"${word}" needs a target`, li + 1);
        }
        continue;
      }
      if (currentVerb && currentVerb !== 'pause') {
        actions.push({ type: currentVerb, ref: segment, line: li + 1 });
        continue;
      }
      throw new TimelineError(`Cannot parse "${segment}"`, li + 1);
    }

    if (!actions.length && !caption) continue;
    if (!actions.length) actions.push({ type: 'pause', line: li + 1 });
    steps.push({ actions, caption, durOverride, line: li + 1 });
  }
  return { title, steps };
}

/* ------------------------------------------------------------------ */
/* Binding: resolve refs against the laid-out graph.                   */
/* ------------------------------------------------------------------ */

function findEdge(layout, from, to) {
  return layout.edges.find((e) => e.from === from && e.to === to) || null;
}

function resolveRef(layout, ref, line) {
  if (ref === 'all') return { kind: 'all' };
  const edgeRef = EDGE_REF_RE.exec(ref);
  if (edgeRef) {
    const edge = findEdge(layout, edgeRef[1], edgeRef[2]);
    if (!edge) throw new TimelineError(`No edge "${edgeRef[1]} -> ${edgeRef[2]}" in the graph`, line);
    return { kind: 'edge', key: edge.key };
  }
  if (!layout.nodes.some((n) => n.id === ref)) {
    throw new TimelineError(`No node "${ref}" in the graph`, line);
  }
  return { kind: 'node', id: ref };
}

/**
 * Bind parsed timeline refs to the layout, expanding `all` and resolving
 * pulse direction (a pulse can travel an edge backwards: `b ->> a` on an
 * a->b edge animates the return trip).
 */
export function bindTimeline(timeline, layout) {
  const allNodes = layout.nodes.map((n) => ({ kind: 'node', id: n.id }));
  const allEdges = layout.edges.map((e) => ({ kind: 'edge', key: e.key }));

  const steps = timeline.steps.map((step) => {
    const actions = [];
    for (const a of step.actions) {
      if (a.type === 'pause') { actions.push({ type: 'pause' }); continue; }
      if (a.type === 'pulse') {
        let edge = findEdge(layout, a.from, a.to);
        let reverse = false;
        if (!edge) {
          edge = findEdge(layout, a.to, a.from);
          reverse = true;
        }
        if (!edge) {
          throw new TimelineError(`No edge between "${a.from}" and "${a.to}" to pulse`, a.line);
        }
        actions.push({ type: 'pulse', key: edge.key, reverse });
        continue;
      }
      const target = resolveRef(layout, a.ref, a.line);
      if (target.kind === 'all') {
        const pool = a.type === 'show' || a.type === 'hide' ? [...allNodes, ...allEdges] : allNodes;
        for (const t of pool) actions.push({ type: a.type, target: t });
      } else {
        actions.push({ type: a.type, target });
      }
    }
    return { ...step, actions };
  });
  return { title: timeline.title, steps };
}

/* ------------------------------------------------------------------ */
/* Scheduling: absolute times for every action.                        */
/* ------------------------------------------------------------------ */

const STEP_GAP = 0.35;
const SHOW_DUR = 0.7;
const SHOW_STAGGER = 0.14;
const PULSE_DUR = 1.5;
const FX_DUR = 0.45;
const PAUSE_DUR = 1.4;
const IMPLICIT_SHOW_DUR = 0.4;

/**
 * Turn a bound timeline into an absolute schedule the player and the SVG
 * exporter both consume. Pulsing or highlighting something that is still
 * hidden auto-reveals it (and a revealed edge auto-reveals its endpoints),
 * so timelines only narrate what matters.
 */
export function buildSchedule(bound, layout) {
  const edgeByKey = new Map(layout.edges.map((e) => [e.key, e]));
  const visible = new Set(); // node ids and edge keys
  const steps = [];
  let t = 0;

  for (const step of bound.steps) {
    const t0 = t;
    const timed = [];
    let showIdx = 0;

    const revealNode = (id, at) => {
      if (visible.has(id)) return;
      visible.add(id);
      timed.push({ type: 'show', kind: 'node', id, at, dur: IMPLICIT_SHOW_DUR });
    };
    const revealEdge = (key, at, dur) => {
      const edge = edgeByKey.get(key);
      revealNode(edge.from, at);
      revealNode(edge.to, at);
      if (visible.has(key)) return;
      visible.add(key);
      timed.push({ type: 'show', kind: 'edge', key, at, dur });
    };

    for (const a of step.actions) {
      if (a.type === 'pause') {
        timed.push({ type: 'pause', at: t0, dur: step.durOverride || PAUSE_DUR });
        continue;
      }
      if (a.type === 'pulse') {
        revealEdge(a.key, t0, IMPLICIT_SHOW_DUR);
        const dur = step.durOverride ? Math.max(0.6, step.durOverride - 0.2) : PULSE_DUR;
        timed.push({ type: 'pulse', key: a.key, reverse: a.reverse, at: t0 + 0.15, dur });
        continue;
      }
      const { target } = a;
      if (a.type === 'show') {
        const at = t0 + showIdx * SHOW_STAGGER;
        if (target.kind === 'node') {
          if (!visible.has(target.id)) {
            visible.add(target.id);
            timed.push({ type: 'show', kind: 'node', id: target.id, at, dur: SHOW_DUR });
            showIdx++;
          }
        } else if (!visible.has(target.key)) {
          revealEdge(target.key, at, SHOW_DUR);
          showIdx++;
        }
        continue;
      }
      if (a.type === 'hide') {
        visible.delete(target.kind === 'node' ? target.id : target.key);
        timed.push({ type: 'hide', ...target, at: t0, dur: FX_DUR });
        continue;
      }
      // highlight / unhighlight / dim / undim — highlighting something hidden
      // reveals it first.
      if ((a.type === 'highlight' || a.type === 'dim') && target.kind === 'node') {
        revealNode(target.id, t0);
      }
      timed.push({ type: a.type, ...target, at: t0, dur: FX_DUR });
    }

    const end = timed.reduce((m, a) => Math.max(m, a.at + a.dur), t0 + 0.5);
    const dur = step.durOverride ? Math.max(step.durOverride, end - t0) : end - t0;
    steps.push({ t0, dur, caption: step.caption, actions: timed });
    t = t0 + dur + STEP_GAP;
  }

  return { title: bound.title, steps, total: steps.length ? t - STEP_GAP : 0 };
}
