# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

**Astro** (static output), chosen with the user when the site grew from one page to six.

The first build was plain HTML/CSS/JS with no build step, which was right for one page. At six
pages the header, nav and footer would have been copied into every file, so the user agreed
to Astro: shared layout written once, and the content that changes each year (team, sponsors,
seasons, outreach) kept in `src/data/*.json` so a student edits data, not markup. The cost is
that editing needs Node and a build before deploying.

Motion is still hand-written vanilla JS (`src/scripts/motion.js`), no animation libraries.
Output deploys to any static host, including GitHub Pages (set `base` in
`astro.config.mjs` for a project-site sub-path).

## Users

**Primary: potential sponsors.** UK companies — engineering suppliers, manufacturers, local
businesses, professional institutions — arriving from an outreach email or a link in the
team's sponsorship pack. Likely on desktop during a work day, sometimes on a phone. Their job
is a fast credibility judgement: *is this a serious, organised operation worth putting money
or parts behind, or is it a school club asking for cash?* They decide in well under two
minutes and they are comparing this against every other funding request in their inbox.

Secondary audiences, in priority order:
- **Current sponsors** — checking their money is well spent and their logo is well presented.
- **Prospective and current team members** — is this a team worth joining and staying on.
- **Other FTC teams** — peer credibility, scouting, alliance and outreach contact.
- **Parents** — reassurance about what their child is part of.

The page is written for the primary audience. The others must not be contradicted by it, but
they do not get to reshape it.

## Product Purpose

A single landing page that is the team's public face. Success is measured by one thing: a
potential sponsor finishes the page and takes a conversion action — emails the team, or
downloads the sponsorship pack. A visit that produces admiration but no contact is a failure.

## Positioning

**Asserted by the user, not yet evidenced.** The intended read is: Wilsonic Boom is a
committed, organised engineering programme that happens to be run by students — not an average
FTC team site. The differentiator the page must dramatise is *seriousness of process*:
that this team documents, iterates, and operates like a real engineering group.

The specific proof for that claim does not exist in this project yet. See Evidence on Hand.
It must be supplied by the user, never invented.

## Operating Context

- FIRST Tech Challenge: a school-age robotics competition. Teams design, build and program a
  robot for a yearly game, compete at regional and national events, and are judged on the
  robot *and* on documentation, outreach and team sustainability.
- Teams are funded by sponsors, who typically give money, parts, machining, or services.
- A sponsorship approach is normally: outreach email → sponsorship pack (PDF) → conversation.
  This page sits inside that funnel and must survive being opened in a browser tab next to
  the pack.

## Capabilities and Constraints

- **Scope:** six pages — Home (the complete sponsor pitch on its own), Robot, Season, Team,
  Outreach, Sponsors (the conversion page). No news/blog: a stale blog signals a dormant team,
  so add one only if someone will own it monthly.
- **Deliverable:** four directions were built for comparison; the user chose **V1 —
  Machined** (`v1-machined/`) and the other three were removed. All further work is on V1.
- **Conversion actions (both, confirmed):** email the team directly, and download the
  sponsorship pack (PDF). The email address and PDF are placeholders until supplied.
- **Media:** the user supplies all photography and video. Every media slot must be a
  placeholder with the final aspect ratio and box already reserved, so dropping the real
  asset in causes **zero layout change**. Each version ships with a list of exactly what
  footage/imagery it needs.
- **Facts:** every team-specific fact is a clearly marked placeholder token the user fills in.
- **Motion:** heavy, scroll-driven, deliberate. Must degrade to a fully readable page under
  `prefers-reduced-motion` and with JavaScript disabled — content is visible by default and
  motion is additive, never a gate on reading.

## Brand Commitments

Confirmed and binding:

- **Name:** Wilsonic Boom.
- **Team number:** FIRST Tech Challenge team 33001.
- **Home:** Wilson's School, Wallington, London.
- **Palette (pinned by the user):** amber/gold, grey, black, white.
- **Tone:** calm and confident. Explicitly *not* playful, childish, or clunky. Explicitly not
  generic-AI-landing-page. Professional, considered, sleek.
- **Pinned references** (rough direction, supplied by the user):
  dribbble Trading Platform Web Design; Ape Terminal; Cracker Cyber Security SaaS;
  Shaga Odyssey; Easily Fintech; Gate Protocol; thewatch.60fps.fr; sstr.tech;
  noth.in; trionn.com.
  The shared quality in that set: dark or high-contrast grounds, dense technical typography,
  precise grid and rule work, restrained accent color, and scroll-driven motion doing real
  narrative work. That is the craft bar, not a template to copy.

## Evidence on Hand

**None confirmed. This is the single most important constraint in this file.**

Nothing in this project currently evidences any of the following, and none of it may be
invented, estimated, or written as plausible filler:

- competition results, rankings, or match records
- awards or judged recognition
- robot specifications, subsystem names, or performance numbers
- roster, member names, roles, or team size
- sponsor names, logos, or the existence of any current sponsor
- budget figures, costs, or funding targets
- outreach numbers, hours, events, or people reached
- quotes, endorsements, or testimonials from anyone
- founding date, seasons competed, or history

All of the above ship as visibly marked placeholder tokens for the user to fill in. A
placeholder that reads as real content is a failure; a placeholder that breaks the layout
when replaced is also a failure.

Media: no photography or video exists in this project. All media slots are reserved boxes
with declared aspect ratios, listed per version as a shot list for the user.

## Product Principles

1. **Credibility is the product.** Every decision answers "does this make a sponsor trust
   them with money?" Beauty that does not build trust is decoration.
2. **Never fabricate proof.** An empty, honestly-marked slot is worth more than invented
   evidence — a sponsor who catches one false claim discards the whole page.
3. **Process over personality.** The team's argument is how it works, not how much fun it is.
   Show method, iteration, and organisation.
4. **Calm carries confidence.** Restraint, precision, and control read as competence. Loud,
   busy, or eager reads as a school project.
5. **Motion must mean something.** Every animation earns its place by revealing structure or
   guiding reading order. Motion for its own sake is the "AI slop" tell the user named.

## Accessibility & Inclusion

No user-specific requirement was established. Derived from the motion-heavy brief and the
sponsor audience (business machines, corporate networks, mixed device quality):

- `prefers-reduced-motion` fully honoured — the page must be complete and readable with all
  motion disabled.
- Content readable without JavaScript; JS adds motion, never content.
- Keyboard-reachable navigation and CTAs, visible focus states.
- Text contrast at WCAG AA against the pinned palette, including amber-on-dark.
