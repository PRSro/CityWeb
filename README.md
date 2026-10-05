# CityWeb 🏙️ — "Piața"

A high-performance living city web application for Bucharest built with **Vue 3**, **TypeScript**, **Vite**, and **Tailwind CSS v4**, deployed live on **[Vercel](https://vercel.com)**.

For full technical architecture and codebase component breakdown, view **[`documentation.md`](./documentation.md)**.

---

## 🏛️ Product Vision & Concept: "Piața"

> **Concept**: **"Piața"** — the city square where people meet, discover events, check live weather, find non-stop amenities, and navigate Bucharest. Inspired by the *Micul Paris* brand and active city life.

### Core Question
> **"What's happening in my Bucharest, and where do I fit in it?"**

---

## 🌟 Key Features

1. **🎟️ Events Feed & Interactive RSVPs**:
   - Browse events by category (*Muzică*, *Carieră*, *Comunitate*), date, and search terms.
   - Interactive attendance toggle ("Sunt interesat" / "Vreau să merg") with persistent `localStorage` synchronization and live participant counters.

2. **🗺️ Interactive SVG Bucharest Map**:
   - Dynamic SVG pinpoint placement using local landmark databases and OpenStreetMap geocoding.
   - Anti-collision spiral displacement to prevent overlapping markers.
   - Zoom (+/-), pan, mouse drag, and neighborhood filtering.

3. **🌦️ 7-Day Live Weather Forecast**:
   - Live weather predictions powered by **Open-Meteo API**.
   - Daily high/low temperatures, precipitation chance (%), humidity, wind speed, Air Quality Index (AQI), and smart outdoor event recommendations.

4. **🌙 Deschis Acum (Open Now 24/7)**:
   - Locates non-stop pharmacies, 24/7 supermarkets, and night venues near you using **OpenStreetMap Overpass API**.
   - Estimated walking/transit times, data freshness disclaimers, and direct Google Maps directions.

5. **⚽ Match-Day & Mega-Event Traffic Alerts**:
   - Combines stadium/concert event schedules with public transit closures (e.g. Arena Națională match night advisories for Metro M1/M3).

6. **📅 Interactive Monthly Calendar**:
   - Full monthly view with day selection, event density counters, and agenda listings.

7. **🌐 Bilingual Localization (RO / EN)** & **Dark/Light Theme Toggle**.

---

## 🛠️ Complete Tech Stack

- **Frontend Framework**: [Vue 3](https://vuejs.org/) (Composition API, `<script setup lang="ts">`)
- **Language**: TypeScript (`vue-tsc` strictly verified)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: Tailwind CSS v4 & custom design tokens (`src/styles/theme.css`)
- **APIs**: Open-Meteo Weather API, OpenStreetMap Nominatim & Overpass API
- **Deployment**: Vercel Platform with `vercel.json` SPA routing rewrites

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

---

*For detailed code breakdown and component architecture, refer to **[`documentation.md`](./documentation.md)**.*
