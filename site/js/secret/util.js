// util.js — tiny shared helpers for the hidden secret panels.
//
// The secret modules are loaded by BOTH views via site/js/konami.js. Because ES
// module imports resolve relative to the importing file (not the page), the same
// files work whether the host page is "/" (reading view) or "/present/" (deck).
// Only data fetched by URL needs a base prefix, computed from the page location.

export const IS_DECK = location.pathname.includes('/present/');

// Path prefix from the current page back to the repo root.
export const BASE = IS_DECK ? '../' : '';

export function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) {
    /* fall through */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch (e) {
    return false;
  }
}

export function formatTime(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (e) {
    return '';
  }
}

export function uid() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return 'c-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function prettyBytes(n) {
  if (!n && n !== 0) return '';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
