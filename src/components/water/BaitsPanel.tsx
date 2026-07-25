import { ChevronDown } from "lucide-react";
import type { Water } from "@/lib/types";
import { SPECIES } from "@/lib/species";
import type { SpeciesId } from "@/lib/types";

export function BaitsPanel({ water }: { water: Water }) {
  const entries = Object.entries(water.speciesBaits) as [
    SpeciesId,
    NonNullable<Water["speciesBaits"][SpeciesId]>,
  ][];
  if (entries.length === 0) return null;
  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">
        What&apos;s working · by species
      </h2>
      <div className="space-y-2">
        {entries.map(([sp, baits]) => {
          const meta = SPECIES[sp];
          if (!meta) return null;
          return (
            <details
              key={sp}
              className="group rounded-xl border border-line bg-surface"
            >
              <summary className="flex cursor-pointer list-none items-center gap-2.5 p-3.5">
                <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                <span className="text-sm font-semibold">{meta.label}</span>
                <span className="text-xs text-ink-faint">{baits.length} setups</span>
                <ChevronDown className="ml-auto h-4 w-4 text-ink-faint transition-transform group-open:rotate-180" />
              </summary>
              <ul className="space-y-2.5 border-t border-line p-3.5">
                {baits.map((b, i) => (
                  <li key={i}>
                    <p className="text-sm font-medium">{b.lure}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                      {b.presentation}
                    </p>
                    <p className="mt-1 text-xs text-ink-faint">{b.when}</p>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
      {water.localColor.length > 0 && (
        <div className="mt-4 rounded-xl border border-line bg-surface-2/60 p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
            Local intel
          </h3>
          <ul className="space-y-2.5">
            {water.localColor.map((c, i) => (
              <li key={i} className="text-sm leading-relaxed text-ink-muted">
                {c.note}
                {c.source && (
                  <a
                    href={c.source}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-1.5 text-xs text-accent hover:underline"
                  >
                    source
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
