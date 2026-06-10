"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
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
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={active}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="inline-flex"
        >
          <Icon className="size-4.5" />
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
