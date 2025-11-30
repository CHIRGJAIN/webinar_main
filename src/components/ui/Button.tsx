"use client";

import Link from "next/link";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  href?: string;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--primary)] text-white shadow-[0_12px_30px_rgba(230,120,23,0.28)] hover:bg-[#cf6a0f]",
  secondary:
    "border border-[rgba(230,120,23,0.18)] bg-white text-[var(--primary)] shadow-[0_8px_20px_rgba(230,120,23,0.1)] hover:border-[rgba(230,120,23,0.32)] hover:bg-[rgba(255,241,223,0.6)]",
  ghost: "text-[var(--primary)] hover:bg-[var(--surface-alt)]/70",
  danger: "bg-rose-600 text-white shadow-sm hover:bg-rose-500",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-6 py-3",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, fullWidth, href, children, ...props }, ref) => {
    const baseClass = cn(
      "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)]",
      VARIANT_STYLES[variant],
      SIZE_STYLES[size],
      fullWidth && "w-full",
      (disabled || loading) && "opacity-60 pointer-events-none",
      className
    );

    if (href) {
      return (
        <Link href={href} className={baseClass} aria-disabled={disabled || loading}>
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
          )}
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={baseClass} disabled={disabled || loading} {...props}>
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
