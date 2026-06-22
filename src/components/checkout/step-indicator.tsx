"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  labels: string[];
  current: number;
}

export function StepIndicator({ labels, current }: StepIndicatorProps) {
  return (
    <div className="flex w-full items-start">
      {labels.map((label, index) => (
        <div key={index} className="flex flex-1 items-start last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                index < current
                  ? "border-primary bg-primary text-primary-foreground"
                  : index === current
                    ? "border-primary bg-background text-primary"
                    : "border-border bg-background text-muted-foreground"
              )}
            >
              {index < current ? (
                <Check className="size-4" />
              ) : (
                String(index + 1)
              )}
            </div>
            <span
              className={cn(
                "text-center text-xs font-medium",
                index <= current ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </div>

          {index < labels.length - 1 && (
            <div
              className={cn(
                "mx-2 mt-4 h-px flex-1 transition-colors",
                index < current ? "bg-primary" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
