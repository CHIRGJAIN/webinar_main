"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { events, institutions, mockUsers, pageContent, subscriptions } from "@/lib/mockData";
import { DashboardStat } from "@/lib/types";

export default function AdminOverviewPage() {
  const { user } = useAuth();

  if (!user) {
    return <Alert title="Login required" description="Sign in as a platform admin." />;
  }

  if (user.role !== "platform_admin") {
    return <Alert title="Restricted" description="Only platform administrators can view this console." variant="danger" />;
  }

  const stats: DashboardStat[] = [
    {
      id: "platform-users",
      label: "Total users",
      value: String(Object.values(mockUsers).length),
      change: "+4 this week",
      trend: "up",
    },
    {
      id: "platform-institutions",
      label: "Institutions onboarded",
      value: String(institutions.length),
      change: "+1 pending",
      trend: "up",
    },
    {
      id: "platform-events",
      label: "Scheduled events",
      value: String(events.filter((event) => event.status !== "completed").length),
      change: "Live calendar",
      trend: "up",
    },
    {
      id: "platform-subscriptions",
      label: "Active subscriptions",
      value: String(subscriptions.filter((subscription) => subscription.status === "active").length),
      change: "Stable",
      trend: "down",
    },
  ];

  const flagshipEvents = events.filter((event) => event.isFlagship).slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-(--text-secondary)">Platform admin</p>
          <h1 className="text-3xl font-semibold text-foreground">Welcome, {user.name}</h1>
          <p className="text-(--text-secondary)">Monitor global enrollment, institutional pipelines, and subscription health.</p>
        </div>
        <Button href="/admin/institutions" variant="secondary">
          Review institutions
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartPlaceholder title="Platform growth" variant="line" />
        <div className="rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft)">
          <h2 className="text-xl font-semibold text-foreground">Flagship briefings</h2>
          <p className="text-sm text-(--text-secondary)">Upcoming high-visibility seminars.</p>
          <div className="mt-4 space-y-4">
            {flagshipEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between rounded-3xl border border-(--border-subtle) bg-white px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{event.title}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{event.category}</p>
                </div>
                <Button size="sm" variant="ghost" href={`/events/${event.id}`}>
                  Open
                </Button>
              </div>
            ))}
            {flagshipEvents.length === 0 && <p className="text-sm text-(--text-secondary)">No flagship series defined.</p>}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {pageContent.admin.notices.map((notice) => (
          <div key={notice} className="rounded-3xl border border-(--border-subtle) bg-surface p-4 text-sm text-(--text-secondary)">
            {notice}
          </div>
        ))}
      </div>
    </div>
  );
}
