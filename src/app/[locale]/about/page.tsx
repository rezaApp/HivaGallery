import { useTranslations } from "next-intl";
import { Target, Eye, Sparkles, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  const t = useTranslations("about");

  const values = [
    { Icon: Sparkles, title: t("value1Title"), text: t("value1Text") },
    { Icon: Shield, title: t("value2Title"), text: t("value2Text") },
    { Icon: Zap, title: t("value3Title"), text: t("value3Text") },
  ];

  return (
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
        <Card className="space-y-3 p-8">
          <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
            <Target className="text-primary size-5" />
          </div>
          <h2 className="text-card-foreground text-xl font-semibold">
            {t("missionTitle")}
          </h2>
          <p className="text-muted-foreground">{t("missionText")}</p>
        </Card>
        <Card className="space-y-3 p-8">
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
            <div key={title} className="space-y-3 p-6 text-center">
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
  );
}
