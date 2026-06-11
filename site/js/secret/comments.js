// comments.js — hidden "Comments" page plus the small add-note dialog.
//
// Notes are attached to the current slide/section and stored in this browser
// (see store.js). The panel aggregates every note, lets you jump back to its
// target, edit, or delete it, and copy them all out as JSON (handy since the
// store is per-browser). The add dialog is reachable from the secret menu's
// "Comment on this …" entry and from the composer at the top of the panel.

import { openPanel } from './panel.js';
import { pushOverlay, popOverlay } from './overlays.js';
import { escapeHtml, formatTime, copyText } from './util.js';
import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  onCommentsChanged,
} from './store.js';
import { getCurrentContext, jumpToTarget } from './context.js';

let dialogStyles = false;

function injectDialogStyles() {
  if (dialogStyles || document.getElementById('secret-comments-styles')) {
    dialogStyles = true;
    return;
  }
  dialogStyles = true;
  const style = document.createElement('style');
  style.id = 'secret-comments-styles';
  style.textContent = `
    .secret-dialog-overlay {
      position: fixed; inset: 0; z-index: 10001;
      display: flex; align-items: center; justify-content: center; padding: 1.5rem;
      background: color-mix(in oklch, #000 55%, transparent); backdrop-filter: blur(4px);
    }
    .secret-dialog {
      width: min(440px, 94vw);
      background: var(--bg, #161e2e); color: var(--fg, #f0e7d3);
      border: 1px solid color-mix(in oklch, var(--accent, #e8a87c) 55%, transparent);
      border-radius: 14px; padding: 1.4rem 1.4rem 1.1rem;
      box-shadow: 0 24px 80px rgba(0,0,0,0.55);
    }
    .secret-dialog__eyebrow {
      margin: 0 0 0.3rem; font-family: var(--mono, monospace); font-size: 0.68rem;
      letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent, #e8a87c);
    }
    .secret-dialog__ctx { margin: 0 0 0.8rem; font-size: 0.9rem; line-height: 1.4; }
    .secret-dialog__ctx code {
      font-family: var(--mono, monospace); font-size: 0.78rem;
      color: color-mix(in oklch, var(--fg,#f0e7d3) 65%, transparent);
    }
    .secret-dialog__row { display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 0.8rem; }
  `;
  document.head.appendChild(style);
}

export function openAddComment(context) {
  injectDialogStyles();
  const ctx = context || getCurrentContext();
  const overlay = document.createElement('div');
  overlay.className = 'secret-dialog-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Add a note');
  overlay.innerHTML = `
    <div class="secret-dialog">
      <p class="secret-dialog__eyebrow">New note</p>
      <p class="secret-dialog__ctx">On <strong>${escapeHtml(ctx.label)}</strong>
        ${ctx.target ? `<code>${escapeHtml(ctx.target)}</code>` : ''}</p>
      <textarea class="secret-textarea" placeholder="What do you want to remember about this ${escapeHtml(
        ctx.kind || 'item'
      )}?"></textarea>
      <div class="secret-dialog__row">
        <button class="secret-btn" data-cancel type="button">Cancel</button>
        <button class="secret-btn secret-btn--primary" data-save type="button">Save note</button>
      </div>
    </div>
  `;

  function close() {
    popOverlay(overlay);
    overlay.remove();
  }
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  overlay.querySelector('[data-cancel]').addEventListener('click', close);
  const ta = overlay.querySelector('.secret-textarea');
  const saveBtn = overlay.querySelector('[data-save]');
  const submit = () => {
    const text = ta.value.trim();
    if (!text) {
      ta.focus();
      return;
    }
    addComment({ ...ctx, text });
    close();
  };
  saveBtn.addEventListener('click', submit);
  ta.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') submit();
  });

  document.body.appendChild(overlay);
  pushOverlay(overlay, close);
  ta.focus({ preventScroll: true });
}

function noteEl(c) {
  const el = document.createElement('div');
  el.className = 'secret-note';
  el.dataset.id = c.id;
  el.innerHTML = `
    <div class="secret-note__head">
      <button class="secret-note__target" type="button" title="Jump to it">${escapeHtml(
        c.target || '—'
      )}</button>
      <span class="secret-note__label">${escapeHtml(c.label || '')}</span>
      <span class="secret-note__time">${escapeHtml(formatTime(c.created))}</span>
    </div>
    <p class="secret-note__text"></p>
    <div class="secret-note__actions">
      <button type="button" data-edit>Edit</button>
      <button type="button" data-del>Delete</button>
    </div>
  `;
  el.querySelector('.secret-note__text').textContent = c.text;
  el.querySelector('.secret-note__target').addEventListener('click', () =>
    jumpToTarget(c.target, c.view)
  );
  el.querySelector('[data-del]').addEventListener('click', () => {
    if (confirm('Delete this note?')) deleteComment(c.id);
  });
  el.querySelector('[data-edit]').addEventListener('click', () => beginEdit(el, c));
  return el;
}

function beginEdit(el, c) {
  const textP = el.querySelector('.secret-note__text');
  const actions = el.querySelector('.secret-note__actions');
  const ta = document.createElement('textarea');
  ta.className = 'secret-textarea';
  ta.value = c.text;
  textP.replaceWith(ta);
  actions.innerHTML = `
    <button type="button" data-save>Save</button>
    <button type="button" data-cancel>Cancel</button>
  `;
  ta.focus();
  actions.querySelector('[data-save]').addEventListener('click', () => {
    updateComment(c.id, ta.value);
  });
  actions.querySelector('[data-cancel]').addEventListener('click', () => render());
}

let bodyRef = null;
let statusRef = null;

function render() {
  if (!bodyRef) return;
  const list = getComments().slice().sort((a, b) => b.created - a.created);
  const ctx = getCurrentContext();

  bodyRef.innerHTML = `
    <div class="secret-composer">
      <p class="secret-composer__ctx">Add a note about <strong>${escapeHtml(
        ctx.label
      )}</strong> ${ctx.target ? `<code>${escapeHtml(ctx.target)}</code>` : ''}</p>
      <textarea class="secret-textarea" data-new placeholder="Type a note for this ${escapeHtml(
        ctx.kind || 'item'
      )}… (⌘/Ctrl+Enter to save)"></textarea>
      <div class="secret-composer__row">
        <button class="secret-btn secret-btn--primary" data-add type="button">Add note</button>
        <span style="margin-left:auto"></span>
        <button class="secret-btn" data-export type="button">Copy all as JSON</button>
      </div>
    </div>
    <div data-list></div>
  `;

  const listWrap = bodyRef.querySelector('[data-list]');
  if (!list.length) {
    listWrap.innerHTML =
      '<p class="secret-empty">No notes yet. They save to this browser only — add one above, or use the secret menu while on any slide or section.</p>';
  } else {
    const groups = { deck: [], reading: [] };
    list.forEach((c) => (groups[c.view === 'deck' ? 'deck' : 'reading'].push(c)));
    const sections = [
      ['deck', 'Deck slides'],
      ['reading', 'Reading sections'],
    ];
    sections.forEach(([key, heading]) => {
      if (!groups[key].length) return;
      const h = document.createElement('h3');
      h.className = 'secret-group-h';
      h.textContent = `${heading} — ${groups[key].length}`;
      listWrap.appendChild(h);
      groups[key].forEach((c) => listWrap.appendChild(noteEl(c)));
    });
  }

  const ta = bodyRef.querySelector('[data-new]');
  const addBtn = bodyRef.querySelector('[data-add]');
  const submit = () => {
    const text = ta.value.trim();
    if (!text) {
      ta.focus();
      return;
    }
    addComment({ ...ctx, text });
    ta.value = '';
  };
  addBtn.addEventListener('click', submit);
  ta.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') submit();
  });
  bodyRef.querySelector('[data-export]').addEventListener('click', async (e) => {
    const ok = await copyText(JSON.stringify(getComments(), null, 2));
    e.currentTarget.textContent = ok ? 'Copied!' : 'Copy failed';
    setTimeout(() => {
      e.currentTarget.textContent = 'Copy all as JSON';
    }, 1000);
  });

  if (statusRef) statusRef(`${list.length} note${list.length === 1 ? '' : 's'} in this browser`);
}

let wired = false;

export function openComments() {
  const { body, setStatus } = openPanel({
    eyebrow: 'Hidden page',
    title: 'Comments',
    subtitle: 'Notes you left on slides and sections — saved in this browser.',
  });
  bodyRef = body;
  statusRef = setStatus;

  // Re-render live as notes change. The handler is registered once and guards
  // on isConnected, so it harmlessly no-ops after the panel is closed.
  if (!wired) {
    onCommentsChanged(() => {
      if (bodyRef && bodyRef.isConnected) render();
    });
    wired = true;
  }

  render();
}
