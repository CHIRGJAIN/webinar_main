import { Event } from "@/lib/types";
import { EventCard } from "./EventCard";

interface EventGridProps {
  events: Event[];
}

export const EventGrid = ({ events }: EventGridProps) => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {events.map((event) => (
      <EventCard key={event.id} event={event} />
    ))}
  </div>
);
