"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { events, pageContent } from "@/lib/mockData";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "numeric" }).format(
    new Date(value)
  );

export default function HostOverviewPage() {
  const { user } = useAuth();

  if (!user) {
    return <Alert title="Login required" description="Sign in to view your host dashboard." />;
  }

  if (user.role !== "host") {
    return <Alert title="Restricted" description="Only approved hosts can access this workspace." variant="danger" />;
  }

  const myEvents = events.filter((event) => event.hostUserId === user.id);
  const liveEvents = myEvents.filter((event) => event.status === "live");
  const upcomingEvents = myEvents.filter((event) => event.status === "upcoming");
  const completedEvents = myEvents.filter((event) => event.status === "completed");
  const estimatedRegistrants = myEvents.reduce((total, event) => total + (event.isFlagship ? 320 : 140), 0);

  const stats = [
    { id: "stat-live", label: "Live sessions", value: String(liveEvents.length), change: liveEvents.length ? "Happening now" : undefined, trend: "up" as const },
    { id: "stat-upcoming", label: "Upcoming events", value: String(upcomingEvents.length), change: upcomingEvents.length ? `${upcomingEvents.length} scheduled` : undefined, trend: "up" as const },
    { id: "stat-past", label: "Completed", value: String(completedEvents.length), change: completedEvents.length ? "In archive" : undefined, trend: "down" as const },
    { id: "stat-registrants", label: "Estimated registrants", value: `~${estimatedRegistrants.toLocaleString()}`, change: "+12% QoQ", trend: "up" as const },
  ];

  const priorityEvents = [...liveEvents, ...upcomingEvents].sort(
    (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-(--text-secondary)">Host dashboard</p>
          <h1 className="mt-1 text-3xl font-semibold text-foreground">Welcome back, {user.name.split(" ")[0]}</h1>
          <p className="text-(--text-secondary)">Track institutional briefings, confirm materials, and stay on top of registrations.</p>
        </div>
        <Button href="/host/events/new">Create new event</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft) lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Live + upcoming events</h2>
              <p className="text-sm text-(--text-secondary)">Confirm run-of-show details and registration trends.</p>
            </div>
            <Button variant="secondary" size="sm" href="/host/events">
              Manage schedule
            </Button>
          </div>
          <div className="mt-6 space-y-4">
            {priorityEvents.length === 0 && (
              <p className="rounded-3xl border border-dashed border-(--border-subtle) bg-white/60 px-4 py-6 text-sm text-(--text-secondary)">
                No live or upcoming events yet. Publish one to see it here.
              </p>
            )}
            {priorityEvents.map((event) => (
              <div key={event.id} className="rounded-3xl border border-(--border-subtle) bg-white px-5 py-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-(--text-secondary)">{event.category}</p>
                    <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                    <p className="text-sm text-(--text-secondary)">{formatDate(event.scheduledAt)} · {event.durationMinutes} mins · {event.language}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-right">
                    <Badge
                      label={event.status === "live" ? "Live" : event.accessLevel === "institution_only" ? "Institution only" : event.accessLevel === "registered_only" ? "Registered" : "Open"}
                      variant={event.status === "live" ? "success" : "outline"}
                    />
                    <Button size="sm" variant="ghost" href={`/events/${event.id}`}>
                      View details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ChartPlaceholder title="Engagement trend" variant="line" />
      </div>

      <div className="rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft)">
        <h2 className="text-xl font-semibold text-foreground">Archive highlights</h2>
        <p className="text-sm text-(--text-secondary)">Past sessions remain available for recordings and metrics.</p>
        <ul className="mt-4 space-y-3 text-sm text-(--text-secondary)">
          {completedEvents.map((event) => (
            <li key={event.id} className="flex items-center justify-between">
              <span>
                {event.title}
                <span className="text-(--text-muted)"> · {event.accessLevel.replace("_", " ")}</span>
              </span>
              <Button size="sm" variant="ghost" href={`/events/${event.id}`}>
                Review
              </Button>
            </li>
          ))}
          {completedEvents.length === 0 && <li>No completed events yet.</li>}
        </ul>
      </div>
      <div className="rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft)">
        <h2 className="text-xl font-semibold text-foreground">Host quick tips</h2>
        <ul className="mt-3 space-y-2 text-sm text-(--text-secondary)">
          {pageContent.host.quickTips.map((tip) => (
            <li key={tip}>�?� {tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
