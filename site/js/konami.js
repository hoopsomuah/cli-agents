// konami.js — a hidden "secret menu" easter egg, shared by both views.
//
// Listens for the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) and pops a small
// overlay menu with a few playful, on-theme toggles. Fully self-contained:
// it injects its own stylesheet and reuses the existing palette/mode tokens
// so it drops into the reading view and the deck identically, with no edits
// to either view's CSS. Nothing here touches content/ — it is pure chrome.
//
// It also hosts three hidden "pages" reachable from the menu: an Image Library,
// a Comments board, and a Content Model viewer. Those live in ./secret/*.

import { openGallery } from './secret/gallery.js';
import { openComments, openAddComment } from './secret/comments.js';
import { openModel } from './secret/model.js';
import { getCurrentContext } from './secret/context.js';
import {
  pushOverlay,
  popOverlay,
  topOverlay,
  anyOverlayOpen,
  closeTopOverlay,
} from './secret/overlays.js';

const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const PALETTE_KEY = 'cli-agents-palette';
const MODE_KEY = 'cli-agents-mode';
const PALETTE_IDS = ['editorial', 'ink', 'solar', 'forest', 'slate', 'rose', 'ocean', 'sunset'];

const KOANS = [
  'Everything is a file. Even the things that are not.',
  'The terminal is patient. It has waited sixty years for you.',
  'A pipe is just a polite way for two programs to gossip.',
  'There are 10 kinds of people: those who read this menu, and those who do not.',
  'rm -rf is forever. The cloud forgets nothing else.',
  'The fastest shortcut is the one you do not have to reach for.',
  'A green cursor blinking in the dark is the oldest form of optimism.',
];

let progress = 0;
let menuEl = null;
let lastFocus = null;
let rainCanvas = null;
let rainRAF = 0;

// ---------- styles (injected once) ----------

function injectStyles() {
  if (document.getElementById('konami-styles')) return;
  const style = document.createElement('style');
  style.id = 'konami-styles';
  style.textContent = `
    .konami-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      background: color-mix(in oklch, #000 62%, transparent);
      backdrop-filter: blur(4px);
      animation: konami-fade 180ms ease both;
    }
    .konami-card {
      position: relative;
      width: min(440px, 92vw);
      max-height: 88vh;
      overflow: auto;
      border-radius: 14px;
      padding: 1.75rem 1.75rem 1.5rem;
      background: var(--bg, #161e2e);
      color: var(--fg, #f0e7d3);
      border: 1px solid color-mix(in oklch, var(--accent, #e8a87c) 55%, transparent);
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
      animation: konami-pop 220ms cubic-bezier(0.2, 0.9, 0.3, 1.3) both;
    }
    .konami-eyebrow {
      margin: 0 0 0.35rem;
      font-family: var(--mono, ui-monospace, monospace);
      font-size: 0.7rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent, #e8a87c);
    }
    .konami-title {
      margin: 0 0 0.25rem;
      font-family: var(--serif, Georgia, serif);
      font-size: 1.7rem;
      line-height: 1.1;
    }
    .konami-code {
      margin: 0 0 1.25rem;
      font-family: var(--mono, ui-monospace, monospace);
      font-size: 0.85rem;
      color: color-mix(in oklch, var(--fg, #f0e7d3) 65%, transparent);
    }
    .konami-actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .konami-group-label {
      margin: 1.1rem 0 0.5rem;
      font-family: var(--mono, ui-monospace, monospace);
      font-size: 0.64rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: color-mix(in oklch, var(--fg, #f0e7d3) 50%, transparent);
    }
    .konami-group-label:first-of-type { margin-top: 0.5rem; }
    .konami-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      padding: 0.7rem 0.9rem;
      border-radius: 9px;
      border: 1px solid color-mix(in oklch, var(--fg, #f0e7d3) 16%, transparent);
      background: color-mix(in oklch, var(--fg, #f0e7d3) 5%, transparent);
      color: inherit;
      font: inherit;
      font-size: 0.98rem;
      text-align: left;
      cursor: pointer;
      transition: transform 90ms ease, background 120ms ease, border-color 120ms ease;
    }
    .konami-btn:hover,
    .konami-btn:focus-visible {
      background: color-mix(in oklch, var(--accent, #e8a87c) 18%, transparent);
      border-color: color-mix(in oklch, var(--accent, #e8a87c) 60%, transparent);
      transform: translateY(-1px);
      outline: none;
    }
    .konami-btn__icon { font-size: 1.2rem; flex: none; width: 1.6rem; text-align: center; }
    .konami-btn__label { flex: 1; }
    .konami-btn__hint {
      font-family: var(--mono, ui-monospace, monospace);
      font-size: 0.72rem;
      color: color-mix(in oklch, var(--fg, #f0e7d3) 55%, transparent);
    }
    .konami-note {
      margin: 1rem 0 0;
      min-height: 1.2em;
      font-family: var(--serif, Georgia, serif);
      font-style: italic;
      font-size: 0.95rem;
      color: color-mix(in oklch, var(--fg, #f0e7d3) 80%, transparent);
    }
    .konami-close {
      position: absolute;
      top: 0.6rem;
      right: 0.7rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      border: none;
      background: transparent;
      color: inherit;
      font-size: 1.3rem;
      line-height: 1;
      cursor: pointer;
      opacity: 0.7;
    }
    .konami-close:hover { opacity: 1; }
    .konami-rain {
      position: fixed;
      inset: 0;
      z-index: 9998;
      pointer-events: none;
      opacity: 0.55;
    }
    @keyframes konami-fade { from { opacity: 0; } to { opacity: 1; } }
    @keyframes konami-pop {
      from { opacity: 0; transform: translateY(12px) scale(0.96); }
      to   { opacity: 1; transform: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      .konami-overlay, .konami-card { animation: none; }
    }
  `;
  document.head.appendChild(style);
}

// ---------- palette helpers (reuse existing tokens) ----------

function shuffleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute('data-palette');
  let next = current;
  while (next === current) {
    next = PALETTE_IDS[Math.floor(Math.random() * PALETTE_IDS.length)];
  }
  const mode = Math.random() < 0.5 ? 'light' : 'dark';
  root.setAttribute('data-palette', next);
  root.setAttribute('data-mode', mode);
  try {
    localStorage.setItem(PALETTE_KEY, next);
    localStorage.setItem(MODE_KEY, mode);
  } catch (e) {}
  const label = next.charAt(0).toUpperCase() + next.slice(1);
  setNote(`Theme shuffled → ${label} · ${mode === 'dark' ? 'Dark' : 'Light'}`);
}

// ---------- matrix rain ----------

function reducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function toggleRain() {
  if (rainCanvas) {
    stopRain();
    setNote('Matrix rain off.');
    return;
  }
  startRain();
  setNote(reducedMotion() ? 'Matrix rain (still frame — reduced motion).' : 'Wake up, Neo…');
}

function startRain() {
  const canvas = document.createElement('canvas');
  canvas.className = 'konami-rain';
  document.body.appendChild(canvas);
  rainCanvas = canvas;
  const ctx = canvas.getContext('2d');
  const glyphs = 'アイウエオカキクケコｱｲｳｴｵ0123456789ABCDEF<>/$#&*'.split('');
  let cols = 0;
  let drops = [];
  const fontSize = 16;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / fontSize);
    drops = new Array(cols).fill(0).map(() => Math.random() * -50);
  }
  resize();
  canvas.__resize = resize;
  window.addEventListener('resize', resize);

  const accent = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent').trim() || '#7fff9f';

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = accent;
    ctx.font = `${fontSize}px monospace`;
    for (let i = 0; i < drops.length; i++) {
      const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
      ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    rainRAF = requestAnimationFrame(draw);
  }

  if (reducedMotion()) {
    // One static frame instead of an animation.
    ctx.fillStyle = accent;
    ctx.font = `${fontSize}px monospace`;
    for (let i = 0; i < cols; i++) {
      for (let y = 0; y < canvas.height; y += fontSize * 2) {
        if (Math.random() > 0.7) {
          ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], i * fontSize, y);
        }
      }
    }
  } else {
    draw();
  }
}

function stopRain() {
  if (rainRAF) cancelAnimationFrame(rainRAF);
  rainRAF = 0;
  if (rainCanvas) {
    if (rainCanvas.__resize) window.removeEventListener('resize', rainCanvas.__resize);
    rainCanvas.remove();
    rainCanvas = null;
  }
}

// ---------- koan ----------

function speakKoan() {
  const koan = KOANS[Math.floor(Math.random() * KOANS.length)];
  setNote(`“${koan}”`);
}

// ---------- menu ----------

function setNote(text) {
  if (!menuEl) return;
  const note = menuEl.querySelector('.konami-note');
  if (note) note.textContent = text;
}

const TOOLS = [
  {
    icon: '🖼️',
    label: 'Image library',
    hint: 'browse assets',
    run: () => openPanelFromMenu(openGallery),
  },
  {
    icon: '💬',
    label: 'Comments',
    hint: 'notes board',
    run: () => openPanelFromMenu(openComments),
  },
  {
    icon: '🗺️',
    label: 'Content model',
    hint: 'repo map',
    run: () => openPanelFromMenu(openModel),
  },
  {
    icon: '📝',
    label: 'Comment on this view',
    hint: 'add note',
    dynamic: true,
    run: () => {
      const ctx = getCurrentContext();
      closeMenu();
      openAddComment(ctx);
    },
  },
];

const TOYS = [
  { icon: '🎲', label: 'Shuffle the theme', hint: 'palette + mode', run: shuffleTheme },
  { icon: '🟩', label: 'Matrix rain', hint: 'toggle', run: toggleRain },
  { icon: '🥠', label: 'Terminal fortune', hint: 'koan', run: speakKoan },
];

const ALL_ACTIONS = [...TOOLS, ...TOYS];

// Tool panels replace the menu: close it first, then open the full-screen page.
function openPanelFromMenu(opener) {
  closeMenu();
  opener();
}

function actionButtons(list, offset) {
  return list
    .map((a, i) => {
      const idx = offset + i;
      const label =
        a.dynamic && a.icon === '📝'
          ? `Comment on this ${getCurrentContext().kind || 'view'}`
          : a.label;
      return `
        <button class="konami-btn" type="button" data-action="${idx}">
          <span class="konami-btn__icon" aria-hidden="true">${a.icon}</span>
          <span class="konami-btn__label">${label}</span>
          <span class="konami-btn__hint">${a.hint}</span>
        </button>`;
    })
    .join('');
}

function openMenu() {
  if (menuEl) return;
  injectStyles();
  lastFocus = document.activeElement;

  const overlay = document.createElement('div');
  overlay.className = 'konami-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Secret menu');

  overlay.innerHTML = `
    <div class="konami-card">
      <button class="konami-close" type="button" aria-label="Close secret menu">×</button>
      <p class="konami-eyebrow">You found it</p>
      <h2 class="konami-title">🎮 Secret Menu</h2>
      <p class="konami-code">↑ ↑ ↓ ↓ ← → ← → B A</p>
      <p class="konami-group-label">Hidden pages</p>
      <div class="konami-actions">
        ${actionButtons(TOOLS, 0)}
      </div>
      <p class="konami-group-label">Toys</p>
      <div class="konami-actions">
        ${actionButtons(TOYS, TOOLS.length)}
      </div>
      <p class="konami-note" aria-live="polite">Konami code accepted. Pick your poison.</p>
    </div>
  `;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
  });
  overlay.querySelector('.konami-close').addEventListener('click', closeMenu);
  overlay.querySelectorAll('.konami-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = ALL_ACTIONS[Number(btn.dataset.action)];
      if (action) action.run();
    });
  });

  document.body.appendChild(overlay);
  menuEl = overlay;
  pushOverlay(overlay, closeMenu);
  const first = overlay.querySelector('.konami-btn');
  if (first) first.focus({ preventScroll: true });
}

function closeMenu() {
  if (!menuEl) return;
  popOverlay(menuEl);
  menuEl.remove();
  menuEl = null;
  if (lastFocus && typeof lastFocus.focus === 'function') {
    lastFocus.focus({ preventScroll: true });
  }
}

function toggleMenu() {
  if (menuEl) closeMenu();
  else openMenu();
}

// ---------- key handling ----------

function onKeydown(e) {
  // Any secret surface open (menu, panel, dialog, lightbox)? It owns the keys.
  if (anyOverlayOpen()) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      e.preventDefault();
      closeTopOverlay();
      return;
    }
    // Let typing/navigation flow inside the top surface; only stop keys that
    // would otherwise drive the view hidden behind it.
    const top = topOverlay();
    if (top && !top.contains(e.target)) e.stopPropagation();
    return;
  }

  // Ignore typing inside form fields.
  const tag = (e.target && e.target.tagName) || '';
  if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) {
    return;
  }

  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  const expected = SEQUENCE[progress];
  if (key === expected) {
    progress++;
    if (progress === SEQUENCE.length) {
      progress = 0;
      toggleMenu();
    }
  } else {
    // Restart, but allow this key to be the start of a fresh attempt.
    progress = key === SEQUENCE[0] ? 1 : 0;
  }
}

document.addEventListener('keydown', onKeydown, true);
