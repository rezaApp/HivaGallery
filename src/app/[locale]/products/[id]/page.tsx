"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  ShoppingCart,
  Minus,
  Plus,
  CheckCircle,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductBreadcrumb } from "@/components/products/product-breadcrumb";
import { ProductSpecs } from "@/components/products/product-specs";
import { ProductReviews } from "@/components/products/product-reviews";
import { RelatedProducts } from "@/components/products/related-products";
import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/store/toast";
import { formatPrice } from "@/lib/currency";
import { getProduct, getRelatedProducts } from "@/lib/product-data";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Tab = "specs" | "reviews";

export default function ProductDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);

  const locale = useLocale() as Locale;
  const t = useTranslations("products");
  const td = useTranslations("products.detail");

  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("specs");

  const product = getProduct(id);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <ShoppingBag className="text-muted-foreground size-16" />
        <p className="text-foreground text-xl font-semibold">
          {td("notFound")}
        </p>
        <Link
          href="/products"
          className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          {td("backToProducts")}
        </Link>
      </div>
    );
  }

  const name = t(`items.${product.id}.name` as Parameters<typeof t>[0]);
  const description = t(
    `items.${product.id}.description` as Parameters<typeof t>[0]
  );
  const categoryLabel = t(
    `categories.${product.categoryKey}` as Parameters<typeof t>[0]
  );

  const related = getRelatedProducts(product.relatedIds);

  function handleAddToBasket() {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product!.id,
        name,
        description,
        priceUsd: product!.priceUsd,
      });
    }
    addToast(name, t("addedToBasket"));
    setQty(1);
  }

  function getRelatedName(pid: string) {
    return t(`items.${pid}.name` as Parameters<typeof t>[0]);
  }

  function getRelatedDescription(pid: string) {
    return t(`items.${pid}.description` as Parameters<typeof t>[0]);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <ProductBreadcrumb
        items={[
          {
            label: categoryLabel,
            href: `/products?category=${product.categoryKey}` as "/",
          },
          { label: name },
        ]}
      />

      {/* Hero */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image placeholder */}
        <div className="bg-muted from-primary/5 to-primary/10 flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br">
          <ShoppingBag className="text-primary/20 size-32" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
              {categoryLabel}
            </span>
            <h1 className="text-foreground text-2xl leading-tight font-bold sm:text-3xl">
              {name}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-foreground text-3xl font-bold">
              {formatPrice(product.priceUsd, locale)}
            </span>
            <span className="text-success flex items-center gap-1.5 text-sm font-medium">
              <CheckCircle className="size-4" />
              {td("inStock")}
            </span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-foreground text-sm font-medium">
              {td("quantity")}
            </span>
            <div className="flex items-center rounded-lg border">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="text-muted-foreground hover:text-foreground flex size-9 items-center justify-center transition-colors"
                aria-label="decrease"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="text-foreground w-10 text-center text-sm font-semibold select-none">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="text-muted-foreground hover:text-foreground flex size-9 items-center justify-center transition-colors"
                aria-label="increase"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Add to basket */}
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={handleAddToBasket}
          >
            <ShoppingCart className="size-5" />
            {td("addToBasket")}
          </Button>

          {/* Back link */}
          <Link
            href="/products"
            className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1.5 text-sm transition-colors"
          >
            <ChevronLeft className="size-4 rtl:rotate-180" />
            {td("backToProducts")}
          </Link>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <h2 className="text-foreground text-xl font-bold">
          {td("descriptionTitle")}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {product.longDescription}
        </p>
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="flex gap-1 border-b">
          {(["specs", "reviews"] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative px-5 py-3 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab === "specs" ? td("specsTitle") : td("reviewsTitle")}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-indicator"
                  className="bg-primary absolute inset-x-0 bottom-0 h-0.5 rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
          >
            {activeTab === "specs" ? (
              <ProductSpecs specs={product.specs} />
            ) : (
              <ProductReviews reviews={product.reviews} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-foreground text-xl font-bold">
            {td("relatedTitle")}
          </h2>
          <RelatedProducts
            products={related}
            getProductName={getRelatedName}
            getProductDescription={getRelatedDescription}
          />
        </div>
      )}
    </div>
  );
}
