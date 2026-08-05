import Link from "next/link";
import { ChevronRight, MapPin, Anchor, Ship } from "lucide-react";
import { getWaters } from "@/lib/waters";
import { SpeciesChip } from "@/components/ui/SpeciesChip";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function WatersPage() {
  const waters = getWaters();
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-6 sm:px-6">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">fih</h1>
          <p className="mt-1 text-sm text-ink-muted">
            NY fishing companion · spots, plans, and the log
          </p>
        </div>
        <ThemeToggle />
      </header>

      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">
        Waters
      </h2>
      <ul className="space-y-3">
        {waters.map((w) => (
          <li key={w.slug}>
            <Link
              href={`/water/${w.slug}`}
              className="group block rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/40"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold">{w.name}</h3>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-muted">
                    <MapPin className="h-3 w-3" /> {w.region}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-ink-faint transition-transform group-hover:translate-x-0.5" />
              </div>
              {w.blurb && (
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{w.blurb}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {w.species.map((s) => (
                  <SpeciesChip key={s} id={s} />
                ))}
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-faint">
                <Anchor className="h-3 w-3" />
                {w.spots.length} spots · {w.launches.length} launches
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link
          href="/boat-report"
          className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
        >
          <Ship className="h-4 w-4" />
          Buyers report · 2018 Alumacraft Pro 185
          <ChevronRight className="h-4 w-4 text-ink-faint transition-transform group-hover:translate-x-0.5" />
        </Link>
        <p className="mt-1.5 flex gap-3 pl-[22px] text-xs">
          <Link href="/boat-report/findings" className="text-ink-faint hover:text-accent">
            Findings
          </Link>
          <Link href="/boat-report/deal" className="text-ink-faint hover:text-accent">
            Deal day
          </Link>
          <Link href="/boat-report/inspect" className="text-ink-faint hover:text-accent">
            Checklist
          </Link>
        </p>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-ink-faint">
        More NYS waters (Champlain, Oneida, Lake George…) are a data file away —
        each water ships as researched JSON, no code changes.
      </p>
    </main>
  );
}
