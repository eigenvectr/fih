import Link from "next/link";
import {
  ArrowLeft,
  BatteryCharging,
  BookOpen,
  ChevronDown,
  Gauge,
  PlugZap,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Batteries & power · the dummy guide",
  description:
    "Zero-experience walkthrough of the Pro 185's electrical system: the three batteries, the two chargers, runtime math, the voltage cheat sheet, and the habits that make batteries last.",
};

/* ---------------------------------- data ---------------------------------- */

const SYSTEM_MAP: { name: string; role: string; fedBy: string; feeds: string }[] = [
  {
    name: "Battery 1 · Starting (12V)",
    role: "The sprinter — a huge burst for two seconds, then rest",
    fedBy: "The engine while driving + charger bank 1 at home",
    feeds: "Cranks the E-TEC, then runs the console: fish finder, livewell pumps, lights, bilge",
  },
  {
    name: "Battery 2 · Deep-cycle (12V)",
    role: "Marathoner — half of the 24V trolling pack",
    fedBy: "Charger bank 2 at home. The engine never touches it.",
    feeds: "The Ulterra, together with battery 3",
  },
  {
    name: "Battery 3 · Deep-cycle (12V)",
    role: "Marathoner — the other half of the 24V pack",
    fedBy: "Charger bank 3 at home. The engine never touches it.",
    feeds: "The Ulterra, together with battery 2",
  },
];

type Card = { title: string; tagline: string; body: string[]; list?: string[]; listLabel?: string };

const SCHOOL: Card[] = [
  {
    title: "What's actually inside a battery",
    tagline: "Six little 2.1-volt cells, lead plates, and acid",
    body: [
      "A \"12-volt\" battery is really six small cells wired together inside one box, each making about 2.1 volts — which is why a full battery reads 12.7V, not 12.0. Inside each cell: plates of lead sitting in dilute sulfuric acid.",
      "Using the battery runs a chemical reaction: the acid reacts with the plates and coats them in a soft crust called lead sulfate. Charging reverses the reaction and dissolves the crust. That's the whole trick — a battery is a chemical reaction you can run backwards.",
      "The one thing it cannot forgive: sitting discharged. Left drained for days or weeks, that soft crust hardens into crystals no charger can dissolve — the battery permanently shrinks. This single fact explains almost every battery rule on this page.",
      "The other two killers are heat (cooks the plates, boils off water) and vibration (cracks plates — which is why boat batteries sit in boxes with hold-down straps; check ours stay snug).",
    ],
  },
  {
    title: "Sprinters vs marathoners",
    tagline: "Why a starting battery and a deep-cycle are different animals",
    body: [
      "A starting battery has MANY THIN plates — huge surface area, so it can dump hundreds of amps for the two seconds the starter needs. But thin plates crumble if you drain them deep. Rated in cranking amps: CCA (tested at 0°F) or MCA (tested at 32°F). Same battery, MCA reads ~20–25% higher — never compare a CCA number against an MCA number.",
      "A deep-cycle battery has FEW THICK plates — less burst power, but built to be drained halfway down and refilled hundreds of times. Rated in amp-hours (Ah): a 100Ah battery can supply 5 amps for 20 hours.",
      "Use the wrong one for the wrong job and it dies young: trolling on a starting battery shreds its thin plates in a season; a pure deep-cycle may crank an engine weakly. That mismatch — not defects — is why the boat carries both kinds.",
      "Our engine is fussy about the sprinter: the E-TEC 115's spec is a minimum of 675 CCA / 845 MCA. When this battery is ever replaced, buy at or above that number.",
    ],
  },
  {
    title: "Volts, amps, amp-hours — the plumbing version",
    tagline: "Three words that make every spec sheet readable",
    body: [
      "Volts = water pressure. Amps = how fast water flows. Amp-hours = the size of the tank. The Ulterra needs 24V of \"pressure\" to make 80 lb of thrust; how long it runs depends on the tank (amp-hours) and how hard you open the tap (amps).",
      "The catch with lead-acid tanks: you can only use about HALF. Drain a flooded battery past ~50% routinely and its lifespan collapses — roughly 200–300 total cycles if you flatten it every time, 500-plus if you stop at half. So a \"100Ah\" trolling battery is really a ~50Ah usable tank.",
      "This is also why \"my battery died young\" is almost always self-inflicted: deep draining plus slow recharging, not bad luck.",
    ],
  },
  {
    title: "How two batteries become 24 volts",
    tagline: "Series wiring — the jumper cable in the battery compartment",
    body: [
      "Look in the compartment: a short cable runs from the PLUS post of one trolling battery to the MINUS post of the other. That's series wiring, and it stacks their pressure: 12V + 12V = 24V. The Ulterra drinks from the two outer posts and sees one 24-volt battery.",
      "Series adds voltage but NOT capacity: two 100Ah batteries in series are a 24V, 100Ah pack — not 200Ah. The same current flows through both, so they drain and age as one unit.",
      "The rule that follows: the pair lives and dies together. Replace both at once, same brand, same model, same age. Put one new battery in series with one tired one and the tired one drags the pair down to its level — and can even be damaged further by its stronger partner.",
      "Why 24V at all? Doubling voltage halves the amps needed for the same power — thinner cables, cooler connections, less waste. Every 80-lb-thrust motor is 24V for this reason.",
    ],
  },
];

const CHARGERS: Card[] = [
  {
    title: "Charger #1: the engine itself",
    tagline: "A 50-amp alternator that only ever feeds the starting battery",
    body: [
      "While the E-TEC runs, its stator (an alternator built into the flywheel) recharges the starting battery — about 10 amps at idle and a full 50 amps from 2,000 RPM up, holding the battery at ~14.4–14.5V. That's stout: a normal day of driving fully replaces what starting and the console electronics used. This is exactly how a car works.",
      "What it does NOT do: touch the trolling batteries. Stock rigging has no connection from the engine to the 24V pack — the pack's only refill is the wall charger at home. If the Ulterra dies mid-lake, no amount of driving around will recharge it.",
      "Two hard rules protect the $3,000 EMM (the engine's computer): keep the battery connections wrench-tight (BRP literally bans wing nuts — vibration loosens them, and a loose terminal's voltage spikes are the classic EMM killer), and NEVER disconnect a battery or flip a battery switch off while the engine is running — breaking the circuit mid-charge sends a voltage spike through everything.",
      "The engine watches its own electrics: if battery voltage runs low or the charging system misbehaves, it logs a code (26 = low battery voltage, 27 = high) and in bad cases drops into S.A.F.E. mode — limited to 1,200 RPM to protect itself. A surprise 1,200-RPM limp is the engine telling you to check the battery terminals first.",
    ],
  },
  {
    title: "Charger #2: the MK 315D on the wall cord",
    tagline: "Three independent smart chargers in one box — and how to read its lights",
    body: [
      "The Minn Kota MK 315D is really three separate 5-amp chargers (\"banks\") in one waterproof case. Each bank has its own red/black cable pair bolted directly across one battery — bank 1 on the starting battery, banks 2 and 3 on the trolling pair. One AC cord feeds all three.",
      "The clever part: even though the trolling batteries are wired in series as a 24V pack, each bank charges its own battery individually at 12V — no unhooking anything, ever. The series jumper stays put. Each battery gets exactly what it needs.",
      "\"Smart\" means it charges in three stages, like filling a glass: BULK (pour fast — full 5A), ABSORPTION (slow down near the brim — voltage held at ~14.4V while amps taper), MAINTENANCE (top off drips — ~13.4V float). After about a day at full it shuts its output off entirely and just watches, waking only if voltage sags. That auto-shutoff is why \"leave it plugged in all winter\" is safe and not battery abuse.",
      "Speed math: 5 amps per bank means a half-drained 100Ah trolling battery needs ~50Ah back, and 50 ÷ 5 with charging losses is 11–13 hours. It is an OVERNIGHT charger, not a lunch-break charger — plug in the night you get home, not the morning you leave.",
      "One gotcha: a battery drained below 8 volts (truly dead) shows red+green together and won't charge — it needs rescue on a different charger first. One more: this model is for flooded and AGM batteries only — fine today, but it does NOT speak lithium; remember that if the pack ever goes LiFePO4.",
    ],
    listLabel: "The light code, per bank",
    list: [
      "Flashing yellow — bulk charging, working hard.",
      "Solid yellow — absorption, nearly full.",
      "Flashing green — full, maintaining. Ready to fish.",
      "Solid green — full, long-term maintenance (output off, just watching). Ready to fish.",
      "Solid red — bad connection on that bank: check the ring terminals and inline fuse.",
      "Flashing red — error; check the manual's troubleshooting table.",
      "Red + green together — short circuit, battery below 8.0V, or a damaged temperature sensor.",
    ],
  },
];

const LIVING: Card[] = [
  {
    title: "Runtime math you can do in your head",
    tagline: "Why the Ulterra runs all day at 5 and dies by lunch at 10",
    body: [
      "The Ulterra 80 pulls up to 56 amps wide open, but the dial is steeply nonlinear: roughly 5–10A around speed 3, 15–25A around speed 5, 30–40A at 7, and the full 56A only at 10. Low speeds are disproportionately cheap — speed 3 isn't 30% of full power, it's more like 10%.",
      "Divide the tank by the tap: ~50 usable Ah ÷ ~8A average at low speeds = a full fishing day. ÷ 40A at high speeds = barely over an hour of hard running. Real owners of this exact setup report 6–7 hours living at speed 4, versus about 2 hours at speeds 8–10.",
      "Spot-Lock is cheap in calm water — single-digit amps of occasional correction — but in wind it works like driving: a breezy day of Spot-Lock can out-drain a calm day of trolling.",
      "Keep a reserve: the auto stow/deploy motor runs off the same pack. Run it truly flat and the Ulterra may not have the juice to stow itself (there's a manual override, but it's a bad end to a good day). When speed feels soft, head for the ramp.",
    ],
  },
  {
    title: "The voltage cheat sheet + how to use a multimeter",
    tagline: "The 30-second health check that replaces guessing",
    body: [
      "A multimeter reading battery voltage is the blood-pressure cuff of boat electrics: safe (12V can't shock you), instant, and honest. Set the dial to DC volts (V with a straight line, 20V range), black probe on the minus post, red on plus. That's the entire skill.",
      "One rule for honest readings: the battery must be RESTED — a few hours off the charger and off any load. Fresh off the charger it reads 13+ volts (a \"surface charge\" that burns off quickly) and will flatter you.",
      "The only real hazard at 12 volts is dropping a metal tool across both posts — it will weld and spark. Keep wrenches clear of the terminals, take rings off, done.",
    ],
    listLabel: "Rested voltage → state of charge",
    list: [
      "12.7V or higher — full. Go fishing.",
      "12.4V — about 75%. Fine.",
      "12.2V — half empty. This is the floor: recharge tonight.",
      "12.0V — about 25%. You're past the line; charge NOW.",
      "11.9V or less — effectively dead and being damaged as it sits. Rescue-charge immediately.",
    ],
  },
  {
    title: "The care calendar",
    tagline: "Four habits, none longer than ten minutes",
    body: [
      "AFTER EVERY TRIP: plug in the wall cord. Minn Kota's own manual calls failure to recharge within 12–24 hours the leading cause of premature battery death. This one habit is 90% of battery care.",
      "MONTHLY-ISH: eyeball the compartment. Terminals wrench-tight (gentle wiggle test), no white/green fuzz (scrub with baking-soda water and a brush if there is — keep it out of any vent caps — then a smear of dielectric grease), hold-downs snug, charger showing greens.",
      "ONCE, THEN EACH SPRING: read the labels. Note brand, group size, Ah/CCA ratings, and the date code (a letter is the month, a digit is the year — \"C6\" = March 2026) so we know the pack's real age. And check whether the trolling batteries are flooded (removable caps) or maintenance-free: flooded cells need a peek twice a season — plates must stay covered; top up with DISTILLED water only, after charging, never tap water.",
      "EVERY FALL: charge everything full, then either leave the MK 315D plugged in all winter (it's designed for it) or plug in overnight once a month. The freeze rule makes this non-optional: a charged battery won't freeze in any weather this state can produce, but a DEAD one freezes — and cracks — right around 20°F.",
    ],
  },
  {
    title: "When something acts up",
    tagline: "Symptom → what it usually means",
    body: [
      "Most \"electrical problems\" on a boat this simple are a connection or a state-of-charge problem, not a broken component. Check terminals and voltage before suspecting anything expensive.",
    ],
    listLabel: "The short table",
    list: [
      "Engine clicks but won't crank — starting battery low or a loose/corroded terminal. Voltage check, wiggle test, charge.",
      "Engine suddenly limited to ~1,200 RPM — S.A.F.E. mode, self-protection. Can be a charging-system/voltage fault: check battery connections first, then have codes read.",
      "Ulterra strong in the morning, weak by noon — normal draw at the speeds you ran, or an aging pack. Check rested voltage next morning; if a fullish charge sags fast, the pair may be due.",
      "One charger bank never turns green overnight — that battery or its bank wiring/fuse. Swap-test logic: if the light follows the bank, it's wiring; if it stays with the battery, it's the battery.",
      "Red + green on one bank — below 8V (deeply dead), a short, or the cable's temp sensor. That battery needs individual attention.",
      "White-green crust on a terminal — corrosion, the silent resistor. Baking-soda scrub, rinse, grease. Ten minutes.",
    ],
  },
  {
    title: "The mistakes that actually kill batteries",
    tagline: "Every dead marine battery traces to one of these",
    body: [
      "Posting the list because forewarned is cheap: batteries here cost $150–350 each and die young for the same six reasons everywhere.",
    ],
    listLabel: "Don't be this guy",
    list: [
      "Coming home tired and not plugging in — sitting discharged is the #1 killer (hard sulfation, permanent).",
      "Assuming the engine charged the trolling pack. It never does. Wall cord or nothing.",
      "Routinely running the pack way below half before recharging.",
      "Skipping winter care — self-discharge (~5%/month) plus a cold snap kills unattended batteries by spring.",
      "Replacing one battery of the series pair, or mixing brands/ages/types in the pack.",
      "Wing nuts, loose terminals, or crusty connections — slow charging at best, a fried EMM at worst.",
    ],
  },
  {
    title: "The lithium question",
    tagline: "Someday, maybe — but not a casual drop-in",
    body: [
      "LiFePO4 (lithium) batteries are the eventual upgrade path: half the weight, nearly all their capacity usable (no 50% rule), and 2,000+ cycles vs our ~500. Prices now overlap good AGM. The planned LiveScope bow battery (roadmap) will be LiFePO4 from day one — that's a fresh, separate system, so it's simple.",
      "Converting the EXISTING trolling pack is not casual: the MK 315D has no lithium charge profile (it would float lithium constantly — new charger required), and a lithium battery's internal computer can disconnect itself abruptly, which is dangerous around charging alternators. Keep the starting battery lead-acid regardless — the E-TEC's charging system was designed for it.",
      "The honest plan: run the current lead-acid pack out (it was new at purchase, so ~4–6 seasons with the plug-in habit), then decide with 2030's prices and a matching charger in the same purchase.",
    ],
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

function GuideCard({ item }: { item: Card }) {
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
        {item.list && (
          <div className="pt-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">
              {item.listLabel}
            </p>
            <ul className="mt-1.5 space-y-1.5">
              {item.list.map((l) => (
                <li key={l.slice(0, 40)} className="text-sm leading-relaxed text-ink-muted">
                  · {l}
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

export default function PowerPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-4 sm:px-6">
      <header className="mb-4 flex items-center gap-2">
        <Link
          href="/boat-report"
          aria-label="Back to the boat"
          className="rounded-full p-2 text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold tracking-tight">Batteries &amp; power</h1>
          <p className="truncate text-xs text-ink-muted">
            The dummy guide — everything electrical, assuming zero experience
          </p>
        </div>
        <ThemeToggle />
      </header>

      <p className="mb-6 text-sm leading-relaxed text-ink-muted">
        This page takes anyone from &ldquo;never touched a battery&rdquo; to running this
        boat&apos;s electrical system with confidence. Read the map, then open cards as questions
        come up. If you remember only one thing, make it this:{" "}
        <strong className="text-ink">plug the boat in when you get home.</strong> Nearly every
        rule below is a footnote to that habit.
      </p>

      {/* system map */}
      <section>
        <SectionHeading icon={Zap}>The system in 30 seconds</SectionHeading>
        <div className="space-y-2">
          {SYSTEM_MAP.map((b) => (
            <div key={b.name} className="rounded-xl border border-line bg-surface p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{b.name}</p>
              </div>
              <p className="mt-0.5 text-sm text-ink-muted">{b.role}</p>
              <dl className="mt-2.5 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-ink-faint">Charged by</dt>
                  <dd className="text-sm text-ink-muted">{b.fedBy}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-ink-faint">Powers</dt>
                  <dd className="text-sm text-ink-muted">{b.feeds}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Two takeaways hide in that map. One: the engine and the trolling motor have completely
          separate power — you can never strand yourself by fishing too hard, because the
          starting battery never worked while you trolled. Two: the trolling pack has exactly one
          way to refill — the wall cord.
        </p>
      </section>

      {/* battery school */}
      <section className="mt-8">
        <SectionHeading icon={BookOpen}>Battery school — the four ideas</SectionHeading>
        <div className="space-y-2">
          {SCHOOL.map((c) => (
            <GuideCard key={c.title} item={c} />
          ))}
        </div>
      </section>

      {/* chargers */}
      <section className="mt-8">
        <SectionHeading icon={BatteryCharging}>Where the power comes back from</SectionHeading>
        <div className="space-y-2">
          {CHARGERS.map((c) => (
            <GuideCard key={c.title} item={c} />
          ))}
        </div>
      </section>

      {/* living with it */}
      <section className="mt-8">
        <SectionHeading icon={Gauge}>Living with it</SectionHeading>
        <div className="space-y-2">
          {LIVING.map((c) => (
            <GuideCard key={c.title} item={c} />
          ))}
        </div>
      </section>

      {/* cross-links */}
      <section className="mt-8">
        <SectionHeading icon={PlugZap}>Related pages</SectionHeading>
        <div className="rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-ink-muted">
          <p>
            The safe battery <strong className="text-ink">disconnect procedure</strong> (negative
            first, positive last) lives on the{" "}
            <Link href="/boat-report/findings" className="font-semibold text-accent hover:underline">
              findings page
            </Link>{" "}
            with the rest of the reference cards. Seasonal battery chores are tracked on the{" "}
            <Link href="/boat-report/service" className="font-semibold text-accent hover:underline">
              service page
            </Link>
            , and the future LiveScope battery plan is on the{" "}
            <Link href="/boat-report/roadmap" className="font-semibold text-accent hover:underline">
              roadmap
            </Link>
            .
          </p>
        </div>
      </section>

      {/* footer */}
      <p className="mt-8 mb-4 flex items-start gap-2 text-xs leading-relaxed text-ink-faint">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Specs verified August 2026 against Minn Kota and BRP documentation: MK 315D = 3 banks ×
        5A, flooded/AGM only; E-TEC 115 charging = 50A net (10A at idle, full by 2,000 RPM),
        battery minimum 675 CCA / 845 MCA; Ulterra 80 max draw = 56A at 24V behind a 60A
        breaker. Per-speed draws and runtimes are owner-reported estimates, not published specs.
      </p>
    </main>
  );
}
