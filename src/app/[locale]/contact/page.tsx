"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const canSubmit =
    form.name.trim() && form.email.trim() && form.message.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    // TODO: wire up API call
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
        <CheckCircle className="size-12 text-green-500" />
        <p className="text-foreground font-medium">{t("success")}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg space-y-8 px-6 py-16">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label={t("name")}>
          <Input
            placeholder={t("namePlaceholder")}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />
        </Field>

        <Field label={t("email")}>
          <Input
            type="email"
            placeholder={t("emailPlaceholder")}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
            dir="ltr"
          />
        </Field>

        <Field label={t("message")}>
          <textarea
            placeholder={t("messagePlaceholder")}
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            required
            rows={5}
            className={cn(
              "border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full resize-none rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors outline-none focus-visible:ring-3"
            )}
          />
        </Field>

        <Button type="submit" className="h-10 w-full" disabled={!canSubmit}>
          <Send className="size-4" />
          {t("send")}
        </Button>
      </form>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
