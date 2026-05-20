// repo-timeline.js — interactive scroll through commit history
const COMMITS = [
  { sha: '3a8f2c1', when: 'Tue May 19 · 14:47', who: 'hoop', msg: 'Update Q2 plan: shifted launch to June 15' },
  { sha: 'b2d4e09', when: 'Mon May 18 · 09:22', who: 'sarah', msg: 'Add Friday status update slot to rhythm' },
  { sha: 'f1c0a8b', when: 'Fri May 15 · 16:01', who: 'hoop', msg: 'Decisions: archive Q1 launch retrospective' },
  { sha: '7e3b2d6', when: 'Wed May 13 · 11:14', who: 'sarah', msg: 'Mission: tighten paragraph 2 per principal feedback' },
  { sha: '4a9f0c2', when: 'Mon May 11 · 08:55', who: 'hoop', msg: 'Initial commit — bootstrap team canon repo' },
];

export function renderRepoTimeline(target) {
  target.innerHTML = `
    <div style="background:white;border:1px solid var(--rule);border-radius:10px;padding:1.5rem;">
      <div style="display:flex;align-items:baseline;gap:1rem;margin-bottom:1rem;">
        <strong style="font-family:var(--font-mono);font-size:.85rem;">team-canon</strong>
        <span style="font-family:var(--font-mono);font-size:.7rem;color:var(--fg-faint);">5 commits · main</span>
      </div>
      <ol style="list-style:none;padding:0;margin:0;border-left:2px solid var(--rule);">
        ${COMMITS.map(
          (c) => `
          <li style="position:relative;padding:.75rem 0 .75rem 1.5rem;">
            <span style="position:absolute;left:-7px;top:1rem;width:12px;height:12px;border-radius:50%;background:var(--accent);"></span>
            <div style="display:flex;flex-wrap:wrap;gap:.5rem 1rem;align-items:baseline;">
              <code style="background:var(--bg-2);font-size:.7rem;padding:.15rem .4rem;border-radius:3px;color:var(--accent);">${c.sha}</code>
              <span style="font-family:var(--font-body);font-size:.85rem;font-weight:500;color:var(--fg);">${c.msg}</span>
            </div>
            <div style="font-family:var(--font-mono);font-size:.7rem;color:var(--fg-faint);margin-top:.25rem;">
              ${c.who} · ${c.when}
            </div>
          </li>`
        ).join('')}
      </ol>
    </div>
  `;
}
