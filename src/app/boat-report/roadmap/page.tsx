import Link from "next/link";
import { ArrowLeft, ChevronDown, Map } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Upgrade roadmap · 2018 Alumacraft Pro 185",
  description:
    "The boat's upgrade plan in order: BBT dash mount, rigging boot, Helix to the bow, the LiveScope bow station, and the parked wishlist.",
};

type Status = "next" | "queued" | "saving" | "seasonal" | "parked";

const statusStyle: Record<Status, { label: string; cls: string }> = {
  next: { label: "Next up", cls: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400" },
  queued: { label: "Queued", cls: "bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-400" },
  saving: { label: "Saving for", cls: "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400" },
  seasonal: { label: "Before salt season", cls: "bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-400" },
  parked: { label: "Parked", cls: "bg-surface-2 text-ink-faint" },
};

const ROADMAP: {
  title: string;
  status: Status;
  cost: string;
  summary: string;
  details: string[];
}[] = [
  {
    title: "Dash mount + the Garmin 93sv at the helm",
    status: "next",
    cost: "$100 RAM route · $350 BBT route",
    summary:
      "ANSWERED BY BBT (Van, Aug 2026): the 93sv fits the standard Single mount, hardware and instructions included, same-day shipping, and the linked 2018-2019 product page is the correct part. One correction to our research: this dash is too curved for a full replacement plate — their mount bolts to the CENTER of the dash with a backer plate, and the factory panel stays.",
    details: [
      "Consequence: the mount solves the Garmin problem, not the cosmetic one. The sun-baked panel fix returns to the SEM refinish guide (findings page) or the \"dash shroud from Alumacraft\" Van suggested — part number being chased; Alumacraft's 2025 sale makes OEM parts hit-or-miss.",
      "Follow-ups sent with dash photos: does the backer plate work over the existing Helix mounting holes once it moves to the bow; the price shipped to 12180 (Van skipped it); and the shroud part number.",
      "Price landed: $350 for the BBT Single. The alternative tier, now that it's a mount rather than a panel fix: RAM-D-115 (~$80–120, 2.25\" D-ball, rated 10 lbs, direct fit for 9\" gimbal brackets) with a $10 DIY aluminum backer — or the factory bail straight to the dash with a backer for nearly free. Wobble tolerance matters at the bow for LiveScope, barely at the helm for charts: the RAM route banks ~$250 toward the LiveScope fund, and BBT ships same-day forever if the RAM ever shivers too much at 47 mph.",
      "Whichever mount wins: a backer plate behind the thin curved panel is non-negotiable — spread the load, through-bolt with nylocs, Tef-Gel the stainless.",
      "Before ordering: dig the 93sv's factory bail bracket out of the Mirrocraft parts pile (the mount uses it; ~$40 if lost) and check whether the old transducer came along — if it stayed on the traded boat, the dash unit is charts-only until a GT56UHD (~$270) is added.",
      "The unit hangs on its bail, so it pops off the mount for storage or swaps anytime.",
    ],
  },
  {
    title: "Rigging boot + clamp — first DIY",
    status: "next",
    cost: "$20–60",
    summary:
      "The cracked boot where the rigging tube enters the engine, deferred from the deal as cosmetic. First job for the M12 ratchet.",
    details: [
      "Replace the split boot and failed clamp where the rigging conduit enters the lower cowl.",
      "While it's open: inspect the connectors under the cowl for corrosion — clean, dry connections are what keep the $3,000 EMM alive.",
      "Hand-start every stainless fastener and Tef-Gel any thread going into aluminum.",
    ],
  },
  {
    title: "The bow stays empty — reserved for LiveScope",
    status: "queued",
    cost: "$0",
    summary:
      "Decision made: no placeholder bow electronics. When the Garmin takes the dash, the Helix comes off and sells (~$100–150 toward the fund), and the bow waits clean for the LiveScope station.",
    details: [
      "Why not bridge with the Helix at the bow: it'd need a mount, an adapter, and wiring for a unit that's leaving anyway — that money and drilling belongs to the real bow station.",
      "The Ulterra's built-in US2 transducer goes unused in this plan (Garmin heads can't read it) — it's simply a resale footnote.",
      "Helix sale prep: the $12 anti-glare protector salvage from the restoration guide bumps its price if it's worth the ten minutes.",
    ],
  },
  {
    title: "The LiveScope bow station",
    status: "saving",
    cost: "~$4,500 recommended build",
    summary:
      "Researched August 2026, five weeks after LiveScope 2 launched. The pick for our water: LVS44 transducer ($1,999) + ECHOMAP Ultra 2 106sv ($2,099) + dedicated 50–100Ah LiFePO4 — barrel-mounted on the Ulterra, fully independent of the dash.",
    details: [
      "Why LVS44 over the $2,199 LVS42HD: the 42HD is a close-range (~125 ft) clarity specialist — right for bass-only boats. The LVS44's lower frequency band and 250-ft envelope serve ALL our water: 60–120-ft lakers and salmon, better saltwater behavior for stripers and the Sound, and still a generational clarity jump over the old LVS34 for bass. Bassmaster Elite pro Alton Jones Jr., after three days on the water with both, called the LVS44 the better all-around choice even for most bass anglers.",
      "Why the Ultra 2 106sv over the cheaper UHD2 93sv: forward-facing sonar rewards pixels — the 106sv's 1280×800 on 10.1\" versus the 93sv's 1024×600 on 9\" is the single most worthwhile ~$900 upsell in the build. Budget fallback: UHD2 93sv + LVS44 ≈ $3,500 total, same sonar data on a coarser canvas. Skip 7-inch units for FFS entirely.",
      "Why not our existing 93sv: first-gen UHD can't run LiveScope 2 — and the bow needs its own screen anyway.",
      "Ulterra integration, answered: mechanically clean — the included barrel mount clamps the motor housing (never the auto-stow shaft) and the transducer stows/deploys with the motor; leave a ~10\" cable loop across the pivot and watch the first cycles. Electronically there's no integration and none needed: aim the view by steering the motor. One quirk to expect: while Spot-Locked, the motor's corrections swing the LiveScope view — live with it, use manual holds, or add a pole mount someday.",
      "Power: dedicated 50Ah LiFePO4 (~$250) runs display + LiveScope ~8–10 hours; 100Ah for tournament days. Separate from the Ulterra's 24V bank.",
      "Timing note: no LiveScope 2 bundles existed as of Aug 2026 (too new) — waiting until winter likely brings bundles and a firmware maturity cycle. Update the display's software immediately on install, and verify the exact head unit on Garmin's LiveScope 2 compatibility list before ordering.",
      "Money-no-object reference: Ultra 2 122sv (or a GPSMAP glass helm) running BOTH transducers — LVS42HD for casting range plus LVS44 for open water (~$7,700–12k). The dual-ducer split is the current pro template.",
      "Cross-brand check: Garmin still leads live-sonar image quality in 2026; Lowrance ActiveTarget 2 is the value alternative; Humminbird MEGA Live 2's TargetLock integration requires an Ultrex — it doesn't support our Ulterra. Lean Garmin.",
      "Ice-fishing path exists: a zero-degree shaft mount is sold separately and the LVS44 can be repurposed on an ice pod (the dedicated ice variant adds a cold-rated cable).",
    ],
  },
  {
    title: "Salt kit before the first Milford season",
    status: "seasonal",
    cost: "~$100–150",
    summary:
      "Before the first Long Island Sound trip: swap the freshwater magnesium anodes for zinc or aluminum, and stock the flush-and-rinse routine.",
    details: [
      "Anodes: magnesium is freshwater-only — zinc or aluminum for salt, on the engine and trim tabs.",
      "The routine (also in the owner's reference): flush the engine 10–15 minutes after every salt trip, wash hull and trailer, rinse the Ulterra and livewell plumbing.",
      "The Ulterra is the freshwater model — salt use isn't warrantied, so the rinse is non-negotiable.",
    ],
  },
  {
    title: "Console cosmetics — the refinish is back on",
    status: "parked",
    cost: "~$50–100 DIY",
    summary:
      "BBT confirmed their mount leaves the factory panel in place (the dash is too curved for a plate), so the SEM refinish guide on the findings page is the cosmetic fix for the whole dash — unless the Alumacraft dash shroud Van mentioned turns out to be orderable.",
    details: [
      "Full step-by-step lives in the findings page restoration guide: scrape, sand, adhesion promoter, texture coat, SEM Marine Vinyl Coat in satin.",
      "Trim and bezels: Solution Finish or CeraKote once, 303 Marine as the maintenance layer.",
    ],
  },
  {
    title: "Hydraulic steering",
    status: "parked",
    cost: "~$700–950",
    summary:
      "Comfort upgrade, waiting on budget. The NFB mechanical steering works fine; this is for effort-free wheel feel at 47 mph and across long trolling days.",
    details: [
      "The right-sized kit for a 115: SeaStar Solutions BayStar (rated to 150 hp) — helm, front-mount cylinder, tubing, fluid.",
      "DIY-able weekend; bleeding the system is a two-person job.",
      "If the fund fills before the BBT order ships, do both in one console-open weekend and save a teardown — but the dash plate does not wait for this.",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-4 sm:px-6">
      <header className="mb-5 flex items-center gap-2">
        <Link
          href="/boat-report"
          aria-label="Back to the boat"
          className="rounded-full p-2 text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold tracking-tight">Upgrade roadmap</h1>
          <p className="truncate text-xs text-ink-muted">
            In order of attack · tap any item for the full plan
          </p>
        </div>
        <ThemeToggle />
      </header>

      <p className="mb-4 flex items-start gap-2 text-sm leading-relaxed text-ink-muted">
        <Map className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
        The boat fishes great as-is — everything here is improvement, not repair. Ordered by
        what unlocks what: the dash plate enables the Helix move, the Helix move holds the bow
        until LiveScope, and the parked items wait for their budgets without blocking anything.
      </p>

      <ul className="mb-4 space-y-2">
        {ROADMAP.map((item) => {
          const st = statusStyle[item.status];
          return (
            <li key={item.title}>
              <details className="group rounded-xl border border-line bg-surface">
                <summary className="cursor-pointer list-none p-4">
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-sm font-semibold">{item.title}</span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${st.cls}`}
                    >
                      {st.label}
                    </span>
                  </span>
                  <span className="mt-1.5 flex items-center gap-2">
                    <span className="text-xs font-semibold text-ink-faint">{item.cost}</span>
                    <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-ink-faint transition-transform group-open:rotate-180" />
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-ink-muted">
                    {item.summary}
                  </span>
                </summary>
                <ul className="space-y-2 border-t border-line p-4">
                  {item.details.map((d) => (
                    <li key={d.slice(0, 40)} className="text-sm leading-relaxed text-ink-muted">
                      · {d}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
