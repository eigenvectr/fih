import { ChevronDown, ScrollText } from "lucide-react";
import type { Water } from "@/lib/types";

export function RegsPanel({ water }: { water: Water }) {
  if (water.regsNotes.length === 0) return null;
  return (
    <section>
      <details className="group rounded-xl border border-line bg-surface">
        <summary className="flex cursor-pointer list-none items-center gap-2.5 p-4">
          <ScrollText className="h-4 w-4 text-ink-faint" />
          <span className="text-sm font-semibold">Regulations &amp; logistics</span>
          <ChevronDown className="ml-auto h-4 w-4 text-ink-faint transition-transform group-open:rotate-180" />
        </summary>
        <div className="space-y-4 border-t border-line p-4">
          {water.regsNotes.map((n, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold">{n.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{n.body}</p>
              {n.source && (
                <a
                  href={n.source}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-xs text-accent hover:underline"
                >
                  {new URL(n.source).hostname.replace("www.", "")}
                </a>
              )}
            </div>
          ))}
          <p className="text-[11px] leading-relaxed text-ink-faint">
            Regulations change — confirm against the current NYSDEC guide before the
            trip. This panel is a briefing, not legal advice.
          </p>
        </div>
      </details>
    </section>
  );
}
