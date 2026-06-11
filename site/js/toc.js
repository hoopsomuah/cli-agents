// toc.js — sticky table of contents with scroll-spy
export function initTOC(manifest) {
  const list = document.getElementById('toc-list');
  if (!list) return;

  const html = manifest.acts
    .map((act, i) => {
      const sceneLinks = act.scenes
        .map((sid) => {
          const sceneEl = document.getElementById(`scene-${sid.slice(0, 2)}`);
          if (!sceneEl) return '';
          const title = sceneEl.querySelector('.scene__title')?.textContent || sid;
          return `<li class="toc-scene"><a href="#scene-${sid.slice(0, 2)}">${title}</a></li>`;
        })
        .join('');
      return `<li class="toc-act"><a href="#${act.id}">${
        act.kind === 'appendix'
          ? 'Appendix'
          : `Act ${['I', 'II', 'III', 'IV', 'V', 'VI'][i]}`
      } — ${act.title}</a></li>${sceneLinks}`;
    })
    .join('');
  list.innerHTML = html;

  // Scroll spy
  const links = list.querySelectorAll('a');
  const targets = Array.from(links)
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const link = list.querySelector(`a[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );
  targets.forEach((t) => obs.observe(t));
}
