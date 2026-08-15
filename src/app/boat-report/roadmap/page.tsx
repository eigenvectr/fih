import Link from "next/link";
import { ArrowLeft, ChevronDown, Map } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Upgrade roadmap · 2018 Alumacraft Pro 185",
  description:
    "The boat's upgrade plan in order: dash mount for the Garmin, rigging boot, the fully-specced LiveScope 2 bow station with parts list, and the parked wishlist.",
};

type Status = "next" | "queued" | "saving" | "seasonal" | "parked";

const statusStyle: Record<Status, { label: string; cls: string }> = {
  next: { label: "Next up", cls: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400" },
  queued: { label: "Queued", cls: "bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-400" },
  saving: { label: "Saving for", cls: "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400" },
  seasonal: { label: "Before salt season", cls: "bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-400" },
  parked: { label: "Parked", cls: "bg-surface-2 text-ink-faint" },
};

type Part = { item: string; pick: string; cost: string };

const ROADMAP: {
  title: string;
  status: Status;
  cost: string;
  summary: string;
  details: string[];
  parts?: Part[];
  partsTotal?: string;
  partsNote?: string;
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
      "Considered and rejected (Aug 2026): buying a Helix 7 G4 to drop into the existing in-dash G2 cutout instead of mounting the Garmin. Every Helix 7 runs the same 800×480 resolution the 93sv has — but on a 7\" panel instead of the 9\" we already own, for $450–700 we don't need to spend. It's also not a guaranteed 1:1 swap: the G4 case is slightly bigger (10.5 × 5.8 × 3.7\") and Humminbird sells a separate in-dash kit just for the G4 (IDMK-H7R2, ~$50) because the original Helix 7 kit doesn't carry over. The plan stands: Garmin on the mount, Helix G2 sells.",
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
    cost: "~$4,100 electronics · ~$5,000 all-in DIY",
    summary:
      "Fully specced August 2026 with the complete parts list below: ECHOMAP Ultra 2 106sv (10.1\") + LiveScope 2 LVS44 + an independent aiming pole, dedicated lithium power, and every supporting part. Headline from the research: LiveScope 2 killed the black box — the LVS44 plugs straight into the display, so the old GLS10 ($600) is off the list entirely.",
    parts: [
      {
        item: "ECHOMAP Ultra 2 106sv",
        pick: "The 10.1\" 1280×800 display. In the box: bail mount with quick-release cradle, power cable, sun cover. Deal watch: the GT56UHD-TM variant ($2,500 list) has sold at $2,099 — that transducer is exactly what the dash Garmin needs, so the right sale makes it free.",
        cost: "$2,100",
      },
      {
        item: "LiveScope 2 LVS44",
        pick: "The complete system in one box: transducer, Ulterra barrel mount, adjustable perspective shaft mount, Kraken adapter, and an 18-ft cable that plugs directly into the display's network port. No black box, no extra cables to buy.",
        cost: "$2,000",
      },
      {
        item: "Independent aiming pole",
        pick: "Budget: RAILBLAZA HEXX Live Pole 60 (~$300 with base). Mid: BeatDown Fixed ($375). Premium: BeatDown Breakaway 2.0 ($550) — folds 90° so it stays on for the run. The Garmin shaft mount from the LVS44 box clamps to any ~1\" pole, so no model-specific bracket needed.",
        cost: "$300–550",
      },
      {
        item: "Bow battery",
        pick: "LiTime 12V 50Ah LiFePO4. The station draws ~4–5A total, so 50Ah is a 12-hour day with margin. Dakota Lithium 54Ah (~$350) if the 11-year warranty is worth the doubling.",
        cost: "$180",
      },
      {
        item: "Lithium wall charger",
        pick: "NOCO GENIUS10 (10A, LiFePO4 mode). Needed because the MK 315D has no lithium profile — the bow battery comes home and gets its own plug.",
        cost: "$100",
      },
      {
        item: "Display bow mount",
        pick: "$0 to start: the included bail screws to the deck (with a backer and Tef-Gel). Upgrade later: RAM 2.25\" D-ball with electronics plate for height and quick-release.",
        cost: "$0–100",
      },
      {
        item: "Wiring & protection",
        pick: "Small fuse block or fused bus, battery box with strap, marine ring terminals, adhesive heat shrink. Both Garmin cables come factory-fused, so this is tidiness, not electronics.",
        cost: "~$75",
      },
      {
        item: "Guard + small stuff",
        pick: "LVS44 transducer cover as soon as the aftermarket ships them ($40–80), Tef-Gel for every stainless screw into the aluminum deck, cable clips and loom, a 12V cutoff switch.",
        cost: "~$100",
      },
      {
        item: "Installation",
        pick: "A genuine DIY afternoon: clamp the barrel mount, route the 18-ft cable up the Ulterra with a service loop, two battery lugs, plug in. Shop alternative at $75–150/hr runs $250–500.",
        cost: "$0 DIY",
      },
    ],
    partsTotal: "≈ $5,000 as specced",
    partsNote:
      "Realistic range $4,700–5,500 depending on pole and battery picks; add $250–500 if a shop installs it. Core electronics alone: $4,100 at MSRP, and no factory LiveScope 2 bundles exist yet (the product is weeks old) — winter should bring them.",
    details: [
      "Why LVS44 over the $2,199 LVS42HD: the 42HD is a close-range (~125 ft) clarity specialist — right for bass-only boats. The LVS44's lower frequency band and 250-ft envelope serve ALL our water: 60–120-ft lakers and salmon, better saltwater behavior for stripers and the Sound, and still a generational clarity jump over the old LVS34 for bass. Bassmaster Elite pro Alton Jones Jr., after three days on the water with both, called the LVS44 the better all-around choice even for most bass anglers.",
      "Why the Ultra 2 106sv over the cheaper UHD2 93sv: forward-facing sonar rewards pixels — the 106sv's 1280×800 on 10.1\" versus the 93sv's 1024×600 on 9\" is the single most worthwhile ~$900 upsell in the build. Skip 7-inch units for FFS entirely. Why not our existing 93sv: first-gen UHD can't run LiveScope 2 — and the bow needs its own screen anyway.",
      "Why the pole made the list: the barrel mount aims wherever the Ulterra points — perfect for cruising and searching, but while Spot-Locked the motor's corrections swing the view constantly. The pole is the fix: Spot-Lock holds the boat, the pole holds the picture. Run both — barrel for moving, pole for sitting. This is the acknowledged endgame setup among heavy LiveScope users.",
      "Why a pole and not a motorized turret (Rite-Hite ~$650–800, DD26 Live Foot $799): the turrets list Ultrex, Fortrex, Ghost, and Force compatibility — none list the Ulterra, almost certainly because of its auto-stow geometry. The manual pole is the Ulterra-safe answer at half the price.",
      "Aftermarket timing caution: LVS44-specific pole brackets and covers are just reaching market (Summit has announced theirs). Older LVS32/34 brackets do NOT fit the new body — but the in-box Garmin shaft mount on a generic ~1\" pole sidesteps the whole problem.",
      "Ulterra integration, answered: the included barrel mount clamps the motor housing (never the auto-stow shaft) and the transducer stows/deploys with the motor; leave a ~10\" cable loop across the pivot and watch the first cycles.",
      "Value alternative if the fund wants relief: Garmin's factory bundle of the Ultra 2 106sv + LiveScope Plus (LVS34 + GLS10) sells at $2,400–2,600 — same 10-inch screen, one sonar generation older, roughly $1,500 less than the LVS44 build. The LVS44 is the pick for our deep-water range, but this is the honest budget door.",
      "On install day: update the display's software first (LVS44 support may need current firmware), then verify the unit on Garmin's LiveScope 2 compatibility list arrived as expected.",
      "Money-no-object reference: Ultra 2 122sv (or a GPSMAP glass helm) running BOTH transducers — LVS42HD for casting range plus LVS44 for open water (~$7,700–12k). The dual-ducer split is the current pro template.",
      "Cross-brand check: Garmin still leads live-sonar image quality in 2026; Lowrance ActiveTarget 2 is the value alternative; Humminbird MEGA Live 2's TargetLock integration requires an Ultrex — it doesn't support our Ulterra. Lean Garmin.",
      "Ice-fishing path exists: a zero-degree mount for the LVS42/LVS44 is sold separately and the LVS44 can be repurposed on an ice pod (the dedicated ice variant adds a cold-rated cable).",
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
      "NEW option found by research: the dash insert is a discrete OEM part — Alumacraft #22180014107, sold at Great Lakes Skipper/Amazon/eBay, and it ships with two new Faria gauges pre-installed. Check the price: if reasonable, a new panel beats a weekend of refinishing. Verify the part number matches ours first.",
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
                <div className="border-t border-line p-4">
                  {item.parts && (
                    <div className="mb-4 overflow-hidden rounded-lg border border-line">
                      <div className="bg-surface-2 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                        The full parts list
                      </div>
                      <ul className="divide-y divide-line">
                        {item.parts.map((p) => (
                          <li key={p.item} className="flex items-baseline justify-between gap-3 px-3 py-2">
                            <span className="min-w-0">
                              <span className="block text-sm font-medium">{p.item}</span>
                              <span className="block text-xs leading-relaxed text-ink-muted">
                                {p.pick}
                              </span>
                            </span>
                            <span className="shrink-0 text-sm font-semibold tabular-nums">
                              {p.cost}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {item.partsTotal && (
                        <div className="flex items-baseline justify-between gap-3 border-t border-line bg-surface-2 px-3 py-2">
                          <span className="text-sm font-semibold">Total</span>
                          <span className="text-sm font-semibold tabular-nums text-accent">
                            {item.partsTotal}
                          </span>
                        </div>
                      )}
                      {item.partsNote && (
                        <p className="border-t border-line px-3 py-2 text-xs leading-relaxed text-ink-faint">
                          {item.partsNote}
                        </p>
                      )}
                    </div>
                  )}
                  <ul className="space-y-2">
                    {item.details.map((d) => (
                      <li key={d.slice(0, 40)} className="text-sm leading-relaxed text-ink-muted">
                        · {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
