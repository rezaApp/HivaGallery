"use client";

import { useLocale, useTranslations } from "next-intl";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/currency";
import type { Locale } from "@/i18n/routing";

export default function BasketPage() {
  const t = useTranslations("basket");
  const locale = useLocale() as Locale;
  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const removeItem = useCartStore((s) => s.removeItem);

  const total = items.reduce(
    (sum, item) => sum + item.priceUsd * item.quantity,
    0
  );

  return (
    <main className="mx-auto w-full max-w-3xl space-y-8 px-6 py-16">
      <section className="space-y-2 text-center">
        <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
      </section>

      {items.length === 0 ? (
        <p className="text-muted-foreground py-12 text-center">{t("empty")}</p>
      ) : (
        <section className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="flex items-center gap-4 p-4">
              <div className="bg-muted flex size-16 shrink-0 items-center justify-center rounded-lg">
                <ShoppingBag className="text-muted-foreground size-6" />
              </div>
              <div className="flex-1 space-y-1">
                <h2 className="text-card-foreground font-semibold">
                  {t(`${item.nameKey}Name`)}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {t(`${item.nameKey}Desc`)}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-muted-foreground text-sm">
                    {t("quantity")}:
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label={
                        item.quantity === 1 ? t("remove") : t("decrease")
                      }
                      onClick={() =>
                        item.quantity === 1
                          ? removeItem(item.id)
                          : decrement(item.id)
                      }
                    >
                      {item.quantity === 1 ? (
                        <Trash2 className="size-3.5" />
                      ) : (
                        <Minus className="size-3.5" />
                      )}
                    </Button>
                    <span className="w-6 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label={t("increase")}
                      onClick={() => increment(item.id)}
                    >
                      <Plus className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="text-foreground font-semibold whitespace-nowrap">
                {formatPrice(item.priceUsd * item.quantity, locale)}
              </div>
            </Card>
          ))}
        </section>
      )}

      {items.length > 0 && (
        <section className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between text-lg font-bold">
            <span className="text-foreground">{t("total")}</span>
            <span className="text-foreground">
              {formatPrice(total, locale)}
            </span>
          </div>
          <Button className="w-full" size="lg">
            {t("checkout")}
          </Button>
        </section>
      )}
    </main>
  );
}
