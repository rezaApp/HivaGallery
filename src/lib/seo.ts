export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hiva.app";
export const SITE_NAME = "HIVA";

const LOCALE_OG: Record<string, string> = {
  fa: "fa_IR",
  en: "en_US",
  ar: "ar_SA",
};

// default locale (fa) has no URL prefix; en/ar get /{locale}
export function localePath(locale: string, path = "") {
  const prefix = locale === "fa" ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

export function buildAlternates(locale: string, path = "") {
  return {
    canonical: localePath(locale, path),
    languages: {
      fa: localePath("fa", path),
      en: localePath("en", path),
      ar: localePath("ar", path),
      "x-default": localePath("fa", path),
    },
  };
}

export function buildOpenGraph(
  locale: string,
  path: string,
  title: string,
  description: string
) {
  return {
    title,
    description,
    url: localePath(locale, path),
    siteName: SITE_NAME,
    type: "website" as const,
    locale: LOCALE_OG[locale] ?? "en_US",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };
}

export const TWITTER_CARD = {
  card: "summary_large_image" as const,
  site: "@hiva_app",
};

export const NOINDEX = { index: false, follow: false };
