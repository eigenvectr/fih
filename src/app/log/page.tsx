import type { Metadata } from "next";
import { LogView } from "@/components/log/LogView";

export const metadata: Metadata = { title: "Log" };

export default async function LogPage({
  searchParams,
}: {
  searchParams: Promise<{ water?: string; spot?: string; new?: string }>;
}) {
  const sp = await searchParams;
  return (
    <LogView
      initialWater={sp.water}
      initialSpot={sp.spot}
      openNew={sp.new === "1"}
    />
  );
}
