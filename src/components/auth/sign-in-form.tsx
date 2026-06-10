"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type AuthMethod = "mobile" | "email";

interface Props {
  onSubmit: (credential: string, method: AuthMethod) => void;
}

export function SignInForm({ onSubmit }: Props) {
  const t = useTranslations("auth");
  const [method, setMethod] = useState<AuthMethod>("mobile");
  const [value, setValue] = useState("");

  function switchMethod(next: AuthMethod) {
    setMethod(next);
    setValue("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value.trim(), method);
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-foreground text-2xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
      </div>

      <div className="bg-muted flex gap-1 rounded-lg p-1">
        {(["mobile", "email"] as AuthMethod[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMethod(m)}
            className={cn(
              "relative flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-sm font-medium transition-colors",
              method === m
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {method === m && (
              <motion.span
                layoutId="auth-method-bg"
                className="bg-background absolute inset-0 rounded-md shadow-sm"
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {m === "mobile" ? (
                <Phone className="size-4" />
              ) : (
                <Mail className="size-4" />
              )}
              {t(m)}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          key={method}
          type={method === "email" ? "email" : "tel"}
          inputMode={method === "email" ? "email" : "numeric"}
          placeholder={t(
            method === "mobile" ? "mobilePlaceholder" : "emailPlaceholder"
          )}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete={method === "email" ? "email" : "tel"}
          dir="ltr"
          autoFocus
        />
        <Button type="submit" className="h-10 w-full" disabled={!value.trim()}>
          {t("continue")}
        </Button>
      </form>
    </div>
  );
}
