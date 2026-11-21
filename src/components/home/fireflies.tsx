"use client";

import { useEffect, useRef } from "react";

type Firefly = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  phase: number;
  pulse: number;
};

const COUNT = 28;

// Dark footer (dark theme): warm champagne glow. Light footer (light theme):
// bright white core with a soft warm halo so it still glows on a pale surface.
const GLOW_ON_DARK = {
  core: "oklch(86% 0.13 82)",
  halo: "oklch(86% 0.13 82)",
  fade: "oklch(86% 0.13 82 / 0)",
};
const GLOW_ON_LIGHT = {
  core: "oklch(100% 0 0)",
  halo: "oklch(100% 0 0)",
  fade: "oklch(100% 0 0 / 0)",
};

function makeSprite({
  core,
  halo,
  fade,
}: {
  core: string;
  halo: string;
  fade: string;
}) {
  const size = 64;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext("2d");
  if (!ctx) return sprite;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, core);
  gradient.addColorStop(0.16, core);
  gradient.addColorStop(0.45, halo);
  gradient.addColorStop(1, fade);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

export function Fireflies() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const sprites = {
      dark: makeSprite(GLOW_ON_DARK),
      light: makeSprite(GLOW_ON_LIGHT),
    };

    let width = 0;
    let height = 0;
    let flies: Firefly[] = [];
    let frame = 0;
    let visible = true;
    let last = performance.now();

    const spawn = (): Firefly => ({
      x: Math.random() * width,
      y: Math.random() * height,
      angle: Math.random() * Math.PI * 2,
      speed: 8 + Math.random() * 14,
      size: 6 + Math.random() * 10,
      phase: Math.random() * Math.PI * 2,
      pulse: 0.5 + Math.random() * 0.9,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 640 ? Math.round(COUNT * 0.6) : COUNT;
      flies = Array.from({ length: count }, spawn);
    };

    const draw = (time: number, step: number) => {
      ctx.clearRect(0, 0, width, height);
      const darkFooter = document.documentElement.classList.contains("dark");
      const sprite = darkFooter ? sprites.dark : sprites.light;
      for (const fly of flies) {
        if (step > 0) {
          // Wander: small random turns, so paths curve instead of bouncing.
          fly.angle += (Math.random() - 0.5) * 2.2 * step;
          fly.x += Math.cos(fly.angle) * fly.speed * step;
          fly.y += Math.sin(fly.angle) * fly.speed * step;
          const margin = 20;
          if (fly.x < -margin) fly.x = width + margin;
          if (fly.x > width + margin) fly.x = -margin;
          if (fly.y < -margin) fly.y = height + margin;
          if (fly.y > height + margin) fly.y = -margin;
        }
        const blink =
          0.5 + 0.5 * Math.sin(time * 0.001 * fly.pulse + fly.phase);
        ctx.globalAlpha = (darkFooter ? 0.06 : 0.15) + 0.5 * blink * blink;
        ctx.drawImage(
          sprite,
          fly.x - fly.size / 2,
          fly.y - fly.size / 2,
          fly.size,
          fly.size
        );
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      const step = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible) draw(now, step);
      frame = requestAnimationFrame(tick);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = performance.now();
    });
    visibility.observe(canvas);

    if (reduceMotion) {
      draw(0, 0);
    } else {
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full"
    />
  );
}
