// install-checklist.js — interactive 9-step checklist with localStorage persistence
const STEPS = [
  { id: 1, title: 'Install Windows Terminal', hint: '5 min · From the Microsoft Store. On Windows 11 it ships built-in.' },
  { id: 2, title: 'Install Git', hint: '5 min · winget install --id Git.Git' },
  { id: 3, title: 'Install GitHub CLI (gh)', hint: '5 min · winget install --id GitHub.cli, then gh auth login' },
  { id: 4, title: 'Install Copilot CLI', hint: '5 min · gh extension install github/gh-copilot' },
  { id: 5, title: 'Install Obsidian', hint: '5 min · From obsidian.md' },
  { id: 6, title: 'Clone this repo', hint: '5 min · git clone https://github.com/hoopsomuah/cli-agents.git' },
  { id: 7, title: 'Open repo as Obsidian vault', hint: '2 min · File → Open vault → Open folder as vault' },
  { id: 8, title: 'Make your first PR', hint: '10 min · Add yourself to TEAM.md and gh pr create' },
  { id: 9, title: 'Resolve a starter issue', hint: '3 min · Pick a "good first issue" and close it via PR' },
];

const STORAGE = 'cli-agents:install-checklist';

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE) || '{}');
  } catch (e) {
    return {};
  }
}
function save(state) {
  try {
    localStorage.setItem(STORAGE, JSON.stringify(state));
  } catch (e) {}
}

export function renderInstallChecklist(target) {
  const state = load();

  target.innerHTML = `
    <div class="checklist">
      ${STEPS.map(
        (s) => `
        <div class="checklist__item">
          <span class="checklist__checkbox ${state[s.id] ? 'is-checked' : ''}" data-step="${s.id}" role="checkbox" aria-checked="${!!state[s.id]}" tabindex="0"></span>
          <div class="checklist__body">
            <p class="checklist__title">Step ${s.id} — ${s.title}</p>
            <p class="checklist__hint">${s.hint}</p>
          </div>
        </div>`
      ).join('')}
    </div>
    <p style="font-family:var(--font-mono);font-size:.7rem;color:var(--fg-faint);text-align:center;margin:1rem 0 0;">
      Your progress saves locally. Tick boxes as you go.
    </p>
  `;

  target.querySelectorAll('.checklist__checkbox').forEach((box) => {
    const toggle = () => {
      const id = box.dataset.step;
      const s = load();
      s[id] = !s[id];
      save(s);
      box.classList.toggle('is-checked', s[id]);
      box.setAttribute('aria-checked', String(!!s[id]));
    };
    box.addEventListener('click', toggle);
    box.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle();
      }
    });
  });
}
