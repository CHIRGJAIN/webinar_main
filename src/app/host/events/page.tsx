"use client";

import { useMemo, useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/hooks/useAuth";
import { events } from "@/lib/mockData";
import { EventStatus } from "@/lib/types";

type StatusFilter = EventStatus | "all";
const STATUS_OPTIONS: StatusFilter[] = ["all", "live", "upcoming", "completed"];

export default function HostEventsPage() {
  const { user } = useAuth();
  const [status, setStatus] = useState<StatusFilter>("all");

  if (!user) {
    return <Alert title="Login required" description="Sign in to manage events." />;
  }

  if (user.role !== "host") {
    return <Alert title="Restricted" description="Only hosts can manage this schedule." variant="danger" />;
  }

  const hostEvents = useMemo(() => events.filter((event) => event.hostUserId === user.id), [user.id]);
  const filteredEvents = hostEvents.filter((event) => (status === "all" ? true : event.status === status));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">My events</h1>
          <p className="text-sm text-(--text-secondary)">Monitor status, access policies, and start times.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)}>
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All statuses" : option}
              </option>
            ))}
          </Select>
          <Button href="/host/events/new">Create event</Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-4xl border border-(--border-subtle) bg-white shadow-(--shadow-soft)">
        <table className="min-w-full divide-y divide-(--border-subtle) text-sm text-foreground">
          <thead className="bg-surface">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Title</th>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Schedule</th>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Access</th>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Status</th>
              <th className="px-4 py-3 text-right font-semibold text-(--text-secondary)">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--border-subtle)">
            {filteredEvents.map((event) => (
              <tr key={event.id} className="bg-white">
                <td className="px-4 py-3 font-medium">{event.title}</td>
                <td className="px-4 py-3 text-(--text-secondary)">{new Date(event.scheduledAt).toLocaleString()}</td>
                <td className="px-4 py-3 text-(--text-secondary)">
                  {event.accessLevel === "open" && <Badge label="Open" />}
                  {event.accessLevel === "registered_only" && <Badge label="Registered" variant="outline" />}
                  {event.accessLevel === "institution_only" && <Badge label="Institution only" variant="warning" />}
                </td>
                <td className="px-4 py-3 text-(--text-secondary)">
                  <Badge label={event.status} variant={event.status === "live" ? "success" : "outline"} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Button size="sm" variant="ghost" href={`/events/${event.id}`}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
            {filteredEvents.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-(--text-secondary)">
                  No events match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
