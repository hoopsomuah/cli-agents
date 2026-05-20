// tui-gallery.js — gallery of representative TUI tools
const TOOLS = [
  {
    name: 'lazygit',
    role: 'Visual interface for Git, in the terminal',
    preview: `┌─ Branches ────┐ ┌─ Files ──────────┐
│ * main        │ │ M  rhythm.md     │
│   q2-shift    │ │ ?  status-w21.md │
│   draft-mis…  │ │                  │
└───────────────┘ └──────────────────┘
[space] stage   [c] commit   [P] push`,
  },
  {
    name: 'gh dash',
    role: 'GitHub PR + issue dashboard',
    preview: `╭─ Pull Requests ─────────────────────╮
│ #47 Q2 launch: Jun 1 → Jun 15  open │
│ #46 Add operating rhythm doc   open │
│ #45 Fix typo in mission.md   merged │
╰─────────────────────────────────────╯`,
  },
  {
    name: 'htop',
    role: 'Live view of running processes',
    preview: `CPU [|||||           23%]   Mem [|||||| 41%]
PID    USER     CPU%  MEM%  COMMAND
2843   hoop      8.1   3.2  copilot
1102   hoop      4.5   2.1  obsidian
918    hoop      1.2   0.8  pwsh`,
  },
];

export function renderTuiGallery(target) {
  target.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;">
      ${TOOLS.map(
        (t) => `
        <div style="background:#1a1f2b;color:#d4d4d4;border-radius:10px;padding:1rem 1.25rem;font-family:var(--font-mono);font-size:.7rem;line-height:1.5;">
          <p style="margin:0 0 .25rem;color:#98c379;font-size:.85rem;font-weight:700;">${t.name}</p>
          <p style="margin:0 0 .75rem;color:#888;font-size:.7rem;font-family:var(--font-body);font-style:italic;">${t.role}</p>
          <pre style="margin:0;font-size:.65rem;color:#bbb;white-space:pre;">${t.preview}</pre>
        </div>`
      ).join('')}
    </div>
  `;
}
