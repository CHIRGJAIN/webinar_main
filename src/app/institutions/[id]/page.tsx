import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { EventGrid } from "@/components/events/EventGrid";
import { formatDateTime } from "@/lib/utils";
import { recordings } from "@/lib/mockData";
import { getInstitutionById, getInstitutionEvents, getInstitutionSeries } from "@/lib/institutions";

interface InstitutionPageProps {
  params: { id: string };
}

export default function InstitutionProfilePage({ params }: InstitutionPageProps) {
  const institution = getInstitutionById(params.id);
  if (!institution) {
    notFound();
  }

  const institutionEvents = getInstitutionEvents(institution.id);
  const upcomingEvents = institutionEvents.filter((event) => event.status !== "completed");
  const hostedSeries = getInstitutionSeries(institution.id);
  const recentRecordings = recordings
    .filter((recording) => institutionEvents.some((event) => event.id === recording.eventId))
    .slice(0, 3);

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap gap-6 rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-card)">
        {institution.logoUrl && (
          <Image src={institution.logoUrl} alt={institution.name} width={96} height={96} className="rounded-3xl object-cover" />
        )}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Institution profile</p>
          <h1 className="text-4xl font-semibold text-foreground">{institution.name}</h1>
          <p className="text-sm text-(--text-secondary)">{institution.country} · {institution.type.replace("_", " ")}</p>
          <p className="text-base text-(--text-secondary)">{institution.description}</p>
          {institution.websiteUrl && (
            <Link href={institution.websiteUrl} className="text-sm font-semibold text-primary" target="_blank">
              Visit website →
            </Link>
          )}
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Upcoming events</p>
            <h2 className="text-3xl font-semibold text-foreground">Sessions hosted by {institution.name}</h2>
          </div>
          <Link href="/events" className="text-sm font-semibold text-primary">View calendar</Link>
        </div>
        {upcomingEvents.length ? <EventGrid events={upcomingEvents.slice(0, 4)} /> : <p className="text-sm text-(--text-secondary)">No upcoming sessions scheduled.</p>}
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Recent recordings</p>
          <h2 className="text-2xl font-semibold text-foreground">Replay briefings from this institution</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {recentRecordings.length ? (
            recentRecordings.map((recording) => {
              const event = institutionEvents.find((candidate) => candidate.id === recording.eventId);
              if (!event) return null;
              return (
                <Card key={recording.id} title={event.title} description={event.shortDescription}>
                  <p className="text-sm text-(--text-secondary)">{formatDateTime(recording.availableFrom)}</p>
                  <Link href={`/events/${event.id}`} className="text-sm font-semibold text-primary">
                    View details →
                  </Link>
                </Card>
              );
            })
          ) : (
            <p className="text-sm text-(--text-secondary)">Recordings will appear once sessions conclude.</p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Series hosted</p>
          <h2 className="text-2xl font-semibold text-foreground">Thematic programs by this institution</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {hostedSeries.length ? (
            hostedSeries.map((entry) => (
              <Card key={entry.id} title={entry.title} description={entry.theme}>
                <p className="text-sm text-(--text-secondary)">{entry.description}</p>
                <Link href={`/series/${entry.id}`} className="text-sm font-semibold text-primary">
                  Go to series →
                </Link>
              </Card>
            ))
          ) : (
            <p className="text-sm text-(--text-secondary)">No series published yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
