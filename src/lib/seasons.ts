import type { SeasonId } from "./types";

export interface SeasonMeta {
  id: SeasonId;
  label: string;
  months: string;
}

export const SEASONS: SeasonMeta[] = [
  { id: "spr", label: "Spring", months: "Apr–Jun" },
  { id: "sum", label: "Summer", months: "Jul–Aug" },
  { id: "fall", label: "Fall", months: "Sep–Nov" },
  { id: "ice", label: "Ice", months: "Dec–Mar" },
];

export function currentSeason(d = new Date()): SeasonId {
  const m = d.getMonth();
  if (m >= 3 && m <= 5) return "spr";
  if (m >= 6 && m <= 7) return "sum";
  if (m >= 8 && m <= 10) return "fall";
  return "ice";
}

export function seasonLabel(id: SeasonId): string {
  return SEASONS.find((s) => s.id === id)?.label ?? id;
}
