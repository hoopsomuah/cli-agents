// formats.js — format shootout grid
const GOOD = [
  { ext: '.md', desc: 'Prose, plans, notes' },
  { ext: '.csv', desc: 'Tables, budgets, lists' },
  { ext: '.json', desc: 'Structured data' },
  { ext: '.yml', desc: 'Settings, config' },
  { ext: '.mmd', desc: 'Diagrams (Mermaid)' },
];
const BAD = [
  { ext: '.docx', desc: 'Zipped binary' },
  { ext: '.xlsx', desc: 'Opaque to agents' },
  { ext: '.pptx', desc: 'Visual noise' },
  { ext: '.pdf', desc: 'Output, not source' },
  { ext: 'Notion blocks', desc: 'Locked in' },
];

export function renderFormatShootout(target) {
  target.innerHTML = `
    <p style="font-family:var(--font-mono);font-size:.75rem;color:oklch(35% 0.16 145);letter-spacing:.1em;text-transform:uppercase;margin:0 0 .5rem;">Agent-friendly</p>
    <div class="formats" style="margin-bottom:1.25rem;">
      ${GOOD.map(
        (f) => `
        <div class="format-tile good">
          <p class="format-tile__ext">${f.ext}</p>
          <p class="format-tile__desc">${f.desc}</p>
        </div>`
      ).join('')}
    </div>
    <p style="font-family:var(--font-mono);font-size:.75rem;color:oklch(45% 0.16 25);letter-spacing:.1em;text-transform:uppercase;margin:0 0 .5rem;">Avoid as source of truth</p>
    <div class="formats">
      ${BAD.map(
        (f) => `
        <div class="format-tile bad">
          <p class="format-tile__ext">${f.ext}</p>
          <p class="format-tile__desc">${f.desc}</p>
        </div>`
      ).join('')}
    </div>
  `;
}
