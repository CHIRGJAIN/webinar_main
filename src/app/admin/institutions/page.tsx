"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/hooks/useAuth";
import { institutions } from "@/lib/mockData";
import { InstitutionType } from "@/lib/types";

type Filter = InstitutionType | "all";
type InstitutionStatus = "approved" | "pending" | "suspended";

export default function AdminInstitutionsPage() {
  const { user } = useAuth();
  const [type, setType] = useState<Filter>("all");
  const [statuses, setStatuses] = useState<Record<string, InstitutionStatus>>(() => {
    const initial: Record<string, InstitutionStatus> = {};
    institutions.forEach((institution) => {
      initial[institution.id] = "approved";
    });
    return initial;
  });

  if (!user) {
    return <Alert title="Login required" description="Sign in as admin." />;
  }

  if (user.role !== "platform_admin") {
    return <Alert title="Restricted" description="Only platform admins can manage institutions." variant="danger" />;
  }

  const list = institutions.filter((institution) => (type === "all" ? true : institution.type === type));

  const cycleStatus = (id: string) => {
    setStatuses((previous) => ({
      ...previous,
      [id]: previous[id] === "approved" ? "suspended" : previous[id] === "suspended" ? "pending" : "approved",
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Institutions</h1>
        <Select value={type} onChange={(event) => setType(event.target.value as Filter)}>
          <option value="all">All types</option>
          <option value="university">University</option>
          <option value="research_institute">Research institute</option>
          <option value="international_organization">International organization</option>
          <option value="think_tank">Think tank</option>
          <option value="other">Other</option>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((institution) => (
          <div key={institution.id} className="rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft)">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-(--text-secondary)">{institution.type.replace("_", " ")}</p>
                <h2 className="text-lg font-semibold text-foreground">{institution.name}</h2>
                <p className="text-sm text-(--text-secondary)">{institution.country}</p>
              </div>
              <Badge
                label={statuses[institution.id] === "approved" ? "Approved" : statuses[institution.id] === "pending" ? "Pending" : "Suspended"}
                variant={statuses[institution.id] === "approved" ? "success" : statuses[institution.id] === "pending" ? "outline" : "warning"}
              />
            </div>
            <p className="mt-3 text-sm text-(--text-secondary)">{institution.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {institution.websiteUrl && (
                <Button size="sm" variant="secondary" href={institution.websiteUrl}>
                  Visit site
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={() => cycleStatus(institution.id)}>
                {statuses[institution.id] === "approved" ? "Suspend" : statuses[institution.id] === "suspended" ? "Mark pending" : "Approve"}
              </Button>
            </div>
          </div>
        ))}
        {list.length === 0 && <p className="text-sm text-(--text-secondary)">No institutions match this filter.</p>}
      </div>
    </div>
  );
}
