import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Target, Eye, Sparkles, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
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
  const title = t("about.title");
  const description = t("about.description");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/about"),
    openGraph: buildOpenGraph(locale, "/about", title, description),
    twitter: TWITTER_CARD,
  };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "about" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const ts = await getTranslations({ locale, namespace: "seo" });

  const values = [
    { Icon: Sparkles, title: t("value1Title"), text: t("value1Text") },
    { Icon: Shield, title: t("value2Title"), text: t("value2Text") },
    { Icon: Zap, title: t("value3Title"), text: t("value3Text") },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: ts("about.title"),
    description: ts("about.description"),
    url: localePath(locale, "/about"),
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
          name: tn("about"),
          item: localePath(locale, "/about"),
        },
      ],
    },
  };

  return (
    <>
      <JsonLd id="json-ld-about" data={schema} />
      <main className="mx-auto w-full max-w-4xl space-y-20 px-6 py-16">
        <section className="space-y-4 text-center">
          <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {t("subtitle")}
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <Card className="bg-background/10 border-border/10 space-y-3 p-8 backdrop-blur-sm">
            <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
              <Target className="text-primary size-5" />
            </div>
            <h2 className="text-card-foreground text-xl font-semibold">
              {t("missionTitle")}
            </h2>
            <p className="text-muted-foreground">{t("missionText")}</p>
          </Card>
          <Card className="bg-background/10 border-border/10 space-y-3 p-8 backdrop-blur-sm">
            <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
              <Eye className="text-primary size-5" />
            </div>
            <h2 className="text-card-foreground text-xl font-semibold">
              {t("visionTitle")}
            </h2>
            <p className="text-muted-foreground">{t("visionText")}</p>
          </Card>
        </section>

        <section className="space-y-8">
          <h2 className="text-foreground text-center text-2xl font-bold">
            {t("valuesTitle")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {values.map(({ Icon, title, text }) => (
              <div
                key={title}
                className="bg-background/10 border-border/10 space-y-3 rounded-xl border p-6 text-center backdrop-blur-sm"
              >
                <div className="bg-muted mx-auto flex size-12 items-center justify-center rounded-full">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-foreground font-semibold">{title}</h3>
                <p className="text-muted-foreground text-sm">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
