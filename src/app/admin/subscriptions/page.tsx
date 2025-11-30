"use client";

import { useMemo, useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/hooks/useAuth";
import { mockUsers, subscriptionPlans, subscriptions as subscriptionData } from "@/lib/mockData";
import { SubscriptionStatus } from "@/lib/types";

type StatusFilter = SubscriptionStatus | "all";

const statusOrder: SubscriptionStatus[] = ["active", "past_due", "canceled"];

const getNextStatus = (status: SubscriptionStatus): SubscriptionStatus => {
  const index = statusOrder.indexOf(status);
  return statusOrder[(index + 1) % statusOrder.length];
};

export default function AdminSubscriptionsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState(subscriptionData);
  const [status, setStatus] = useState<StatusFilter>("all");

  if (!user) {
    return <Alert title="Login required" description="Sign in as admin." />;
  }

  if (user.role !== "platform_admin") {
    return <Alert title="Restricted" description="Only platform admins can manage subscriptions." variant="danger" />;
  }

  const filtered = useMemo(
    () => items.filter((subscription) => (status === "all" ? true : subscription.status === status)),
    [items, status]
  );

  const cycleStatus = (id: string, current: SubscriptionStatus) => {
    setItems((previous) => previous.map((subscription) => (subscription.id === id ? { ...subscription, status: getNextStatus(current) } : subscription)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Subscriptions</h1>
        <Select value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)}>
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="past_due">Past due</option>
          <option value="canceled">Canceled</option>
        </Select>
      </div>
      <div className="overflow-hidden rounded-4xl border border-(--border-subtle) bg-white shadow-(--shadow-soft)">
        <table className="min-w-full divide-y divide-(--border-subtle) text-sm text-foreground">
          <thead className="bg-surface">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">User</th>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Plan</th>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Renews</th>
              <th className="px-4 py-3 text-right font-semibold text-(--text-secondary)">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--border-subtle)">
            {filtered.map((subscription) => {
              const plan = subscriptionPlans.find((planItem) => planItem.id === subscription.planId);
              const userRecord = subscription.userId
                ? Object.values(mockUsers).find((candidate) => candidate.id === subscription.userId)
                : null;
              return (
                <tr key={subscription.id} className="bg-white">
                  <td className="px-4 py-3 font-medium">{userRecord?.name ?? subscription.institutionId ?? "-"}</td>
                  <td className="px-4 py-3 text-(--text-secondary)">{plan?.name}</td>
                  <td className="px-4 py-3 text-(--text-secondary)">{subscription.status}</td>
                  <td className="px-4 py-3 text-(--text-secondary)">{new Date(subscription.renewsAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="ghost" onClick={() => cycleStatus(subscription.id, subscription.status)}>
                      Advance status
                    </Button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-(--text-secondary)">
                  No subscriptions match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
