import Image from "next/image";
import {
  ArrowLeft,
  BadgeCheck,
  Gem,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  CommerceExtras,
  FaqAndFooter,
} from "@/components/home/commerce-extras";

type Locale = "fa" | "en" | "ar";

const COPY = {
  fa: {
    eyebrow: "انتخاب‌هایی با امضای زمان",
    title: "زیبایی‌هایی که داستان دارند",
    intro:
      "از اشیای آنتیکِ اصیل تا آثار هنری دست‌ساز و پتینه‌های خاص؛ هر قطعه برای جان‌دادن به فضای شما با دقت انتخاب شده است.",
    explore: "مشاهده‌ی مجموعه‌ها",
    collections: "کالکشن‌های هیوا",
    collectionsIntro: "برای خانه‌ای که شبیه هیچ خانه‌ی دیگری نیست.",
    categories: ["آنتیک و عتیقه", "هنر و دکور", "پتینه و بازآفرینی"],
    categoryText: [
      "یادگارهای ارزشمند از گذشته",
      "آثار منتخب هنرمندان ایرانی",
      "بافت، رنگ و شخصیت برای فضا",
    ],
    discover: "دیدن مجموعه",
    storyTitle: "هر شیء، یک روایت ماندگار",
    storyText:
      "ما به ارزش چیزهایی باور داریم که با زمان زیباتر می‌شوند. در هیوا، اصالت، کیفیت و جزئیات دست‌ساز، معیار انتخاب هر اثر است.",
    storyCta: "درباره‌ی نگاه هیوا",
    benefitsTitle: "خریدی مطمئن برای انتخابی خاص",
    benefits: [
      ["اصالت‌سنجی", "بررسی دقیق قدمت، کیفیت و جزئیات هر اثر"],
      ["بسته‌بندی امن", "آماده‌سازی حرفه‌ای برای رسیدن سالم به دست شما"],
      ["ارسال مطمئن", "ارسال به سراسر ایران با امکان پیگیری سفارش"],
    ],
    ctaTitle: "فضای خود را با یک اثر خاص کامل کنید",
    ctaText:
      "مجموعه‌ی امروز هیوا را ببینید؛ هر اثر تنها یک‌بار برای شما منتظر می‌ماند.",
    cta: "شروع خرید",
  },
  en: {
    eyebrow: "Selections signed by time",
    title: "Objects with a story to tell",
    intro:
      "From authentic antiques to handmade art and distinctive patina pieces, every object is chosen to give your space a unique character.",
    explore: "Explore collections",
    collections: "HIVA collections",
    collectionsIntro: "For a home unlike any other.",
    categories: ["Antiques", "Art & decor", "Patina & restoration"],
    categoryText: [
      "Precious keepsakes from the past",
      "Selected works by Iranian artists",
      "Texture, colour and character for your space",
    ],
    discover: "View collection",
    storyTitle: "Every object, a lasting narrative",
    storyText:
      "We believe in things that grow more beautiful with time. At HIVA, authenticity, quality and handcrafted detail guide every selection.",
    storyCta: "About HIVA",
    benefitsTitle: "Confidence in every special purchase",
    benefits: [
      [
        "Authenticity checked",
        "Every piece is reviewed for age, quality and detail",
      ],
      ["Secure packaging", "Professionally prepared to arrive safely"],
      ["Reliable delivery", "Tracked delivery across Iran"],
    ],
    ctaTitle: "Complete your space with a singular piece",
    ctaText:
      "Discover today’s HIVA collection—each work waits for just one home.",
    cta: "Start shopping",
  },
  ar: {
    eyebrow: "اختيارات تحمل توقيع الزمن",
    title: "قطع جميلة لها حكاية",
    intro:
      "من التحف الأصيلة إلى الأعمال الفنية اليدوية وقطع الباتينا المميزة، نختار كل قطعة بعناية لتمنح مساحتك شخصية فريدة.",
    explore: "استكشف المجموعات",
    collections: "مجموعات هيوَا",
    collectionsIntro: "لبيت لا يشبه أي بيت آخر.",
    categories: ["تحف وأنتيكات", "فن وديكور", "باتينا وتجديد"],
    categoryText: [
      "تذكارات ثمينة من الماضي",
      "أعمال مختارة لفنانين إيرانيين",
      "ملمس ولون وشخصية لمساحتك",
    ],
    discover: "عرض المجموعة",
    storyTitle: "لكل قطعة رواية باقية",
    storyText:
      "نؤمن بالأشياء التي تزداد جمالاً مع الزمن. في هيوَا، الأصالة والجودة والتفاصيل اليدوية هي معيار كل اختيار.",
    storyCta: "عن هيوَا",
    benefitsTitle: "ثقة في كل اختيار مميز",
    benefits: [
      ["فحص الأصالة", "مراجعة دقيقة لعمر كل قطعة وجودتها وتفاصيلها"],
      ["تغليف آمن", "تجهيز احترافي لتصل القطعة بأمان"],
      ["توصيل موثوق", "توصيل قابل للتتبع في جميع أنحاء إيران"],
    ],
    ctaTitle: "أكمل مساحتك بقطعة لا تتكرر",
    ctaText: "اكتشف مجموعة هيوَا اليوم؛ كل عمل ينتظر بيتاً واحداً فقط.",
    cta: "ابدأ التسوق",
  },
} as const;

const COLLECTION_IMAGES = [
  "/images/hero/slide-6.png",
  "/images/hero/slide-3.png",
  "/images/hero/slide-5.png",
];

const BENEFIT_ICONS = [BadgeCheck, PackageCheck, Truck];

export function LandingSections({ locale }: { locale: string }) {
  const copy = COPY[(locale in COPY ? locale : "fa") as Locale];

  return (
    <main className="overflow-hidden">
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-18 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-20 lg:py-28">
        <div className="max-w-2xl">
          <div className="text-primary/70 mb-5 flex items-center gap-3 text-xs font-bold tracking-[0.18em] uppercase">
            <Sparkles className="size-4" />
            {copy.eyebrow}
          </div>
          <h1 className="text-foreground text-4xl leading-[1.2] font-bold sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-base leading-8 sm:text-lg">
            {copy.intro}
          </p>
          <Link
            href="/products"
            className="bg-primary text-primary-foreground mt-8 inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          >
            {copy.explore}
            <ArrowLeft className="size-4 rtl:rotate-180" />
          </Link>
        </div>
        <div className="border-border bg-card relative min-h-76 overflow-hidden rounded-2xl border p-3 shadow-lg sm:min-h-96">
          <Image
            src="/images/hero/slide-6.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent" />
          <div className="absolute inset-x-8 bottom-7 text-white">
            <Gem className="mb-3 size-6" />
            <p className="text-lg font-semibold">{copy.eyebrow}</p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-primary text-sm font-semibold">
                {copy.collections}
              </p>
              <h2 className="text-foreground mt-2 text-3xl font-bold sm:text-4xl">
                {copy.collectionsIntro}
              </h2>
            </div>
            <Link
              href="/products"
              className="text-primary inline-flex items-center gap-2 text-sm font-semibold hover:underline"
            >
              {copy.explore}
              <ArrowLeft className="size-4 rtl:rotate-180" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {copy.categories.map((category, index) => (
              <Link
                key={category}
                href="/products"
                className="group bg-primary relative min-h-80 overflow-hidden rounded-2xl"
              >
                <Image
                  src={COLLECTION_IMAGES[index]}
                  alt={category}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-6 bottom-6 text-white">
                  <h3 className="text-2xl font-bold">{category}</h3>
                  <p className="mt-2 text-sm text-white/80">
                    {copy.categoryText[index]}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                    {copy.discover}
                    <ArrowLeft className="size-4 rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-18 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-28">
        <div className="relative min-h-80 overflow-hidden rounded-2xl sm:min-h-105">
          <Image
            src="/images/hero/slide-2.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="max-w-xl">
          <p className="text-primary text-sm font-semibold">HIVA ATELIER</p>
          <h2 className="text-foreground mt-3 text-3xl leading-tight font-bold sm:text-4xl">
            {copy.storyTitle}
          </h2>
          <p className="text-muted-foreground mt-5 leading-8">
            {copy.storyText}
          </p>
          <Link
            href="/about"
            className="text-primary mt-7 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
          >
            {copy.storyCta}
            <ArrowLeft className="size-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>

      <section className="bg-card border-border border-y py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-foreground mb-9 text-center text-2xl font-bold sm:text-3xl">
            {copy.benefitsTitle}
          </h2>
          <div className="grid gap-7 md:grid-cols-3">
            {copy.benefits.map(([title, text], index) => {
              const Icon = BENEFIT_ICONS[index];
              return (
                <div key={title} className="flex gap-4">
                  <span className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-full">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-foreground font-bold">{title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm leading-6">
                      {text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CommerceExtras locale={locale} />

      <section className="bg-primary text-primary-foreground px-6 py-18 text-center sm:py-24">
        <div className="mx-auto max-w-2xl">
          <ShieldCheck className="mx-auto mb-5 size-7 opacity-80" />
          <h2 className="text-primary-foreground text-3xl leading-tight font-bold sm:text-4xl">
            {copy.ctaTitle}
          </h2>
          <p className="text-primary-foreground/75 mt-5 leading-7">
            {copy.ctaText}
          </p>
          <Link
            href="/products"
            className="bg-primary-foreground text-primary mt-8 inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-bold transition-transform hover:-translate-y-0.5"
          >
            {copy.cta}
            <ArrowLeft className="size-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>

      <FaqAndFooter locale={locale} />
    </main>
  );
}
