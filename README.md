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

## Deploy

Standard Next.js build on Vercel. No environment variables required.
