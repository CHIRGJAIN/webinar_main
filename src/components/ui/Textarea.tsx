"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, label, ...props }, ref) => {
  return (
    <label className="flex w-full flex-col gap-1 text-sm font-medium text-(--text-secondary)">
      {label}
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-2xl border border-(--border-subtle) bg-white px-4 py-3 text-base text-foreground placeholder:text-(--text-secondary) focus:border-secondary focus:outline-none focus:ring-2 focus:ring-(--secondary)/30",
          className
        )}
        {...props}
      />
    </label>
  );
});

Textarea.displayName = "Textarea";
