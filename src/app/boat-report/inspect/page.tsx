import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Checklist } from "./Checklist";

export const metadata = {
  title: "Inspection day · 2018 Alumacraft Pro 185",
  description:
    "On-the-lot self-inspection checklist for the 2018 Alumacraft Pro 185, with what good and bad look like for each check.",
};

export default function InspectPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-4 sm:px-6">
      <header className="mb-2 flex items-center gap-2">
        <Link
          href="/boat-report"
          aria-label="Back to boat report"
          className="rounded-full p-2 text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold tracking-tight">Inspection day</h1>
          <p className="truncate text-xs text-ink-muted">
            2018 Alumacraft Pro 185 · checks save on this phone
          </p>
        </div>
        <ThemeToggle />
      </header>
      <Checklist />
    </main>
  );
}
