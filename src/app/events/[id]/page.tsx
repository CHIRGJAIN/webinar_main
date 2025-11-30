import { notFound } from "next/navigation";
import Link from "next/link";
import { EventDetailHeader } from "@/components/events/EventDetailHeader";
import { EventActions } from "@/components/events/EventActions";
import { getEventById, getRelatedEvents } from "@/lib/events";
import { Card } from "@/components/ui/Card";
import { institutions, series as seriesList } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { formatDateTime } from "@/lib/utils";

interface EventDetailPageProps {
  params: { id: string };
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = params;
  const event = getEventById(id);
  if (!event) {
    notFound();
  }

  const related = getRelatedEvents(event.category, event.id);
  const hostInstitution = institutions.find((institution) => institution.id === event.institutionId);
  const series = event.seriesId ? seriesList.find((candidate) => candidate.id === event.seriesId) : undefined;
  const discussionThemes = event.topicTags.slice(0, 4);

  return (
    <div className="space-y-8">
      <EventDetailHeader event={event} />
      <EventActions event={event} />
      <section className="grid gap-6 lg:grid-cols-2">
        <Card title="Session objectives" description="Briefing focus areas for this cohort">
          <ul className="space-y-3 text-sm leading-relaxed text-(--text-secondary)">
            <li>• Align institutions on latest policy developments for {hostInstitution?.country ?? "the region"}.</li>
            <li>• Share actionable frameworks that participants can adapt inside their ministries or programs.</li>
            <li>• Capture cross-regional questions to inform the next installment of the series.</li>
          </ul>
        </Card>
        <Card title="Agenda & format" description="Designed for diplomatic collaboration">
          <div className="space-y-2 text-sm text-(--text-secondary)">
            <p>
              <strong>Opening context</strong>: Facilitator outlines current state of play.
            </p>
            <p>
              <strong>Case exchange</strong>: Host institution presents recent data and policy levers.
            </p>
            <p>
              <strong>Dialogue</strong>: Moderated Q&A across participating institutions.
            </p>
            <p>
              <strong>Action queue</strong>: Document next steps, bilateral follow ups, and shared resources.
            </p>
          </div>
        </Card>
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        <Card title="Event logistics">
          <div className="space-y-2 text-sm text-(--text-secondary)">
            <p>
              <strong>Schedule</strong>: {formatDateTime(event.scheduledAt)}
            </p>
            <p>
              <strong>Duration</strong>: {event.durationMinutes} minutes
            </p>
            <p>
              <strong>Access</strong>: {event.accessLevel === "open" ? "Open access" : event.accessLevel === "registered_only" ? "Registration required" : "Institutional cohort"}
            </p>
            {event.language && (
              <p>
                <strong>Languages</strong>: {event.language}
              </p>
            )}
          </div>
        </Card>
        <Card title="Host institution">
          <div className="space-y-2 text-sm text-(--text-secondary)">
            <p className="text-base font-semibold text-foreground">{hostInstitution?.name ?? "Global Academic Forum"}</p>
            {hostInstitution && <p>{hostInstitution.description}</p>}
            {hostInstitution && (
              <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">
                {hostInstitution.country} · {hostInstitution.focus}
              </p>
            )}
          </div>
        </Card>
        <Card title="Discussion threads">
          <div className="flex flex-wrap gap-2">
            {discussionThemes.map((theme) => (
              <Badge key={theme} label={theme} variant="outline" />
            ))}
          </div>
        </Card>
      </section>
      {event.speakers.length > 0 && (
        <section className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Speakers & facilitators</p>
            <h2 className="text-3xl font-semibold text-foreground">Scholars anchoring this session</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {event.speakers.map((speaker) => (
              <Card key={speaker.id} title={speaker.name} description={speaker.title}>
                <p className="text-sm text-(--text-secondary)">{speaker.affiliation}</p>
                {speaker.bio && <p className="text-sm text-(--text-secondary)">{speaker.bio}</p>}
              </Card>
            ))}
          </div>
        </section>
      )}
      {event.materials.length > 0 && (
        <Card title="Event materials" description="Shared ahead of the seminar for preparation" className="border-dashed">
          <ul className="space-y-3 text-sm text-(--text-secondary)">
            {event.materials.map((material) => (
              <li key={material.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-(--border-subtle) bg-surface-alt/60 px-4 py-3">
                <div>
                  <p className="font-semibold text-foreground">{material.title}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{material.type} · {material.access === "open" ? "Open" : "Restricted"}</p>
                </div>
                <Link href={material.url} className="text-sm font-semibold text-primary">
                  View
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
      {series && (
        <Card
          title="Program series context"
          description={`Part of ${series.title}`}
          className="border-dashed"
        >
          <p className="text-sm text-(--text-secondary)">{series.description}</p>
          <div className="mt-3 text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{series.theme}</div>
        </Card>
      )}
      {related.length > 0 && (
        <section className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">More from this track</p>
            <h2 className="text-3xl font-semibold text-foreground">Related events</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <Card key={item.id} title={item.title} description={item.shortDescription}>
                <p className="text-sm text-(--text-secondary)">{formatDateTime(item.scheduledAt)}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge label={item.category} />
                  <Badge label={item.accessLevel} variant="outline" />
                </div>
                <div>
                  <Link href={`/events/${item.id}`} className="text-sm font-semibold text-primary">
                    Go to event →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
