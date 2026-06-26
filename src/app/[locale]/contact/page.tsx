import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { JsonLd } from "@/components/json-ld";
import {
  buildAlternates,
  buildOpenGraph,
  TWITTER_CARD,
  localePath,
} from "@/lib/seo";
import ContactForm from "./_form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const title = t("contact.title");
  const description = t("contact.description");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/contact"),
    openGraph: buildOpenGraph(locale, "/contact", title, description),
    twitter: TWITTER_CARD,
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const tn = await getTranslations({ locale, namespace: "nav" });
  const ts = await getTranslations({ locale, namespace: "seo" });

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: ts("contact.title"),
    description: ts("contact.description"),
    url: localePath(locale, "/contact"),
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
          name: tn("contact"),
          item: localePath(locale, "/contact"),
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <ContactForm />
    </>
  );
}
