import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  Fish,
  Gauge,
  Sparkles,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Our boat · 2018 Alumacraft Pro 185",
  description:
    "The owner's hub for our 2018 Alumacraft Pro 185: features, strengths, weaknesses, service log, upgrade roadmap, and the purchase archive.",
};

/* ---------------------------------- data ---------------------------------- */

const PHOTOS = [
  { src: "/boat/profile.jpg", alt: "Port side profile on the Load Rite trailer" },
  { src: "/boat/stern.jpg", alt: "Stern quarter with Evinrude outboard and cockpit" },
  { src: "/boat/bow.jpg", alt: "Bow casting deck with Minn Kota Ulterra" },
  { src: "/boat/seats.jpg", alt: "Cockpit and seating" },
];

const VITALS: [string, string][] = [
  ["Bought", "Aug 2026 · $14,800 OTD"],
  ["Top speed", "47 mph GPS (verified)"],
  ["Engine", "E-TEC 115 H.O. G1"],
  ["Hours at purchase", "72.5 (EMM-verified)"],
  ["Length / beam", "18'5\" / 7'6\""],
  ["Hull", "Riveted mod-V, 2XB bottom"],
  ["Fuel / capacity", "20 gal · 5 people"],
  ["HIN", "ACBW8951F718"],
];

const NAV = [
  { href: "/boat-report/service", label: "Service" },
  { href: "/boat-report/roadmap", label: "Roadmap" },
  { href: "/boat-report/findings", label: "Findings" },
  { href: "/boat-report/archive", label: "Archive" },
];

type Detail = { title: string; tagline: string; body: string[]; how?: string[] };

const FEATURES: Detail[] = [
  {
    title: "Evinrude E-TEC 115 H.O. G1",
    tagline: "The engine — 47 mph, trolls all day, mostly takes care of itself",
    body: [
      "A direct-injection 2-stroke: no engine oil changes, no belts, no valves. It automatically injects oil from a reservoir under the cowl, so \"checking the oil\" means glancing at that tank, not pulling a dipstick.",
      "Its computer (the EMM) records everything — hours, temperatures, faults. Our copy of its report verified the whole history at purchase.",
    ],
    how: [
      "Before every trip: open the cowl latch and glance at the translucent oil tank — top up with Evinrude XD100 only (never car oil). It burns about a gallon per 30–40 hours.",
      "At startup: turn the key and immediately look for the thin water stream (the \"tell-tale\") shooting from the engine. Stream = cooling works. No stream within a few seconds = shut down, do not run it.",
      "Warm it 2–3 minutes at idle before throttling up. Once warm, running it hard is good for it — 2-strokes hate babying more than they hate work.",
      "Gas: regular 87 octane. Premium buys nothing.",
      "If a warning horn sounds: pull back to idle, check the tell-tale and the oil tank, and shut down if unsure. The engine protects itself by cutting power — let it.",
      "Every fall: the winterize routine (CR's does it, or the self-fogging procedure) — this single habit is why the engine survived nine years outside.",
    ],
  },
  {
    title: "Minn Kota Ulterra 80 BT (2021)",
    tagline: "The trolling motor — an electric anchor and a silent second engine",
    body: [
      "The boat's best fishing feature, newer than the boat itself (built 2021). It deploys and stows itself at the push of a button, and Spot-Lock holds the boat on a GPS point like an anchor — no rope, no drift.",
      "Also in the lower unit: a built-in US2 sonar transducer — unused in our plan (Garmin heads can't read it), but a nice resale footnote. The bow is reserved for LiveScope, which barrel-mounts to this motor cleanly.",
    ],
    how: [
      "Power: its breaker switch lives in the battery compartment — flip it on at the ramp, off when trailering.",
      "Deploy: press the stow/deploy button on the remote (or app, or double-tap the pedal) — it unfolds itself into the water. Same button brings it home. ALWAYS stow before running the outboard.",
      "Spot-Lock: drive to where you want to stay, let the boat settle, press the anchor icon. It'll hold within a few feet all day. Press again to release.",
      "Driving: speed 1–10 and steering from the remote, the phone app (One-Boat Network), or the foot pedal — all three are paired and interchangeable.",
      "Battery reality: at trolling speeds 4–5 it runs all day on the two deep-cycles; at 7+ it can drain them in a few hours. The fix is always the same: plug the boat in when you get home.",
      "After any saltwater trip: rinse the whole motor with fresh water — it's the freshwater model and salt isn't covered.",
    ],
  },
  {
    title: "Minn Kota MK 315D onboard charger",
    tagline: "One plug charges all three batteries — the most important habit on the boat",
    body: [
      "A 3-bank smart charger bolted into the battery compartment: one wall cord in, and it independently charges and maintains both trolling batteries AND the starting battery. It cannot overcharge — leave it plugged in for a night or a month.",
    ],
    how: [
      "Find the AC cord/inlet in the battery compartment (near the charger, labeled Minn Kota DIGITAL).",
      "When the boat gets home: plug it into any regular household outlet — an outdoor extension cord is fine. That's the whole job.",
      "Read the lights: each bank has an LED — red/charging means it's working (1–5A), green means that battery is full and being maintained (0–1A).",
      "Deep recharges take overnight (it's a 5-amp-per-bank unit) — plug in the night you get home, not the morning you leave.",
      "Winter: leave it plugged in, or plug in overnight once a month. Maintained batteries last 5+ years; neglected ones die in 2.",
      "If one bank never turns green overnight: that battery (or its wiring) needs a look — that's your early warning, not a crisis.",
    ],
  },
  {
    title: "The three batteries",
    tagline: "One sprinter for the engine, two marathoners wired together for the Ulterra",
    body: [
      "Battery #1 is the STARTING battery: a sprinter built to dump a huge burst of amps for a few seconds to crank the E-TEC, then rest. It also runs everything at the console — fish finder, livewell pumps, nav lights, bilge pump. The outboard recharges it while you drive, like a car.",
      "Batteries #2 and #3 are DEEP-CYCLE batteries: marathoners with thick plates built to give steady power for hours and survive being drained and recharged over and over. They are wired in SERIES — a jumper connects them so their voltages add: 12V + 12V = 24V, which is what the Ulterra 80 requires. Together they are one 24-volt pack that does nothing but run the trolling motor.",
      "Why the split matters: a starting battery deep-drained by trolling dies young, and a deep-cycle can struggle to crank an engine. Different jobs, different builds. The split also means you can troll all day and still ALWAYS have a full battery to start the engine and get home.",
      "What one battery supports: capacity is measured in amp-hours (Ah) — a typical Group 27 deep-cycle holds ~90–100Ah, but lead-acid only gives up about half before you're shortening its life, so figure ~50Ah usable each. In series the pack is still ~100Ah (series adds voltage, not capacity). The Ulterra pulls roughly 15–20A at speeds 4–5 and up to ~56A wide open — which is the math behind \"all day at 5, a few hours at 10.\" Spot-Lock only sips in light wind.",
      "The starting battery is rated in cranking amps instead (CCA/MCA) — the E-TEC wants a strong one (spec is ~640 CCA / 800 MCA) with CLEAN, TIGHT terminals. Loose battery connections are the #1 killer of the $3,000 EMM, so this is the one place to be fussy.",
    ],
    how: [
      "Read your labels once: brand, group size (24/27/31), Ah or CCA rating, and the date-code sticker — write them on the service page. Ours were new at purchase (Aug 2026), so the clock started this year.",
      "The engine only recharges the STARTING battery. The trolling pair recharges one way: the wall plug at home. That's why the charger habit is the whole ballgame.",
      "Voltage cheat sheet (multimeter across a rested battery): 12.7V = full, 12.4V = 75%, 12.2V = half — recharge now, 12.0V or less = empty and being damaged. Never leave a lead-acid battery sitting discharged.",
      "Monthly-ish: check terminals are tight (wiggle test) and fuzz-free — baking-soda water and a wire brush if white/green crust appears, then a smear of dielectric grease.",
      "Replace the trolling pair TOGETHER, always — a new battery in series with an old one drags down to the old one's level.",
      "Working on anything electrical: disconnect NEGATIVE first, reconnect it last (the full walkthrough lives on the findings page).",
    ],
  },
  {
    title: "Garmin ECHOMAP UHD 93sv",
    tagline: "The navigator-in-waiting from the old boat",
    body: [
      "Our 9-inch chartplotter, currently uninstalled — it takes the helm when the BBT dash mount arrives (roadmap #1). Its job: lake maps, waypoints, speed, and 2D sonar at the driver's seat.",
    ],
    how: [
      "Until installed: it lives safe and dry at home with its power cable and (hopefully) its bail mount — check the old-boat parts pile for the transducer too.",
      "Once installed: power comes from the console; press and HOLD a spot on the map to drop a waypoint; the GPS speed readout replaces the old analog speedo as the number you trust.",
      "It cannot run LiveScope 2 (older platform) — that's fine; the future LiveScope lives at the bow with its own screen.",
    ],
  },
  {
    title: "Humminbird Helix 7 CHIRP G2",
    tagline: "The fish finder that came with the boat",
    body: [
      "The current dash unit: sonar and GPS, modest but working, with a sun-hazed screen (cosmetic). Its future: comes off and sells when the Garmin takes the dash — the bow stays empty, reserved for the LiveScope station.",
    ],
    how: [
      "Power button is bottom-right; it shares the console power switch.",
      "Reading it as a beginner: the screen scrolls right-to-left showing what's UNDER you (not ahead). The bottom is the thick line; fish are arches or dots above it; the number is depth. Start with the default 2D view and auto sensitivity — it's right 90% of the time.",
      "The haze: mild soap or a 50/50 vinegar-water wipe with microfiber. Never regular Windex or alcohol — it dissolves the anti-glare coating.",
    ],
  },
  {
    title: "Dual 20-gallon aerated livewells",
    tagline: "Bow and stern tanks that keep fish (and bait) alive",
    body: [
      "Two insulated tanks with pumps that pull fresh lake water in and bubble air through it. More capacity than most 18-footers.",
    ],
    how: [
      "Switches are on the console: AERATOR with AUTO and MAN(ual). AUTO cycles the pump to save battery; MAN runs constantly — use MAN on hot days or full wells.",
      "Fill: with the boat in the water, run the fill/aerator until the well is 2/3 up. Fish ride better with the lid closed (dark = calm).",
      "Hot summer water is low on oxygen — run MAN, and top the well up periodically with fresh water.",
      "After the trip: pull the well drain plugs (aft) and let them empty, leave lids cracked to dry — a sealed wet well grows smells you will not forgive.",
      "Porgy days at Milford: same drill, then rinse the wells and plumbing with fresh water at home.",
    ],
  },
  {
    title: "4-blade stainless prop",
    tagline: "Grip over glory — and it still ran 47",
    body: [
      "Four blades bite better than three: quicker out of the hole, steadier in chop and turns, more control at trolling speed, for a 1–2 mph top-end tax we never miss. Verified right for the boat: 47 mph at rated RPM.",
    ],
    how: [
      "Each trip: a five-second glance for dinged or bent blade edges (gravel bars leave fingerprints).",
      "Twice a season: look BEHIND the prop at the shaft for wrapped fishing line — line works into the seal and lets water into the gearcase. If you see line, pull the prop (1-1/16\" socket, block the blades with wood) and clear it.",
      "When the prop is off: smear Triple-Guard grease on the shaft, torque the nut, fresh cotter pin. Ten minutes, once or twice a year.",
      "A dinged stainless blade is repairable (~$100–150 at a prop shop) — don't buy a new prop for one bad blade.",
    ],
  },
  {
    title: "Load Rite Elite aluminum trailer",
    tagline: "Salt-proof frame, guides that make loading easy",
    body: [
      "Aluminum frame (laughs at salt ramps), side guide-ons that funnel the boat home in wind, transom tie-down straps, and a spare tire.",
    ],
    how: [
      "Before every tow, the 60-second walk-around: coupler latched with the pin in, safety chains crossed under the tongue, winch strap tight, transom straps on, lights plugged in and working.",
      "Launching: dunk until the boat floats free of the bunks; unhook the winch AT the ramp, never on the road.",
      "Loading: drive the bow between the guides, winch the last few feet, clip the safety chain before pulling out.",
      "Care: rinse the trailer after salt ramps (skip pressure-washing the hubs), spin-check the wheels each spring, and the service page tracks bearings and tire age.",
    ],
  },
  {
    title: "The hull: riveted 2XB mod-V",
    tagline: "Beachable, shallow, light — the boat's personality",
    body: [
      "Alumacraft's double-plated bottom (a second full aluminum sheet over the running surface) with a center keel. Light enough to tow behind nearly anything, shallow enough for water big boats can't touch, tough enough to beach on gravel.",
    ],
    how: [
      "THE rule (the #1 new-owner mistake in existence): transom drain plug IN before launch, OUT after the trip. Make it a ramp ritual — say it out loud, both directions.",
      "The bilge pump switch is on the console for rain or spray water; the manual pump is backup.",
      "Beaching: bow-first on sand or gravel with the motor trimmed up — this hull is built for it.",
      "Once a season: glance along the bottom rivet lines for any new weeping streaks (we baselined it clean at purchase — the bilge stayed dry through a 47-mph water test).",
    ],
  },
  {
    title: "Storage, cover, and the rest",
    tagline: "Rod lockers, casting decks, and the sun's kryptonite",
    body: [
      "Port rod locker, bow and aft storage, under-seat compartments, two casting decks, fold-down cleats — and the brand-new mooring cover that came with the deal.",
    ],
    how: [
      "The cover goes on EVERY time the boat parks outside. Sun is what aged this boat's dash, screen, and seats — the cover is a $300 part protecting thousands in vinyl and plastic. Never cover a wet boat for more than a day (mildew).",
      "Rod locker (port side) swallows rods to 7'6\" rigged — tips toward the bow.",
      "Keep a dry box aboard: registration copy, insurance card, spare plug, fuses, and the boat's paper trail lives on this site.",
      "Seats: re-stitched at delivery; a wipe of 303 protectant a few times a season keeps the vinyl alive.",
    ],
  },
];

const STRENGTHS: Detail[] = [
  {
    title: "A verified biography no used boat has",
    tagline: "EMM-documented history + measured performance",
    body: [
      "Verified hours, zero overheats, nine logged winterizations, ideal usage histogram, and a 47-mph water test — documented with photos across these pages.",
      "This is the resale ace: when we sell, the listing says 'EMM reports on file since purchase, full service log' — and unlike every competing listing, we can prove it.",
    ],
  },
  {
    title: "Genuinely fast — 47 mph measured",
    tagline: "Top of the honest range for this hull",
    body: [
      "Twice the old Mirrocraft, achieved with the engine pulling cleanly to rated RPM. Run-to-the-spot times that make short evening trips worth it.",
      "About as fast as an open 18-foot aluminum boat should go with family aboard — the phantom 57 was never real, and 47 doesn't leave us wanting.",
    ],
  },
  {
    title: "Complete fishing package from day one",
    tagline: "~$6–7k of hardware came with the hull",
    body: [
      "Ulterra with Spot-Lock (2021), Helix sonar, 3-bank charger, new batteries, aluminum trailer, stainless 4-blade, new cover, dual livewells.",
      "Nothing needed buying to start fishing — the upgrade roadmap is all want, not need.",
    ],
  },
  {
    title: "A trolling machine by design",
    tagline: "The previous owner proved it for 44 hours",
    body: [
      "The engine's own histogram shows 61% of its life at trolling RPM — this exact rig trolled Vermont lakes for years. DI 2-strokes hold 1.5–2.5 mph without fouling, and the Ulterra adds silent precision.",
      "For our lakers and salmon: add downrigger track bases when ready; the platform is already proven.",
    ],
  },
  {
    title: "Local factory-capable service",
    tagline: "CR's Marine, 15 minutes away",
    body: [
      "The selling dealer stocks Evinrude parts and services E-TECs in-house — the single biggest mitigation of the dead-brand risk, and they know this boat personally.",
      "The impeller booking starts the service relationship on our terms.",
    ],
  },
  {
    title: "Goes where big boats can't",
    tagline: "Light, shallow, launchable anywhere",
    body: [
      "1,100-lb hull on an aluminum trailer: any ramp, any tow vehicle, solo launches, skinny water, beachable on gravel.",
      "The flip side of the big-water caveat — half our best fishing is in water deep-V owners can't touch.",
    ],
  },
];

const WEAKNESSES: Detail[] = [
  {
    title: "Orphaned engine brand",
    tagline: "Evinrude died in 2020 — the managed risk",
    body: [
      "BRP ended production May 2020; parts pledged into ~2030. The known expensive failure is the EMM (~$3,000), usually killed by overheating or loose battery connections — both of which our habits guard against.",
      "The plan, written down: keep the service log immaculate, pull EMM reports every 2 years, and if we ever upgrade, sell before ~2029 while 'supported through 2030' is still a selling sentence.",
      "What we got in exchange: this boat cost thousands less than Mercury/Yamaha equivalents. The discount was real going in; it will be real going out.",
    ],
  },
  {
    title: "Mod-V hull in big water",
    tagline: "Weather windows, not white knuckles",
    body: [
      "The hull pounds in big-lake chop and rides wet in wind — 18-foot mod-V physics, no fix. Practical limits: comfortable to ~2-ft chop, workable to 3-ft rolling, miserable past that.",
      "The discipline: pick weather windows on Lake George and the Finger Lakes, fish mornings on the Sound, respect wind-against-tide on the Hudson. The fishing is fine; the schedule flexes.",
    ],
  },
  {
    title: "Sun-baked cosmetics",
    tagline: "The boat's history written on its dash",
    body: [
      "Peeling console panels, hazed Helix screen, weathered trim — years outside, uncovered. All function, no failure.",
      "The fix path is documented: the SEM refinish guide (findings page) is the primary dash fix — BBT confirmed this dash is too curved for a replacement plate — with an Alumacraft dash shroud as the possible shortcut, and the new mooring cover stops the clock.",
    ],
  },
  {
    title: "20-gallon fuel tank",
    tagline: "Small for long trolling days",
    body: [
      "Fine for bass days and the Hudson; a limiter for long big-lake trolling runs. The E-TEC's economy helps (~6 mpg at economic cruise).",
      "Habit: full tank for trolling days, know the marina options, and the fall top-off doubles as winterization practice.",
    ],
  },
  {
    title: "Freshwater rig, saltwater ambitions",
    tagline: "Milford trips carry a maintenance tax",
    body: [
      "Riveted hull, freshwater Ulterra, magnesium anodes — all built for lakes. Occasional Sound trips are fine WITH the routine: zinc/aluminum anodes before salt season, flush and rinse everything after every trip.",
      "The aluminum trailer is the one part of the rig that was already salt-ready.",
    ],
  },
  {
    title: "No kicker motor",
    tagline: "Redundancy is the Ulterra",
    body: [
      "Big-water trollers run a 9.9 kicker for backup and fine control. We troll on the E-TEC (proven at it) with the Ulterra as electric backup — honest for our waters, worth rethinking only if Lake Ontario proper ever becomes a habit.",
    ],
  },
];

const FIT: { title: string; grade: "great" | "good" | "stretch"; body: string }[] = [
  {
    title: "Bass — NY lakes and rivers",
    grade: "great",
    body: "Exactly what the Pro 185 was built for: casting decks, livewells, shallow draft, Spot-Lock. A huge step up from the Mirrocraft.",
  },
  {
    title: "Lake trout & salmon — deep NY lakes",
    grade: "good",
    body: "Proven troller (the histogram says so). Add downrigger track bases when ready; pick weather windows; plan fuel on big lakes.",
  },
  {
    title: "Hudson River — stripers & more",
    grade: "good",
    body: "Fast enough to chase birds, shallow enough for the flats. Watch spring debris and wind-against-tide days.",
  },
  {
    title: "Porgy & inshore — Milford, CT",
    grade: "stretch",
    body: "Calm-morning trips to the reefs and Charles Island are realistic. Salt routine required; the Sound decides the schedule, not us.",
  },
];

const gradeStyle = {
  great: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400",
  good: "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400",
  stretch: "bg-red-500/10 text-red-700 dark:bg-red-400/10 dark:text-red-400",
} as const;

const gradeLabel = { great: "Great fit", good: "Works, with care", stretch: "The stretch" } as const;

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

function DetailCard({ item }: { item: Detail }) {
  return (
    <details className="group rounded-xl border border-line bg-surface">
      <summary className="cursor-pointer list-none p-4">
        <span className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold">{item.title}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-open:rotate-180" />
        </span>
        <span className="mt-0.5 block text-sm text-ink-muted">{item.tagline}</span>
      </summary>
      <div className="space-y-2 border-t border-line p-4">
        {item.body.map((b) => (
          <p key={b.slice(0, 40)} className="text-sm leading-relaxed text-ink-muted">
            {b}
          </p>
        ))}
        {item.how && (
          <div className="pt-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">
              How to use it
            </p>
            <ul className="mt-1.5 space-y-1.5">
              {item.how.map((h) => (
                <li key={h.slice(0, 40)} className="text-sm leading-relaxed text-ink-muted">
                  · {h}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </details>
  );
}

/* ----------------------------------- page ---------------------------------- */

export default function BoatPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-4 sm:px-6">
      <header className="mb-4 flex items-center gap-2">
        <Link
          href="/"
          aria-label="Back to waters"
          className="rounded-full p-2 text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold tracking-tight">Our boat</h1>
          <p className="truncate text-xs text-ink-muted">
            2018 Alumacraft Pro 185 · Evinrude E-TEC 115 H.O. · ours since August 2026
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* quick nav */}
      <nav className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {NAV.map((l) => (
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
            className="aspect-[4/3] rounded-xl border border-line object-cover"
          />
        ))}
      </div>

      {/* vitals */}
      <section className="mt-6">
        <SectionHeading icon={Gauge}>Vitals</SectionHeading>
        <div className="rounded-xl border border-line bg-surface p-4">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-4">
            {VITALS.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] uppercase tracking-wide text-ink-faint">{k}</dt>
                <dd className="text-sm font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* features */}
      <section className="mt-8">
        <SectionHeading icon={Wrench}>The manual — tap any system, written for day one</SectionHeading>
        <div className="space-y-2">
          {FEATURES.map((f) => (
            <DetailCard key={f.title} item={f} />
          ))}
        </div>
      </section>

      {/* strengths */}
      <section className="mt-8">
        <SectionHeading icon={Sparkles}>What this boat is great at</SectionHeading>
        <div className="space-y-2">
          {STRENGTHS.map((f) => (
            <DetailCard key={f.title} item={f} />
          ))}
        </div>
      </section>

      {/* weaknesses */}
      <section className="mt-8">
        <SectionHeading icon={ShieldAlert}>What it isn&apos;t — and how we manage it</SectionHeading>
        <div className="space-y-2">
          {WEAKNESSES.map((f) => (
            <DetailCard key={f.title} item={f} />
          ))}
        </div>
      </section>

      {/* fit */}
      <section className="mt-8">
        <SectionHeading icon={Fish}>How it fishes our waters</SectionHeading>
        <ul className="space-y-2">
          {FIT.map((f) => (
            <li key={f.title} className="rounded-xl border border-line bg-surface p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{f.title}</p>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${gradeStyle[f.grade]}`}
                >
                  {gradeLabel[f.grade]}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* footer */}
      <p className="mt-8 mb-4 text-xs leading-relaxed text-ink-faint">
        Everything on these pages — the verified engine history, the service log, the photos, the
        purchase archive — is also the resale dossier. The day we sell or upgrade, the listing
        writes itself, with receipts.
      </p>
    </main>
  );
}
