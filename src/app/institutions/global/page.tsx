"use client";

import Image from "next/image";
import Link from "next/link";
import { institutions } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";

const globalTypes = new Set(["international_organization", "other"]);

export default function GlobalInstitutionsPage() {
  const globalInstitutions = institutions.filter((institution) => globalTypes.has(institution.type));

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Global network</p>
        <h1 className="text-4xl font-semibold text-foreground">International & multilateral partners</h1>
        <p className="text-(--text-secondary)">Cross-border organizations coordinating diplomatic seminars and regional cohorts.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {globalInstitutions.map((institution) => (
          <Link
            key={institution.id}
            href={`/institutions/${institution.id}`}
            className="flex h-full flex-col rounded-4xl border border-(--border-subtle) bg-surface p-5 shadow-(--shadow-soft) transition hover:-translate-y-1 hover:shadow-(--shadow-card)"
          >
            <div className="flex items-center gap-4">
              {institution.logoUrl && (
                <Image src={institution.logoUrl} alt={institution.name} width={56} height={56} className="rounded-2xl object-cover" />
              )}
              <div>
                <p className="text-lg font-semibold text-foreground">{institution.name}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{institution.country}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-(--text-secondary)">{institution.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-(--text-secondary)">
              <span>{institution.focus}</span>
              <span>-</span>
              <Badge label={institution.type.replace("_", " ")} variant="outline" />
            </div>
          </Link>
        ))}
        {globalInstitutions.length === 0 && (
          <div className="rounded-4xl border border-(--border-subtle) bg-surface p-6 text-(--text-secondary)">
            No global institutions available yet.
          </div>
        )}
      </div>
    </div>
  );
}
