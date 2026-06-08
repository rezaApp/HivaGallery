import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fa", "ar"],
  defaultLocale: "fa",
  localePrefix: "as-needed",
  localeCookie: true,
});

export type Locale = (typeof routing.locales)[number];
