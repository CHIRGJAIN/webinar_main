import {
  DashboardStat,
  Event,
  EventMaterial,
  Institution,
  LiveChatMessage,
  Recording,
  RoleSummary,
  SpeakerProfile,
  Series,
  Subscription,
  SubscriptionPlan,
  User,
  UserRole,
} from "./types";

const now = new Date();
const hoursFromNow = (hours: number) => new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString();

export const institutions: Institution[] = [
  {
    id: "inst-uct",
    name: "University of Cape Town",
    type: "university",
    country: "South Africa",
    description: "Leading BRICS research partner on coastal adaptation and social equity.",
    focus: "Climate resilience & oceans",
    logoUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=320",
    websiteUrl: "https://www.uct.ac.za",
  },
  {
    id: "inst-ipea",
    name: "Institute for Applied Economic Research",
    type: "research_institute",
    country: "Brazil",
    description: "Policy think tank supporting G20 + BRICS economic dialogues.",
    focus: "Inclusive growth & digital economy",
    logoUrl: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=320",
    websiteUrl: "https://www.ipea.gov.br",
  },
  {
    id: "inst-escwa",
    name: "UN ESCWA",
    type: "international_organization",
    country: "Regional",
    description: "Multilateral partner hosting cross-regional policy briefings.",
    focus: "Trade facilitation & SDGs",
    logoUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=320",
    websiteUrl: "https://www.unescwa.org",
  },
  {
    id: "inst-nitie",
    name: "National Institute of Industrial Engineering",
    type: "university",
    country: "India",
    description: "Hosts technical series on industrial policy across Asia-Pacific.",
    focus: "Supply chain & manufacturing transitions",
    logoUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=320",
    websiteUrl: "https://www.nitie.ac.in",
  },
  {
    id: "inst-gaf",
    name: "Global Academic Forum",
    type: "international_organization",
    country: "Global",
    description: "Platform coordination team curating the cross-regional program calendar.",
    focus: "Diplomacy & knowledge exchange",
    logoUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=320",
    websiteUrl: "https://globalacademicforum.org",
  },
];

export const mockUsers: Record<UserRole, User> = {
  participant: {
    id: "user-participant",
    name: "Meera Iyer",
    email: "meera.iyer@example.org",
    role: "participant",
    avatarUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&h=200&fit=crop",
    title: "PhD Candidate, Climate Policy",
    bio: "Researching coastal adaptation finance and South-South knowledge sharing.",
    institutionId: "inst-uct",
    institution: "University of Cape Town",
    subscriptionStatus: "active",
    createdAt: "2024-02-10T09:30:00.000Z",
  },
  host: {
    id: "user-host",
    name: "Dr. Rafael Dominguez",
    email: "rafael.dominguez@example.org",
    role: "host",
    avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
    title: "Senior Research Fellow",
    bio: "Diplomatic economist facilitating cross-border public policy programs for over a decade.",
    institutionId: "inst-ipea",
    institution: "Institute for Applied Economic Research",
    subscriptionStatus: "active",
    createdAt: "2023-11-10T12:00:00.000Z",
  },
  institution_admin: {
    id: "user-institution",
    name: "Yulia Petrova",
    email: "yulia.petrova@example.org",
    role: "institution_admin",
    avatarUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    title: "Director, Global Partnerships",
    institutionId: "inst-nitie",
    institution: "National Institute of Industrial Engineering",
    subscriptionStatus: "active",
    createdAt: "2023-08-21T08:30:00.000Z",
  },
  platform_admin: {
    id: "user-platform",
    name: "Noah Stein",
    email: "noah.stein@example.org",
    role: "platform_admin",
    avatarUrl: "https://images.unsplash.com/photo-1520975918311-565dca24660a?w=200&h=200&fit=crop",
    title: "Head of Platform Operations",
    institutionId: "inst-gaf",
    institution: "Global Academic Forum",
    subscriptionStatus: "active",
    createdAt: "2023-05-01T08:30:00.000Z",
  },
};

export const speakerProfiles: SpeakerProfile[] = [
  {
    id: "speaker-iyer",
    name: "Dr. Meera Iyer",
    title: "Senior Research Fellow, Coastal Finance",
    affiliation: "University of Cape Town",
    institutionId: "inst-uct",
    photoUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&h=200&fit=crop",
    bio: "Focuses on coastal adaptation, blue economy investment, and SDR-backed climate instruments.",
  },
  {
    id: "speaker-dominguez",
    name: "Dr. Rafael Dominguez",
    title: "Head of Digital Public Infrastructure",
    affiliation: "Institute for Applied Economic Research",
    institutionId: "inst-ipea",
    photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
    bio: "Architect of PIX policy pilots and advisor on DPI interoperability frameworks across LATAM.",
  },
  {
    id: "speaker-samir",
    name: "Samir El-Hassan",
    title: "Director, Regional Integration",
    affiliation: "UN ESCWA",
    institutionId: "inst-escwa",
    photoUrl: "https://images.unsplash.com/photo-1547212371-eb5e6a4b590c?w=200&h=200&fit=crop",
    bio: "Leads cross-border SDG indicator alignment and municipal data collaboratives in MENA.",
  },
  {
    id: "speaker-lin",
    name: "Prof. Aditi Lin",
    title: "Chair, Industrial Policy Lab",
    affiliation: "National Institute of Industrial Engineering",
    institutionId: "inst-nitie",
    photoUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    bio: "Advises on critical mineral traceability, labor standards, and manufacturing transitions in Asia.",
  },
  {
    id: "speaker-ramirez",
    name: "Prof. Camila Ramirez",
    title: "Vice Provost, Global Engagement",
    affiliation: "Global Academic Forum",
    institutionId: "inst-gaf",
    photoUrl: "https://images.unsplash.com/photo-1520975918311-565dca24660a?w=200&h=200&fit=crop",
    bio: "Coordinates higher education agreements, academic freedom compacts, and joint credential programs.",
  },
];

export const series: Series[] = [
  {
    id: "series-climate",
    title: "Climate Finance & Resilience",
    description: "Six-part series unpacking adaptation pipelines and blue economy financing across BRICS cities.",
    institutionId: "inst-uct",
    theme: "Climate governance",
    thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
  },
  {
    id: "series-digital",
    title: "Digital Public Infrastructure",
    description: "Explores data governance, DPI interoperability, and cross-border privacy standards.",
    institutionId: "inst-ipea",
    theme: "Digital cooperation",
    thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",
  },
  {
    id: "series-education",
    title: "Higher Education Futures",
    description: "Joint programming on mobility agreements, dual degrees, and quality assurance across regions.",
    institutionId: "inst-gaf",
    theme: "Education & talent",
    thumbnailUrl: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200",
  },
];

export const programSeries = series;

const findInstitutionId = (name: string) => institutions.find((institution) => institution.name === name)?.id ?? "inst-gaf";

const pickSpeakers = (...ids: string[]) => speakerProfiles.filter((profile) => ids.includes(profile.id));

const buildMaterials = (topic: string): EventMaterial[] => [
  {
    id: `${topic}-brief`,
    title: `${topic} policy note`,
    type: "note",
    url: "#",
    access: "open",
  },
  {
    id: `${topic}-deck`,
    title: `${topic} slide deck`,
    type: "deck",
    url: "#",
    access: "restricted",
  },
];

export const events: Event[] = [
  {
    id: "event-1",
    title: "Financing Coastal Adaptation in the Indian Ocean",
    slug: "financing-coastal-adaptation",
    shortDescription: "Policy and investment frameworks for resilient ports and fisheries across BRICS nations.",
    longDescription:
      "This diplomatic briefing convenes ministries, development banks, and municipal leaders to align funding pathways for coastal resilience projects in Durban, Chennai, and Santos.",
    category: "Climate Governance",
    topicTags: ["Blue economy", "Resilience", "SDG 13"],
    seriesId: "series-climate",
    hostUserId: mockUsers.host.id,
    institutionId: findInstitutionId("University of Cape Town"),
    scheduledAt: hoursFromNow(36),
    durationMinutes: 90,
    status: "upcoming",
    accessLevel: "registered_only",
    hasRecording: true,
    language: "English",
    thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    isFlagship: true,
    speakers: pickSpeakers("speaker-iyer", "speaker-dominguez"),
    materials: buildMaterials("coastal-adaptation"),
  },
  {
    id: "event-2",
    title: "Digital Public Infrastructure for Cross-border Payments",
    slug: "digital-public-infrastructure",
    shortDescription: "Case studies from Brazil and India on designing interoperable DPI stacks.",
    longDescription:
      "Product owners from PIX and UPI share reference architectures for instant payments, liability frameworks, and next-phase policy considerations for financial inclusion.",
    category: "Digital Cooperation",
    topicTags: ["DPI", "Interoperability", "Financial inclusion"],
    seriesId: "series-digital",
    hostUserId: mockUsers.host.id,
    institutionId: findInstitutionId("Institute for Applied Economic Research"),
    scheduledAt: hoursFromNow(-1),
    durationMinutes: 75,
    status: "live",
    accessLevel: "open",
    hasRecording: true,
    language: "English & Portuguese",
    thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",
    isFlagship: true,
    speakers: pickSpeakers("speaker-dominguez"),
    materials: buildMaterials("dpi"),
  },
  {
    id: "event-3",
    title: "Localizing SDG Indicators with City Networks",
    slug: "localizing-sdg-indicators",
    shortDescription: "How city coalitions and UN agencies are co-designing data partnerships.",
    longDescription:
      "City diplomacy teams, statisticians, and regional organizations walk through approaches for harmonizing sustainable development indicators.",
    category: "Urban Policy",
    topicTags: ["SDGs", "City diplomacy", "Data for development"],
    seriesId: null,
    hostUserId: mockUsers.host.id,
    institutionId: findInstitutionId("UN ESCWA"),
    scheduledAt: hoursFromNow(-120),
    durationMinutes: 60,
    status: "completed",
    accessLevel: "registered_only",
    hasRecording: true,
    language: "English & Arabic",
    thumbnailUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
    isFlagship: false,
    speakers: pickSpeakers("speaker-samir"),
    materials: buildMaterials("sdg"),
  },
  {
    id: "event-4",
    title: "Sustainable Supply Chains for Critical Minerals",
    slug: "sustainable-critical-minerals",
    shortDescription: "Institutional purchasing strategies balancing demand, labor, and environment.",
    longDescription:
      "Procurement leads and industrial ministries outline pragmatic steps for transparent sourcing and resilient logistics for critical minerals.",
    category: "Industrial Policy",
    topicTags: ["Critical minerals", "ESG", "Trade"],
    seriesId: null,
    hostUserId: mockUsers.host.id,
    institutionId: findInstitutionId("National Institute of Industrial Engineering"),
    scheduledAt: hoursFromNow(12),
    durationMinutes: 120,
    status: "upcoming",
    accessLevel: "institution_only",
    hasRecording: true,
    language: "English",
    thumbnailUrl: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200",
    isFlagship: false,
    speakers: pickSpeakers("speaker-lin"),
    materials: buildMaterials("critical-minerals"),
  },
  {
    id: "event-5",
    title: "Academic Freedom & Collaborative Degrees",
    slug: "academic-freedom-mobility",
    shortDescription: "Institutional agreements enabling shared curricula and dual credentials.",
    longDescription:
      "Higher education leaders share governance models for safeguarding academic freedom in cross-border programs.",
    category: "Higher Education",
    topicTags: ["Mobility", "Governance", "Quality assurance"],
    seriesId: "series-education",
    hostUserId: mockUsers.host.id,
    institutionId: findInstitutionId("Global Academic Forum"),
    scheduledAt: hoursFromNow(-240),
    durationMinutes: 80,
    status: "completed",
    accessLevel: "registered_only",
    hasRecording: true,
    language: "English",
    thumbnailUrl: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200",
    isFlagship: true,
    speakers: pickSpeakers("speaker-ramirez"),
    materials: buildMaterials("academic-freedom"),
  },
];

export const webinars = events;

export const recordings: Recording[] = events
  .filter((event) => event.hasRecording)
  .map((event, index) => ({
    id: `recording-${index + 1}`,
    eventId: event.id,
    webinarId: event.id,
    videoUrl: "https://videos.example.com/placeholder.mp4",
    durationMinutes: event.durationMinutes,
    availableFrom: hoursFromNow(-24),
    accessLevel: event.accessLevel,
  }));

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "plan-open",
    name: "Open Access",
    description: "Join open briefings and receive curated digests.",
    priceMonthly: 0,
    priceYearly: 0,
    features: ["Open live events", "Public recordings", "Weekly intelligence notes"],
    isInstitutionalPlan: false,
  },
  {
    id: "plan-network",
    name: "Research Network",
    description: "Full participant access for independent scholars and small teams.",
    priceMonthly: 39,
    priceYearly: 390,
    features: [
      "Everything in Open Access",
      "Complete recording archive",
      "Downloadable transcripts",
      "Priority registration",
    ],
    isInstitutionalPlan: false,
    isMostPopular: true,
  },
  {
    id: "plan-institution",
    name: "Institutional",
    description: "Expanded seats, analytics, and closed-door programming for member institutions.",
    priceMonthly: 129,
    priceYearly: 1290,
    features: [
      "Unlimited host seats",
      "Institution-only events",
      "Engagement analytics",
      "Dedicated success partner",
    ],
    isInstitutionalPlan: true,
  },
];

export const subscriptions: Subscription[] = [
  {
    id: "sub-1",
    userId: mockUsers.participant.id,
    institutionId: null,
    planId: "plan-network",
    status: "active",
    renewsAt: hoursFromNow(720),
  },
  {
    id: "sub-2",
    userId: null,
    institutionId: "inst-nitie",
    planId: "plan-institution",
    status: "active",
    renewsAt: hoursFromNow(1440),
  },
];

export const dashboardStats: DashboardStat[] = [
  { id: "stat-1", label: "Institutions onboarded", value: "68", change: "+6%", trend: "up" },
  { id: "stat-2", label: "Active events", value: "42", change: "+9%", trend: "up" },
  { id: "stat-3", label: "Recordings streamed", value: "18.2k", change: "+3%", trend: "up" },
  { id: "stat-4", label: "Hosts credentialed", value: "214", change: "-1%", trend: "down" },
];

export const liveChatMessages: LiveChatMessage[] = [
  {
    id: "chat-1",
    userName: "Dr. Sen",
    content: "Could you expand on debt-for-climate swaps in Mozambique?",
    timestamp: new Date(now.getTime() - 120000).toISOString(),
  },
  {
    id: "chat-2",
    userName: "Amira",
    content: "Sharing ESCWA's working paper link in the chat.",
    timestamp: new Date(now.getTime() - 90000).toISOString(),
  },
  {
    id: "chat-3",
    userName: "Mateus",
    content: "How are you sequencing DPI pilots before national rollout?",
    timestamp: new Date(now.getTime() - 60000).toISOString(),
  },
];

export const roleSummaries: RoleSummary[] = [
  {
    role: "participant",
    title: "Participant",
    description: "Join open or registered events, track certificates, and access eligible recordings.",
    permissions: ["Register for events", "Bookmark recordings", "Download briefs (with plan)"],
  },
  {
    role: "host",
    title: "Host",
    description: "Create events, coordinate speakers, and manage live facilitation toolkits.",
    permissions: ["Publish events", "Upload agendas", "Moderate Q&A and polls"],
  },
  {
    role: "institution_admin",
    title: "Institution Admin",
    description: "Manage institutional seats, approve hosts, and review analytics by thematic program.",
    permissions: ["Invite hosts", "Assign access policies", "View institution analytics"],
  },
  {
    role: "platform_admin",
    title: "Platform Admin",
    description: "Oversee the entire network, configure access tiers, and coordinate multilateral series.",
    permissions: ["Manage all users", "Approve institutions", "Launch featured series"],
  },
];

export const pageContent = {
  home: {
    heroKicker: "Academic + policy network",
    heroTitle: "Diplomatic seminars and institutional briefings across BRICS and multilateral partners.",
    heroSubtitle:
      "Track flagship seminars, request institutional access, and review thematic series curated with universities, think tanks, and multilateral organizations.",
    stats: [
      { label: "Institutions onboarded", value: `${institutions.length}+` },
      { label: "Series running", value: `${series.length}` },
      { label: "Scholars registered", value: "12k+" },
    ],
  },
  pricing: {
    heroKicker: "Access model",
    heroTitle: "Open briefings, individual research seats, institutional cohorts",
    heroSubtitle:
      "Demonstration plans showing how academics join live seminars, unlock recordings, and coordinate institutional programs.",
    faqs: [
      {
        question: "Can I join without payment?",
        answer: "Yes. Open Access includes live open seminars and weekly digests with no cost.",
      },
      {
        question: "How do institutions join?",
        answer: "Institution admins activate the institutional plan to unlock closed-door events and analytics.",
      },
      {
        question: "Do plans include recordings?",
        answer: "Research Network and Institutional plans include the full recording archive with transcripts.",
      },
    ],
  },
  recordings: {
    heroKicker: "Recording library",
    heroTitle: "Diplomatic archive",
    heroSubtitle: "Filter by topic, institution, or speaker to surface recent recordings with transcripts and briefs.",
    badges: [
      { label: "Curated briefs" },
      { label: "Transcript-ready" },
      { label: "Institutional access" },
    ],
  },
  host: {
    quickTips: [
      "Publish events at least 10 days before the session.",
      "Upload materials 48 hours in advance for registered participants.",
      "Mark recordings as available within 24 hours of completion.",
    ],
  },
  admin: {
    notices: [
      "Review pending institutions weekly to keep the directory fresh.",
      "Cross-check access levels for flagship sessions before promotion.",
      "Monitor subscription churn and reach out to expiring institutions.",
    ],
  },
};
