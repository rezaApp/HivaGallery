"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  credentialSchema,
  detectMethod,
  type CredentialFormValues,
} from "@/lib/validations/auth";
import type { AuthMethod } from "@/types";

interface Props {
  onSubmit: (credential: string, method: AuthMethod) => void;
}

export function SignInForm({ onSubmit }: Props) {
  const t = useTranslations("auth");
  const tv = useTranslations("validation");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialFormValues>({
    resolver: zodResolver(credentialSchema),
    defaultValues: { value: "" },
  });

  function onValid({ value }: CredentialFormValues) {
    const trimmed = value.trim();
    onSubmit(trimmed, detectMethod(trimmed));
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-foreground text-2xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit(onValid)} className="space-y-4">
        <div className="space-y-1.5">
          <Input
            type="text"
            inputMode="email"
            placeholder={t("credentialPlaceholder")}
            autoComplete="username"
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
