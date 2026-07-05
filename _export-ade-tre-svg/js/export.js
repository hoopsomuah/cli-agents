// export.js — serialize the scene + schedule into a single self-contained
// animated SVG file (SMIL). The exported file has no scripts, no CSS
// variables, and no external references: colors are resolved to concrete
// values at export time, so the animation plays anywhere SMIL does
// (every modern browser; open the file directly or embed it in an <img>).

const f = (n) => Math.round(n * 100) / 100;

function esc(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Resolve the page's active palette into concrete colors for the export. */
export function resolveTheme() {
  const cs = getComputedStyle(document.documentElement);
  const get = (name, fallback) => (cs.getPropertyValue(name) || '').trim() || fallback;
  return {
    bg: get('--bg-1', '#f6f2e9'),
    fg: get('--fg', '#1a2236'),
    muted: get('--fg-muted', '#5a6274'),
    faint: get('--fg-faint', '#8a8f9c'),
    accent: get('--accent', '#2c4a7c'),
    warm: get('--accent-warm', '#b6532f'),
    rule: get('--rule-strong', '#c9c2b2'),
  };
}

export function exportAnimatedSvg(scene, schedule, theme = resolveTheme()) {
  const titleH = schedule.title ? 64 : 24;
  const captionH = schedule.steps.some((s) => s.caption) ? 78 : 24;
  const W = scene.width;
  const H = titleH + scene.height + captionH;

  const out = [];
  out.push(
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ` +
      `viewBox="0 0 ${f(W)} ${f(H)}" font-family="system-ui, sans-serif">`
  );
  out.push(`<rect width="${f(W)}" height="${f(H)}" fill="${theme.bg}" rx="14"/>`);
  if (schedule.title) {
    out.push(
      `<text x="${f(W / 2)}" y="40" text-anchor="middle" fill="${theme.fg}" ` +
        `font-family="Georgia, 'Times New Roman', serif" font-size="24">${esc(schedule.title)}</text>`
    );
  }

  // Collect animations per target from the schedule.
  const nodeAnims = new Map(scene.nodes.map((n) => [n.id, []]));
  const edgeAnims = new Map(scene.edges.map((e) => [e.key, []]));
  const pulses = [];
  for (const step of schedule.steps) {
    for (const a of step.actions) {
      if (a.type === 'pulse') pulses.push(a);
      else if (a.kind === 'edge') edgeAnims.get(a.key).push(a);
      else if (a.id !== undefined) nodeAnims.get(a.id).push(a);
    }
  }

  const edgeIds = new Map(scene.edges.map((e, i) => [e.key, `fe${i}`]));

  out.push(`<g transform="translate(0 ${titleH})">`);

  /* Edges ---------------------------------------------------------- */
  for (const edge of scene.edges) {
    const id = edgeIds.get(edge.key);
    const anims = edgeAnims.get(edge.key);
    out.push(`<g opacity="1">`);
    out.push(
      `<path id="${id}" d="${edge.d}" fill="none" stroke="${theme.muted}" stroke-width="2" ` +
        `stroke-dasharray="${f(edge.len)}" stroke-dashoffset="${f(edge.len)}">`
    );
    for (const a of anims) {
      if (a.type === 'show') {
        out.push(
          `<animate attributeName="stroke-dashoffset" to="0" begin="${f(a.at)}s" dur="${f(a.dur)}s" ` +
            `calcMode="spline" keySplines="0.4 0 0.2 1" values="${f(edge.len)};0" keyTimes="0;1" fill="freeze"/>`
        );
      }
    }
    out.push(`</path>`);

    const tail = anims.filter((a) => a.type === 'show');
    const arrowAnims = tail
      .map(
        (a) =>
          `<animate attributeName="opacity" to="1" begin="${f(a.at + a.dur * 0.6)}s" dur="${f(a.dur * 0.4)}s" fill="freeze"/>`
      )
      .join('');
    out.push(
      `<polygon points="11,0 -3,5.5 -3,-5.5" fill="${theme.muted}" opacity="0" ` +
        `transform="translate(${f(edge.end.x)} ${f(edge.end.y)}) rotate(${f(edge.endAngle)})">${arrowAnims}</polygon>`
    );
    if (edge.label) {
      out.push(
        `<text x="${f(edge.mid.x)}" y="${f(edge.mid.y - 10)}" text-anchor="middle" font-size="11.5" ` +
          `fill="${theme.faint}" opacity="0">${arrowAnims}${esc(edge.label)}</text>`
      );
    }
    // hide / dim / undim on the whole edge group
    for (const a of anims) {
      if (a.type === 'hide') out.push(`<animate attributeName="opacity" to="0" begin="${f(a.at)}s" dur="${f(a.dur)}s" fill="freeze"/>`);
      if (a.type === 'dim') out.push(`<animate attributeName="opacity" to="0.22" begin="${f(a.at)}s" dur="${f(a.dur)}s" fill="freeze"/>`);
      if (a.type === 'undim') out.push(`<animate attributeName="opacity" to="1" begin="${f(a.at)}s" dur="${f(a.dur)}s" fill="freeze"/>`);
    }
    out.push(`</g>`);
  }

  /* Nodes ---------------------------------------------------------- */
  for (const node of scene.nodes) {
    const anims = nodeAnims.get(node.id);
    out.push(`<g transform="translate(${f(node.x)} ${f(node.y)})" opacity="0">`);
    for (const a of anims) {
      if (a.type === 'show') out.push(`<animate attributeName="opacity" to="1" begin="${f(a.at)}s" dur="${f(Math.min(a.dur, 0.5))}s" fill="freeze"/>`);
      if (a.type === 'hide') out.push(`<animate attributeName="opacity" to="0" begin="${f(a.at)}s" dur="${f(a.dur)}s" fill="freeze"/>`);
      if (a.type === 'dim') out.push(`<animate attributeName="opacity" to="0.22" begin="${f(a.at)}s" dur="${f(a.dur)}s" fill="freeze"/>`);
      if (a.type === 'undim' || a.type === 'highlight') out.push(`<animate attributeName="opacity" to="1" begin="${f(a.at)}s" dur="${f(a.dur)}s" fill="freeze"/>`);
    }

    // Highlight ring
    const ringAnims = anims
      .filter((a) => a.type === 'highlight' || a.type === 'unhighlight')
      .map(
        (a) =>
          `<animate attributeName="opacity" to="${a.type === 'highlight' ? 1 : 0}" begin="${f(a.at)}s" dur="${f(a.dur)}s" fill="freeze"/>`
      )
      .join('');
    out.push(`<circle r="36" fill="none" stroke="${theme.warm}" stroke-width="2.5" opacity="0">${ringAnims}</circle>`);

    // Pop-in scale on the inner group
    const popAnims = anims
      .filter((a) => a.type === 'show')
      .map(
        (a) =>
          `<animateTransform attributeName="transform" type="scale" values="0.55;1.06;1" keyTimes="0;0.7;1" ` +
            `begin="${f(a.at)}s" dur="${f(a.dur)}s" fill="freeze"/>`
      )
      .join('');
    out.push(`<g transform="scale(0.55)">${popAnims}`);
    out.push(
      `<g fill="none" stroke="${theme.fg}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${node.iconMarkup}</g>`
    );
    const label = node.labelLines
      .map((line, i) => `<tspan x="0" y="${42 + i * 15}">${esc(line)}</tspan>`)
      .join('');
    out.push(`<text text-anchor="middle" font-size="12.5" fill="${theme.muted}">${label}</text>`);
    out.push(`</g></g>`);
  }

  /* Pulses ---------------------------------------------------------- */
  for (const pulse of pulses) {
    const pathId = edgeIds.get(pulse.key);
    const keyPoints = pulse.reverse ? 'keyPoints="1;0" keyTimes="0;1" calcMode="linear"' : 'keyPoints="0;1" keyTimes="0;1" calcMode="linear"';
    const motion =
      `<animateMotion begin="${f(pulse.at)}s" dur="${f(pulse.dur)}s" ${keyPoints} fill="freeze">` +
      `<mpath xlink:href="#${pathId}" href="#${pathId}"/></animateMotion>`;
    const fade =
      `<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.9;1" ` +
        `begin="${f(pulse.at)}s" dur="${f(pulse.dur)}s" fill="freeze"/>`;
    out.push(`<g opacity="0">${fade}${motion}<circle r="12" fill="${theme.warm}" opacity="0.25"/><circle r="6" fill="${theme.warm}"/></g>`);
  }

  out.push(`</g>`); // content group

  /* Captions --------------------------------------------------------- */
  const captioned = schedule.steps.filter((s) => s.caption);
  captioned.forEach((step, i) => {
    const next = captioned[i + 1];
    const inAnim = `<animate attributeName="opacity" to="1" begin="${f(step.t0)}s" dur="0.3s" fill="freeze"/>`;
    const outAnim = next
      ? `<animate attributeName="opacity" to="0" begin="${f(next.t0)}s" dur="0.25s" fill="freeze"/>`
      : '';
    out.push(
      `<text x="${f(W / 2)}" y="${f(H - captionH / 2 + 6)}" text-anchor="middle" opacity="0" ` +
        `font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="18" ` +
        `fill="${theme.fg}">${inAnim}${outAnim}${esc(step.caption)}</text>`
    );
  });

  out.push(`</svg>`);
  return out.join('\n');
}
