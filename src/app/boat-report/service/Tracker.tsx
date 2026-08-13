"use client";

import { useEffect, useState } from "react";

type Interval = { months: number; season?: string };

type ServiceItem = {
  id: string;
  name: string;
  interval: Interval | null; // null = every-trip habit
  intervalLabel: string;
  why: string;
  cost: string;
};

const ITEMS: ServiceItem[] = [
  {
    id: "impeller",
    name: "Water pump impeller kit",
    interval: { months: 36 },
    intervalLabel: "Every 3 years",
    why: "The rubber part that keeps the engine (and its $3,000 EMM) cool — it ages out from sitting, not hours. Never done on our watch and the boat sat 8 years: this is the first booking at CR's, with the compression baseline (4 numbers, written down) added while the cowl's off.",
    cost: "$200–250 (+$100 compression)",
  },
  {
    id: "gearcase",
    name: "Gearcase oil change",
    interval: { months: 12, season: "fall" },
    intervalLabel: "Every fall",
    why: "Drain tells the truth: milky oil = water past the prop-shaft seal (fishing line is the usual culprit — check behind the prop). Fills from the BOTTOM hole with a pump. First one happens with the impeller service.",
    cost: "$50–80 shop · ~$25 DIY",
  },
  {
    id: "winterize",
    name: "Winterization + fuel stabilizer",
    interval: { months: 12, season: "fall" },
    intervalLabel: "Every fall",
    why: "The E-TEC self-fogs (the previous owner ran it all 9 falls — that's why the engine survived). Run the routine, StaBil the fuel, top the tank, batteries on the MK315D, cover on. The single habit most responsible for this engine's condition.",
    cost: "~$30 in supplies",
  },
  {
    id: "spring",
    name: "Spring wake-up checks",
    interval: { months: 12, season: "spring" },
    intervalLabel: "Every spring",
    why: "Ten minutes that prevents on-water failures: tell-tale stream at first start, battery voltage, primer bulb squeeze test, fuel lines, trailer lights, XD100 reservoir full, prop wrench check.",
    cost: "Free",
  },
  {
    id: "anodes",
    name: "Anode inspection (swap for salt)",
    interval: { months: 12, season: "before salt season" },
    intervalLabel: "Yearly · before first salt trip",
    why: "Magnesium anodes are freshwater-only. Before the first Milford season: swap to zinc or aluminum on the engine and trim. Replace any anode more than half gone.",
    cost: "$60–100",
  },
  {
    id: "bearings",
    name: "Trailer bearing service",
    interval: { months: 24 },
    intervalLabel: "Every 2 years",
    why: "Repack or replace with Triple-Guard grease. A failed bearing on the Northway with the boat behind you is the most expensive $50 ever saved. Spin-check the hubs each spring in the meantime.",
    cost: "$50 DIY · $150–200 shop",
  },
  {
    id: "tires",
    name: "Trailer tire date-code check",
    interval: { months: 12 },
    intervalLabel: "Yearly · replace ~6 years old",
    why: "Trailer tires age out before they wear out — the DOT code's last four digits are week/year made. Current set checked good at purchase (Aug 2026).",
    cost: "Free to check · ~$200–300 to replace",
  },
  {
    id: "emm",
    name: "EMM report pull",
    interval: { months: 24 },
    intervalLabel: "Every 2 years",
    why: "The engine's official biography, and our best resale document. Each pull extends the verified-history paper trail that made this boat worth buying. CR's does it in minutes.",
    cost: "Free–$50",
  },
];

const HABITS: { name: string; why: string }[] = [
  {
    name: "After every trip: plug into the MK 315D",
    why: "5A per bank means deep recharges run overnight — plug in when you get home, not the morning of. Maintained batteries are why the current set was still 'new' at purchase.",
  },
  {
    name: "After every salt trip: the Milford routine",
    why: "Flush the engine on muffs 10–15 minutes, wash hull and trailer, rinse the Ulterra and livewell plumbing. Non-negotiable — the trolling motor's salt use isn't warrantied.",
  },
  {
    name: "Every trip: XD100 reservoir glance",
    why: "The E-TEC injects oil from the reservoir — it burns roughly a gallon per 30–40 hours. Keep it topped; the low-oil alarm is not a fuel gauge.",
  },
  {
    name: "Every launch: transom plug + tell-tale",
    why: "The two glances that prevent 90% of bad days: plug in before the ramp, water stream confirmed at startup.",
  },
];

const STORAGE_KEY = "fih:serviceLog";

function addMonths(iso: string, months: number): Date {
  const d = new Date(iso);
  d.setMonth(d.getMonth() + months);
  return d;
}

function fmt(d: Date): string {
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function Tracker() {
  const [log, setLog] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved && typeof saved === "object") setLog(saved);
    } catch {}
    setLoaded(true);
  }, []);

  const mark = (id: string) => {
    const today = new Date().toISOString().slice(0, 10);
    setLog((prev) => {
      const next = { ...prev, [id]: today };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const clear = (id: string) => {
    setLog((prev) => {
      const next = { ...prev };
      delete next[id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return (
    <div>
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
        Scheduled — log each service when it happens
      </h2>
      <ul className="space-y-2">
        {ITEMS.map((item) => {
          const last = log[item.id];
          let statusChip: { label: string; cls: string };
          let dueLine = "";
          if (!loaded) {
            statusChip = { label: "…", cls: "bg-surface-2 text-ink-faint" };
          } else if (!last) {
            statusChip =
              item.id === "impeller"
                ? { label: "Overdue — book it", cls: "bg-red-500/10 text-red-700 dark:bg-red-400/10 dark:text-red-400" }
                : { label: "Not yet logged", cls: "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400" };
            dueLine = item.interval?.season ? `Cycle: ${item.intervalLabel.toLowerCase()}` : "";
          } else if (item.interval) {
            const due = addMonths(last, item.interval.months);
            const now = new Date();
            const soon = new Date(now);
            soon.setDate(soon.getDate() + 60);
            if (due < now) {
              statusChip = { label: "Overdue", cls: "bg-red-500/10 text-red-700 dark:bg-red-400/10 dark:text-red-400" };
            } else if (due < soon) {
              statusChip = { label: "Due soon", cls: "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400" };
            } else {
              statusChip = { label: "Done ✓", cls: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400" };
            }
            dueLine = `Last: ${fmt(new Date(last))} · next due ${fmt(due)}`;
          } else {
            statusChip = { label: "Done ✓", cls: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400" };
            dueLine = `Last: ${fmt(new Date(last))}`;
          }
          return (
            <li key={item.id} className="rounded-xl border border-line bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold">{item.name}</p>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusChip.cls}`}
                >
                  {statusChip.label}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-ink-faint">
                {item.intervalLabel} · {item.cost}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.why}</p>
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-line/60 pt-2.5">
                <p className="text-xs text-ink-muted">{dueLine || "No record yet"}</p>
                <div className="flex shrink-0 gap-3">
                  {last && (
                    <button
                      type="button"
                      onClick={() => clear(item.id)}
                      className="text-xs text-ink-faint hover:text-ink-muted"
                    >
                      Undo
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => mark(item.id)}
                    className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink transition-opacity hover:opacity-90"
                  >
                    Log done today
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <h2 className="mt-8 mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
        Habits — no logging, just always
      </h2>
      <ul className="mb-4 space-y-2">
        {HABITS.map((h) => (
          <li key={h.name} className="rounded-xl border border-line bg-surface p-4">
            <p className="text-sm font-semibold">{h.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{h.why}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
