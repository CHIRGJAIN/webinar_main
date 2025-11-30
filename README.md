## Global Academic Forum Frontend

Desktop-first Next.js experience for an international academic + policy webinar network. Uses TypeScript, App Router, Tailwind CSS v4, and Framer Motion with institutional branding and role-aware dashboards.

### Highlights
- **Landing + discovery** – Institutional hero, stats, program series rail, partner institutions, role summaries, and CTA banner tied to the academic brief.
- **Webinar catalogue** – Filter by category/level/status/access, explore curated rails, and open detailed seminar pages with agenda, logistics, and related sessions.
- **Auth + roles** – Mock login/registration flows, demo logins, and hooks that persist participant, host, institution admin, or platform admin sessions.
- **Workspaces** – Participant profile, recording library, live room chat, host console (overview, list, creation form), and admin console (overview, users, webinars, speakers, subscriptions).
- **Data layer** – Updated `mockData` for institutions, program series, subscription plans, webinars, and role summaries used throughout the UI.

### Getting Started
```bash
npm install
npm run dev
# visit http://localhost:3000
```

Quality checks:
- `npm run lint`
- `npm run build && npm run start`

### Demo Workspaces
Use the login page buttons to impersonate each role:
- **Participant** → `/webinars`, `/profile`, and recording playback when subscribed.
- **Host** → `/speaker` dashboard with stats, webinar table, and creation form.
- **Institution Admin** → `/admin` with access to management tables and analytics.
- **Platform Admin** → `/admin` full platform controls.

### Key Directories
- `src/app` – Routes for landing, webinars (+ detail + live), institutions, series, auth, pricing, library, profile, speaker, and admin areas.
- `src/components` – Layout shell, UI primitives, dashboard widgets, webinar cards, and providers.
- `src/hooks` – Auth, subscription, and role helpers using localStorage persistence.
- `src/lib` – Types, mock data, auth utilities, subscription helpers, and webinar selectors.

### Notes
- All auth, payments, chat, and streaming behavior is mocked for UX demonstration.
- Tailwind CSS v4 with custom CSS variables drives the institutional light theme with dark fallback.
- Framer Motion powers hero reveals, carousel motion, and live chat message transitions.
