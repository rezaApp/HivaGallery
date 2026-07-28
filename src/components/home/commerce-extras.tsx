"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Gem,
  Mail,
  MessageCircle,
  MoveLeft,
  Sparkles,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

type Locale = "fa" | "en" | "ar";
type Product = { image: string; name: string; price: string; tag?: string };

const PRODUCTS: Product[] = [
  {
    image: "/images/hero/slide-1.png",
    name: "آینه پتینه‌کاری‌شده",
    price: "۸٬۴۵۰٬۰۰۰ تومان",
    tag: "فروش ویژه",
  },
  {
    image: "/images/hero/slide-3.png",
    name: "گلدان سفالی دست‌ساز",
    price: "۳٬۸۹۰٬۰۰۰ تومان",
    tag: "فروش ویژه",
  },
  {
    image: "/images/hero/slide-5.png",
    name: "چراغ رومیزی وینتیج",
    price: "۶٬۲۵۰٬۰۰۰ تومان",
    tag: "فروش ویژه",
  },
  {
    image: "/images/hero/slide-6.png",
    name: "قاب نقاشی کلاسیک",
    price: "۵٬۶۵۰٬۰۰۰ تومان",
    tag: "فروش ویژه",
  },
  {
    image: "/images/hero/slide-2.png",
    name: "مجسمه برنزی اصیل",
    price: "۹٬۸۰۰٬۰۰۰ تومان",
    tag: "فروش ویژه",
  },
];

const BEST_SELLERS: Product[] = [
  {
    image: "/images/hero/slide-6.png",
    name: "ساعت دیواری آنتیک",
    price: "۱۲٬۹۰۰٬۰۰۰ تومان",
  },
  {
    image: "/images/hero/slide-2.png",
    name: "تابلو نقش‌برجسته",
    price: "۷٬۴۵۰٬۰۰۰ تومان",
  },
  {
    image: "/images/hero/slide-4.png",
    name: "شمعدان برنجی",
    price: "۴٬۱۰۰٬۰۰۰ تومان",
  },
  {
    image: "/images/hero/slide-1.png",
    name: "سینی قلم‌زنی‌شده",
    price: "۵٬۹۵۰٬۰۰۰ تومان",
  },
  {
    image: "/images/hero/slide-3.png",
    name: "ظرف دکوری کهنه‌نما",
    price: "۳٬۷۵۰٬۰۰۰ تومان",
  },
];

const PRODUCT_TRANSLATIONS = {
  fa: {
    specialTag: "فروش ویژه",
    special: [
      "آینه پتینه‌کاری‌شده",
      "گلدان سفالی دست‌ساز",
      "چراغ رومیزی وینتیج",
      "قاب نقاشی کلاسیک",
      "مجسمه برنزی اصیل",
    ],
    best: [
      "ساعت دیواری آنتیک",
      "تابلو نقش‌برجسته",
      "شمعدان برنجی",
      "سینی قلم‌زنی‌شده",
      "ظرف دکوری کهنه‌نما",
    ],
    specialPrices: [
      "۸٬۴۵۰٬۰۰۰ تومان",
      "۳٬۸۹۰٬۰۰۰ تومان",
      "۶٬۲۵۰٬۰۰۰ تومان",
      "۵٬۶۵۰٬۰۰۰ تومان",
      "۹٬۸۰۰٬۰۰۰ تومان",
    ],
    bestPrices: [
      "۱۲٬۹۰۰٬۰۰۰ تومان",
      "۷٬۴۵۰٬۰۰۰ تومان",
      "۴٬۱۰۰٬۰۰۰ تومان",
      "۵٬۹۵۰٬۰۰۰ تومان",
      "۳٬۷۵۰٬۰۰۰ تومان",
    ],
  },
  en: {
    specialTag: "Special offer",
    special: [
      "Patina-finished mirror",
      "Handmade ceramic vase",
      "Vintage table lamp",
      "Classic painting frame",
      "Authentic bronze sculpture",
    ],
    best: [
      "Antique wall clock",
      "Relief artwork",
      "Brass candlestick",
      "Engraved serving tray",
      "Antique-style decorative vessel",
    ],
    specialPrices: [
      "8,450,000 Toman",
      "3,890,000 Toman",
      "6,250,000 Toman",
      "5,650,000 Toman",
      "9,800,000 Toman",
    ],
    bestPrices: [
      "12,900,000 Toman",
      "7,450,000 Toman",
      "4,100,000 Toman",
      "5,950,000 Toman",
      "3,750,000 Toman",
    ],
  },
  ar: {
    specialTag: "عرض خاص",
    special: [
      "مرآة بتشطيب باتينا",
      "مزهرية خزفية يدوية",
      "مصباح طاولة فينتاج",
      "إطار لوحة كلاسيكي",
      "تمثال برونزي أصيل",
    ],
    best: [
      "ساعة حائط أنتيك",
      "لوحة بارزة",
      "شمعدان نحاسي",
      "صينية منقوشة يدوياً",
      "وعاء ديكوري بطابع قديم",
    ],
    specialPrices: [
      "٨٬٤٥٠٬٠٠٠ تومان",
      "٣٬٨٩٠٬٠٠٠ تومان",
      "٦٬٢٥٠٬٠٠٠ تومان",
      "٥٬٦٥٠٬٠٠٠ تومان",
      "٩٬٨٠٠٬٠٠٠ تومان",
    ],
    bestPrices: [
      "١٢٬٩٠٠٬٠٠٠ تومان",
      "٧٬٤٥٠٬٠٠٠ تومان",
      "٤٬١٠٠٬٠٠٠ تومان",
      "٥٬٩٥٠٬٠٠٠ تومان",
      "٣٬٧٥٠٬٠٠٠ تومان",
    ],
  },
} as const;

const COPY = {
  fa: {
    special: "فروش ویژه",
    best: "پرفروش‌ترین‌های هیوا",
    railText: "قطعه‌هایی که این روزها بیشتر دیده و دوست داشته شده‌اند.",
    viewAll: "مشاهده همه",
    bentoTitle: "جزئیات، روحِ یک خانه‌اند",
    bentoText: "برای گوشه‌هایی که باید دیده شوند.",
    bentoOne: "آثار تک‌نسخه",
    bentoTwo: "ارسال با بیمه",
    bentoThree: "مشاورهٔ انتخاب",
    faq: "سؤالات متداول",
    faqText: "پاسخ پرسش‌هایی که پیش از انتخاب یک اثر خاص ممکن است داشته باشید.",
    questions: [
      [
        "آیا اصالت آثار تضمین می‌شود؟",
        "بله، هر اثر پیش از قرار گرفتن در مجموعه از نظر کیفیت، قدمت و اصالت بررسی می‌شود.",
      ],
      [
        "ارسال آثار شکننده چگونه است؟",
        "آثار با بسته‌بندی چندلایه و متناسب با جنس کالا آماده و با امکان پیگیری ارسال می‌شوند.",
      ],
      [
        "امکان بازدید حضوری وجود دارد؟",
        "برای برخی آثار امکان هماهنگی بازدید وجود دارد. از طریق صفحهٔ تماس با ما در ارتباط باشید.",
      ],
      [
        "اگر اثر در فضای من مناسب نبود چه می‌شود؟",
        "پیش از خرید می‌توانید از مشاورهٔ انتخاب و بررسی تناسب اثر با فضای خود استفاده کنید.",
      ],
    ],
    footerText: "انتخاب‌هایی برای خانه‌هایی که قصه دارند.",
    contact: "ارتباط با هیوا",
    rights: "تمامی حقوق برای هیوا محفوظ است.",
    products: "مجموعه‌ها",
    about: "درباره ما",
    faqLink: "سؤالات متداول",
  },
  en: {
    special: "Special selection",
    best: "HIVA best sellers",
    railText: "Pieces that have been most admired lately.",
    viewAll: "View all",
    bentoTitle: "Details are the soul of a home",
    bentoText: "For corners worth noticing.",
    bentoOne: "One-of-a-kind works",
    bentoTwo: "Insured delivery",
    bentoThree: "Selection guidance",
    faq: "Frequently asked questions",
    faqText:
      "Answers to questions you may have before choosing a special piece.",
    questions: [
      [
        "Is authenticity guaranteed?",
        "Yes. Every piece is reviewed for quality, age and authenticity before joining the collection.",
      ],
      [
        "How are fragile pieces delivered?",
        "Works are prepared with multi-layer protective packaging tailored to each item.",
      ],
      [
        "Can I visit in person?",
        "Visits can be arranged for selected pieces. Please contact us to coordinate.",
      ],
      [
        "What if the piece does not suit my space?",
        "Before buying, you can use our selection guidance to assess how the work will sit in your space.",
      ],
    ],
    footerText: "Selections for homes with a story.",
    contact: "Contact HIVA",
    rights: "All rights reserved by HIVA.",
    products: "Collections",
    about: "About us",
    faqLink: "FAQs",
  },
  ar: {
    special: "اختيارات خاصة",
    best: "الأكثر مبيعاً في هيوَا",
    railText: "قطع حازت إعجاباً كبيراً في الفترة الأخيرة.",
    viewAll: "عرض الكل",
    bentoTitle: "التفاصيل هي روح البيت",
    bentoText: "لزوايا تستحق أن تُرى.",
    bentoOne: "أعمال فريدة",
    bentoTwo: "توصيل مؤمّن",
    bentoThree: "استشارة اختيار",
    faq: "الأسئلة المتكررة",
    faqText: "إجابات عن الأسئلة التي قد تراودك قبل اختيار قطعة مميزة.",
    questions: [
      [
        "هل الأصالة مضمونة؟",
        "نعم، نراجع جودة وعمر وأصالة كل قطعة قبل إضافتها إلى المجموعة.",
      ],
      [
        "كيف تُرسل القطع القابلة للكسر؟",
        "نجهزها بتغليف واقٍ متعدد الطبقات ومخصص لكل قطعة.",
      ],
      [
        "هل الزيارة الشخصية ممكنة؟",
        "يمكن ترتيب الزيارة لبعض القطع. تواصل معنا للتنسيق.",
      ],
      [
        "ماذا لو لم تناسب القطعة مساحتي؟",
        "يمكنك الاستفادة من استشارة الاختيار قبل الشراء لتقييم تناسب العمل مع مساحتك.",
      ],
    ],
    footerText: "اختيارات لبيوت لها حكاية.",
    contact: "تواصل مع هيوَا",
    rights: "جميع الحقوق محفوظة لهيوَا.",
    products: "المجموعات",
    about: "من نحن",
    faqLink: "الأسئلة المتكررة",
  },
} as const;

function getCopy(locale: string) {
  return COPY[(locale in COPY ? locale : "fa") as Locale];
}

function getLocalizedProducts(locale: string) {
  const translation =
    PRODUCT_TRANSLATIONS[
      (locale in PRODUCT_TRANSLATIONS ? locale : "fa") as Locale
    ];
  return {
    special: PRODUCTS.map((product, index) => ({
      ...product,
      name: translation.special[index],
      price: translation.specialPrices[index],
      tag: translation.specialTag,
    })),
    best: BEST_SELLERS.map((product, index) => ({
      ...product,
      name: translation.best[index],
      price: translation.bestPrices[index],
    })),
  };
}

function ProductRail({
  title,
  text,
  items,
  locale,
}: {
  title: string;
  text: string;
  items: Product[];
  locale: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const pauseAutoplay = useRef(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRtl = locale === "fa" || locale === "ar";
  const orderedItems = isRtl ? [...items].reverse() : items;
  const displayItems = [...orderedItems, ...orderedItems, ...orderedItems];

  const scrollToCard = useCallback(
    (cardIndex: number, behavior: ScrollBehavior) => {
      const container = scroller.current;
      const card = container?.children[cardIndex] as HTMLElement | undefined;
      if (container && card) {
        container.scrollTo({
          left:
            card.offsetLeft -
            (isRtl ? container.clientWidth - card.offsetWidth : 0),
          behavior,
        });
      }
    },
    [isRtl]
  );

  useEffect(() => {
    scrollToCard(items.length, "auto");
  }, [items.length, scrollToCard]);

  const goTo = useCallback(
    (index: number) => {
      const nextIndex = (index + items.length) % items.length;
      const resetAfterMove = index < 0 || index >= items.length;
      const cardIndex =
        index < 0
          ? items.length - 1
          : index >= items.length
            ? items.length * 2
            : items.length + nextIndex;

      if (resetTimer.current) clearTimeout(resetTimer.current);
      scrollToCard(cardIndex, "smooth");
      if (resetAfterMove) {
        resetTimer.current = setTimeout(() => {
          scrollToCard(items.length + nextIndex, "auto");
        }, 450);
      }
      currentIndex.current = nextIndex;
    },
    [items.length, scrollToCard]
  );

  const scroll = (direction: number) =>
    goTo(currentIndex.current + direction * (isRtl ? -1 : 1));

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!pauseAutoplay.current) goTo(currentIndex.current + 1);
    }, 4500);
    return () => {
      window.clearInterval(id);
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, [goTo]);

  return (
    <section className="py-16 sm:py-22">
      <div className="mx-auto max-w-7xl pr-0 pl-4 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-primary text-sm font-semibold">{title}</p>
            <p className="text-muted-foreground mt-2 text-sm">{text}</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous products"
              className="border-border hover:bg-muted flex size-9 items-center justify-center rounded-full border"
            >
              <ChevronRight className="size-4 rtl:rotate-180" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next products"
              className="border-border hover:bg-muted flex size-9 items-center justify-center rounded-full border"
            >
              <ChevronLeft className="size-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
        <div
          ref={scroller}
          dir="ltr"
          onMouseEnter={() => (pauseAutoplay.current = true)}
          onMouseLeave={() => (pauseAutoplay.current = false)}
          onTouchStart={() => (pauseAutoplay.current = true)}
          onTouchEnd={() => (pauseAutoplay.current = false)}
          className="flex w-full snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden"
        >
          {displayItems.map((product, index) => (
            <Link
              href="/products"
              key={`${product.name}-${index}`}
              dir={locale === "fa" || locale === "ar" ? "rtl" : "ltr"}
              className="border-border bg-card group relative shrink-0 basis-[78%] snap-start overflow-hidden rounded-2xl border sm:basis-[43%] lg:basis-[23%]"
            >
              <div className="relative aspect-[4/4.5] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 43vw, 23vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                {"tag" in product && (
                  <span className="bg-primary text-primary-foreground absolute start-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold">
                    {product.tag}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-foreground font-bold">{product.name}</h3>
                <p className="text-primary mt-2 text-sm font-semibold">
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CommerceExtras({ locale }: { locale: string }) {
  const copy = getCopy(locale);
  const products = getLocalizedProducts(locale);
  return (
    <>
      <ProductRail
        title={copy.special}
        text={copy.railText}
        items={products.special}
        locale={locale}
      />
      <section className="bg-secondary/35 py-16 sm:py-22">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <p className="text-primary text-sm font-semibold">HIVA EDIT</p>
            <h2 className="text-foreground mt-2 text-3xl font-bold sm:text-4xl">
              {copy.bentoTitle}
            </h2>
          </div>
          <div className="grid auto-rows-[180px] gap-4 md:grid-cols-4">
            <div className="relative overflow-hidden rounded-2xl md:col-span-2 md:row-span-2">
              <Image
                src="/images/hero/slide-4.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-white">
                <Gem className="mb-2 size-5" />
                <p className="text-xl font-bold">{copy.bentoOne}</p>
              </div>
            </div>
            <div className="bg-primary text-primary-foreground flex flex-col justify-between rounded-2xl p-6 md:col-span-2">
              <Sparkles className="size-6" />
              <div>
                <p className="text-xl font-bold">{copy.bentoText}</p>
                <p className="mt-2 text-sm opacity-70">HIVA Atelier</p>
              </div>
            </div>
            <div className="bg-card border-border flex flex-col justify-between rounded-2xl border p-6">
              <MoveLeft className="text-primary size-6 rtl:rotate-180" />
              <p className="text-foreground font-bold">{copy.bentoTwo}</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/hero/slide-5.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <p className="absolute inset-x-5 bottom-5 text-lg font-bold text-white">
                {copy.bentoThree}
              </p>
            </div>
          </div>
        </div>
      </section>
      <ProductRail
        title={copy.best}
        text={copy.railText}
        items={products.best}
        locale={locale}
      />
    </>
  );
}

export function FaqAndFooter({ locale }: { locale: string }) {
  const copy = getCopy(locale);
  return (
    <>
      <section id="faq" className="mx-auto max-w-4xl px-6 py-18 sm:py-24">
        <div className="text-center">
          <p className="text-primary text-sm font-semibold">HIVA HELP</p>
          <h2 className="text-foreground mt-2 text-3xl font-bold sm:text-4xl">
            {copy.faq}
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl leading-7">
            {copy.faqText}
          </p>
        </div>
        <div className="divide-border border-border mt-10 divide-y rounded-2xl border px-5 sm:px-7">
          {copy.questions.map(([question, answer]) => (
            <details key={question} className="group py-5">
              <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                <span>{question}</span>
                <span className="text-primary text-xl transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-muted-foreground max-w-2xl pt-4 text-sm leading-7">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>
      <footer className="bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold">
              <Gem className="size-5" /> HIVA
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 opacity-70">
              {copy.footerText}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="border-background/25 hover:bg-background/10 flex size-9 items-center justify-center rounded-full border"
              >
                <Camera className="size-4" />
              </a>
              <a
                href="#"
                aria-label="Email"
                className="border-background/25 hover:bg-background/10 flex size-9 items-center justify-center rounded-full border"
              >
                <Mail className="size-4" />
              </a>
              <a
                href="#"
                aria-label="Message"
                className="border-background/25 hover:bg-background/10 flex size-9 items-center justify-center rounded-full border"
              >
                <MessageCircle className="size-4" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold">{copy.products}</h3>
            <nav className="mt-4 grid gap-3 text-sm opacity-70">
              <Link href="/products">{copy.special}</Link>
              <Link href="/products">{copy.best}</Link>
              <Link href="/products">{copy.products}</Link>
            </nav>
          </div>
          <div>
            <h3 className="font-bold">{copy.contact}</h3>
            <nav className="mt-4 grid gap-3 text-sm opacity-70">
              <Link href="/about">{copy.about}</Link>
              <Link href="/contact">{copy.contact}</Link>
              <a href="#faq">{copy.faqLink}</a>
            </nav>
          </div>
        </div>
        <div className="border-background/15 border-t px-6 py-5 text-center text-xs opacity-60">
          © {new Date().getFullYear()} HIVA — {copy.rights}
        </div>
      </footer>
    </>
  );
}
