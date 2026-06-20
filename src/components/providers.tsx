"use client";

import { useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { useThemeStore } from "@/store/theme";
import { ToastContainer } from "@/components/ui/toast";

function ThemeSync() {
  const { setTheme } = useTheme();
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeSync />
      {children}
      <ToastContainer />
    </ThemeProvider>
  );
}
