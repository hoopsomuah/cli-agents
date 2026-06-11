// model-data.js — load the content model (manifest + every scene's frontmatter)
// once, and derive an image-usage map. Shared by the gallery and the content
// model viewer. Cached so opening either panel twice costs one fetch round.

import { BASE } from './util.js';

const IMAGE_FIELDS = ['hero_image', 'deck_image'];
const DIAGRAM_FIELDS = ['diagram', 'deck_diagram'];

let cache = null;

// A frontmatter parser mirroring site/js/main.js → parseScene (scalars + lists).
function parseFrontmatter(raw) {
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

function actGroups(manifest) {
  const groups = manifest.acts ? manifest.acts.slice() : [];
  if (Array.isArray(manifest.appendix)) {
    groups.push({ id: 'appendix', title: 'Appendix', kind: 'appendix', scenes: manifest.appendix });
  } else if (manifest.appendix && Array.isArray(manifest.appendix.scenes)) {
    groups.push(Object.assign({ id: 'appendix', title: 'Appendix' }, manifest.appendix));
  }
  return groups;
}

export async function getModel() {
  if (cache) return cache;
  const res = await fetch(`${BASE}content/manifest.json`);
  if (!res.ok) throw new Error(`manifest fetch failed: ${res.status}`);
  const manifest = await res.json();

  const groups = actGroups(manifest);
  const scenes = {};
  await Promise.all(
    groups.flatMap((g) =>
      (g.scenes || []).map(async (sid) => {
        try {
          const r = await fetch(`${BASE}content/${sid}.md`);
          scenes[sid] = r.ok ? parseFrontmatter(await r.text()) : { meta: {}, body: '', missing: true };
        } catch (e) {
          scenes[sid] = { meta: {}, body: '', missing: true };
        }
      })
    )
  );

  // image filename -> [{ sceneId, scene, field }]
  const usage = new Map();
  const note = (file, sceneId, scene, field) => {
    if (!file || typeof file !== 'string') return;
    if (!usage.has(file)) usage.set(file, []);
    usage.get(file).push({ sceneId, scene, field });
  };
  for (const g of groups) {
    for (const sid of g.scenes || []) {
      const meta = (scenes[sid] && scenes[sid].meta) || {};
      const num = meta.scene || sid;
      IMAGE_FIELDS.forEach((f) => note(meta[f], sid, num, f));
      DIAGRAM_FIELDS.forEach((f) => {
        if (typeof meta[f] === 'string' && meta[f] !== 'false') note(meta[f], sid, num, f);
      });
    }
  }

  cache = { manifest, groups, scenes, usage };
  return cache;
}

export function clearModelCache() {
  cache = null;
}
