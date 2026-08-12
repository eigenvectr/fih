import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Checklist } from "./Checklist";

export const metadata = {
  title: "Water test · 2018 Alumacraft Pro 185",
  description:
    "The water-test playbook: what to check before, during, and after the run, and what to line up with the dealer while you're there.",
};

export default function WaterTestPage() {
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
          <h1 className="truncate text-lg font-semibold tracking-tight">Water test day</h1>
          <p className="truncate text-xs text-ink-muted">
            The final exam · checks save on this phone
          </p>
        </div>
        <ThemeToggle />
      </header>
      <Checklist />
    </main>
  );
}
