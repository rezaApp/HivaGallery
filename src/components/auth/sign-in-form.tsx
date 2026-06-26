"use client";

import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
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

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function SignInForm({ onSubmit }: Props) {
  const t = useTranslations("auth");
  const tv = useTranslations("validation");
  const locale = useLocale();

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

  function handleGoogleSignIn() {
    const callbackUrl = locale === "fa" ? "/" : `/${locale}`;
    signIn("google", { callbackUrl });
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

      <div className="relative flex items-center gap-3">
        <div className="bg-border/40 h-px flex-1" />
        <span className="text-muted-foreground text-xs">
          {t("orContinueWith")}
        </span>
        <div className="bg-border/40 h-px flex-1" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="bg-background/10 border-border/20 hover:bg-background/20 flex h-10 w-full cursor-pointer items-center justify-center gap-3 rounded-lg border backdrop-blur-lg transition-colors"
      >
        <GoogleIcon />
        <span className="text-sm font-medium">{t("signInWithGoogle")}</span>
      </button>
    </div>
  );
}
