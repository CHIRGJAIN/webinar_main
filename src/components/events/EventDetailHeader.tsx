import { Calendar, Clock, Layers3, MapPin, Tag } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { formatDateTime, formatDuration } from "@/lib/utils";
import { Event } from "@/lib/types";
import { mockUsers } from "@/lib/mockData";
import { LiveStatusPill } from "./LiveStatusPill";
import { getInstitutionById, getSeriesById } from "@/lib/institutions";

interface Props {
  event: Event;
}

export const EventDetailHeader = ({ event }: Props) => {
  const host = Object.values(mockUsers).find((candidate) => candidate.id === event.hostUserId);
  const institution = getInstitutionById(event.institutionId);
  const series = event.seriesId ? getSeriesById(event.seriesId) : undefined;

  return (
    <header className="rounded-4xl border border-(--border-subtle) bg-surface p-8 shadow-(--shadow-soft)">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <LiveStatusPill status={event.status} />
        <div className="flex flex-wrap gap-2">
          <Badge label={event.category} />
          {event.language && <Badge label={event.language} variant="success" />}
          {event.accessLevel === "institution_only" && <Badge label="Closed door" variant="warning" />}
          {event.isFlagship && <Badge label="Flagship" variant="outline" />}
        </div>
      </div>
      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-(--text-secondary)">
            Global Academic Forum {series ? `· ${series.title}` : "Briefing"}
          </p>
          <h1 className="text-4xl font-semibold text-foreground">{event.title}</h1>
          <p className="text-base leading-relaxed text-(--text-secondary)">{event.longDescription}</p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-(--text-secondary)">
          <span className="inline-flex items-center gap-2">
            <Calendar size={16} />
            {formatDateTime(event.scheduledAt)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock size={16} />
            {formatDuration(event.durationMinutes)}
          </span>
          {institution && (
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} />
              {institution.country}
            </span>
          )}
          <span className="inline-flex items-center gap-2">
            <Tag size={16} />
            {event.topicTags.join(" · ")}
          </span>
          {series && (
            <span className="inline-flex items-center gap-2">
              <Layers3 size={16} />
              {series.theme}
            </span>
          )}
        </div>
        {(institution || host) && (
          <div className="flex items-center gap-4 rounded-3xl border border-(--border-subtle) bg-surface-alt/70 p-4">
            {institution?.logoUrl ? (
              <Image src={institution.logoUrl} alt={institution.name} width={64} height={64} className="rounded-2xl object-cover" />
            ) : (
              host?.avatarUrl && <Image src={host.avatarUrl} alt={host.name} width={64} height={64} className="rounded-full object-cover" />
            )}
            <div>
              {host && <p className="text-sm font-semibold text-foreground">{host.name}</p>}
              <p className="text-xs uppercase tracking-[0.28em] text-(--text-secondary)">{institution?.name ?? "Global Academic Forum"}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
