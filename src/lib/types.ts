export type SpeciesId =
  | "smallmouth"
  | "largemouth"
  | "pike"
  | "walleye"
  | "muskie"
  | "perch"
  | "laketrout"
  | "salmon"
  | "crappie";

export type SeasonId = "spr" | "sum" | "fall" | "ice";

export interface Bait {
  lure: string;
  presentation: string;
  when: string;
}

export interface Spot {
  id: string;
  name: string;
  lat: number;
  lon: number;
  species: SpeciesId[];
  structure: string;
  seasons: Partial<Record<SeasonId, string>>;
  baits: Bait[];
  nearestLaunch: string;
  runMinutes?: number;
  sources: string[];
}

export interface Launch {
  name: string;
  lat: number;
  lon: number;
  notes?: string;
}

export interface RegNote {
  title: string;
  body: string;
  source?: string;
}

export interface LocalColor {
  note: string;
  source?: string;
}

export interface Water {
  slug: string;
  name: string;
  shortName?: string;
  region: string;
  blurb: string;
  species: SpeciesId[];
  launches: Launch[];
  regsNotes: RegNote[];
  speciesBaits: Partial<Record<SpeciesId, Bait[]>>;
  localColor: LocalColor[];
  spots: Spot[];
}

export interface LogEntry {
  id: string;
  date: string;
  waterSlug: string;
  spotId?: string;
  spotName?: string;
  species: string;
  lengthIn?: number;
  weightLb?: number;
  bait?: string;
  conditions?: string;
  note?: string;
  photo?: Blob;
  createdAt: number;
}

export interface RunPlan {
  waterSlug: string;
  launchName: string;
  spotIds: string[];
}
