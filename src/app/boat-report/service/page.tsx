import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tracker } from "./Tracker";

export const metadata = {
  title: "Service log · 2018 Alumacraft Pro 185",
  description:
    "The boat's maintenance schedule and log: impeller, gearcase, winterization, anodes, trailer, and the every-trip habits.",
};

export default function ServicePage() {
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
          <h1 className="truncate text-lg font-semibold tracking-tight">Service log</h1>
          <p className="truncate text-xs text-ink-muted">
            Log saves on this phone · the maintenance record is the resale record
          </p>
        </div>
        <ThemeToggle />
      </header>
      <p className="mb-4 text-sm leading-relaxed text-ink-muted">
        The previous owner&apos;s nine logged winterizations are why this engine was worth buying.
        This page is how the next buyer says the same about us — every service logged here, every
        receipt kept, and an EMM pull every couple of years to keep the official record growing.
      </p>
      <Tracker />
    </main>
  );
}
