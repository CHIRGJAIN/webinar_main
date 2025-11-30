"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function InstitutionsPage() {
  const cards = [
    {
      href: "/institutions/global",
      title: "Global institutions",
      description: "Multilateral and international partners hosting cross-border briefings.",
    },
    {
      href: "/institutions/academic",
      title: "Academic institutions",
      description: "Universities, research institutes, and think tanks leading academic cohorts.",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Partner network</p>
        <h1 className="text-4xl font-semibold text-foreground">Browse institutions by track</h1>
        <p className="text-(--text-secondary)">Choose between global partners and academic institutions to explore detailed profiles.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group flex h-full flex-col justify-between rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft) transition hover:-translate-y-1 hover:shadow-(--shadow-card)"
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--text-secondary)">Directory</p>
              <h2 className="text-2xl font-semibold text-foreground">{card.title}</h2>
              <p className="text-sm text-(--text-secondary)">{card.description}</p>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
              Open directory
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
