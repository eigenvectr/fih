import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeDollarSign,
  CheckCircle2,
  ClipboardList,
  Fish,
  Gauge,
  HelpCircle,
  Package,
  Scale,
  ShieldAlert,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Boat report · 2018 Alumacraft Pro 185",
  description:
    "Pre-purchase buyers report: 2018 Alumacraft Pro 185 with Evinrude E-TEC, $18,995 at CR's Marine, Schenectady NY.",
};

/* ---------------------------------- data ---------------------------------- */

const PHOTOS = [
  { src: "/boat/profile.jpg", alt: "Port side profile on the Load Rite trailer" },
  { src: "/boat/stern.jpg", alt: "Stern quarter with Evinrude outboard and cockpit" },
  { src: "/boat/bow.jpg", alt: "Bow casting deck with Minn Kota Ulterra" },
  { src: "/boat/engine.jpg", alt: "Evinrude E-TEC H.O. outboard close-up" },
];

const SPECS: [string, string][] = [
  ["Length", "18'5\""],
  ["Beam", "7'6\""],
  ["Hull", "Riveted mod-V, 2XB double bottom"],
  ["Dry weight", "1,100 lb"],
  ["Max rated power", "115 hp"],
  ["Fuel", "20 gal"],
  ["Capacity", "5 people / 1,450 lb"],
  ["Livewells", "Two 20-gal aerated"],
  ["Engine hours", "72.5"],
  ["HIN", "ACBW8951F718"],
];

const INCLUDED: { item: string; note: string }[] = [
  {
    item: "Minn Kota Ulterra 24V bow mount",
    note: "Auto stow/deploy with Spot-Lock — about $3,000–3,500 to buy new, $1,500–2,000 used. The single best fishing feature on this rig. Freshwater model, not the saltwater Riptide — and the i-Pilot remote is missing (get it found or a $250 credit).",
  },
  {
    item: "Humminbird Helix 7 CHIRP G2 at the dash",
    note: "Confirmed at inspection — the smaller, older end of the Helix line, roughly $150–250 used. Works fine; screen is sun-hazed (see findings).",
  },
  {
    item: "New batteries + onboard charger",
    note: "Two Interstate SRM-27 deep-cycles on proper terminals with a built-in charger — confirmed at inspection. A $400–800 risk taken off the table.",
  },
  {
    item: "Load Rite aluminum trailer",
    note: "Side guides, spare tire, and transom tie-down straps; tires check out. Aluminum frame is genuinely good news for the Connecticut plan — it shrugs off salt ramps far better than painted steel.",
  },
  {
    item: "Brand-new mooring cover",
    note: "A few hundred dollars of value — and a quiet tell: it's new because the boat lived outside without one.",
  },
  {
    item: "4-blade stainless prop (listing said 3-blade)",
    note: "Confirmed at inspection: clean 4-blade stainless, looks barely used — the better fishing prop. Still confirm it lets the engine reach full rated RPM at the water test.",
  },
];

type Grade = "great" | "good" | "stretch";

const gradeStyle: Record<Grade, { label: string; cls: string }> = {
  great: {
    label: "Great fit",
    cls: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400",
  },
  good: {
    label: "Works, with caveats",
    cls: "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400",
  },
  stretch: {
    label: "The stretch",
    cls: "bg-red-500/10 text-red-700 dark:bg-red-400/10 dark:text-red-400",
  },
};

const FIT: { title: string; grade: Grade; body: string }[] = [
  {
    title: "Bass — NY lakes and rivers",
    grade: "great",
    body: "This is exactly what the Pro 185 was built for. Two casting decks, two 20-gallon livewells, rod storage, shallow draft, and the Ulterra's Spot-Lock holds you on a spot in wind without anchoring. A huge step up from the Mirrocraft for bass fishing.",
  },
  {
    title: "Lake trout & salmon — deep NY lakes",
    grade: "good",
    body: "Doable, not ideal. The E-TEC trolls well — direct-injection 2-strokes hold 1.5–2.5 mph without fouling plugs, and owners troll E-TECs all day. But there's no kicker for backup, the bass-boat gunnels need track bases added before downriggers can mount, and a mod-V hull pounds when a big lake builds an afternoon chop. The 20-gallon tank limits long runs. Fishable — on picked weather windows.",
  },
  {
    title: "Hudson River — stripers & more",
    grade: "good",
    body: "Good fit most days. Fast enough to chase birds, shallow enough for the flats, and normal river chop is fine for this hull. Watch spring debris, and respect wind-against-tide days.",
  },
  {
    title: "Porgy & inshore — Milford, CT",
    grade: "stretch",
    body: "Calm-morning-only. The Milford reefs and Charles Island are close to shore, so settled-weather trips are realistic. But experienced Sound boaters figure an 18-footer gets maybe a third of days comfortably, and this hull has low freeboard and an open bow. Salt also demands discipline: flush the engine 10–15 minutes after every trip, wash boat and trailer, swap the freshwater (magnesium) anodes for zinc or aluminum ones, and rinse the Ulterra — Minn Kota won't warranty a freshwater unit used in salt.",
  },
];

const RED_FLAGS: { title: string; severity: "high" | "medium"; body: string }[] = [
  {
    title: "The listing contradicts itself on the engine — 115 or 150 hp? (RESOLVED: it's the 115)",
    severity: "high",
    body: "The dealer's description said \"115 Evinrude\" while the spec table on the same listing claimed a 150 hp E150. Confirmed in person August 2026: it's the E-TEC 115 H.O., correctly matched to the hull's 115 hp max rating. The spec table was simply wrong — which means the listing advertised 35 more horsepower than the boat has. That's the strongest single price lever in the negotiation.",
  },
  {
    title: "Evinrude no longer exists",
    severity: "high",
    body: "BRP shut down Evinrude outboard production in May 2020. Parts are still available under BRP's roughly ten-year support commitment (into about 2030), but inventory has been thinning since 2022 and fewer techs will touch E-TECs each year. The known expensive failure is the EMM — the engine's computer — at roughly $3,000, often killed by overheating or by voltage spikes from loose battery connections. Two mitigating points: E-TECs are otherwise mechanically simple and well regarded, and CR's Marine itself still stocks and services Evinrude. But ask who else within an hour of home works on them, and price the orphaned badge in — it will follow the boat to resale day.",
  },
  {
    title: "72.5 hours in eight seasons — this boat sat",
    severity: "medium",
    body: "That's about 9 hours a year. Low hours sound great, but boats age from sitting too: fuel varnish, dry-rotted water pump impeller, stiff steering, flat-spotted trailer tires. E-TECs tolerate storage better than most (they self-winterize), but ask how it was stored and have the impeller and fuel system checked.",
  },
  {
    title: "Vermont registration on a New York dealer's lot",
    severity: "medium",
    body: "The hull wears VT numbers (VT 9351U) — likely a Lake Champlain freshwater boat, which is good. But it's a resale, so verify the paper trail: title matches the HIN (ACBW8951F718), no liens, and ask point-blank whether it has ever seen salt water.",
  },
  {
    title: "Nobody mentioned the batteries (RESOLVED: they're new)",
    severity: "medium",
    body: "Confirmed at inspection: the batteries are new — a $400–800 risk off the table. Still open on the same theme: no service record for the water pump impeller, which is the rubber part that dies from sitting and keeps the engine (and its $3,000 EMM) cool. Ask for the record or have replacement (~$200–250) written into the deal. For all-day trolling at trout speeds, a 24V lithium upgrade is still the eventual answer.",
  },
];

const SPEED_TABLE: { config: string; speed: string; source: string }[] = [
  {
    config: "The 57 mph that caught our eye",
    speed: "57 mph",
    source: "No published test of this hull supports it",
  },
  {
    config: "Alumacraft + E-TEC 115 H.O. (BoatTEST)",
    speed: "41 mph",
    source: "Measured, with the engine this boat most likely has",
  },
  {
    config: "Alumacraft 185 hull + E-TEC 150 (BoatTEST)",
    speed: "45.3 mph",
    source: "Measured on the sister Edge 185 hull",
  },
  {
    config: "Smaller Pro 175 + E-TEC 150 (owner GPS)",
    speed: "56 mph",
    source: "Owner report — lighter hull, ideal prop, light load",
  },
];

const COMPARABLES: {
  name: string;
  hull: string;
  price: string;
  speed: string;
  pros: string[];
  cons: string[];
  verdict: string;
  best?: boolean;
}[] = [
  {
    name: "Lund Impact 1775",
    hull: "Deep-V · riveted",
    price: "$18k–25k used",
    speed: "~44 mph w/115",
    pros: [
      "True deep-V ride for big-lake trolling",
      "Deep 27\" cockpit — kid-friendly",
      "Trolling-oriented layout, kicker-ready",
      "Lund build quality and resale",
    ],
    cons: [
      "Riveted, so same saltwater care as the Alumacraft",
      "Not a bass layout — smaller casting decks",
      "Similar money buys fewer extras (no Ulterra package)",
    ],
    verdict:
      "The best single alternative for how you actually fish — trades casting decks and a few mph for the hull your trolling days want.",
    best: true,
  },
  {
    name: "Tracker Targa V-18",
    hull: "Deep-V · welded",
    price: "~$24–25k (2017–18)",
    speed: "45.5 mph w/150",
    pros: [
      "Real deep-V (20° at the transom), 8'6\" beam",
      "Welded hull — meaningfully better for salt",
      "40-gal fuel, walk-through windshield keeps the family dry",
    ],
    cons: [
      "Above this budget by ~$5k",
      "Tracker fit/finish and resale below Lund or Crestliner",
      "Heavier — needs more tow vehicle",
    ],
    verdict:
      "Best on-paper fit for all four missions — if the budget stretches and you find a clean one.",
  },
  {
    name: "Crestliner 1750 Fish Hawk",
    hull: "Deep-V · welded",
    price: "high teens–mid $20s",
    speed: "42–44 mph w/115",
    pros: [
      "Welded deep-V — no rivet worries in salt",
      "Dry, capable ride; kicker-friendly transom",
    ],
    cons: ["Tighter cockpit — fine for 4, snug for 5", "Used examples are scarce"],
    verdict: "A strong pick if one shows up nearby — the welded hull suits the Connecticut plan.",
  },
  {
    name: "Ranger RT188",
    hull: "Mod-V bass · welded",
    price: "mid $20s (2018)",
    speed: "44–50 mph w/115",
    pros: ["Best-built, best-riding aluminum bass boat", "Holds value unusually well"],
    cons: [
      "Still a bass hull — doesn't fix the big-water problem",
      "Costs more for the same compromises",
    ],
    verdict: "Only worth it if bass fishing dominates — it's the same category as the Pro 185, done fancier.",
  },
  {
    name: "Tracker Pro Team 190 TX",
    hull: "Mod-V bass · riveted",
    price: "$15–20k (2017–18)",
    speed: "~43 mph w/90",
    pros: ["Cheapest way into a bass rig", "Common — easy to find and easy to sell"],
    cons: ["Lighter-gauge feel, narrow beam", "Same big-water limits, less boat overall"],
    verdict: "Saves money but gives up quality — the Pro 185 with its Ulterra package beats it.",
  },
  {
    name: "Starcraft Renegade 178",
    hull: "Semi-V · riveted",
    price: "high $20s+ (2018)",
    speed: "45+ mph w/150",
    pros: ["Semi-V splits the difference in chop", "Roomy 92\" beam, 7-person rating"],
    cons: ["Clean late ones priced above this deal", "Neither the best bass boat nor the best troller"],
    verdict: "A sensible compromise hull, but the used market wants more money for it.",
  },
];

const PROS = [
  "Purpose-built fishing platform — decks, livewells, rod storage the Mirrocraft never had",
  "Loaded package: Ulterra with Spot-Lock, Helix sonar, aluminum trailer, new cover (~$5k+ of extras)",
  "Only 72.5 hours on a well-regarded, fuel-sipping motor",
  "E-TEC trolls beautifully for the trout and salmon plan — no plug fouling at 1.5–2.5 mph",
  "Aluminum trailer is the right trailer for occasional salt ramps",
  "Priced below equivalent Yamaha/Mercury rigs because of the Evinrude badge",
];

const CONS = [
  "It will not do 57 mph — expect low-to-mid 40s. Still ~2x the Mirrocraft, but go in with real numbers",
  "Orphaned engine brand: parts into ~2030, shrinking service network, ~$3k EMM as the known failure, harder future resale",
  "Mod-V bass hull pounds in big-lake chop, rides wet in wind, and limits Long Island Sound days to calm windows",
  "Riveted hull + freshwater trolling motor + magnesium anodes = a real salt-care routine to adopt",
  "20-gallon fuel tank is small for long trolling runs",
  "No kicker motor; downriggers need track bases added",
];

const QUESTIONS = [
  "Which engine is it exactly — read me the model number off the transom plate? (Your listing says both 115 and 150.)",
  "Can you run an EMM diagnostic report while we watch? (The E-TEC's computer logs true hours, RPM history, and fault codes — it's the motor's lie detector.)",
  "How was it stored — inside, covered, batteries on a maintainer?",
  "Has it ever been in salt or brackish water?",
  "When were the water pump impeller and gearcase oil last serviced?",
  "Which Helix model is on the dash, and what transducer — down/side imaging?",
  "What batteries are aboard, how old, and is there an onboard charger?",
  "Title in hand, no liens, HIN matches the paperwork?",
  "Any warranty at all, and will you hold it with a refundable deposit pending a water test?",
];

const SOURCES: { label: string; url: string }[] = [
  { label: "Alumacraft Pro 185 factory specs (115 hp max)", url: "https://alumacraft.com/Alumacraft-Boat.php?id=745" },
  { label: "Alumacraft construction — riveted 2XB hull", url: "https://alumacraft.com/About-Alumacraft.php?content=construction" },
  { label: "Wired2Fish — BRP discontinues Evinrude (May 2020)", url: "https://www.wired2fish.com/news/brp-discontinues-evinrude-mercury-to-support-boat-packages" },
  { label: "continuousWave — E-TEC EMM engine history report", url: "https://continuouswave.com/whaler/reference/ETEC_EngineHistoryReport.html" },
  { label: "E-TEC owners group — EMM failures & causes", url: "https://www.etecownersgroup.com/post/emm-problems-why-8081216" },
  { label: "BoatGuide — 2019 Pro 185 MSRP $21,563", url: "https://www.boatguide.com/specs/alumacraft/bass/2019/pro/185.html" },
  { label: "BoatTEST — Alumacraft Edge 185 w/ E-TEC 150 (45.3 mph)", url: "https://boattest.com/review/alumacraft/3556_edge-185-sport" },
  { label: "BoatTEST — Evinrude E-TEC G2 115 H.O. (41 mph on Alumacraft)", url: "https://boattest.com/engine/evinrude/e-tec-g2-115-ho" },
  { label: "BoatTEST — Tracker Targa V-18 WT", url: "https://boattest.com/review/tracker/3108_targa-v-18-wt" },
  { label: "boats.com — Lund 1775 Impact review", url: "https://www.boats.com/reviews/lund-1775-impact-sport-deep-v-value-family-fun/" },
  { label: "boats.com — Crestliner 1750 Fish Hawk test notes", url: "https://www.boats.com/reviews/crestliner-1750-fish-hawk-boat-test-notes/" },
  { label: "Boating Mag — protecting aluminum boats from saltwater", url: "https://boatingmag.com/protecting-aluminum-boats-from-salt-water-corrosion/" },
  { label: "E-TEC owners group — trolling with big E-TECs", url: "https://www.etecownersgroup.com/post/trolling-with-150-hp-etec-4773064" },
  { label: "In-Depth Outdoors — 18-ft mod-V boats in rough water", url: "https://www.in-depthoutdoors.com/community/forums/topic/18-foot-mod-v-boats-in-rough-water/" },
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

function GradeChip({ grade }: { grade: Grade }) {
  const g = gradeStyle[grade];
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${g.cls}`}>
      {g.label}
    </span>
  );
}

/* ----------------------------------- page ---------------------------------- */

export default function BoatReportPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-4 sm:px-6">
      <header className="mb-5 flex items-center gap-2">
        <Link
          href="/"
          aria-label="Back to waters"
          className="rounded-full p-2 text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold tracking-tight">Boat buyers report</h1>
          <p className="truncate text-xs text-ink-muted">
            2018 Alumacraft Pro 185 · $18,995 · CR&apos;s Marine, Schenectady NY
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* quick nav */}
      <nav className="mb-4 grid grid-cols-3 gap-2">
        {[
          { href: "/boat-report/findings", label: "Findings" },
          { href: "/boat-report/deal", label: "Deal day" },
          { href: "/boat-report/inspect", label: "Checklist" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-xl border border-line bg-surface py-2.5 text-center text-sm font-semibold transition-colors hover:border-accent/40 hover:text-accent"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* photos */}
      <div className="grid grid-cols-2 gap-2">
        {PHOTOS.map((p) => (
          <Image
            key={p.src}
            src={p.src}
            alt={p.alt}
            width={600}
            height={425}
            className="rounded-xl border border-line object-cover"
          />
        ))}
      </div>

      {/* the deal */}
      <section className="mt-8">
        <SectionHeading icon={Gauge}>The boat at a glance</SectionHeading>
        <div className="rounded-xl border border-line bg-surface p-4">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3">
            {SPECS.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] uppercase tracking-wide text-ink-faint">{k}</dt>
                <dd className="text-sm font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* included */}
      <section className="mt-8">
        <SectionHeading icon={Package}>What comes with it</SectionHeading>
        <ul className="space-y-2">
          {INCLUDED.map((x) => (
            <li key={x.item} className="rounded-xl border border-line bg-surface p-4">
              <p className="text-sm font-semibold">{x.item}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{x.note}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* speed */}
      <section className="mt-8">
        <SectionHeading icon={Gauge}>About that 57 mph</SectionHeading>
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-sm leading-relaxed">
            The speed that caught our eye doesn&apos;t survive contact with the test data.
            Nobody has published a test of this hull anywhere near 57:
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-105 text-sm">
              <thead>
                <tr className="border-b border-line text-left text-[11px] uppercase tracking-wide text-ink-faint">
                  <th className="pb-2 pr-3 font-semibold">Setup</th>
                  <th className="pb-2 pr-3 font-semibold">Top speed</th>
                  <th className="pb-2 font-semibold">Where that number comes from</th>
                </tr>
              </thead>
              <tbody>
                {SPEED_TABLE.map((r) => (
                  <tr key={r.config} className="border-b border-line/60 last:border-0">
                    <td className="py-2 pr-3">{r.config}</td>
                    <td className="py-2 pr-3 font-semibold whitespace-nowrap">{r.speed}</td>
                    <td className="py-2 text-ink-muted">{r.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Confirmed at inspection: it&apos;s the 115 H.O.</strong>{" "}
            Realistic expectation: <strong className="text-ink">41–45 mph</strong> lightly loaded.
            That&apos;s still a fast, fun boat — roughly double the old Mirrocraft — and about as
            fast as an open 18-foot aluminum boat should go with family aboard.
          </p>
        </div>
      </section>

      {/* fit */}
      <section className="mt-8">
        <SectionHeading icon={Fish}>How it fits our fishing</SectionHeading>
        <ul className="space-y-2">
          {FIT.map((f) => (
            <li key={f.title} className="rounded-xl border border-line bg-surface p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{f.title}</p>
                <GradeChip grade={f.grade} />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* red flags */}
      <section className="mt-8">
        <SectionHeading icon={ShieldAlert}>Red flags & things to verify</SectionHeading>
        <ul className="space-y-2">
          {RED_FLAGS.map((f) => (
            <li key={f.title} className="rounded-xl border border-line bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold">{f.title}</p>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    f.severity === "high"
                      ? "bg-red-500/10 text-red-700 dark:bg-red-400/10 dark:text-red-400"
                      : "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400"
                  }`}
                >
                  {f.severity === "high" ? "Deal-shaper" : "Check it"}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* price check */}
      <section className="mt-8">
        <SectionHeading icon={BadgeDollarSign}>Is $18,995 a fair price?</SectionHeading>
        <div className="rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed">
          <p>
            <strong>No — as inspected, it&apos;s overpriced by roughly $2,500–4,500.</strong>{" "}
            Full market re-check (August 2026) with live comps: a 2018 Tracker Pro Team 190 TX
            with a 70-hour <em>Mercury 115 Pro XS</em> — a supported engine — asks $18,495, and a
            garage-kept 2020 Pro 185 with a live Yamaha asks $20,995. This boat carries a dead
            brand (forum consensus: E-TEC rigs take a 10–20% discount and are hard to resell),
            stored outside, has zero service records, and was advertised with 35 more horsepower
            than it has. Fair retail as it sits: <strong>$14,500–16,500</strong>. The Ulterra
            package and new batteries are why it holds the top of that range.
          </p>
          <p className="mt-2 text-ink-muted">
            <strong className="text-ink">The play:</strong> target{" "}
            <strong className="text-ink">$15,500–16,500</strong>, with seat repair, impeller
            service, and the rigging boot written into the buyer&apos;s order — contingent on an
            EMM diagnostic pull (by an independent E-TEC tech if the dealer can&apos;t do it; on a
            no-records consignment boat the EMM is the only service history that exists) and a
            water test reaching full rated RPM. It&apos;s a consignment: the dealer has room to
            bring the owner down. And negotiate the <em>net difference</em> after the $5,500
            trade, not the sticker — a fair net is $10,000–11,000, not $13,495. The Evinrude
            discount you get today, you give back at resale.
          </p>
        </div>
      </section>

      {/* comparables */}
      <section className="mt-8">
        <SectionHeading icon={Scale}>How it compares — same money, different boats</SectionHeading>
        <p className="mb-3 text-sm leading-relaxed text-ink-muted">
          The honest question isn&apos;t &quot;is the Pro 185 good?&quot; — it&apos;s whether a
          deep-V hull would fit our trolling and Long Island Sound days better. Here&apos;s the
          field at this budget:
        </p>
        <ul className="space-y-2">
          {COMPARABLES.map((b) => (
            <li
              key={b.name}
              className={`rounded-xl border bg-surface p-4 ${
                b.best ? "border-accent/50" : "border-line"
              }`}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="text-sm font-semibold">{b.name}</p>
                {b.best && (
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                    Top alternative
                  </span>
                )}
              </div>
              <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-ink-muted">
                <span>{b.hull}</span>
                <span>{b.price}</span>
                <span>{b.speed}</span>
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                    <ThumbsUp className="h-3 w-3" /> For
                  </p>
                  <ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-ink-muted">
                    {b.pros.map((p) => (
                      <li key={p}>· {p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-red-700 dark:text-red-400">
                    <ThumbsDown className="h-3 w-3" /> Against
                  </p>
                  <ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-ink-muted">
                    {b.cons.map((c) => (
                      <li key={c}>· {c}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-3 border-t border-line/60 pt-3 text-sm leading-relaxed">{b.verdict}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* pros & cons */}
      <section className="mt-8">
        <SectionHeading icon={Scale}>The Pro 185, summed up</SectionHeading>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
              <ThumbsUp className="h-3 w-3" /> Why buy it
            </p>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink-muted">
              {PROS.map((p) => (
                <li key={p} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-red-700 dark:text-red-400">
              <ThumbsDown className="h-3 w-3" /> Why hesitate
            </p>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink-muted">
              {CONS.map((c) => (
                <li key={c} className="flex gap-2">
                  <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-600 dark:text-red-400" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* questions */}
      <section className="mt-8">
        <SectionHeading icon={HelpCircle}>Nine questions for the dealer</SectionHeading>
        <ol className="space-y-2">
          {QUESTIONS.map((q, i) => (
            <li key={q} className="flex gap-3 rounded-xl border border-line bg-surface p-3.5 text-sm leading-relaxed">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[11px] font-semibold text-ink-muted">
                {i + 1}
              </span>
              {q}
            </li>
          ))}
        </ol>
      </section>

      {/* checklist */}
      <section className="mt-8">
        <SectionHeading icon={ClipboardList}>Inspection day</SectionHeading>
        <div className="space-y-2">
          <Link
            href="/boat-report/inspect"
            className="group block rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/40"
          >
            <p className="text-sm font-semibold">Open the on-the-lot checklist</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              17 checks with what good and bad look like for each — engine, hull, transom,
              systems, trailer, paperwork. Checkboxes save on your phone as you go.
            </p>
          </Link>
          <Link
            href="/boat-report/findings"
            className="group block rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/40"
          >
            <p className="text-sm font-semibold">Inspection findings — what we found in person</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              Photos, verdicts, and fixes from the lot visit: engine confirmed a 115 H.O.,
              the peeling console with a restoration guide, and an owner&apos;s quick reference.
            </p>
          </Link>
          <Link
            href="/boat-report/deal"
            className="group block rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/40"
          >
            <p className="text-sm font-semibold">Deal day playbook</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              The numbers to hold, the negotiation sequence, your leverage list, lines for the
              hard moments, and the walk protocol.
            </p>
          </Link>
        </div>
      </section>

      {/* bottom line */}
      <section className="mt-8 rounded-xl border border-line bg-surface p-4">
        <h2 className="text-sm font-semibold">Bottom line</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          If bass and the Hudson are 70% of our fishing — and they are — the Pro 185 is a genuinely
          strong buy at a corrected price, and the Ulterra will change how we fish overnight. If the
          dream is really long trolling days on deep water and more Connecticut salt, a used Lund
          Impact 1775 or a welded deep-V is the better boat, at the cost of the bass layout and a
          few mph. Either way: no deal without the water test, the EMM readout, and a straight
          answer on which engine is bolted to the transom.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-ink-faint">
          Prepared July 2026 from the CR&apos;s Marine listing, photo analysis, factory specs, and
          published boat tests. Prices are asking-price observations, not appraisals — a marine
          survey and water test are the final word.
        </p>
      </section>

      {/* sources */}
      <section className="mt-8 mb-4">
        <SectionHeading icon={ClipboardList}>Sources</SectionHeading>
        <ul className="space-y-1.5">
          {SOURCES.map((s) => (
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
      </section>
    </main>
  );
}
