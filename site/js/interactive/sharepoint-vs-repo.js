// sharepoint-vs-repo.js — toggle-able comparison table
const ROWS = [
  { need: 'Centralized file storage', sp: 'yes', repo: 'yes' },
  { need: 'Permissions', sp: 'granular', repo: 'per-repo / per-branch' },
  { need: 'Full diff history', sp: 'partial', repo: 'complete, instant' },
  { need: 'Sign-off attached to file', sp: 'bolted-on', repo: 'built-in (PR)' },
  { need: 'Edit by talking to an agent', sp: 'no', repo: 'yes' },
  { need: 'Read natively by AI', sp: 'friction', repo: 'native' },
  { need: 'Stable permanent URL', sp: 'fragile', repo: 'permanent' },
  { need: 'Vendor change cost', sp: 'high', repo: 'git clone' },
  { need: 'Generated public site', sp: 'expensive', repo: 'free (Pages)' },
];

function badge(val, kind) {
  const isYes = ['yes', 'native', 'complete, instant', 'built-in (PR)', 'permanent', 'git clone', 'free (Pages)', 'per-repo / per-branch'].includes(val);
  const isPartial = ['partial', 'bolted-on', 'granular'].includes(val);
  const isBad = ['no', 'friction', 'fragile', 'high', 'expensive'].includes(val);
  let bg = 'oklch(94% 0.04 145)', color = 'oklch(35% 0.16 145)';
  if (isPartial) { bg = 'oklch(94% 0.04 75)'; color = 'oklch(40% 0.14 75)'; }
  if (isBad) { bg = 'oklch(94% 0.04 25)'; color = 'oklch(45% 0.16 25)'; }
  return `<span style="font-family:var(--font-mono);font-size:.7rem;padding:.15rem .55rem;background:${bg};color:${color};border-radius:4px;">${val}</span>`;
}

export function renderSharepointVsRepo(target) {
  target.innerHTML = `
    <div style="background:white;border:1px solid var(--rule);border-radius:10px;overflow:hidden;">
      <div style="display:grid;grid-template-columns:1.4fr 1fr 1fr;background:var(--bg-1);padding:.75rem 1.25rem;font-family:var(--font-mono);font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:var(--fg-muted);border-bottom:1px solid var(--rule);">
        <span>Need</span>
        <span>SharePoint</span>
        <span>Repo + Pages</span>
      </div>
      ${ROWS.map(
        (r, i) => `
        <div style="display:grid;grid-template-columns:1.4fr 1fr 1fr;align-items:center;padding:.75rem 1.25rem;${
          i < ROWS.length - 1 ? 'border-bottom:1px solid var(--rule);' : ''
        }">
          <span style="font-family:var(--font-body);font-size:.85rem;">${r.need}</span>
          <span>${badge(r.sp)}</span>
          <span>${badge(r.repo)}</span>
        </div>`
      ).join('')}
    </div>
  `;
}
