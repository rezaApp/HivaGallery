"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { Coords } from "@/types";

// Custom SVG pin — avoids the broken default Leaflet image paths in webpack
const PIN_ICON = L.divIcon({
  className: "",
  html: `<div style="width:30px;height:42px">
    <svg viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg" width="30" height="42"
      style="filter:drop-shadow(0 2px 4px rgba(0,0,0,.35))">
      <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 27 15 27S30 23.284 30 15C30 6.716 23.284 0 15 0z"
        fill="#7c3aed"/>
      <circle cx="15" cy="15" r="6" fill="white"/>
    </svg>
  </div>`,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
});

const DEFAULT_CENTER: [number, number] = [35.6892, 51.389]; // Tehran

const LANG_MAP: Record<Locale, string> = { fa: "fa", ar: "ar", en: "en" };

interface MapPickerProps {
  value?: Coords;
  onChange: (coords: Coords) => void;
}

function ClickHandler({ onPlace }: { onPlace: (c: Coords) => void }) {
  useMapEvents({
    click(e) {
      onPlace({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function MapPicker({ value, onChange }: MapPickerProps) {
  const t = useTranslations("checkout.address");
  const locale = useLocale() as Locale;
  const [detected, setDetected] = useState<string | null>(null);

  useEffect(() => {
    if (!value) return;

    let cancelled = false;
    const lang = LANG_MAP[locale];
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${value.lat}&lon=${value.lng}&format=json&accept-language=${lang}`
    )
      .then((r) => r.json())
      .then((data: { display_name?: string }) => {
        if (!cancelled && data?.display_name) setDetected(data.display_name);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      setDetected(null);
    };
  }, [value, locale]);

  const center: [number, number] = value
    ? [value.lat, value.lng]
    : DEFAULT_CENTER;

  return (
    <div className="space-y-2">
      <div className="border-border h-64 w-full overflow-hidden rounded-lg border">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onPlace={onChange} />
          {value && (
            <Marker
              position={[value.lat, value.lng]}
              icon={PIN_ICON}
              draggable
              eventHandlers={{
                dragend(e) {
                  const { lat, lng } = (e.target as L.Marker).getLatLng();
                  onChange({ lat, lng });
                },
              }}
            />
          )}
        </MapContainer>
      </div>

      {!value && (
        <p className="text-muted-foreground text-xs">{t("mapHint")}</p>
      )}

      {detected && (
        <p className="text-muted-foreground text-xs leading-relaxed">
          <span className="text-foreground font-medium">
            {t("locationDetected")}
          </span>{" "}
          {detected}
        </p>
      )}
    </div>
  );
}
