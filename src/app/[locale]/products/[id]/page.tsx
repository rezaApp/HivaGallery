import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { getProduct } from "@/lib/product-data";
import { JsonLd } from "@/components/json-ld";
import {
  buildAlternates,
  buildOpenGraph,
  TWITTER_CARD,
  localePath,
  SITE_NAME,
} from "@/lib/seo";
import ProductDetailView from "./_view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const product = getProduct(id);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const t = await getTranslations({ locale, namespace: "products" });
  const name = t(`items.${product.id}.name` as Parameters<typeof t>[0]);
  const description = t(
    `items.${product.id}.description` as Parameters<typeof t>[0]
  );
  const path = `/products/${id}`;

  return {
    title: name,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: buildOpenGraph(locale, path, name, description),
    twitter: TWITTER_CARD,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const product = getProduct(id);

  let schema: object[] = [];

  if (product) {
    const t = await getTranslations({ locale, namespace: "products" });
    const tn = await getTranslations({ locale, namespace: "nav" });
    const name = t(`items.${product.id}.name` as Parameters<typeof t>[0]);
    const description = t(
      `items.${product.id}.description` as Parameters<typeof t>[0]
    );
    const categoryLabel = t(
      `categories.${product.categoryKey}` as Parameters<typeof t>[0]
    );
    const path = `/products/${id}`;

    schema = [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description,
        url: localePath(locale, path),
        inLanguage: locale,
        offers: {
          "@type": "Offer",
          price: product.priceUsd,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: SITE_NAME },
        },
      },
      {
        "@context": "https://schema.org",
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
          {
            "@type": "ListItem",
            position: 3,
            name: categoryLabel,
            item: localePath(
              locale,
              `/products?category=${product.categoryKey}`
            ),
          },
          {
            "@type": "ListItem",
            position: 4,
            name,
            item: localePath(locale, path),
          },
        ],
      },
    ];
  }

  return (
    <>
      {schema.length > 0 && (
        <JsonLd data={schema as Record<string, unknown>[]} />
      )}
      <ProductDetailView />
    </>
  );
}
