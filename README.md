# CityWeb 🏙️ — "Piața" (Deployed on Vercel)

A high-performance hybrid web application built with **Vue 3**, **Vite**, **React 19**, and **Tailwind CSS v4**, deployed live on **[Vercel](https://vercel.com)**. This project seamlessly bridges Vue and React ecosystems using **Veaury**, allowing native React UI libraries like **Watermelon UI** and **Radix UI** components to run inside a Vue 3 reactive environment.

---

## 🏛️ Product Vision & Concept: "Piața"

> **Working Concept**: **"Piața"** — the city square where people once met, traded, argued, and found work. Inspired by the *Micul Paris* brand (Paris had its cafés, Bucharest had its *piețe*). Alternate names to test: *Cafeneaua*, *Cartier*, *Pe Bulevard*.

### Core Question
> **"What's happening in my Bucharest, and where do I fit in it?"**

### The 3-Pillar Data Model: `Where`, `When`, `Who`
Nothing exists as a standalone listing. Every node in the application is cross-linked across the city graph:
- **Traffic Closure**: Links to affected events, broken commute routes, and a local civic poll (*e.g., "Should Calea Victoriei be pedestrian on Sundays?"*).
- **Event**: Displays who is attending from your neighborhood, job openings from companies present in the room, and a live event poll.
- **Job Opening**: Shows real transit time from your home via metro, people you've met who work there, and verified salary polls for that role.
- **Poll**: Rooted in a specific place & community (*e.g., "Sector 3 Residents"*); results directly feed featured events & city topics.
- **Person / Profile**: A historical log of where they showed up and participated, not a static CV.

---

## ⚡ Daily User Flow & Micro-Moments

### 1-Minute Onboarding (Setup Once)
Four quick taps with zero long profile forms:
1. Select your **Neighborhood / Sector**.
2. Set your **Commute Route** (metro lines/routes for automated disruption matching).
3. Pick **3–5 Interests**.
4. Choose **Your Purpose** (*New in the city*, *Looking for work*, *Hiring*, *Meeting people*, or *Curious*).

### A Day in the Product
| Moment | What They Get | Time Needed |
| :--- | :--- | :--- |
| **Morning** | **Dimineața**: Push/Messaging digest with commute disruptions, weather, 1 local event tonight, & 1 poll question. | 30s |
| **Midday** | Quick vote on a city poll with instant Neighborhood vs. City-wide breakdown. | 10s |
| **Late Afternoon** | *"Tonight Near You"*: 2–3 events with transit times & neighborhood attendees. One-tap RSVP. | 1 min |
| **Evening** | QR Code event check-in: see the room, toggle *"open to chat"*, join live Q&A. | At event |
| **Next Day** | *"You were at X"*: 3 suggested reconnects with one-tap intros & relevant local jobs. | 2 min |
| **Weekly** | **Săptămâna ta în București**: Activity summary, city vote outcomes, upcoming events. | 3 min |

---

## 🔑 Key Features & Navigation Structure

### Uniquely Bucharest Features
- 🏡 **Neighborhood Identity**: Local tags, neighborhood-vs-neighborhood poll stats (e.g., *Floreasca vs. Drumul Taberei*).
- 📻 **"Acum în București" Feed**: Live, personalized feed matching commute closures, nearby concerts, sector polls, and nearby job listings.
- 🛂 **City Passport**: Collect stamps for venues and neighborhoods visited via verified event check-ins.
- 🚀 **Newcomer Path**: 30-day guided checklist for people new to Bucharest (first events, transport guide, local networking).
- 🗣️ **Local & Authentic Voice**: Romanian-first with natural local tone + English layer for expats & students.
- 🤝 **Warm Introductions**: Connections stem from shared physical events rather than cold DMs.

### 5-Tab Core Navigation
1. 📻 **Acum** — Live, personalized city feed.
2. 🗺️ **Harta** — Filterable interactive city map.
3. 👥 **Oameni** — Nearby people, communities, and neighborhood hubs.
4. 📅 **Calendar** — Event schedule and attendance tracker.
5. 👤 **Eu** — City Passport, visit history, and saved items.
6. ➕ **Central Plus Button** — One-tap modal to post an Event, Job Opening, or City Poll.

---

## 🌐 Live Production Deployment

- **Live Site**: [https://city-web-navy.vercel.app](https://city-web-navy.vercel.app)
- **Deployment Platform**: Vercel (Edge Network)
- **Routing Configuration**: `vercel.json` SPA rewrite engine

---

## 🛠️ Complete Tech Stack & Library Breakdown

### Deployment & Core Frameworks
- **[Vercel Platform](https://vercel.com/)** — Production hosting & SPA rewrite engine.
- **[Vue 3](https://vuejs.org/)** (`^3.5.42`) — Reactive UI layout and navigation engine.
- **[React 19 & React DOM](https://react.dev/)** (`^19.3.0`) — React engine powering Watermelon UI components.
- **[Veaury](https://github.com/kalacloud-inc/veaury)** (`^2.6.3`) — Dual-framework bridge using `applyReactInVue`.

### Styling, Fonts & Themes
- **Typography**: Custom `@font-face` definitions for **Charlie Display** (Headings) and **Charlie Text** (Body text).
- **Tailwind CSS v4**: Utility-first CSS engine configured via `@tailwindcss/vite` and `src/styles/theme.css`.
- **Theme Variables**: Custom tokens for Atlassian Blue (`#1868db`), Midnight Navy (`#101214`), Taxicab Yellow (`#fca700`), Lavender Wash (`#eed7fc`), Confetti Gradient (`#bf63f3`), etc.
- **Design Systems**: **Shadcn UI** (`base-nova`), **Radix Vue**, `cva`, `clsx`, `tailwind-merge`.

### Motion & Offline Storage
- **Animations**: `framer-motion`, `motion`, `tw-animate-css`, `react-use-measure`.
- **Icons**: `lucide-vue-next`, `lucide-react`, `react-icons`.
- **Database**: `@nozbe/watermelondb` for local-first offline syncing.

---

## 🚀 Getting Started & Deployment

### Run Locally
```bash
npm install
npm run dev
```

### Deploy to Vercel Production
```bash
vercel --prod
```
