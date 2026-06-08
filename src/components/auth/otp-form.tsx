"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AuthMethod } from "./sign-in-form";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 120;

interface Props {
  credential: string;
  method: AuthMethod;
  onBack: () => void;
  onVerify?: (otp: string) => void;
}

export function OtpForm({ credential, onBack, onVerify }: Props) {
  const t = useTranslations("auth.otp");
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (next.every((d) => d !== "")) {
      onVerify?.(next.join(""));
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!text) return;
    const next = Array(OTP_LENGTH).fill("");
    text.split("").forEach((d, i) => {
      next[i] = d;
    });
    setDigits(next);
    const focusIdx = Math.min(text.length, OTP_LENGTH - 1);
    inputRefs.current[focusIdx]?.focus();
    if (text.length === OTP_LENGTH) onVerify?.(text);
  }

  function handleResend() {
    setDigits(Array(OTP_LENGTH).fill(""));
    setSecondsLeft(RESEND_SECONDS);
    inputRefs.current[0]?.focus();
  }

  const masked =
    credential.length > 5
      ? credential.slice(0, 3) + "•••" + credential.slice(-2)
      : credential;

  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">
          {t("subtitle", { credential: masked })}
        </p>
      </div>

      <div
        className="flex justify-center gap-2"
        onPaste={handlePaste}
        dir="ltr"
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={cn(
              "border-input bg-background focus:border-ring focus:ring-ring/50 h-12 w-10 rounded-lg border text-center text-lg font-semibold transition-colors outline-none focus:ring-3",
              digit && "border-ring"
            )}
          />
        ))}
      </div>

      <div className="space-y-3 text-center">
        {secondsLeft > 0 ? (
          <p className="text-muted-foreground text-sm">
            {t("resendIn", { seconds: formatTime(secondsLeft) })}
          </p>
        ) : (
          <Button variant="ghost" size="sm" onClick={handleResend}>
            {t("resend")}
          </Button>
        )}

        <div>
          <Button variant="link" size="sm" onClick={onBack}>
            {t("change")}
          </Button>
        </div>
      </div>
    </div>
  );
}
