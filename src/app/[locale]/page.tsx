import { useTranslations } from "next-intl";
import { HeroCarousel } from "@/components/home/hero-carousel";

export default function Home() {
  const t = useTranslations("nav");
  return (
    <>
      <HeroCarousel />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
          {t("home")}
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Welcome to Hiva. Edit{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
            src/app/[locale]/page.tsx
          </code>{" "}
          to get started.
        </p>
      </main>
    </>
  );
}
