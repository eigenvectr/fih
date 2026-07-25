import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getWater, getWaters } from "@/lib/waters";
import { WaterView } from "@/components/water/WaterView";
import { ThemeToggle } from "@/components/ThemeToggle";

export function generateStaticParams() {
  return getWaters().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const water = getWater((await params).slug);
  return { title: water?.name ?? "Water" };
}

export default async function WaterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const water = getWater((await params).slug);
  if (!water) notFound();

  return (
    <main className="flex-1 px-4 pt-4 sm:px-6">
      <header className="mb-4 flex items-center gap-2">
        <Link
          href="/"
          aria-label="Back to waters"
          className="rounded-full p-2 text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold tracking-tight">{water.name}</h1>
          <p className="truncate text-xs text-ink-muted">{water.region}</p>
        </div>
        <ThemeToggle />
      </header>
      <WaterView water={water} />
    </main>
  );
}
