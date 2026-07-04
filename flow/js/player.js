// player.js — builds the SVG scene in the page and plays the schedule.
//
// The player is a pure function of time: every frame recomputes the visible
// state from the schedule at the current clock, which makes seeking (step
// dots, prev/next) trivial and keeps playback and scrubbing on one code path.

const SVG_NS = 'http://www.w3.org/2000/svg';
const EPS = 1e-4;

const easeOutCubic = (t) => 1 - (1 - t) ** 3;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
const easeOutBack = (t) => 1 + 2.2 * (t - 1) ** 3 + 1.2 * (t - 1) ** 2;

function el(tag, attrs = {}, parent = null) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (parent) parent.appendChild(node);
  return node;
}

export class Player {
  /**
   * @param {Element} stage    container for the generated <svg>
   * @param {object} scene     from buildScene()
   * @param {object} schedule  from buildSchedule()
   * @param {object} opts      { onUpdate(player) } fired on every state change
   */
  constructor(stage, scene, schedule, opts = {}) {
    this.stage = stage;
    this.scene = scene;
    this.schedule = schedule;
    this.onUpdate = opts.onUpdate || (() => {});
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.time = 0;
    this.speed = 1;
    this.playing = false;
    this.rafId = null;
    this.lastTs = null;

    this.build();
    this.applyState();
  }

  /* ---------------------------------------------------------------- */
  /* Scene construction                                                */
  /* ---------------------------------------------------------------- */

  build() {
    this.stage.textContent = '';
    const { width, height } = this.scene;
    this.svg = el('svg', {
      class: 'flow-svg',
      viewBox: `0 0 ${width} ${height}`,
      role: 'img',
      'aria-label': this.schedule.title || 'Animated workflow diagram',
    }, this.stage);

    const edgeLayer = el('g', {}, this.svg);
    const nodeLayer = el('g', {}, this.svg);
    this.pulseLayer = el('g', {}, this.svg);

    this.edgeEls = new Map();
    for (const edge of this.scene.edges) {
      const g = el('g', { class: 'flow-edge' }, edgeLayer);
      const path = el('path', { class: 'flow-edge-path', d: edge.d, fill: 'none' }, g);
      const arrow = el('polygon', {
        class: 'flow-arrow',
        points: '11,0 -3,5.5 -3,-5.5',
        transform: `translate(${edge.end.x} ${edge.end.y}) rotate(${edge.endAngle.toFixed(1)})`,
      }, g);
      let label = null;
      if (edge.label) {
        label = el('text', {
          class: 'flow-edge-label',
          x: edge.mid.x,
          y: edge.mid.y - 10,
          'text-anchor': 'middle',
        }, g);
        label.textContent = edge.label;
      }
      this.edgeEls.set(edge.key, { edge, g, path, arrow, label, len: edge.len });
    }

    this.nodeEls = new Map();
    for (const node of this.scene.nodes) {
      const g = el('g', { class: 'flow-node' }, nodeLayer);
      const at = el('g', { transform: `translate(${node.x} ${node.y})` }, g);
      const ring = el('circle', { class: 'flow-ring', r: 36 }, at);
      const pop = el('g', { class: 'flow-pop' }, at);
      const icon = el('g', { class: 'flow-icon' }, pop);
      icon.innerHTML = node.iconMarkup;
      const label = el('text', { class: 'flow-label', 'text-anchor': 'middle' }, pop);
      node.labelLines.forEach((lineText, i) => {
        const tspan = el('tspan', { x: 0, y: 42 + i * 15 }, label);
        tspan.textContent = lineText;
      });
      this.nodeEls.set(node.id, { node, g, ring, pop });
    }

    // Path lengths need the element in the document.
    for (const entry of this.edgeEls.values()) {
      entry.len = entry.path.getTotalLength();
      entry.path.setAttribute('stroke-dasharray', entry.len);
    }

    this.pulseEls = new Map();
  }

  pulseEl(id) {
    if (!this.pulseEls.has(id)) {
      const g = el('g', { class: 'flow-pulse' }, this.pulseLayer);
      el('circle', { class: 'flow-pulse-halo', r: 12 }, g);
      el('circle', { class: 'flow-pulse-dot', r: 6 }, g);
      this.pulseEls.set(id, g);
    }
    return this.pulseEls.get(id);
  }

  /* ---------------------------------------------------------------- */
  /* State as a function of time                                       */
  /* ---------------------------------------------------------------- */

  computeState() {
    const T = this.time;
    const nodes = new Map(this.scene.nodes.map((n) => [n.id, { vis: 0, hl: 0, dim: 0 }]));
    const edges = new Map(this.scene.edges.map((e) => [e.key, { vis: 0, hl: 0, dim: 0 }]));
    const pulses = [];
    let caption = '';
    let stepIndex = -1;

    this.schedule.steps.forEach((step, si) => {
      if (T >= step.t0 - EPS) {
        stepIndex = si;
        if (step.caption) caption = step.caption;
      }
      step.actions.forEach((a, ai) => {
        let p = a.dur > 0 ? (T - a.at) / a.dur : T >= a.at ? 1 : 0;
        if (p <= 0) return;
        p = Math.min(1, p);
        if (this.reduced) p = 1;
        const state = a.kind === 'edge' || a.type === 'pulse'
          ? edges.get(a.key)
          : a.id !== undefined ? nodes.get(a.id) : null;
        switch (a.type) {
          case 'show': state.vis = Math.max(state.vis, p); break;
          case 'hide': state.vis = Math.min(state.vis, 1 - p); break;
          case 'highlight':
            state.hl = Math.max(state.hl, p);
            state.dim = Math.min(state.dim, 1 - p);
            break;
          case 'unhighlight': state.hl = Math.min(state.hl, 1 - p); break;
          case 'dim': state.dim = Math.max(state.dim, p); break;
          case 'undim': state.dim = Math.min(state.dim, 1 - p); break;
          case 'pulse': {
            const live = !this.reduced && T >= a.at && T < a.at + a.dur;
            if (live) pulses.push({ id: `${si}:${ai}`, key: a.key, reverse: a.reverse, p: (T - a.at) / a.dur });
            if (this.reduced && T >= a.at && T < a.at + a.dur + 0.4) state.hl = 1;
            break;
          }
          case 'pause': break;
          default: break;
        }
      });
    });

    return { nodes, edges, pulses, caption, stepIndex };
  }

  applyState() {
    const state = this.computeState();

    for (const [id, entry] of this.nodeEls) {
      const s = state.nodes.get(id);
      const opacity = s.vis * (1 - 0.78 * s.dim);
      entry.g.style.opacity = opacity.toFixed(3);
      entry.g.style.display = opacity <= 0.001 ? 'none' : '';
      const scale = this.reduced ? 1 : 0.55 + 0.45 * easeOutBack(Math.min(1, s.vis));
      entry.pop.setAttribute('transform', `scale(${scale.toFixed(3)})`);
      entry.ring.style.opacity = s.hl.toFixed(3);
    }

    for (const [key, entry] of this.edgeEls) {
      const s = state.edges.get(key);
      const draw = easeInOutCubic(Math.min(1, s.vis));
      entry.path.setAttribute('stroke-dashoffset', (entry.len * (1 - draw)).toFixed(1));
      const opacity = (s.vis > 0 ? 1 : 0) * (1 - 0.78 * s.dim);
      entry.g.style.opacity = opacity.toFixed(3);
      entry.g.style.display = opacity <= 0.001 ? 'none' : '';
      const tail = Math.max(0, (draw - 0.65) / 0.35);
      entry.arrow.style.opacity = tail.toFixed(3);
      if (entry.label) entry.label.style.opacity = tail.toFixed(3);
      entry.g.classList.toggle('is-hot', s.hl > 0.5);
    }

    const active = new Set();
    for (const pulse of state.pulses) {
      active.add(pulse.id);
      const g = this.pulseEl(pulse.id);
      const entry = this.edgeEls.get(pulse.key);
      const t = easeInOutCubic(Math.min(1, Math.max(0, pulse.p)));
      const at = entry.path.getPointAtLength((pulse.reverse ? 1 - t : t) * entry.len);
      g.setAttribute('transform', `translate(${at.x.toFixed(1)} ${at.y.toFixed(1)})`);
      const fade = Math.min(1, pulse.p / 0.08, (1 - pulse.p) / 0.08);
      g.style.opacity = Math.max(0, fade).toFixed(3);
      g.style.display = '';
    }
    for (const [id, g] of this.pulseEls) {
      if (!active.has(id)) g.style.display = 'none';
    }

    this.caption = state.caption;
    this.stepIndex = state.stepIndex;
    this.onUpdate(this);
  }

  /* ---------------------------------------------------------------- */
  /* Transport                                                         */
  /* ---------------------------------------------------------------- */

  get total() { return this.schedule.total; }
  get atEnd() { return this.time >= this.total - EPS; }

  play() {
    if (this.playing) return;
    if (this.atEnd) this.time = 0;
    this.playing = true;
    this.lastTs = null;
    const tick = (ts) => {
      if (!this.playing) return;
      if (this.lastTs !== null) {
        this.time = Math.min(this.total, this.time + ((ts - this.lastTs) / 1000) * this.speed);
      }
      this.lastTs = ts;
      if (this.atEnd) this.playing = false;
      this.applyState();
      if (this.playing) this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
    this.applyState();
  }

  pause() {
    this.playing = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.applyState();
  }

  toggle() { this.playing ? this.pause() : this.play(); }

  restart() {
    this.time = 0;
    this.applyState();
    this.play();
  }

  /** Jump to a step. Paused: land on the step's finished state so the result
   *  is visible. Playing: land on its start so it plays through. */
  seekStep(i) {
    const step = this.schedule.steps[i];
    if (!step) return;
    this.time = this.playing ? step.t0 : Math.min(this.total, step.t0 + step.dur);
    this.applyState();
  }

  next() { this.seekStep(Math.min(this.schedule.steps.length - 1, this.stepIndex + 1)); }
  prev() { this.seekStep(Math.max(0, this.stepIndex - 1)); }

  setSpeed(v) { this.speed = v; }

  destroy() {
    this.pause();
    this.stage.textContent = '';
  }
}
