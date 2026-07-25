import { SPECIES } from "@/lib/species";
import type { SpeciesId } from "@/lib/types";

export function SpeciesChip({
  id,
  active = true,
  onClick,
}: {
  id: SpeciesId;
  active?: boolean;
  onClick?: () => void;
}) {
  const meta = SPECIES[id];
  if (!meta) return null;
  const base =
    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors";
  const cls = active
    ? `${base} ${meta.chip}`
    : `${base} border-line bg-transparent text-ink-faint`;
  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-pressed={active} className={cls}>
        <span className={`h-1.5 w-1.5 rounded-full ${active ? meta.dot : "bg-ink-faint/50"}`} />
        {meta.short}
      </button>
    );
  }
  return (
    <span className={cls}>
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.short}
    </span>
  );
}
