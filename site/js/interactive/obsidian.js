// obsidian.js — illustrated Obsidian-on-repo workflow
export function renderObsidianDemo(target) {
  target.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:1rem;">
      <div style="background:white;border:1px solid var(--rule);border-radius:10px;padding:1.25rem;">
        <p style="font-family:var(--font-mono);font-size:.7rem;color:var(--fg-faint);letter-spacing:.1em;text-transform:uppercase;margin:0 0 .5rem;">1 · Edit</p>
        <p style="font-family:var(--font-body);font-weight:600;margin:0 0 .25rem;">Obsidian</p>
        <p style="font-family:var(--font-serif);font-size:.85rem;color:var(--fg-muted);margin:0;">Friendly editor. Search. Backlinks. Saves to plain .md files.</p>
      </div>
      <div style="background:white;border:1px solid var(--rule);border-radius:10px;padding:1.25rem;">
        <p style="font-family:var(--font-mono);font-size:.7rem;color:var(--fg-faint);letter-spacing:.1em;text-transform:uppercase;margin:0 0 .5rem;">2 · Commit</p>
        <p style="font-family:var(--font-body);font-weight:600;margin:0 0 .25rem;">Terminal</p>
        <p style="font-family:var(--font-serif);font-size:.85rem;color:var(--fg-muted);margin:0;">git add . && git commit -m "..." — one line per saved version.</p>
      </div>
      <div style="background:white;border:1px solid var(--rule);border-radius:10px;padding:1.25rem;">
        <p style="font-family:var(--font-mono);font-size:.7rem;color:var(--fg-faint);letter-spacing:.1em;text-transform:uppercase;margin:0 0 .5rem;">3 · Share</p>
        <p style="font-family:var(--font-body);font-weight:600;margin:0 0 .25rem;">GitHub</p>
        <p style="font-family:var(--font-serif);font-size:.85rem;color:var(--fg-muted);margin:0;">git push — change is live, visible, link-able, diff-able.</p>
      </div>
      <div style="background:white;border:1px solid var(--rule);border-radius:10px;padding:1.25rem;">
        <p style="font-family:var(--font-mono);font-size:.7rem;color:var(--fg-faint);letter-spacing:.1em;text-transform:uppercase;margin:0 0 .5rem;">4 · Sign off</p>
        <p style="font-family:var(--font-body);font-weight:600;margin:0 0 .25rem;">Pull Request</p>
        <p style="font-family:var(--font-serif);font-size:.85rem;color:var(--fg-muted);margin:0;">Reviewer approves. Audit log forever.</p>
      </div>
    </div>
  `;
}
