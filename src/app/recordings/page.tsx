"use client";

import { useMemo, useState } from "react";
import { FileText, Lock, Users } from "lucide-react";
import { events, institutions, pageContent, recordings, series } from "@/lib/mockData";
import { useSubscription } from "@/hooks/useSubscription";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatDateTime } from "@/lib/utils";

const topics = ["all", ...new Set(events.flatMap((event) => event.topicTags))];
const institutionOptions = ["all", ...institutions.map((institution) => institution.id)];
const speakerOptions = ["all", ...new Set(events.flatMap((event) => event.speakers.map((speaker) => speaker.name)))];
const seriesOptions = ["all", "none", ...series.map((entry) => entry.id)];

const enrichedRecordings = recordings.map((recording) => {
  const event = events.find((candidate) => candidate.id === recording.eventId);
  const institution = institutions.find((candidate) => candidate.id === event?.institutionId);
  return { recording, event, institution };
});

export default function LibraryPage() {
  const { subscription } = useSubscription();
  const [topic, setTopic] = useState("all");
  const [institutionId, setInstitutionId] = useState("all");
  const [speaker, setSpeaker] = useState("all");
  const [seriesFilter, setSeriesFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const isSubscribed = subscription?.status === "active";

  const filtered = useMemo(() => {
    return enrichedRecordings.filter(({ event, recording }) => {
      if (!event) return false;
      if (topic !== "all" && !event.topicTags.includes(topic)) return false;
      if (institutionId !== "all" && event.institutionId !== institutionId) return false;
      if (speaker !== "all" && !event.speakers.some((item) => item.name === speaker)) return false;
      if (seriesFilter !== "all") {
        if (seriesFilter === "none" && event.seriesId) return false;
        if (seriesFilter !== "none" && event.seriesId !== seriesFilter) return false;
      }
      if (dateFilter) {
        const available = new Date(recording.availableFrom);
        if (available < new Date(dateFilter)) return false;
      }
      return true;
    });
  }, [topic, institutionId, speaker, seriesFilter, dateFilter]);

  return (
    <div className="space-y-8">
      <section className="space-y-6 rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-card)">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-(--text-secondary)">{pageContent.recordings.heroKicker}</p>
            <h1 className="mt-2 text-4xl font-semibold text-foreground">{pageContent.recordings.heroTitle}</h1>
            <p className="mt-2 text-(--text-secondary)">{pageContent.recordings.heroSubtitle}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {pageContent.recordings.badges.map((badge) => (
                <span key={badge.label} className="rounded-full border border-(--border-subtle) bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-(--text-secondary)">
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Select value={topic} onChange={(event) => setTopic(event.target.value)}>
              {topics.map((value) => (
                <option key={value} value={value}>
                  {value === "all" ? "All topics" : value}
                </option>
              ))}
            </Select>
            <Select value={institutionId} onChange={(event) => setInstitutionId(event.target.value)}>
              {institutionOptions.map((value) => (
                <option key={value} value={value}>
                  {value === "all" ? "All institutions" : institutions.find((inst) => inst.id === value)?.name}
                </option>
              ))}
            </Select>
            <Select value={speaker} onChange={(event) => setSpeaker(event.target.value)}>
              {speakerOptions.map((value) => (
                <option key={value} value={value}>
                  {value === "all" ? "All speakers" : value}
                </option>
              ))}
            </Select>
            <Select value={seriesFilter} onChange={(event) => setSeriesFilter(event.target.value)}>
              {seriesOptions.map((value) => (
                <option key={value} value={value}>
                  {value === "all" ? "All series" : value === "none" ? "Standalone" : series.find((entry) => entry.id === value)?.title}
                </option>
              ))}
            </Select>
            <Input type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} placeholder="Available after" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-(--text-secondary)">
          <span className="inline-flex items-center gap-2 rounded-full border border-(--border-subtle) bg-white px-3 py-1 text-foreground">
            <Users size={14} />
            {filtered.length} recordings
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-(--border-subtle) bg-white px-3 py-1 text-foreground">
            <Lock size={14} />
            {isSubscribed ? "Your access is active" : "Restricted until subscription"}
          </span>
        </div>
      </section>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map(({ recording, event, institution }) => {
          if (!event) return null;
          const hasAccess = isSubscribed || event.accessLevel === "open";
          return (
            <div key={recording.id} className="relative">
              <Card title={event.title} description={event.shortDescription}>
                <p className="text-sm text-(--text-secondary)">
                  {institution?.name} · {formatDateTime(recording.availableFrom)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-(--text-secondary)">
                  <span>{event.category}</span>
                  <span>·</span>
                  <span>{event.accessLevel.replace("_", " ")}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-(--text-secondary)">
                  {event.speakers.slice(0, 2).map((speakerProfile) => (
                    <span key={speakerProfile.id} className="rounded-full border border-(--border-subtle) px-3 py-1">
                      {speakerProfile.name}
                    </span>
                  ))}
                </div>
                <Button href={hasAccess ? `/events/${event.id}` : "/pricing"} variant={hasAccess ? "secondary" : "ghost"} fullWidth className="mt-4">
                  {hasAccess ? "Watch recording" : "Unlock with access"}
                </Button>
              </Card>
              {!hasAccess && (
                <div className="absolute inset-0 rounded-3xl border border-(--border-subtle) bg-white/70 p-4 text-center text-sm font-semibold text-foreground">
                  <p>Institutional or Research Network plan required.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
