"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { getEventRecording } from "@/lib/events";
import { timeUntil } from "@/lib/utils";
import { Event } from "@/lib/types";

interface Props {
  event: Event;
}

export const EventActions = ({ event }: Props) => {
  const router = useRouter();
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const recording = useMemo(() => getEventRecording(event.id), [event.id]);
  const isSubscribed = subscription?.status === "active";

  const handlePrimary = () => {
    if (event.status === "upcoming") {
      router.push(`/events/${event.id}?registered=true`);
      return;
    }
    if (event.status === "live") {
      router.push(`/live/${event.id}`);
      return;
    }
    if (event.status === "completed" && recording) {
      if (isSubscribed) {
        router.push(`/recordings?play=${recording.eventId}`);
      } else {
        router.push("/pricing");
      }
    }
  };

  return (
    <div className="rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft)">
      <div className="flex flex-wrap items-center gap-4">
        <Button
          size="lg"
          variant="primary"
          onClick={handlePrimary}
          disabled={event.status === "completed" && event.hasRecording && !recording}
        >
          {event.status === "upcoming" && (event.accessLevel === "institution_only" ? "Request institutional access" : "Register")}
          {event.status === "live" && "Join live room"}
          {event.status === "completed" && event.hasRecording && (isSubscribed ? "Watch recording" : "Upgrade to watch")}
          {!event.hasRecording && event.status === "completed" && "Replay unavailable"}
        </Button>
        {event.status === "upcoming" && <p className="text-sm text-(--text-secondary)">Starts {timeUntil(event.scheduledAt)}</p>}
      </div>
      {event.status === "completed" && event.hasRecording && !isSubscribed && (
        <Alert
          className="mt-4"
          variant="warning"
          title="Recording locked"
          description="Upgrade to the Research Network plan for transcripts, downloads, and chapter markers."
        />
      )}
      {event.accessLevel === "institution_only" && user?.role === "participant" && (
        <Alert
          className="mt-4"
          variant="info"
          title="Institution-only event"
          description="Contact your institutional administrator or request access from the organizing host."
        />
      )}
      {!user && (
        <Alert
          className="mt-4"
          variant="info"
          title="Tip"
          description="Sign in or create a participant profile to bookmark events and manage registrations."
        />
      )}
    </div>
  );
};
