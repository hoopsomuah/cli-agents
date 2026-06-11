// gallery.js — hidden "Image Library" panel: browse every asset in the set so
// you can pick new art for a scene. Reads the generated site/assets/images/
// index.json (works on static hosting with no directory listing) and cross-refs
// the content model to show which scenes use each file — and which are unused.

import { openPanel } from './panel.js';
import { pushOverlay, popOverlay } from './overlays.js';
import { BASE, escapeHtml, copyText, prettyBytes } from './util.js';
import { getModel } from './model-data.js';

function tile(entry, dir, usage, onOpen) {
  const file = entry.file;
  const src = `${BASE}${dir}${file}`;
  const uses = usage.get(file) || [];
  const badges = uses.length
    ? uses
        .map(
          (u) =>
            `<span class="secret-badge">${escapeHtml(
              String(u.scene).padStart ? String(u.scene) : u.scene
            )} · ${escapeHtml(u.field.replace('_image', '').replace('deck_diagram', 'diagram'))}</span>`
        )
        .join('')
    : '<span class="secret-badge secret-badge--unused">unused</span>';

  const el = document.createElement('div');
  el.className = 'secret-tile';
  el.dataset.file = file.toLowerCase();
  el.dataset.unused = uses.length ? '0' : '1';
  el.innerHTML = `
    <button class="secret-tile__frame" type="button" aria-label="Enlarge ${escapeHtml(file)}">
      <img loading="lazy" src="${escapeHtml(src)}" alt="${escapeHtml(file)}">
    </button>
    <div class="secret-tile__meta">
      <button class="secret-tile__name" type="button" title="Copy filename">${escapeHtml(file)}</button>
      <div class="secret-badges">${badges}<span class="secret-badge" style="background:none;opacity:.6">${escapeHtml(
        prettyBytes(entry.bytes)
      )}</span></div>
    </div>
  `;
  el.querySelector('.secret-tile__frame').addEventListener('click', () => onOpen(entry, dir, uses));
  el.querySelector('.secret-tile__name').addEventListener('click', async (e) => {
    const ok = await copyText(file);
    e.currentTarget.textContent = ok ? 'copied!' : file;
    setTimeout(() => {
      e.currentTarget.textContent = file;
    }, 900);
  });
  return el;
}

function openLightbox(entry, dir, uses) {
  const src = `${BASE}${dir}${entry.file}`;
  const box = document.createElement('div');
  box.className = 'secret-lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-label', entry.file);
  const usedTxt = uses.length
    ? 'used by ' + uses.map((u) => `${u.sceneId} (${u.field})`).join(', ')
    : 'not referenced by any scene';
  box.innerHTML = `
    <div class="secret-lightbox__img"><img src="${escapeHtml(src)}" alt="${escapeHtml(entry.file)}"></div>
    <div class="secret-lightbox__bar">
      <span>${escapeHtml(dir + entry.file)}</span>
      <span style="opacity:.7">${escapeHtml(prettyBytes(entry.bytes))} · ${escapeHtml(usedTxt)}</span>
      <button class="secret-btn" data-copy type="button" style="margin-left:auto">Copy filename</button>
      <button class="secret-btn" data-close type="button">Close ✕</button>
    </div>
  `;
  const close = () => {
    popOverlay(box);
    box.remove();
  };
  box.addEventListener('click', (e) => {
    if (e.target === box || e.target.closest('[data-close]')) close();
  });
  box.querySelector('[data-copy]').addEventListener('click', async (e) => {
    const ok = await copyText(entry.file);
    e.currentTarget.textContent = ok ? 'Copied!' : 'Copy failed';
  });
  document.body.appendChild(box);
  pushOverlay(box, close);
}

export async function openGallery() {
  const { body, setStatus } = openPanel({
    eyebrow: 'Hidden page',
    title: 'Image Library',
    subtitle: 'Every asset in the set — browse, copy a filename, spot the unused ones.',
  });
  body.innerHTML = '<p class="secret-empty">Loading the asset manifest…</p>';

  let index;
  try {
    const res = await fetch(`${BASE}site/assets/images/index.json`);
    if (!res.ok) throw new Error(String(res.status));
    index = await res.json();
  } catch (e) {
    body.innerHTML = `<p class="secret-empty">Couldn't load <code>site/assets/images/index.json</code>.
      Run <code>node scripts/generate-image-manifest.js</code> and reload.</p>`;
    return;
  }

  let usage = new Map();
  try {
    usage = (await getModel()).usage;
  } catch (e) {
    /* gallery still works without usage cross-ref */
  }

  const images = index.images || [];
  const diagrams = index.diagrams || [];
  const unusedCount = images.filter((e) => !(usage.get(e.file) || []).length).length;
  setStatus(`${images.length} images · ${diagrams.length} diagrams · ${unusedCount} unused`);

  body.innerHTML = `
    <div class="secret-toolbar">
      <input class="secret-input" type="search" placeholder="Filter by filename…" aria-label="Filter images">
      <button class="secret-chipbtn" data-filter="unused" type="button">Unused only</button>
    </div>
    <h3 class="secret-section-h">Images — ${images.length}</h3>
    <div class="secret-grid" data-grid="images"></div>
    <h3 class="secret-section-h">Diagrams — ${diagrams.length}</h3>
    <div class="secret-grid" data-grid="diagrams"></div>
  `;

  const imgGrid = body.querySelector('[data-grid="images"]');
  const diagGrid = body.querySelector('[data-grid="diagrams"]');
  images.forEach((e) => imgGrid.appendChild(tile(e, index.imageDir, usage, openLightbox)));
  diagrams.forEach((e) => diagGrid.appendChild(tile(e, index.diagramDir, usage, openLightbox)));

  const search = body.querySelector('.secret-input');
  const unusedBtn = body.querySelector('[data-filter="unused"]');
  let unusedOnly = false;

  function apply() {
    const q = search.value.trim().toLowerCase();
    body.querySelectorAll('.secret-tile').forEach((t) => {
      const matchQ = !q || t.dataset.file.includes(q);
      const matchU = !unusedOnly || t.dataset.unused === '1';
      t.style.display = matchQ && matchU ? '' : 'none';
    });
  }
  search.addEventListener('input', apply);
  unusedBtn.addEventListener('click', () => {
    unusedOnly = !unusedOnly;
    unusedBtn.classList.toggle('is-on', unusedOnly);
    apply();
  });
  search.focus({ preventScroll: true });
}
