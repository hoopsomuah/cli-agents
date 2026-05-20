// copilot-sim.js — animated Copilot CLI session
const SCRIPT = [
  { kind: 'user', text: 'The Q2 launch moved from June 1 to June 15. Update the plan of record and operating rhythm. Open a PR for review.' },
  { kind: 'system', text: 'I will perform the following:' },
  { kind: 'action', text: 'Read canon/plan-of-record.md' },
  { kind: 'action', text: 'Read canon/rhythm.md' },
  { kind: 'action', text: 'Edit both files to reflect the new date' },
  { kind: 'action', text: 'Create branch: q2-launch-shift-jun-15' },
  { kind: 'action', text: 'Commit: "Shift Q2 launch to June 15"' },
  { kind: 'action', text: 'Open PR #47 titled "Q2 launch: June 1 → June 15"' },
  { kind: 'system', text: 'Done in 28 seconds. PR is awaiting review.' },
];

export function renderCopilotCLI(target) {
  target.innerHTML = `
    <div class="copilot" id="copilot-stream">
      <div style="color:var(--dark-fg-muted);font-style:italic;margin-bottom:.5rem;">copilot · started in team-canon</div>
    </div>
    <div class="copilot__controls">
      <button class="copilot__btn" id="copilot-play">▶ Run session</button>
      <button class="copilot__btn" id="copilot-reset">Reset</button>
    </div>
  `;

  const stream = target.querySelector('#copilot-stream');
  const playBtn = target.querySelector('#copilot-play');
  const resetBtn = target.querySelector('#copilot-reset');
  let running = false;

  async function play() {
    if (running) return;
    running = true;
    playBtn.disabled = true;
    for (const step of SCRIPT) {
      const line = document.createElement('div');
      line.className = `copilot__line ${step.kind}`;
      line.textContent = step.text;
      stream.appendChild(line);
      // force reflow then animate in
      requestAnimationFrame(() => line.classList.add('is-shown'));
      const delay = step.kind === 'action' ? 380 : step.kind === 'system' ? 600 : 900;
      await new Promise((r) => setTimeout(r, delay));
    }
    playBtn.disabled = false;
    running = false;
  }

  function reset() {
    stream.innerHTML = `<div style="color:var(--dark-fg-muted);font-style:italic;margin-bottom:.5rem;">copilot · started in team-canon</div>`;
  }

  playBtn.addEventListener('click', play);
  resetBtn.addEventListener('click', reset);

  // Auto-play on intersection
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        obs.disconnect();
        setTimeout(play, 500);
      }
    });
  });
  obs.observe(stream);
}
