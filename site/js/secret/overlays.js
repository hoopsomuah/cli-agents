// overlays.js — a tiny stacking registry for the secret menu, panels and dialogs.
//
// Every secret surface (the Konami menu, a full-screen panel, a small dialog)
// registers itself here on open and unregisters on close. konami.js's capture
// keydown handler consults this registry so that:
//   * Escape always closes the top-most surface first, and
//   * keys never leak through to the view behind an open surface
//     (e.g. the deck advancing slides while a panel covers it).

const stack = [];

function sync() {
  document.documentElement.toggleAttribute('data-secret-open', stack.length > 0);
}

export function pushOverlay(el, closeFn) {
  el.__secretClose = closeFn;
  stack.push(el);
  sync();
}

export function popOverlay(el) {
  const i = stack.indexOf(el);
  if (i >= 0) stack.splice(i, 1);
  sync();
}

export function topOverlay() {
  return stack.length ? stack[stack.length - 1] : null;
}

export function anyOverlayOpen() {
  return stack.length > 0;
}

export function closeTopOverlay() {
  const el = topOverlay();
  if (el && typeof el.__secretClose === 'function') el.__secretClose();
}
