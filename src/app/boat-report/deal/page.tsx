import Link from "next/link";
import { ArrowLeft, DollarSign, ListOrdered, MessageSquareQuote, Scale, XCircle } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Deal day · 2018 Alumacraft Pro 185",
  description:
    "The in-person negotiation playbook: numbers to hold, the sequence, leverage list, and the walk protocol.",
};

/* ---------------------------------- data ---------------------------------- */

const RAILS: { label: string; value: string; note: string }[] = [
  {
    label: "Fight for",
    value: "$16,500",
    note: "with seat re-stitch, rigging boot, and the Ulterra remote written in",
  },
  {
    label: "Acceptable ceiling",
    value: "$17,250",
    note: "only with the FULL package: seats, impeller service, boot, remote — his shop does the work",
  },
  {
    label: "Walk above",
    value: "$17,500",
    note: "without the package (or any refused verification, at any price)",
  },
  {
    label: "Trade floor",
    value: "$5,250",
    note: "defend the $5,500; concede at most ~$250 for the disclosed crack",
  },
];

const MATH: string[] = [
  "Every $1,000 off the boat = ~$1,080 cash saved (price + tax shrink together).",
  "Judge everything by NET difference after trade, then out-the-door. Target net: $11,000–11,750. Target OTD: ~$12,100–12,900.",
  "Full ask OTD is ~$14,775 — that number is the sticker wearing a costume, not a deal.",
  "A $500 trade haircut = $500 on the boat price. Same dollars, different pocket. Say so out loud if he shuffles.",
];

const SEQUENCE: { step: string; detail: string }[] = [
  {
    step: "Present the trade first — crack disclosure and the Garmin exclusion in the same breath.",
    detail:
      "\"Two things — small crack near the bottom seam, been there a while, never leaked; and we're keeping the Garmin electronics, the trade is without them. Your guys will move them over for us.\" His appraisal starts on the right basis, your credibility stays intact, and the transfer enters the deal as a given.",
  },
  {
    step: "Get HIS trade number before any boat-price talk.",
    detail:
      "If he asks \"where do we need to be overall?\" flip it: \"First tell me where you land on my boat, then let's talk about yours.\" Two separate numbers, always.",
  },
  {
    step: "Lock the verification schedule.",
    detail:
      "Water test to full rated RPM (5,500–6,000) and the EMM printout from his shop — both completely standard asks; sea trials are the boat world's test drive. If the water test truly can't happen: EMM + compression + a hose run at the lot, PLUS a written line — \"deposit refundable if the engine fails to reach rated RPM at delivery.\" Never skip both the trial and the paper. If he stalls on all of it, that IS the answer — no price fixes an unverifiable engine.",
  },
  {
    step: "Then, and only then, the number.",
    detail:
      "Calm recap, three beats: the listing advertised 150hp on a 115 boat; it stored outside (show the console/seat photos); the same money buys supported-brand comps. Then: \"$16,500 with the seats, boot, and remote handled — I can leave a deposit today.\" And stop talking.",
  },
  {
    step: "Trade counters for value, not just price.",
    detail:
      "If he's stuck on the number, move the work instead: impeller service, seat repair, boot, remote — his shop cost is half what it's worth to you. \"You hold your price closer if your shop sorts the list\" lets him win the number while you win the deal.",
  },
  {
    step: "Everything on the buyer's order in writing.",
    detail:
      "Itemized OTD (price, trade, tax, every fee), the work items, the remote, and: \"Dealer to transfer buyer's Garmin unit, transducer, and mount to new boat — installed, wired, and water-tested — at no charge, before delivery.\" Plus \"deposit refundable pending water test and EMM report.\" Verbal promises are decoration; the buyer's order is the deal. And the Helix stays with the boat — bow-mount it or sell it, it's yours.",
  },
];

const LEVERAGE: string[] = [
  "The listing error: 150hp advertised, 115 on the transom. Indisputable — lead with it.",
  "Comps on your phone: 2018 Tracker 190 TX, Mercury 115 Pro XS, 70 hrs — $18,495. Garage-kept 2020 Pro 185, Yamaha — $20,995.",
  "The findings photo roll: peeling console, hazed screen, cracked boot, split seams, missing remote.",
  "Dead brand math: parts pledged into ~2030, resale discount follows the boat. You absorb that risk — the price should share it.",
  "Zero service records — his shop can verify the engine, but nobody can conjure its history.",
  "The calendar: it's August, the boat sat, and winter storage season is coming for his lot space.",
  "You: cleaned trade in his lot, financing sorted, deposit in pocket, can close this week. Serious buyers are rarer than boats.",
];

const LINES: { when: string; say: string }[] = [
  {
    when: "After you name your number",
    say: "Nothing. Silence. First one to speak moves the price toward the other guy.",
  },
  {
    when: "\"I don't have that much room\"",
    say: "\"I hear you. What can you do?\" — then silence again. Make him name a number; you can't negotiate against a sticker.",
  },
  {
    when: "He offers service instead of dollars",
    say: "\"That works if the number works. $17,000 with all of it done and the remote in my hand, and we're shaking hands today.\"",
  },
  {
    when: "\"Someone else is coming to look at it\"",
    say: "\"Understood — my offer's good with a deposit today. I can't speak for next week.\" Pleasant, unbothered.",
  },
  {
    when: "He bumps the trade instead of cutting the price",
    say: "\"Same dollars either pocket — let's just talk net. I need the net difference around eleven thousand.\"",
  },
];

const WALK: string[] = [
  "Walk pleasantly if: he won't schedule the water test or EMM pull, or holds above $17,500 with nothing included.",
  "The exit line: \"I'm not there, but my offer stands for a week — you've got my number. I'm buying something this month either way.\" Then actually leave.",
  "Walking a dealer-owned boat in August is a tactic with a return date, not a goodbye. Check back in 2–3 weeks: \"Still have the Alumacraft?\" costs nothing.",
  "Keep the saved searches running meanwhile — if a supported-brand rig shows up near your money first, you win either way.",
  "Unconditional walk triggers (no price fixes these): refused verification, bad EMM report, engine can't reach rated RPM, transom flex, soft deck.",
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

export default function DealPage() {
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
          <h1 className="truncate text-lg font-semibold tracking-tight">Deal day playbook</h1>
          <p className="truncate text-xs text-ink-muted">
            Bring the trade · get his numbers · negotiate · decide
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* rails */}
      <section>
        <SectionHeading icon={DollarSign}>The numbers — hold these</SectionHeading>
        <div className="grid grid-cols-2 gap-2">
          {RAILS.map((r) => (
            <div key={r.label} className="rounded-xl border border-line bg-surface p-3.5">
              <p className="text-[11px] uppercase tracking-wide text-ink-faint">{r.label}</p>
              <p className="mt-0.5 text-lg font-semibold">{r.value}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">{r.note}</p>
            </div>
          ))}
        </div>
        <ul className="mt-2 space-y-1.5 rounded-xl border border-line bg-surface p-4">
          {MATH.map((m) => (
            <li key={m} className="text-sm leading-relaxed text-ink-muted">
              · {m}
            </li>
          ))}
        </ul>
      </section>

      {/* sequence */}
      <section className="mt-8">
        <SectionHeading icon={ListOrdered}>The sequence — in this order</SectionHeading>
        <ol className="space-y-2">
          {SEQUENCE.map((s, i) => (
            <li key={s.step} className="flex gap-3 rounded-xl border border-line bg-surface p-4">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[11px] font-semibold text-ink-muted">
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{s.step}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                  {s.detail}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* leverage */}
      <section className="mt-8">
        <SectionHeading icon={Scale}>Leverage — your ammo, in strength order</SectionHeading>
        <ul className="space-y-1.5 rounded-xl border border-line bg-surface p-4">
          {LEVERAGE.map((l) => (
            <li key={l} className="text-sm leading-relaxed text-ink-muted">
              · {l}
            </li>
          ))}
        </ul>
      </section>

      {/* lines */}
      <section className="mt-8">
        <SectionHeading icon={MessageSquareQuote}>Lines for the moments that matter</SectionHeading>
        <ul className="space-y-2">
          {LINES.map((l) => (
            <li key={l.when} className="rounded-xl border border-line bg-surface p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                {l.when}
              </p>
              <p className="mt-1 text-sm leading-relaxed">{l.say}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* walk */}
      <section className="mt-8 mb-4">
        <SectionHeading icon={XCircle}>The walk protocol</SectionHeading>
        <ul className="space-y-1.5 rounded-xl border border-line bg-surface p-4">
          {WALK.map((w) => (
            <li key={w} className="text-sm leading-relaxed text-ink-muted">
              · {w}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
