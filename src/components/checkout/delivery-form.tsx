"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";
import type { DeliveryDate, TimeSlot, DeliveryDto } from "@/types";

interface DeliveryFormProps {
  onSubmit: (data: DeliveryDto) => void;
  onBack: () => void;
  defaultValues?: Partial<DeliveryDto>;
}

const DATE_LOCALES: Record<Locale, string> = {
  fa: "fa-IR",
  ar: "ar-SA",
  en: "en-US",
};

export function DeliveryForm({
  onSubmit,
  onBack,
  defaultValues,
}: DeliveryFormProps) {
  const t = useTranslations("checkout.delivery");
  const locale = useLocale() as Locale;

  const [selectedDate, setSelectedDate] = useState<DeliveryDate>(
    defaultValues?.date ?? "today"
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(
    defaultValues?.timeSlot ?? null
  );
  const [touched, setTouched] = useState(false);
  const [now] = useState(() => Date.now());
  const dates: { key: DeliveryDate; label: string; date: Date }[] = [
    { key: "today", label: t("today"), date: new Date(now) },
    { key: "tomorrow", label: t("tomorrow"), date: new Date(now + 86400000) },
    {
      key: "dayAfterTomorrow",
      label: t("dayAfterTomorrow"),
      date: new Date(now + 86400000 * 2),
    },
  ];

  const slots: { key: TimeSlot; label: string; time: string }[] = [
    { key: "morning", label: t("morning"), time: t("morningTime") },
    { key: "afternoon", label: t("afternoon"), time: t("afternoonTime") },
    { key: "evening", label: t("evening"), time: t("eveningTime") },
  ];

  function handleSubmit() {
    setTouched(true);
    if (!selectedSlot) return;
    onSubmit({ date: selectedDate, timeSlot: selectedSlot });
  }

  const isRtl = locale === "fa" || locale === "ar";
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-primary/10 flex size-10 items-center justify-center rounded-full">
          <Calendar className="text-primary size-5" />
        </div>
        <div>
          <h2 className="text-foreground font-semibold">{t("title")}</h2>
          <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-medium">{t("selectDate")}</p>
          <div className="grid grid-cols-3 gap-3">
            {dates.map(({ key, label, date }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedDate(key)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border-2 p-3 text-sm transition-all",
                  selectedDate === key
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-foreground hover:border-primary/40"
                )}
              >
                <span className="font-semibold">{label}</span>
                <span className="text-muted-foreground text-xs">
                  {date.toLocaleDateString(DATE_LOCALES[locale], {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{t("selectTime")}</p>
            {touched && !selectedSlot && (
              <p className="text-destructive text-xs">{t("slotRequired")}</p>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {slots.map(({ key, label, time }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedSlot(key)}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-sm transition-all",
                  selectedSlot === key
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-foreground hover:border-primary/40"
                )}
              >
                <Clock className="size-4" />
                <span className="font-semibold">{label}</span>
                <span className="text-muted-foreground text-xs" dir="ltr">
                  {time}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <BackArrow className="size-4" />
          {t("back")}
        </Button>
        <Button onClick={handleSubmit} className="h-10 flex-1">
          {t("next")}
        </Button>
      </div>
    </Card>
  );
}
