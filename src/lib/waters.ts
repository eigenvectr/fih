import type { Water } from "./types";
import stLawrence from "../../data/waters/st-lawrence-river.json";

const waters: Water[] = [stLawrence as unknown as Water];

export function getWaters(): Water[] {
  return waters;
}

export function getWater(slug: string): Water | undefined {
  return waters.find((w) => w.slug === slug);
}
