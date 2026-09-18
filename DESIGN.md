# Design

<!-- impeccable:design-record -->

The site is **V1 — Machined**, chosen by the user from four directions (Machined, Drawing
sheet, Instrument, Index). The other three were removed from the project; this record
describes only the world that ships.

## Contracts

- **Palette:** amber/gold, grey, black, white. Pinned by the user.
- **Structure:** six pages, each with one job and one main reader.

  | Page | Job | Main reader |
  |---|---|---|
  | `/` | The whole pitch **on its own** — a sponsor who reads nothing else must still be able to act | Sponsors |
  | `/robot/` | The exploded assembly (signature), whole-machine specs, software, revisions | Sponsors wanting proof, judges |
  | `/season/` | Record plate, event log, awards, archive of earlier seasons | Anyone checking credibility |
  | `/team/` | Sub-teams, leads, roster, mentors, how to join | Recruits, parents |
  | `/outreach/` | Reach numbers, logo placements, activity log | Judges, sponsors |
  | `/sponsors/` | The case, tiers, current sponsors, next steps, contact | Sponsors ready to act |

  Home keeps summaries and points to depth with one link style (`MoreLink`). Every page ends
  on the same conversion plate (`Close`).
- **Sponsors are on every page:** a logo strip under the home opening and a compact strip in
  every footer. Top-tier sponsors (`level: 1`) are listed first with larger logos — tier has
  to be *visible* to be worth paying for.
- **Content editing:** Sveltia CMS at `/admin` (`public/admin/config.yml`), Git-based, GitHub
  sign-in. Every JSON key must have a form field, or the editor deletes it on save.
- **Conversion:** `mailto:` primary, sponsorship-pack download secondary. Both appear in the
  first viewport and again at the close.
- **Stack:** Astro, static output. Layout, header and footer are written once
  (`src/layouts/Base.astro`, `src/components/`). Content lives in `src/data/*.json`.
  Styles are one sheet, `src/styles/site.css`; motion is `src/scripts/motion.js`.
- **Navigation:** the current page is marked with `aria-current="page"` in the markup, never
  inferred by script. Below 900px the nav collapses into a menu button (44px target).
  Page-to-page uses cross-document View Transitions: the top bar holds still and the page
  beneath is exchanged on one axis. Off under reduced motion.
- **Motion contract:** content is visible by default. `motion.js` adds a `js` class to
  `<html>`, and only then does CSS opt in to the pre-animation state. Delete the script and
  the page is complete and readable. `prefers-reduced-motion` is fully honoured.
- **Placeholder contract:** every unverified fact is authored as `[[TOKEN]]`. `motion.js`
  wraps each in `<span class="tok">` at load; `href`/`mailto` attributes keep raw `[[ ]]`
  so they are findable with a plain text search. Numeric cells have `min-width` so
  replacing a token cannot reflow its neighbours.
- **Media contract:** every media slot is a box with `aspect-ratio` already set and
  `object-fit: cover` on the future `<img>`. Dropping a real asset in changes no layout.
- **Accessibility floor:** AA contrast verified by computation at desktop and 375px, not by
  eye. Browser surfaces (selection, focus ring, scrollbar, tabular numerals) are themed.

---

## V1 — Machined  (`v1-machined/`)

**Thesis.** Trust is earned by tolerance, not enthusiasm. The page is a machined assembly.

| | |
|---|---|
| Ground | Brushed graphite `#101012` / `#0A0A0B`, fine vertical grain, one warm ambient sheen |
| Plate | `#17181A`, seam `#2E3034` / `#232528` |
| Accent | Anodised gold `#C89434`, hi `#EFC069`, rule-only `#7E5D1E`, **text-safe `#A97F2A`** |
| Type | Archivo (wide, `font-stretch` 112–118%) · Chivo Mono for measured values |
| Corner | 45° chamfer via `clip-path`, hairline edge drawn by a 1px-inset `::before` |
| Depth | **No shadows anywhere.** Separation is hairline seam plus one elevation step |
| Motion | A CNC axis move: one axis, exponential deceleration, hard stop. No overshoot |
| Overture | A single gold light-sweep crosses the title plate once on load |

Engraved headline: `text-shadow` light on the lower lip, dark above. Not a gradient.

### Signature: the exploded assembly

`#machine` is the mechanism the rest of the page is scaffolding for.

One 16:10 stage carries the full robot with four numbered callout markers. The stage is
**sticky** beside the key list; scrolling down the four subsystems swaps the stage to that
subsystem's detail photograph, wiped on with a `clip-path` inset from the right. Markers and
key rows are two controls for one piece of state, and scroll is a third — last input wins.

Rules this section must keep:

- **All five views share one box.** Slot 0 (assembly) is the base layer and always renders;
  slots 1–4 are parked at `clip-path: inset(0 0 0 100%)` and wipe over it. The stage never
  resizes, so real photographs drop in with zero layout change.
- **Nothing is collapsed.** Every key entry shows its name, its prose and its two specs at
  all times. Selection highlights and drives the stage; it never gates content. A sponsor
  skims this column, and an entry they must click to read is an entry they will not read.
  This was built collapsed first and reversed deliberately — do not reintroduce it.
- **Markers keep a 44px hit area** via a transparent `::before` at `inset: -9px`, while the
  visible ring stays 26–30px so it does not cover the part it points at.
- The leader hairline animates `transform: scaleX()`, never `width`.
- With no script the markers are inert, the stage shows the assembly, and every key entry
  reads in full. That is a complete page, one photograph lighter.

### The version rail

`/robot` and `/season` are season-switchable (`SeasonSwitch`, state in `#season=`). On `/robot`
each season's robot history sits on a machinist's rule (`VersionRail`): long ticks are major
versions, short ticks revisions, and a gold caliper carriage travels to the selection — the
same one-axis, hard-stop motion as the rest of the site. Arrows, arrow/Home/End keys, a click
on a tick, or a horizontal swipe on the photograph all move it; the choice is kept in `#v=` so
a sponsor can be sent straight to a version. It opens on the latest *major* version, because
that is the one with the exploded assembly.

A major version shows the assembly; a revision shows its own photograph. Revisions inherit
their parent's photo and specs and override only what they set. Without script every version
renders in order as a readable history and the rail is not shown.

### Record: a data plate, not metric cards

`#record` is an engraved machine data plate — riveted corners, etched header, label/value
rows with fixed-width mono values — set beside the event log. It replaced a row of four
big-number cards, which is the hero-metric template the craft floor refuses. Do not convert
it back into cards; the plate is skimmable and the cards were generic.

---

## Rules that must not be relaxed

1. Never darken `--ink-3`. It sits just above AA at 11px on `--plate`.
2. `--gold-lo` is for rules and edges only. Small gold text uses `--gold-txt`.
3. No shadows. Depth is hairline seam plus one elevation step.
4. No eyebrow/kicker labels above headings.
5. The key list in `#machine` is never collapsed behind interaction, and `#record` is never
   a big-number card row. Both were defects that were fixed; both are easy to reintroduce.
6. Etched heading masks (`.etch .line`) keep their padding and matching negative margin.
   With a 0.94 line-height, an unpadded `overflow: hidden` mask cuts the tops of capitals
   and the descenders of g, y and p — this shipped once and was visible to the user.
7. **Asset caching is handled by the build.** Astro emits CSS and JS with content-hashed
   filenames, so an edit always ships a new URL. (The one-page version needed a manual
   `?v=` bump and once shipped a fix nobody could see. Do not reintroduce hand-linked
   stylesheets outside the build.)
8. **Every footer and nav row must wrap.** A non-wrapping row of five links was 397px wide
   and pushed every page sideways at 375px. Check new link rows at phone width.
10. **Panels are never `hidden` in the markup.** Seasons and versions are shown or hidden by
    script. Before it runs, CSS shows only the defaults (`data-season-default`,
    `data-default-panel`) under `.js:not(.motion-ready)`; the `<head>` sets `.js` before first
    paint and withdraws it after 4s if the script never arrived. Server-side `hidden` would make
    every other season unreachable without script.
9. **Home stays self-sufficient.** Moving content to a sub-page is fine; moving the *argument*
   there is not. Home must always carry the case, the record summary and both CTAs.
