import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductReview } from "@/types";

function StarRating({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const iconClass = size === "md" ? "size-5" : "size-4";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            iconClass,
            i < Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground/25"
          )}
        />
      ))}
    </div>
  );
}

interface ProductReviewsProps {
  reviews: ProductReview[];
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  const t = useTranslations("products.detail");

  if (reviews.length === 0) {
    return (
      <p className="text-muted-foreground py-8 text-center text-sm">
        {t("noReviews")}
      </p>
    );
  }

  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      {/* Summary bar */}
      <div className="border-border/40 bg-muted/20 flex items-center gap-4 rounded-xl border p-5">
        <div className="text-center">
          <p className="text-foreground text-4xl font-bold">{avg.toFixed(1)}</p>
          <StarRating rating={avg} size="md" />
          <p className="text-muted-foreground mt-1 text-xs">
            {t("reviewsCount", { count: reviews.length })}
          </p>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter(
              (r) => Math.round(r.rating) === star
            ).length;
            const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-muted-foreground w-3 shrink-0 text-xs">
                  {star}
                </span>
                <Star className="size-3 shrink-0 fill-amber-400 text-amber-400" />
                <div className="bg-muted h-1.5 flex-1 overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-muted-foreground w-6 shrink-0 text-right text-xs">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-border/40 space-y-3 rounded-xl border p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-full text-sm font-semibold">
                    {review.author[0]}
                  </div>
                  <div>
                    <p className="text-foreground text-sm leading-none font-semibold">
                      {review.author}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {t("verifiedPurchase")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="shrink-0 space-y-1 text-end">
                <StarRating rating={review.rating} />
                <p className="text-muted-foreground text-xs">{review.date}</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {review.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
