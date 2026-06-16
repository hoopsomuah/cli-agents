// context.js — figure out which slide (deck) or section (reading view) is
// currently in focus, so a new comment can be attached to it and the secret
// menu can label its "comment on this …" entry.

import { IS_DECK } from './util.js';

export function getCurrentContext() {
  if (IS_DECK) {
    const slides = Array.from(document.querySelectorAll('#stage .slide'));
    const current = document.querySelector('#stage .slide.is-current') || slides[0] || null;
    const idx = current ? slides.indexOf(current) : 0;
    const sceneId = (current && current.getAttribute('data-scene-id')) || '';
    const titleEl =
      current &&
      current.querySelector(
        '.slide__title, .slide__act-title, .slide__cover-title, .slide__quote-text, .slide__banner'
      );
    let label = `Slide ${idx + 1}`;
    const titleText = titleEl && titleEl.textContent.trim();
    if (titleText) label = `Slide ${idx + 1} · ${titleText.slice(0, 60)}`;
    else if (sceneId) label = `Slide ${idx + 1} · ${sceneId}`;
    return { view: 'deck', target: `#${idx + 1}`, label, sceneId, kind: 'slide' };
  }

  const scenes = Array.from(document.querySelectorAll('section.scene'));
  let best = null;
  let bestDist = Infinity;
  for (const s of scenes) {
    const r = s.getBoundingClientRect();
    if (r.bottom < 40) continue; // already scrolled past
    const dist = Math.abs(r.top - 90);
    if (dist < bestDist) {
      bestDist = dist;
      best = s;
    }
  }
  if (best) {
    const title =
      (best.querySelector('.scene__title') &&
        best.querySelector('.scene__title').textContent.trim()) ||
      best.id;
    const sceneId = best.id.replace('scene-', '');
    return { view: 'reading', target: `#${best.id}`, label: title, sceneId, kind: 'section' };
  }
  return { view: 'reading', target: '', label: 'Top of page', sceneId: '', kind: 'section' };
}

// Navigate the host view to a saved comment's target.
export function jumpToTarget(target, view) {
  if (!target) return;
  if (view === 'deck' && !IS_DECK) {
    // Comment was left in the deck but we're in the reading view (or vice
    // versa). Hash still means different things, so just no-op gracefully.
  }
  if (target.startsWith('#')) {
    // Re-assigning the same hash won't fire hashchange; clear then set.
    if (location.hash === target) location.hash = '';
    location.hash = target;
    const el = document.getElementById(target.slice(1));
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
