"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { MapPin, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  addressSchema,
  type AddressFormValues,
} from "@/lib/validations/checkout";

const MapPicker = dynamic(() => import("./map-picker"), {
  ssr: false,
  loading: () => (
    <div className="border-border bg-muted h-64 w-full animate-pulse rounded-lg border" />
  ),
});

interface AddressFormProps {
  onSubmit: (data: AddressFormValues) => void;
  defaultValues?: Partial<AddressFormValues>;
}

export function AddressForm({ onSubmit, defaultValues }: AddressFormProps) {
  const t = useTranslations("checkout.address");
  const tv = useTranslations("validation");

  const [showMap, setShowMap] = useState(!!defaultValues?.coordinates);
  const [hasPin, setHasPin] = useState(!!defaultValues?.coordinates);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues ?? {
      fullName: "",
      phone: "",
      province: "",
      city: "",
      address: "",
      postalCode: "",
    },
  });

  function handleRemovePin() {
    setValue("coordinates", undefined);
    setHasPin(false);
    setShowMap(false);
  }

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-primary/10 flex size-10 items-center justify-center rounded-full">
          <MapPin className="text-primary size-5" />
        </div>
        <div>
          <h2 className="text-foreground font-semibold">{t("title")}</h2>
          <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label={t("fullName")}
            error={errors.fullName && tv(errors.fullName.message as "required")}
          >
            <Input
              placeholder={t("fullNamePlaceholder")}
              aria-invalid={!!errors.fullName}
              {...register("fullName")}
            />
          </Field>

          <Field
            label={t("phone")}
            error={
              errors.phone &&
              tv(errors.phone.message as "required" | "invalidPhone")
            }
          >
            <Input
              type="tel"
              placeholder={t("phonePlaceholder")}
              dir="ltr"
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label={t("province")}
            error={errors.province && tv(errors.province.message as "required")}
          >
            <Input
              placeholder={t("provincePlaceholder")}
              aria-invalid={!!errors.province}
              {...register("province")}
            />
          </Field>

          <Field
            label={t("city")}
            error={errors.city && tv(errors.city.message as "required")}
          >
            <Input
              placeholder={t("cityPlaceholder")}
              aria-invalid={!!errors.city}
              {...register("city")}
            />
          </Field>
        </div>

        <Field
          label={t("address")}
          error={
            errors.address &&
            tv(errors.address.message as "required" | "addressTooShort")
          }
        >
          <textarea
            placeholder={t("addressPlaceholder")}
            rows={3}
            aria-invalid={!!errors.address}
            className={cn(
              "border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 w-full resize-none rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors outline-none focus-visible:ring-3 aria-invalid:ring-3"
            )}
            {...register("address")}
          />
        </Field>

        <Field label={t("postalCode")}>
          <Input
            placeholder={t("postalCodePlaceholder")}
            dir="ltr"
            {...register("postalCode")}
          />
        </Field>

        {/* Map location picker */}
        <div className="border-border rounded-xl border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <MapPin
                className={cn(
                  "size-4",
                  hasPin ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span className="text-sm font-medium">{t("mapTitle")}</span>
              {hasPin && <CheckCircle className="text-primary size-4" />}
            </div>

            <div className="flex items-center gap-2">
              {hasPin && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleRemovePin}
                  aria-label={t("removePin")}
                >
                  <X className="size-3.5" />
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowMap((v) => !v)}
              >
                {showMap ? t("hideMap") : t("pinLocation")}
              </Button>
            </div>
          </div>

          {showMap && (
            <div className="border-border border-t px-4 pt-3 pb-4">
              <p className="text-muted-foreground mb-3 text-xs">
                {t("mapSubtitle")}
              </p>
              <MapPicker
                value={defaultValues?.coordinates}
                onChange={(c) => {
                  setValue("coordinates", c, { shouldDirty: true });
                  setHasPin(true);
                }}
              />
            </div>
          )}
        </div>

        <Button type="submit" className="h-10 w-full" size="lg">
          {t("next")}
        </Button>
      </form>
    </Card>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
