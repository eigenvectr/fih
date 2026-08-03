"use client";

import { useEffect, useState } from "react";

type Item = {
  id: string;
  label: string;
  how: string;
  good: string;
  bad: string;
};

type Group = { title: string; items: Item[] };

const GROUPS: Group[] = [
  {
    title: "Engine, before it runs",
    items: [
      {
        id: "engine-id",
        label: "Confirm which engine it actually is",
        how: "Read the model sticker on the engine's mounting bracket and the USCG capacity plate on the hull. Photograph both.",
        good: "E-TEC 115 H.O., serial sticker intact, capacity plate says 115 hp max.",
        bad: "A 150 on a hull rated 115 (insurance problem), or a missing / painted-over serial sticker.",
      },
      {
        id: "prop-lower",
        label: "Prop and lower unit",
        how: "Look at the blade edges, then peek behind the prop at the shaft seal.",
        good: "Clean blade edges, dry seal area, no oil film on the lower unit.",
        bad: "Chewed or bent blades, fishing line wrapped behind the prop, oily streaks — line at the seal can mean water in the gearcase.",
      },
      {
        id: "battery",
        label: "Batteries and connections",
        how: "Open the battery compartment. Check terminals, wiring, and look for an onboard charger. Ask the batteries' age.",
        good: "Clean lugs with real locking nuts, tidy wiring, charger installed.",
        bad: "Wing nuts (they loosen and the voltage spikes kill the $3k EMM), green corrosion, spliced or rats-nest wiring.",
      },
    ],
  },
  {
    title: "Engine, running",
    items: [
      {
        id: "cold-start",
        label: "Cold start — ask them not to pre-warm it",
        how: "You want to see the very first start of the day. Watch and listen.",
        good: "Fires within a few seconds, settles to a smooth idle, steady tell-tale water stream.",
        bad: "Long cranking, alarms, rough or hunting idle, weak or sputtering water stream.",
      },
      {
        id: "emm",
        label: "EMM diagnostic report, pulled while you watch",
        how: "The dealer connects a laptop to the engine. Ask to see hours, fault codes, and the RPM histogram.",
        good: "Hours match the claimed 72.5, no overheat or over-rev events, no stored faults.",
        bad: "Hours that don't match the ad, overheat codes, or any reluctance to pull the report at all.",
      },
      {
        id: "wot",
        label: "Water test at wide-open throttle",
        how: "On the water, trimmed out, full throttle. Watch the tach and GPS speed.",
        good: "Reaches its full rated RPM (ask the spec — ~5,500–6,000 for a 115 H.O.) and roughly 41–45 mph.",
        bad: "Bogs below rated RPM (wrong prop or tired engine), overheat alarm, heavy vibration, porpoising.",
      },
    ],
  },
  {
    title: "Hull and transom",
    items: [
      {
        id: "hull-bottom",
        label: "Sight down the hull bottom",
        how: "Crouch at the bow and look along the bottom toward the stern, down each strake.",
        good: "Straight, even lines all the way back.",
        bad: "A hook or wave in the surface, dents from trailer rollers, gouges deeper than the paint.",
      },
      {
        id: "rivets",
        label: "Rivet lines and seams",
        how: "Walk the hull slowly, especially below the waterline. Look for anything weeping.",
        good: "Dry, uniform rivet heads and clean seams.",
        bad: "Dark streaks trailing below rivets (leaking), smeared or loose rivet heads, fresh blobs of sealant — someone chased a leak recently.",
      },
      {
        id: "transom",
        label: "Transom flex test",
        how: "With the engine tilted up, grab the lower unit and push down and pull up, hard.",
        good: "Rock solid. No movement, no sound.",
        bad: "Visible flex, creaking, or cracks and rust stains around the mounting bolts.",
      },
      {
        id: "deck",
        label: "Walk every inch of the deck",
        how: "Slow steps across both casting decks, around seat bases and livewell lids.",
        good: "Uniformly firm underfoot everywhere.",
        bad: "Any spongy or soft spot — that's rotted or delaminated decking underneath.",
      },
    ],
  },
  {
    title: "Systems",
    items: [
      {
        id: "livewells",
        label: "Livewells and bilge pump",
        how: "Have them run both livewell fills, aerators, and the bilge pump. Open the lids and look in.",
        good: "Pumps prime quickly, water flows, drains work, wells are clean.",
        bad: "Dead pumps, corroded fittings, standing water or a musty smell below.",
      },
      {
        id: "steering",
        label: "Steering and tilt/trim",
        how: "Turn the wheel lock to lock. Run the tilt through its full range and listen.",
        good: "Smooth the whole way, no slop at the wheel, trim moves evenly.",
        bad: "Stiff spots, clunking play, or hydraulic fluid weeping from the trim rams.",
      },
      {
        id: "ulterra",
        label: "Ulterra trolling motor",
        how: "Full cycle: auto deploy, run through the speeds, Spot-Lock if you're on water, auto stow.",
        good: "Smooth deploy and stow, responds at every speed, mount is tight.",
        bad: "Grinding or hesitation on stow (common Ulterra failure point), dead speeds, cracked mount.",
      },
      {
        id: "electronics",
        label: "Helix and every switch",
        how: "Power the Helix on, confirm the transducer reads once in water. Then flip everything: nav lights, courtesy light, horn, gauges, 12V outlet.",
        good: "Everything works first try.",
        bad: "A 'that just needs a fuse' answer — assume it doesn't work and price accordingly.",
      },
    ],
  },
  {
    title: "Trailer and paperwork",
    items: [
      {
        id: "tires",
        label: "Trailer tire date codes",
        how: "Find the DOT code on each sidewall — the last 4 digits are week/year made (e.g. 2318 = week 23 of 2018).",
        good: "Under 6 years old, even wear, no cracking.",
        bad: "2018 originals or sidewall cracks between the treads — trailer tires age out long before they wear out.",
      },
      {
        id: "trailer-mech",
        label: "Bearings, winch, lights",
        how: "Spin each wheel by hand, tug the winch strap, have them plug in the lights.",
        good: "Wheels spin freely and quietly, strap is unfrayed, all lights work.",
        bad: "Grinding or wobbling wheels, rusted winch, dead lights.",
      },
      {
        id: "title",
        label: "Title and HIN match",
        how: "Ask to see the actual title. Compare it to the HIN stamped on the upper right transom: ACBW8951F718. Check the trailer has its own title.",
        good: "Title in hand, numbers match, no lien noted, trailer title too.",
        bad: "\"We'll mail it to you,\" mismatched numbers, or a lien that isn't released in writing.",
      },
    ],
  },
];

const STORAGE_KEY = "fih:boatInspect";
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
        Take your time — a serious buyer inspecting carefully reads as serious, not rude.
        Photograph anything that fails a check. Nothing here commits you to anything.
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
                      checked
                        ? "border-accent/40 bg-accent/5"
                        : "border-line bg-surface"
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
                          {item.how}
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed">
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                            Good:
                          </span>{" "}
                          <span className="text-ink-muted">{item.good}</span>
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed">
                          <span className="font-semibold text-red-700 dark:text-red-400">
                            Walk-away:
                          </span>{" "}
                          <span className="text-ink-muted">{item.bad}</span>
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
        One or two &quot;walk-away&quot; findings are negotiation points, not necessarily
        deal-killers — except the transom, soft decks, a bad EMM report, or paperwork problems.
        Those four, walk.
      </p>
    </div>
  );
}
