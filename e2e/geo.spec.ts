import { test, expect } from "@playwright/test";
import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const coordHash = (lat: number, lon: number) =>
  createHash("sha256").update(`${lat.toFixed(5)},${lon.toFixed(5)}`).digest("hex").slice(0, 12);

test("every spot and launch in every water is geo-verified", () => {
  const report = JSON.parse(readFileSync("data/geo-verification.json", "utf8"));
  const problems: string[] = [];

  for (const file of readdirSync("data/waters").filter((f) => f.endsWith(".json"))) {
    const water = JSON.parse(readFileSync(join("data/waters", file), "utf8"));
    const entries = report.waters?.[water.slug] ?? {};
    const points = [
      ...water.spots.map((s: { id: string; lat: number; lon: number }) => ({
        key: `spot:${s.id}`,
        lat: s.lat,
        lon: s.lon,
      })),
      ...water.launches.map((l: { name: string; lat: number; lon: number }) => ({
        key: `launch:${l.name}`,
        lat: l.lat,
        lon: l.lon,
      })),
    ];
    for (const p of points) {
      const e = entries[p.key];
      if (!e) problems.push(`${water.slug} ${p.key}: never verified`);
      else if (e.status === "fail") problems.push(`${water.slug} ${p.key}: FAILED (${e.detail})`);
      else if (e.hash !== coordHash(p.lat, p.lon))
        problems.push(`${water.slug} ${p.key}: coords changed since last verification`);
    }
  }

  expect(
    problems,
    `Unverified or failing locations — run \`npm run verify:geo\` and fix:\n${problems.join("\n")}`,
  ).toEqual([]);
});
