"use client";

import { ShoppingCart, ShoppingBag } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/store/toast";
import { formatPrice } from "@/lib/currency";
import type { Locale } from "@/i18n/routing";
import type { ProductCardDto } from "@/types";

export type { ProductCardDto as Product };

interface ProductCardProps {
  product: ProductCardDto;
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("products");
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  function handleAddToBasket() {
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      priceUsd: product.priceUsd,
    });
    addToast(product.name, t("addedToBasket"));
  }

  return (
    <Card className="group relative flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <Link
        href={`/products/${product.id}` as "/"}
        className="absolute inset-0 z-0"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="bg-muted relative flex aspect-square items-center justify-center">
        <ShoppingBag className="text-muted-foreground size-10" />
      </div>
      <div className="relative z-10 flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-card-foreground text-sm leading-tight font-semibold">
              <Link
                href={`/products/${product.id}` as "/"}
                className="hover:text-primary"
              >
                {product.name}
              </Link>
            </h3>
            <span className="bg-primary/10 text-primary shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium">
              {product.categoryLabel}
            </span>
          </div>
          <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
            {product.description}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-foreground text-sm font-bold">
            {formatPrice(product.priceUsd, locale)}
          </span>
          <Button
            size="icon-sm"
            onClick={handleAddToBasket}
            aria-label={t("addToBasket", { name: product.name })}
          >
            <ShoppingCart className="size-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
