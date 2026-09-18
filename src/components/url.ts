// Every internal link goes through here so the site still works if it is
// deployed under a sub-path (set `base` in astro.config.mjs).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => `${base}${path.startsWith('/') ? path : '/' + path}`;

/** For links that come from data: site-relative paths ("/documents/…") get
 *  the base; full URLs and mailto: pass through untouched. */
export const href = (p: string | null | undefined) =>
  p && p.startsWith('/') && !p.startsWith('//') ? url(p) : (p ?? '');
