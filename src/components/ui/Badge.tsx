import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "outline";
  className?: string;
}

const VARIANTS = {
  default: "border border-(--border-subtle) bg-(--surface-alt) text-primary",
  success: "border border-emerald-100 bg-emerald-50 text-emerald-700",
  warning: "border border-amber-200 bg-amber-50 text-amber-700",
  outline: "border border-(--border-subtle) text-foreground",
};

export const Badge = ({ label, variant = "default", className }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
      VARIANTS[variant],
      className
    )}
  >
    {label}
  </span>
);
