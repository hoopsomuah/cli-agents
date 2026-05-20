// acronyms.js — four cards for TTY, PTY, CLI, TUI
const CARDS = [
  {
    letters: 'TTY',
    expansion: 'Teletype',
    body: 'The original machine. A keyboard wired to a printer. Today: any character-based session.',
  },
  {
    letters: 'PTY',
    expansion: 'Pseudo-teletype',
    body: 'A software pretend-TTY. Same conversation, but in memory. Every terminal tab opens one.',
  },
  {
    letters: 'CLI',
    expansion: 'Command-line interface',
    body: 'A program you talk to one command at a time. Verbs in, text out. Copilot CLI lives here.',
  },
  {
    letters: 'TUI',
    expansion: 'Text user interface',
    body: 'An app that lives in the terminal but has menus, panels, and mouse support.',
  },
];

export function renderAcronymCards(target) {
  target.innerHTML = `
    <div class="acronym-cards">
      ${CARDS.map(
        (c) => `
        <div class="acronym-card">
          <p class="acronym-card__letters">${c.letters}</p>
          <p class="acronym-card__expansion">${c.expansion}</p>
          <p class="acronym-card__body">${c.body}</p>
        </div>`
      ).join('')}
    </div>
  `;
}
