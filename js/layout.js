/* ═══════════════════════════════════════════════════════════════════════════
   SHARED LAYOUT
   The nav and footer live here once, and are injected into every page.

   To change a nav link, edit NAV below. To change the footer, edit renderFooter.
   You never need to touch the individual HTML pages.
   ═══════════════════════════════════════════════════════════════════════════ */

const NAV = [
  { label: 'Home',     href: 'index.html' },
  { label: 'Team',     href: 'team.html' },
  { label: 'Robot',    href: 'robot.html' },
  { label: 'Season',   href: 'season.html' },
  { label: 'Sponsors', href: 'sponsors.html' },
  { label: 'Blog',     href: 'blog.html' },
  { label: 'Archive',  href: 'archive.html' },
  { label: 'Outreach', href: 'outreach.html' },
];

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/wilsonicboom.ftc/',
    icon: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/wilsonic-boom-ftc-608863396/',
    icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  },
];

/* Which page are we on? Falls back to index for a bare directory URL. */
function currentPage() {
  const file = window.location.pathname.split('/').pop();
  return file === '' ? 'index.html' : file;
}

function renderNav() {
  const here = currentPage();

  const links = NAV.map(item => {
    const active = item.href === here;
    return `<li><a class="nav-link${active ? ' is-active' : ''}" href="${item.href}"${
      active ? ' aria-current="page"' : ''
    }>${item.label}</a></li>`;
  }).join('');

  return `
    <a class="skip-link" href="#main">Skip to content</a>
    <nav class="nav" aria-label="Main">
      <div class="nav-inner container">
        <a class="lockup" href="index.html" aria-label="Wilsonic Boom, FTC team 33001, home">
          <span class="lockup-name">WILSONIC <b>BOOM</b></span>
          <span class="lockup-num mono">33001</span>
        </a>

        <button class="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav-links">
          <span></span><span></span><span></span>
        </button>

        <ul class="nav-links" id="nav-links">${links}</ul>
      </div>
    </nav>`;
}

function renderFooter() {
  const links = NAV.map(
    i => `<li><a class="footer-link" href="${i.href}">${i.label}</a></li>`
  ).join('');

  const socials = SOCIALS.map(
    s => `<a class="social" href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${s.icon}</svg>
          </a>`
  ).join('');

  return `
    <footer class="footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <span class="lockup-name">WILSONIC <b>BOOM</b></span>
          <p class="footer-tag">Think fast.</p>
          <p class="footer-desc">
            FTC team 33001, one of two teams in the robotics programme at
            Wilson's School, Wallington.
          </p>
          <div class="socials">${socials}</div>
        </div>

        <div>
          <h4 class="footer-head">Navigate</h4>
          <ul>${links}</ul>
        </div>

        <div>
          <h4 class="footer-head">Contact</h4>
          <ul>
            <li><a class="footer-link" href="mailto:admin@wilsonicboom.com">admin@wilsonicboom.com</a></li>
            <li><span class="footer-link">Wilson's School, Wallington</span></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-head">Elsewhere</h4>
          <ul>
            <li><a class="footer-link" href="https://www.firstinspires.org/robotics/ftc" target="_blank" rel="noopener noreferrer">FIRST Tech Challenge</a></li>
            <li><a class="footer-link" href="documents/Wilsonic Boom Sponsorship Package.pdf" target="_blank" rel="noopener noreferrer">Sponsorship pack</a></li>
          </ul>
        </div>
      </div>

      <div class="container footer-base">
        <p class="mono">© <span id="year"></span> Wilsonic Boom · FTC 33001</p>
        <p class="mono">Wilson's School, Wallington</p>
      </div>
    </footer>`;
}

function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if (!nav || !toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );

  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Fade sections in as they arrive. Cheap, and respects reduced motion. */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(el => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    entries =>
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  );

  items.forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-nav');
  const footer = document.getElementById('site-footer');

  if (header) header.innerHTML = renderNav();
  if (footer) footer.innerHTML = renderFooter();

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  initNav();
  initReveal();
});
