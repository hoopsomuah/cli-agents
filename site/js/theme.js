// theme.js — light/dark theme toggle (reading view)
// Shares localStorage key "cli-agents-theme" with the presentation deck.
// The anti-FOUC script in <head> has already applied any stored theme.

const STORAGE_KEY = 'cli-agents-theme';
const DEFAULT_THEME = 'light'; // editorial view defaults to light

function currentTheme() {
  return document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
}

function applyTheme(theme) {
  if (theme === 'light' || theme === 'dark') {
    document.documentElement.setAttribute('data-theme', theme);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {}
  updateToggleState();
}

function updateToggleState() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const theme = currentTheme();
  const isDark = theme === 'dark';
  btn.setAttribute('aria-pressed', String(isDark));
  btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

function toggle() {
  applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
}

function init() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', toggle);
  updateToggleState();

  // Allow other tabs / the other view to push a theme change through.
  window.addEventListener('storage', (e) => {
    if (e.key !== STORAGE_KEY) return;
    if (e.newValue === 'light' || e.newValue === 'dark') {
      document.documentElement.setAttribute('data-theme', e.newValue);
      updateToggleState();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
