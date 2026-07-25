import Link from "next/link";
import { Anchor, ExternalLink, Fish, Layers, Timer } from "lucide-react";
import type { SeasonId, Spot } from "@/lib/types";
import { SEASONS } from "@/lib/seasons";
import { SpeciesChip } from "@/components/ui/SpeciesChip";

export function SpotCard({
  spot,
  waterSlug,
  season,
  runInfo,
}: {
  spot: Spot;
  waterSlug: string;
  season: SeasonId;
  runInfo?: { fromLaunch: string; minutes: number; distance: string };
}) {
  const orderedSeasons = [
    ...SEASONS.filter((s) => s.id === season),
    ...SEASONS.filter((s) => s.id !== season),
  ].filter((s) => spot.seasons[s.id]);

  return (
    <div className="space-y-4 pt-1">
      <div className="flex flex-wrap gap-1.5">
        {spot.species.map((s) => (
          <SpeciesChip key={s} id={s} />
        ))}
      </div>

      <div className="flex items-start gap-2 text-sm text-ink-muted">
        <Layers className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
        <p className="leading-relaxed">{spot.structure}</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-ink-muted">
        <Anchor className="h-4 w-4 shrink-0 text-ink-faint" />
        {runInfo ? (
          <span>
            {runInfo.distance} from {runInfo.fromLaunch} ·{" "}
            <span className="inline-flex items-center gap-1">
              <Timer className="h-3.5 w-3.5" /> ~{runInfo.minutes} min run
            </span>
          </span>
        ) : (
          <span>
            Nearest launch: {spot.nearestLaunch}
            {spot.runMinutes ? ` · ~${spot.runMinutes} min run` : ""}
          </span>
        )}
      </div>

      <section>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
          Season by season
        </h4>
        <dl className="space-y-2.5">
          {orderedSeasons.map((s) => (
            <div
              key={s.id}
              className={`rounded-lg border p-3 ${
                s.id === season
                  ? "border-accent/35 bg-accent/6"
                  : "border-line bg-surface-2/50"
              }`}
            >
              <dt className="flex items-baseline gap-2 text-xs font-semibold">
                {s.label}
                <span className="font-normal text-ink-faint">{s.months}</span>
                {s.id === season && (
                  <span className="ml-auto rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent">
                    now
                  </span>
                )}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink-muted">
                {spot.seasons[s.id]}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {spot.baits.length > 0 && (
        <section>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
            Baits &amp; presentations
          </h4>
          <ul className="space-y-2.5">
            {spot.baits.map((b, i) => (
              <li key={i} className="rounded-lg border border-line bg-surface-2/50 p-3">
                <p className="text-sm font-medium">{b.lure}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                  {b.presentation}
                </p>
                <p className="mt-1 text-xs text-ink-faint">{b.when}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex items-center justify-between gap-3 pt-1">
        <Link
          href={`/log?water=${waterSlug}&spot=${spot.id}&new=1`}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
        >
          <Fish className="h-4 w-4" />
          Log a catch here
        </Link>
        {spot.sources.length > 0 && (
          <details className="text-right">
            <summary className="cursor-pointer list-none text-xs text-ink-faint hover:text-ink-muted">
              Sources ({spot.sources.length})
            </summary>
            <ul className="mt-2 space-y-1 text-left">
              {spot.sources.map((url) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex max-w-full items-center gap-1 truncate text-xs text-accent hover:underline"
                  >
                    <ExternalLink className="h-3 w-3 shrink-0" />
                    <span className="truncate">{new URL(url).hostname.replace("www.", "")}</span>
                  </a>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>

      <p className="text-[11px] leading-relaxed text-ink-faint">
        Coordinates are area centers from public reports — verify structure on sonar
        before you commit to a drift.
      </p>
    </div>
  );
}
