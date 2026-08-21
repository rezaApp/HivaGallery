"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { OtpForm } from "@/components/auth/otp-form";
import { Card } from "@/components/ui/card";
import {
  MOCK_OTP,
  MOCK_USER,
  useAuthFlowStore,
  useAuthStore,
} from "@/store/auth";

export default function OtpVerifyPage() {
  const router = useRouter();
  const { credential, method, reset } = useAuthFlowStore();
  const setUser = useAuthStore((s) => s.setUser);

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
    if (credential === "09102930575" && otp === MOCK_OTP) {
      setUser(MOCK_USER);
      reset();
      router.replace("/dashboard");
    }
  }

  if (!credential) return null;

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm rounded-2xl p-8 shadow-sm">
        <OtpForm
          credential={credential}
          method={method}
          onBack={handleBack}
          onVerify={handleVerify}
        />
      </Card>
    </main>
  );
}
