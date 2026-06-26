"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

export default function ContactForm() {
  const t = useTranslations("contact");
  const tv = useTranslations("validation");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(values: ContactFormValues) {
    // TODO: wire up API call
    console.log(values);
  }

  if (isSubmitSuccessful) {
    return (
      <main className="flex w-full flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
        <div className="bg-primary/10 flex size-16 items-center justify-center rounded-full">
          <CheckCircle className="text-primary size-8" />
        </div>
        <p className="text-foreground font-medium">{t("success")}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-lg space-y-8 px-6 py-16">
      <div className="space-y-2 text-center">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field
          label={t("name")}
          error={errors.name && tv(errors.name.message as "required")}
        >
          <Input
            placeholder={t("namePlaceholder")}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>

        <Field
          label={t("email")}
          error={
            errors.email &&
            tv(errors.email.message as "required" | "invalidEmail")
          }
        >
          <Input
            type="email"
            placeholder={t("emailPlaceholder")}
            dir="ltr"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>

        <Field
          label={t("message")}
          error={errors.message && tv(errors.message.message as "required")}
        >
          <textarea
            placeholder={t("messagePlaceholder")}
            rows={5}
            aria-invalid={!!errors.message}
            className={cn(
              "border-input bg-background/10 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 w-full resize-none rounded-lg border px-3 py-2 text-sm shadow-sm backdrop-blur-lg transition-colors outline-none focus-visible:ring-3 aria-invalid:ring-3"
            )}
            {...register("message")}
          />
        </Field>

        <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
          <Send className="size-4" />
          {t("send")}
        </Button>
      </form>
    </main>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
