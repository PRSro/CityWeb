# CityWeb - Watermelon UI & Shadcn Integration

A modern web application built with Vue 3 and Vite, seamlessly integrating React-based UI components from the **Watermelon UI** library.

## Features

- **Dual Framework Compatibility**: Run React components natively inside a Vue 3 application using **Veaury**
- **Watermelon UI**: Modern, premium UI components built with React and Tailwind CSS
- **Shadcn UI**: Design system components for a polished user experience
- **Dark Mode**: Beautiful dark theme with glassmorphism effects
- **Component Testing**: Dedicated UI for testing and comparing different UI components

## Tech Stack

- **Framework**: Vue 3
- **Build Tool**: Vite
- **UI Library**: Watermelon UI (React)
- **Design System**: Shadcn UI
- **Styling**: Tailwind CSS
- **Interoperability**: Veaury (React in Vue)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd CityWeb

# Install dependencies
npm install
```

## Running the Application

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/            # Vue components and React component wrappers
│   ├── ui/                # React components from Watermelon UI
│   ├──watermelon-ui.ts   # Entry point for importing React components
│   └── card-split-accordian.tsx # Another React component
├── App.vue                # Main application component
└── main.js                # Application entry point
```

## Important Notes

### Running React Components in Vue

We use **Veaury** to bridge the gap between React and Vue.

- React components are located in `src/components/ui/`
- We wrap them in Vue components using `applyReactInVue`
- See `src/components/watermelon-ui.ts` for component exports
- See `src/App.vue` for component usage

### Development Setup

```bash
# Install veaury
npm install veaury

# Start development server
npm run dev
```

## Contributing

Contributions are welcome! This project is set up to easily integrate:

1. Add your React components to `src/components/ui/`
2. Create a wrapper in `src/components/watermelon-ui.ts`
3. Use the component in `src/App.vue` for testing

## License

MIT
