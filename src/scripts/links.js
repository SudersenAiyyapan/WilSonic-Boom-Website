// Every link to a page opens in a new tab, including this site's own pages.
// Left alone: jumps within the page (#main), email links, and downloads.
const opensPage = (a) => {
  if (!a.href || a.hasAttribute('download')) return false;
  const u = new URL(a.href, location.href);
  if (!/^https?:$/.test(u.protocol)) return false; // mailto:, tel:
  const samePage = u.origin === location.origin && u.pathname === location.pathname && u.search === location.search;
  return !(samePage && u.hash); // #main, #season=… stay in place
};

for (const a of document.querySelectorAll('a[href]')) {
  if (opensPage(a)) {
    a.target = '_blank';
    a.rel = [...new Set([...a.rel.split(' ').filter(Boolean), 'noopener'])].join(' ');
  }
}
