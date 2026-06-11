// theme.js — palette + mode picker (reading view)
//
// Two HTML attributes drive the theme:
//   <html data-palette="editorial" data-mode="light">
// Persisted in localStorage as:
//   cli-agents-palette   — one of PALETTES[].id
//   cli-agents-mode      — "light" | "dark"
//
// Migration: the previous version stored only "cli-agents-theme"
// containing "light" | "dark". If present, we copy it into the new
// "cli-agents-mode" key on first load and leave palette at the default.

const PALETTE_KEY = 'cli-agents-palette';
const MODE_KEY    = 'cli-agents-mode';
const LEGACY_KEY  = 'cli-agents-theme';

const DEFAULT_PALETTE = 'editorial';
const DEFAULT_MODE    = 'light';

export const PALETTES = [
  { id: 'editorial', label: 'Editorial',    light: ['#f7f3ea', '#1a2236', '#b6532f'], dark: ['#161e2e', '#f0e7d3', '#e8a87c'] },
  { id: 'ink',       label: 'Broadsheet',   light: ['#f2eee4', '#181615', '#9b1c1f'], dark: ['#13110f', '#eee6d6', '#d34a43'] },
  { id: 'solar',     label: 'Glossy',       light: ['#fff3db', '#270901', '#b33e00'], dark: ['#180420', '#f8e9d2', '#ffba01'] },
  { id: 'forest',    label: 'Almanac',      light: ['#f6f9eb', '#0d2215', '#2c5328'], dark: ['#040f08', '#e3e3d1', '#92b972'] },
  { id: 'slate',     label: 'Spec',         light: ['#f0f4f7', '#0e141c', '#004576'], dark: ['#080d12', '#e3e9ee', '#62bae5'] },
  { id: 'rose',      label: 'Atelier',      light: ['#fbf0f0', '#3c1f27', '#88363a'], dark: ['#21101d', '#f1dfdb', '#d7a06f'] },
  { id: 'ocean',     label: 'Encyclopedia', light: ['#f7fbff', '#202936', '#005fc8'], dark: ['#071326', '#e8f0f2', '#6fcfff'] },
  { id: 'sunset',    label: 'Riso',         light: ['#ffeccf', '#280432', '#df2321'], dark: ['#190220', '#ffe5c5', '#ff664a'] },
];

const PALETTE_IDS = new Set(PALETTES.map((p) => p.id));

// ---------- State helpers ----------

function readStored() {
  let palette = null;
  let mode = null;
  try {
    palette = localStorage.getItem(PALETTE_KEY);
    mode = localStorage.getItem(MODE_KEY);
    if (!mode) {
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy === 'light' || legacy === 'dark') {
        mode = legacy;
        localStorage.setItem(MODE_KEY, mode);
      }
    }
  } catch (e) {}
  if (!PALETTE_IDS.has(palette)) palette = DEFAULT_PALETTE;
  if (mode !== 'light' && mode !== 'dark') mode = DEFAULT_MODE;
  return { palette, mode };
}

function applyState({ palette, mode }) {
  document.documentElement.setAttribute('data-palette', palette);
  document.documentElement.setAttribute('data-mode', mode);
  try {
    localStorage.setItem(PALETTE_KEY, palette);
    localStorage.setItem(MODE_KEY, mode);
  } catch (e) {}
}

function currentState() {
  return {
    palette: document.documentElement.getAttribute('data-palette') || DEFAULT_PALETTE,
    mode: document.documentElement.getAttribute('data-mode') || DEFAULT_MODE,
  };
}

// ---------- Mode toggle ----------

function updateModeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const { mode } = currentState();
  const isDark = mode === 'dark';
  btn.setAttribute('aria-pressed', String(isDark));
  btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

function toggleMode() {
  const { palette, mode } = currentState();
  applyState({ palette, mode: mode === 'dark' ? 'light' : 'dark' });
  updateModeToggle();
  updatePickerUI();
}

// ---------- Palette picker ----------

function buildPickerPanel() {
  const wrap = document.getElementById('palette-picker');
  if (!wrap) return;
  const grid = wrap.querySelector('[data-picker-grid]');
  if (!grid) return;

  grid.innerHTML = PALETTES.map((p) => {
    const [lBg, , lAcc] = p.light;
    const [dBg, , dAcc] = p.dark;
    return `
      <li>
        <button
          class="palette-swatch"
          type="button"
          data-palette-id="${p.id}"
          aria-label="${p.label}"
          title="${p.label}"
        >
          <span class="palette-swatch__half palette-swatch__half--light"
            style="background:${lBg};">
            <span class="palette-swatch__dot" style="background:${lAcc};"></span>
          </span>
          <span class="palette-swatch__half palette-swatch__half--dark"
            style="background:${dBg};">
            <span class="palette-swatch__dot" style="background:${dAcc};"></span>
          </span>
          <span class="palette-swatch__name">${p.label}</span>
        </button>
      </li>`;
  }).join('');
}

function updatePickerUI() {
  const wrap = document.getElementById('palette-picker');
  if (!wrap) return;
  const { palette, mode } = currentState();
  wrap.querySelectorAll('.palette-swatch').forEach((sw) => {
    sw.classList.toggle('is-active', sw.dataset.paletteId === palette);
  });
  const label = wrap.querySelector('[data-picker-current]');
  if (label) {
    const p = PALETTES.find((x) => x.id === palette);
    label.textContent = `${p ? p.label : 'Editorial'} · ${mode === 'dark' ? 'Dark' : 'Light'}`;
  }
}

function openPicker() {
  const wrap = document.getElementById('palette-picker');
  const btn = document.getElementById('palette-toggle');
  if (!wrap || !btn) return;
  wrap.hidden = false;
  btn.setAttribute('aria-expanded', 'true');
  // Focus first swatch
  const first = wrap.querySelector('.palette-swatch.is-active') || wrap.querySelector('.palette-swatch');
  if (first) first.focus({ preventScroll: true });
}

function closePicker() {
  const wrap = document.getElementById('palette-picker');
  const btn = document.getElementById('palette-toggle');
  if (!wrap || !btn) return;
  wrap.hidden = true;
  btn.setAttribute('aria-expanded', 'false');
}

function togglePicker() {
  const wrap = document.getElementById('palette-picker');
  if (!wrap) return;
  if (wrap.hidden) openPicker();
  else closePicker();
}

// ---------- Init ----------

function init() {
  // Apply current state once on boot (anti-FOUC already set attributes).
  applyState(readStored());
  buildPickerPanel();
  updateModeToggle();
  updatePickerUI();

  const modeBtn = document.getElementById('theme-toggle');
  if (modeBtn) modeBtn.addEventListener('click', toggleMode);

  const pickerBtn = document.getElementById('palette-toggle');
  if (pickerBtn) {
    pickerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePicker();
    });
  }

  const panel = document.getElementById('palette-picker');
  if (panel) {
    panel.addEventListener('click', (e) => {
      e.stopPropagation();
      const sw = e.target.closest('.palette-swatch');
      if (!sw) return;
      const id = sw.dataset.paletteId;
      if (!PALETTE_IDS.has(id)) return;
      const { mode } = currentState();
      applyState({ palette: id, mode });
      updateModeToggle();
      updatePickerUI();
    });
    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closePicker();
        const btn = document.getElementById('palette-toggle');
        if (btn) btn.focus();
      }
    });
  }

  // Close picker on outside click / blur.
  document.addEventListener('click', (e) => {
    const wrap = document.getElementById('palette-picker');
    const btn = document.getElementById('palette-toggle');
    if (!wrap || wrap.hidden) return;
    if (wrap.contains(e.target) || (btn && btn.contains(e.target))) return;
    closePicker();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const wrap = document.getElementById('palette-picker');
      if (wrap && !wrap.hidden) closePicker();
    }
  });

  // Cross-view / cross-tab sync.
  window.addEventListener('storage', (e) => {
    if (e.key === PALETTE_KEY || e.key === MODE_KEY) {
      const next = readStored();
      applyState(next);
      updateModeToggle();
      updatePickerUI();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
