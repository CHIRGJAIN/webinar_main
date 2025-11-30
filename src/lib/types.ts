export type UserRole = "participant" | "host" | "institution_admin" | "platform_admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institutionId: string | null;
  institution?: string;
  avatarUrl?: string;
  title?: string;
  bio?: string;
  subscriptionStatus?: "none" | "active" | "institutional" | "expired";
  createdAt: string;
}

export type InstitutionType =
  | "university"
  | "research_institute"
  | "international_organization"
  | "think_tank"
  | "other";

export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  country: string;
  description: string;
  focus?: string;
  logoUrl?: string;
  websiteUrl?: string;
}

export type EventStatus = "upcoming" | "live" | "completed";
export type EventAccessLevel = "open" | "registered_only" | "institution_only";

export interface SpeakerProfile {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  institutionId: string;
  bio?: string;
  photoUrl: string;
}

export type EventMaterialType = "brief" | "deck" | "note" | "link";

export interface EventMaterial {
  id: string;
  title: string;
  type: EventMaterialType;
  url: string;
  access: "open" | "restricted";
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  topicTags: string[];
  seriesId: string | null;
  hostUserId: string;
  institutionId: string;
  scheduledAt: string;
  durationMinutes: number;
  status: EventStatus;
  accessLevel: EventAccessLevel;
  hasRecording: boolean;
  language: string;
  thumbnailUrl?: string;
  isFlagship: boolean;
  speakers: SpeakerProfile[];
  materials: EventMaterial[];
}

export interface Recording {
  id: string;
  eventId: string;
  webinarId?: string; // backward compatibility while migrating components
  videoUrl: string;
  durationMinutes: number;
  availableFrom: string;
  accessLevel: EventAccessLevel;
}

export interface Series {
  id: string;
  title: string;
  description: string;
  institutionId: string;
  theme: string;
  thumbnailUrl?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  isInstitutionalPlan: boolean;
  isMostPopular?: boolean;
}

export type SubscriptionStatus = "active" | "canceled" | "past_due";

export interface Subscription {
  id: string;
  userId: string | null;
  institutionId: string | null;
  planId: string;
  status: SubscriptionStatus;
  renewsAt: string;
}

export interface LiveChatMessage {
  id: string;
  userName: string;
  content: string;
  timestamp: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
}

export interface RoleSummary {
  role: UserRole;
  title: string;
  description: string;
  permissions: string[];
}

// Backward-compatible aliases while the app transitions from "webinars" to "events".
// These will be removed once every route/component uses the new naming.
export type Webinar = Event;
export type WebinarStatus = EventStatus;
export type AccessLevel = EventAccessLevel;
export type ProgramSeries = Series;
