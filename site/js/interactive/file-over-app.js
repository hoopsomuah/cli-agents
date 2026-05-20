// file-over-app.js — pull-quote carousel of Steph Ango's lines
const QUOTES = [
  'In the fullness of time, the files you create are more important than the tools you use to create them.',
  'Apps are ephemeral, but your files have a chance to last.',
  'The ideas hieroglyphs convey are more important than the type of chisel that was used to carve them.',
  "Don't lock your data into a format you can't retrieve.",
  'To read something written on paper all you need is eyeballs.',
];

export function renderFileOverAppQuotes(target) {
  target.innerHTML = `
    <div style="display:grid;gap:1rem;">
      ${QUOTES.map(
        (q) => `
        <blockquote style="margin:0;padding:1.25rem 1.5rem;background:white;border-left:3px solid var(--accent-warm);border-radius:0 8px 8px 0;font-family:var(--font-serif);font-style:italic;font-size:var(--text-base);line-height:1.5;color:oklch(28% 0.02 35);box-shadow:var(--shadow-sm);">
          "${q}"
        </blockquote>`
      ).join('')}
      <p style="font-family:var(--font-mono);font-size:var(--text-xs);color:var(--fg-faint);text-align:right;margin:0;">
        — Steph Ango, <a href="https://stephango.com/file-over-app" target="_blank" rel="noopener">stephango.com/file-over-app</a>
      </p>
    </div>
  `;
}
