// hero-terminal.js — the typing terminal in the hero
const SCRIPT = [
  { type: 'prompt', text: 'PS C:\\Users\\hoop> ' },
  { type: 'cmd', text: 'cd team-canon' },
  { type: 'newline' },
  { type: 'prompt', text: 'PS C:\\team-canon> ' },
  { type: 'cmd', text: 'copilot' },
  { type: 'newline' },
  { type: 'out', text: '◆ Copilot CLI · ready in team-canon' },
  { type: 'newline' },
  { type: 'prompt', text: '> ' },
  { type: 'cmd', text: 'Move Q2 launch from Jun 1 to Jun 15. Open a PR.' },
  { type: 'newline' },
  { type: 'out', text: '✓ branch created · q2-launch-shift-jun-15' },
  { type: 'newline' },
  { type: 'out', text: '✓ 2 files edited · 4 lines changed' },
  { type: 'newline' },
  { type: 'out', text: '✓ PR #47 opened · awaiting review' },
  { type: 'newline' },
  { type: 'cursor' },
];

function typeText(el, text, speed = 18) {
  return new Promise((resolve) => {
    let i = 0;
    const tick = () => {
      if (i >= text.length) return resolve();
      el.append(text[i]);
      i++;
      setTimeout(tick, speed + Math.random() * 12);
    };
    tick();
  });
}

async function play(el) {
  el.innerHTML = '';
  for (const step of SCRIPT) {
    if (step.type === 'newline') {
      el.append('\n');
      await new Promise((r) => setTimeout(r, 80));
      continue;
    }
    if (step.type === 'cursor') {
      const c = document.createElement('span');
      c.className = 'cursor';
      el.append(c);
      continue;
    }
    const span = document.createElement('span');
    span.className = step.type === 'prompt' ? 'prompt' : step.type === 'out' ? 'out' : '';
    el.append(span);
    if (step.type === 'prompt') {
      span.textContent = step.text;
      await new Promise((r) => setTimeout(r, 200));
    } else if (step.type === 'cmd') {
      await typeText(span, step.text, 28);
      await new Promise((r) => setTimeout(r, 260));
    } else if (step.type === 'out') {
      span.textContent = step.text;
      await new Promise((r) => setTimeout(r, 320));
    }
  }
}

export function initHeroTerminal() {
  const body = document.getElementById('hero-terminal-body');
  if (!body) return;
  // Defer until hero is visible
  const start = () => play(body);
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          obs.disconnect();
          setTimeout(start, 600);
        }
      });
    });
    obs.observe(body);
  } else {
    setTimeout(start, 800);
  }
}
