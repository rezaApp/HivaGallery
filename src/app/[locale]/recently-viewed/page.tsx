"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth";
import { PRODUCTS } from "@/lib/mock-products";
import { formatPrice } from "@/lib/currency";
import { useLocale } from "next-intl";
export default function RecentlyViewedPage() {
  const t = useTranslations("account");
  const locale = useLocale() as "fa" | "en" | "ar";
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  useEffect(() => {
    if (!user) router.replace("/login");
  }, [router, user]);
  if (!user) return null;
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
      <h1 className="text-foreground mb-2 text-3xl font-bold">
        {t("recentlyViewed")}
      </h1>
      <p className="text-muted-foreground mb-8">{t("recentlyIntro")}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.slice(0, 3).map((product) => (
          <Card key={product.id} className="p-5">
            <h2 className="text-foreground font-semibold">
              {t("product", { id: product.id })}
            </h2>
            <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
              {product.longDescription}
            </p>
            <p className="text-primary mt-4 font-bold">
              {formatPrice(product.priceUsd, locale)}
            </p>
          </Card>
        ))}
      </div>
    </main>
  );
}
