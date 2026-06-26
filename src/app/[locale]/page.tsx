import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { JsonLd } from "@/components/json-ld";
import {
  buildAlternates,
  buildOpenGraph,
  TWITTER_CARD,
  localePath,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const title = t("home.title");
  const description = t("home.description");

  return {
    title,
    description,
    alternates: buildAlternates(locale, ""),
    openGraph: buildOpenGraph(locale, "", title, description),
    twitter: TWITTER_CARD,
  };
}

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "nav" });
  const ts = await getTranslations({ locale, namespace: "seo" });

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: ts("home.title"),
    description: ts("home.description"),
    url: localePath(locale),
    inLanguage: locale,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: t("home"),
          item: localePath(locale),
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <HeroCarousel />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
          {t("home")}
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Welcome to HIVA. Edit{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
            src/app/[locale]/page.tsx
          </code>{" "}
          to get started.
        </p>
      </main>
    </>
  );
}
