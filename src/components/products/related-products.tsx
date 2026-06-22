import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/store/toast";
import { formatPrice } from "@/lib/currency";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { ProductDetail } from "@/lib/product-data";

interface RelatedProductsProps {
  products: ProductDetail[];
  getProductName: (id: string) => string;
  getProductDescription: (id: string) => string;
}

export function RelatedProducts({
  products,
  getProductName,
  getProductDescription,
}: RelatedProductsProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("products");
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  if (products.length === 0) return null;

  function handleAddToBasket(product: ProductDetail) {
    const name = getProductName(product.id);
    addItem({
      id: product.id,
      name,
      description: getProductDescription(product.id),
      priceUsd: product.priceUsd,
    });
    addToast(name, t("addedToBasket"));
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const name = getProductName(product.id);
        const description = getProductDescription(product.id);
        return (
          <Card
            key={product.id}
            className="group relative flex flex-col overflow-hidden transition-shadow hover:shadow-md"
          >
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
                <h3 className="text-card-foreground text-sm leading-tight font-semibold">
                  <Link
                    href={`/products/${product.id}` as "/"}
                    className="hover:text-primary"
                  >
                    {name}
                  </Link>
                </h3>
                <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                  {description}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between gap-2">
                <span className="text-foreground text-sm font-bold">
                  {formatPrice(product.priceUsd, locale)}
                </span>
                <Button
                  size="icon-sm"
                  onClick={() => handleAddToBasket(product)}
                  aria-label={t("addToBasket", { name })}
                >
                  <ShoppingCart className="size-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
