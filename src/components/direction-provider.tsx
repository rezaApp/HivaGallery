"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useLocaleStore, type Locale } from "@/store/locale";

const RTL = new Set<Locale>(["fa", "ar"]);

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const urlLocale = useLocale() as Locale;
  const setLocale = useLocaleStore((s) => s.setLocale);

  // URL locale is always the source of truth — keep Zustand in sync
  useEffect(() => {
    setLocale(urlLocale);
  }, [urlLocale, setLocale]);

  const isRtl = RTL.has(urlLocale);
  const dir = isRtl ? "rtl" : "ltr";

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", dir);
    html.setAttribute("lang", urlLocale);
    // Toggle Arabic font on body
    document.body.classList.toggle("font-arabic", isRtl);
  }, [urlLocale, dir, isRtl]);

  return <>{children}</>;
}
