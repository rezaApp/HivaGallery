"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { OtpForm } from "@/components/auth/otp-form";
import { useAuthFlowStore } from "@/store/auth";

export default function OtpVerifyPage() {
  const router = useRouter();
  const { credential, method, reset } = useAuthFlowStore();

  useEffect(() => {
    if (!credential) {
      router.replace("/login");
    }
  }, [credential, router]);

  function handleBack() {
    reset();
    router.push("/login");
  }

  function handleVerify(otp: string) {
    // TODO: call verify API with credential + otp
    console.log("verify", { credential, otp });
  }

  if (!credential) return null;

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="bg-card border-border w-full max-w-sm rounded-2xl border p-8 shadow-sm">
        <OtpForm
          credential={credential}
          method={method}
          onBack={handleBack}
          onVerify={handleVerify}
        />
      </div>
    </main>
  );
}
