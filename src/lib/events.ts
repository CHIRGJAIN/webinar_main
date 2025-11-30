import { events, recordings } from "./mockData";
import { Event, EventAccessLevel, EventStatus, Recording } from "./types";

export const getEventById = (id: string): Event | undefined => events.find((event) => event.id === id);

export const getEventBySlug = (slug: string): Event | undefined => events.find((event) => event.slug === slug);

export const getEventsByStatus = (status: EventStatus): Event[] => events.filter((event) => event.status === status);

export const getEventsByAccessLevel = (accessLevel: EventAccessLevel): Event[] =>
  events.filter((event) => event.accessLevel === accessLevel);

export const getRelatedEvents = (category: string, currentId: string): Event[] =>
  events.filter((event) => event.category === category && event.id !== currentId).slice(0, 3);

export const getEventRecording = (eventId: string): Recording | undefined =>
  recordings.find((recording) => recording.eventId === eventId);

export const getEventsForHost = (hostUserId: string): Event[] =>
  events.filter((event) => event.hostUserId === hostUserId);

export interface EventFilters {
  search?: string;
  category?: string;
  status?: EventStatus | "all";
  accessLevel?: EventAccessLevel | "all";
  topic?: string;
}

export const filterEvents = (filters: EventFilters): Event[] => {
  return events.filter((event) => {
    if (filters.search && !event.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.category && filters.category !== "all" && event.category !== filters.category) {
      return false;
    }
    if (filters.status && filters.status !== "all" && event.status !== filters.status) {
      return false;
    }
    if (filters.accessLevel && filters.accessLevel !== "all" && event.accessLevel !== filters.accessLevel) {
      return false;
    }
    if (filters.topic && filters.topic !== "all" && !event.topicTags.includes(filters.topic)) {
      return false;
    }
    return true;
  });
};
