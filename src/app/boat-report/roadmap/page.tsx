import Link from "next/link";
import { ArrowLeft, ChevronDown, Map } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Upgrade roadmap · 2018 Alumacraft Pro 185",
  description:
    "The boat's upgrade plan in order: a cover that fits, dash mount for the Garmin, rigging boot, the fully-specced LiveScope bow station with parts list, and the parked wishlist.",
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
    title: "A cover that fits — jumped the queue",
    status: "next",
    cost: "$0 diagnosis · ~$300–400 likely fix",
    summary:
      "The \"new mooring cover\" from the deal doesn't fit. Research verdict (Aug 2026): one season uncovered is survivable WITH the interim protocol below — but rain, not sun, is this hull's enemy (Alumacraft's under-floor foam and wood transom core are documented water traps), so the replacement happens this season. Diagnose the current cover before spending a dime.",
    parts: [
      {
        item: "Step 1: diagnose the cover we have",
        pick: "Find the sewn-in tag (a 5-digit Dowco number IDs the exact hull it was cut for). If it's snap-style and our gunwales have no snap studs, it's a wrong-boat cover, case closed. Measure the boat: straight centerline bow-to-transom (tape level, NOT over the windshield) and beam at widest — should be ~18'5\" × 90\".",
        cost: "$0",
      },
      {
        item: "Step 2: try a support pole first",
        pick: "Attwood cover support kit (10795-4 system, or a single telescoping pole). Without a pole ANY mooring cover pools rain, sags, and reads as \"doesn't fit.\" Proper support extends cover life ~50%. If the cover's tag says it's the right pattern, this probably IS the fix.",
        cost: "$35–60",
      },
      {
        item: "The replacement, if it's truly wrong",
        pick: "Best match in production: Shoretex model-exact \"Alumacraft Pro 185 SC '15–'22\" at go2marine (~$300–500, trolling-motor option, rated mooring AND trailering). Runner-up: Carver 72N18 semi-custom (17'9\"–18'8\" × 90\", windshield + bow-motor pattern) in Sun-DURA (~$300–400, 7-yr warranty). OEM Dowco surplus at Great Lakes Skipper ($350–600) is first-come stock since Alumacraft's 2025 shutdown.",
        cost: "$300–500",
      },
      {
        item: "The stopgap tier, rated honestly",
        pick: "Amazon generic 17–19' × 96\" (iCOVER/SavvyCraft class): expect 1–2 seasons before grommets tear and UV rot sets in — acceptable bridge, bad destination. NEVER a plastic hardware-store tarp laid on the boat: it traps moisture into a mildew greenhouse against the new upholstery and chafes everything it touches. Forums call it worse than nothing.",
        cost: "$90–160",
      },
    ],
    partsTotal: "Likely landing: ~$350–450",
    partsNote:
      "Pole first — it may save the cover we own. Whatever cover wins, add the support pole; pooled water is the #1 cover killer.",
    details: [
      "The uncovered-season verdict, from forums and pros: cumulative, not catastrophic. Vinyl gets 2–3 years of life fully exposed in hard sun; upstate NY's shorter, milder season stretches that — but the dealer JUST fixed our seats, and buyers read seat condition as the storage-history proxy (we did exactly that when we bought). Every uncovered month restarts the clock our purchase already paid for once.",
      "Why rain outranks sun here: an open bass boat catches every rainfall, and this era of Alumacraft has documented under-floor foam that soaks up standing water with no drain path, plus a wood transom core. Water management is the non-negotiable even on covered weeks.",
      "INTERIM PROTOCOL while uncovered: (1) drain plug OUT and bow cranked high on the tongue jack — rain exits the stern drain instead of soaking the foam; (2) 303 protectant on all vinyl every 4–6 weeks; (3) $40 slip-on seat covers — the highest-value single mitigation; (4) Helix sun cover on, loose electronics and the remote inside; (5) sweep leaves and wipe bird droppings same-day (droppings etch vinyl in days, steeped leaf tannins stain permanently). Do these and a partial season costs nearly nothing.",
      "Mooring vs trailering, learned: mooring covers reach just below the rub rail and cinch or snap — fine parked, NOT highway-rated. Trailering covers cut lower with under-hull straps. The Shoretex is rated for both; a strap kit does not make a mooring cover trailerable.",
      "Cover care so the next one lasts: never store it wet (coated poly shrinks — possibly what happened to this one), and a shrunk cover can sometimes be recovered by soaking it and installing half-dry, centers first.",
    ],
  },
  {
    title: "Rise ball mount — level the tow rig",
    status: "next",
    cost: "$30–60 fixed · $200+ adjustable",
    summary:
      "The Tesla's hitch ball sits lower than the coupler even at the trailer jack's lowest crank. The fix is a RISE ball mount for the 2\" receiver (many drop mounts flip over to become one). Boats must tow level or slightly nose-up — nose-down invites stern sway.",
    details: [
      "Sizing, done in the driveway: level the trailer with the tongue jack (level on the gunwale), measure ground to the bottom of the coupler (A) and ground to the top inside of the receiver opening (B). A − B = the rise to buy. Curt/Reese/Draw-Tite fixed mounts come in ¾\", 2\", and 4\" rise steps.",
      "Ball size must match the coupler — stamped on the coupler top (expect 2\"). The ball usually ships loose: torque the nut to spec with a witness mark.",
      "Adjustable alternative (B&W Tow & Stow, Andersen, ~$200–320): 1\" height steps both directions — only worth it if the car will ever pull a second trailer.",
      "Tow math, confirmed: the tow car is a Model Y Performance — factory rating 3,500 lbs towing / 350 lbs tongue. The rig runs ~2,400–2,700 lbs wet (1,100 hull + ~390 engine + trailer + gear/fuel) with ~250 on the tongue: about 75% of rating. Comfortably legit.",
      "Towing range hit on the Tesla: plan for 30–50% — trivial for Saratoga, plan charging for Lake George or Milford runs.",
    ],
  },
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
    cost: "~$2,500 bundle · ~$3,400 all-in DIY",
    summary:
      "DECIDED August 2026: the factory bundle — ECHOMAP Ultra 2 106sv (10.1\") + GLS10 black box + LVS34 transducer, one box, Garmin SKU 010-02880-10, street $2,420–2,600. The proven LiveScope Plus setup most of the fleet fishes with, about $1,500 less than the new LVS44 build. Full parts list below, pole and power included.",
    parts: [
      {
        item: "Ultra 2 106sv LiveScope Plus bundle",
        pick: "One box, whole station: the 10.1\" 1280×800 display (bail mount, sun cover, power cable), the GLS10 sonar box, and the LVS34 transducer with ALL THREE mounts — Ulterra barrel mount, perspective mount, and shaft mount — plus power cables and the 2-m network cable that links GLS10 to display. Seen at $2,419 at My Green Outdoors (list $2,999); typically $2,599 elsewhere. One retailer runs a Black Friday window Nov 4–Dec 16 — that's the price to stalk.",
        cost: "$2,420–2,600",
      },
      {
        item: "Independent aiming pole",
        pick: "Budget: RAILBLAZA HEXX Live Pole 60 (~$300 with base). Mid: BeatDown Fixed ($375). Premium: BeatDown Breakaway 2.0 ($550) — folds 90° so it stays on for the run. Bonus of the LVS34: its aftermarket is fully mature, so model-specific pole brackets (Summit, RyTek, FishObsessed) are everywhere.",
        cost: "$300–550",
      },
      {
        item: "Bow battery",
        pick: "LiTime 12V 50Ah LiFePO4. Display + GLS10 + LVS34 pull ~5–6A together, so 50Ah is a solid 8–10 hour day. Budget door: Costco's Interstate 27DC flooded (~$90, 88Ah) fits the bill and the NOCO charges it too — the trade is 55 lbs at the bow instead of 13 and a 4–5 season lifespan instead of 10+. Upgrade door: Dakota Lithium 54Ah (~$350) for the 11-year warranty.",
        cost: "$90–180",
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
        pick: "Sonar Shield cover for the LVS34 (~$40), Tef-Gel for every stainless screw into the aluminum deck, cable clips and loom, a 12V cutoff switch.",
        cost: "~$100",
      },
      {
        item: "Installation",
        pick: "A DIY weekend half: mount the GLS10 box near the bow battery, clamp the barrel mount, route the transducer cable up the Ulterra with a service loop, network cable to the display, two battery lugs. Shop alternative at $75–150/hr runs $250–500.",
        cost: "$0 DIY",
      },
    ],
    partsTotal: "≈ $3,400 as specced",
    partsNote:
      "Realistic range $3,200–3,700 depending on pole and battery picks; add $250–500 if a shop installs it. The bundle alone is the whole electronics bill — the GLS10's network and power cables ship in the box.",
    details: [
      "Why LVS34 over the new LiveScope 2 LVS44: price and proof. The LVS44 build runs ~$4,100 in electronics alone — the bundle delivers the same 10.1\" screen and the sonar that won every FFS tournament of the last four years for ~$2,500. The honest tradeoff: LVS34 is rated to ~200 ft vs the LVS44's 250, with one generation less clarity — plenty for our 60–120-ft lakers. If deep-water range ever disappoints, the LVS34 resells and the GLS10-free LVS44 plugs into the same display.",
      "Why the Ultra 2 106sv over the UHD2 93sv (the 9-inch): forward-facing sonar rewards pixels, not inches — 1280×800 vs 1024×600 is 67% more pixels, which at 60–120-ft laker range is the difference between 'something's there' and 'that's a fish.' Better still, the market killed the tradeoff: 9-inch LiveScope Plus bundles were listing at $2,900–3,000 (Aug 2026) while the 10-inch bundle sat at $2,419 — the bigger screen has been the CHEAPER box. Shop both by price, but never downsize expecting savings. Skip 7-inch units for FFS entirely. And skip the 12-inch upsell: the Ultra 2 122sv shares the 106sv's exact 1280×800 — its bundle costs ~$2,200 more for stretched pixels, sized for tournament rigs where the angler stands a deck away. Why not our existing 93sv: it could technically run LiveScope Plus through the GLS10, but it's spoken for at the dash, and the bow deserves the bigger canvas.",
      "Why a fourth battery when the stern has three: the trolling pack is 24V (wrong voltage — and tapping half of it unbalances the series pair, which kills it early) plus its motor noise puts interference lines on the LiveScope picture; the starting battery is 16 ft away (heavy wire to avoid voltage drop, display reboots when the E-TEC cranks) and a scoping day's 40–60Ah would gamble the get-home crank. A $180 lithium three feet from the gear keeps the boat's never-strand-yourself rule intact and the picture clean.",
      "Why the pole made the list: the barrel mount aims wherever the Ulterra points — perfect for cruising and searching, but while Spot-Locked the motor's corrections swing the view constantly. The pole is the fix: Spot-Lock holds the boat, the pole holds the picture. Run both — barrel for moving, pole for sitting. This is the acknowledged endgame setup among heavy LiveScope users.",
      "Why a pole and not a motorized turret (Rite-Hite ~$650–800, DD26 Live Foot $799): the turrets list Ultrex, Fortrex, Ghost, and Force compatibility — none list the Ulterra, almost certainly because of its auto-stow geometry. The manual pole is the Ulterra-safe answer at half the price.",
      "Aftermarket bonus of the older system: every pole bracket, cover, and mount on the market fits the LVS34 — no waiting for the LVS44 accessory ecosystem to catch up.",
      "Ulterra integration, answered: the included barrel mount clamps the motor housing (never the auto-stow shaft) and the transducer stows/deploys with the motor; leave a ~10\" cable loop across the pivot and watch the first cycles.",
      "The premium alternative, documented for the record: LiveScope 2 LVS44 à la carte ($1,999 + $2,099 display ≈ $4,100) — 250-ft range, better clarity, no black box. Rejected as overkill for the price; the door stays open since the Ultra 2 display runs LiveScope 2 with just a software update.",
      "On install day: update the display's software first, mount the GLS10 somewhere dry and ventilated near the bow battery, and label both ends of every cable while the runs are open.",
      "Money-no-object reference: Ultra 2 122sv (or a GPSMAP glass helm) running BOTH transducers — LVS42HD for casting range plus LVS44 for open water (~$7,700–12k). The dual-ducer split is the current pro template.",
      "Cross-brand check: Garmin still leads live-sonar image quality in 2026; Lowrance ActiveTarget 2 is the value alternative; Humminbird MEGA Live 2's TargetLock integration requires an Ultrex — it doesn't support our Ulterra. Lean Garmin.",
      "Ice-fishing path exists: the LVS34 is the transducer Garmin's own ice bundles are built around — a zero-degree pole mount (~$30) and an ice pod repurpose the whole system for winter.",
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
        The boat fishes great as-is — everything here is improvement or protection, not repair.
        Ordered by urgency and what unlocks what: the cover protects everything else, the dash
        mount seats the Garmin, the bow waits clean for LiveScope, and the parked items wait for
        their budgets without blocking anything.
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
