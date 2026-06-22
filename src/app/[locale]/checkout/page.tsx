"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { StepIndicator } from "@/components/checkout/step-indicator";
import { AddressForm } from "@/components/checkout/address-form";
import { DeliveryForm } from "@/components/checkout/delivery-form";
import type { DeliveryDto } from "@/types";
import { PaymentStep } from "@/components/checkout/payment-step";
import type { AddressFormValues } from "@/lib/validations/checkout";

type Step = "address" | "delivery" | "payment";
const STEPS: Step[] = ["address", "delivery", "payment"];

export default function CheckoutPage() {
  const t = useTranslations("checkout");

  const [step, setStep] = useState<Step>("address");
  const [addressData, setAddressData] = useState<AddressFormValues | null>(
    null
  );
  const [deliveryData, setDeliveryData] = useState<DeliveryDto | null>(null);

  const currentIndex = STEPS.indexOf(step);
  const stepLabels = [
    t("steps.address"),
    t("steps.delivery"),
    t("steps.payment"),
  ];

  return (
    <main className="mx-auto w-full max-w-2xl space-y-8 px-6 py-16">
      <section className="space-y-2 text-center">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          {t("title")}
        </h1>
      </section>

      <StepIndicator labels={stepLabels} current={currentIndex} />

      {step === "address" && (
        <AddressForm
          defaultValues={addressData ?? undefined}
          onSubmit={(data) => {
            setAddressData(data);
            setStep("delivery");
          }}
        />
      )}

      {step === "delivery" && (
        <DeliveryForm
          defaultValues={deliveryData ?? undefined}
          onSubmit={(data) => {
            setDeliveryData(data);
            setStep("payment");
          }}
          onBack={() => setStep("address")}
        />
      )}

      {step === "payment" && addressData && deliveryData && (
        <PaymentStep
          addressData={addressData}
          deliveryData={deliveryData}
          onBack={() => setStep("delivery")}
        />
      )}
    </main>
  );
}
