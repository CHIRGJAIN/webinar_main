"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, ...props }, ref) => {
  return (
    <label className="flex w-full flex-col gap-1 text-sm font-medium text-(--text-secondary)">
      {label}
      <input
        ref={ref}
        className={cn(
          "w-full rounded-2xl border border-(--border-subtle) bg-white px-4 py-3 text-base text-foreground placeholder:text-(--text-secondary) focus:border-secondary focus:outline-none focus:ring-2 focus:ring-(--secondary)/30",
          error && "border-rose-500",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs font-normal text-rose-500">{error}</span>}
    </label>
  );
});

Input.displayName = "Input";
