"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "./hero-slides";

const AUTOPLAY_MS = 3200;

export function HeroCarousel({ slides }: { slides: readonly HeroSlide[] }) {
  const t = useTranslations("home.carousel");
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<number | null>(null);
  const index = ((position % slides.length) + slides.length) % slides.length;
  const goTo = useCallback(
    (next: number) => setPosition((current) => current + (next - index)),
    [index]
  );
  useEffect(() => {
    if (paused || isDragging) return;
    const id = window.setInterval(
      () => setPosition((current) => current + 1),
      AUTOPLAY_MS
    );
    return () => window.clearInterval(id);
  }, [isDragging, paused, slides.length]);
  if (!slides.length) return null;
  const active = slides[index];
  return (
    <section
      className="hero-cylinder relative -mt-20 h-[calc(72vh+5rem)] min-h-155 w-full overflow-hidden sm:-mt-24 sm:h-[calc(73vh+6rem)]"
      aria-roledescription="carousel"
      aria-label={t(`${active.key}Title`)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setIsDragging(false);
      }}
      onPointerDown={(event) => {
        dragStart.current = event.clientX;
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerUp={(event) => {
        if (
          dragStart.current !== null &&
          Math.abs(event.clientX - dragStart.current) > 45
        )
          goTo(index + (event.clientX < dragStart.current ? 1 : -1));
        dragStart.current = null;
        setIsDragging(false);
      }}
    >
      <div className="hero-cylinder__glow hero-cylinder__glow--one" />
      <div className="hero-cylinder__glow hero-cylinder__glow--two" />
      <div className="hero-cylinder__gallery-light" aria-hidden="true" />
      <div
        className="hero-cylinder__scene"
        style={{ transform: "rotateX(-3deg) scale(0.88)" }}
      >
        {[-2, -1, 0, 1, 2].map((offset) => {
          const slideIndex = (index + offset + slides.length) % slides.length;
          const slide = slides[slideIndex];
          return (
            <button
              key={slide.key}
              type="button"
              aria-label={t("goToSlide", { number: slideIndex + 1 })}
              aria-current={offset === 0}
              className={cn(
                "hero-cylinder__card",
                offset === 0 && "hero-cylinder__card--active",
                Math.abs(offset) === 2 && "hero-cylinder__card--edge"
              )}
              style={{
                transform: `rotateY(${offset * 26}deg) translateZ(clamp(330px, 38vw, 480px))`,
              }}
              onClick={() => goTo(slideIndex)}
            >
              <Image
                src={slide.portraitImage}
                alt={t(`${slide.key}Title`)}
                fill
                sizes="180px"
                priority={offset <= 0}
                className="object-cover"
              />
              <span className="hero-cylinder__card-shade" />
            </button>
          );
        })}
      </div>
      <div className="hero-cylinder__content pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center">
        <span className="text-primary-foreground/70 mb-5 text-[10px] font-semibold tracking-[0.42em] uppercase">
          HIVA / {String(index + 1).padStart(2, "0")}
        </span>
        <h1 className="text-primary-foreground max-w-2xl text-3xl font-semibold tracking-tight drop-shadow-2xl sm:text-5xl md:text-6xl">
          {t(`${active.key}Title`)}
        </h1>
        <p className="text-primary-foreground/75 mt-4 max-w-lg text-sm leading-7 sm:text-base">
          {t(`${active.key}Subtitle`)}
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-8 z-20 flex items-center justify-center gap-3">
        <button
          onPointerDown={(event) => event.stopPropagation()}
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label={t("prev")}
          className="hero-cylinder__control"
        >
          <ChevronLeft className="size-4 rtl:rotate-180" />
        </button>
        <button
          onPointerDown={(event) => event.stopPropagation()}
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          className="hero-cylinder__control"
        >
          {paused ? <Play className="size-3" /> : <Pause className="size-3" />}
        </button>
        <div className="flex gap-1.5 px-2">
          {slides.slice(0, 6).map((slide, i) => (
            <button
              onPointerDown={(event) => event.stopPropagation()}
              key={slide.key}
              type="button"
              onClick={() => goTo(i)}
              aria-label={t("goToSlide", { number: i + 1 })}
              className={cn(
                "h-1 rounded-full transition-all",
                i === index % 6
                  ? "bg-accent w-8"
                  : "bg-primary-foreground/30 w-2"
              )}
            />
          ))}
        </div>
        <button
          onPointerDown={(event) => event.stopPropagation()}
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label={t("next")}
          className="hero-cylinder__control"
        >
          <ChevronRight className="size-4 rtl:rotate-180" />
        </button>
      </div>
      <div className="hero-cylinder__floor" />
    </section>
  );
}
