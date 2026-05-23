// render.js — renders the act/scene tree into structured HTML
// All formatting/layout decisions live HERE. Content files have NO HTML.

function romanize(n) {
  return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][n - 1] || String(n);
}

function escapeAttr(s) {
  return String(s).replace(/"/g, '&quot;');
}

function renderInteractive(slot) {
  if (!slot) return '';
  return `<div class="scene__interactive">
    <div class="interactive" data-interactive="${escapeAttr(slot)}">
      <p class="interactive__label">Interactive · ${slot}</p>
      <div data-interactive-target></div>
    </div>
  </div>`;
}

function renderHeroPhoto(meta) {
  if (!meta.hero_image) return '';
  const orientation = meta.hero_image_orientation === 'portrait' ? 'portrait' : 'landscape';
  const caption = meta.hero_image_caption
    ? `<figcaption>${meta.hero_image_caption}</figcaption>`
    : '';
  return `<figure class="scene__photo scene__photo--${orientation}">
    <div class="scene__photo__matte">
      <img src="site/assets/images/${meta.hero_image}" alt="${escapeAttr(meta.hero_image_alt || '')}" loading="lazy" />
    </div>
    ${caption}
  </figure>`;
}

function renderDiagram(meta) {
  if (!meta.diagram) return '';
  const caption = meta.diagram_caption
    ? `<figcaption>${meta.diagram_caption}</figcaption>`
    : '';
  return `<figure class="scene__diagram">
    <img src="site/assets/diagrams/${meta.diagram}" alt="${escapeAttr(meta.diagram_alt || '')}" loading="lazy" />
    ${caption}
  </figure>`;
}

function renderScene(scene, sceneId) {
  const { meta, body } = scene;
  const bodyHtml = window.marked
    ? window.marked.parse(body, { mangle: false, headerIds: false })
    : `<pre>${body}</pre>`;

  return `<section class="scene" id="scene-${String(meta.scene).padStart(2, '0')}">
    <div class="scene__chrome">
      <span class="scene__number">Scene ${String(meta.scene).padStart(2, '0')}</span>
      <span class="scene__duration">${
        meta.duration_seconds ? `${Math.round(meta.duration_seconds / 60 * 10) / 10} min` : ''
      }</span>
    </div>
    <h3 class="scene__title">${meta.title || sceneId}</h3>
    ${meta.subtitle ? `<p class="scene__subtitle">${meta.subtitle}</p>` : ''}
    ${renderHeroPhoto(meta)}
    ${
      meta.key_idea
        ? `<div class="scene__keyidea">
            <p class="scene__keyidea-label">The key idea</p>
            <p class="scene__keyidea-text">${meta.key_idea}</p>
          </div>`
        : ''
    }
    ${renderDiagram(meta)}
    ${renderInteractive(meta.interactive)}
    <div class="scene__body">${bodyHtml}</div>
  </section>`;
}

export function renderActs(root, manifest, scenes) {
  const html = manifest.acts
    .map((act, i) => {
      const sceneHtml = act.scenes
        .map((sid) => renderScene(scenes[sid], sid))
        .join('\n');
      return `<section class="act" id="${act.id}">
        <header class="act__header">
          <p class="act__roman">Act ${romanize(i + 1)}</p>
          <h2 class="act__title">${act.title}</h2>
          <p class="act__subtitle">${act.subtitle}</p>
        </header>
        ${sceneHtml}
      </section>`;
    })
    .join('\n');
  root.innerHTML = html;
}
