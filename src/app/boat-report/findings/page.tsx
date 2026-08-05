import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Search, Paintbrush, Wrench } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Inspection findings · 2018 Alumacraft Pro 185",
  description:
    "What we found inspecting the 2018 Alumacraft Pro 185 on the lot — verdicts, fixes, costs, and the console restoration plan.",
};

/* ---------------------------------- data ---------------------------------- */

const CONFIRMED: { label: string; detail: string }[] = [
  {
    label: "Engine: Evinrude E-TEC 115 H.O. — confirmed",
    detail:
      "Settles the listing's 115-vs-150 contradiction. The spec table was wrong; the hull's 115 hp max rating is matched correctly. Realistic top speed is low-to-mid 40s.",
  },
  {
    label: "Prop: 4-blade stainless, clean",
    detail:
      "Straight blades, no dings, intact skeg. The listing said 3-blade — the 4-blade is actually the better fishing prop (see reference below).",
  },
  {
    label: "Electronics: Humminbird Helix 7 CHIRP G2",
    detail:
      "The smaller, older end of the Helix line — roughly $150–250 used. Works, but it's a modest unit; the listing's vague \"Helix GPS/FF\" oversold it.",
  },
  {
    label: "Storage: outdoors, uncovered, for years",
    detail:
      "The pattern is unmistakable — cracked rigging boot, peeling console finish, hazed screen, seat seams letting go, and a brand-new mooring cover in the deal. Explains both the low hours and the cosmetic wear.",
  },
  {
    label: "Batteries: new — and trailer tires check out",
    detail:
      "Confirmed at the lot: fresh batteries (a $400–800 risk off the table) and trailer tires in good shape. The fuel line and primer bulb also checked out fine once wiped down. Real points in the boat's favor.",
  },
  {
    label: "No service records exist — and the dealer can't fill the gap",
    detail:
      "It's a consignment: one Vermont owner dropped it off, the dealer has no history, no impeller record, and no Evinrude service capability in-house. That makes the EMM diagnostic pull (independent E-TEC tech if needed) the only service history this boat will ever have — non-negotiable before money moves, and a legitimate reason the price should sit below supported-brand comps.",
  },
];

type Verdict = "cosmetic" | "minor" | "monitor" | "good";

const verdictStyle: Record<Verdict, { label: string; cls: string }> = {
  cosmetic: {
    label: "Cosmetic",
    cls: "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400",
  },
  minor: {
    label: "Minor fix",
    cls: "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400",
  },
  monitor: {
    label: "Watch it",
    cls: "bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-400",
  },
  good: {
    label: "Good news",
    cls: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400",
  },
};

const FINDINGS: {
  title: string;
  verdict: Verdict;
  photo: string;
  alt: string;
  what: string;
  fix: string;
}[] = [
  {
    title: "Console panel finish is peeling",
    verdict: "cosmetic",
    photo: "/boat/console.jpg",
    alt: "Dash panels with finish peeling in large patches around the gauges and switches",
    what: "The gray textured finish on both dash panels is delaminating in sheets from UV exposure — bare substrate showing around the speedo, Helix, and switch panel. Function is unaffected; every gauge and switch works.",
    fix: "Fully restorable as a DIY weekend job — see the restoration guide below for the step-by-step. Budget roughly $50–80 in materials, or $200–400 if a shop does it.",
  },
  {
    title: "Helix 7 screen is hazed and spotted",
    verdict: "cosmetic",
    photo: "/boat/helix.jpg",
    alt: "Humminbird Helix 7 screen with water spotting and haze",
    what: "Dried mineral spots and UV haze on the display — the unit powers on and functions normally. Either water spotting (cleanable) or the anti-glare coating delaminating (permanent but harmless).",
    fix: "Try 50/50 distilled water and white vinegar on a microfiber first, gentle passes only — no ammonia cleaners, no abrasives on a coated screen. If the coating itself is gone, live with it or replace the unit (~$200 used). Details in the restoration guide.",
  },
  {
    title: "Rigging boot cracked, clamp broken",
    verdict: "minor",
    photo: "/boat/rigging.jpg",
    alt: "Rigging tube entering the engine with cracked boot, and the fuel line with primer bulb",
    what: "The big ribbed tube is the rigging conduit — battery cables, harness, and control lines running into the engine. Its rubber entry boot has split and the clamp failed, letting rain at the wiring. The fuel line alongside it is proper 3/8\" SAE J30R9 and checked out fine — surface mildew wiped off, bulb pumps firm.",
    fix: "Boot and clamp: $20–60 part, easy swap — but first check the connectors under the cowl for corrosion (corroded connections are what kill the $3,000 EMM). On the dealer's before-delivery list.",
  },
  {
    title: "Seat seams splitting (vinyl itself is good)",
    verdict: "minor",
    photo: "/boat/seats.jpg",
    alt: "Cockpit seats — vinyl and carpet in healthy shape overall, with seam stitching letting go",
    what: "Stitching letting go at the seams while the vinyl stays supple — classic outdoor storage, since UV kills the thread years before the vinyl. The interior photo shows the good news: vinyl, foam, and carpet are fundamentally healthy. This is the cheap version of seat damage: re-stitching, not replacement.",
    fix: "Upholstery shop re-stitch runs roughly $50–150 per seat versus ~$1,000 for new seats. Dealer offered to \"talk to their upholstery guy\" — convert that to writing on the buyer's order: seats repaired before delivery, or a firm $300–400 credit.",
  },
  {
    title: "Batteries, charger, and fuel tank — the good compartment",
    verdict: "good",
    photo: "/boat/batteries.jpg",
    alt: "Battery compartment with two Interstate SRM-27 deep-cycle batteries, onboard charger, and the poly fuel tank",
    what: "Two Interstate SRM-27 marine deep-cycles (the Ulterra's 24V bank), clean posts, proper clamp terminals with boot covers — no wing nuts — plus an onboard charger and factory-tidy wiring. The 20-gal poly fuel tank above shows surface mildew (cosmetic) with proper marine fuel hose and an intact sender.",
    fix: "One open question: the tank is full, and on a boat that sat, nobody knows how old that gas is. Ask when it was last filled. If it's old ethanol fuel: treat it (StaBil), run it through quickly, or have it drained — cheap either way, but don't judge the engine's idle on stale gas at the water test.",
  },
  {
    title: "Ulterra's i-Pilot remote is missing",
    verdict: "minor",
    photo: "/boat/bow.jpg",
    alt: "Minn Kota Ulterra on the bow, which pairs with an i-Pilot remote that was not found",
    what: "The Ulterra has its foot pedal, but the i-Pilot remote — the thing you actually drive Spot-Lock and auto stow/deploy from — wasn't on the boat. Dealer says it \"might be inside.\" A replacement runs about $250–300.",
    fix: "Simple line on the buyer's order: remote included at delivery, or a $250 credit. Also worth asking them to confirm the Ulterra's deploy/stow cycle works while you're standing there — it's the most expensive accessory on the boat.",
  },
  {
    title: "Sealant squeeze-out at the engine mount",
    verdict: "monitor",
    photo: "/boat/mount.jpg",
    alt: "Engine mounting bracket with aged sealant around the transom bolts",
    what: "The cream-colored material around the mounting bolts is marine sealant, not a leak — bolts get bedded in it so water can't wick into the transom holes. It's aged, dirty, and cracking. On an aluminum transom there's no wood to rot, so stakes are low.",
    fix: "Ask whether the engine has ever been off the boat (fresh sealant can mean a remount). At the water test, look at the transom bolts from inside the bilge for weeping. If it stays dry, clean up the old squeeze-out and forget it.",
  },
  {
    title: "Pass-through plate with exposed foam",
    verdict: "monitor",
    photo: "/boat/passthru.jpg",
    alt: "Black plate with two oval openings in the carpeted side panel, yellow foam visible inside",
    what: "A rod/wiring pass-through into the side cavity — the yellow material inside is the hull's flotation foam, which is supposed to be there. Ragged foam in a boat stored outside is worth a second look, though.",
    fix: "One-time rodent check: sniff the lockers, look for droppings, shredded foam, or chewed wire insulation in compartment corners and under the console. Clean = forget it. Chewed wiring = real money; renegotiate.",
  },
  {
    title: "Edge-guard gaps and chipped welds",
    verdict: "cosmetic",
    photo: "/boat/edge.jpg",
    alt: "Bow gunwale with rub rail end, stitch welds, and paint chips",
    what: "Small gaps where the rub-rail trim meets the hull, plus paint chips and minor white oxidation along the stitch welds. The trim is a protective bumper above the waterline, not a seal — the gaps are normal aluminum-boat construction.",
    fix: "Nothing required. Touch-up paint on the chips stops the oxidation spots from growing; part of the cosmetic tally, not a repair.",
  },
  {
    title: "4-blade stainless prop",
    verdict: "good",
    photo: "/boat/prop.jpg",
    alt: "Four-blade stainless steel propeller, clean blades, intact skeg",
    what: "Clean, undinged 4-blade stainless (the listing said 3-blade — wrong again, but in your favor). Four blades trade 1–3 mph of top speed for better hole shot, grip in chop, low-speed planing, and trolling control — the right prop for how this boat will fish.",
    fix: "Nothing to fix. Just confirm at the water test that it lets the engine reach 5,500–6,000 RPM wide open — the prop is only right if the engine can rev out.",
  },
];

/* ------------- console restoration guide (deep-research results) ------------ */

const RESTORE_INTRO =
  "Verified: the dash is a thermoformed plastic insert panel (mounted on the fiberglass console) with a factory textured coating that lost adhesion from UV — a documented weak point on Alumacraft consoles of this era, so this is normal aging, not damage. Fully DIY-restorable: about $100 in materials and a weekend, with cure time doing most of the waiting. Before painting anything, check Great Lakes Skipper and eBay for the exact factory panel — many list under $150, and swapping beats refinishing.";

const RESTORE_STEPS: { step: string; detail: string }[] = [
  {
    step: "Confirm the substrate.",
    detail:
      "Look at the panel's back side: uniform-color plastic with vacuum-forming marks = ABS-type plastic; visible resin and glass strands = fiberglass. The process below works for both — but never use chemical paint stripper on the plastic; it attacks ABS.",
  },
  {
    step: "Pull the panel and strip what's failing.",
    detail:
      "Remove (or carefully mask) the gauges and switches. Lift the peeling coating with a plastic scraper or razor held at a low angle. Rule: anything that still won't scrape off after scuffing has earned its place — leave it and feather it.",
  },
  {
    step: "Sand.",
    detail:
      "180–220 grit to knock down and feather the edges of the remaining coating, then 320–400 over the whole panel so the new coating has tooth. Don't chase perfection — the texture coat hides feathered edges.",
  },
  {
    step: "Clean like it matters, because it does.",
    detail:
      "Scrub with dish soap and a gray Scotch-Brite pad, rinse, dry, then wipe with a plastic prep solvent (SEM Plastic & Leather Prep) in one direction until water no longer beads on the surface. No silicone dressings anywhere near the job.",
  },
  {
    step: "Adhesion promoter — the step the factory skipped, apparently.",
    detail:
      "SEM Plastic Adhesion Promoter (or Bulldog): one light coat, flash 5 minutes; one wet coat, flash 10–15; topcoat within 30 minutes. This is the difference between a finish that lasts and repeating the factory's failure.",
  },
  {
    step: "Texture coat to hide the scars.",
    detail:
      "SEM Texture Coating (#39853, ~$20/can) — spray distance and speed control the texture from fine to heavy. Optional, but it's what makes a repaired panel look factory instead of painted.",
  },
  {
    step: "Topcoat with the marine-rated stuff.",
    detail:
      "SEM Marine Vinyl Coat in satin or low-luster, 2–3 light coats — it's flexible and formulated with extra UV inhibitors specifically for boat dashes (regular SEM Color Coat is interior-rated; this boat lives outside). Satin hides flaws; gloss advertises them. Let it cure several days before reinstalling gauges.",
  },
];

const RESTORE_NOTES: string[] = [
  "Budget route: Krylon Fusion or Rust-Oleum Textured (~$30–50 total) over the same prep and adhesion promoter is serviceable, but owners report it going soft and chipping within a season or two outdoors. The SEM system (~$100) is the one actually rated for this environment.",
  "Alternatives, in order of sense: exact factory panel from Great Lakes Skipper/eBay ($75–250, fastest); marine-grade cast vinyl wrap ($30–60 — dashes hit 140°F+, so edges must be heat-set or they lift); custom SeaDek dash pad (~$100–300, hides everything, very durable); pro shop respray ($300–600 — overkill for one panel).",
  "Helix 7 screen: mild soapy water or distilled water with a splash of white vinegar on microfiber, gentle passes. Never regular Windex, ammonia, or alcohol — they dissolve the anti-glare coating, as do sunscreen and bug spray. Haze inside the unit is condensation and clears after an hour of running. If the anti-glare layer is already ruined, the accepted salvage is polishing it off entirely (Novus 2/PlastX by hand) and fitting a ~$12 anti-glare screen protector — better economics than Humminbird's $150–300 flat-rate repair on an aging G2 when a new Helix 7 G4 runs ~$550–680.",
  "Faded trim and gauge bezels: Solution Finish (~$17, lasts about a year) or CeraKote Trim Coat (~$20, bonds semi-permanently) actually work; oil and silicone dressings wash off in weeks. 303 Marine Protectant every 3–5 weeks as the maintenance layer — but not on gauge lenses or clear plastics.",
];

const RESTORE_SOURCES: { label: string; url: string }[] = [
  { label: "SEM — refinishing interior plastic, step by step", url: "https://semproducts.com/blog/4-easy-steps-to-refinishing-interior-plastic" },
  { label: "SEM Texture Coating (product + prep spec)", url: "https://semproducts.com/product/texture-coating" },
  { label: "SEM Marine Vinyl Coat (UV-rated marine topcoat)", url: "https://www.overtons.com/sem-marine-vinyl-coat-spray-307790.html" },
  { label: "Great Lakes Skipper — Alumacraft dash panels", url: "https://www.greatlakesskipper.com/boat-parts/boat-consoles-panels/gauge-and-dash-panels/l/manufacturer:alumacraft" },
  { label: "Humminbird — proper screen maintenance", url: "https://humminbird-help.johnsonoutdoors.com/hc/en-us/articles/4413206460695-Proper-Maintenance-for-Your-Humminbird-Unit" },
  { label: "Humminbird — display screen issues (condensation, coatings)", url: "https://humminbird-help.johnsonoutdoors.com/hc/en-us/articles/4412799208727-Display-Screen-Issues" },
  { label: "SeaDek — custom dash pads", url: "https://www.seadek.com/custom-seadek-dash-pad/" },
  { label: "303 Marine Protectant (maintenance UV layer)", url: "https://www.goldeagle.com/product/303-marine-recreation-aerospace-protectant/" },
];

/* ------------------------- owner's quick reference ------------------------- */

const REFERENCE: { title: string; body: string }[] = [
  {
    title: "Wide-open throttle target: 5,500–6,000 RPM",
    body: "The E-TEC 115 H.O. should reach its rated RPM range at full throttle, trimmed out. Below 5,500 = over-propped or a tired engine (lugging — genuinely harmful long-term). Over 6,000 = under-propped. This one number is the quickest health check the engine has.",
  },
  {
    title: "Primer bulb squeeze test",
    body: "Squeeze until firm — it should pump up and stay firm (check valves holding). Flex it and look for spider-web cracking; smell for raw gas seeping through the rubber. Soft, cracked, or smelly = replace the whole fuel line assembly (~$40). Surface mildew alone means nothing.",
  },
  {
    title: "E-TEC basics worth knowing",
    body: "No belts, no valves, no scheduled oil changes — it injects oil from a reservoir (use XD50/XD100). It self-winterizes with an automatic fogging routine. Water pump impeller every ~3 years on a boat that sits. The EMM computer logs true hours, RPM history, and faults — any Evinrude dealer can pull the report, and it's the motor's real service record.",
  },
  {
    title: "Keep the EMM alive",
    body: "The EMM (~$3,000, the known E-TEC failure) dies two ways: overheating from blocked cooling passages, and voltage spikes from loose battery connections. Real locking nuts on clean battery terminals — never wing nuts — and always confirm the tell-tale water stream when running.",
  },
  {
    title: "3-blade vs 4-blade, in one paragraph",
    body: "More blades = more grip, less slip: quicker hole shot, less bow rise, stays on plane slower, steadier in turns and chop, smoother trolling. Cost: 1–3 mph off the top and a touch of fuel at WOT. For fishing, the 4-blade wins; pitch must still let the engine hit rated RPM.",
  },
  {
    title: "After any saltwater day (Milford routine)",
    body: "Flush the engine on muffs 10–15 minutes. Wash hull, trailer, and rinse the Ulterra (it's the freshwater model — salt isn't covered by Minn Kota's warranty). Rinse livewell plumbing. Before the first salt season: swap the magnesium anodes for zinc or aluminum ones.",
  },
  {
    title: "Boat that sits = check these each spring",
    body: "Fuel: fresh gas, StaBil in the offseason, inspect the bulb and lines. Tell-tale stream at first start. Trailer tire date codes (age out at ~6 years regardless of tread). Battery voltage after winter. Ten minutes that prevents most on-water failures.",
  },
];

/* --------------------------------- helpers --------------------------------- */

function SectionHeading({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </h2>
  );
}

/* ----------------------------------- page ---------------------------------- */

export default function FindingsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-4 sm:px-6">
      <header className="mb-5 flex items-center gap-2">
        <Link
          href="/boat-report"
          aria-label="Back to boat report"
          className="rounded-full p-2 text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold tracking-tight">
            Inspection findings
          </h1>
          <p className="truncate text-xs text-ink-muted">
            Inspected in person at CR&apos;s Marine · August 2026
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* confirmed */}
      <section>
        <SectionHeading icon={CheckCircle2}>Settled at the lot</SectionHeading>
        <ul className="space-y-2">
          {CONFIRMED.map((c) => (
            <li key={c.label} className="rounded-xl border border-line bg-surface p-4">
              <p className="text-sm font-semibold">{c.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{c.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* findings */}
      <section className="mt-8">
        <SectionHeading icon={Search}>Findings, verdicts & fixes</SectionHeading>
        <ul className="space-y-3">
          {FINDINGS.map((f) => {
            const v = verdictStyle[f.verdict];
            return (
              <li key={f.title} className="overflow-hidden rounded-xl border border-line bg-surface">
                <Image
                  src={f.photo}
                  alt={f.alt}
                  width={1000}
                  height={750}
                  className="max-h-72 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold">{f.title}</p>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${v.cls}`}
                    >
                      {v.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.what}</p>
                  <p className="mt-2 text-sm leading-relaxed">
                    <span className="font-semibold">The fix: </span>
                    <span className="text-ink-muted">{f.fix}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* restoration */}
      <section className="mt-8">
        <SectionHeading icon={Paintbrush}>Console restoration guide</SectionHeading>
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-sm leading-relaxed text-ink-muted">{RESTORE_INTRO}</p>
          <ol className="mt-3 space-y-3">
            {RESTORE_STEPS.map((s, i) => (
              <li key={s.step} className="flex gap-3 text-sm leading-relaxed">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[11px] font-semibold text-ink-muted">
                  {i + 1}
                </span>
                <span>
                  <span className="font-semibold">{s.step} </span>
                  <span className="text-ink-muted">{s.detail}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-4 space-y-2 border-t border-line pt-3">
            {RESTORE_NOTES.map((n) => (
              <p key={n} className="text-sm leading-relaxed text-ink-muted">
                {n}
              </p>
            ))}
          </div>
          <div className="mt-4 border-t border-line pt-3">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
              Sources
            </p>
            <ul className="space-y-1">
              {RESTORE_SOURCES.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-accent hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* reference */}
      <section className="mt-8 mb-4">
        <SectionHeading icon={Wrench}>Owner&apos;s quick reference</SectionHeading>
        <ul className="space-y-2">
          {REFERENCE.map((r) => (
            <li key={r.title} className="rounded-xl border border-line bg-surface p-4">
              <p className="text-sm font-semibold">{r.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{r.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
