import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  PlayCircle,
  ShieldAlert,
  ShoppingCart,
  Snowflake,
  Wrench,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Winterize · E-TEC 115 H.O.",
  description:
    "Step-by-step fall winterization for our Evinrude E-TEC 115 H.O. G1: fuel, the built-in self-fogging run, gearcase oil, prop, grease, and boat-side storage, with the tool for every step.",
};

/* ---------------------------------- data ---------------------------------- */

type Buy = { item: string; why: string; cost: string; have?: boolean };

const BUY: Buy[] = [
  {
    item: "Evinrude HPF Pro gearcase lube kit (quart + pump)",
    why: "Bought at CR's. The factory-fill gear oil for E-TEC engines.",
    cost: "$45",
    have: true,
  },
  {
    item: "Extra HPF Pro, 10 oz tube (0779750)",
    why: "This gearcase holds 31.6 to 43 oz depending on type, and one quart minus what stays in the pump can come up short.",
    cost: "~$10–15",
  },
  {
    item: "Gearcase screw seals ×4",
    why: "Never reuse them; they're the #1 leak point. Flat-headed screw takes nylon washer 0311598, recessed head takes O-ring 0333572. Ask CR's for the ones that fit.",
    cost: "~$5–12",
  },
  {
    item: "Evinrude 2+4 Fuel Conditioner, 8 oz (0766216)",
    why: "The only fuel additive BRP approves for E-TEC. Storage dose ≈ 1 oz per 2.5 gal. If CR's suggested a different stabilizer, ask for this one.",
    cost: "~$8–12",
  },
  {
    item: "1-1/16\" prop wrench or socket",
    why: "Prop nut size on this engine. The Anvil set stops at 22 mm, and the hitch wrench's 1-1/8\" end would round the nut. T-H Marine Prop Master (PMW-1-DP) or a 6-point socket.",
    cost: "~$10–25",
  },
  {
    item: "New cotter pin for the prop nut",
    why: "Never reuse one. Bring the old one to the counter to match, or buy the V4 prop hardware kit (5005034) if the thrust washer looks worn.",
    cost: "~$2 (kit $45+)",
  },
  {
    item: "Large square-shank flat-blade screwdriver",
    why: "For the slotted gearcase drain and vent screws. Square shank lets you put a wrench on it if a screw is stuck. Check yours aren't Allen-head first.",
    cost: "~$10",
  },
  {
    item: "Grease gun + Evinrude Triple-Guard 14 oz (0775776)",
    why: "For the swivel bracket and tilt tube fittings, the prop shaft, and battery terminals.",
    cost: "~$30–50",
  },
  {
    item: "Drain pan (2 qt or more) + shop rags + nitrile gloves",
    why: "Catches the old gear oil and lets you read its color.",
    cost: "~$15",
  },
  {
    item: "Garden hose (any) + a 2×4 offcut",
    why: "The hose feeds water into the engine's flush port during the self-fog run. The wood block stops the prop turning while you loosen the nut.",
    cost: "Free",
    have: true,
  },
];

type Step = {
  title: string;
  tagline: string;
  tools: string;
  steps: string[];
  watch?: string[];
};

const STEPS: Step[] = [
  {
    title: "1. Fuel: top off and stabilize",
    tagline: "Fill the tank, don't leave it at 30%",
    tools: "Gas can or gas station · 2+4 Fuel Conditioner · the bottle's measuring cap",
    steps: [
      "Fill the tank to about 95% (~19 gal). BoatUS calls leaving it low a mistake: an empty space in the tank pulls moisture in, and today's ethanol gas absorbs it. Ethanol-free gas for the top-off is a bonus, not a requirement.",
      "Add 2+4 for the WHOLE tank at the storage rate: about 1 oz per 2.5 gal, so roughly 7–8 oz for a full tank. Read the bottle label; it's the final word on dosage.",
      "Easiest timing: add it on the last lake trip of the year and run home on treated fuel. Otherwise, it gets pumped through during step 3.",
      "Don't plug the tank vent, and never run the engine until it starves for fuel. The E-TEC's high-pressure fuel pump is cooled by the fuel itself.",
    ],
  },
  {
    title: "2. Prop off and inspect",
    tagline: "BRP requires the prop off for winterizing on a trailer",
    tools: "1-1/16\" prop wrench or socket · 2×4 block · needle-nose pliers · Triple-Guard",
    steps: [
      "Key OFF and the kill-switch lanyard pulled first. The prop must never turn under power with your hands near it.",
      "Straighten and pull the cotter pin with pliers. Wedge the 2×4 between a blade and the anti-ventilation plate, then loosen the nut counterclockwise.",
      "Slide off the nut, washer, prop, and thrust hub. Lay them out in order on a rag; they go back the same way.",
      "Look at the shaft right behind where the prop sat. Wrapped fishing line is the classic killer of the prop-shaft seal, which lets water into the gearcase. Pick it all out.",
      "Wipe the shaft and coat it with Triple-Guard. Leave the prop off until step 6 is done (some owners leave it off all winter as a theft deterrent).",
    ],
  },
  {
    title: "3. The self-fogging run",
    tagline: "The engine coats its own insides with oil and shuts itself off",
    tools: "Garden hose on the flush port · the key · the throttle's neutral fast-idle button",
    steps: [
      "Engine straight down (vertical). Thread the garden hose onto the engine's flush port and turn the water on. Use a plain hose end; small quick-connect adapters can blow the port fitting loose.",
      "Shift to NEUTRAL and keep it there the entire time. Engage the control's neutral fast-idle (throttle-only) button so the handle moves the throttle without shifting.",
      "If you haven't run stabilized fuel through yet: start it and let it fast-idle on the hose for about 5 minutes. That fills the vapor separator and injectors with treated fuel and warms it up. Shut it off.",
      "Now the winterize sequence (BRP's 115–200 hp procedure): advance the throttle to HALF, then start the engine. It idles and the SystemCheck warning lights come on.",
      "When the lights go off (about 15 seconds), pull the throttle back to idle.",
      "About 15 seconds later, push the throttle to FULL fast idle. The SystemCheck lights start FLASHING: winterize mode is on.",
      "Hands off. The engine goes to fast idle on its own, fogs itself for about a minute, then shuts itself off. That shutdown is the sign it worked.",
      "Key OFF, water off, hose off. Do not restart the engine after this; that undoes the fogging. The EMM logs it as Code 21, \"Winterization Activated,\" the same entry the previous owner's nine winters left in the report.",
    ],
    watch: [
      "If the lights don't flash, or the RPM climbs above fast idle (over ~3,000 RPM means it may be in gear), turn it off immediately and start the sequence over.",
      "Sources disagree on the opening throttle position (half vs full). If half doesn't trigger the flashing lights, try full on the next attempt. Watch the video below once before you start.",
      "Never run it without water flowing, not even for a few seconds.",
      "Oil dripping from the skeg afterward is normal fog oil, not a gearcase leak. Set a rag or pan under it.",
      "CR's can also trigger winterize mode with Evinrude's diagnostic software if the sequence won't take.",
    ],
  },
  {
    title: "4. Gearcase oil",
    tagline: "Water left in old gear oil can freeze and crack the gearcase",
    tools: "Flat-blade screwdriver · HPF Pro kit + pump · extra 10 oz tube · 4 new seals · drain pan · rags",
    steps: [
      "Engine vertical. Find the two slotted screws on the side of the gearcase: the LOWER one near the skeg is drain/fill, the UPPER one above the cavitation plate is vent/level. Leave any other screw alone (a Phillips screw near the drain can hold internal shift parts).",
      "Pan underneath. Remove the lower screw, then the upper one; oil flows once the vent is open. Let it drain completely.",
      "READ THE OLD OIL. Clean amber or dark = good. Milky or creamy = water got in past a seal: tell CR's before spring. Metal flakes or a burnt smell = see CR's. A little fuzz on a magnetic drain screw is normal; chunks aren't.",
      "Screw the pump onto the HPF Pro bottle and thread its hose into the LOWER hole. Pump slowly (fast pumping traps air pockets) until oil comes out of the upper hole with no bubbles. Switch to the 10 oz tube if the quart runs out.",
      "With the pump still attached, install the UPPER screw first with a new seal. That vacuum keeps oil from running out. Then pull the pump hose and quickly install the LOWER screw with a new seal.",
      "Snug, don't crank: spec is 60–84 inch-pounds (7–9.5 N·m), about wrist-tight on a screwdriver. Wipe the case clean so any future leak is easy to spot.",
    ],
    watch: [
      "BRP's normal interval is every 3 years or 300 hours. We don't know when it was last done, so it gets done this fall to set the baseline.",
    ],
  },
  {
    title: "5. Grease the fittings",
    tagline: "Swivel bracket and tilt tube",
    tools: "Grease gun with Triple-Guard · rag",
    steps: [
      "Trim the engine all the way down, then steer hard to one side and the other to reach each fitting.",
      "Swivel bracket fitting on the PORT side, plus the two FORWARD fittings for the tilt tube and stern brackets.",
      "Wipe each fitting, pump until fresh grease squeezes out at the bracket, then wipe the excess.",
      "Mechanical steering: wipe and lightly grease the shiny steering cable rod where it slides into the tilt tube.",
    ],
  },
  {
    title: "6. Prop back on",
    tagline: "Same order it came off, new cotter pin",
    tools: "1-1/16\" wrench or socket · 2×4 · new cotter pin · pliers",
    steps: [
      "Thrust hub (shoulder facing aft toward you), prop, washer, nut, in the order you laid them out.",
      "Block the prop with the 2×4. Tighten the nut snug, about 10–12 ft-lb (120–144 inch-pounds) on this 20\" gearcase with the castle nut and cotter pin. If an aftermarket hub kit came with different instructions, those win.",
      "Line up a slot in the nut with the hole in the shaft by tightening a little further, never by backing off. New cotter pin through, legs bent around the nut.",
    ],
  },
  {
    title: "7. Engine and fluids",
    tagline: "Store it vertical and top up the oil",
    tools: "Gallon of XD100 · rag",
    steps: [
      "Leave the engine vertical (straight down) so all the cooling water drains from the powerhead. Never store it with the gearcase higher than the powerhead.",
      "Top up the XD100 oil tank under the cowl. Not a BRP requirement, but a full tank limits condensation and it's ready in spring.",
      "If a water-separating fuel filter is mounted on the boat's fuel line, replace it now. Water sitting in its bowl can freeze and crack it. The filter under the engine cover is part of CR's 3-year service.",
      "Spark plugs stay in. The E-TEC fogs through its injectors, so there's nothing to spray in the cylinders.",
    ],
  },
  {
    title: "8. Boat, batteries, cover",
    tagline: "The non-engine half of the job",
    tools: "Wire brush · Triple-Guard · DampRid · Fresh Cab pouches · extension cord",
    steps: [
      "Livewells: drain them completely and run each pump for a few seconds dry to push water out of the lines. Trapped water in a pump or its plumbing freezes and cracks.",
      "Bilge dry, drain plug OUT, bow cranked high on the tongue jack so rain and snowmelt run out the stern.",
      "Batteries: battery terminals clean and tight with a dab of Triple-Guard (BRP's pick over dielectric grease). Then either leave the MK 315D plugged in all winter or plug it in overnight once a month. A charged battery doesn't freeze; a dead one does, at about 20°F.",
      "Electronics home: the Garmin pops off its bail mount, and the Ulterra remote comes inside too.",
      "Critters: a couple of Fresh Cab pouches in the rod locker and stern compartments. Mice love winter boats and wiring.",
      "Moisture: a DampRid tub in the stern compartment, then the cover on with its support pole so snow can't pool.",
    ],
  },
];

const VIDEOS: { title: string; url: string; note: string }[] = [
  {
    title: "How To Winterize Your Evinrude E-TEC G1",
    url: "https://www.youtube.com/watch?v=TvYMGo2FRuw",
    note: "First-generation E-TEC, the same engine family as ours. Watch this one before step 3.",
  },
  {
    title: "Evinrude E-TEC Auto Winterization Instructions",
    url: "https://www.youtube.com/watch?v=PvNBF8Az0ic",
    note: "Short walk-through of the throttle and SystemCheck-light sequence.",
  },
  {
    title: "Evinrude ETEC Gearcase Oil Change Instructions",
    url: "https://www.youtube.com/watch?v=n7PUP-zvNWc",
    note: "First-generation E-TEC gearcase oil change with a pump, for step 4.",
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

function StepCard({ step }: { step: Step }) {
  return (
    <details className="group rounded-xl border border-line bg-surface">
      <summary className="cursor-pointer list-none p-4">
        <span className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold">{step.title}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-ink-faint transition-transform group-open:rotate-180" />
        </span>
        <span className="mt-0.5 block text-sm text-ink-muted">{step.tagline}</span>
      </summary>
      <div className="space-y-3 border-t border-line p-4">
        <p className="flex items-start gap-2 rounded-lg bg-surface-2 px-3 py-2 text-sm leading-relaxed">
          <Wrench className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          <span>
            <span className="font-semibold">Tools: </span>
            <span className="text-ink-muted">{step.tools}</span>
          </span>
        </p>
        <ol className="space-y-2">
          {step.steps.map((s, i) => (
            <li key={s.slice(0, 40)} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
              <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        {step.watch && (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
              Watch out for
            </p>
            <ul className="mt-1.5 space-y-1.5">
              {step.watch.map((w) => (
                <li key={w.slice(0, 40)} className="text-sm leading-relaxed text-ink-muted">
                  · {w}
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

export default function WinterizePage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-4 sm:px-6">
      <header className="mb-4 flex items-center gap-2">
        <Link
          href="/boat-report/service"
          aria-label="Back to the service log"
          className="rounded-full p-2 text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold tracking-tight">Winterize</h1>
          <p className="truncate text-xs text-ink-muted">
            E-TEC 115 H.O. G1 · every fall before the first hard freeze
          </p>
        </div>
        <ThemeToggle />
      </header>

      <p className="mb-6 text-sm leading-relaxed text-ink-muted">
        The previous owner ran the engine&apos;s built-in winterize routine all nine falls, and
        it&apos;s the main reason this E-TEC was worth buying. This is the full job in order,
        with the tool for each step. Plan on a dry afternoon in the driveway with a garden hose.{" "}
        <strong className="text-ink">
          The order matters: fuel first, then the fogging run, then the gearcase.
        </strong>
      </p>

      {/* buy list */}
      <section>
        <SectionHeading icon={ShoppingCart}>Get these before you start</SectionHeading>
        <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
          {BUY.map((b) => (
            <li key={b.item} className="flex items-baseline justify-between gap-3 px-4 py-3">
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-sm font-medium">
                  {b.item}
                  {b.have && (
                    <span className="rounded-full bg-emerald-600/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
                      Have it
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">{b.why}</span>
              </span>
              <span className="shrink-0 text-sm font-semibold tabular-nums">{b.cost}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs leading-relaxed text-ink-faint">
          Already covered by what we own: the Anvil socket set handles battery terminal nuts and
          anode bolts; the M12 ratchet speeds up both. No flush muffs needed: this engine winterizes
          on a garden hose screwed into its flush port.
        </p>
      </section>

      {/* steps */}
      <section className="mt-8">
        <SectionHeading icon={Snowflake}>The job, in order</SectionHeading>
        <div className="space-y-2">
          {STEPS.map((s) => (
            <StepCard key={s.title} step={s} />
          ))}
        </div>
      </section>

      {/* videos */}
      <section className="mt-8">
        <SectionHeading icon={PlayCircle}>Watch first</SectionHeading>
        <ul className="space-y-2">
          {VIDEOS.map((v) => (
            <li key={v.url}>
              <a
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/40"
              >
                <span className="text-sm font-semibold text-accent">{v.title}</span>
                <span className="mt-0.5 block text-sm text-ink-muted">{v.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* footer */}
      <p className="mt-8 mb-4 flex items-start gap-2 text-xs leading-relaxed text-ink-faint">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Compiled November 2026 from BRP service-manual and operator-guide excerpts for the 115–200
        hp E-TEC, BoatUS fuel guidance, and owner forums. Not confirmed against our exact 2018
        operator&apos;s guide: the opening throttle position, gearcase capacity for our case type,
        and the gearcase screw head style. Look at the engine before buying parts, and when in
        doubt, call CR&apos;s.
      </p>
    </main>
  );
}
