// Theme-validation screenshot + probe harness.
//
// Captures every scene (reading view) and every slide (deck) across all 8
// palettes x light/dark x viewport, plus a cheap probe pass (horizontal
// overflow, fixed-height clipping, text contrast) that lets the reviewer
// agents prioritise which screenshots to scrutinise.
//
// Usage:
//   node audit.mjs                      # full matrix, all palettes
//   node audit.mjs --palette forest     # one palette
//   node audit.mjs --view reading       # one view (reading|deck)
//   node audit.mjs --base http://localhost:8000
//
// Output: .theme-audit/<view>/<palette>/<mode>/<viewport>/<id>.png
//         .theme-audit/probes/<palette>.json
//
// The site itself stays build-step-free; this tool dir owns its own deps.

import { chromium } from 'playwright';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '.theme-audit');

const PALETTES = ['editorial', 'ink', 'solar', 'forest', 'slate', 'rose', 'ocean', 'sunset'];
const MODES = ['light', 'dark'];

// Reading view is responsive -> desktop + mobile. Deck is a projector target -> desktop only.
const READING_VPS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];
const DECK_VPS = [{ name: 'projector', width: 1280, height: 800 }];

function parseArgs() {
  const a = process.argv.slice(2);
  const out = { base: 'http://localhost:8000', palettes: PALETTES, views: ['reading', 'deck'] };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '--palette') out.palettes = [a[++i]];
    else if (a[i] === '--view') out.views = [a[++i]];
    else if (a[i] === '--base') out.base = a[++i];
  }
  return out;
}

// Relative luminance + WCAG contrast from an "rgb(a)" string.
function parseRGB(str) {
  const m = String(str).match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(',').map((s) => parseFloat(s.trim()));
  return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] };
}
function lum({ r, g, b }) {
  const f = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(fg, bg) {
  const a = lum(fg) + 0.05;
  const b = lum(bg) + 0.05;
  return (Math.max(a, b) / Math.min(a, b)).toFixed(2);
}

async function setPaletteMode(page, palette, mode) {
  await page.addInitScript(
    ([p, m]) => {
      try {
        localStorage.setItem('cli-agents-palette', p);
        localStorage.setItem('cli-agents-mode', m);
      } catch (e) {}
    },
    [palette, mode]
  );
}

async function settle(page) {
  try {
    await page.evaluate(() => document.fonts && document.fonts.ready);
  } catch (e) {}
  try {
    await page.waitForLoadState('networkidle', { timeout: 8000 });
  } catch (e) {}
  await page.waitForTimeout(400);
}

// ---------- READING VIEW ----------

async function auditReading(context, base, palette, mode, probes) {
  for (const vp of READING_VPS) {
    const page = await context.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await setPaletteMode(page, palette, mode);
    await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
    await settle(page);

    // Confirm the palette actually applied (catches localStorage races).
    const applied = await page.evaluate(() => ({
      palette: document.documentElement.getAttribute('data-palette'),
      mode: document.documentElement.getAttribute('data-mode'),
      docOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      docScrollW: document.documentElement.scrollWidth,
      docClientW: document.documentElement.clientWidth,
    }));

    // Enumerate acts + scenes with per-unit probes.
    const units = await page.evaluate(() => {
      // Resolve ANY css color (incl. oklch) to [r,g,b,a] via canvas pixels.
      const _cv = document.createElement('canvas');
      _cv.width = _cv.height = 1;
      const _ctx = _cv.getContext('2d', { willReadFrequently: true });
      function toRGB(str) {
        try {
          _ctx.clearRect(0, 0, 1, 1);
          _ctx.fillStyle = '#000';
          _ctx.fillStyle = str;
          _ctx.fillRect(0, 0, 1, 1);
          const d = _ctx.getImageData(0, 0, 1, 1).data;
          return [d[0], d[1], d[2], d[3] / 255];
        } catch (e) {
          return null;
        }
      }
      const items = [];
      document.querySelectorAll('section.act, section.scene').forEach((el) => {
        const id = el.id || el.className;
        const r = el.getBoundingClientRect();
        // nearest non-transparent background, walking up to and including <html>
        function bgOf(node) {
          let n = node;
          while (n) {
            const c = getComputedStyle(n).backgroundColor;
            const rgb = toRGB(c);
            if (rgb && rgb[3] > 0.05) return rgb;
            if (n === document.documentElement) break;
            n = n.parentElement;
          }
          return toRGB(getComputedStyle(document.body).backgroundColor) || [255, 255, 255, 1];
        }
        const txt =
          el.querySelector('.scene__title, .act__title, .scene__body p, .scene__keyidea-text') ||
          el;
        const cs = getComputedStyle(txt);
        items.push({
          id,
          type: el.classList.contains('act') ? 'act' : 'scene',
          overflowX: el.scrollWidth > el.clientWidth + 1,
          scrollW: el.scrollWidth,
          clientW: el.clientWidth,
          width: Math.round(r.width),
          colorRGB: toRGB(cs.color),
          bgRGB: bgOf(txt),
          color: cs.color,
          bg: getComputedStyle(txt).backgroundColor,
          fontFamily: cs.fontFamily,
        });
      });
      return items;
    });

    for (const u of units) {
      const dir = join(OUT, 'reading', palette, mode, vp.name);
      await mkdir(dir, { recursive: true });
      try {
        const el = page.locator(`[id="${u.id}"]`).first();
        await el.scrollIntoViewIfNeeded({ timeout: 4000 });
        await page.waitForTimeout(120);
        await el.screenshot({ path: join(dir, `${u.id}.png`) });
      } catch (e) {
        // fall back to a full-page shot if the element capture fails
        try {
          await page.screenshot({ path: join(dir, `${u.id}__FALLBACK.png`), fullPage: false });
        } catch (e2) {}
      }
      // record probe
      const fg = u.colorRGB ? { r: u.colorRGB[0], g: u.colorRGB[1], b: u.colorRGB[2] } : null;
      const bg = u.bgRGB ? { r: u.bgRGB[0], g: u.bgRGB[1], b: u.bgRGB[2] } : null;
      probes.push({
        view: 'reading',
        palette,
        mode,
        viewport: vp.name,
        id: u.id,
        type: u.type,
        overflowX: u.overflowX,
        scrollW: u.scrollW,
        clientW: u.clientW,
        docOverflowX: applied.docOverflow,
        contrast: fg && bg ? Number(contrast(fg, bg)) : null,
        color: u.color,
        bg: u.bg,
        font: u.fontFamily,
        appliedPalette: applied.palette,
        appliedMode: applied.mode,
      });
    }
    await page.close();
  }
}

// ---------- DECK ----------

async function auditDeck(context, base, palette, mode, probes) {
  for (const vp of DECK_VPS) {
    const page = await context.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await setPaletteMode(page, palette, mode);
    await page.goto(base + '/present/', { waitUntil: 'domcontentloaded' });
    await settle(page);
    // Wait for the deck to finish booting (slides rendered).
    try {
      await page.waitForFunction(() => document.querySelectorAll('.slide').length > 0, {
        timeout: 8000,
      });
    } catch (e) {}

    const total = await page.evaluate(() => document.querySelectorAll('.slide').length);
    const dir = join(OUT, 'deck', palette, mode, vp.name);
    await mkdir(dir, { recursive: true });

    for (let n = 1; n <= total; n++) {
      await page.evaluate((i) => {
        window.location.hash = '#' + i;
      }, n);
      await page.waitForTimeout(750); // let transition + reveals settle

      const probe = await page.evaluate(() => {
        const _cv = document.createElement('canvas');
        _cv.width = _cv.height = 1;
        const _ctx = _cv.getContext('2d', { willReadFrequently: true });
        function toRGB(str) {
          try {
            _ctx.clearRect(0, 0, 1, 1);
            _ctx.fillStyle = '#000';
            _ctx.fillStyle = str;
            _ctx.fillRect(0, 0, 1, 1);
            const d = _ctx.getImageData(0, 0, 1, 1).data;
            return [d[0], d[1], d[2], d[3] / 255];
          } catch (e) {
            return null;
          }
        }
        const cur = document.querySelector('.slide.is-current');
        if (!cur) return null;
        const type = cur.getAttribute('data-slide-type') || cur.className;
        const sid = cur.getAttribute('data-scene-id') || '';
        // vertical clipping: does current slide content exceed the stage?
        const overflowY = cur.scrollHeight > cur.clientHeight + 2;
        const overflowX = cur.scrollWidth > cur.clientWidth + 2;
        function bgOf(node) {
          let n = node;
          while (n) {
            const rgb = toRGB(getComputedStyle(n).backgroundColor);
            if (rgb && rgb[3] > 0.05) return rgb;
            if (n === document.documentElement) break;
            n = n.parentElement;
          }
          return toRGB(getComputedStyle(document.body).backgroundColor) || [0, 0, 0, 1];
        }
        const txt = cur.querySelector(
          '.slide__title, .slide__sub, .slide__banner, .slide__quote, .slide__bullet-text'
        );
        let colorRGB = null,
          bgRGB = null,
          font = null;
        if (txt) {
          const cs = getComputedStyle(txt);
          colorRGB = toRGB(cs.color);
          bgRGB = bgOf(txt);
          font = cs.fontFamily;
        }
        return { type, sid, overflowY, overflowX, colorRGB, bgRGB, font };
      });

      const idStr = String(n).padStart(2, '0');
      const label = probe && probe.sid ? `${idStr}-${probe.sid}` : `${idStr}-${probe ? probe.type : 'slide'}`;
      try {
        await page.screenshot({ path: join(dir, `${label}.png`) });
      } catch (e) {}

      if (probe) {
        const fg = probe.colorRGB ? { r: probe.colorRGB[0], g: probe.colorRGB[1], b: probe.colorRGB[2] } : null;
        const bg = probe.bgRGB ? { r: probe.bgRGB[0], g: probe.bgRGB[1], b: probe.bgRGB[2] } : null;
        probes.push({
          view: 'deck',
          palette,
          mode,
          viewport: vp.name,
          id: label,
          slide: n,
          type: probe.type,
          overflowX: probe.overflowX,
          overflowY: probe.overflowY,
          contrast: fg && bg ? Number(contrast(fg, bg)) : null,
          color: probe.colorRGB ? `rgb(${probe.colorRGB.slice(0, 3).join(',')})` : null,
          bg: probe.bgRGB ? `rgb(${probe.bgRGB.slice(0, 3).join(',')})` : null,
          font: probe.font,
        });
      }
    }
    await page.close();
  }
}

// ---------- MAIN ----------

async function main() {
  const args = parseArgs();
  console.log(`Theme audit -> base=${args.base} palettes=${args.palettes.join(',')} views=${args.views.join(',')}`);

  const browser = await chromium.launch();
  for (const palette of args.palettes) {
    const probes = [];
    for (const mode of MODES) {
      const context = await browser.newContext({ deviceScaleFactor: 1 });
      try {
        if (args.views.includes('reading')) await auditReading(context, args.base, palette, mode, probes);
        if (args.views.includes('deck')) await auditDeck(context, args.base, palette, mode, probes);
      } finally {
        await context.close();
      }
      console.log(`  ${palette}/${mode} done (${probes.length} probes so far)`);
    }
    await mkdir(join(OUT, 'probes'), { recursive: true });
    // sort flagged-first for reviewer convenience
    probes.sort((a, b) => {
      const score = (p) =>
        (p.overflowX ? 4 : 0) + (p.overflowY ? 3 : 0) + (p.contrast !== null && p.contrast < 4.5 ? 2 : 0);
      return score(b) - score(a);
    });
    await writeFile(join(OUT, 'probes', `${palette}.json`), JSON.stringify(probes, null, 2));
    console.log(`  wrote probes/${palette}.json`);
  }
  await browser.close();
  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
