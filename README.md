# CityWeb 🏙️ — Watermelon UI & Shadcn Integration (Deployed on Vercel)

A high-performance hybrid web application built with **Vue 3**, **Vite**, **React 19**, and **Tailwind CSS v4**, deployed live on **[Vercel](https://vercel.com)**. This project seamlessly bridges Vue and React ecosystems using **Veaury**, allowing native React UI libraries like **Watermelon UI** and **Radix UI** components to run inside a Vue 3 reactive environment.

---

## 🌐 Live Production Deployment

- **Live Site**: [https://city-web-navy.vercel.app](https://city-web-navy.vercel.app)
- **Deployment Platform**: Vercel (Edge Network)
- **Routing Configuration**: `vercel.json` SPA rewrite engine

---

## 🌟 Key Features

- 🌐 **Vercel Deployed**: Fully automated CI/CD deployment with `vercel.json` SPA routing support.
- 🔄 **Dual Framework Interoperability (`Veaury`)**: Render React 19 components natively inside Vue 3 templates with full prop reactivity and event handling.
- 🍉 **Watermelon UI Library**: Modern React UI components built with Tailwind CSS and Framer Motion.
- 🎨 **Shadcn UI & Radix Vue**: Premium, accessible design system components (`shadcn` v4, `radix-vue`).
- ⚡ **Tailwind CSS v4 & Custom Tokens**: Powered by `@tailwindcss/vite` v4 with custom variable themes (`theme.css`) and `tw-animate-css`.
- 🗄️ **WatermelonDB Integration**: Prepared for local-first, highly responsive offline database operations via `@nozbe/watermelondb`.
- 📊 **Dynamic Layout & Animations**: Smooth hardware-accelerated animations using `motion` and `framer-motion`.

---

## 🛠️ Complete Library Breakdown

### Core Architecture & Deployment
- **[Vercel Platform](https://vercel.com/)** — Hosting platform powering the production deployment and SPA rewrite rules.
- **[Vue 3](https://vuejs.org/)** (`^3.5.42`) — Main application reactive core and component layout framework.
- **[React 19 & React DOM](https://react.dev/)** (`^19.3.0`) — React library powering Watermelon UI components.
- **[Veaury](https://github.com/kalacloud-inc/veaury)** (`^2.6.3`) — Dual-framework integration engine using `applyReactInVue` to embed React inside Vue.

### Build Tooling & Vite Plugins
- **[Vite](https://vitejs.dev/)** (`^8.3.0`) — Lightning-fast build tool with Hot Module Replacement (HMR).
- **[@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue)** (`^6.0.8`) — Vue 3 SFC compilation plugin.
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)** (`^6.1.1`) — Fast Refresh and JSX transformation for React.
- **[@vitejs/plugin-vue-jsx](https://github.com/vitejs/vite-plugin-vue-jsx)** (`^5.1.6`) — Vue 3 JSX support.
- **[@tailwindcss/vite](https://tailwindcss.com/docs/vite)** (`^4.3.3`) — First-party Vite plugin for Tailwind CSS v4.

### Design Systems & UI Components
- **[Shadcn UI](https://ui.shadcn.com/)** (`^4.21.1`) — Design tokens and component registry (`base-nova` style).
- **[Radix Vue](https://www.radix-vue.com/)** (`^1.9.17`) — Unstyled, accessible UI primitives for Vue.
- **[Class Variance Authority (`cva`)](https://cva.style/docs)** (`^0.7.1`) — Type-safe variant management for UI buttons, badges, and cards.
- **[clsx](https://github.com/lukeed/clsx)** (`^2.1.1`) & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** (`^3.7.0`) — Dynamic class string construction and collision resolution.

### Animation & Motion Engines
- **[Framer Motion](https://www.framer.com/motion/)** (`^14.0.0`) & **[Motion](https://motion.dev/)** (`^14.0.0`) — Production-grade animations for React & Vue layout transitions.
- **[tw-animate-css](https://github.com/jamiebuilds/tw-animate-css)** (`^1.4.0`) — Utility-first animation classes integrated with Tailwind.
- **[react-use-measure](https://github.com/pmndrs/react-use-measure)** (`^2.1.7`) — Reactive DOM element measurement hook for layout animations.

### Icons & Offline Data
- **[Lucide Vue Next](https://lucide.dev/)** (`^1.0.0`) & **[Lucide React](https://lucide.dev/)** (`^1.52.0`) — Unified icon sets across both Vue and React views.
- **[React Icons](https://react-icons.github.io/react-icons/)** (`^5.7.0`) — Extended icon suites (Fa, Md, Io, etc.).
- **[@nozbe/watermelondb](https://watermelondb.dev/)** (`^0.28.0`) — Reactive database framework built for scale and offline sync.

---

## 📁 Project Structure

```text
CityWeb/
├── src/
│   ├── components/            # Vue components and React component wrappers
│   │   ├── ui/                # Watermelon UI & React components
│   │   ├── watermelon-ui.ts    # React-in-Vue export definitions using applyReactInVue
│   │   └── card-split-accordian.tsx # Custom Watermelon UI component
│   ├── styles/
│   │   ├── globals.css        # Primary Tailwind v4 import & custom theme setup
│   │   └── theme.css          # Design token definitions (@theme)
│   ├── App.vue                # Main application shell
│   └── main.js                # App entry point initializing Vue & Veaury
├── vercel.json                # Vercel SPA deployment configuration
├── components.json            # Shadcn UI configuration
├── vite.config.js             # Vite config supporting Vue + React plugins
└── package.json               # Full dependency registry & import aliases
```

---

## 🚀 Getting Started

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Development Server
Launch the development server with HMR:
```bash
npm run dev
```

### 3. Production Build
Bundle and optimize for production:
```bash
npm run build
```

---

## 📐 Vercel Deployment Commands

This project is deployed to **Vercel**. To update the live site:

```bash
# Deploy to Production
vercel --prod
```

- **Live URL**: [https://city-web-navy.vercel.app](https://city-web-navy.vercel.app)

---

## 💡 How Veaury Integration Works

To load a React component (e.g. from Watermelon UI) inside Vue 3:

1. Create or place the React component under `src/components/ui/MyComponent.tsx`.
2. Wrap it with `applyReactInVue` in `src/components/watermelon-ui.ts`:
   ```ts
   import { applyReactInVue } from 'veaury';
   import MyReactComponent from './ui/MyComponent';

   export const MyVueComponent = applyReactInVue(MyReactComponent);
   ```
3. Import and use `<MyVueComponent />` directly in Vue templates (`App.vue`).

---

## 🎨 Path Aliases & Imports

Subpath aliases defined in `package.json`:
- `#components/*` ➔ `./src/components/*.tsx`
- `#lib/*` ➔ `./src/lib/*.ts`
- `#hooks/*` ➔ `./src/hooks/*.ts`
