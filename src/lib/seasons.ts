// Loads every season in src/data/seasons/, newest first.
// A season marked `draft: true` appears in `npm run dev` (and in the admin)
// but is never built into the live site.

export interface KV { k: string; v: string }
export interface Change { before: string; after: string; delta: string; deltaLabel: string }
export interface Subsystem {
  n: string; name: string; shot: string; marker: { x: string; y: string };
  photo?: string | null; body: string; detail?: string; specs: KV[];
}
export interface SubVersion {
  id: string; date: string; title: string; summary: string;
  photo?: string | null; specs?: KV[]; changes?: Change[];
}
export interface Version extends SubVersion {
  specs: KV[]; subsystems: Subsystem[]; subversions?: SubVersion[];
}
export interface Season {
  years: string; game: string; draft?: boolean; summary: string;
  record: KV[];
  awards: { name: string; event: string; note: string }[];
  events: { date: string; name: string; venue: string; result: string; note?: string }[];
  robot: { software: string; versions: Version[] };
}

/** One stop on the version slider: a major version or one of its sub-versions. */
export interface Step {
  id: string;            // "V2.1"
  major: string;         // "V2"
  isSub: boolean;
  date: string; title: string; summary: string;
  photo: string | null;  // falls back to the parent version's photo
  specs: KV[];           // parent specs, with this step's values overriding by label
  changes: Change[];
}

export interface SeasonView extends Season {
  slug: string;          // "2025-26", used in URLs and element ids
  steps: Step[];
}

const files = import.meta.glob<{ default: Season }>('../data/seasons/*.json', { eager: true });

const slugOf = (years: string) =>
  years.replace(/\[|\]/g, '').replace(/[–—]/g, '-').replace(/[^0-9A-Za-z-]+/g, '-').toLowerCase();

function mergeSpecs(base: KV[], over: KV[] = []): KV[] {
  const out = base.map((s) => ({ ...s }));
  for (const o of over) {
    const hit = out.find((s) => s.k === o.k);
    if (hit) hit.v = o.v; else out.push({ ...o });
  }
  return out;
}

function stepsOf(season: Season): Step[] {
  const steps: Step[] = [];
  for (const v of season.robot?.versions ?? []) {
    steps.push({
      id: v.id, major: v.id, isSub: false, date: v.date, title: v.title, summary: v.summary,
      photo: v.photo ?? null, specs: v.specs ?? [], changes: v.changes ?? [],
    });
    for (const s of v.subversions ?? []) {
      steps.push({
        id: s.id, major: v.id, isSub: true, date: s.date, title: s.title, summary: s.summary,
        photo: s.photo ?? v.photo ?? null, specs: mergeSpecs(v.specs ?? [], s.specs), changes: s.changes ?? [],
      });
    }
  }
  return steps;
}

export const seasons: SeasonView[] = Object.values(files)
  .map((m) => m.default)
  .filter((s) => import.meta.env.DEV || !s.draft)
  .sort((a, b) => b.years.localeCompare(a.years))
  .map((s) => ({ ...s, slug: slugOf(s.years), steps: stepsOf(s) }));

/** The season the home page and the defaults are built around. */
export const current: SeasonView = seasons[0];

/** The latest major version of a season — what the home teaser shows. */
export const latestVersion = (s: SeasonView): Version | undefined =>
  s.robot?.versions?.[s.robot.versions.length - 1];
