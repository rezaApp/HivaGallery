"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore, type Theme } from "@/store/theme";

const CYCLE: Theme[] = ["system", "light", "dark"];

const ICONS: Record<Theme, React.ElementType> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

const LABELS: Record<Theme, string> = {
  system: "System theme",
  light: "Light theme",
  dark: "Dark theme",
};

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();
  const mounted = useSyncExternalStore(
    (cb) => {
      window.addEventListener("load", cb);
      return () => window.removeEventListener("load", cb);
    },
    () => true,
    () => false
  );

  function handleClick() {
    setTheme(CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length]);
  }

  const active = mounted ? theme : "system";
  const Icon = ICONS[active];

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      aria-label={LABELS[active]}
      disabled={!mounted}
    >
      <Icon className="size-4.5 transition-transform duration-200" />
    </Button>
  );
}
