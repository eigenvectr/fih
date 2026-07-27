import type { Water } from "./types";
import stLawrence from "../../data/waters/st-lawrence-river.json";
import lakeGeorge from "../../data/waters/lake-george.json";
import saratogaLake from "../../data/waters/saratoga-lake.json";

const waters: Water[] = [
  stLawrence as unknown as Water,
  lakeGeorge as unknown as Water,
  saratogaLake as unknown as Water,
];

export function getWaters(): Water[] {
  return waters;
}

export function getWater(slug: string): Water | undefined {
  return waters.find((w) => w.slug === slug);
}
