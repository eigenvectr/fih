"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string; detail: string };
type Group = { title: string; items: Item[] };

const GROUPS: Group[] = [
  {
    title: "Before it splashes",
    items: [
      {
        id: "straightedge",
        label: "Straightedge on the aft bottom",
        detail:
          "While it's still on the trailer: hold anything straight (a level, a board) flat against the running surface just ahead of the transom. Flat contact = fair bottom. A gap in the middle = hook, a rocking bulge = rocker — either one, stop and talk before splashing.",
      },
      {
        id: "cold-start",
        label: "True cold start — ask them not to pre-warm it",
        detail:
          "Watch the first fire of the day: lights off within a few seconds, settles to a smooth idle, steady tell-tale water stream. Long cranking or a rough hunting idle is information you can only get once per day.",
      },
      {
        id: "photos",
        label: "Two photos: charger label + Ulterra control head",
        detail:
          "Charger: model number (MK-330 = 3 banks covering all batteries; MK-220 = trolling pair only). Ulterra head: look for the Bluetooth logo — if it's there, download Minn Kota's free i-Pilot app and pair it before you leave the dock.",
      },
    ],
  },
  {
    title: "On the water",
    items: [
      {
        id: "idle",
        label: "Idle and troll a few minutes — smooth and even",
        detail:
          "The idle is your compression proxy: a weak cylinder can't hide at 700 RPM. Smooth, even, no hunting or shaking. This is also your lake-trout trolling preview.",
      },
      {
        id: "holeshot",
        label: "Hole shot — clean and strong",
        detail:
          "From idle to full throttle: strong pull onto plane, no bogging, no smoke that doesn't clear in seconds. The 4-blade should jump it up quickly.",
      },
      {
        id: "wot",
        label: "THE test: wide open, trimmed out — tach AND GPS together",
        detail:
          "Target: 5,500–6,000 RPM and roughly 43–47 mph (use a GPS speed app, not the old speedo). Both in range = the engine passes its life's exam. Under 5,500 = stop — that's over-propping or a tired engine, not a \"tune-up item.\" Over 6,000 but slow = pitch or hull drag; talk before signing.",
      },
      {
        id: "tracking",
        label: "Hands light on the wheel at speed",
        detail:
          "It should track straight with no bow-steer, no porpoising, no odd vibration in any RPM band. This is the wavy-hull-lines question getting its final answer — smooth and straight means the bottom is fair.",
      },
      {
        id: "steering-trim",
        label: "Steering lock-to-lock and trim full range, under way",
        detail: "Smooth both directions, no clunks or stiff spots; trim moves evenly through its whole range with the expected attitude change.",
      },
      {
        id: "livewells",
        label: "Livewells, aerators, bilge — run them on the water",
        detail: "Pumps prime and flow with the hull actually in the water (the only honest test of pickups).",
      },
      {
        id: "spotlock",
        label: "Spot-Lock test via the app",
        detail:
          "If the Ulterra is Bluetooth: deploy it, hit Spot-Lock in the i-Pilot app, and watch it hold position for a couple of minutes. Confirms the most valuable accessory on the boat actually does its headline trick.",
      },
    ],
  },
  {
    title: "Back on the trailer",
    items: [
      {
        id: "bilge",
        label: "Bilge and transom bolts — dry after a hard run",
        detail:
          "Look into the bilge at the transom mounting bolts and along the rear seams. Dry = the rivets, welds, and engine mount all pass the only leak test that counts.",
      },
      {
        id: "lower-unit",
        label: "Lower unit glance",
        detail: "No fresh oil streaks on the gearcase or around the prop shaft after running hard.",
      },
    ],
  },
  {
    title: "Mention to Chris while you're there",
    items: [
      {
        id: "boot",
        label: "Rigging boot + broken clamp — replaced before delivery",
        detail:
          "The cracked boot where the rigging tube enters the engine, and its failed clamp. Small part, already flagged, should be on the buyer's order — confirm it's actually ordered.",
      },
      {
        id: "impeller",
        label: "Book the water pump / impeller service — your dime, say so",
        detail:
          "\"The boat sat for eight years with no service record — while it's in the bay for the seat and electronics, have your guys do the water pump kit and gearcase oil, and run a compression check. Write me the four numbers. Bill me for the service.\" (~$350–450, cheap insurance, and it starts the service relationship.)",
      },
      {
        id: "work-schedule",
        label: "Confirm the work schedule and delivery date",
        detail:
          "Seat repair, Garmin transfer (installed, wired, water-tested), and the service — all done by one delivery date, on the buyer's order.",
      },
      {
        id: "remote",
        label: "Remote found — test it, then keep track of it",
        detail:
          "Fresh battery in it, pair it, run Spot-Lock from the remote on the water. Then make sure it's with the boat at delivery — it went missing once already.",
      },
    ],
  },
];

const STORAGE_KEY = "fih:waterTest";
const TOTAL = GROUPS.reduce((n, g) => n + g.items.length, 0);

export function Checklist() {
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
      <div className="sticky top-0 z-10 -mx-4 border-b border-line bg-canvas/95 px-4 py-2.5 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <p className="text-sm font-medium text-ink-muted">
            {count} of {TOTAL} checked
          </p>
          {count > 0 && (
            <button
              type="button"
              onClick={() => {
                setDone({});
                try {
                  localStorage.removeItem(STORAGE_KEY);
                } catch {}
              }}
              className="text-xs text-ink-faint transition-colors hover:text-ink-muted"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
        <strong className="text-ink">Result: PASSED.</strong> Measured 47 mph GPS wide open —
        the top of the predicted 43–47 range — with a clean run across the checks below. The
        boat was purchased on the strength of this test; the list is kept as the record and as
        a template for any future boat.
      </p>

      {GROUPS.map((g) => (
        <section key={g.title} className="mt-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
            {g.title}
          </h2>
          <ul className="space-y-2">
            {g.items.map((item) => {
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
        </section>
      ))}

      <p className="mt-6 mb-4 text-xs leading-relaxed text-ink-faint">
        If it makes its numbers, runs straight, and the bilge is dry — you&apos;re done verifying.
        Everything after that is paperwork and fishing.
      </p>
    </div>
  );
}
