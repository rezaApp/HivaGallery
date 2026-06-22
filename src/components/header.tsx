"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ChevronDown,
  ChevronRight,
  Coffee,
  Cpu,
  Globe,
  Home,
  Laptop,
  Menu,
  ShoppingCart,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import { useLocaleStore, type Locale } from "@/store/locale";
import { useCartStore } from "@/store/cart";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "fa", label: "فارسی" },
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

type MegaMenuItem = {
  key: ProductCategory;
  icon: React.ElementType;
  subcategories: string[];
};

const MEGA_MENU: MegaMenuItem[] = [
  {
    key: "electronics",
    icon: Cpu,
    subcategories: ["audio", "wearables", "peripherals"],
  },
  {
    key: "sports",
    icon: Activity,
    subcategories: ["running", "yoga", "hydration"],
  },
  {
    key: "kitchen",
    icon: Coffee,
    subcategories: ["coffee", "appliances"],
  },
  {
    key: "accessories",
    icon: Tag,
    subcategories: ["wallets", "eyewear", "watches"],
  },
  {
    key: "homeOffice",
    icon: Laptop,
    subcategories: ["lighting", "desk"],
  },
];

export function Header() {
  const t = useTranslations("nav");
  const tProducts = useTranslations("products");
  const { locale, setLocale } = useLocaleStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Header visibility
  const [hidden, setHidden] = useState(false);
  const scrollHiddenRef = useRef(false);
  const overrideRef = useRef<boolean | null>(null);

  // Desktop mega menu
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoveredCatIdx, setHoveredCatIdx] = useState(0);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);
  const [mobileCatKey, setMobileCatKey] = useState<string | null>(null);

  const cartCount = useCartStore((s) => s.items.length);
  const isRtl = locale === "fa" || locale === "ar";

  useEffect(() => {
    function handleScroll() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const threshold = scrollable > 0 ? scrollable / 3 : Infinity;
      const shouldHide = window.scrollY > threshold;
      if (shouldHide !== scrollHiddenRef.current) {
        scrollHiddenRef.current = shouldHide;
        overrideRef.current = null;
      }
      setHidden(overrideRef.current ?? shouldHide);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  function toggleHeader() {
    setHidden((prev) => {
      const next = !prev;
      overrideRef.current = next;
      return next;
    });
  }

  function handleLocaleChange(next: string | null) {
    if (!next) return;
    const newLocale = next as Locale;
    setLocale(newLocale);
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

  function openMega() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setMegaOpen(true);
  }

  function closeMega() {
    closeTimerRef.current = setTimeout(() => setMegaOpen(false), 150);
  }

  function closeMobileAll() {
    setMobileOpen(false);
    setProductsExpanded(false);
    setMobileCatKey(null);
  }

  function getCatLabel(key: string) {
    return tProducts(`categories.${key}` as Parameters<typeof tProducts>[0]);
  }

  function getSubcatLabel(catKey: string, subKey: string) {
    return tProducts(
      `subcategories.${catKey}.${subKey}` as Parameters<typeof tProducts>[0]
    );
  }

  const activeCat = MEGA_MENU[hoveredCatIdx];

  return (
    <>
      {/* ── Floating restore button when header is hidden ── */}
      <AnimatePresence>
        {hidden && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-s-2 top-2 z-50 sm:inset-s-4 sm:top-4"
          >
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={toggleHeader}
              aria-label={t("toggleMenu")}
              aria-pressed={!hidden}
              className="bg-background/30 border-border/40 rounded-full shadow-lg backdrop-blur-md"
            >
              <Home className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        initial={false}
        animate={hidden ? "hidden" : "visible"}
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-6rem", opacity: 0 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed inset-x-2 top-2 z-40 sm:inset-x-4 sm:top-4 lg:inset-x-6",
          hidden && "pointer-events-none"
        )}
      >
        {/* ── Header bar ── */}
        <div className="bg-background/30 border-border/40 mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border ps-12 pe-4 shadow-lg backdrop-blur-lg sm:ps-14 sm:pe-6 lg:pe-8">
          {/* Brand */}
          <Link
            href="/"
            className="text-foreground flex items-center gap-2 text-xl font-bold tracking-tight"
          >
            <Image
              src="/images/logo/hivaLogo.jpg"
              alt="HIVA"
              width={32}
              height={32}
              className="rounded-md"
            />
            HIVA
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {t("home")}
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {t("about")}
            </Link>

            {/* Products mega menu trigger */}
            <div
              className="relative"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              <button
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors",
                  megaOpen
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-expanded={megaOpen}
                aria-haspopup="true"
              >
                {t("products")}
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    megaOpen && "rotate-180"
                  )}
                />
              </button>
            </div>

            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {t("contact")}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden md:inline-flex">
              <Button variant="outline" size="sm">
                {t("signIn")}
              </Button>
            </Link>

            <Link href="/basket" className="relative" aria-label={t("basket")}>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {cartCount > 0 && (
                <span className="bg-primary text-primary-foreground absolute -inset-e-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[0.65rem] font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            <ThemeToggle />

            <Select
              value={locale}
              onValueChange={handleLocaleChange}
              disabled={isPending}
            >
              <SelectTrigger
                className="h-9 w-auto gap-1.5 sm:w-35"
                aria-label="Select language"
              >
                <Globe className="text-muted-foreground h-4 w-4 shrink-0" />
                <SelectValue className="hidden! sm:flex!" />
              </SelectTrigger>
              <SelectContent align="end">
                {LOCALES.map(({ code, label }) => (
                  <SelectItem key={code} value={code}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => {
                setMobileOpen((o) => !o);
                setProductsExpanded(false);
                setMobileCatKey(null);
              }}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* ── Two-level mega menu (desktop only) ── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              className="bg-background/98 border-border/40 mx-auto mt-2 hidden max-w-7xl overflow-hidden rounded-2xl border shadow-xl backdrop-blur-lg md:block"
            >
              <div className="flex min-h-64">
                {/* Level 1 — Category list */}
                <div className="border-border/30 w-56 shrink-0 border-e py-2">
                  {MEGA_MENU.map((cat, idx) => (
                    <Link
                      key={cat.key}
                      href={`/products?category=${cat.key}`}
                      onMouseEnter={() => setHoveredCatIdx(idx)}
                      onClick={() => setMegaOpen(false)}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                        hoveredCatIdx === idx
                          ? "bg-primary/8 text-primary border-primary border-e-2"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      <cat.icon className="size-4 shrink-0" />
                      <span className="flex-1">{getCatLabel(cat.key)}</span>
                      <ChevronRight
                        className={cn(
                          "size-3.5 shrink-0 opacity-50",
                          isRtl && "rotate-180"
                        )}
                      />
                    </Link>
                  ))}
                </div>

                {/* Level 2 — Subcategory panel */}
                <div className="flex-1 p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-foreground text-sm font-semibold">
                      {getCatLabel(activeCat.key)}
                    </h3>
                    <Link
                      href={`/products?category=${activeCat.key}`}
                      onClick={() => setMegaOpen(false)}
                      className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs font-medium transition-colors"
                    >
                      {t("viewAll")}
                      <ChevronRight
                        className={cn("size-3", isRtl && "rotate-180")}
                      />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 lg:grid-cols-3">
                    {activeCat.subcategories.map((subKey) => (
                      <Link
                        key={subKey}
                        href={`/products?category=${activeCat.key}&subcategory=${subKey}`}
                        onClick={() => setMegaOpen(false)}
                        className="text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md px-2 py-2 text-sm transition-colors"
                      >
                        {getSubcatLabel(activeCat.key, subKey)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer — View all products */}
              <div className="border-border/30 border-t px-5 py-2.5">
                <Link
                  href="/products"
                  onClick={() => setMegaOpen(false)}
                  className="text-muted-foreground hover:text-primary text-xs font-medium transition-colors"
                >
                  {t("shopByCategory")} — {t("viewAll")}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden md:hidden"
            >
              <div className="bg-background/30 border-border/40 mx-auto mt-2 max-w-7xl rounded-2xl border shadow-lg backdrop-blur-lg">
                <nav className="flex flex-col gap-1 px-4 py-3">
                  {/* Home & About */}
                  {(
                    [
                      { href: "/" as const, label: t("home") },
                      { href: "/about" as const, label: t("about") },
                    ] as const
                  ).map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                      onClick={closeMobileAll}
                    >
                      {label}
                    </Link>
                  ))}

                  {/* Products — two-level accordion */}
                  <div>
                    {/* L1 Products toggle */}
                    <button
                      type="button"
                      onClick={() => {
                        setProductsExpanded((v) => !v);
                        setMobileCatKey(null);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        productsExpanded
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      {t("products")}
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform duration-200",
                          productsExpanded && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {productsExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-1 flex flex-col gap-0.5 ps-3">
                            {MEGA_MENU.map((cat) => (
                              <div key={cat.key}>
                                {/* L1 Category toggle */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    setMobileCatKey((k) =>
                                      k === cat.key ? null : cat.key
                                    )
                                  }
                                  className={cn(
                                    "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    mobileCatKey === cat.key
                                      ? "bg-primary/8 text-primary"
                                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                  )}
                                >
                                  <cat.icon className="size-4 shrink-0" />
                                  <span className="flex-1 text-start">
                                    {getCatLabel(cat.key)}
                                  </span>
                                  <ChevronDown
                                    className={cn(
                                      "size-3.5 transition-transform duration-200",
                                      mobileCatKey === cat.key && "rotate-180"
                                    )}
                                  />
                                </button>

                                {/* L2 Subcategories */}
                                <AnimatePresence>
                                  {mobileCatKey === cat.key && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.12 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mt-0.5 flex flex-col gap-0.5 ps-4">
                                        {cat.subcategories.map((subKey) => (
                                          <Link
                                            key={subKey}
                                            href={`/products?category=${cat.key}&subcategory=${subKey}`}
                                            onClick={closeMobileAll}
                                            className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-3 py-1.5 text-sm transition-colors"
                                          >
                                            {getSubcatLabel(cat.key, subKey)}
                                          </Link>
                                        ))}
                                        <Link
                                          href={`/products?category=${cat.key}`}
                                          onClick={closeMobileAll}
                                          className="text-primary hover:bg-primary/5 flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
                                        >
                                          {t("viewAll")}
                                          <ChevronRight
                                            className={cn(
                                              "size-3.5",
                                              isRtl && "rotate-180"
                                            )}
                                          />
                                        </Link>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}

                            {/* View all products */}
                            <Link
                              href="/products"
                              onClick={closeMobileAll}
                              className="text-primary hover:bg-primary/5 mt-1 flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                            >
                              {t("viewAll")}
                              <ChevronRight
                                className={cn(
                                  "size-3.5",
                                  isRtl && "rotate-180"
                                )}
                              />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                    onClick={closeMobileAll}
                  >
                    {t("contact")}
                  </Link>

                  <Link
                    href="/login"
                    className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                    onClick={closeMobileAll}
                  >
                    {t("signIn")}
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
