import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { JsonLd } from "@/components/json-ld";
import {
  buildAlternates,
  buildOpenGraph,
  TWITTER_CARD,
  localePath,
} from "@/lib/seo";
import ProductsView from "./_view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const title = t("products.title");
  const description = t("products.description");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/products"),
    openGraph: buildOpenGraph(locale, "/products", title, description),
    twitter: TWITTER_CARD,
  };
}

export default async function ProductsPage() {
  const locale = await getLocale();
  const tn = await getTranslations({ locale, namespace: "nav" });
  const ts = await getTranslations({ locale, namespace: "seo" });

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: ts("products.title"),
    description: ts("products.description"),
    url: localePath(locale, "/products"),
    inLanguage: locale,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: tn("home"),
          item: localePath(locale),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: tn("products"),
          item: localePath(locale, "/products"),
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <ProductsView />
    </>
  );
}
