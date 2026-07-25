"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import { Map as MLMap, Marker } from "maplibre-gl";
import type { Launch, Spot } from "@/lib/types";
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

function spotPinEl(spot: Spot, selected: boolean): HTMLElement {
  const color = SPECIES[spot.species[0]]?.pin ?? "#0d7488";
  const el = document.createElement("button");
  el.type = "button";
  el.setAttribute("aria-label", spot.name);
  el.style.cssText = `
    width:${selected ? 22 : 15}px;height:${selected ? 22 : 15}px;border-radius:9999px;
    background:${color};border:2.5px solid #fff;cursor:pointer;
    box-shadow:0 1px 5px rgb(0 0 0 / .45);transition:width .15s,height .15s;
  `;
  return el;
}

function launchPinEl(name: string): HTMLElement {
  const el = document.createElement("div");
  el.setAttribute("aria-label", `${name} launch`);
  el.style.cssText = `
    width:13px;height:13px;background:#334155;border:2px solid #fff;
    box-shadow:0 1px 4px rgb(0 0 0 / .4);transform:rotate(45deg);border-radius:2px;
  `;
  return el;
}

export function WaterMap({
  spots,
  launches,
  selectedId,
  onSelect,
}: {
  spots: Spot[];
  launches: Launch[];
  selectedId: string | null;
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
      const m = new Marker({ element: launchPinEl(l.name) })
        .setLngLat([l.lon, l.lat])
        .setPopup(new maplibregl.Popup({ closeButton: false, offset: 10 }).setText(`⚓ ${l.name}`))
        .addTo(map);
      markers.current.set(`launch:${l.name}`, m);
    });
    spots.forEach((s) => {
      const el = spotPinEl(s, s.id === selectedId);
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelect(s.id);
      });
      const m = new Marker({ element: el }).setLngLat([s.lon, s.lat]).addTo(map);
      markers.current.set(s.id, m);
    });
  }, [spots, launches, selectedId, onSelect, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedId) return;
    const spot = spots.find((s) => s.id === selectedId);
    if (spot) map.easeTo({ center: [spot.lon, spot.lat], duration: 500 });
  }, [selectedId, spots]);

  return (
    <div
      ref={container}
      className="h-[46dvh] min-h-72 w-full overflow-hidden rounded-xl border border-line sm:h-[420px]"
    />
  );
}
