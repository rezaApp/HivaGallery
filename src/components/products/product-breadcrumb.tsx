"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ProductBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function ProductBreadcrumb({
  items,
  className,
}: ProductBreadcrumbProps) {
  const t = useTranslations("nav");

  const all: BreadcrumbItem[] = [
    { label: t("home"), href: "/" },
    { label: t("products"), href: "/products" },
    ...items,
  ];

  return (
    <nav
      aria-label="breadcrumb"
      className={cn("flex flex-wrap items-center gap-1", className)}
    >
      {all.map((item, idx) => {
        const isLast = idx === all.length - 1;
        return (
          <span key={idx} className="flex items-center gap-1">
            {idx > 0 && (
              <ChevronRight className="text-muted-foreground/50 size-3.5 shrink-0 rtl:rotate-180" />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href as "/"}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  "text-sm",
                  isLast
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
