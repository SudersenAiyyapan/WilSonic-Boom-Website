/* ═══════════════════════════════════════════════════════════════════════════
   HOME PAGE
   Fills the data-driven sections from data/*.js. Everything it renders comes
   from those files, so updating content never means editing this.
   ═══════════════════════════════════════════════════════════════════════════ */

function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function fillStats() {
  const el = document.getElementById('home-stats');
  const season = SEASONS[0];
  if (!el || !season) return;

  el.innerHTML = season.headline.map(s => `
    <div>
      <div class="stat-value${s.mono ? ' mono' : ''}">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');
}

function fillAwards() {
  const el = document.getElementById('home-awards');
  const season = SEASONS[0];
  if (!el || !season) return;

  el.innerHTML = season.awards.map(a => `
    <article class="award">
      <span class="eyebrow">${a.event}</span>
      <h3>${a.name}</h3>
      <p>${a.note}</p>
    </article>`).join('');
}

function fillPosts() {
  const el = document.getElementById('home-posts');
  if (!el || typeof POSTS === 'undefined') return;

  el.innerHTML = POSTS.slice(0, 3).map(p => `
    <a class="card media-card" href="blog.html?post=${p.slug}">
      <div class="frame"${p.imageIsLogo ? ' style="display:grid;place-items:center;padding:var(--space-8)"' : ''}>
        <img src="${p.image}" alt=""
             loading="lazy"${p.imageIsLogo ? ' style="width:auto;height:auto;max-height:100%;object-fit:contain"' : ''}>
      </div>
      <div class="body">
        <span class="tag">${p.tag}</span>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <p class="post-date" style="margin-top:var(--space-4)">${formatDate(p.date)}</p>
      </div>
    </a>`).join('');
}

function fillSponsors() {
  const el = document.getElementById('home-sponsors');
  if (!el || typeof SPONSORS === 'undefined') return;

  el.innerHTML = SPONSORS.map(s => `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.name}">
      <img src="${s.logo}" alt="${s.name}" style="height:${s.logoHeight}px" loading="lazy">
    </a>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  fillStats();
  fillAwards();
  fillPosts();
  fillSponsors();
});
