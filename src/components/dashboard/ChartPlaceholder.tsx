import { cn } from "@/lib/utils";

interface ChartPlaceholderProps {
  title: string;
  variant?: "line" | "bar";
  className?: string;
}

export const ChartPlaceholder = ({ title, variant = "line", className }: ChartPlaceholderProps) => (
  <div className={cn("rounded-3xl border border-(--border-subtle) bg-surface p-5 text-foreground shadow-(--shadow-soft)", className)}>
    <div className="mb-4 flex items-center justify-between text-sm text-(--text-secondary)">
      <p className="font-semibold text-foreground">{title}</p>
      <span>Mock data</span>
    </div>
    <div className="grid h-40 place-items-center rounded-2xl border border-dashed border-(--border-subtle) text-(--text-secondary)">
      {variant === "line" ? "Line chart" : "Bar chart"}
    </div>
  </div>
);
