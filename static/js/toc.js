(() => {
  const article = document.querySelector('[data-article]');
  if (!article) return;
  const track = document.querySelector('[data-toc]');
  const links = [...document.querySelectorAll('.toc-track a, .mobile-toc a')];
  const headings = [...article.querySelectorAll('h2[id], h3[id]')];
  if (!links.length || !headings.length) return;
  let activeId;
  let scheduled = false;
  const idFor = link => {
    try { return decodeURIComponent(new URL(link.href).hash.slice(1)); }
    catch { return ''; }
  };
  const update = () => {
    scheduled = false;
    let active = headings[0];
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= 120) active = heading;
      else break;
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = headings[headings.length - 1];
    if (activeId !== active.id) {
      activeId = active.id;
      links.forEach(link => {
        if (idFor(link) === activeId) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    const current = track?.querySelector('[aria-current="location"]');
    if (current) {
      const nav = track.querySelector('nav');
      const navRect = nav.getBoundingClientRect();
      const linkRect = current.getBoundingClientRect();
      if (linkRect.top < navRect.top) nav.scrollTop -= navRect.top - linkRect.top;
      else if (linkRect.bottom > navRect.bottom) nav.scrollTop += linkRect.bottom - navRect.bottom;

    }
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  if (track) track.querySelector('nav').addEventListener('scroll', schedule, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(article);
  links.forEach(link => link.addEventListener('click', () => {
    const mobile = link.closest('.mobile-toc');
    if (mobile) mobile.open = false;
  }));
  update();
})();
