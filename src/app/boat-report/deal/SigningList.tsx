"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string; detail: string };

const ITEMS: Item[] = [
  {
    id: "otd-confirm",
    label: "Confirm $14,800 is the total out the door — itemized",
    detail:
      "Boat price, trade allowance, tax, title, registration, every fee, listed on the buyer's order and summing to $14,800. \"After fees and all\" gets written down, not remembered.",
  },
  {
    id: "seat-writing",
    label: "Seat repair in writing",
    detail: "\"Seat seams repaired before delivery\" as a line on the buyer's order — the thing Chris already agreed to, converted from handshake to ink.",
  },
  {
    id: "garmin-writing",
    label: "Garmin transfer in writing",
    detail:
      "\"Dealer to transfer buyer's Garmin unit, transducer, and wiring to new boat — installed, wired, and water-tested — at no charge, before delivery.\" Old transducer holes sealed on both boats.",
  },
  {
    id: "helix-stays",
    label: "Helix 7 stays with the boat",
    detail: "It's part of what was bought. Bow-mount it later or sell it (~$100–150) toward the seat fix.",
  },
  {
    id: "remote-ask",
    label: "Remote: found — confirm it comes home with the boat",
    detail:
      "The i-Pilot remote turned up at the dealership. Make sure it's physically in the boat at delivery, with a fresh battery, paired and tested. (Backup exists either way: the One-Boat Network app runs everything including Spot-Lock.)",
  },
  {
    id: "service-package",
    label: "Book the day-one service package (your dime — say so)",
    detail:
      "\"While it's in for the seat and electronics, have your shop do the water pump kit, gearcase oil change, and a compression check — write me the four numbers. Bill me for it.\" ~$350–450. The impeller is 8 years old on a boat that sat; the compression numbers close the EMM report's one open question and become your resale paperwork.",
  },
  {
    id: "deposit-contingent",
    label: "Deposit refundable pending the water test",
    detail:
      "Written on the buyer's order: \"Deposit refundable if the engine fails to reach full rated RPM (5,500–6,000) at the water test.\" Target: in-range RPM and roughly 43–47 mph, smooth idle, clean cold start.",
  },
  {
    id: "title-clean",
    label: "Titles clean and in hand",
    detail:
      "Boat title matches HIN ACBW8951F718, no liens, Vermont transfer handled by the dealer, and the trailer's own title transfers with it. \"We'll mail it\" is not an answer.",
  },
  {
    id: "delivery-date",
    label: "Delivery date with the work done",
    detail:
      "One date on the paper by which seat, Garmin install, and service are complete and the boat is handed over — so \"before delivery\" means something.",
  },
];

const STORAGE_KEY = "fih:signingList";

export function SigningList() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved && typeof saved === "object") setDone(saved);
    } catch {}
  }, []);

  const toggle = (id: string) => {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const count = Object.values(done).filter(Boolean).length;

  return (
    <div>
      <p className="mb-2 text-sm text-ink-muted">
        {count} of {ITEMS.length} handled · checks save on this phone
      </p>
      <ul className="space-y-2">
        {ITEMS.map((item) => {
          const checked = !!done[item.id];
          return (
            <li key={item.id}>
              <label
                className={`block cursor-pointer rounded-xl border p-4 transition-colors ${
                  checked ? "border-accent/40 bg-accent/5" : "border-line bg-surface"
                }`}
              >
                <span className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(item.id)}
                    className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-[var(--accent)]"
                  />
                  <span className="min-w-0">
                    <span
                      className={`block text-sm font-semibold ${
                        checked ? "text-ink-muted line-through" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                      {item.detail}
                    </span>
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
