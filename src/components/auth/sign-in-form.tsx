"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Phone, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  emailSchema,
  mobileSchema,
  type CredentialFormValues,
} from "@/lib/validations/auth";

export type AuthMethod = "mobile" | "email";

interface Props {
  onSubmit: (credential: string, method: AuthMethod) => void;
}

export function SignInForm({ onSubmit }: Props) {
  const t = useTranslations("auth");
  const tv = useTranslations("validation");
  const [method, setMethod] = useState<AuthMethod>("mobile");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CredentialFormValues>({
    resolver: zodResolver(method === "email" ? emailSchema : mobileSchema),
    defaultValues: { value: "" },
  });

  function switchMethod(next: AuthMethod) {
    setMethod(next);
    reset({ value: "" });
  }

  function onValid(values: CredentialFormValues) {
    onSubmit(values.value.trim(), method);
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

      <form onSubmit={handleSubmit(onValid)} className="space-y-4">
        <div className="space-y-1.5">
          <Input
            key={method}
            type={method === "email" ? "email" : "tel"}
            inputMode={method === "email" ? "email" : "numeric"}
            placeholder={t(
              method === "mobile" ? "mobilePlaceholder" : "emailPlaceholder"
            )}
            autoComplete={method === "email" ? "email" : "tel"}
            dir="ltr"
            autoFocus
            aria-invalid={!!errors.value}
            {...register("value")}
          />
          {errors.value && (
            <p className="text-destructive text-xs">
              {tv(
                errors.value.message as
                  | "required"
                  | "invalidEmail"
                  | "invalidMobile"
              )}
            </p>
          )}
        </div>
        <Button type="submit" className="h-10 w-full">
          {t("continue")}
        </Button>
      </form>
    </div>
  );
}
