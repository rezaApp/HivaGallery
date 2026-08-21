"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { StepIndicator } from "@/components/checkout/step-indicator";
import { AddressForm } from "@/components/checkout/address-form";
import { DeliveryForm } from "@/components/checkout/delivery-form";
import type { DeliveryDto } from "@/types";
import { PaymentStep } from "@/components/checkout/payment-step";
import type { AddressFormValues } from "@/lib/validations/checkout";
import { useAddressStore } from "@/store/addresses";
import { Button } from "@/components/ui/button";

type Step = "address" | "delivery" | "payment";
const STEPS: Step[] = ["address", "delivery", "payment"];

export default function CheckoutPage() {
  const t = useTranslations("checkout");

  const [step, setStep] = useState<Step>("address");
  const [addressData, setAddressData] = useState<AddressFormValues | null>(
    null
  );
  const [deliveryData, setDeliveryData] = useState<DeliveryDto | null>(null);
  const savedAddresses = useAddressStore((s) => s.addresses);
  const selectedAddressData =
    addressData ?? savedAddresses.find((address) => address.isDefault);

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
        <>
          {savedAddresses.length > 0 && (
            <div className="mb-5 space-y-3">
              <h2 className="text-foreground font-semibold">
                {t("address.savedTitle")}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {savedAddresses.map((address) => (
                  <Button
                    key={address.id}
                    type="button"
                    variant="outline"
                    className="h-auto justify-start p-4 text-start whitespace-normal"
                    onClick={() => {
                      setAddressData(address);
                      setStep("delivery");
                    }}
                  >
                    <span>
                      <span className="text-foreground block font-semibold">
                        {address.title}
                        {address.isDefault ? ` (${t("address.default")})` : ""}
                      </span>
                      <span className="text-muted-foreground mt-1 block text-xs">
                        {address.city}، {address.address}
                      </span>
                    </span>
                  </Button>
                ))}
              </div>
              <p className="text-muted-foreground text-center text-xs">
                {t("address.orNew")}
              </p>
            </div>
          )}
          <AddressForm
            defaultValues={selectedAddressData ?? undefined}
            onSubmit={(data) => {
              setAddressData(data);
              setStep("delivery");
            }}
          />
        </>
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
          onEditAddress={() => setStep("address")}
          onEditDelivery={() => setStep("delivery")}
        />
      )}
    </main>
  );
}
