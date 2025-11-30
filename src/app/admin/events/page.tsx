"use client";

import { useMemo, useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/hooks/useAuth";
import { events as eventsData, institutions, mockUsers } from "@/lib/mockData";
import { EventStatus } from "@/lib/types";

type StatusFilter = EventStatus | "all";

export default function AdminEventsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState(eventsData);
  const [status, setStatus] = useState<StatusFilter>("all");

  if (!user) {
    return <Alert title="Login required" description="Sign in as admin." />;
  }

  if (user.role !== "platform_admin") {
    return <Alert title="Restricted" description="Only platform admins can manage events." variant="danger" />;
  }

  const filteredItems = useMemo(
    () =>
      items.filter((event) => {
        if (status === "all") return true;
        return event.status === status;
      }),
    [items, status]
  );

  const toggleStatus = (id: string) => {
    setItems((previous) =>
      previous.map((event) =>
        event.id === id
          ? {
              ...event,
              status: event.status === "live" ? "upcoming" : event.status === "upcoming" ? "live" : event.status,
            }
          : event
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Events</h1>
        <Select value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)}>
          <option value="all">All statuses</option>
          <option value="live">Live</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </Select>
      </div>
      <div className="overflow-hidden rounded-4xl border border-(--border-subtle) bg-white shadow-(--shadow-soft)">
        <table className="min-w-full divide-y divide-(--border-subtle) text-sm text-foreground">
          <thead className="bg-surface">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Title</th>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Institution</th>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Schedule</th>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-(--text-secondary)">Access</th>
              <th className="px-4 py-3 text-right font-semibold text-(--text-secondary)">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--border-subtle)">
            {filteredItems.map((event) => {
              const host = Object.values(mockUsers).find((candidate) => candidate.id === event.hostUserId);
              const institution = institutions.find((inst) => inst.id === event.institutionId);
              return (
                <tr key={event.id} className="bg-white">
                  <td className="px-4 py-3 font-medium">
                    {event.title}
                    <p className="text-xs text-(--text-secondary)">Host: {host?.name ?? "Unknown"}</p>
                  </td>
                  <td className="px-4 py-3 text-(--text-secondary)">{institution?.name ?? "-"}</td>
                  <td className="px-4 py-3 text-(--text-secondary)">{new Date(event.scheduledAt).toLocaleString()}</td>
                  <td className="px-4 py-3 text-(--text-secondary)">
                    <Badge label={event.status} variant={event.status === "live" ? "success" : "outline"} />
                  </td>
                  <td className="px-4 py-3 text-(--text-secondary)">
                    {event.accessLevel === "open" && <Badge label="Open" />}
                    {event.accessLevel === "registered_only" && <Badge label="Registered" variant="outline" />}
                    {event.accessLevel === "institution_only" && <Badge label="Institution" variant="warning" />}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="ghost" onClick={() => toggleStatus(event.id)}>
                      {event.status === "live" ? "Mark upcoming" : "Go live"}
                    </Button>
                  </td>
                </tr>
              );
            })}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-(--text-secondary)">
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
