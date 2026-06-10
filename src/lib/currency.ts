import type { Locale } from "@/i18n/routing";

const CURRENCY_BY_LOCALE: Record<
  Locale,
  { currency: string; intlLocale: string; rateFromUsd: number }
> = {
  en: { currency: "USD", intlLocale: "en-US", rateFromUsd: 1 },
  ar: { currency: "AED", intlLocale: "ar-AE", rateFromUsd: 3.67 },
  fa: { currency: "IRR", intlLocale: "fa-IR", rateFromUsd: 420000 },
};

export function formatPrice(amountUsd: number, locale: Locale): string {
  const { currency, intlLocale, rateFromUsd } = CURRENCY_BY_LOCALE[locale];

  return new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "IRR" ? 0 : 2,
  }).format(amountUsd * rateFromUsd);
}
