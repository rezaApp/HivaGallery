import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { DirectionProvider } from "@/components/direction-provider";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { SITE_NAME, TWITTER_CARD } from "@/lib/seo";

const LOCALE_OG: Record<string, string> = {
  fa: "fa_IR",
  en: "en_US",
  ar: "ar_SA",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { template: `%s | ${SITE_NAME}`, default: SITE_NAME },
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      locale: LOCALE_OG[locale] ?? "en_US",
    },
    twitter: TWITTER_CARD,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <NextIntlClientProvider>
      <DirectionProvider>
        <Providers>
          <div className="flex min-h-svh w-full flex-col pt-20 sm:pt-24">
            <Header />
            {children}
          </div>
        </Providers>
      </DirectionProvider>
    </NextIntlClientProvider>
  );
}
