"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  UserRound,
  History,
} from "lucide-react";

export function UserMenu() {
  const t = useTranslations("account");
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const [open, setOpen] = useState(false);

  if (!user) return null;
  const items = [
    ["/profile", "profile", UserRound],
    ["/orders", "orders", Package],
    ["/addresses", "addresses", MapPin],
    ["/recently-viewed", "recentlyViewed", History],
    ["/dashboard", "dashboard", LayoutDashboard],
  ] as const;

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={t("account")}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="border-border bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full border text-sm font-bold shadow-sm transition-transform hover:scale-105"
      >
        {user.name.slice(0, 1)}
        <ChevronDown
          className={cn(
            "bg-background text-foreground absolute -end-1 -bottom-1 size-3 rounded-full transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="bg-popover border-border absolute end-0 top-11 z-50 w-64 rounded-xl border p-2 shadow-xl">
          <div className="border-border mb-1 border-b px-3 py-2">
            <p className="text-popover-foreground font-semibold">{user.name}</p>
            <p className="text-muted-foreground text-xs" dir="ltr">
              {user.mobile}
            </p>
          </div>
          {items.map(([href, key, Icon]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors"
            >
              <Icon className="size-4" />
              {t(key)}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              signOut();
              setOpen(false);
              router.push("/");
            }}
            className="text-destructive hover:bg-destructive/10 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors"
          >
            <LogOut className="size-4" />
            {t("signOut")}
          </button>
        </div>
      )}
    </div>
  );
}
