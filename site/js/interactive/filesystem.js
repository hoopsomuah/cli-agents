// filesystem.js — clickable mini filesystem with simulated terminal output
const TREE = [
  { d: 0, name: 'C:\\Users\\hoop', kind: 'dir' },
  { d: 1, name: 'Documents', kind: 'dir' },
  { d: 2, name: 'plans', kind: 'dir' },
  { d: 2, name: 'reports', kind: 'dir' },
  { d: 1, name: 'Downloads', kind: 'dir' },
  { d: 1, name: 'team-canon', kind: 'dir' },
  { d: 2, name: 'mission.md', kind: 'file' },
  { d: 2, name: 'rhythm.md', kind: 'file' },
  { d: 2, name: 'plan-of-record.md', kind: 'file' },
];

const OUTPUT = {
  'C:\\Users\\hoop': `<span class="prompt">PS&gt;</span> ls\n<span class="out">    Documents/   Downloads/   team-canon/</span>`,
  'Documents': `<span class="prompt">PS&gt;</span> cd Documents; ls\n<span class="out">    plans/   reports/</span>`,
  'plans': `<span class="prompt">PS&gt;</span> ls\n<span class="out">    (empty)</span>`,
  'reports': `<span class="prompt">PS&gt;</span> ls\n<span class="out">    Q1-summary.md   Q2-plan.md</span>`,
  'Downloads': `<span class="prompt">PS&gt;</span> ls\n<span class="out">    (your usual chaos)</span>`,
  'team-canon': `<span class="prompt">PS&gt;</span> ls\n<span class="out">    mission.md   rhythm.md   plan-of-record.md   .git/</span>`,
  'mission.md': `<span class="prompt">PS&gt;</span> cat mission.md\n<span class="out"># Team Mission\n\nHelp the principal run the cleanest,\nmost auditable rhythm of business\nin the org.</span>`,
  'rhythm.md': `<span class="prompt">PS&gt;</span> cat rhythm.md\n<span class="out"># Operating Rhythm\n\nMonday 9am — week ahead.\nFriday 4pm — week behind.\nMonthly — plan-of-record refresh.</span>`,
  'plan-of-record.md': `<span class="prompt">PS&gt;</span> cat plan-of-record.md\n<span class="out"># Plan of Record · Q2 2026\n\nLaunch: June 15 (shifted from Jun 1)\nOwner: Hoop\nReviewers: EA, BM</span>`,
};

export function renderFilesystem(target) {
  target.innerHTML = `
    <div class="fs">
      <div class="fs__tree" id="fs-tree">
        ${TREE.map(
          (n) => `
          <div class="fs__tree-row" data-depth="${n.d}" data-name="${n.name}">
            <span class="icon">${n.kind === 'dir' ? '▸' : '·'}</span>
            <span>${n.name}</span>
          </div>`
        ).join('')}
      </div>
      <pre class="fs__pane" id="fs-pane">Click a folder or file to explore.</pre>
    </div>
  `;
  const tree = target.querySelector('#fs-tree');
  const pane = target.querySelector('#fs-pane');
  tree.querySelectorAll('.fs__tree-row').forEach((row) => {
    row.addEventListener('click', () => {
      tree
        .querySelectorAll('.fs__tree-row')
        .forEach((r) => r.classList.remove('is-active'));
      row.classList.add('is-active');
      const name = row.dataset.name.split('\\').pop().split('/').pop();
      pane.innerHTML = OUTPUT[name] || OUTPUT[row.dataset.name] || '<span class="out">(nothing to show)</span>';
    });
  });
}
