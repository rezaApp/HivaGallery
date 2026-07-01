import { existsSync } from "node:fs";
import { join } from "node:path";

export type HeroSlide = {
  key: string;
  image: string;
  portraitImage: string;
};

const PUBLIC_DIR = join(process.cwd(), "public");
const SLIDE_COUNT = 12;
const DESKTOP_IMAGE_COUNT = 6;

/**
 * Builds the hero slides from the numbered portrait images in
 * `public/images/hero/portrate`. A slide is skipped when its mobile
 * (portrait) image is missing on disk. Only 6 desktop images exist, so
 * slides beyond that cycle back through them.
 */
export function getHeroSlides(): HeroSlide[] {
  const slides: HeroSlide[] = [];
  for (let n = 1; n <= SLIDE_COUNT; n++) {
    const portraitImage = `/images/hero/portrate/${n}.png`;
    if (!existsSync(join(PUBLIC_DIR, portraitImage))) continue;
    slides.push({
      key: `slide${n}`,
      image: `/images/hero/slide-${((n - 1) % DESKTOP_IMAGE_COUNT) + 1}.png`,
      portraitImage,
    });
  }
  return slides;
}
