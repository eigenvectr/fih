"use client";

import { useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Camera, X } from "lucide-react";
import { db, newEntryId } from "@/lib/db";
import { getWaters } from "@/lib/waters";
import { SPECIES, SPECIES_IDS } from "@/lib/species";
import type { LogEntry } from "@/lib/types";

const CONDITION_CHIPS = ["Sunny", "Clouds", "Rain", "Wind", "Calm", "Current ripping"];

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function EntryForm({
  open,
  onOpenChange,
  initialWater,
  initialSpot,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialWater?: string;
  initialSpot?: string;
}) {
  const waters = getWaters();
  const [waterSlug, setWaterSlug] = useState(
    initialWater ?? waters[0]?.slug ?? "",
  );
  const [spotId, setSpotId] = useState(initialSpot ?? "");
  const [species, setSpecies] = useState("");
  const [date, setDate] = useState(today());
  const [lengthIn, setLengthIn] = useState("");
  const [bait, setBait] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const photoRef = useRef<HTMLInputElement>(null);
  const [photoName, setPhotoName] = useState("");

  const water = waters.find((w) => w.slug === waterSlug);

  const speciesOptions = water?.species?.length ? water.species : SPECIES_IDS;

  const baitSuggestions = useMemo(() => {
    if (!water) return [];
    const set = new Set<string>();
    Object.values(water.speciesBaits).forEach((baits) =>
      baits?.forEach((b) => set.add(b.lure)),
    );
    water.spots.forEach((s) => s.baits.forEach((b) => set.add(b.lure)));
    return [...set];
  }, [water]);

  function reset() {
    setSpecies("");
    setLengthIn("");
    setNote("");
    setPhotoName("");
    setConditions([]);
    if (photoRef.current) photoRef.current.value = "";
  }

  async function save() {
    if (!species || saving) return;
    setSaving(true);
    try {
      const spot = water?.spots.find((s) => s.id === spotId);
      const entry: LogEntry = {
        id: newEntryId(),
        date,
        waterSlug,
        spotId: spotId || undefined,
        spotName: spot?.name,
        species,
        lengthIn: lengthIn ? Number(lengthIn) : undefined,
        bait: bait || undefined,
        conditions: conditions.length ? conditions.join(", ") : undefined,
        note: note || undefined,
        photo: photoRef.current?.files?.[0] ?? undefined,
        createdAt: Date.now(),
      };
      await db.entries.add(entry);
      reset();
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-line bg-surface-2/60 px-3 py-2.5 text-base outline-none focus:border-accent";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
        <Dialog.Content
          className="sheet-content fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border-t border-line bg-canvas p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl"
          aria-describedby={undefined}
        >
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold">New catch</Dialog.Title>
            <Dialog.Close
              className="rounded-full p-2 text-ink-muted hover:bg-surface-2"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            <div>
              <span className="mb-1.5 block text-xs font-medium text-ink-muted">Species</span>
              <div className="grid grid-cols-3 gap-1.5">
                {speciesOptions.map((id) => {
                  const active = species === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSpecies(id)}
                      aria-pressed={active}
                      className={`rounded-lg border px-2 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? SPECIES[id].chip
                          : "border-line bg-surface text-ink-muted"
                      }`}
                    >
                      {SPECIES[id].short}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-ink-muted">Date</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-ink-muted">Length (in)</span>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.25"
                  min="0"
                  placeholder="18.5"
                  value={lengthIn}
                  onChange={(e) => setLengthIn(e.target.value)}
                  className={inputCls}
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-ink-muted">Water</span>
                <select
                  value={waterSlug}
                  onChange={(e) => {
                    setWaterSlug(e.target.value);
                    setSpotId("");
                  }}
                  className={inputCls}
                >
                  {waters.map((w) => (
                    <option key={w.slug} value={w.slug}>{w.name}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-ink-muted">Spot</span>
                <select value={spotId} onChange={(e) => setSpotId(e.target.value)} className={inputCls}>
                  <option value="">—</option>
                  {water?.spots.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ink-muted">Bait / lure</span>
              <input
                list="bait-suggestions"
                value={bait}
                onChange={(e) => setBait(e.target.value)}
                placeholder="Drop-shot goby"
                className={inputCls}
              />
              <datalist id="bait-suggestions">
                {baitSuggestions.map((b) => (
                  <option key={b} value={b} />
                ))}
              </datalist>
            </label>

            <div>
              <span className="mb-1.5 block text-xs font-medium text-ink-muted">Conditions</span>
              <div className="flex flex-wrap gap-1.5">
                {CONDITION_CHIPS.map((c) => {
                  const active = conditions.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        setConditions((cur) =>
                          active ? cur.filter((x) => x !== c) : [...cur, c],
                        )
                      }
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? "border-accent/40 bg-accent/12 text-accent"
                          : "border-line bg-surface text-ink-muted"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-ink-muted">Note</span>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Suspended off the drop"
                  className={inputCls}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-ink-muted">Photo</span>
                <span className="relative inline-flex">
                  <input
                    ref={photoRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => setPhotoName(e.target.files?.[0]?.name ?? "")}
                    className="absolute inset-0 cursor-pointer opacity-0"
                    aria-label="Add photo"
                  />
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm ${
                      photoName
                        ? "border-accent/40 bg-accent/12 text-accent"
                        : "border-line bg-surface-2/60 text-ink-muted"
                    }`}
                  >
                    <Camera className="h-4 w-4" />
                    {photoName ? "1" : "Add"}
                  </span>
                </span>
              </label>
            </div>

            <button
              type="button"
              onClick={save}
              disabled={!species || saving}
              className="w-full rounded-xl bg-accent py-3.5 text-base font-semibold text-accent-ink transition-opacity disabled:opacity-40"
            >
              {saving ? "Saving…" : "Save catch"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
