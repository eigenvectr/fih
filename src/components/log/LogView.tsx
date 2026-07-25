"use client";

import { useRef, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Download, Plus, Upload } from "lucide-react";
import { db, exportLog, importLog } from "@/lib/db";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EntryForm } from "./EntryForm";
import { HistoryList } from "./HistoryList";
import { StatsView } from "./StatsView";

export function LogView({
  initialWater,
  initialSpot,
  openNew,
}: {
  initialWater?: string;
  initialSpot?: string;
  openNew?: boolean;
}) {
  const [formOpen, setFormOpen] = useState(Boolean(openNew));
  const [tab, setTab] = useState<"history" | "stats">("history");
  const [importMsg, setImportMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const entries = useLiveQuery(
    () => db.entries.orderBy("date").reverse().toArray(),
    [],
  );

  async function handleExport() {
    const json = await exportLog();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fih-log-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleImport(file: File) {
    try {
      const count = await importLog(await file.text());
      setImportMsg(`Imported ${count} entries`);
    } catch {
      setImportMsg("Import failed — not a fih log file");
    }
    setTimeout(() => setImportMsg(""), 4000);
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-6 sm:px-6">
      <header className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Log</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {entries ? `${entries.length} catches · stored on this device` : "Loading…"}
          </p>
        </div>
        <ThemeToggle />
      </header>

      <button
        type="button"
        onClick={() => setFormOpen(true)}
        className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-base font-semibold text-accent-ink transition-opacity hover:opacity-90"
      >
        <Plus className="h-5 w-5" />
        New catch
      </button>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex rounded-lg border border-line bg-surface p-0.5" role="tablist" aria-label="Log view">
          {(["history", "stats"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-md px-4 py-1.5 text-xs font-medium capitalize transition-colors ${
                tab === t ? "bg-accent text-accent-ink" : "text-ink-muted hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={handleExport}
            aria-label="Export log as JSON"
            title="Export JSON"
            className="rounded-lg p-2 text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <Download className="h-4.5 w-4.5" />
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            aria-label="Import log from JSON"
            title="Import JSON"
            className="rounded-lg p-2 text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <Upload className="h-4.5 w-4.5" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleImport(f);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {importMsg && (
        <p role="status" className="mb-3 rounded-lg border border-accent/30 bg-accent/8 px-3 py-2 text-sm text-accent">
          {importMsg}
        </p>
      )}

      {entries &&
        (tab === "history" ? (
          <HistoryList entries={entries} />
        ) : (
          <StatsView entries={entries} />
        ))}

      <EntryForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initialWater={initialWater}
        initialSpot={initialSpot}
      />
    </main>
  );
}
