import Link from "next/link";
import { ArrowLeft, Archive, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Purchase archive · 2018 Alumacraft Pro 185",
  description:
    "The complete record of how we bought the boat: the speed reality check, red flags and how they resolved, market analysis, comparables, and the paper trail.",
};

/* ------------------------- buyer-era record, preserved ---------------------- */

const SPEED_TABLE: { config: string; speed: string; source: string }[] = [
  { config: "The 57 mph that caught our eye", speed: "57 mph", source: "No published test of this hull supports it" },
  { config: "Alumacraft + E-TEC 115 H.O. (BoatTEST)", speed: "41 mph", source: "Measured, with the engine this boat has" },
  { config: "Alumacraft 185 hull + E-TEC 150 (BoatTEST)", speed: "45.3 mph", source: "Measured on the sister Edge 185 hull" },
  { config: "Smaller Pro 175 + E-TEC 150 (owner GPS)", speed: "56 mph", source: "Owner report — lighter hull, ideal prop, light load" },
  { config: "OUR BOAT — measured at the water test", speed: "47 mph", source: "GPS, wide open, trimmed out. The final answer" },
];

const RED_FLAGS: { title: string; outcome: string }[] = [
  {
    title: "The listing advertised 150 hp on a 115 boat",
    outcome:
      "The dealer's description said 115, the spec table said a 150 hp E150 — impossible, since the hull is rated 115 max. Confirmed in person and by the EMM model code: E-TEC 115 H.O. G1. Became the strongest price lever in the negotiation.",
  },
  {
    title: "Evinrude no longer exists",
    outcome:
      "BRP killed the brand in May 2020; parts pledged into ~2030, EMM (~$3k) the known failure. Priced into the deal, mitigated by CR's servicing Evinrude in-house 15 minutes away, and managed by the keep-it-past-5-years / sell-before-2029 plan.",
  },
  {
    title: "72.5 hours in eight seasons — the boat sat",
    outcome:
      "Resolved better than hoped: the EMM showed the self-winterization routine ran all nine falls and the engine never overheated once. The one aging item that remained — the impeller — is on the service schedule.",
  },
  {
    title: "Vermont one-owner, zero service records",
    outcome:
      "The EMM report became the service history: 72:31 verified hours, no active faults, ideal troller's RPM histogram. Title verified against HIN ACBW8951F718 and transferred clean at closing.",
  },
  {
    title: "Outdoor storage wear, found item by item",
    outcome:
      "Peeling console, hazed Helix, cracked rigging boot, split seat seams, missing remote (later found). All documented on the findings page with photos; seats fixed by the dealer, boot on the DIY list, console covered by the restoration guide and the BBT plate plan.",
  },
];

const COMPARABLES: {
  name: string;
  hull: string;
  price: string;
  speed: string;
  verdict: string;
}[] = [
  { name: "Lund Impact 1775", hull: "Deep-V · riveted", price: "$18k–25k used", speed: "~44 mph w/115", verdict: "The best single alternative — trades casting decks and a few mph for a big-water hull. Riveted, so same salt caveats." },
  { name: "Tracker Targa V-18", hull: "Deep-V · welded", price: "~$24–25k (2017–18)", speed: "45.5 mph w/150", verdict: "Best on-paper fit for all four missions, ~$5k above budget, lesser fit/finish and resale." },
  { name: "Crestliner 1750 Fish Hawk", hull: "Deep-V · welded", price: "high teens–mid $20s", speed: "42–44 mph w/115", verdict: "Welded hull suits the salt plan; snug for five and scarce used." },
  { name: "Ranger RT188", hull: "Mod-V bass · welded", price: "mid $20s (2018)", speed: "44–50 mph w/115", verdict: "Best-built aluminum bass boat, but the same hull category done pricier." },
  { name: "Tracker Pro Team 190 TX", hull: "Mod-V bass · riveted", price: "$15–20k (2017–18)", speed: "~43 mph w/90", verdict: "Cheaper, less boat — the Pro 185's package beat it. (A Mercury-powered 2018 at $18,495 was the key price comp.)" },
  { name: "Starcraft Renegade 178", hull: "Semi-V · riveted", price: "high $20s+ (2018)", speed: "45+ mph w/150", verdict: "Sensible compromise hull; used market wanted more money than it's worth to us." },
];

const PRICE_STORY = [
  "Listed at $18,995. First-round research called that fair; the deep market re-check with live comps said overpriced by $2,500–4,500 as inspected (fair retail $15,000–16,500 after the clean EMM firmed the floor).",
  "The negotiation: opened at $16,000, dealer held firm citing no wiggle room, the trade-in crack absorbed the remaining leverage. Closed at $14,800 total out the door after the $5,500 Mirrocraft trade — effectively full retail, traded knowingly for the verified engine history, seat repair, local Evinrude service, and zero logistics.",
  "The honest ledger: from the family's seat, full price. From the buyer's seat, dad's boat absorbed the premium — $14,800 cash for a package fairly valued at $15–16.5k. The deal is won retroactively by keeping the boat 5+ years, using it hard, and maintaining the engine that made it worth buying.",
];

const QUESTIONS = [
  "Which engine is it exactly — read me the model number off the transom plate? (Your listing says both 115 and 150.)",
  "Can you run an EMM diagnostic report while we watch?",
  "How was it stored — inside, covered, batteries on a maintainer?",
  "Has it ever been in salt or brackish water?",
  "When were the water pump impeller and gearcase oil last serviced?",
  "Which Helix model is on the dash, and what transducer?",
  "What batteries are aboard, how old, and is there an onboard charger?",
  "Title in hand, no liens, HIN matches the paperwork?",
  "Any warranty, and will you hold it with a refundable deposit pending a water test?",
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
  { label: "boats.com — Lund 1775 Impact review", url: "https://www.boats.com/reviews/lund-1775-impact-sport-deep-v-value-family-fun/" },
  { label: "Boating Mag — protecting aluminum boats from saltwater", url: "https://boatingmag.com/protecting-aluminum-boats-from-salt-water-corrosion/" },
  { label: "E-TEC owners group — trolling with big E-TECs", url: "https://www.etecownersgroup.com/post/trolling-with-150-hp-etec-4773064" },
  { label: "In-Depth Outdoors — 18-ft mod-V boats in rough water", url: "https://www.in-depthoutdoors.com/community/forums/topic/18-foot-mod-v-boats-in-rough-water/" },
];

const RECORD_LINKS = [
  { href: "/boat-report/findings", label: "Inspection findings", note: "Photos, verdicts, EMM readout, restoration guide, owner's reference" },
  { href: "/boat-report/deal", label: "Deal day playbook", note: "The negotiation rails, closing checklist, and how the deal actually landed" },
  { href: "/boat-report/water-test", label: "Water test", note: "The final exam — passed at 47 mph GPS" },
  { href: "/boat-report/inspect", label: "On-the-lot checklist", note: "The 17-point self-inspection, reusable for any future boat" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-xl border border-line bg-surface">
      <summary className="flex cursor-pointer list-none items-center gap-2.5 p-4">
        <span className="text-sm font-semibold">{title}</span>
        <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-ink-faint transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-line p-4">{children}</div>
    </details>
  );
}

export default function ArchivePage() {
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
          <h1 className="truncate text-lg font-semibold tracking-tight">Purchase archive</h1>
          <p className="truncate text-xs text-ink-muted">
            How we bought it · August 2026 · kept for resale day
          </p>
        </div>
        <ThemeToggle />
      </header>

      <p className="mb-4 flex items-start gap-2 text-sm leading-relaxed text-ink-muted">
        <Archive className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
        The complete buyer&apos;s record: every claim checked, every flaw priced, every number
        reasoned. Useful again the day we sell or upgrade — this is the documentation trail most
        used boats never get.
      </p>

      <div className="space-y-2">
        <Section title="The price story — $18,995 ask to $14,800 out the door">
          <div className="space-y-2">
            {PRICE_STORY.map((p) => (
              <p key={p.slice(0, 30)} className="text-sm leading-relaxed text-ink-muted">
                {p}
              </p>
            ))}
          </div>
        </Section>

        <Section title="The speed reality check — 57 claimed, 47 measured">
          <div className="overflow-x-auto">
            <table className="w-full min-w-105 text-sm">
              <thead>
                <tr className="border-b border-line text-left text-[11px] uppercase tracking-wide text-ink-faint">
                  <th className="pb-2 pr-3 font-semibold">Setup</th>
                  <th className="pb-2 pr-3 font-semibold">Top speed</th>
                  <th className="pb-2 font-semibold">Source</th>
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
        </Section>

        <Section title="The red flags — and how every one resolved">
          <ul className="space-y-3">
            {RED_FLAGS.map((f) => (
              <li key={f.title}>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{f.outcome}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="The field we compared it against">
          <ul className="space-y-3">
            {COMPARABLES.map((b) => (
              <li key={b.name}>
                <p className="text-sm font-semibold">
                  {b.name}{" "}
                  <span className="font-normal text-xs text-ink-muted">
                    {b.hull} · {b.price} · {b.speed}
                  </span>
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{b.verdict}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="The nine dealer questions (reusable for any used boat)">
          <ol className="list-decimal space-y-1.5 pl-5">
            {QUESTIONS.map((q) => (
              <li key={q} className="text-sm leading-relaxed text-ink-muted">
                {q}
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Sources">
          <ul className="space-y-1">
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
        </Section>
      </div>

      <h2 className="mt-8 mb-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">
        The full record
      </h2>
      <ul className="mb-4 space-y-2">
        {RECORD_LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group block rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/40"
            >
              <p className="text-sm font-semibold">{l.label}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{l.note}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
