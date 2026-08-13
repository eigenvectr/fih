"use client";

import { useEffect, useMemo, useState } from "react";
import { Wind } from "lucide-react";

type Hour = { time: string; speed: number; gust: number; dir: number };

type WindData = {
  current: { speed: number; gust: number; dir: number; temp: number };
  hours: Hour[];
};

const DIRS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

function compass(deg: number): string {
  return DIRS[Math.round(deg / 22.5) % 16];
}

function verdict(speed: number, gust: number): { label: string; note: string; cls: string } {
  const eff = Math.max(speed, gust - 5);
  if (eff <= 8)
    return {
      label: "Calm",
      note: "Glass to light ripple — anywhere on the lake is on the table.",
      cls: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400",
    };
  if (eff <= 13)
    return {
      label: "Fishable",
      note: "Light chop — fine for an 18-footer; the windward shore gets bumpy.",
      cls: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400",
    };
  if (eff <= 18)
    return {
      label: "Sloppy",
      note: "Whitecaps likely — fish protected water, expect spray, slow the runs.",
      cls: "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400",
    };
  return {
    label: "Blown out",
    note: "An open 18-foot aluminum boat stays home or hides in a creek arm.",
    cls: "bg-red-500/10 text-red-700 dark:bg-red-400/10 dark:text-red-400",
  };
}

function hourLabel(iso: string): string {
  const d = new Date(iso);
  const h = d.getHours();
  const ampm = h >= 12 ? "p" : "a";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}${ampm}`;
}

function dayLabel(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { weekday: "short" });
}

export function WindPanel({ lat, lon }: { lat: number; lon: number }) {
  const [data, setData] = useState<WindData | null>(null);
  const [error, setError] = useState(false);
  const [focus, setFocus] = useState<Hour | null>(null);

  useEffect(() => {
    let dead = false;
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}` +
      `&current=wind_speed_10m,wind_gusts_10m,wind_direction_10m,temperature_2m` +
      `&hourly=wind_speed_10m,wind_gusts_10m,wind_direction_10m` +
      `&wind_speed_unit=mph&temperature_unit=fahrenheit&timezone=auto&forecast_days=3`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        if (dead) return;
        const now = Date.now();
        const hours: Hour[] = j.hourly.time
          .map((t: string, i: number) => ({
            time: t,
            speed: Math.round(j.hourly.wind_speed_10m[i]),
            gust: Math.round(j.hourly.wind_gusts_10m[i]),
            dir: j.hourly.wind_direction_10m[i],
          }))
          .filter((h: Hour) => new Date(h.time).getTime() >= now - 3600_000)
          .slice(0, 36);
        setData({
          current: {
            speed: Math.round(j.current.wind_speed_10m),
            gust: Math.round(j.current.wind_gusts_10m),
            dir: j.current.wind_direction_10m,
            temp: Math.round(j.current.temperature_2m),
          },
          hours,
        });
      })
      .catch(() => !dead && setError(true));
    return () => {
      dead = true;
    };
  }, [lat, lon]);

  const shown = focus ?? (data ? { time: "", ...data.current } : null);
  const v = useMemo(
    () => (shown ? verdict(shown.speed, shown.gust) : null),
    [shown],
  );

  if (error) return null;

  return (
    <section className="rounded-xl border border-line bg-surface p-4" aria-label="Wind">
      <div className="flex items-center gap-2.5">
        <Wind className="h-4 w-4 text-ink-faint" />
        <h2 className="text-sm font-semibold">Wind on the water</h2>
        {data && v && (
          <span className={`ml-auto rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${v.cls}`}>
            {v.label}
          </span>
        )}
      </div>

      {!data ? (
        <div className="mt-3 h-16 animate-pulse rounded-lg bg-surface-2" />
      ) : (
        <>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              aria-hidden
              className="inline-block text-lg leading-none text-accent"
              style={{ transform: `rotate(${(shown!.dir + 180) % 360}deg)` }}
            >
              ↑
            </span>
            <p className="text-2xl font-semibold leading-none">
              {shown!.speed}
              <span className="ml-1 text-sm font-normal text-ink-muted">mph</span>
            </p>
            <p className="text-sm text-ink-muted">
              gusting {shown!.gust} · from {compass(shown!.dir)}
              {focus
                ? ` · ${dayLabel(focus.time)} ${hourLabel(focus.time)}`
                : ` · now · ${data.current.temp}°F`}
            </p>
          </div>
          {v && <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{v.note}</p>}

          <div className="-mx-1 mt-3 flex snap-x gap-1 overflow-x-auto px-1 pb-1">
            {data.hours.map((h) => {
              const active = focus?.time === h.time;
              const hv = verdict(h.speed, h.gust);
              return (
                <button
                  key={h.time}
                  type="button"
                  onClick={() => setFocus(active ? null : h)}
                  className={`flex shrink-0 snap-start flex-col items-center rounded-lg border px-2 py-1.5 transition-colors ${
                    active ? "border-accent bg-accent/10" : "border-line bg-surface-2/60 hover:border-accent/40"
                  }`}
                  aria-label={`${dayLabel(h.time)} ${hourLabel(h.time)}: ${h.speed} mph from ${compass(h.dir)}`}
                >
                  <span className="text-[10px] text-ink-faint">
                    {new Date(h.time).getHours() === 0 ? dayLabel(h.time) : hourLabel(h.time)}
                  </span>
                  <span
                    aria-hidden
                    className={`text-xs leading-tight ${hv.cls.includes("red") ? "text-red-600 dark:text-red-400" : hv.cls.includes("amber") ? "text-amber-600 dark:text-amber-400" : "text-ink-muted"}`}
                    style={{ transform: `rotate(${(h.dir + 180) % 360}deg)` }}
                  >
                    ↑
                  </span>
                  <span className="text-xs font-semibold">{h.speed}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-ink-faint">
            Tap an hour to preview it. Open-water forecast for this lake&apos;s coordinates
            (Open-Meteo) — bays and river arms will differ. Verdicts are tuned for an 18-foot
            open aluminum boat.
          </p>
        </>
      )}
    </section>
  );
}
