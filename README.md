# Wilsonic Boom — website

FIRST Tech Challenge team 33001, Wilson's School, Wallington.

Six pages, built with [Astro](https://astro.build). The output is plain static HTML, so it
can be hosted anywhere, including GitHub Pages.

## Run it

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install        # once
npm run dev        # live preview at http://localhost:4188  (admin: http://localhost:4188/admin/index.html)
npm run build      # writes the finished site to dist/
```

## Changing what the site says — use the admin

Go to **`/admin`** on the live site (locally: `http://localhost:4188/admin/index.html`).
Every piece of content has a form: seasons, robot versions, sponsors, team, outreach,
contact details. Photos and logos upload by drag-and-drop. Saving commits the change to
GitHub, and the site rebuilds itself within a couple of minutes.

**Signing in**, three ways:

1. **Work with Local Repository** — on your own computer, in Chrome or Edge, with `npm run dev`
   running. Pick the project folder when asked. No login; edits go straight into the files,
   and you commit them yourself.
2. **Sign In Using Access Token** — works on the live site with no extra setup. Create a GitHub
   *fine-grained personal access token* for this repository with **Contents: Read and write**,
   and paste it in. Anyone with write access to the repo can do this.
3. **Sign In with GitHub** — the one-click button. Needs a one-time setup of a small free
   authentication helper (Sveltia's `sveltia-cms-auth`, on Cloudflare Workers), then its
   address added to `public/admin/config.yml` as `base_url`. Worth doing once more than a
   couple of people are editing.

To give someone editing rights, add them as a collaborator on the GitHub repository.
There is no separate password to manage — which is deliberate.

Anything written `[[LIKE THIS]]` is a placeholder. It shows highlighted in gold on the site so
nobody can mistake it for a real fact. Replace every one before the site goes live. Never
replace a placeholder with a guess: a sponsor who catches one wrong number stops trusting the
rest.

The data itself lives in `src/data/` if you ever need to edit it by hand:

| File | What it holds |
|---|---|
| `seasons/<season>.json` | One file per season: results, awards, events, and the robot's versions |
| `site.json` | Team email, sponsorship pack, address, social links |
| `team.json` | Sub-teams, people, mentors |
| `sponsors.json` | Sponsors (with tier), tiers, budget, what happens after someone emails |
| `outreach.json` | Reach numbers, logo placements, outreach activities |

## Seasons and robot versions

Each season has a list of robot **versions** (V1, V2 …), and each version can have
**revisions** (V2.1, V2.2 …). On the Robot page they appear as ticks on a rule you can move
along. A revision only needs what changed: any photo or specification you leave empty is taken
from its main version.

A new season: in the admin, **Seasons → New Season**. The newest season becomes the one the
home page shows. Tick **Draft** while you are still filling it in — a draft appears in the local
preview but never on the live site.

## Adding photos

Put images in `public/images/` (e.g. `public/images/team/sam.jpg`) and point the data file
at them with a path starting `/images/…`. Every photo space on the site already has its size
fixed, so a photo never moves anything else on the page.

The shot list — what each space needs:

| Where | Shot | Shape | Size |
|---|---|---|---|
| Home, opening | Robot, three-quarter view, plain dark background | 4:3 | 2400 px wide |
| Home + Robot | Robot, full assembly, all four subsystems visible | 16:10 | 2800 px wide |
| Robot | One close-up per subsystem (four photos) | 16:10 | 2000 px wide |
| Team | One portrait per person | 1:1 | 800 px |
| Home + Sponsors | Sponsor logos | any | SVG or transparent PNG |

The robot photos must all be 16:10 — they swap in and out of the same frame.

## Going live

The workflow in `.github/workflows/deploy.yml` publishes to GitHub Pages on every push to
`main` — including every admin save. Switch it on once: **repo Settings → Pages → Source:
GitHub Actions**. (Hosting on Vercel or Netlify instead? Delete that file; they rebuild from
GitHub on their own.)

The admin saves to `main`, so this redesign has to be merged into `main` before the admin can
edit the live site.

## Before changing the design

Read `DESIGN.md`. It lists the rules the design depends on, including several mistakes that
were made once and fixed — they are easy to make again.
