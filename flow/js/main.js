// main.js — playground wiring: editors in, animation out.

import { parseDot } from './dot.js';
import { buildScene } from './scene.js';
import { parseTimeline, bindTimeline, buildSchedule } from './timeline.js';
import { Player } from './player.js';
import { exportAnimatedSvg } from './export.js';
import { iconNames, iconMarkup } from './icons.js';
import { EXAMPLES } from './examples.js';

const $ = (id) => document.getElementById(id);

const stage = $('stage');
const captionEl = $('caption');
const dotsEl = $('step-dots');
const errorBox = $('error-box');
const dotInput = $('dot-input');
const timelineInput = $('timeline-input');
const exampleSelect = $('example-select');
const playBtn = $('btn-play');

let player = null;
let current = null; // { scene, schedule }

/* ------------------------------------------------------------------ */
/* Rendering                                                            */
/* ------------------------------------------------------------------ */

function render({ autoplay = true } = {}) {
  let scene;
  let schedule;
  try {
    const graph = parseDot(dotInput.value);
    scene = buildScene(graph);
    const timeline = parseTimeline(timelineInput.value);
    const bound = bindTimeline(timeline, scene);
    schedule = buildSchedule(bound, scene);
    errorBox.hidden = true;
  } catch (err) {
    errorBox.textContent = err.message;
    errorBox.hidden = false;
    return; // keep the last good render on stage
  }

  if (player) player.destroy();
  current = { scene, schedule };
  buildDots(schedule);
  player = new Player(stage, scene, schedule, { onUpdate: updateTransport });
  if (autoplay) player.play();
  else player.applyState();
}

function buildDots(schedule) {
  dotsEl.textContent = '';
  schedule.steps.forEach((step, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.title = step.caption || `Step ${i + 1}`;
    dot.setAttribute('aria-label', `Step ${i + 1}${step.caption ? `: ${step.caption}` : ''}`);
    dot.addEventListener('click', () => player && player.seekStep(i));
    dotsEl.appendChild(dot);
  });
}

function updateTransport(p) {
  captionEl.textContent = p.caption || ' ';
  playBtn.textContent = p.playing ? '⏸' : p.atEnd ? '⟲' : '▶';
  [...dotsEl.children].forEach((dot, i) => {
    dot.classList.toggle('is-current', i === p.stepIndex);
    dot.classList.toggle('is-done', i < p.stepIndex);
  });
}

/* ------------------------------------------------------------------ */
/* Controls                                                             */
/* ------------------------------------------------------------------ */

$('btn-play').addEventListener('click', () => player && player.toggle());
$('btn-restart').addEventListener('click', () => player && player.restart());
$('btn-prev').addEventListener('click', () => player && (player.pause(), player.prev()));
$('btn-next').addEventListener('click', () => player && (player.pause(), player.next()));
$('speed-select').addEventListener('change', (e) => player && player.setSpeed(parseFloat(e.target.value)));

$('btn-export').addEventListener('click', () => {
  if (!current) return;
  const svg = exportAnimatedSvg(current.scene, current.schedule);
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  const slug = (current.schedule.title || 'flow').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  a.download = `${slug || 'flow'}.svg`;
  a.click();
  URL.revokeObjectURL(a.href);
});

document.addEventListener('keydown', (e) => {
  if (e.target.matches('textarea, input, select')) return;
  if (e.key === ' ') { e.preventDefault(); player && player.toggle(); }
  if (e.key === 'ArrowRight') { player && (player.pause(), player.next()); }
  if (e.key === 'ArrowLeft') { player && (player.pause(), player.prev()); }
});

/* ------------------------------------------------------------------ */
/* Editors                                                              */
/* ------------------------------------------------------------------ */

let debounce = null;
const onEdit = () => {
  clearTimeout(debounce);
  debounce = setTimeout(() => render({ autoplay: false }), 450);
};
dotInput.addEventListener('input', onEdit);
timelineInput.addEventListener('input', onEdit);

for (const example of EXAMPLES) {
  const opt = document.createElement('option');
  opt.value = example.id;
  opt.textContent = example.label;
  exampleSelect.appendChild(opt);
}

function loadExample(id) {
  const example = EXAMPLES.find((e) => e.id === id) || EXAMPLES[0];
  dotInput.value = example.dot;
  timelineInput.value = example.timeline;
  render({ autoplay: true });
}

exampleSelect.addEventListener('change', () => loadExample(exampleSelect.value));

/* ------------------------------------------------------------------ */
/* Icon gallery                                                         */
/* ------------------------------------------------------------------ */

const gallery = $('icon-gallery');
for (const name of iconNames()) {
  const fig = document.createElement('figure');
  fig.innerHTML =
    `<svg viewBox="-24 -24 48 48" width="34" height="34" fill="none" stroke="currentColor" ` +
    `stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">` +
    `${iconMarkup(name)}</svg><figcaption>${name}</figcaption>`;
  gallery.appendChild(fig);
}

/* ------------------------------------------------------------------ */

const fromHash = location.hash.replace('#', '');
exampleSelect.value = EXAMPLES.some((e) => e.id === fromHash) ? fromHash : 'github-pr';
loadExample(exampleSelect.value);
