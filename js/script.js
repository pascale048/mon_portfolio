// Menu mobile
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));

// Lien actif selon la section visible
const links = [...menu.querySelectorAll('a')];
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => io.observe(s));

// Texte tapé dans la page de garde
const words = ['Reconversion réussie.', 'Développement web & applications métiers.', 'Automatisation & données.'];
const typed = document.getElementById('typed');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) { typed.textContent = words[0]; }
else {
  let w = 0, c = 0, del = false;
  (function tick() {
    const word = words[w];
    typed.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
    if (del && c === 0) { del = false; w = (w + 1) % words.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 30 : 60);
  })();
}


// Bouton e-mail : l'adresse n'apparaît pas en clair dans le code (anti-collecte par les robots)
const mailBtn = document.getElementById('mail-btn');
mailBtn.addEventListener('click', e => {
  e.preventDefault();
  const { u, d, s } = mailBtn.dataset;
  location.href = 'mailto:' + u + '@' + d + '?subject=' + encodeURIComponent(s);
});

document.getElementById('year').textContent = new Date().getFullYear();

// Apparition douce des cartes au défilement
// (réutilise la constante « reduce » définie plus haut dans ce fichier)
if (!reduce && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js');

  const targets = document.querySelectorAll(
    '.block, .facts, .company, .project, .skill, .mooc article, .sources li, .fiches'
  );

  // Petit décalage entre cartes voisines pour un effet en cascade
  const rank = new Map();
  targets.forEach(el => {
    const n = rank.get(el.parentElement) || 0;
    rank.set(el.parentElement, n + 1);
    el.style.setProperty('--d', (n % 4) * 0.08 + 's');
    el.classList.add('reveal');
  });

  const rio = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => rio.observe(el));
}
