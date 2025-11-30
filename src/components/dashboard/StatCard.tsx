import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { DashboardStat } from "@/lib/types";

export const StatCard = ({ label, value, change, trend }: DashboardStat) => (
  <div className="rounded-3xl border border-(--border-subtle) bg-surface p-5 text-foreground shadow-(--shadow-soft)">
    <p className="text-sm font-medium uppercase tracking-[0.2em] text-(--text-secondary)">{label}</p>
    <p className="mt-2 text-3xl font-semibold">{value}</p>
    {change && (
      <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-(--text-secondary)">
        {trend === "up" ? <ArrowUpRight size={16} className="text-emerald-600" /> : <ArrowDownRight size={16} className="text-rose-600" />}
        {change}
      </p>
    )}
  </div>
);
