import { cn } from "@/lib/utils";

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export const Card = ({ title, description, children, className, footer }: CardProps) => (
  <div
    className={cn(
      "rounded-3xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft) transition hover:-translate-y-1 hover:shadow-(--shadow-card)",
      className
    )}
  >
    {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
    {description && <p className="mt-1 text-sm text-(--text-secondary)">{description}</p>}
    <div className="mt-4 flex flex-col gap-4 text-(--text-secondary)">{children}</div>
    {footer && <div className="mt-6 border-t border-(--border-subtle) pt-4">{footer}</div>}
  </div>
);
