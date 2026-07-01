"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "./hero-slides";

const AUTOPLAY_MS = 6000;

export function HeroCarousel({ slides }: { slides: readonly HeroSlide[] }) {
  const t = useTranslations("home.carousel");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (i: number) => {
      setIndex(((i % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[Math.min(index, slides.length - 1)];

  return (
    <section
      className="relative -mt-20 h-[calc(60vh+5rem)] min-h-120 w-full overflow-hidden sm:-mt-24 sm:h-[calc(60vh+6rem)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={slide.key}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.portraitImage}
            alt={t(`${slide.key}Title`)}
            fill
            preload={index === 0}
            sizes="100vw"
            className="object-cover sm:hidden"
          />
          <Image
            src={slide.image}
            alt={t(`${slide.key}Title`)}
            fill
            preload={index === 0}
            sizes="100vw"
            className="hidden object-cover sm:block"
          />
          <div className="absolute inset-0 hidden bg-linear-to-t from-black/70 via-black/30 to-black/40 sm:block" />
          <div className="relative flex h-full flex-col items-start justify-center gap-3 px-4 ps-6 text-start sm:gap-4 sm:px-12 sm:ps-20">
            <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-4xl sm:drop-shadow-md md:text-5xl lg:text-6xl">
              {t(`${slide.key}Title`)}
            </h2>
            <p className="max-w-xs text-sm text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] sm:max-w-xl sm:text-lg sm:drop-shadow-md md:max-w-2xl md:text-xl">
              {t(`${slide.key}Subtitle`)}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label={t("prev")}
        className="bg-background/50 text-foreground hover:bg-background/70 absolute inset-s-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-md transition-colors sm:inset-s-4 sm:size-10"
      >
        <ChevronLeft className="size-4 sm:size-5 rtl:rotate-180" />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label={t("next")}
        className="bg-background/50 text-foreground hover:bg-background/70 absolute inset-e-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-md transition-colors sm:inset-e-4 sm:size-10"
      >
        <ChevronRight className="size-4 sm:size-5 rtl:rotate-180" />
      </button>

      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => goTo(i)}
            aria-label={t("goToSlide", { number: i + 1 })}
            aria-current={i === index}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index ? "w-6 bg-white" : "w-2 bg-white/40"
            )}
          />
        ))}
      </div>
    </section>
  );
}
