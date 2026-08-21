"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth";
export default function ProfilePage() {
  const t = useTranslations("account");
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  useEffect(() => {
    if (!user) router.replace("/login");
  }, [router, user]);
  if (!user) return null;
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
      <h1 className="text-foreground mb-2 text-3xl font-bold">
        {t("profile")}
      </h1>
      <p className="text-muted-foreground mb-8">{t("profileIntro")}</p>
      <Card className="grid gap-6 p-6 sm:grid-cols-2">
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
      </Card>
    </main>
  );
}
