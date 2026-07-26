"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import { Map as MLMap, Marker } from "maplibre-gl";
import type { Launch, Spot, SpeciesId } from "@/lib/types";
import { SPECIES } from "@/lib/species";

function rasterStyle(dark: boolean): maplibregl.StyleSpecification {
  const layer = dark ? "dark_all" : "rastertiles/voyager_nolabels";
  return {
    version: 8,
    sources: {
      carto: {
        type: "raster",
        tiles: ["a", "b", "c", "d"].map(
          (s) => `https://${s}.basemaps.cartocdn.com/${layer}/{z}/{x}/{y}.png`,
        ),
        tileSize: 256,
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/attributions">CARTO</a>',
      },
    },
    layers: [{ id: "carto", type: "raster", source: "carto" }],
  };
}

function useIsDark(): boolean {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setDark(el.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

function spotPinEl(spot: Spot, selected: boolean, anySelected: boolean): HTMLElement {
  const color = SPECIES[spot.species[0]]?.pin ?? "#0d7488";
  const el = document.createElement("div");
  el.style.cssText = `
    display:flex;flex-direction:column;align-items:center;gap:3px;
    opacity:${anySelected && !selected ? 0.5 : 1};transition:opacity .2s;
    z-index:${selected ? 3 : 1};
  `;
  const pin = document.createElement("button");
  pin.type = "button";
  pin.setAttribute("aria-label", spot.name);
  pin.title = spot.name;
  pin.style.cssText = `
    width:22px;height:22px;border-radius:9999px;background:${color};
    border:2.5px solid #fff;cursor:pointer;
    box-shadow:${
      selected
        ? `0 0 0 3.5px color-mix(in srgb, var(--accent) 75%, transparent), 0 2px 8px rgb(0 0 0 / .5)`
        : "0 1px 5px rgb(0 0 0 / .45)"
    };
    transform:scale(${selected ? 1.05 : 0.68});
    transition:transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s;
  `;
  el.appendChild(pin);
  if (selected) {
    const label = document.createElement("span");
    label.textContent = spot.name;
    label.style.cssText = `
      font:600 10px/1.2 var(--font-geist-sans),sans-serif;
      color:var(--ink);background:var(--surface);border:1px solid var(--line);
      padding:3px 7px;border-radius:9999px;max-width:180px;
      white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
      box-shadow:0 2px 6px rgb(0 0 0 / .3);
    `;
    el.appendChild(label);
  }
  return el;
}

function launchPinEl(name: string, isHome: boolean): HTMLElement {
  const el = document.createElement("div");
  el.setAttribute("aria-label", isHome ? `${name} — your launch` : `${name} launch`);
  el.title = isHome ? `${name} — your launch` : name;
  if (isHome) {
    el.style.cssText = "display:flex;flex-direction:column;align-items:center;gap:3px;";
    const pin = document.createElement("div");
    pin.className = "pin-home";
    pin.style.cssText = `
      width:17px;height:17px;background:var(--accent);border:2.5px solid #fff;
      transform:rotate(45deg);border-radius:3px;
      box-shadow:0 1px 6px rgb(0 0 0 / .5);
    `;
    const label = document.createElement("span");
    label.textContent = "START";
    label.style.cssText = `
      font:600 9px/1 var(--font-geist-sans),sans-serif;letter-spacing:.08em;
      color:#fff;background:var(--accent);padding:2px 5px;border-radius:9999px;
      box-shadow:0 1px 3px rgb(0 0 0 / .35);
    `;
    el.append(pin, label);
  } else {
    el.style.cssText = `
      width:11px;height:11px;background:#64748b;border:2px solid #fff;
      box-shadow:0 1px 4px rgb(0 0 0 / .4);transform:rotate(45deg);border-radius:2px;
      opacity:.85;
    `;
  }
  return el;
}

function Legend({ species }: { species: SpeciesId[] }) {
  return (
    <div className="pointer-events-none absolute bottom-2 left-2 z-10 rounded-lg border border-line bg-surface/90 p-2.5 shadow-sm backdrop-blur-sm">
      <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-wider text-ink-faint">
        Legend
      </p>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
        {species.map((sp) => {
          const meta = SPECIES[sp];
          if (!meta) return null;
          return (
            <li key={sp} className="flex items-center gap-1.5 text-[10px] text-ink-muted">
              <span
                className="h-2 w-2 shrink-0 rounded-full border border-white/80"
                style={{ background: meta.pin }}
              />
              {meta.short}
            </li>
          );
        })}
        <li className="flex items-center gap-1.5 text-[10px] text-ink-muted">
          <span className="h-2 w-2 shrink-0 rotate-45 rounded-[2px] border border-white/80 bg-slate-500" />
          Launch
        </li>
        <li className="flex items-center gap-1.5 text-[10px] font-medium text-accent">
          <span className="h-2 w-2 shrink-0 rotate-45 rounded-[2px] border border-white/80 bg-accent" />
          Your start
        </li>
        <li className="flex items-center gap-1.5 text-[10px] text-ink-muted">
          <span className="h-2 w-2 shrink-0 rounded-full border border-white/80 bg-[#1da1f2]" />
          You (live)
        </li>
      </ul>
    </div>
  );
}

export function WaterMap({
  spots,
  launches,
  species,
  selectedId,
  homeLaunch,
  onSelect,
}: {
  spots: Spot[];
  launches: Launch[];
  species: SpeciesId[];
  selectedId: string | null;
  homeLaunch: string;
  onSelect: (id: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MLMap | null>(null);
  const markers = useRef<globalThis.Map<string, Marker>>(new globalThis.Map());
  const dark = useIsDark();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!container.current || mapRef.current) return;
    const bounds = new maplibregl.LngLatBounds();
    spots.forEach((s) => bounds.extend([s.lon, s.lat]));
    launches.forEach((l) => bounds.extend([l.lon, l.lat]));
    const map = new maplibregl.Map({
      container: container.current,
      style: rasterStyle(document.documentElement.classList.contains("dark")),
      bounds,
      fitBoundsOptions: { padding: 44 },
      attributionControl: { compact: true },
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        fitBoundsOptions: { maxZoom: 13 },
      }),
      "top-right",
    );
    map.touchZoomRotate.disableRotation();
    mapRef.current = map;
    setReady(true);
    return () => {
      markers.current.forEach((m) => m.remove());
      markers.current.clear();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ready) mapRef.current?.setStyle(rasterStyle(dark));
  }, [dark, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    markers.current.forEach((m) => m.remove());
    markers.current.clear();
    launches.forEach((l) => {
      const m = new Marker({ element: launchPinEl(l.name, l.name === homeLaunch) })
        .setLngLat([l.lon, l.lat])
        .addTo(map);
      markers.current.set(`launch:${l.name}`, m);
    });
    spots.forEach((s) => {
      const el = spotPinEl(s, s.id === selectedId, selectedId !== null);
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelect(s.id);
      });
      const m = new Marker({ element: el, anchor: "center" })
        .setLngLat([s.lon, s.lat])
        .addTo(map);
      markers.current.set(s.id, m);
    });
  }, [spots, launches, selectedId, homeLaunch, onSelect, ready]);

  const firstLaunchPan = useRef(true);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    if (firstLaunchPan.current) {
      firstLaunchPan.current = false;
      return;
    }
    const launch = launches.find((l) => l.name === homeLaunch);
    if (launch)
      map.easeTo({
        center: [launch.lon, launch.lat],
        duration: 700,
        zoom: Math.max(map.getZoom(), 10),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeLaunch, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedId) return;
    const spot = spots.find((s) => s.id === selectedId);
    if (spot) map.easeTo({ center: [spot.lon, spot.lat], duration: 500 });
  }, [selectedId, spots]);

  return (
    <div className="relative">
      <div
        ref={container}
        className="h-[46dvh] min-h-72 w-full overflow-hidden rounded-xl border border-line sm:h-[420px] lg:h-[max(420px,calc(100dvh-24rem))]"
      />
      <Legend species={species} />
    </div>
  );
}
