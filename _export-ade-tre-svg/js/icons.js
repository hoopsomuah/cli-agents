// icons.js — the icon library and the auto-picker.
//
// Every icon is a fragment of SVG markup drawn in a 48×48 box centered on the
// origin (coordinates roughly -20..20), stroke-based, using currentColor so it
// inherits the node's color. That contract is what makes icons swappable: keep
// the box and the currentColor rule, and every animation that uses the icon
// picks up the new art on the next render.
//
// registerIcon(name, markup, keywords) lets a user bring their own set — see
// flow/README.md.

const registry = new Map();

/**
 * Register (or replace) an icon.
 * @param {string} name      icon id used in DOT: `a [icon=star]`
 * @param {string} markup    inner SVG, 48×48 box centered on (0,0), currentColor
 * @param {string[]} keywords label/id words that should auto-select this icon
 */
export function registerIcon(name, markup, keywords = []) {
  registry.set(name, { name, markup, keywords });
}

export function iconNames() {
  return [...registry.keys()];
}

export function iconMarkup(name) {
  const icon = registry.get(name);
  return icon ? icon.markup : registry.get('circle').markup;
}

// Primitive shapes — the deterministic fallback pool.
const PRIMITIVES = ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'star', 'ring'];

/**
 * Choose an icon for a node: explicit `icon=` attribute wins, then a keyword
 * match against the node's id + label, then a stable hash into the primitive
 * shapes so the same node always gets the same shape across renders.
 */
export function pickIcon(node) {
  const explicit = node.attrs && node.attrs.icon;
  if (explicit && registry.has(explicit)) return explicit;

  const text = `${node.id} ${(node.attrs && node.attrs.label) || ''}`.toLowerCase();
  for (const icon of registry.values()) {
    if (icon.keywords.some((kw) => text.includes(kw))) return icon.name;
  }

  let hash = 0;
  for (const ch of node.id) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return PRIMITIVES[hash % PRIMITIVES.length];
}

/* ------------------------------------------------------------------ */
/* Built-in set: geometric primitives + a few workflow pictographs.    */
/* ------------------------------------------------------------------ */

registerIcon('circle', '<circle r="16"/>');
registerIcon('ring', '<circle r="16"/><circle r="7"/>');
registerIcon('square', '<rect x="-15" y="-15" width="30" height="30" rx="3"/>');
registerIcon('triangle', '<polygon points="0,-16 15,12 -15,12"/>');
registerIcon('diamond', '<polygon points="0,-17 15,0 0,17 -15,0"/>');
registerIcon(
  'hexagon',
  '<polygon points="0,-17 14.7,-8.5 14.7,8.5 0,17 -14.7,8.5 -14.7,-8.5"/>'
);
registerIcon(
  'star',
  '<polygon points="0,-17 4.1,-5.7 16.2,-5.3 6.7,2.2 10,13.8 0,7 -10,13.8 -6.7,2.2 -16.2,-5.3 -4.1,-5.7"/>'
);

registerIcon(
  'cloud',
  '<path d="M12 -4 h-2.5 A16 16 0 1 0 -6 16 h18 a10 10 0 0 0 0 -20 z"/>',
  ['cloud', 'github', 'origin', 'remote', 'hub', 'saas']
);
registerIcon(
  'person',
  '<path d="M16 18 v-4 a8 8 0 0 0 -8 -8 h-16 a8 8 0 0 0 -8 8 v4"/><circle cx="0" cy="-10" r="8"/>',
  ['person', 'user', 'reviewer', 'author', 'dev ', 'developer', 'team', 'customer']
);
registerIcon(
  'laptop',
  '<rect x="-14" y="-13" width="28" height="18" rx="2"/><path d="M-19 10 h38"/>',
  ['laptop', 'local', 'clone', 'workstation', 'machine', 'desktop']
);
registerIcon(
  'server',
  '<rect x="-16" y="-14" width="32" height="12" rx="2"/><rect x="-16" y="2" width="32" height="12" rx="2"/><circle cx="-10" cy="-8" r="1.6" fill="currentColor"/><circle cx="-10" cy="8" r="1.6" fill="currentColor"/>',
  ['server', 'host', 'vm', 'compute', 'backend']
);
registerIcon(
  'database',
  '<ellipse cx="0" cy="-11" rx="14" ry="5"/><path d="M-14 -11 v22 a14 5 0 0 0 28 0 v-22"/>',
  ['database', 'db', 'storage', 'store', 'registry', 'cache']
);
registerIcon(
  'branch',
  '<path d="M-12 -18 V6"/><circle cx="12" cy="-12" r="6"/><circle cx="-12" cy="12" r="6"/><path d="M12 -6 a18 18 0 0 1 -18 18"/>',
  ['branch', 'fork', 'feature/']
);
registerIcon(
  'doc',
  '<path d="M2 -20 h-14 a4 4 0 0 0 -4 4 v32 a4 4 0 0 0 4 4 h24 a4 4 0 0 0 4 -4 V-6 z"/><path d="M2 -20 V-6 h14"/>',
  ['doc', 'file', 'readme', 'request', 'commit', 'spec', 'manifest']
);
registerIcon(
  'gear',
  '<circle r="6"/><circle r="12"/><path d="M0 -12 V-18 M8.5 -8.5 L12.7 -12.7 M12 0 H18 M8.5 8.5 L12.7 12.7 M0 12 V18 M-8.5 8.5 L-12.7 12.7 M-12 0 H-18 M-8.5 -8.5 L-12.7 -12.7"/>',
  ['build', 'ci', 'action', 'pipeline', 'job', 'workflow', 'gear', 'process']
);
registerIcon(
  'box',
  '<path d="M0 -18 L15.6 -9 V9 L0 18 L-15.6 9 V-9 z"/><path d="M-15.6 -9 L0 0 L15.6 -9 M0 0 V18"/>',
  ['package', 'artifact', 'container', 'image', 'box', 'bundle']
);
registerIcon(
  'globe',
  '<circle r="16"/><ellipse rx="7" ry="16"/><path d="M-16 0 h32"/>',
  ['web', 'www', 'internet', 'globe', 'site', 'app service', 'production', 'live']
);
registerIcon(
  'shield',
  '<path d="M0 -18 L14 -13 V0 C14 10 7 15 0 19 C-7 15 -14 10 -14 0 V-13 z"/>',
  ['secure', 'auth', 'guard', 'shield', 'policy', 'protect']
);
registerIcon(
  'check',
  '<circle r="16"/><path d="M-7 0 l5 6 l10 -12"/>',
  ['check', 'test', 'approve', 'merge', 'pass', 'done', 'verified', 'main']
);
registerIcon(
  'rocket',
  '<path d="M0 -19 C7 -13 9 -3 6 7 H-6 C-9 -3 -7 -13 0 -19 z"/><path d="M-6 7 l-4 7 h4.5 M6 7 l4 7 h-4.5 M-1.8 14 h3.6"/><circle cx="0" cy="-6" r="3.5"/>',
  ['deploy', 'ship', 'release', 'launch', 'rocket']
);
