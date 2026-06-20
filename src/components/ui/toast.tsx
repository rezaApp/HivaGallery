"use client";

import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, X } from "lucide-react";
import { useToastStore } from "@/store/toast";

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="pointer-events-none fixed end-4 bottom-4 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-auto"
          >
            <div className="bg-background border-border flex w-80 items-start gap-3 rounded-xl border p-4 shadow-lg">
              <CheckCircle2 className="text-primary mt-0.5 size-5 shrink-0" />
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="text-foreground truncate text-sm leading-none font-semibold">
                  {toast.title}
                </p>
                <p className="text-muted-foreground text-sm">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-muted-foreground hover:text-foreground -mt-0.5 shrink-0 transition-colors"
                aria-label="Dismiss"
              >
                <X className="size-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
