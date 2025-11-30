import {
  EventFilters,
  filterEvents,
  getEventById,
  getEventRecording,
  getEventsByStatus,
  getEventsForHost,
  getRelatedEvents,
} from "./events";
import { Webinar, WebinarStatus } from "./types";

export type WebinarFilters = EventFilters;

export const getWebinarsByStatus = (status: WebinarStatus): Webinar[] => getEventsByStatus(status);

export const getWebinarById = (id: string): Webinar | undefined => getEventById(id);

export const getWebinarRecording = (webinarId: string) => getEventRecording(webinarId);

export const getRelatedWebinars = (category: string, currentId: string): Webinar[] =>
  getRelatedEvents(category, currentId);

export const filterWebinars = (filters: WebinarFilters): Webinar[] => filterEvents(filters);

export const getSpeakerWebinars = (speakerId: string): Webinar[] => getEventsForHost(speakerId);
