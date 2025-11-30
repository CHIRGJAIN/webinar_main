"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Event } from "@/lib/types";
import { formatDateTime, formatDuration, timeUntil } from "@/lib/utils";

interface EventPosterCardProps {
  event: Event;
}

export const EventPosterCard = ({ event }: EventPosterCardProps) => {
  const isLive = event.status === "live";
  const isUpcoming = event.status === "upcoming";
  const statusLabel = isLive ? "Live" : isUpcoming ? "Upcoming" : "Recording";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group relative w-[280px] shrink-0 overflow-hidden rounded-3xl border border-(--border-subtle) bg-surface shadow-(--shadow-soft)"
    >
      {event.thumbnailUrl && (
        <Image
          src={event.thumbnailUrl}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 90vw, 320px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-[rgba(0,24,51,0.45)] via-transparent to-transparent" />
      <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge label={statusLabel} variant={isLive ? "warning" : isUpcoming ? "default" : "success"} />
          {event.accessLevel === "institution_only" && <Badge label="Closed door" variant="outline" />}
        </div>
        <span className="rounded-full border border-(--border-subtle) bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
          {event.category}
        </span>
      </div>
      <div className="absolute inset-x-4 bottom-4 space-y-2 rounded-2xl bg-white/95 p-3 text-sm shadow-(--shadow-soft)">
        {event.language && <p className="text-[11px] uppercase tracking-[0.2em] text-(--text-secondary)">{event.language}</p>}
        <h4 className="text-base font-semibold leading-tight text-foreground line-clamp-2">{event.title}</h4>
        <div className="flex items-center justify-between text-[11px] text-(--text-secondary)">
          <span className="inline-flex items-center gap-1">
            <Clock size={13} />
            {formatDuration(event.durationMinutes)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar size={13} />
            {isLive ? "On now" : isUpcoming ? timeUntil(event.scheduledAt) : formatDateTime(event.scheduledAt)}
          </span>
        </div>
        <Button size="sm" variant="primary" className="w-full" href={`/events/${event.id}`}>
          {isLive ? "Join room" : isUpcoming ? "Details" : "View briefing"}
        </Button>
      </div>
    </motion.div>
  );
};
