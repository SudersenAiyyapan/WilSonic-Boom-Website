// Every internal link goes through here so the site still works if it is
// deployed under a sub-path (set `base` in astro.config.mjs).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => `${base}${path.startsWith('/') ? path : '/' + path}`;
