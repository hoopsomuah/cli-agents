// scene.js — turns parsed DOT into a render-ready model shared by the live
// player (player.js) and the standalone SVG exporter (export.js).

import { layoutGraph } from './layout.js';
import { pickIcon, iconMarkup } from './icons.js';

const LABEL_WRAP = 16; // soft character budget per label line

function wrapLabel(text) {
  const explicit = text.split('\n');
  const lines = [];
  for (const part of explicit) {
    if (part.length <= LABEL_WRAP) { lines.push(part); continue; }
    let current = '';
    for (const word of part.split(' ')) {
      if (current && current.length + word.length + 1 > LABEL_WRAP) {
        lines.push(current);
        current = word;
      } else {
        current = current ? `${current} ${word}` : word;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

/**
 * Build the scene model:
 * { width, height, nodes: [{ id, x, y, icon, iconMarkup, labelLines }],
 *   edges: [{ key, from, to, d, len, end, endAngle, mid, label }] }
 */
export function buildScene(graph) {
  const layout = layoutGraph(graph);

  const nodes = layout.nodes.map((n) => {
    const icon = pickIcon(n);
    return {
      id: n.id,
      x: n.x,
      y: n.y,
      icon,
      iconMarkup: iconMarkup(icon),
      labelLines: wrapLabel(n.attrs.label || n.id),
    };
  });

  const edges = layout.edges.map((e) => ({ ...e, label: e.attrs.label || '' }));

  // Labels can run two or three lines below the icon; pad the extent.
  const maxLines = Math.max(1, ...nodes.map((n) => n.labelLines.length));
  return {
    width: layout.width,
    height: layout.height + (maxLines - 1) * 15,
    horizontal: layout.horizontal,
    nodes,
    edges,
  };
}
