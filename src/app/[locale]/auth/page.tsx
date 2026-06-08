"use client";

import { useState } from "react";
import { SignInForm, type AuthMethod } from "@/components/auth/sign-in-form";
import { OtpForm } from "@/components/auth/otp-form";

type Step = "credential" | "otp";

export default function AuthPage() {
  const [step, setStep] = useState<Step>("credential");
  const [credential, setCredential] = useState("");
  const [method, setMethod] = useState<AuthMethod>("mobile");

  function handleSubmit(value: string, m: AuthMethod) {
    setCredential(value);
    setMethod(m);
    setStep("otp");
  }

  return (
    <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-6 py-16">
      {step === "credential" ? (
        <SignInForm onSubmit={handleSubmit} />
      ) : (
        <OtpForm
          credential={credential}
          method={method}
          onBack={() => setStep("credential")}
        />
      )}
    </main>
  );
}
