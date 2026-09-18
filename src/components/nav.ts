// The five pages, in nav order. `key` is what a page passes to the layout
// as `current`, which sets aria-current on the matching link.
export const NAV = [
  { key: 'robot',    label: 'Robot',    href: '/robot/' },
  { key: 'season',   label: 'Season',   href: '/season/' },
  { key: 'team',     label: 'Team',     href: '/team/' },
  { key: 'outreach', label: 'Outreach', href: '/outreach/' },
  { key: 'sponsors', label: 'Sponsors', href: '/sponsors/' },
] as const;
export type NavKey = (typeof NAV)[number]['key'] | 'home';
