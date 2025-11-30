import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { events } from "@/lib/mockData";
import { getInstitutionById, getSeriesById } from "@/lib/institutions";
import { EventGrid } from "@/components/events/EventGrid";
import { formatDateTime } from "@/lib/utils";

interface SeriesDetailPageProps {
  params: { id: string };
}

export default function SeriesDetailPage({ params }: SeriesDetailPageProps) {
  const series = getSeriesById(params.id);
  if (!series) {
    notFound();
  }

  const hostInstitution = getInstitutionById(series.institutionId);
  const relatedEvents = events.filter((event) => event.seriesId === series.id);
  const upcoming = relatedEvents.filter((event) => event.status !== "completed");
  const past = relatedEvents.filter((event) => event.status === "completed");

  return (
    <div className="space-y-8">
      <header className="rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-card)">
        <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Series</p>
        <h1 className="mt-2 text-4xl font-semibold text-foreground">{series.title}</h1>
        <p className="text-sm text-(--text-secondary)">{series.theme}</p>
        <p className="mt-4 text-base text-(--text-secondary)">{series.description}</p>
        {hostInstitution && <p className="mt-3 text-sm text-(--text-secondary)">Hosted by {hostInstitution.name}</p>}
      </header>

      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Upcoming events</p>
          <h2 className="text-3xl font-semibold text-foreground">Next sessions in this arc</h2>
        </div>
        {upcoming.length ? <EventGrid events={upcoming} /> : <p className="text-sm text-(--text-secondary)">No upcoming events scheduled.</p>}
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Past sessions</p>
          <h2 className="text-2xl font-semibold text-foreground">Briefings with available recordings</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {past.length ? (
            past.map((event) => (
              <Card key={event.id} title={event.title} description={event.shortDescription}>
                <p className="text-sm text-(--text-secondary)">{formatDateTime(event.scheduledAt)}</p>
              </Card>
            ))
          ) : (
            <p className="text-sm text-(--text-secondary)">Recordings will surface after sessions conclude.</p>
          )}
        </div>
      </section>
    </div>
  );
}
