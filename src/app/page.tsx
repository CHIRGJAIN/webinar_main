"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Layers, MapPin, PlayCircle, Shield, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Carousel } from "@/components/ui/Carousel";
import { EventPosterCard } from "@/components/events/EventPosterCard";
import { EventCard } from "@/components/events/EventCard";
import { IconButton } from "@/components/ui/IconButton";
import { events, institutions, pageContent, recordings, roleSummaries, series } from "@/lib/mockData";
import { formatDateTime, formatDuration } from "@/lib/utils";

const flagshipHighlights = events.filter((event) => event.isFlagship && event.status !== "completed").slice(0, 3);
const upcomingEvents = events.filter((event) => event.status === "upcoming" || event.status === "live");
const themeOptions = ["all", ...new Set(events.map((event) => event.category))];

const stats = [
  { label: pageContent.home.stats[0].label, value: pageContent.home.stats[0].value, icon: Shield },
  { label: pageContent.home.stats[1].label, value: pageContent.home.stats[1].value, icon: Layers },
  { label: pageContent.home.stats[2].label, value: pageContent.home.stats[2].value, icon: Users },
];

const heroGallery = [
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600",
    title: "Flagship seminar",
    caption: "Hybrid briefing with institutional partners and scholars",
  },
  {
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600",
    title: "Panel discussion",
    caption: "Cross-regional roundtable on digital public infrastructure",
  },
  {
    url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1600",
    title: "Academic cohort",
    caption: "Collaborative working session with research fellows",
  },
];

export default function Home() {
  const [theme, setTheme] = useState("all");
  const [heroIndex, setHeroIndex] = useState(0);

  const filteredUpcoming = useMemo(() => {
    if (theme === "all") return upcomingEvents;
    return upcomingEvents.filter((event) => event.category === theme);
  }, [theme]);

  const recentRecordings = useMemo(() => {
    return recordings.slice(0, 4).map((recording) => {
      const event = events.find((candidate) => candidate.id === recording.eventId);
      return { recording, event };
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((previous) => (previous + 1) % heroGallery.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-14">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-10 rounded-4xl border border-(--border-subtle) bg-surface p-10 shadow-(--shadow-card) lg:grid-cols-[1.4fr_1fr]"
      >
        <div className="space-y-6">
          <Badge label="Academic + policy network" />
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-(--text-secondary)">Global Academic Forum</p>
            <h1 className="text-4xl font-semibold leading-tight text-foreground lg:text-5xl">{pageContent.home.heroTitle}</h1>
            <p className="max-w-2xl text-lg text-(--text-secondary)">{pageContent.home.heroSubtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" href="/events">
              Explore calendar
              <ArrowRight size={18} />
            </Button>
            <Button size="lg" variant="secondary" href="/auth/register">
              Join as participant
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-(--border-subtle) bg-surface-alt/70 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-(--text-secondary)">
                  <stat.icon size={14} />
                  {stat.label}
                </div>
                <p className="mt-3 text-2xl font-semibold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Flagship seminars</p>
            <div className="flex gap-2">
              <IconButton subtle aria-label="Previous hero image" onClick={() => setHeroIndex((previous) => (previous - 1 + heroGallery.length) % heroGallery.length)}>
                <ChevronLeft size={16} />
              </IconButton>
              <IconButton subtle aria-label="Next hero image" onClick={() => setHeroIndex((previous) => (previous + 1) % heroGallery.length)}>
                <ChevronRight size={16} />
              </IconButton>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-4xl border border-(--border-subtle) bg-surface-alt shadow-(--shadow-soft) min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroGallery[heroIndex].url}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src={heroGallery[heroIndex].url}
                  alt={heroGallery[heroIndex].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 640px"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-[rgba(36,21,10,0.65)] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-(--border-subtle) bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-(--text-secondary)">
                    {heroGallery[heroIndex].title}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.28)]">
                    {heroGallery[heroIndex].caption}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      <section className="rounded-4xl border border-(--border-subtle) bg-surface p-8 shadow-(--shadow-card)">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-(--text-secondary)">Upcoming seminars & discussions</p>
            <h2 className="text-3xl font-semibold text-foreground">Browse by academic theme</h2>
          </div>
          <Select value={theme} onChange={(event) => setTheme(event.target.value)}>
            {themeOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All themes" : option}
              </option>
            ))}
          </Select>
          <Button variant="ghost" href="/events">
            View full calendar
            <ArrowRight size={16} />
          </Button>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredUpcoming.slice(0, 6).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            {/* <p className="text-xs uppercase tracking-[0.25em] text-(--text-secondary)">Featured institutions</p> */}
            <h2 className="text-3xl font-semibold text-foreground">Featured institutions</h2>
          </div>
          <Button variant="ghost" href="/institutions/academic">
            Browse academic institutions
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {institutions.map((institution) => (
            <div key={institution.id} className="rounded-3xl border border-(--border-subtle) bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-foreground">{institution.name}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{institution.country}</p>
                </div>
                <Badge label={institution.type.replace("_", " ")} variant="outline" />
              </div>
              <p className="mt-3 text-sm text-(--text-secondary)">{institution.description}</p>
              <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-(--text-secondary)">
                <MapPin size={14} />
                {institution.focus}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft) lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-(--text-secondary)">Thematic series</p>
          <h2 className="text-3xl font-semibold text-foreground">Multi-part diplomacy programs</h2>
          <div className="space-y-4">
            {series.map((entry) => (
              <div key={entry.id} className="rounded-3xl border border-(--border-subtle) bg-surface-alt/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{entry.title}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{entry.theme}</p>
                  </div>
                  <Button size="sm" variant="ghost" href={`/series/${entry.id}`}>
                    View series
                  </Button>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-(--text-secondary)">{entry.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-(--border-subtle) bg-linear-to-br from-white to-surface-alt p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-(--text-secondary)">Access clarity</p>
          <h3 className="mt-2 text-2xl font-semibold text-foreground">Open, registered, institutional</h3>
          <p className="mt-3 text-sm text-(--text-secondary)">
            Each listing specifies how to participate. Institutional admins can request closed door cohorts while independent researchers join open or registered briefings instantly.
          </p>
          <ul className="mt-4 space-y-3 text-sm text-(--text-secondary)">
            <li className="rounded-2xl border border-(--border-subtle) bg-white px-4 py-3">Open: stream publicly with moderated chat.</li>
            <li className="rounded-2xl border border-(--border-subtle) bg-white px-4 py-3">Registered: participant profile required for Q&A.</li>
            <li className="rounded-2xl border border-(--border-subtle) bg-white px-4 py-3">Institutional: curated rosters, analytics, and resources.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft)">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-(--text-secondary)">Recently recorded</p>
            <h2 className="text-3xl font-semibold text-foreground">Highlights ready to watch</h2>
          </div>
          <Button variant="ghost" href="/recordings">
            Open library
          </Button>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {recentRecordings.map(({ recording, event }) => (
            <div key={recording.id} className="rounded-3xl border border-(--border-subtle) bg-white p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-(--text-secondary)">
                <PlayCircle size={14} />
                Recording
              </div>
              <h3 className="mt-2 text-xl font-semibold text-foreground">{event?.title}</h3>
              <p className="text-sm text-(--text-secondary)">{event?.shortDescription}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-(--text-secondary)">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} />
                  {formatDateTime(event?.scheduledAt ?? recording.availableFrom)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} />
                  {event?.category}
                </span>
              </div>
              {event && (
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-(--text-secondary)">
                  {formatDuration(event.durationMinutes)} · {event.accessLevel.replace("_", " ")}
                </p>
              )}
              <Button href={event ? `/events/${event.id}` : "/recordings"} variant="secondary" className="mt-4 w-full">
                View details
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-4xl border border-(--border-subtle) bg-linear-to-r from-primary/90 to-secondary/90 p-10 text-white shadow-(--shadow-card)">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Role-based workspaces</p>
            <h2 className="text-3xl font-semibold">Participants, hosts, institutions, platform</h2>
            <p className="max-w-2xl text-white/80">
              Dedicated dashboards help academics manage registrations, hosts coordinate facilitation, institutions monitor cohorts, and platform admins review global metrics.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {roleSummaries.map((role) => (
              <div key={role.role} className="rounded-3xl border border-white/40 bg-white/10 p-4 text-left">
                <p className="text-sm font-semibold text-white">{role.title}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">{role.role}</p>
                <p className="mt-2 text-sm text-white/80">{role.description}</p>
              </div>
            ))}
          </div>
          <Button size="lg" variant="ghost" href="/pricing" className="border-white/40 text-white hover:bg-white/10">
            Compare access pathways
          </Button>
        </div>
      </section>
    </div>
  );
}
