"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { db } from "@/lib/db";
import { SPECIES, speciesLabel } from "@/lib/species";
import { getWaters } from "@/lib/waters";
import type { LogEntry, SpeciesId } from "@/lib/types";

function PhotoThumb({ photo, alt }: { photo: Blob; alt: string }) {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    const u = URL.createObjectURL(photo);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [photo]);
  if (!url) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={alt} className="h-14 w-14 rounded-lg object-cover" />;
}

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function HistoryList({ entries }: { entries: LogEntry[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const waters = getWaters();

  if (entries.length === 0) {
    return (
      <div role="status" className="rounded-xl border border-line bg-surface px-6 py-12 text-center">
        <p className="text-sm font-medium">No catches logged yet</p>
        <p className="mt-1 text-sm text-ink-muted">
          Hit &ldquo;New catch&rdquo; on the water — it takes about ten seconds.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {entries.map((e) => {
        const meta = SPECIES[e.species as SpeciesId];
        const open = expanded === e.id;
        const waterName =
          waters.find((w) => w.slug === e.waterSlug)?.name ?? e.waterSlug;
        return (
          <li key={e.id} className="rounded-xl border border-line bg-surface">
            <button
              type="button"
              onClick={() => setExpanded(open ? null : e.id)}
              aria-expanded={open}
              className="flex w-full items-center gap-3 p-3.5 text-left"
            >
              {e.photo ? (
                <PhotoThumb photo={e.photo} alt={`${speciesLabel(e.species)} catch`} />
              ) : (
                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ${meta ? "bg-surface-2" : "bg-surface-2"}`}
                >
                  <span className={`h-3 w-3 rounded-full ${meta?.dot ?? "bg-ink-faint"}`} />
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold">{speciesLabel(e.species)}</span>
                  {e.lengthIn && (
                    <span className="text-sm text-ink-muted">{e.lengthIn}&Prime;</span>
                  )}
                </span>
                <span className="mt-0.5 block truncate text-xs text-ink-faint">
                  {fmtDate(e.date)}
                  {e.spotName ? ` · ${e.spotName}` : ""}
                  {e.bait ? ` · ${e.bait}` : ""}
                </span>
              </span>
            </button>
            {open && (
              <div className="space-y-1.5 border-t border-line px-3.5 py-3 text-sm text-ink-muted">
                <p>{waterName}</p>
                {e.conditions && <p>Conditions: {e.conditions}</p>}
                {e.note && <p>{e.note}</p>}
                <button
                  type="button"
                  onClick={() => db.entries.delete(e.id)}
                  className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-red-400 hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete entry
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
