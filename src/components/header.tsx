"use client";

import { useState, useTransition } from "react";
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
import { Globe, Menu, X } from "lucide-react";
import { useLocaleStore, type Locale } from "@/store/locale";
import { ThemeToggle } from "@/components/theme-toggle";

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
    <header className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

          <ThemeToggle />

          {/* Language switcher */}
          <Select
            value={locale}
            onValueChange={handleLocaleChange}
            disabled={isPending}
          >
            <SelectTrigger
              className="h-9 w-35 gap-1.5"
              aria-label="Select language"
            >
              <Globe className="text-muted-foreground h-4 w-4 shrink-0" />
              <SelectValue />
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
      {mobileOpen && (
        <div className="border-border bg-background border-t md:hidden">
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
      )}
    </header>
  );
}
