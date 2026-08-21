"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [router, user]);

  if (!user) return null;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <p className="text-muted-foreground text-sm">{t("eyebrow")}</p>
        <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title", { name: user.name })}
        </h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Card className="p-6 md:col-span-2">
          <h2 className="text-foreground mb-5 text-lg font-semibold">
            {t("profileTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm">{t("name")}</p>
              <p className="text-foreground mt-1 font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">{t("mobile")}</p>
              <p className="text-foreground mt-1 font-medium" dir="ltr">
                {user.mobile}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-foreground mb-2 text-lg font-semibold">
            {t("ordersTitle")}
          </h2>
          <p className="text-muted-foreground text-sm">{t("ordersEmpty")}</p>
        </Card>
      </div>
    </main>
  );
}
