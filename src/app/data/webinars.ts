export type BadgeType = "LIVE" | "SCHEDULED" | "NEW" | "INSTITUTIONAL";

export type Webinar = {
  id: string;
  title: string;
  thumbnailUrl: string;
  badgeType: BadgeType;
  datetime: string;
};

export const sampleWebinars: Webinar[] = [
  { id: "w1", title: "Live: Sustainable Trade Routes", thumbnailUrl: "https://picsum.photos/seed/live1/640/360", badgeType: "LIVE", datetime: "2025-03-12T14:00:00Z" },
  { id: "w2", title: "Digital Public Infra Forum", thumbnailUrl: "https://picsum.photos/seed/live2/640/360", badgeType: "LIVE", datetime: "2025-03-12T16:30:00Z" },
  { id: "w3", title: "BRICS Climate Dialogue", thumbnailUrl: "https://picsum.photos/seed/sched1/640/360", badgeType: "SCHEDULED", datetime: "2025-03-15T10:00:00Z" },
  { id: "w4", title: "New: Health Tech Cohort", thumbnailUrl: "https://picsum.photos/seed/new1/640/360", badgeType: "NEW", datetime: "2025-03-18T09:30:00Z" },
  { id: "w5", title: "Institutional Analytics", thumbnailUrl: "https://picsum.photos/seed/inst1/640/360", badgeType: "INSTITUTIONAL", datetime: "2025-03-20T12:00:00Z" },
  { id: "w6", title: "Cross-border Education", thumbnailUrl: "https://picsum.photos/seed/sched2/640/360", badgeType: "SCHEDULED", datetime: "2025-03-22T13:00:00Z" },
  { id: "w7", title: "Energy Transition Brief", thumbnailUrl: "https://picsum.photos/seed/sub1/640/360", badgeType: "NEW", datetime: "2025-03-25T15:30:00Z" },
  { id: "w8", title: "Policy Lab: AI Safety", thumbnailUrl: "https://picsum.photos/seed/sub2/640/360", badgeType: "NEW", datetime: "2025-03-28T11:00:00Z" },
  { id: "w9", title: "Global Health Forum", thumbnailUrl: "https://picsum.photos/seed/live3/640/360", badgeType: "LIVE", datetime: "2025-04-01T12:00:00Z" },
  { id: "w10", title: "Energy Security Roundtable", thumbnailUrl: "https://picsum.photos/seed/sched3/640/360", badgeType: "SCHEDULED", datetime: "2025-04-03T09:30:00Z" },
  { id: "w11", title: "Trade Policy Deep Dive", thumbnailUrl: "https://picsum.photos/seed/new3/640/360", badgeType: "NEW", datetime: "2025-04-05T15:00:00Z" },
  { id: "w12", title: "Institutional Governance", thumbnailUrl: "https://picsum.photos/seed/inst2/640/360", badgeType: "INSTITUTIONAL", datetime: "2025-04-08T10:00:00Z" },
  { id: "w13", title: "Live: Maritime Corridors", thumbnailUrl: "https://picsum.photos/seed/live4/640/360", badgeType: "LIVE", datetime: "2025-04-10T14:00:00Z" },
  { id: "w14", title: "Scheduled: Green Finance", thumbnailUrl: "https://picsum.photos/seed/sched4/640/360", badgeType: "SCHEDULED", datetime: "2025-04-12T09:00:00Z" },
  { id: "w15", title: "Subscribed: Cultural Exchange", thumbnailUrl: "https://picsum.photos/seed/new4/640/360", badgeType: "NEW", datetime: "2025-04-14T11:30:00Z" },
  { id: "w16", title: "Institutional: Education Pact", thumbnailUrl: "https://picsum.photos/seed/inst3/640/360", badgeType: "INSTITUTIONAL", datetime: "2025-04-16T16:00:00Z" },
  { id: "w17", title: "Live: Agri-Tech Cohort", thumbnailUrl: "https://picsum.photos/seed/live5/640/360", badgeType: "LIVE", datetime: "2025-04-18T12:00:00Z" },
  { id: "w18", title: "Scheduled: Urban Resilience", thumbnailUrl: "https://picsum.photos/seed/sched5/640/360", badgeType: "SCHEDULED", datetime: "2025-04-20T10:30:00Z" },
  { id: "w19", title: "Subscribed: Culture Summit", thumbnailUrl: "https://picsum.photos/seed/new5/640/360", badgeType: "NEW", datetime: "2025-04-22T17:30:00Z" },
  { id: "w20", title: "Institutional: Digital Trust", thumbnailUrl: "https://picsum.photos/seed/inst4/640/360", badgeType: "INSTITUTIONAL", datetime: "2025-04-24T15:00:00Z" },
  { id: "w21", title: "Live: Energy Markets", thumbnailUrl: "https://picsum.photos/seed/live6/640/360", badgeType: "LIVE", datetime: "2025-04-26T09:00:00Z" },
  { id: "w22", title: "Scheduled: Trade Corridors", thumbnailUrl: "https://picsum.photos/seed/sched6/640/360", badgeType: "SCHEDULED", datetime: "2025-04-28T11:00:00Z" },
  { id: "w23", title: "Subscribed: Water Security", thumbnailUrl: "https://picsum.photos/seed/new6/640/360", badgeType: "NEW", datetime: "2025-04-30T13:30:00Z" },
  { id: "w24", title: "Institutional: Talent Mobility", thumbnailUrl: "https://picsum.photos/seed/inst5/640/360", badgeType: "INSTITUTIONAL", datetime: "2025-05-02T10:00:00Z" },
];

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
