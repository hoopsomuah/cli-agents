// model.js — hidden "Content Model" page: visualize how the manifest, scene
// Markdown, and image assets map into the repo. Reinforces the repo thesis:
// content/ is canon; site/ and present/ are just renderers.

import { openPanel } from './panel.js';
import { escapeHtml, copyText, IS_DECK } from './util.js';
import { jumpToTarget } from './context.js';
import { getModel } from './model-data.js';

// Resolve a scene id to the right deep-link for whichever view is hosting us.
function sceneTarget(sid, num) {
  if (IS_DECK) {
    const slides = Array.from(document.querySelectorAll('#stage .slide'));
    const i = slides.findIndex((s) => s.getAttribute('data-scene-id') === sid);
    if (i >= 0) return `#${i + 1}`;
    return '';
  }
  return `#scene-${String(num)}`;
}

function fileChip(path, kind) {
  const cls = kind === 'content' ? 'secret-file secret-file--content' : 'secret-file';
  return `<button class="${cls}" type="button" data-copy="${escapeHtml(path)}" title="Copy path">${escapeHtml(
    path
  )}</button>`;
}

function sceneNode(sid, scene) {
  const meta = (scene && scene.meta) || {};
  const num = meta.scene != null ? String(meta.scene).padStart(2, '0') : sid;
  const files = [fileChip(`content/${sid}.md`, 'content')];
  if (meta.hero_image) files.push(fileChip(`site/assets/images/${meta.hero_image}`));
  if (meta.deck_image && meta.deck_image !== meta.hero_image)
    files.push(fileChip(`site/assets/images/${meta.deck_image}`));
  if (typeof meta.diagram === 'string') files.push(fileChip(`site/assets/diagrams/${meta.diagram}`));
  const tags = [];
  if (meta.interactive) tags.push(`interactive: ${meta.interactive}`);
  if (meta.deck_layout) tags.push(`deck_layout: ${meta.deck_layout}`);
  if (scene && scene.missing) tags.push('⚠ file missing');

  return `
    <div class="secret-tree__scene" data-sid="${escapeHtml(sid)}" data-num="${escapeHtml(
    String(num)
  )}">
      <div class="secret-tree__scene-h">
        <span class="secret-tree__num">Scene ${escapeHtml(String(num))}</span>
        <span class="secret-tree__name">${escapeHtml(meta.title || sid)}</span>
        ${tags.length ? `<span class="secret-tree__act-id">${escapeHtml(tags.join(' · '))}</span>` : ''}
      </div>
      <div class="secret-tree__files">${files.join('')}</div>
    </div>
  `;
}

export async function openModel() {
  const { body, setStatus } = openPanel({
    eyebrow: 'Hidden page',
    title: 'Content Model',
    subtitle: 'How content/, the manifest, and assets map into the two renderers.',
  });
  body.innerHTML = '<p class="secret-empty">Reading the manifest and every scene…</p>';

  let model;
  try {
    model = await getModel();
  } catch (e) {
    body.innerHTML = `<p class="secret-empty">Couldn't load the content model: ${escapeHtml(
      e.message
    )}</p>`;
    return;
  }

  const { groups, scenes, usage } = model;
  const sceneCount = groups.reduce((n, g) => n + (g.scenes ? g.scenes.length : 0), 0);
  const usedImages = usage.size;
  setStatus(`${groups.length} acts · ${sceneCount} scenes · ${usedImages} assets referenced`);

  const actsHtml = groups
    .map((g) => {
      const scenesHtml = (g.scenes || []).map((sid) => sceneNode(sid, scenes[sid])).join('');
      return `
        <section class="secret-tree__act">
          <h3 class="secret-tree__act-h">${escapeHtml(g.title || g.id)}</h3>
          <p class="secret-tree__act-id">${escapeHtml(g.id)}${
        g.kind ? ` · ${escapeHtml(g.kind)}` : ''
      } · ${(g.scenes || []).length} scenes</p>
          ${scenesHtml}
        </section>
      `;
    })
    .join('');

  body.innerHTML = `
    <div class="secret-legend">
      <strong>The file is the canon. The renderer is replaceable.</strong><br>
      Each scene is one Markdown file in <code>content/</code>, listed in
      <code>content/manifest.json</code>. The reading view (<code>site/js/render.js</code>)
      and the deck (<code>present/deck.js</code>) both read these same files. Click any
      <span style="color:var(--accent)">content path</span> to copy it; click a scene to
      jump there in this view.
    </div>
    <div class="secret-tree">${actsHtml}</div>
  `;

  body.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const ok = await copyText(btn.dataset.copy);
      const old = btn.textContent;
      btn.textContent = ok ? 'copied!' : old;
      setTimeout(() => {
        btn.textContent = old;
      }, 800);
    });
  });
  body.querySelectorAll('.secret-tree__scene').forEach((node) => {
    node.addEventListener('click', () =>
      jumpToTarget(sceneTarget(node.dataset.sid, node.dataset.num), undefined)
    );
  });
}
