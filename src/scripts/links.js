// Links that leave the site (sponsors, socials) open in a new tab, so the site
// stays open behind them. Pages of this site open in the same tab.
// (The footer's Team login sets its own new tab.)
const leaves = (a) => {
  if (!a.href || a.hasAttribute('download')) return false;
  const u = new URL(a.href, location.href);
  if (!/^https?:$/.test(u.protocol)) return false; // mailto:, tel:
  return u.origin !== location.origin;
};

for (const a of document.querySelectorAll('a[href]')) {
  if (leaves(a)) {
    a.target = '_blank';
    a.rel = [...new Set([...a.rel.split(' ').filter(Boolean), 'noopener'])].join(' ');
  }
}
