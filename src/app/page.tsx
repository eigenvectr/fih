import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Anchor } from "lucide-react";
import { getWaters } from "@/lib/waters";
import { SpeciesChip } from "@/components/ui/SpeciesChip";
import { ThemeToggle } from "@/components/ThemeToggle";

const BOAT_LINKS = [
  { href: "/boat-report/service", label: "Service" },
  { href: "/boat-report/roadmap", label: "Roadmap" },
  { href: "/boat-report/findings", label: "Findings" },
  { href: "/boat-report/power", label: "Power" },
  { href: "/boat-report/archive", label: "Archive" },
];

export default function HomePage() {
  const waters = getWaters();
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-6 sm:px-6">
      <header className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">fih</h1>
          <p className="mt-1 text-sm text-ink-muted">
            NY fishing companion · the boat, the waters, the log
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* boat hero */}
      <section className="overflow-hidden rounded-xl border border-line bg-surface">
        <Link href="/boat-report" className="group block">
          <div className="relative">
            <Image
              src="/boat/profile.jpg"
              alt="Our 2018 Alumacraft Pro 185 on its trailer"
              width={600}
              height={425}
              priority
              className="aspect-[21/9] w-full object-cover object-[50%_60%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                  Our boat
                </p>
                <h2 className="truncate text-lg font-semibold text-white">
                  2018 Alumacraft Pro 185
                </h2>
                <p className="truncate text-xs text-white/80">
                  E-TEC 115 H.O. · 47 mph · Spot-Lock · ours since Aug 2026
                </p>
              </div>
              <ChevronRight className="mb-1 h-5 w-5 shrink-0 text-white/80 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </Link>
        <div className="grid grid-cols-5 divide-x divide-line border-t border-line">
          {BOAT_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="py-2.5 text-center text-xs font-semibold text-ink-muted transition-colors hover:bg-surface-2 hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      {/* waters */}
      <h2 className="mt-8 mb-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">
        Waters · pick your map
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
                {w.spots.length} spots · {w.launches.length} launches · live wind on the water
                page
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-xs leading-relaxed text-ink-faint">
        More NYS waters (Champlain, Oneida, Otisco…) are a data file away — each water ships as
        researched JSON with spots, launches, and live wind, no code changes.
      </p>
    </main>
  );
}
