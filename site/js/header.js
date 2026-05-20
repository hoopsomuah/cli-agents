// header.js — sticky header that swaps theme between dark and light contexts
export function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const setLight = () => {
    header.classList.add('is-light');
    header.classList.remove('is-dark');
  };
  const setDark = () => {
    header.classList.add('is-dark');
    header.classList.remove('is-light');
  };

  // Initially over hero (dark)
  setDark();

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          setDark();
        } else {
          setLight();
        }
      });
    },
    { threshold: [0, 0.1, 0.5, 1] }
  );
  obs.observe(hero);
}
