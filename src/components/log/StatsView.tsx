"use client";

import type { LogEntry } from "@/lib/types";
import { speciesLabel } from "@/lib/species";

function tally(entries: LogEntry[], key: (e: LogEntry) => string | undefined) {
  const counts = new Map<string, number>();
  for (const e of entries) {
    const k = key(e);
    if (!k) continue;
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function BarList({ title, data }: { title: string; data: [string, number][] }) {
  if (data.length === 0) return null;
  const max = data[0][1];
  return (
    <section className="rounded-xl border border-line bg-surface p-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {data.slice(0, 8).map(([label, count]) => (
          <li key={label}>
            <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
              <span className="truncate">{label}</span>
              <span className="shrink-0 font-medium tabular-nums text-ink-muted">{count}</span>
            </div>
            <div className="h-2 rounded-full bg-surface-2">
              <div
                className="h-2 rounded-full bg-accent"
                style={{ width: `${Math.max(6, (count / max) * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function StatsView({ entries }: { entries: LogEntry[] }) {
  if (entries.length === 0) {
    return (
      <div role="status" className="rounded-xl border border-line bg-surface px-6 py-12 text-center">
        <p className="text-sm font-medium">No data yet</p>
        <p className="mt-1 text-sm text-ink-muted">Stats build themselves as you log catches.</p>
      </div>
    );
  }

  const monthly = tally(entries, (e) => {
    const m = Number(e.date.split("-")[1]);
    return Number.isInteger(m) && m >= 1 && m <= 12 ? MONTHS[m - 1] : undefined;
  }).sort((a, b) => MONTHS.indexOf(a[0]) - MONTHS.indexOf(b[0]));

  const biggest = entries
    .filter((e) => e.lengthIn)
    .sort((a, b) => (b.lengthIn ?? 0) - (a.lengthIn ?? 0))[0];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-2xl font-semibold tabular-nums">{entries.length}</p>
          <p className="mt-0.5 text-xs text-ink-muted">catches logged</p>
        </div>
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-2xl font-semibold tabular-nums">
            {biggest?.lengthIn ? `${biggest.lengthIn}"` : "—"}
          </p>
          <p className="mt-0.5 text-xs text-ink-muted">
            {biggest ? `best · ${speciesLabel(biggest.species)}` : "no lengths yet"}
          </p>
        </div>
      </div>
      <BarList title="By species" data={tally(entries, (e) => speciesLabel(e.species))} />
      <BarList title="By spot" data={tally(entries, (e) => e.spotName)} />
      <BarList title="By bait" data={tally(entries, (e) => e.bait)} />
      <BarList title="By month" data={monthly} />
    </div>
  );
}
