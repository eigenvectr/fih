import Dexie, { type EntityTable } from "dexie";
import type { LogEntry } from "./types";

export const db = new Dexie("fih") as Dexie & {
  entries: EntityTable<LogEntry, "id">;
};

db.version(1).stores({
  entries: "id, date, waterSlug, spotId, species, createdAt",
});

export function newEntryId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

interface ExportedEntry extends Omit<LogEntry, "photo"> {
  photoDataUrl?: string;
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl);
  return res.blob();
}

export async function exportLog(): Promise<string> {
  const entries = await db.entries.orderBy("date").toArray();
  const out: ExportedEntry[] = [];
  for (const e of entries) {
    const { photo, ...rest } = e;
    out.push(
      photo ? { ...rest, photoDataUrl: await blobToDataUrl(photo) } : rest,
    );
  }
  return JSON.stringify(
    { app: "fih", version: 1, exportedAt: new Date().toISOString(), entries: out },
    null,
    2,
  );
}

export async function importLog(json: string): Promise<number> {
  const parsed = JSON.parse(json) as { entries?: ExportedEntry[] };
  if (!Array.isArray(parsed.entries)) throw new Error("Not a fih log export");
  let count = 0;
  for (const raw of parsed.entries) {
    const { photoDataUrl, ...rest } = raw;
    if (!rest.id || !rest.date || !rest.species) continue;
    const entry: LogEntry = { ...rest };
    if (photoDataUrl) entry.photo = await dataUrlToBlob(photoDataUrl);
    await db.entries.put(entry);
    count++;
  }
  return count;
}
