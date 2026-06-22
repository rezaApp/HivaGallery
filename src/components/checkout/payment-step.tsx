"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  CreditCard,
  MapPin,
  Clock,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/currency";
import type { AddressFormValues } from "@/lib/validations/checkout";
import type { DeliveryDto } from "@/types";
import type { Locale } from "@/i18n/routing";

interface PaymentStepProps {
  addressData: AddressFormValues;
  deliveryData: DeliveryDto;
  onBack: () => void;
}

export function PaymentStep({
  addressData,
  deliveryData,
  onBack,
}: PaymentStepProps) {
  const t = useTranslations("checkout.payment");
  const td = useTranslations("checkout.delivery");
  const locale = useLocale() as Locale;
  const items = useCartStore((s) => s.items);

  const total = items.reduce(
    (sum, item) => sum + item.priceUsd * item.quantity,
    0
  );

  const isRtl = locale === "fa" || locale === "ar";
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  const dateLabel: Record<DeliveryDto["date"], string> = {
    today: td("today"),
    tomorrow: td("tomorrow"),
    dayAfterTomorrow: td("dayAfterTomorrow"),
  };

  const slotLabel: Record<DeliveryDto["timeSlot"], string> = {
    morning: `${td("morning")} (${td("morningTime")})`,
    afternoon: `${td("afternoon")} (${td("afternoonTime")})`,
    evening: `${td("evening")} (${td("eveningTime")})`,
  };

  return (
    <div className="space-y-4">
      <Card className="space-y-4 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex size-10 items-center justify-center rounded-full">
            <ShoppingBag className="text-primary size-5" />
          </div>
          <h2 className="text-foreground font-semibold">{t("orderSummary")}</h2>
        </div>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-foreground">
                {item.name}{" "}
                <span className="text-muted-foreground">×{item.quantity}</span>
              </span>
              <span className="font-medium">
                {formatPrice(item.priceUsd * item.quantity, locale)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t pt-3 font-bold">
          <span>{t("total")}</span>
          <span>{formatPrice(total, locale)}</span>
        </div>
      </Card>

      <Card className="space-y-3 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex size-10 items-center justify-center rounded-full">
            <MapPin className="text-primary size-5" />
          </div>
          <h2 className="text-foreground font-semibold">{t("addressInfo")}</h2>
        </div>
        <div className="space-y-1 text-sm">
          <p className="text-foreground font-medium">{addressData.fullName}</p>
          <p className="text-muted-foreground" dir="ltr">
            {addressData.phone}
          </p>
          <p className="text-muted-foreground">
            {[addressData.province, addressData.city]
              .filter(Boolean)
              .join(" — ")}
          </p>
          <p className="text-muted-foreground">{addressData.address}</p>
          {addressData.postalCode && (
            <p className="text-muted-foreground" dir="ltr">
              {addressData.postalCode}
            </p>
          )}
          {addressData.coordinates && (
            <span className="text-primary bg-primary/10 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium">
              <MapPin className="size-3" />
              {t("locationPinned")}
            </span>
          )}
        </div>
      </Card>

      <Card className="space-y-3 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex size-10 items-center justify-center rounded-full">
            <Clock className="text-primary size-5" />
          </div>
          <h2 className="text-foreground font-semibold">{t("deliveryInfo")}</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          {dateLabel[deliveryData.date]} — {slotLabel[deliveryData.timeSlot]}
        </p>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <BackArrow className="size-4" />
          {t("back")}
        </Button>
        <Button className="h-11 flex-1 gap-2" size="lg">
          <CreditCard className="size-5" />
          {t("pay")}
        </Button>
      </div>
    </div>
  );
}
