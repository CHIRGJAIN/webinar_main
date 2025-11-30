import { cn } from "@/lib/utils";

interface AlertProps {
  title: string;
  description?: string;
  variant?: "info" | "success" | "warning" | "danger";
  className?: string;
}

const MAP = {
  info: "border border-(--border-subtle) bg-(--surface-alt) text-foreground",
  success: "border border-emerald-100 bg-emerald-50 text-emerald-800",
  warning: "border border-amber-100 bg-amber-50 text-amber-800",
  danger: "border border-rose-100 bg-rose-50 text-rose-800",
};

export const Alert = ({ title, description, variant = "info", className }: AlertProps) => (
  <div className={cn("rounded-2xl px-4 py-3 shadow-(--shadow-soft)", MAP[variant], className)}>
    <p className="font-semibold">{title}</p>
    {description && <p className="text-sm text-(--text-secondary)">{description}</p>}
  </div>
);
