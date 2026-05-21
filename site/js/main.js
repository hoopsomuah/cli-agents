// main.js — orchestrator
import { renderActs } from './render.js';
import { initStickyHeader } from './header.js';
import { initInteractives } from './interactive/index.js';
import { initTOC } from './toc.js';

async function loadManifest() {
  const res = await fetch('content/manifest.json');
  if (!res.ok) throw new Error(`manifest fetch failed: ${res.status}`);
  return res.json();
}

async function loadScene(sceneId) {
  const res = await fetch(`content/${sceneId}.md`);
  if (!res.ok) throw new Error(`scene fetch failed: ${sceneId}`);
  const raw = await res.text();
  return parseScene(raw);
}

function parseScene(raw) {
  // Simple frontmatter parser (--- delimited YAML-ish).
  // Supports scalar keys (`key: value`) and list keys (`key:` followed by
  // indented `- "item"` lines). Tolerates both LF and CRLF line endings.
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
      // Possible list — look for "  - item" continuation lines.
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

async function boot() {
  try {
    initStickyHeader();

    const manifest = await loadManifest();
    const scenes = {};
    await Promise.all(
      manifest.acts.flatMap((act) =>
        act.scenes.map(async (sid) => {
          scenes[sid] = await loadScene(sid);
        })
      )
    );

    const root = document.getElementById('content-root');
    renderActs(root, manifest, scenes);

    initTOC(manifest);
    initInteractives();
  } catch (err) {
    console.error(err);
    const root = document.getElementById('content-root');
    if (root) {
      root.innerHTML = `<p style="color: #b22; font-family: var(--font-mono);">
        Failed to load content. Check the console.<br>
        <code>${err.message}</code>
      </p>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', boot);
