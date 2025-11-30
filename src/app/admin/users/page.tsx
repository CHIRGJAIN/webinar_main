"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/hooks/useAuth";
import { mockUsers } from "@/lib/mockData";

const roles = ["all", "participant", "host", "institution_admin", "platform_admin"] as const;

type RoleFilter = (typeof roles)[number];
type UserStatus = "active" | "suspended";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [role, setRole] = useState<RoleFilter>("all");
  const [statuses, setStatuses] = useState<Record<string, UserStatus>>(() => {
    const initial: Record<string, UserStatus> = {};
    Object.values(mockUsers).forEach((record) => {
      initial[record.id] = "active";
    });
    return initial;
  });

  if (!user) {
    return <Alert title="Login required" description="Sign in as admin." />;
  }

  if (user.role !== "platform_admin") {
    return <Alert title="Restricted" description="Only platform admins can manage users." variant="danger" />;
  }

  const list = Object.values(mockUsers).filter((candidate) => role === "all" || candidate.role === role);

  const toggleStatus = (id: string) => {
    setStatuses((previous) => ({
      ...previous,
      [id]: previous[id] === "active" ? "suspended" : "active",
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Users</h1>
        <Select value={role} onChange={(event) => setRole(event.target.value as RoleFilter)}>
          {roles.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </div>
      <div className="overflow-hidden rounded-4xl border border-(--border-subtle) bg-white shadow-(--shadow-soft)">
        <table className="min-w-full divide-y divide-(--border-subtle) text-sm text-foreground">
          <thead className="bg-surface">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Role</th>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Subscription</th>
              <th className="px-4 py-3 text-right font-semibold text-(--text-secondary)">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--border-subtle)">
            {list.map((item) => (
              <tr key={item.id} className="bg-white">
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3 text-(--text-secondary)">{item.email}</td>
                <td className="px-4 py-3 text-(--text-secondary)">{item.role}</td>
                <td className="px-4 py-3 text-(--text-secondary)">{item.subscriptionStatus ?? "none"}</td>
                <td className="px-4 py-3 text-right">
                  <Button size="sm" variant={statuses[item.id] === "active" ? "ghost" : "secondary"} onClick={() => toggleStatus(item.id)}>
                    {statuses[item.id] === "active" ? "Suspend" : "Reinstate"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
