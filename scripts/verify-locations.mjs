import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];
const CACHE_PATH = "data/geo-cache.json";
const REPORT_PATH = "data/geo-verification.json";
const WATER_NEAR_M = 250;
const RAMP_NEAR_M = 350;

const cache = existsSync(CACHE_PATH) ? JSON.parse(readFileSync(CACHE_PATH, "utf8")) : {};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function overpass(query, key) {
  if (cache[key]) return cache[key];
  for (let attempt = 0; attempt < 6; attempt++) {
    await sleep(2000 * (attempt + 1));
    const endpoint = ENDPOINTS[attempt % ENDPOINTS.length];
    let res;
    try {
      res = await fetch(endpoint, {
        method: "POST",
        body: "data=" + encodeURIComponent(query),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "fih-geo-verify/1.0 (personal fishing app data check)",
        },
      });
    } catch {
      continue;
    }
    if (res.status === 429 || res.status === 504 || res.status === 502) continue;
    if (!res.ok) throw new Error(`Overpass ${res.status} for ${key}: ${(await res.text()).slice(0, 200)}`);
    const json = await res.json();
    cache[key] = json.elements ?? [];
    return cache[key];
  }
  throw new Error(`Overpass rate-limited after retries for ${key}`);
}

const coordHash = (lat, lon) =>
  createHash("sha256").update(`${lat.toFixed(5)},${lon.toFixed(5)}`).digest("hex").slice(0, 12);

async function checkSpot(lat, lon) {
  const areas = await overpass(
    `[out:json][timeout:25];is_in(${lat},${lon});out tags 40;`,
    `in-any:${lat.toFixed(5)},${lon.toFixed(5)}`,
  );
  const water = areas.find(
    (a) => a.tags?.natural === "water" || a.tags?.water || a.tags?.waterway === "riverbank",
  );
  if (water)
    return { status: "pass", detail: `inside water polygon "${water.tags?.name ?? "unnamed"}"` };
  // Wide rivers are often unnamed multipolygons that never become Overpass areas,
  // so fall back to: mapped water geometry nearby AND no buildings at the point.
  const near = await overpass(
    `[out:json][timeout:25];(way(around:600,${lat},${lon})[natural=water];way(around:600,${lat},${lon})[waterway~"^(riverbank|river)$"];relation(around:600,${lat},${lon})[natural=water];relation(around:600,${lat},${lon})["water"];way(around:1200,${lat},${lon})[natural=coastline];);out ids 1;`,
    `near-water3:${lat.toFixed(5)},${lon.toFixed(5)}`,
  );
  if (near.length === 0) return { status: "fail", detail: "no mapped water or coastline nearby" };
  const buildings = await overpass(
    `[out:json][timeout:25];(nwr(around:75,${lat},${lon})[building];nwr(around:75,${lat},${lon})[highway];);out ids 1;`,
    `land-75:${lat.toFixed(5)},${lon.toFixed(5)}`,
  );
  if (buildings.length > 0)
    return { status: "fail", detail: "buildings/roads within 75 m — point is likely on land" };
  return {
    status: "warn",
    detail: "open water by proximity check (river not area-mapped in OSM): water within 600 m, no structures within 75 m",
  };
}

async function checkLaunch(lat, lon) {
  const water = await overpass(
    `[out:json][timeout:25];(way(around:${WATER_NEAR_M},${lat},${lon})[natural=water];relation(around:${WATER_NEAR_M},${lat},${lon})[natural=water];);out ids 1;`,
    `launch-water:${lat.toFixed(5)},${lon.toFixed(5)}`,
  );
  if (water.length === 0)
    return { status: "fail", detail: `no water within ${WATER_NEAR_M} m — launch is inland` };
  const ramp = await overpass(
    `[out:json][timeout:25];(nwr(around:${RAMP_NEAR_M},${lat},${lon})[leisure=slipway];nwr(around:${RAMP_NEAR_M},${lat},${lon})[leisure=marina];nwr(around:${RAMP_NEAR_M},${lat},${lon})["seamark:type"=harbour];);out center tags 5;`,
    `launch-ramp:${lat.toFixed(5)},${lon.toFixed(5)}`,
  );
  if (ramp.length === 0)
    return { status: "warn", detail: `near water but no mapped slipway/marina within ${RAMP_NEAR_M} m` };
  const named = ramp.find((r) => r.tags?.name);
  const pos = named?.center ?? named ?? ramp[0].center ?? ramp[0];
  return {
    status: "pass",
    detail: `near mapped ${ramp[0].tags?.leisure ?? "harbour"}${named ? ` "${named.tags.name}"` : ""}`,
    nearestFacility: pos.lat ? { lat: pos.lat, lon: pos.lon, name: named?.tags?.name } : undefined,
  };
}

const OVERRIDES_PATH = "data/geo-overrides.json";
const overrides = existsSync(OVERRIDES_PATH)
  ? JSON.parse(readFileSync(OVERRIDES_PATH, "utf8"))
  : {};

const report = { generatedAt: new Date().toISOString(), waters: {} };
let failures = 0;

for (const file of readdirSync("data/waters").filter((f) => f.endsWith(".json"))) {
  const water = JSON.parse(readFileSync(`data/waters/${file}`, "utf8"));
  const entries = {};
  for (const s of water.spots) {
    let r = await checkSpot(s.lat, s.lon);
    const hash = coordHash(s.lat, s.lon);
    const ov = overrides[water.slug]?.[`spot:${s.id}`];
    if (r.status === "fail" && ov && ov.hash === hash)
      r = { status: "warn", detail: `manual override: ${ov.reason}` };
    entries[`spot:${s.id}`] = { ...r, hash };
    if (r.status === "fail") failures++;
    console.log(`${r.status.toUpperCase().padEnd(4)} ${water.slug} spot ${s.id}: ${r.detail}`);
  }
  for (const l of water.launches) {
    const r = await checkLaunch(l.lat, l.lon);
    entries[`launch:${l.name}`] = { ...r, hash: coordHash(l.lat, l.lon) };
    if (r.status === "fail") failures++;
    console.log(`${r.status.toUpperCase().padEnd(4)} ${water.slug} launch ${l.name}: ${r.detail}`);
  }
  report.waters[water.slug] = entries;
  writeFileSync(CACHE_PATH, JSON.stringify(cache));
}

writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + "\n");
console.log(`\nReport written to ${REPORT_PATH}. Failures: ${failures}`);
process.exit(failures > 0 ? 1 : 0);
