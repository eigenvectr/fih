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

type Detail = { title: string; tagline: string; body: string[] };

const FEATURES: Detail[] = [
  {
    title: "Evinrude E-TEC 115 H.O. G1",
    tagline: "The verified heart — 47 mph, trolls all day, self-winterizes",
    body: [
      "Direct-injection 2-stroke: no belts, no valves, no oil changes — it injects XD100 from a reservoir. Holds 1.5–2.5 mph trolling for hours without fouling plugs, then runs 47 mph home.",
      "Its EMM computer is a flight recorder: verified 72.5 hours at purchase, never overheated, nine winterizations logged. Every future pull extends the paper trail.",
      "Use it for: everything. Trolling lakers at dawn, bass runs, the Hudson. WOT benchmark: 5,500–6,000 RPM and ~47 mph — if a future season falls short of that, something changed.",
      "The catch: Evinrude is a dead brand — parts into ~2030, serviced 15 minutes away at CR's. See weaknesses for the plan.",
    ],
  },
  {
    title: "Minn Kota Ulterra 80 BT (2021)",
    tagline: "Auto stow/deploy, Spot-Lock, three ways to drive it",
    body: [
      "The boat's best fishing feature, and it's newer than the boat — built 2021. Auto stow/deploy means it parks itself; Spot-Lock is an electric anchor that holds position in wind.",
      "Three controls: the i-Pilot remote, the One-Boat Network phone app, and the foot pedal. All paired and working.",
      "Bonus hiding inside: a US2 sonar transducer built into the lower unit — a $40 adapter feeds it to a bow display (the Helix's next job).",
      "Use it for: holding on a bass bank while everyone casts, silent shallow approaches, backup propulsion, and precise trolling lines.",
      "Care: it's the freshwater model — rinse thoroughly after any Sound trip.",
    ],
  },
  {
    title: "Garmin ECHOMAP UHD 93sv",
    tagline: "The dash brain-in-waiting from the old boat",
    body: [
      "9\" chartplotter/sonar carried over from the Mirrocraft, currently uninstalled — it takes the helm when the BBT dash plate arrives (roadmap item #1).",
      "Role: charts, waypoints, and 2D sonar at the driver's seat. It cannot run LiveScope 2 (first-gen platform), which is fine — the future LiveScope station lives at the bow with its own screen.",
      "Before the plate order: find its bail bracket in the old-boat parts, and check whether its transducer came with it or was traded away on the Mirrocraft's transom.",
    ],
  },
  {
    title: "Humminbird Helix 7 CHIRP G2",
    tagline: "Came with the boat — future bow placeholder",
    body: [
      "The dash unit the boat came with: modest, sun-hazed screen, works fine. Worth ~$150–250.",
      "Its future: move to the bow on the Ulterra's built-in US2 transducer (~$40 adapter) once the Garmin takes the dash — a free second sonar station until the LiveScope build replaces it, then sell it.",
      "Screen haze salvage if it bothers us: polish the failed coating off, $12 anti-glare protector on top (restoration guide, findings page).",
    ],
  },
  {
    title: "Power system: MK 315D + Interstate bank",
    tagline: "Three banks, all maintained from one plug",
    body: [
      "Minn Kota MK 315D onboard charger: 3 banks × 5A, digital multi-stage, covering both Ulterra deep-cycles (Interstate SRM-27, new at purchase) and the start battery.",
      "The habit that keeps it all alive: plug in when the boat gets home — 5A banks mean a deep recharge is an overnight job.",
      "Battery terminals wear proper clamps, not wing nuts — which matters, because voltage spikes from loose connections are the #1 killer of the E-TEC's $3,000 EMM.",
    ],
  },
  {
    title: "Dual 20-gallon aerated livewells",
    tagline: "Bow and stern — tournament-grade capacity",
    body: [
      "Both aerated with fill and recirculate, drains aft. More livewell than most 18-footers carry.",
      "Use them for: keeping bass healthy for photos and releases, porgy runs at Milford, and bait management on striper days.",
      "Run the pumps every few trips even when not fishing them — seals and impellers like exercise.",
    ],
  },
  {
    title: "4-blade stainless prop",
    tagline: "Grip over top speed — and it still ran 47",
    body: [
      "A clean 4-blade stainless (the listing wrongly said 3-blade). Four blades trade 1–2 mph of top end for quicker hole shot, better grip in chop and turns, and steadier trolling control.",
      "Proof it's pitched right: 47 mph GPS at the water test with clean revving.",
      "Check the blades for dings any time the boat touches gravel; a bent stainless blade can be repaired (~$100–150) rather than replaced.",
    ],
  },
  {
    title: "Load Rite Elite aluminum trailer",
    tagline: "The right trailer for salt ramps",
    body: [
      "Aluminum frame (shrugs off salt water far better than painted steel), side load guides, transom tie-down straps, and a spare tire. Tires checked good at purchase.",
      "Service rhythm: spin the hubs each spring, repack bearings every 2 years, read tire date codes annually — trailer tires age out around year six regardless of tread.",
    ],
  },
  {
    title: "The hull: riveted 2XB mod-V",
    tagline: "Beachable, shallow, light — with known limits",
    body: [
      "Alumacraft's double-plated bottom (a second full aluminum layer over the running surface) with a center keel and six keel breaks. Light enough to tow behind nearly anything and launch anywhere.",
      "Use it for: shallow bass water big boats can't reach, beaching on gravel, quick solo launches.",
      "Its limits are honest and documented: a mod-V pounds in big-lake chop and rides wet in wind — see weaknesses. Bilge stayed dry through the hard-run water test.",
    ],
  },
  {
    title: "Storage, cover, and the rest",
    tagline: "Rod lockers, casting decks, new mooring cover",
    body: [
      "Port rod locker, bow and aft storage, under-seat compartments, two casting decks, windshield console, fold-down cleats.",
      "The brand-new mooring cover (came with the deal) is what keeps the sun from restarting the cosmetic damage clock — use it every time.",
      "Seats: seams re-stitched by the dealer at delivery; vinyl itself is healthy.",
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
      "The fix path is documented: BBT replacement plate retires the worst panel (roadmap #1), SEM refinish guide covers the rest (findings page), and the new mooring cover stops the clock.",
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
        <SectionHeading icon={Wrench}>Features — tap anything for the full story</SectionHeading>
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
