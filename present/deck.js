// deck.js — slide presentation orchestrator
// Reuses the exact same /content markdown + frontmatter as the reading view.

const CONTENT_ROOT = '../content/';
const ASSET_IMG = '../site/assets/images/';
const ASSET_DIAGRAM = '../site/assets/diagrams/';

// ---------- Frontmatter parser (matches main site) ----------

function parseScene(raw) {
  // Mirror of site/js/main.js → parseScene. Keep them in sync.
  // Tolerates both LF and CRLF line endings.
  const normalized = raw.replace(/\r\n?/g, '\n');
  const m = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: normalized };
  const meta = {};
  const lines = m[1].split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const idx = line.indexOf(':');
    if (idx === -1) {
      i++;
      continue;
    }
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val === '') {
      const items = [];
      let j = i + 1;
      while (j < lines.length && /^\s+-\s+/.test(lines[j])) {
        let item = lines[j].replace(/^\s+-\s+/, '').trim();
        if (item.startsWith('"') && item.endsWith('"')) item = item.slice(1, -1);
        items.push(item);
        j++;
      }
      if (items.length > 0) {
        meta[key] = items;
        i = j;
        continue;
      }
    }
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (/^\d+$/.test(val)) val = parseInt(val, 10);
    meta[key] = val;
    i++;
  }
  return { meta, body: m[2] };
}

async function loadManifest() {
  const res = await fetch(CONTENT_ROOT + 'manifest.json');
  if (!res.ok) throw new Error('manifest fetch failed');
  return res.json();
}

async function loadScene(sceneId) {
  const res = await fetch(`${CONTENT_ROOT}${sceneId}.md`);
  if (!res.ok) throw new Error(`scene fetch failed: ${sceneId}`);
  const raw = await res.text();
  return parseScene(raw);
}

// ---------- Roman numerals ----------

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

// ---------- Slide builders ----------

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildCoverSlide(manifest) {
  const sceneCount = manifest.acts.reduce((n, a) => n + (a.scenes ? a.scenes.length : 0), 0);
  return {
    type: 'cover',
    actIndex: null,
    html: `
      <div class="slide slide--cover" data-slide-type="cover">
        <p class="slide__eyebrow reveal" style="--reveal-delay: 100ms;">A presentation by Hoop Somuah · 2026</p>
        <h1 class="slide__title">
          <span class="reveal" style="--reveal-delay: 200ms;">From Teletype</span>
          <span class="slide__title-accent reveal" style="--reveal-delay: 400ms;">to Rhythm of Business</span>
        </h1>
        <p class="slide__sub reveal" style="--reveal-delay: 600ms;">
          ${escapeHtml(manifest.tagline || manifest.subtitle)}
        </p>
        <div class="slide__meta reveal" style="--reveal-delay: 800ms;">
          <span>${manifest.meeting_target_minutes || 30}-minute walkthrough</span>
          <span>·</span>
          <span>${manifest.acts.length} acts</span>
          <span>·</span>
          <span>${sceneCount} scenes</span>
        </div>
      </div>
    `,
  };
}

function buildActSlide(act, actIndex) {
  return {
    type: 'act',
    actIndex,
    html: `
      <div class="slide slide--act" data-slide-type="act" data-act="${act.id}">
        <p class="slide__roman reveal" style="--reveal-delay: 100ms;">ACT ${ROMAN[actIndex]}</p>
        <h2 class="slide__title reveal" style="--reveal-delay: 300ms;">${escapeHtml(act.title)}</h2>
        <p class="slide__sub reveal" style="--reveal-delay: 500ms;">${escapeHtml(act.subtitle)}</p>
      </div>
    `,
  };
}

function buildSceneSlide(scene, sceneId, actIndex, actTitle) {
  const { meta } = scene;
  const hasImage = !!meta.hero_image;
  const hasDiagram = !!meta.diagram;
  const hasBullets = Array.isArray(meta.bullets) && meta.bullets.length > 0;

  // Explicit install layout takes precedence.
  if (meta.layout === 'install') {
    return buildInstallSlide(scene, sceneId, actIndex);
  }

  // Bullets become the dominant layout. If a hero image is present, render it
  // on the right; otherwise center the bullets.
  if (hasBullets) {
    return buildBulletsSlide(scene, sceneId, actIndex);
  }

  // Hero photo only — keep the cinematic editorial layout for historical
  // imagery (teletypes, typewriters, etc.).
  if (hasImage) {
    return {
      type: 'scene',
      actIndex,
      sceneId,
      html: `
        <div class="slide slide--scene" data-slide-type="scene" data-scene-id="${sceneId}">
          <div class="slide__left">
            <div class="slide__chrome reveal" style="--reveal-delay: 50ms;">
              <span class="slide__chrome-act">ACT ${ROMAN[actIndex]}</span>
              <span>·</span>
              <span>Scene ${String(meta.scene).padStart(2, '0')}</span>
            </div>
            <h2 class="slide__title reveal" style="--reveal-delay: 200ms;">${escapeHtml(meta.title || sceneId)}</h2>
            ${meta.subtitle ? `<p class="slide__sub reveal" style="--reveal-delay: 350ms;">${escapeHtml(meta.subtitle)}</p>` : ''}
            ${meta.key_idea ? `
              <div class="slide__keyidea reveal" style="--reveal-delay: 600ms;">
                <p class="slide__keyidea-label">The key idea</p>
                <p class="slide__keyidea-text">${escapeHtml(meta.key_idea)}</p>
              </div>
            ` : ''}
          </div>
          <div class="slide__right">
            <figure class="slide__figure reveal" style="--reveal-delay: 100ms;">
              <img src="${ASSET_IMG}${meta.hero_image}" alt="${escapeHtml(meta.hero_image_alt || '')}" />
            </figure>
            ${meta.hero_image_caption ? `<figcaption class="slide__caption reveal" style="--reveal-delay: 700ms;">${escapeHtml(meta.hero_image_caption)}</figcaption>` : ''}
          </div>
        </div>
      `,
    };
  }

  if (hasDiagram) {
    return {
      type: 'diagram',
      actIndex,
      sceneId,
      html: `
        <div class="slide slide--diagram" data-slide-type="diagram" data-scene-id="${sceneId}">
          <p class="slide__chrome reveal" style="--reveal-delay: 50ms;">ACT ${ROMAN[actIndex]} · Scene ${String(meta.scene).padStart(2, '0')}</p>
          <h2 class="slide__title reveal" style="--reveal-delay: 200ms;">${escapeHtml(meta.title || sceneId)}</h2>
          ${meta.subtitle ? `<p class="slide__sub reveal" style="--reveal-delay: 350ms;">${escapeHtml(meta.subtitle)}</p>` : ''}
          <div class="slide__figure-wrap reveal" style="--reveal-delay: 500ms;">
            <img src="${ASSET_DIAGRAM}${meta.diagram}" alt="${escapeHtml(meta.diagram_alt || '')}" />
          </div>
          ${meta.diagram_caption ? `<p class="slide__caption reveal" style="--reveal-delay: 700ms;">${escapeHtml(meta.diagram_caption)}</p>` : ''}
        </div>
      `,
    };
  }

  // Fall back: quote slide using key_idea
  return {
    type: 'quote',
    actIndex,
    sceneId,
    html: `
      <div class="slide slide--quote" data-slide-type="quote" data-scene-id="${sceneId}">
        <p class="slide__roman reveal" style="--reveal-delay: 100ms;">ACT ${ROMAN[actIndex]} · Scene ${String(meta.scene).padStart(2, '0')} — ${escapeHtml(meta.title || '')}</p>
        <blockquote class="reveal" style="--reveal-delay: 300ms;">
          ${escapeHtml(meta.key_idea || meta.subtitle || meta.title)}
        </blockquote>
        ${meta.subtitle && meta.key_idea ? `<p class="slide__cite reveal" style="--reveal-delay: 600ms;">${escapeHtml(meta.subtitle)}</p>` : ''}
      </div>
    `,
  };
}

function buildBulletsSlide(scene, sceneId, actIndex) {
  const { meta } = scene;
  const hasImage = !!meta.hero_image;
  const bullets = meta.bullets || [];
  const bulletsHtml = bullets
    .map((b, i) => `
      <li class="slide__bullet reveal" style="--reveal-delay: ${500 + i * 180}ms;">
        <span class="slide__bullet-marker" aria-hidden="true">→</span>
        <span class="slide__bullet-text">${escapeHtml(b)}</span>
      </li>`)
    .join('');
  const keyideaDelay = 500 + bullets.length * 180 + 200;

  return {
    type: 'bullets',
    actIndex,
    sceneId,
    html: `
      <div class="slide slide--bullets ${hasImage ? 'slide--bullets-image' : ''}" data-slide-type="bullets" data-scene-id="${sceneId}">
        <div class="slide__left">
          <p class="slide__chrome reveal" style="--reveal-delay: 50ms;">
            <span class="slide__chrome-act">ACT ${ROMAN[actIndex]}</span>
            <span>·</span>
            <span>Scene ${String(meta.scene).padStart(2, '0')}</span>
          </p>
          <h2 class="slide__title reveal" style="--reveal-delay: 200ms;">${escapeHtml(meta.title || sceneId)}</h2>
          ${meta.subtitle ? `<p class="slide__sub reveal" style="--reveal-delay: 350ms;">${escapeHtml(meta.subtitle)}</p>` : ''}
          <ul class="slide__bullets">${bulletsHtml}</ul>
          ${meta.key_idea ? `
            <div class="slide__keyidea reveal" style="--reveal-delay: ${keyideaDelay}ms;">
              <p class="slide__keyidea-text">${escapeHtml(meta.key_idea)}</p>
            </div>` : ''}
        </div>
        ${hasImage ? `
          <div class="slide__right">
            <figure class="slide__figure reveal" style="--reveal-delay: 100ms;">
              <img src="${ASSET_IMG}${meta.hero_image}" alt="${escapeHtml(meta.hero_image_alt || '')}" />
            </figure>
            ${meta.hero_image_caption ? `<figcaption class="slide__caption reveal" style="--reveal-delay: ${keyideaDelay + 200}ms;">${escapeHtml(meta.hero_image_caption)}</figcaption>` : ''}
          </div>` : ''}
      </div>
    `,
  };
}

function buildInstallSlide(scene, sceneId, actIndex) {
  const { meta } = scene;
  const steps = meta.bullets || [];
  const stepsHtml = steps
    .map((s, i) => `
      <li class="slide__step reveal" style="--reveal-delay: ${400 + i * 130}ms;">
        <span class="slide__step-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="slide__step-text">${escapeHtml(s)}</span>
      </li>`)
    .join('');
  const keyideaDelay = 400 + steps.length * 130 + 200;

  return {
    type: 'install',
    actIndex,
    sceneId,
    html: `
      <div class="slide slide--install" data-slide-type="install" data-scene-id="${sceneId}">
        <p class="slide__chrome reveal" style="--reveal-delay: 50ms;">
          <span class="slide__chrome-act">ACT ${ROMAN[actIndex]}</span>
          <span>·</span>
          <span>Scene ${String(meta.scene).padStart(2, '0')}</span>
          <span>·</span>
          <span>Install</span>
        </p>
        <h2 class="slide__title reveal" style="--reveal-delay: 200ms;">${escapeHtml(meta.title || sceneId)}</h2>
        ${meta.subtitle ? `<p class="slide__sub reveal" style="--reveal-delay: 300ms;">${escapeHtml(meta.subtitle)}</p>` : ''}
        <ol class="slide__steps">${stepsHtml}</ol>
        ${meta.key_idea ? `
          <div class="slide__keyidea reveal" style="--reveal-delay: ${keyideaDelay}ms;">
            <p class="slide__keyidea-text">${escapeHtml(meta.key_idea)}</p>
          </div>` : ''}
      </div>
    `,
  };
}

function buildClosingSlide() {
  return {
    type: 'closing',
    actIndex: null,
    html: `
      <div class="slide slide--closing" data-slide-type="closing">
        <h2 class="slide__title reveal" style="--reveal-delay: 200ms;">Thank you.</h2>
        <p class="slide__sub reveal" style="--reveal-delay: 500ms;">
          Pick one scene. Install one tool. Open one PR.
          The rhythm starts on day one.
        </p>
        <p class="slide__url reveal" style="--reveal-delay: 800ms;">
          hoopsomuah.github.io/cli-agents
        </p>
      </div>
    `,
  };
}

// ---------- Diagram quote slide insertion ----------
// For scenes that have BOTH image AND diagram, generate a second diagram slide
// right after the scene slide so neither asset gets buried.

function expandScenes(manifest, scenes) {
  const slides = [];
  slides.push(buildCoverSlide(manifest));

  manifest.acts.forEach((act, actIndex) => {
    slides.push(buildActSlide(act, actIndex));
    act.scenes.forEach((sceneId) => {
      const scene = scenes[sceneId];
      if (!scene) return;
      const { meta } = scene;
      slides.push(buildSceneSlide(scene, sceneId, actIndex, act.title));

      // Decide whether the diagram was already shown on the primary slide.
      // It is only the primary slide when there is no install layout, no
      // bullets, no hero image — in which case buildSceneSlide returns the
      // dedicated diagram layout.
      const hasBullets = Array.isArray(meta.bullets) && meta.bullets.length > 0;
      const diagramOnPrimary =
        !!meta.diagram &&
        !hasBullets &&
        !meta.hero_image &&
        meta.layout !== 'install';

      if (meta.diagram && !diagramOnPrimary) {
        slides.push({
          type: 'diagram',
          actIndex,
          sceneId,
          html: `
            <div class="slide slide--diagram" data-slide-type="diagram" data-scene-id="${sceneId}-diagram">
              <p class="slide__chrome reveal" style="--reveal-delay: 50ms;">ACT ${ROMAN[actIndex]} · Scene ${String(meta.scene).padStart(2, '0')}</p>
              <h2 class="slide__title reveal" style="--reveal-delay: 200ms;">${escapeHtml(meta.title || sceneId)}</h2>
              ${meta.subtitle ? `<p class="slide__sub reveal" style="--reveal-delay: 350ms;">${escapeHtml(meta.subtitle)}</p>` : ''}
              <div class="slide__figure-wrap reveal" style="--reveal-delay: 500ms;">
                <img src="${ASSET_DIAGRAM}${meta.diagram}" alt="${escapeHtml(meta.diagram_alt || '')}" />
              </div>
              ${meta.diagram_caption ? `<p class="slide__caption reveal" style="--reveal-delay: 700ms;">${escapeHtml(meta.diagram_caption)}</p>` : ''}
            </div>
          `,
        });
      }
    });
  });

  slides.push(buildClosingSlide());
  return slides;
}

// ---------- Deck state ----------

const state = {
  slides: [],
  current: 0,
  visited: new Set([0]),
  isAnimating: false,
};

// ---------- Render ----------

function renderStage(stage, slides) {
  stage.innerHTML = slides.map((s) => s.html).join('\n');
}

function renderProgress(progressEl, slides) {
  progressEl.innerHTML = slides
    .map((_, i) => `<button class="deck__dot" data-idx="${i}" aria-label="Go to slide ${i + 1}"></button>`)
    .join('');
}

function updateCounter(currentEl, totalEl, current, total) {
  currentEl.textContent = String(current + 1).padStart(2, '0');
  totalEl.textContent = String(total).padStart(2, '0');
}

function updateProgress(progressEl, current, visited) {
  progressEl.querySelectorAll('.deck__dot').forEach((dot, i) => {
    dot.classList.toggle('is-active', i === current);
    dot.classList.toggle('is-visited', visited.has(i) && i !== current);
  });
}

// ---------- Slide transitions + reveals ----------

function showSlide(idx, opts = { reveal: true }) {
  if (state.isAnimating) return;
  if (idx < 0 || idx >= state.slides.length) return;

  const stage = document.getElementById('stage');
  const allSlides = stage.querySelectorAll('.slide');
  const prevIdx = state.current;

  state.isAnimating = true;

  allSlides.forEach((el, i) => {
    el.classList.remove('is-current', 'is-prev');
    // Reset reveals
    el.querySelectorAll('.reveal').forEach((r) => r.classList.remove('is-shown'));
    if (i === idx) el.classList.add('is-current');
    else if (i === prevIdx) el.classList.add('is-prev');
  });

  state.current = idx;
  state.visited.add(idx);

  updateCounter(
    document.getElementById('counter-current'),
    document.getElementById('counter-total'),
    idx,
    state.slides.length
  );
  updateProgress(document.getElementById('progress'), idx, state.visited);

  // Update URL hash for shareability
  history.replaceState(null, '', `#${idx + 1}`);

  // Stagger reveals after slide is in
  if (opts.reveal !== false) {
    const current = stage.querySelector('.slide.is-current');
    if (current) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          current.querySelectorAll('.reveal').forEach((r) => r.classList.add('is-shown'));
        }, 100);
      });
    }
  }

  // Preload next slide's images
  preloadAround(idx);

  setTimeout(() => {
    state.isAnimating = false;
  }, 600);
}

function preloadAround(idx) {
  const stage = document.getElementById('stage');
  const slides = stage.querySelectorAll('.slide');
  [idx + 1, idx + 2].forEach((i) => {
    const s = slides[i];
    if (s) {
      s.querySelectorAll('img').forEach((img) => {
        // Force browser to start loading by reading complete
        if (!img.complete) {
          const tmp = new Image();
          tmp.src = img.src;
        }
      });
    }
  });
}

// ---------- Controls ----------

function attachControls() {
  document.getElementById('btn-prev').addEventListener('click', () => showSlide(state.current - 1));
  document.getElementById('btn-next').addEventListener('click', () => showSlide(state.current + 1));
  document.getElementById('btn-fullscreen').addEventListener('click', toggleFullscreen);

  document.getElementById('progress').addEventListener('click', (e) => {
    const dot = e.target.closest('.deck__dot');
    if (!dot) return;
    showSlide(parseInt(dot.dataset.idx, 10));
  });

  // Click on slide advances (but not when clicking buttons/links)
  document.getElementById('stage').addEventListener('click', (e) => {
    if (e.target.closest('a, button')) return;
    showSlide(state.current + 1);
  });

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'PageDown':
      case 'n':
        e.preventDefault();
        showSlide(state.current + 1);
        break;
      case 'ArrowLeft':
      case 'PageUp':
      case 'p':
        e.preventDefault();
        showSlide(state.current - 1);
        break;
      case 'Home':
        e.preventDefault();
        showSlide(0);
        break;
      case 'End':
        e.preventDefault();
        showSlide(state.slides.length - 1);
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'Escape':
        if (document.fullscreenElement) document.exitFullscreen();
        break;
    }
  });

  // Hint visible briefly on load
  const hint = document.getElementById('hint');
  hint.classList.add('is-shown');
  setTimeout(() => hint.classList.remove('is-shown'), 4000);

  // Hash-based deep-linking
  window.addEventListener('hashchange', () => {
    const n = parseInt(window.location.hash.slice(1), 10);
    if (!isNaN(n) && n >= 1 && n <= state.slides.length) {
      showSlide(n - 1);
    }
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

// ---------- Boot ----------

async function boot() {
  try {
    const manifest = await loadManifest();
    const scenes = {};
    await Promise.all(
      manifest.acts.flatMap((act) =>
        act.scenes.map(async (sid) => {
          scenes[sid] = await loadScene(sid);
        })
      )
    );

    state.slides = expandScenes(manifest, scenes);

    const stage = document.getElementById('stage');
    renderStage(stage, state.slides);
    renderProgress(document.getElementById('progress'), state.slides);

    updateCounter(
      document.getElementById('counter-current'),
      document.getElementById('counter-total'),
      0,
      state.slides.length
    );

    attachControls();

    document.getElementById('deck').classList.add('is-loaded');

    // Initial slide — respect hash if present
    const hashSlide = parseInt(window.location.hash.slice(1), 10);
    const initial = !isNaN(hashSlide) && hashSlide >= 1 ? hashSlide - 1 : 0;
    showSlide(initial);
  } catch (err) {
    console.error(err);
    const stage = document.getElementById('stage');
    stage.innerHTML = `<div style="padding: 4rem; color: #c14a3a; font-family: serif; font-style: italic;">
      Failed to load the deck. ${err.message}
    </div>`;
    document.getElementById('deck').classList.add('is-loaded');
  }
}

document.addEventListener('DOMContentLoaded', boot);
