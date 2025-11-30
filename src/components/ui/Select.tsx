"use client";

import { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, label, children, ...props }, ref) => {
  return (
    <label className="flex w-full flex-col gap-1 text-sm font-medium text-(--text-secondary)">
      {label}
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "w-full appearance-none rounded-2xl border border-(--border-subtle) bg-white px-4 py-3 text-base text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-(--secondary)/30",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-(--text-secondary)">▾</span>
      </div>
    </label>
  );
});

Select.displayName = "Select";
