"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowUpAZ,
  ArrowDownAZ,
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, type Product } from "@/components/products/product-card";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

const PRODUCT_DATA: { id: string; priceUsd: number; categoryKey: string }[] = [
  { id: "1", priceUsd: 59.99, categoryKey: "electronics" },
  { id: "2", priceUsd: 24.5, categoryKey: "electronics" },
  { id: "3", priceUsd: 89.99, categoryKey: "sports" },
  { id: "4", priceUsd: 35.0, categoryKey: "sports" },
  { id: "5", priceUsd: 149.99, categoryKey: "kitchen" },
  { id: "6", priceUsd: 45.0, categoryKey: "accessories" },
  { id: "7", priceUsd: 75.0, categoryKey: "accessories" },
  { id: "8", priceUsd: 22.0, categoryKey: "sports" },
  { id: "9", priceUsd: 38.99, categoryKey: "homeOffice" },
  { id: "10", priceUsd: 129.0, categoryKey: "electronics" },
];

const CATEGORY_KEYS = Array.from(
  new Set(PRODUCT_DATA.map((p) => p.categoryKey))
);

const SORT_ICONS = {
  "name-asc": ArrowUpAZ,
  "name-desc": ArrowDownAZ,
  "price-asc": ArrowUpNarrowWide,
  "price-desc": ArrowDownWideNarrow,
} as const;

type SortKey = keyof typeof SORT_ICONS;
type Columns = 3 | 4 | 6;

const GRID_COLS: Record<Columns, string> = {
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
};

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function ProductsPage() {
  const t = useTranslations("products");

  const [sort, setSort] = useState<SortKey>("name-asc");
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [columns, setColumns] = useState<Columns>(4);
  const [page, setPage] = useState(1);

  const categoryLabels: Record<string, string> = {
    electronics: t("categories.electronics"),
    sports: t("categories.sports"),
    kitchen: t("categories.kitchen"),
    accessories: t("categories.accessories"),
    homeOffice: t("categories.homeOffice"),
  };

  const sortOptions: {
    key: SortKey;
    label: string;
    Icon: React.ElementType;
  }[] = [
    { key: "name-asc", label: t("sortNameAsc"), Icon: SORT_ICONS["name-asc"] },
    {
      key: "name-desc",
      label: t("sortNameDesc"),
      Icon: SORT_ICONS["name-desc"],
    },
    {
      key: "price-asc",
      label: t("sortPriceAsc"),
      Icon: SORT_ICONS["price-asc"],
    },
    {
      key: "price-desc",
      label: t("sortPriceDesc"),
      Icon: SORT_ICONS["price-desc"],
    },
  ];

  const allProducts: Product[] = PRODUCT_DATA.map((data) => ({
    id: data.id,
    priceUsd: data.priceUsd,
    categoryKey: data.categoryKey,
    category: categoryLabels[data.categoryKey] ?? data.categoryKey,
    name: t(`items.${data.id}.name` as Parameters<typeof t>[0]),
    description: t(`items.${data.id}.description` as Parameters<typeof t>[0]),
  }));

  const filtered = useMemo(() => {
    let result = [...allProducts];
    if (activeKeys.size > 0) {
      result = result.filter((p) => activeKeys.has(p.categoryKey));
    }
    result.sort((a, b) => {
      switch (sort) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.priceUsd - b.priceUsd;
        case "price-desc":
          return b.priceUsd - a.priceUsd;
      }
    });
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, activeKeys, t]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const from = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const to = Math.min(safePage * PAGE_SIZE, filtered.length);
  const paginated = filtered.slice(from - 1, to);
  const pageNumbers = getPageNumbers(safePage, totalPages);

  function handleSort(key: SortKey) {
    setSort(key);
    setPage(1);
  }
  function handleToggleKey(key: string) {
    setActiveKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    setPage(1);
  }
  function handleClearFilters() {
    setActiveKeys(new Set());
    setPage(1);
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="space-y-1">
        <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("subtitle", { count: PRODUCT_DATA.length })}
        </p>
      </section>

      {/* Sort + Columns row */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            {t("sortBy")}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sortOptions.map(({ key, label, Icon }) => (
              <Button
                key={key}
                size="sm"
                variant={sort === key ? "default" : "outline"}
                onClick={() => handleSort(key)}
                className="gap-1.5"
              >
                <Icon className="size-3.5" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            {t("columns")}
          </p>
          <div className="flex gap-1.5">
            {([3, 4, 6] as Columns[]).map((cols) => (
              <Button
                key={cols}
                size="icon"
                variant={columns === cols ? "default" : "outline"}
                onClick={() => setColumns(cols)}
                aria-label={t("columnsAriaLabel", { count: cols })}
                className="text-sm font-bold"
              >
                {cols}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          {t("category")}
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_KEYS.map((key) => (
            <Button
              key={key}
              size="sm"
              variant={activeKeys.has(key) ? "default" : "outline"}
              onClick={() => handleToggleKey(key)}
            >
              {categoryLabels[key]}
            </Button>
          ))}
          {activeKeys.size > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleClearFilters}
              className="text-muted-foreground"
            >
              {t("clearFilters")}
            </Button>
          )}
        </div>
      </div>

      {/* Showing count */}
      <p className="text-muted-foreground text-sm">
        {filtered.length === 0
          ? t("noResults")
          : t("showing", { from, to, total: filtered.length })}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleClearFilters}
            className="text-primary"
          >
            {t("clearFilters")}
          </Button>
        </div>
      ) : (
        <div className={cn("grid gap-4", GRID_COLS[columns])}>
          {paginated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label={t("pagination.pageOf", {
            page: safePage,
            total: totalPages,
          })}
          className="flex items-center justify-center gap-1"
        >
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            aria-label={t("pagination.previous")}
          >
            <ChevronLeft className="size-4" />
          </Button>

          {pageNumbers.map((n, i) =>
            n === "..." ? (
              <span
                key={`ellipsis-${i}`}
                className="text-muted-foreground flex size-7 items-center justify-center text-sm"
              >
                …
              </span>
            ) : (
              <Button
                key={n}
                variant={n === safePage ? "default" : "outline"}
                size="icon-sm"
                onClick={() => setPage(n)}
                aria-label={t("pagination.goToPage", { page: n })}
                aria-current={n === safePage ? "page" : undefined}
              >
                {n}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            aria-label={t("pagination.next")}
          >
            <ChevronRight className="size-4" />
          </Button>
        </nav>
      )}
    </main>
  );
}
