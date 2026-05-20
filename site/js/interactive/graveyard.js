// graveyard.js — the filename graveyard
const FILES = [
  'Roadmap_Q1.docx',
  'Roadmap_Q1_v2.docx',
  'Roadmap_Q1_v2_edited.docx',
  'Roadmap_Q1_v2_edited_FINAL.docx',
  'Roadmap_Q1_v2_edited_FINAL_v3.docx',
  'Roadmap_Q1_FINAL_actually-final.docx',
  'Roadmap_Q1_FINAL_actually-final_USE-THIS-ONE.docx',
  'Roadmap_Q1 (Sarah\'s copy).docx',
  'Roadmap_Q1 (1).docx',
];

export function renderGraveyard(target) {
  target.innerHTML = `
    <div class="graveyard">
      <ul class="graveyard__list">
        ${FILES.map(
          (f, i) => `
          <li>
            <span class="marker">✗</span>
            <span>${f}</span>
          </li>`
        ).join('')}
      </ul>
      <p class="graveyard__caption">
        Which one is real? You can't tell from looking. Neither can your team. Neither can an agent.
      </p>
    </div>
  `;
}
