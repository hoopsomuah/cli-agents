// pr-authors.js — five identical PR rows from different proposers
const AUTHORS = [
  { author: '👩 Sarah · EA', what: 'Manual edit in VS Code', label: 'Human' },
  { author: '◆ Copilot CLI', what: 'Asked in plain English', label: 'Agent (assisted)' },
  { author: '🤖 Weekly Status Bot', what: 'Scheduled overnight run', label: 'Agent (scheduled)' },
  { author: '👤 External collaborator', what: 'Fork + PR from outside', label: 'Human' },
  { author: '🛠 Dependabot', what: 'Automated dependency update', label: 'Bot' },
];

export function renderPRAuthorComparison(target) {
  target.innerHTML = `
    <div style="background:white;border:1px solid var(--rule);border-radius:10px;overflow:hidden;">
      ${AUTHORS.map(
        (a, i) => `
        <div style="display:flex;gap:1rem;padding:.85rem 1.25rem;${
          i < AUTHORS.length - 1 ? 'border-bottom:1px solid var(--rule);' : ''
        }align-items:center;flex-wrap:wrap;">
          <span style="font-family:var(--font-body);font-weight:600;font-size:.85rem;min-width:180px;">${a.author}</span>
          <span style="font-family:var(--font-serif);font-size:.85rem;color:var(--fg-muted);flex:1;">${a.what}</span>
          <span style="font-family:var(--font-mono);font-size:.7rem;padding:.2rem .65rem;background:var(--bg-2);border-radius:999px;color:var(--fg-muted);">${a.label}</span>
          <span style="font-family:var(--font-mono);font-size:.7rem;color:oklch(55% 0.16 145);">→ PR</span>
        </div>`
      ).join('')}
    </div>
    <p style="font-family:var(--font-serif);font-style:italic;font-size:.85rem;color:var(--fg-muted);text-align:center;margin:1rem 0 0;">
      Five different proposers. One review surface. Identical audit trail.
    </p>
  `;
}
