// panel.js — the full-screen "hidden page" host shared by every secret panel.
//
// openPanel() returns a { root, body, setStatus, close } handle. The panel is a
// fixed, palette-aware surface (role="dialog") layered above the menu. It injects
// a single stylesheet the first time it is used; that sheet also covers the
// gallery, comments and content-model panels plus the small add-comment dialog,
// so the individual panel modules stay markup-only.

import { pushOverlay, popOverlay } from './overlays.js';
import { escapeHtml } from './util.js';

let stylesInjected = false;

export function injectPanelStyles() {
  if (stylesInjected || document.getElementById('secret-panel-styles')) {
    stylesInjected = true;
    return;
  }
  stylesInjected = true;
  const style = document.createElement('style');
  style.id = 'secret-panel-styles';
  style.textContent = `
    .secret-panel {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      background: var(--bg, #12182a);
      color: var(--fg, #f0e7d3);
      animation: secret-fade 160ms ease both;
    }
    .secret-panel__bar {
      display: flex;
      align-items: baseline;
      gap: 0.9rem;
      flex-wrap: wrap;
      padding: 1.1rem clamp(1rem, 4vw, 2.4rem) 0.9rem;
      border-bottom: 1px solid color-mix(in oklch, var(--fg, #f0e7d3) 14%, transparent);
      background: color-mix(in oklch, var(--bg, #12182a) 86%, transparent);
    }
    .secret-panel__eyebrow {
      margin: 0;
      font-family: var(--mono, ui-monospace, monospace);
      font-size: 0.68rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--accent, #e8a87c);
    }
    .secret-panel__title {
      margin: 0;
      font-family: var(--serif, Georgia, serif);
      font-size: clamp(1.4rem, 3.2vw, 2rem);
      line-height: 1.05;
    }
    .secret-panel__subtitle {
      margin: 0;
      font-size: 0.92rem;
      color: color-mix(in oklch, var(--fg, #f0e7d3) 66%, transparent);
    }
    .secret-panel__status {
      margin-left: auto;
      font-family: var(--mono, ui-monospace, monospace);
      font-size: 0.74rem;
      color: color-mix(in oklch, var(--fg, #f0e7d3) 60%, transparent);
      min-height: 1em;
    }
    .secret-panel__close {
      flex: none;
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 50%;
      border: 1px solid color-mix(in oklch, var(--fg, #f0e7d3) 22%, transparent);
      background: transparent;
      color: inherit;
      font-size: 1.3rem;
      line-height: 1;
      cursor: pointer;
      align-self: center;
    }
    .secret-panel__close:hover { background: color-mix(in oklch, var(--fg, #f0e7d3) 12%, transparent); }
    .secret-panel__body {
      flex: 1;
      overflow: auto;
      padding: clamp(1rem, 3vw, 2rem) clamp(1rem, 4vw, 2.4rem) 4rem;
    }
    .secret-empty {
      max-width: 36rem;
      margin: 3rem auto;
      text-align: center;
      font-family: var(--serif, Georgia, serif);
      font-style: italic;
      font-size: 1.05rem;
      color: color-mix(in oklch, var(--fg, #f0e7d3) 72%, transparent);
    }

    /* shared toolbar (search / toggles) */
    .secret-toolbar {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      flex-wrap: wrap;
      margin: 0 0 1.2rem;
    }
    .secret-input, .secret-textarea {
      font: inherit;
      color: inherit;
      background: color-mix(in oklch, var(--fg, #f0e7d3) 6%, transparent);
      border: 1px solid color-mix(in oklch, var(--fg, #f0e7d3) 20%, transparent);
      border-radius: 8px;
      padding: 0.5rem 0.7rem;
    }
    .secret-input { min-width: 14rem; }
    .secret-input:focus, .secret-textarea:focus {
      outline: none;
      border-color: color-mix(in oklch, var(--accent, #e8a87c) 70%, transparent);
    }
    .secret-textarea { width: 100%; min-height: 4.5rem; resize: vertical; line-height: 1.45; }
    .secret-chipbtn {
      font: inherit;
      font-size: 0.82rem;
      color: inherit;
      cursor: pointer;
      padding: 0.45rem 0.8rem;
      border-radius: 999px;
      border: 1px solid color-mix(in oklch, var(--fg, #f0e7d3) 20%, transparent);
      background: transparent;
    }
    .secret-chipbtn:hover { background: color-mix(in oklch, var(--fg, #f0e7d3) 10%, transparent); }
    .secret-chipbtn.is-on {
      background: color-mix(in oklch, var(--accent, #e8a87c) 22%, transparent);
      border-color: color-mix(in oklch, var(--accent, #e8a87c) 60%, transparent);
    }
    .secret-btn {
      font: inherit;
      font-size: 0.86rem;
      cursor: pointer;
      padding: 0.5rem 0.95rem;
      border-radius: 8px;
      border: 1px solid color-mix(in oklch, var(--fg, #f0e7d3) 20%, transparent);
      background: color-mix(in oklch, var(--fg, #f0e7d3) 6%, transparent);
      color: inherit;
    }
    .secret-btn:hover { background: color-mix(in oklch, var(--fg, #f0e7d3) 14%, transparent); }
    .secret-btn--primary {
      background: color-mix(in oklch, var(--accent, #e8a87c) 80%, var(--bg, #12182a));
      border-color: transparent;
      color: #1a1208;
      font-weight: 600;
    }
    .secret-btn--danger:hover {
      background: color-mix(in oklch, #c14a3a 30%, transparent);
      border-color: color-mix(in oklch, #c14a3a 60%, transparent);
    }

    /* gallery */
    .secret-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1rem;
    }
    .secret-tile {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid color-mix(in oklch, var(--fg, #f0e7d3) 14%, transparent);
      background: color-mix(in oklch, var(--fg, #f0e7d3) 4%, transparent);
    }
    .secret-tile__frame {
      position: relative;
      aspect-ratio: 16 / 10;
      background:
        repeating-conic-gradient(color-mix(in oklch, var(--fg,#f0e7d3) 8%, transparent) 0% 25%, transparent 0% 50%)
        50% / 18px 18px;
      cursor: zoom-in;
      border: none;
      padding: 0;
      width: 100%;
    }
    .secret-tile__frame img {
      width: 100%; height: 100%;
      object-fit: contain;
      display: block;
    }
    .secret-tile__meta { padding: 0 0.6rem 0.6rem; }
    .secret-tile__name {
      font-family: var(--mono, ui-monospace, monospace);
      font-size: 0.72rem;
      word-break: break-all;
      background: none; border: none; color: inherit; cursor: copy; padding: 0; text-align: left;
    }
    .secret-tile__name:hover { color: var(--accent, #e8a87c); }
    .secret-badges { display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: 0.35rem; }
    .secret-badge {
      font-family: var(--mono, ui-monospace, monospace);
      font-size: 0.62rem;
      padding: 0.08rem 0.4rem;
      border-radius: 999px;
      background: color-mix(in oklch, var(--accent, #e8a87c) 20%, transparent);
      color: color-mix(in oklch, var(--fg, #f0e7d3) 85%, transparent);
    }
    .secret-badge--unused {
      background: color-mix(in oklch, #c14a3a 22%, transparent);
    }
    .secret-section-h {
      margin: 2rem 0 1rem;
      font-family: var(--mono, ui-monospace, monospace);
      font-size: 0.72rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: color-mix(in oklch, var(--fg, #f0e7d3) 60%, transparent);
    }

    /* lightbox */
    .secret-lightbox {
      position: fixed; inset: 0; z-index: 10002;
      display: flex; flex-direction: column;
      background: color-mix(in oklch, #000 82%, transparent);
      backdrop-filter: blur(6px);
      animation: secret-fade 140ms ease both;
    }
    .secret-lightbox__img { flex: 1; min-height: 0; padding: 1.5rem; display: flex; align-items: center; justify-content: center; }
    .secret-lightbox__img img { max-width: 100%; max-height: 100%; object-fit: contain; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
    .secret-lightbox__bar {
      display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap;
      padding: 0.8rem 1.4rem; background: color-mix(in oklch, #000 40%, transparent);
      color: #f0e7d3;
      font-family: var(--mono, ui-monospace, monospace); font-size: 0.78rem;
    }

    /* comments */
    .secret-composer {
      border: 1px solid color-mix(in oklch, var(--fg, #f0e7d3) 16%, transparent);
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 1.5rem;
      background: color-mix(in oklch, var(--fg, #f0e7d3) 4%, transparent);
    }
    .secret-composer__ctx { font-size: 0.85rem; margin: 0 0 0.6rem; }
    .secret-composer__row { display: flex; gap: 0.5rem; margin-top: 0.6rem; align-items: center; flex-wrap: wrap; }
    .secret-note {
      border-left: 3px solid color-mix(in oklch, var(--accent, #e8a87c) 70%, transparent);
      padding: 0.7rem 0.9rem;
      margin: 0 0 0.8rem;
      border-radius: 0 8px 8px 0;
      background: color-mix(in oklch, var(--fg, #f0e7d3) 4%, transparent);
    }
    .secret-note__head { display: flex; gap: 0.6rem; align-items: baseline; flex-wrap: wrap; margin-bottom: 0.35rem; }
    .secret-note__target {
      font-family: var(--mono, ui-monospace, monospace);
      font-size: 0.72rem; cursor: pointer; color: var(--accent, #e8a87c);
      background: none; border: none; padding: 0;
    }
    .secret-note__target:hover { text-decoration: underline; }
    .secret-note__label { font-size: 0.86rem; color: color-mix(in oklch, var(--fg,#f0e7d3) 80%, transparent); }
    .secret-note__time { margin-left: auto; font-size: 0.7rem; color: color-mix(in oklch, var(--fg,#f0e7d3) 50%, transparent); }
    .secret-note__text { margin: 0; line-height: 1.5; white-space: pre-wrap; }
    .secret-note__actions { display: flex; gap: 0.4rem; margin-top: 0.5rem; }
    .secret-note__actions button {
      font: inherit; font-size: 0.74rem; cursor: pointer; background: none;
      border: none; color: color-mix(in oklch, var(--fg,#f0e7d3) 60%, transparent); padding: 0.1rem 0.3rem;
    }
    .secret-note__actions button:hover { color: var(--fg, #f0e7d3); text-decoration: underline; }
    .secret-group-h { font-family: var(--serif, Georgia, serif); font-size: 1.1rem; margin: 1.4rem 0 0.7rem; }

    /* content model tree */
    .secret-tree { font-size: 0.92rem; }
    .secret-tree__act { margin: 0 0 1.4rem; }
    .secret-tree__act-h { font-family: var(--serif, Georgia, serif); font-size: 1.25rem; margin: 0 0 0.2rem; }
    .secret-tree__act-id { font-family: var(--mono, ui-monospace, monospace); font-size: 0.7rem; color: color-mix(in oklch, var(--fg,#f0e7d3) 55%, transparent); }
    .secret-tree__scene {
      margin: 0.6rem 0 0.6rem 1rem;
      padding: 0.6rem 0 0.6rem 1rem;
      border-left: 2px solid color-mix(in oklch, var(--fg,#f0e7d3) 16%, transparent);
    }
    .secret-tree__scene-h { display: flex; gap: 0.6rem; align-items: baseline; flex-wrap: wrap; }
    .secret-tree__num { font-family: var(--mono, ui-monospace, monospace); font-size: 0.72rem; color: var(--accent,#e8a87c); }
    .secret-tree__name { font-weight: 600; }
    .secret-tree__files { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.4rem; }
    .secret-file {
      font-family: var(--mono, ui-monospace, monospace);
      font-size: 0.68rem;
      padding: 0.12rem 0.5rem;
      border-radius: 6px;
      border: 1px solid color-mix(in oklch, var(--fg,#f0e7d3) 16%, transparent);
      color: color-mix(in oklch, var(--fg,#f0e7d3) 82%, transparent);
      cursor: pointer;
      background: none;
    }
    .secret-file:hover { border-color: color-mix(in oklch, var(--accent,#e8a87c) 60%, transparent); }
    .secret-file--content { color: var(--accent, #e8a87c); }
    .secret-legend {
      max-width: 46rem; margin: 0 0 1.6rem; padding: 0.9rem 1.1rem;
      border-radius: 10px; line-height: 1.5; font-size: 0.9rem;
      background: color-mix(in oklch, var(--fg,#f0e7d3) 5%, transparent);
    }

    @keyframes secret-fade { from { opacity: 0; } to { opacity: 1; } }
    @media (prefers-reduced-motion: reduce) {
      .secret-panel, .secret-lightbox { animation: none; }
    }
  `;
  document.head.appendChild(style);
}

export function openPanel({ eyebrow = 'Secret', title = '', subtitle = '' } = {}) {
  injectPanelStyles();
  const root = document.createElement('div');
  root.className = 'secret-panel';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', title || 'Secret panel');
  root.innerHTML = `
    <div class="secret-panel__bar">
      <div>
        <p class="secret-panel__eyebrow">${escapeHtml(eyebrow)}</p>
        <h2 class="secret-panel__title">${escapeHtml(title)}</h2>
        ${subtitle ? `<p class="secret-panel__subtitle">${escapeHtml(subtitle)}</p>` : ''}
      </div>
      <p class="secret-panel__status" aria-live="polite"></p>
      <button class="secret-panel__close" type="button" aria-label="Close panel">×</button>
    </div>
    <div class="secret-panel__body"></div>
  `;

  function close() {
    popOverlay(root);
    root.remove();
  }

  root.querySelector('.secret-panel__close').addEventListener('click', close);
  document.body.appendChild(root);
  pushOverlay(root, close);

  const body = root.querySelector('.secret-panel__body');
  const statusEl = root.querySelector('.secret-panel__status');
  const setStatus = (t) => {
    statusEl.textContent = t || '';
  };

  root.querySelector('.secret-panel__close').focus({ preventScroll: true });
  return { root, body, setStatus, close };
}
