"use client";

import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Tabs } from "@/components/ui/Tabs";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { events } from "@/lib/mockData";
import { formatDateTime } from "@/lib/utils";

const watchHistory = events.filter((event) => event.status === "completed").slice(0, 3);
const registeredEvents = events.filter((event) => event.status !== "completed").slice(0, 3);

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { subscription, cancelSubscription } = useSubscription();

  if (!user) {
    return (
      <div className="space-y-4">
        <Alert title="Login required" description="Sign in to view your profile, registrations, and playback history." />
        <Button href="/auth/login">Go to login</Button>
      </div>
    );
  }

  const tabs = [
    {
      id: "history",
      label: "Registered events",
      content: (
        <Card title="Upcoming registrations">
          {registeredEvents.length ? (
            <ul className="space-y-3 text-sm text-(--text-secondary)">
              {registeredEvents.map((session) => (
                <li key={session.id}>
                  <p className="font-semibold text-foreground">{session.title}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{formatDateTime(session.scheduledAt)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming registrations yet.</p>
          )}
        </Card>
      ),
    },
    {
      id: "history",
      label: "Watch history",
      content: (
        <Card title="Recently watched">
          <ul className="space-y-3 text-sm text-(--text-secondary)">
            {watchHistory.map((session) => (
              <li key={session.id}>
                <p className="font-semibold text-foreground">{session.title}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{session.category}</p>
              </li>
            ))}
          </ul>
        </Card>
      ),
    },
    {
      id: "saved",
      label: "Saved events",
      content: (
        <Card title="Saved list" description="You have no saved events yet.">
          <p className="text-sm text-(--text-secondary)">Bookmark events from the listing page to see them here.</p>
        </Card>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      content: (
        <Card title="Profile settings">
          <form className="space-y-4">
            <Input label="Name" defaultValue={user.name} />
            <Select label="Notifications">
              <option>Weekly digest</option>
              <option>Only live reminders</option>
            </Select>
            <Button type="button" variant="secondary">
              Save changes
            </Button>
          </form>
        </Card>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-6 rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-card)">
        {user.avatarUrl && <Image src={user.avatarUrl} alt={user.name} width={80} height={80} className="rounded-full object-cover" />}
        <div>
          <h1 className="text-3xl font-semibold text-foreground">{user.name}</h1>
          <p className="text-sm text-(--text-secondary)">{user.email}</p>
          <p className="text-sm text-(--text-secondary)">Role: {user.role}</p>
        </div>
        <div className="ml-auto flex gap-3">
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
          <Button href="/events">Browse events</Button>
        </div>
      </div>
      <Card title="Subscription" description={subscription ? `Status: ${subscription.status}` : "No subscription"}>
        {subscription ? (
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-(--text-secondary)">
            <p>Renews {formatDateTime(subscription.renewsAt)}</p>
            <Button variant="ghost" onClick={cancelSubscription}>
              Cancel subscription
            </Button>
          </div>
        ) : (
          <Button href="/pricing">Upgrade to unlock library</Button>
        )}
      </Card>
      <Tabs tabs={tabs} />
    </div>
  );
}
