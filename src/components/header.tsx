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
import { Globe, Home, Menu, ShoppingCart, X } from "lucide-react";
import { useLocaleStore, type Locale } from "@/store/locale";
import { useCartStore } from "@/store/cart";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "fa", label: "فارسی" },
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

export function Header() {
  const t = useTranslations("nav");
  const { locale, setLocale } = useLocaleStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartStore((s) => s.items.length);

  const [hidden, setHidden] = useState(false);
  const scrollHiddenRef = useRef(false);
  const overrideRef = useRef<boolean | null>(null);

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
    setLocale(newLocale); // instant — DirectionProvider reacts immediately
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

  const navLinks = [
    { href: "/" as const, label: t("home") },
    { href: "/about" as const, label: t("about") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <>
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
              className="bg-background/70 border-border/40 rounded-full shadow-lg backdrop-blur-md"
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
        <div className="bg-background/70 border-border/40 mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border ps-12 pe-4 shadow-lg backdrop-blur-md sm:ps-14 sm:pe-6 lg:pe-8">
          {/* Brand */}
          <Link
            href="/"
            className="text-foreground text-xl font-bold tracking-tight"
          >
            Hiva
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                {label}
              </Link>
            ))}
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

            {/* Language switcher */}
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

            {/* Mobile toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
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

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden md:hidden"
            >
              <div className="bg-background/70 border-border/40 mx-auto mt-2 max-w-7xl rounded-2xl border shadow-lg backdrop-blur-md">
                <nav className="flex flex-col gap-1 px-4 py-3">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                  <Link
                    href="/login"
                    className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setMobileOpen(false)}
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
