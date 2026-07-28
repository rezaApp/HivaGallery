import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { LandingSections } from "@/components/home/landing-sections";
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
  const metadata = {
    fa: {
      title: "هیوا | هنر، آنتیک و پتینه",
      description:
        "مجموعه‌ای منتخب از آثار هنری، اشیای آنتیک و پتینه‌های خاص برای فضاهای ماندگار.",
    },
    en: {
      title: "HIVA | Art, Antiques & Patina",
      description:
        "A curated collection of art, antiques and distinctive patina pieces for memorable spaces.",
    },
    ar: {
      title: "هيوَا | فن وأنتيك وباتينا",
      description:
        "مجموعة مختارة من الفن والتحف وقطع الباتينا المميزة لمساحات لا تُنسى.",
    },
  }[locale] ?? {
    title: "HIVA | Art, Antiques & Patina",
    description:
      "A curated collection of art, antiques and distinctive patina pieces.",
  };

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: buildAlternates(locale, ""),
    openGraph: buildOpenGraph(locale, "", metadata.title, metadata.description),
    twitter: TWITTER_CARD,
  };
}

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "nav" });

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "HIVA",
    description: "Art, antiques and patina pieces.",
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
      <JsonLd id="json-ld-home" data={schema} />
      <HeroCarousel />
      <LandingSections locale={locale} />
    </>
  );
}
