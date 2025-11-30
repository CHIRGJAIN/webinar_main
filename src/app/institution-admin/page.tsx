"use client";

import { useMemo, useState } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { events, institutions, series, speakerProfiles } from "@/lib/mockData";
import { DashboardStat } from "@/lib/types";

interface ManagedHost {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  status: "pending" | "approved" | "suspended";
}

const formatSchedule = (iso: string) =>
  new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }).format(
    new Date(iso)
  );

export default function InstitutionAdminPage() {
  const { user } = useAuth();

  if (!user) {
    return <Alert title="Login required" description="Sign in as an institution administrator." />;
  }

  if (user.role !== "institution_admin") {
    return <Alert title="Restricted" description="This console is available to institution administrators only." variant="danger" />;
  }

  const institution = institutions.find((inst) => inst.id === user.institutionId) ?? null;
  const institutionEvents = events.filter((event) => event.institutionId === user.institutionId);
  const upcomingEvents = institutionEvents.filter((event) => event.status !== "completed");
  const pastEvents = institutionEvents.filter((event) => event.status === "completed");
  const institutionSeries = series.filter((entry) => entry.institutionId === user.institutionId);
  const roster = speakerProfiles
    .filter((speaker) => speaker.institutionId === user.institutionId)
    .map<ManagedHost>((speaker) => ({
      id: speaker.id,
      name: speaker.name,
      title: speaker.title,
      affiliation: speaker.affiliation,
      status: "approved",
    }));

  const [hosts, setHosts] = useState<ManagedHost[]>(roster);

  const stats: DashboardStat[] = [
    {
      id: "ia-hosts",
      label: "Accredited hosts",
      value: String(hosts.filter((host) => host.status === "approved").length),
      change: `${hosts.filter((host) => host.status === "pending").length} pending approvals`,
      trend: "up",
    },
    {
      id: "ia-events-upcoming",
      label: "Upcoming events",
      value: String(upcomingEvents.length),
      change: upcomingEvents.length ? "Live calendar" : undefined,
      trend: "up",
    },
    {
      id: "ia-events-past",
      label: "Recent recordings",
      value: String(pastEvents.length),
      change: pastEvents.length ? "Ready for review" : undefined,
      trend: "down",
    },
    {
      id: "ia-participants",
      label: "Participant seats",
      value: `~${Math.max(48, institutionEvents.length * 160).toLocaleString()}`,
      change: "+8% vs last quarter",
      trend: "up",
    },
  ];

  const toggleHostStatus = (id: string) => {
    setHosts((previous) =>
      previous.map((host) =>
        host.id === id
          ? {
              ...host,
              status: host.status === "approved" ? "suspended" : "approved",
            }
          : host
      )
    );
  };

  const addInvite = () => {
    const nextId = `invite-${Date.now()}`;
    setHosts((previous) => [
      ...previous,
      {
        id: nextId,
        name: "Pending invite",
        title: "Awaiting acceptance",
        affiliation: institution?.name ?? "Institution host",
        status: "pending",
      },
    ]);
  };

  const hostSummary = useMemo(() => {
    const total = hosts.length;
    const approved = hosts.filter((host) => host.status === "approved").length;
    return `${approved}/${total} approved`;
  }, [hosts]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Institution admin</p>
        <h1 className="text-3xl font-semibold text-foreground">{institution?.name ?? "Institution workspace"}</h1>
        <p className="text-(--text-secondary)">Coordinate hosts, programming, and participant access for your institution.</p>
        {institution && (
          <p className="text-sm text-(--text-secondary)">
            {institution.country} · {institution.type.replace("_", " ")}
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft)">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Manage hosts</h2>
              <p className="text-sm text-(--text-secondary)">{hostSummary}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={addInvite}>
              Invite host
            </Button>
          </div>
          <div className="mt-4 space-y-4">
            {hosts.length === 0 && (
              <p className="rounded-3xl border border-dashed border-(--border-subtle) px-4 py-6 text-sm text-(--text-secondary)">
                No hosts yet. Invite your first facilitator.
              </p>
            )}
            {hosts.map((host) => (
              <div key={host.id} className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-(--border-subtle) bg-white px-4 py-3 shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-foreground">{host.name}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{host.title}</p>
                  <p className="text-sm text-(--text-secondary)">{host.affiliation}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    label={host.status === "approved" ? "Approved" : host.status === "pending" ? "Pending" : "Suspended"}
                    variant={host.status === "approved" ? "success" : host.status === "pending" ? "outline" : "warning"}
                  />
                  <Button size="sm" variant={host.status === "approved" ? "ghost" : "secondary"} onClick={() => toggleHostStatus(host.id)}>
                    {host.status === "approved" ? "Suspend" : "Approve"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft)">
          <h2 className="text-xl font-semibold text-foreground">Hosted series</h2>
          <p className="text-sm text-(--text-secondary)">Track thematic programs that originate from your institution.</p>
          <div className="mt-4 space-y-4">
            {institutionSeries.length === 0 && <p className="text-sm text-(--text-secondary)">No active series on file.</p>}
            {institutionSeries.map((entry) => (
              <div key={entry.id} className="rounded-3xl border border-(--border-subtle) bg-white px-4 py-3">
                <p className="text-sm font-semibold text-foreground">{entry.title}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{entry.theme}</p>
                <p className="text-sm text-(--text-secondary)">{entry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft)">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-foreground">Upcoming events</h2>
            <Badge label={`${upcomingEvents.length} scheduled`} variant="outline" />
          </div>
          <div className="mt-4 space-y-4">
            {upcomingEvents.length === 0 && <p className="text-sm text-(--text-secondary)">No events scheduled yet.</p>}
            {upcomingEvents.map((event) => (
              <div key={event.id} className="rounded-3xl border border-(--border-subtle) bg-white px-4 py-3">
                <p className="text-sm font-semibold text-foreground">{event.title}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{event.category}</p>
                <p className="text-sm text-(--text-secondary)">{formatSchedule(event.scheduledAt)} · {event.language}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge
                    label={event.accessLevel === "institution_only" ? "Institution only" : event.accessLevel === "registered_only" ? "Registered" : "Open"}
                    variant={event.accessLevel === "institution_only" ? "warning" : "outline"}
                  />
                  <Button size="sm" variant="ghost" href={`/events/${event.id}`}>
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft)">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-foreground">Recent recordings</h2>
            <Badge label={`${pastEvents.length} available`} variant="outline" />
          </div>
          <div className="mt-4 space-y-4">
            {pastEvents.length === 0 && <p className="text-sm text-(--text-secondary)">No completed events yet.</p>}
            {pastEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between rounded-3xl border border-(--border-subtle) bg-white px-4 py-3 text-sm text-(--text-secondary)">
                <div>
                  <p className="font-semibold text-foreground">{event.title}</p>
                  <p>{formatSchedule(event.scheduledAt)}</p>
                </div>
                <Button size="sm" variant="ghost" href={`/events/${event.id}`}>
                  Open
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
