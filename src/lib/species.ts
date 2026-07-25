import type { SpeciesId } from "./types";

export interface SpeciesMeta {
  id: SpeciesId;
  label: string;
  short: string;
  chip: string;
  dot: string;
  pin: string;
}

export const SPECIES: Record<SpeciesId, SpeciesMeta> = {
  smallmouth: {
    id: "smallmouth",
    label: "Smallmouth Bass",
    short: "Smallmouth",
    chip: "bg-species-smallmouth/12 text-species-smallmouth border-species-smallmouth/25",
    dot: "bg-species-smallmouth",
    pin: "#9a3412",
  },
  largemouth: {
    id: "largemouth",
    label: "Largemouth Bass",
    short: "Largemouth",
    chip: "bg-species-largemouth/12 text-species-largemouth border-species-largemouth/25",
    dot: "bg-species-largemouth",
    pin: "#22a04b",
  },
  pike: {
    id: "pike",
    label: "Northern Pike",
    short: "Pike",
    chip: "bg-species-pike/12 text-species-pike border-species-pike/25",
    dot: "bg-species-pike",
    pin: "#0369a1",
  },
  walleye: {
    id: "walleye",
    label: "Walleye",
    short: "Walleye",
    chip: "bg-species-walleye/12 text-species-walleye border-species-walleye/25",
    dot: "bg-species-walleye",
    pin: "#b45309",
  },
  muskie: {
    id: "muskie",
    label: "Muskellunge",
    short: "Muskie",
    chip: "bg-species-muskie/12 text-species-muskie border-species-muskie/25",
    dot: "bg-species-muskie",
    pin: "#7c3aed",
  },
  perch: {
    id: "perch",
    label: "Yellow Perch",
    short: "Perch",
    chip: "bg-species-perch/12 text-species-perch border-species-perch/25",
    dot: "bg-species-perch",
    pin: "#a16207",
  },
};

export const SPECIES_IDS = Object.keys(SPECIES) as SpeciesId[];

export function speciesLabel(id: string): string {
  return (SPECIES as Record<string, SpeciesMeta>)[id]?.short ?? id;
}
