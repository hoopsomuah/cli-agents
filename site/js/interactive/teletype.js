// teletype.js — paper-style stamped-character animation
const MSG = `OPERATOR: WHAT IS THE WEATHER IN ATLANTA?
COMPUTER: 72F, PARTLY CLOUDY. WIND SW 6 KT.
OPERATOR: THANK YOU.
COMPUTER: YOU ARE WELCOME.
`;

export function renderTeletype(target) {
  target.innerHTML = `
    <div class="teletype">
      <div class="teletype__paper" id="tt-paper"></div>
      <div class="teletype__controls">
        <button class="teletype__btn" id="tt-replay">▶ Replay 1963</button>
      </div>
    </div>
  `;
  const paper = target.querySelector('#tt-paper');
  const btn = target.querySelector('#tt-replay');

  function play() {
    paper.innerHTML = '';
    [...MSG].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'ink';
      span.textContent = ch;
      paper.appendChild(span);
      setTimeout(() => span.classList.add('is-shown'), 35 * i + Math.random() * 40);
    });
  }

  btn.addEventListener('click', play);
  // Lazy start
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        obs.disconnect();
        play();
      }
    });
  });
  obs.observe(paper);
}
