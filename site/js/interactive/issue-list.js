// issue-list.js — visual list of the 8 starter issues
const ISSUES = [
  { n: 1, title: 'Install Windows Terminal and take a screenshot', desc: 'Walk through Step 1, save a screenshot, open a PR.', labels: ['good first issue', 'step-1'] },
  { n: 2, title: 'Add yourself to TEAM.md', desc: 'Exercise the full branch → edit → commit → push → PR loop.', labels: ['good first issue', 'step-2'] },
  { n: 3, title: 'Clone this repo as an Obsidian vault', desc: 'Open a scene file in Obsidian and add reader notes.', labels: ['good first issue', 'step-3'] },
  { n: 4, title: 'Fix a typo anywhere in this site', desc: 'Practice a surgical one-line PR.', labels: ['good first issue', 'low-effort'] },
  { n: 5, title: 'Propose a new scene', desc: 'What\'s missing? Comment with the proposal.', labels: ['enhancement', 'discussion'] },
  { n: 6, title: 'Try Copilot CLI on this repo', desc: 'Ask Copilot two questions, share the transcript.', labels: ['step-4', 'experiment'] },
  { n: 7, title: 'Draft mission.md for the team', desc: 'First pass at the team mission as Markdown in canon/.', labels: ['canon', 'discussion'] },
  { n: 8, title: 'Compare one SharePoint doc to this workflow', desc: 'Pick a real doc, write an analysis, propose a move.', labels: ['analysis', 'discussion'] },
];

export function renderIssueList(target) {
  target.innerHTML = `
    <div class="issues">
      ${ISSUES.map(
        (i) => `
        <div class="issue">
          <span class="issue__icon">#${i.n}</span>
          <div class="issue__body">
            <p class="issue__title">${i.title}</p>
            <p class="issue__desc">${i.desc}</p>
            <div class="issue__labels">
              ${i.labels
                .map(
                  (l) =>
                    `<span class="issue__label ${l === 'good first issue' ? 'first' : ''}">${l}</span>`
                )
                .join('')}
            </div>
          </div>
        </div>`
      ).join('')}
    </div>
    <p style="font-family:var(--font-mono);font-size:.75rem;color:var(--fg-muted);text-align:center;margin:1.5rem 0 0;">
      → <a href="https://github.com/hoopsomuah/cli-agents/issues" target="_blank" rel="noopener" style="color:var(--accent);">Open the live issues tab on GitHub</a>
    </p>
  `;
}
