"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { institutions, series } from "@/lib/mockData";
import { events } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";

const themes = ["all", ...new Set(series.map((entry) => entry.theme))];
const institutionOptions = ["all", ...institutions.map((institution) => institution.id)];
const topics = ["all", ...new Set(events.flatMap((event) => event.topicTags))];

export default function SeriesPage() {
  const [theme, setTheme] = useState("all");
  const [institutionId, setInstitutionId] = useState("all");
  const [topic, setTopic] = useState("all");

  const filtered = useMemo(() => {
    return series.filter((entry) => {
      if (theme !== "all" && entry.theme !== theme) return false;
      if (institutionId !== "all" && entry.institutionId !== institutionId) return false;
      if (topic !== "all") {
        const relatedEvents = events.filter((event) => event.seriesId === entry.id);
        const matchesTopic = relatedEvents.some((event) => event.topicTags.includes(topic));
        if (!matchesTopic) return false;
      }
      return true;
    });
  }, [theme, institutionId, topic]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Program catalogue</p>
          <h1 className="text-4xl font-semibold text-foreground">Diplomatic series</h1>
          <p className="text-(--text-secondary)">Recurring seminar arcs curated with partner institutions and thematic leads.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Select value={theme} onChange={(event) => setTheme(event.target.value)}>
            {themes.map((value) => (
              <option key={value} value={value}>
                {value === "all" ? "All themes" : value}
              </option>
            ))}
          </Select>
          <Select value={institutionId} onChange={(event) => setInstitutionId(event.target.value)}>
            {institutionOptions.map((value) => (
              <option key={value} value={value}>
                {value === "all" ? "All institutions" : institutions.find((institution) => institution.id === value)?.name}
              </option>
            ))}
          </Select>
          <Select value={topic} onChange={(event) => setTopic(event.target.value)}>
            {topics.map((value) => (
              <option key={value} value={value}>
                {value === "all" ? "All topics" : value}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((entry) => {
          const hostInstitution = institutions.find((institution) => institution.id === entry.institutionId);
          const relatedEvents = events.filter((event) => event.seriesId === entry.id);
          const upcomingCount = relatedEvents.filter((event) => event.status !== "completed").length;
          return (
            <Card
              key={entry.id}
              title={entry.title}
              description={`${entry.theme} · ${hostInstitution?.name ?? "Global Academic Forum"}`}
              footer={
                <Link href={`/series/${entry.id}`} className="text-sm font-semibold text-primary">
                  View details →
                </Link>
              }
            >
              <p className="text-sm text-(--text-secondary)">{entry.description}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{upcomingCount} upcoming · {relatedEvents.length} total events</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
