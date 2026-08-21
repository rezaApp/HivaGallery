"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth";
import { MOCK_ORDERS } from "@/lib/account-data";
import { ChevronDown, Package } from "lucide-react";
import { PRODUCTS } from "@/lib/mock-products";
import { formatPrice } from "@/lib/currency";
import { useLocale } from "next-intl";
export default function OrdersPage() {
  const t = useTranslations("account");
  const tp = useTranslations("products");
  const locale = useLocale() as "fa" | "en" | "ar";
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [openOrder, setOpenOrder] = useState<string | null>(null);
  function getOrderTotal(order: (typeof MOCK_ORDERS)[number]) {
    return order.items.reduce((sum, item) => {
      const product = PRODUCTS.find((entry) => entry.id === item.productId);
      return sum + (product?.priceUsd ?? 0) * item.quantity;
    }, 0);
  }
  useEffect(() => {
    if (!user) router.replace("/login");
  }, [router, user]);
  if (!user) return null;
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
      <h1 className="text-foreground mb-2 text-3xl font-bold">{t("orders")}</h1>
      <p className="text-muted-foreground mb-8">{t("ordersIntro")}</p>
      <div className="space-y-3">
        {MOCK_ORDERS.map((order) => (
          <Card key={order.id} className="overflow-hidden p-0">
            <div className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <p className="text-foreground font-semibold">{order.id}</p>
                <p className="text-muted-foreground text-sm">{order.date}</p>
              </div>
              <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs">
                {t(order.status)}
              </span>
              <p className="text-foreground font-semibold">
                {formatPrice(getOrderTotal(order), locale)}
              </p>
              <button
                type="button"
                onClick={() =>
                  setOpenOrder(openOrder === order.id ? null : order.id)
                }
                className="text-primary hover:bg-primary/10 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              >
                {t("orderDetails")}
                <ChevronDown
                  className={`size-4 transition-transform ${openOrder === order.id ? "rotate-180" : ""}`}
                />
              </button>
            </div>
            {openOrder === order.id && (
              <div className="border-border bg-muted/30 space-y-4 border-t px-5 py-4">
                <div className="flex items-center gap-2">
                  <Package className="text-primary size-4" />
                  <h2 className="text-foreground text-sm font-semibold">
                    {t("orderedItems")}
                  </h2>
                </div>
                <div className="divide-border divide-y">
                  {order.items.map((item) => {
                    const product = PRODUCTS.find(
                      (entry) => entry.id === item.productId
                    );
                    if (!product) return null;
                    return (
                      <div
                        key={item.productId}
                        className="flex items-center justify-between gap-4 py-3 text-sm"
                      >
                        <div>
                          <p className="text-foreground font-medium">
                            {tp(
                              `items.${item.productId}.name` as Parameters<
                                typeof tp
                              >[0]
                            )}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {t("quantity")}: {item.quantity}
                          </p>
                        </div>
                        <span className="text-foreground font-medium">
                          {formatPrice(
                            product.priceUsd * item.quantity,
                            locale
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-border flex justify-between border-t pt-3 text-sm">
                  <span className="text-muted-foreground">
                    {t("orderTotal")}
                  </span>
                  <strong className="text-foreground">
                    {formatPrice(getOrderTotal(order), locale)}
                  </strong>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </main>
  );
}
