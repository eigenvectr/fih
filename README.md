# fih — NY Fishing Companion

Personal fishing companion for New York waters: researched spot intelligence, simple trip planning, and a fast on-the-water catch log. First water: the St. Lawrence River (Thousand Islands).

## Features

- **Spot intelligence** — 17 researched St. Lawrence spots with species, structure, season-by-season behavior, baits and presentations, and source links. Coordinates are area centers; verify on sonar.
- **Trip planner** — pick your launch for the day, spots sort by distance with rough run times, check a few into a glanceable run plan.
- **Log** — new catch in seconds: species, length, bait, conditions, optional photo. History plus stats by spot, bait, and month. Stored locally (IndexedDB), works offline, JSON export/import. No accounts, no backend.
- **Regs & logistics** — NY seasons/limits, river special regs, the Ontario border reality, baitfish rules, launch notes.

## Stack

Next.js (App Router) · TypeScript · Tailwind v4 · MapLibre GL · Dexie (IndexedDB) · Radix

## Develop

```sh
npm install
npm run dev
```

E2E tests (Playwright, builds and serves the app itself):

```sh
npm test
```

## Adding a water

Each water is one JSON file — `data/waters/<slug>.json` — matching the `Water` type in `src/lib/types.ts`, plus one import line in `src/lib/waters.ts`. Research the water (spots, seasons, baits, regs, launches with sources), drop in the file, done. No code changes beyond the import.

## Location verification (required for any data change)

Every spot and launch coordinate is verified against OpenStreetMap:

```sh
npm run verify:geo
```

Spots must fall inside a mapped water polygon; launches must be within 250 m of water, with a warning if no mapped slipway/marina exists within 350 m. Results (with a per-coordinate hash) go to `data/geo-verification.json`, and `e2e/geo.spec.ts` fails the suite if any point is unverified, failing, or was edited after its last verification — so `npm test` enforces the process. Overpass responses are cached in `data/geo-cache.json`; delete a key (or the file) to force a recheck.

Where OSM genuinely can't answer (the upper St. Lawrence is `natural=coastline`, so mid-channel points hit no water polygon), add a manual override in `data/geo-overrides.json` with the point's coordinate hash and a reason documenting how it was verified (e.g. visually against the basemap). Overrides die with the hash: editing the coordinate invalidates them.

## Deploy

Standard Next.js build on Vercel. No environment variables required.
