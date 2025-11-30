"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Calendar, Clock, Globe, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LiveStatusPill } from "./LiveStatusPill";
import { formatDateTime, formatDuration } from "@/lib/utils";
import { Event } from "@/lib/types";
import { mockUsers } from "@/lib/mockData";
import { getInstitutionById } from "@/lib/institutions";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";

interface EventCardProps {
  event: Event;
}

const accessCopy: Record<Event["accessLevel"], string> = {
  open: "Open access",
  registered_only: "Registration required",
  institution_only: "Institutional cohort",
};

export const EventCard = ({ event }: EventCardProps) => {
  const { user } = useAuth();
  const { subscription } = useSubscription();

  const host = useMemo(() => Object.values(mockUsers).find((candidate) => candidate.id === event.hostUserId), [event.hostUserId]);
  const institution = useMemo(() => getInstitutionById(event.institutionId), [event.institutionId]);
  const hasActivePlan = subscription?.status === "active";

  const cta = () => {
    if (event.status === "live") return "Join live room";
    if (event.status === "upcoming") {
      if (event.accessLevel === "institution_only" && user?.role !== "institution_admin" && user?.role !== "platform_admin") {
        return "Request institutional access";
      }
      return "Register";
    }
    if (event.status === "completed" && event.hasRecording) {
      return hasActivePlan ? "Watch recording" : "Upgrade to watch";
    }
    return "View briefing";
  };

  const ctaHref = event.status === "live" ? `/live/${event.id}` : `/events/${event.id}`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-4xl border border-(--border-subtle) bg-surface shadow-(--shadow-soft) transition duration-300 hover:-translate-y-2 hover:shadow-(--shadow-card)">
      {event.thumbnailUrl && (
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={event.thumbnailUrl}
            alt={event.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[rgba(0,24,51,0.65)] via-transparent to-transparent" />
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
            <Badge label={event.category} />
            <LiveStatusPill status={event.status} />
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-(--text-secondary)">
            {event.isFlagship && <span className="text-primary">Flagship</span>}
            {event.language && (
              <>
                {event.isFlagship && <span className="h-0.5 w-6 rounded-full bg-(--border-subtle)" />}
                <span>{event.language}</span>
              </>
            )}
          </div>
          <h3 className="mt-2 text-2xl font-semibold text-foreground">{event.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-(--text-secondary)">{event.shortDescription}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-(--text-secondary)">
          <span className="inline-flex items-center gap-1">
            <Calendar size={16} />
            {formatDateTime(event.scheduledAt)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={16} />
            {formatDuration(event.durationMinutes)}
          </span>
          {institution && (
            <span className="inline-flex items-center gap-1">
              <Globe size={16} />
              {institution.country}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            label={accessCopy[event.accessLevel]}
            variant={event.accessLevel === "open" ? "success" : event.accessLevel === "institution_only" ? "warning" : "default"}
          />
          {event.topicTags.slice(0, 2).map((tag) => (
            <Badge key={tag} label={tag} variant="outline" />
          ))}
        </div>
        {(institution || host) && (
          <div className="flex items-center gap-3 rounded-2xl border border-(--border-subtle) bg-surface-alt/40 p-3">
            {institution?.logoUrl ? (
              <Image src={institution.logoUrl} alt={institution.name} width={44} height={44} className="rounded-xl object-cover" />
            ) : host?.avatarUrl ? (
              <Image src={host.avatarUrl} alt={host.name} width={44} height={44} className="rounded-full object-cover" />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                {institution?.name.slice(0, 2) ?? "GA"}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-foreground">{institution?.name ?? "Global Academic Forum"}</p>
              {host && <p className="text-xs text-(--text-secondary)">{host.name}</p>}
            </div>
          </div>
        )}
        <Button href={ctaHref} variant={event.status === "live" ? "primary" : "secondary"} fullWidth aria-label={`Go to ${event.title}`}>
          {cta()}
        </Button>
        {event.status === "completed" && event.hasRecording && !user && (
          <p className="text-center text-xs text-(--text-secondary)">Sign in to access recordings.</p>
        )}
      </div>
    </div>
  );
};
