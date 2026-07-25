"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, ListChecks, X } from "lucide-react";
import type { SeasonId, SpeciesId, Water } from "@/lib/types";
import { SEASONS, currentSeason } from "@/lib/seasons";
import { formatDistance, haversineNm, runMinutes } from "@/lib/geo";
import { SpeciesChip } from "@/components/ui/SpeciesChip";
import { SPECIES } from "@/lib/species";
import { SpotCard } from "./SpotCard";
import { BaitsPanel } from "./BaitsPanel";
import { RegsPanel } from "./RegsPanel";

const WaterMap = dynamic(
  () => import("@/components/map/WaterMap").then((m) => m.WaterMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[46dvh] min-h-72 w-full animate-pulse rounded-xl border border-line bg-surface-2 sm:h-[420px]" />
    ),
  },
);

export function WaterView({ water }: { water: Water }) {
  const [season, setSeason] = useState<SeasonId>("sum");
  const [speciesFilter, setSpeciesFilter] = useState<Set<SpeciesId>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [launchName, setLaunchName] = useState(water.launches[0]?.name ?? "");
  const [plan, setPlan] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const listRef = useRef<globalThis.Map<string, HTMLLIElement>>(new globalThis.Map());

  useEffect(() => {
    setSeason(currentSeason());
    try {
      const l = localStorage.getItem(`fih:launch:${water.slug}`);
      if (l && water.launches.some((x) => x.name === l)) setLaunchName(l);
      const p = JSON.parse(localStorage.getItem(`fih:plan:${water.slug}`) ?? "[]");
      if (Array.isArray(p)) setPlan(p.filter((id) => water.spots.some((s) => s.id === id)));
    } catch {}
    setHydrated(true);
  }, [water]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(`fih:launch:${water.slug}`, launchName);
    localStorage.setItem(`fih:plan:${water.slug}`, JSON.stringify(plan));
  }, [launchName, plan, hydrated, water.slug]);

  const launch = water.launches.find((l) => l.name === launchName);

  const spots = useMemo(() => {
    const withRun = water.spots.map((s) => {
      const nm = launch ? haversineNm(launch.lat, launch.lon, s.lat, s.lon) : null;
      return {
        spot: s,
        nm,
        minutes: nm !== null ? runMinutes(nm) : s.runMinutes ?? null,
      };
    });
    withRun.sort((a, b) => (a.nm ?? 999) - (b.nm ?? 999));
    return withRun.filter(({ spot }) => {
      if (speciesFilter.size > 0 && !spot.species.some((s) => speciesFilter.has(s)))
        return false;
      return season !== "ice" || Boolean(spot.seasons.ice);
    });
  }, [water.spots, launch, speciesFilter, season]);

  const planSpots = useMemo(
    () =>
      plan
        .map((id) => spots.find((x) => x.spot.id === id))
        .filter((x): x is NonNullable<typeof x> => Boolean(x)),
    [plan, spots],
  );

  const selectSpot = useCallback((id: string) => {
    setSelectedId((cur) => (cur === id ? null : id));
    requestAnimationFrame(() => {
      listRef.current.get(id)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }, []);

  function toggleSpecies(id: SpeciesId) {
    setSpeciesFilter((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function togglePlan(id: string) {
    setPlan((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:items-start lg:gap-8">
      <div className="space-y-5 lg:sticky lg:top-4">
      <WaterMap
        spots={spots.map((s) => s.spot)}
        launches={water.launches}
        species={water.species}
        selectedId={selectedId}
        homeLaunch={launchName}
        onSelect={selectSpot}
      />

      <div className="space-y-3">
        <div className="flex rounded-lg border border-line bg-surface p-0.5" role="tablist" aria-label="Season">
          {SEASONS.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={season === s.id}
              onClick={() => setSeason(s.id)}
              className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
                season === s.id
                  ? "bg-accent text-accent-ink"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {water.species.map((sp) => (
            <SpeciesChip
              key={sp}
              id={sp}
              active={speciesFilter.size === 0 || speciesFilter.has(sp)}
              onClick={() => toggleSpecies(sp)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="launch"
          className="flex items-center gap-1.5 text-xs font-medium text-ink-muted"
        >
          <span className="h-2 w-2 rotate-45 rounded-[2px] bg-accent" aria-hidden />
          Running from
        </label>
        <div className="relative flex-1">
          <select
            id="launch"
            value={launchName}
            onChange={(e) => setLaunchName(e.target.value)}
            className="w-full appearance-none rounded-lg border border-line bg-surface py-2 pl-3 pr-8 text-sm font-medium outline-none focus:border-accent"
          >
            {water.launches.map((l) => (
              <option key={l.name} value={l.name}>
                {l.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        </div>
      </div>

      {planSpots.length > 0 && (
        <div className="animate-rise rounded-xl border border-accent/30 bg-accent/6 p-3.5">
          <div className="mb-2 flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-semibold">Today&apos;s run</h2>
            <span className="text-xs text-ink-faint">from {launchName}</span>
            <button
              type="button"
              onClick={() => setPlan([])}
              className="ml-auto rounded p-1 text-ink-faint hover:text-ink"
              aria-label="Clear run plan"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <ol className="space-y-1.5">
            {planSpots.map(({ spot, nm, minutes }, i) => (
              <li key={spot.id} className="flex items-center gap-2.5 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[11px] font-semibold text-accent">
                  {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => selectSpot(spot.id)}
                  className="truncate font-medium hover:text-accent"
                >
                  {spot.name}
                </button>
                <span className="ml-auto shrink-0 text-xs text-ink-faint">
                  {nm !== null ? `${formatDistance(nm)} · ` : ""}
                  {minutes !== null ? `~${minutes} min` : ""}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
      </div>

      <div className="mt-6 space-y-6 lg:mt-0">
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">
          Spots · nearest first
        </h2>
        {spots.length === 0 ? (
          <p className="rounded-xl border border-line bg-surface p-6 text-center text-sm text-ink-muted">
            No spots match those filters for {SEASONS.find((s) => s.id === season)?.label.toLowerCase()}.
          </p>
        ) : (
          <ul className="space-y-2" aria-label="Spots">
            {spots.map(({ spot, nm, minutes }) => {
              const open = selectedId === spot.id;
              return (
                <li
                  key={spot.id}
                  ref={(el) => {
                    if (el) listRef.current.set(spot.id, el);
                    else listRef.current.delete(spot.id);
                  }}
                  className={`rounded-xl border bg-surface transition-colors ${
                    open ? "border-accent/40" : "border-line"
                  }`}
                >
                  <div className="flex items-center gap-3 p-3.5">
                    <input
                      type="checkbox"
                      checked={plan.includes(spot.id)}
                      onChange={() => togglePlan(spot.id)}
                      aria-label={`Add ${spot.name} to run plan`}
                      className="h-5 w-5 shrink-0 accent-[var(--accent)]"
                    />
                    <button
                      type="button"
                      onClick={() => selectSpot(spot.id)}
                      aria-expanded={open}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{spot.name}</p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-faint">
                          {spot.species.slice(0, 4).map((sp) => (
                            <span
                              key={sp}
                              className={`h-1.5 w-1.5 rounded-full ${SPECIES[sp]?.dot ?? ""}`}
                              title={SPECIES[sp]?.short}
                            />
                          ))}
                          <span className="truncate">
                            {nm !== null ? `${formatDistance(nm)}` : spot.nearestLaunch}
                            {minutes !== null ? ` · ~${minutes} min` : ""}
                          </span>
                        </p>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-ink-faint transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-line px-3.5 pb-4">
                        <SpotCard
                          spot={spot}
                          waterSlug={water.slug}
                          season={season}
                          runInfo={
                            nm !== null && minutes !== null && launch
                              ? {
                                  fromLaunch: launch.name,
                                  minutes,
                                  distance: formatDistance(nm),
                                }
                              : undefined
                          }
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <BaitsPanel water={water} />
      <RegsPanel water={water} />
      </div>
    </div>
  );
}
