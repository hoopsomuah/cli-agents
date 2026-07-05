// layout.js — dependency-free layered DAG layout (a small Sugiyama-style pass).
//
// Input: the graph from dot.js. Output: node centers, curved edge paths with
// precomputed lengths (numeric, so the module works without a DOM), and the
// overall drawing extent. rankdir=LR (default) or TB.

const MAIN_GAP = 210;   // distance between ranks along the flow axis
const CROSS_GAP = 130;  // distance between siblings within a rank
const MARGIN = 80;
const NODE_R = 30;      // trim radius at the source of an edge
const ARROW_ROOM = 42;  // trim radius at the target (leaves room for the arrowhead)

function ranksByLongestPath(graph) {
  const ids = graph.nodes.map((n) => n.id);
  const out = new Map(ids.map((id) => [id, []]));

  // DFS cycle check — back edges are ignored for ranking so an accidental
  // cycle degrades gracefully instead of hanging.
  const state = new Map(ids.map((id) => [id, 0]));
  const rankEdges = [];
  const adj = new Map(ids.map((id) => [id, []]));
  for (const e of graph.edges) {
    if (e.from !== e.to) adj.get(e.from).push(e);
  }
  const visit = (id) => {
    state.set(id, 1);
    for (const e of adj.get(id)) {
      if (state.get(e.to) === 1) continue; // back edge
      rankEdges.push(e);
      if (state.get(e.to) === 0) visit(e.to);
    }
    state.set(id, 2);
  };
  for (const id of ids) if (state.get(id) === 0) visit(id);

  for (const e of rankEdges) out.get(e.from).push(e.to);

  const rank = new Map(ids.map((id) => [id, 0]));
  // Relax in declaration order until stable; graphs here are tiny.
  let changed = true;
  let guard = ids.length + 2;
  while (changed && guard-- > 0) {
    changed = false;
    for (const e of rankEdges) {
      if (rank.get(e.to) < rank.get(e.from) + 1) {
        rank.set(e.to, rank.get(e.from) + 1);
        changed = true;
      }
    }
  }
  return rank;
}

function orderWithinRanks(graph, rank) {
  const layers = [];
  for (const node of graph.nodes) {
    const r = rank.get(node.id);
    (layers[r] = layers[r] || []).push(node.id);
  }

  const pos = new Map();
  const sync = () => layers.forEach((layer) => layer.forEach((id, i) => pos.set(id, i)));
  sync();

  const preds = new Map(graph.nodes.map((n) => [n.id, []]));
  const succs = new Map(graph.nodes.map((n) => [n.id, []]));
  for (const e of graph.edges) {
    if (e.from === e.to) continue;
    succs.get(e.from).push(e.to);
    preds.get(e.to).push(e.from);
  }

  const barycenter = (id, neighbors) => {
    const ns = neighbors.get(id);
    if (!ns.length) return pos.get(id);
    return ns.reduce((sum, n) => sum + pos.get(n), 0) / ns.length;
  };

  for (let sweep = 0; sweep < 6; sweep++) {
    const downward = sweep % 2 === 0;
    const neighbors = downward ? preds : succs;
    const indices = downward
      ? layers.map((_, i) => i)
      : layers.map((_, i) => layers.length - 1 - i);
    for (const li of indices) {
      layers[li].sort((a, b) => barycenter(a, neighbors) - barycenter(b, neighbors));
      sync();
    }
  }
  return layers;
}

function cubicPoint(p0, c1, c2, p3, t) {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * p3.y,
  };
}

function bezierLength(p0, c1, c2, p3) {
  let len = 0;
  let prev = p0;
  for (let i = 1; i <= 48; i++) {
    const p = cubicPoint(p0, c1, c2, p3, i / 48);
    len += Math.hypot(p.x - prev.x, p.y - prev.y);
    prev = p;
  }
  return len;
}

function routeEdge(a, b, horizontal) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const p0 = { x: a.x + ux * NODE_R, y: a.y + uy * NODE_R };
  const p3 = { x: b.x - ux * ARROW_ROOM, y: b.y - uy * ARROW_ROOM };

  const along = horizontal ? Math.abs(dx) : Math.abs(dy);
  let c1;
  let c2;
  if (along < 24) {
    // Same rank — bow sideways so the edge doesn't overlap the nodes.
    const bow = 64;
    if (horizontal) {
      c1 = { x: p0.x + bow, y: p0.y + (p3.y - p0.y) * 0.2 };
      c2 = { x: p3.x + bow, y: p3.y - (p3.y - p0.y) * 0.2 };
    } else {
      c1 = { x: p0.x + (p3.x - p0.x) * 0.2, y: p0.y + bow };
      c2 = { x: p3.x - (p3.x - p0.x) * 0.2, y: p3.y + bow };
    }
  } else {
    const pull = Math.max(48, along * 0.45);
    if (horizontal) {
      const s = Math.sign(dx) || 1;
      c1 = { x: p0.x + pull * s, y: p0.y };
      c2 = { x: p3.x - pull * s, y: p3.y };
    } else {
      const s = Math.sign(dy) || 1;
      c1 = { x: p0.x, y: p0.y + pull * s };
      c2 = { x: p3.x, y: p3.y - pull * s };
    }
  }

  const mid = cubicPoint(p0, c1, c2, p3, 0.5);
  const nearEnd = cubicPoint(p0, c1, c2, p3, 0.97);
  const angle = (Math.atan2(p3.y - nearEnd.y, p3.x - nearEnd.x) * 180) / Math.PI;

  const fmt = (n) => Math.round(n * 10) / 10;
  return {
    d: `M ${fmt(p0.x)} ${fmt(p0.y)} C ${fmt(c1.x)} ${fmt(c1.y)}, ${fmt(c2.x)} ${fmt(c2.y)}, ${fmt(p3.x)} ${fmt(p3.y)}`,
    len: bezierLength(p0, c1, c2, p3),
    end: p3,
    endAngle: angle,
    mid,
  };
}

/**
 * Lay out the graph. Returns:
 * { rankdir, width, height,
 *   nodes: [{ id, attrs, x, y }],
 *   edges: [{ key, from, to, attrs, d, len, end, endAngle, mid }] }
 */
export function layoutGraph(graph) {
  const rankdir = (graph.attrs.rankdir || 'LR').toUpperCase();
  const horizontal = rankdir !== 'TB';

  const rank = ranksByLongestPath(graph);
  const layers = orderWithinRanks(graph, rank);

  const maxLayerSize = Math.max(1, ...layers.map((l) => l.length));
  const crossExtent = (maxLayerSize - 1) * CROSS_GAP;

  const centers = new Map();
  layers.forEach((layer, li) => {
    const main = MARGIN + li * MAIN_GAP;
    layer.forEach((id, i) => {
      const cross = MARGIN + crossExtent / 2 + (i - (layer.length - 1) / 2) * CROSS_GAP;
      centers.set(id, horizontal ? { x: main, y: cross } : { x: cross, y: main });
    });
  });

  const mainExtent = MARGIN * 2 + (layers.length - 1) * MAIN_GAP;
  const crossFull = MARGIN * 2 + crossExtent;

  const nodes = graph.nodes.map((n) => ({ id: n.id, attrs: n.attrs, ...centers.get(n.id) }));
  const edges = graph.edges.map((e, i) => {
    const routed = routeEdge(centers.get(e.from), centers.get(e.to), horizontal);
    return { key: `${e.from}->${e.to}#${i}`, from: e.from, to: e.to, attrs: e.attrs, ...routed };
  });

  return {
    rankdir,
    horizontal,
    width: horizontal ? mainExtent : crossFull,
    height: horizontal ? crossFull + 30 : mainExtent, // +30: room for labels under the last row
    nodes,
    edges,
  };
}
