// store.js — localStorage-backed annotation store for the Comments panel.
//
// Comments are notes the user leaves on a specific slide (deck) or section
// (reading view). They live only in this browser. Both views read/write the
// same key, and a 'cli-comments-changed' event (plus the native cross-tab
// 'storage' event) lets any open panel re-render live.

import { uid } from './util.js';

const KEY = 'cli-agents-comments';

export function getComments() {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

function save(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch (e) {
    /* quota / disabled storage — ignore */
  }
  window.dispatchEvent(new CustomEvent('cli-comments-changed'));
}

export function addComment({ view, target, label, sceneId, text }) {
  const list = getComments();
  const item = {
    id: uid(),
    view: view || 'reading',
    target: target || '',
    label: label || '',
    sceneId: sceneId || '',
    text: (text || '').trim(),
    created: Date.now(),
    updated: Date.now(),
  };
  list.push(item);
  save(list);
  return item;
}

export function updateComment(id, text) {
  const list = getComments();
  const item = list.find((c) => c.id === id);
  if (!item) return;
  item.text = (text || '').trim();
  item.updated = Date.now();
  save(list);
}

export function deleteComment(id) {
  save(getComments().filter((c) => c.id !== id));
}

export function onCommentsChanged(handler) {
  window.addEventListener('cli-comments-changed', handler);
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) handler();
  });
}
