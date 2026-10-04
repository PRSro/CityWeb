# OpenCode Setup & AI Agent Master System Prompt

`opencode.jsonc` and `AGENTS.md` are untracked in git for this repo. This document serves as the live config specification, project architecture guide, and **Master System Prompt** for AI coding agents building **CityWeb**.

---

## 1. AI Master Directive & Architecture Guide

When building, modifying, or creating components in **CityWeb**, AI agents MUST adhere strictly to the following architectural patterns and implementation standards:

### 1.1 Dual-Framework Component Pattern (Vue 3 + React 19 via Veaury)
- **Primary View Engine**: Vue 3 using `<script setup>` Single File Components (SFCs).
- **React Component Integration**: React components (from **Watermelon UI**, **Shadcn UI**, or custom TSX) MUST be placed inside `src/components/ui/*.tsx`.
- **Bridge Export Standard**: React components MUST NOT be imported directly into `.vue` files. They MUST be wrapped using `applyReactInVue` inside `src/components/watermelon-ui.ts` (or dedicated wrapper modules):

```tsx
// src/components/watermelon-ui.ts
import { applyReactInVue } from 'veaury';
import CardSplitAccordionReact from './ui/card-split-accordian';
import ButtonReact from './ui/button';

// Export Vue-compatible components
export const CardSplitAccordion = applyReactInVue(CardSplitAccordionReact);
export const Button = applyReactInVue(ButtonReact);
```

```vue
<!-- src/App.vue -->
<template>
  <CardSplitAccordion :items="accordionItems" />
</template>

<script setup>
import { CardSplitAccordion } from '#components/watermelon-ui';
</script>
```

### 1.2 Design System & Custom Theme Tokens (`@theme`)
- **Tailwind v4 Engine**: Configured via `@tailwindcss/vite`.
- **Primary Stylesheet**: `src/styles/globals.css` which imports `./theme.css`.
- **Custom Theme Variables**: All custom tokens defined in `@theme` in `src/styles/theme.css` MUST be utilized for styling:
  - **Colors**:
    - Primary Blue: `var(--color-atlassian-blue)` / `bg-atlassian-blue` (`#1868db`)
    - Midnight Navy: `var(--color-midnight-navy)` / `bg-midnight-navy` (`#101214`)
    - Carbon Edge: `var(--color-carbon-edge)` / `bg-carbon-edge` (`#292a2e`)
    - Slate Current: `var(--color-slate-current)` / `bg-slate-current` (`#1c2b42`)
    - Taxicab Yellow: `var(--color-taxicab-yellow)` / `bg-taxicab-yellow` (`#fca700`)
    - Lavender Wash: `var(--color-lavender-wash)` / `bg-lavender-wash` (`#eed7fc`)
    - Confetti Gradient: `var(--color-confetti-gradient)` (`#bf63f3`)
  - **Typography**:
    - Display Font: `var(--font-charlie-display)` (`'Charlie Display'`)
    - Text Font: `var(--font-charlie-text)` (`'Charlie Text'`)
  - **Scale & Spacing**:
    - Radius: `--radius-sm` (2px), `--radius-md` (5px), `--radius-xl` (15px), `--radius-2xl` (20px), `--radius-3xl` (24px), `--radius-full` (10000px)
    - Spacing: `--spacing-4` through `--spacing-200`
- **Class Composition**: Use `cva` (Class Variance Authority), `clsx`, and `tailwind-merge` (`cn` helper in `src/lib/utils.ts`) for conditional styling.

### 1.3 Animations & Icons
- **React Components**: Use `framer-motion` (`motion`), `tw-animate-css`, and `react-use-measure`.
- **Icons**: Use `lucide-vue-next` for Vue templates and `lucide-react` / `react-icons` for React components.

---

## 2. Config File (`opencode.jsonc`)

Save the block below as `opencode.jsonc` in your project root.

```jsonc
{
  "$schema": "https://opencode.ai/config.json",

  "autoupdate": "notify",
  "share": "disabled",

  // ---------- Plugins ----------
  "plugin": [
    "@tarquinen/opencode-dcp",
    "opencode-mem",
    "cc-safety-net",
    "opencode-snip@1.6.1",
    "opencode-caveman",
    "oh-my-opencode-slim",
    "opencode-usage-plugin@0.0.1",
  ],

  // ---------- Instructions ----------
  "instructions": ["AGENTS.md", ".opencode/rules/*.md"],

  // ---------- Context Control ----------
  "compaction": {
    "auto": true,
    "prune": true,
  },

  "watcher": {
    "ignore": [
      "node_modules/**",
      "dist/**",
      "build/**",
      ".next/**",
      ".git/**",
      "coverage/**",
      "*.lock",
      "*.min.js",
      "*.map",
    ],
  },

  // ---------- MCP Servers ----------
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "enabled": true,
    },
  },

  // ---------- Permissions ----------
  "permission": {
    "edit": "ask",
    "webfetch": "ask",
    "bash": {
      "*": "ask",
      "git status*": "allow",
      "git diff*": "allow",
      "git log*": "allow",
      "ls*": "allow",
      "cat *": "allow",
      "grep *": "allow",
      "rg *": "allow",
      "npm test*": "allow",
      "npm run lint*": "allow",
      "git push*": "deny",
      "rm -rf*": "deny",
    },
  },

  // ---------- Formatters ----------
  "formatter": {
    "prettier": {
      "command": ["npx", "prettier", "--write", "$FILE"],
      "extensions": [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".md"],
    },
  },
}
```

---

## 3. Master `AGENTS.md` File

Save the block below as `AGENTS.md` in the project root. This file is loaded automatically into every AI conversation session.

```md
# AI Agent Execution Rules & Project Directives

## 1. Workflow Protocols
- **Planning Phase**: Do not edit files during planning. Produce a numbered step-by-step plan listing target files, dependencies, potential risks, and explicit OUT OF SCOPE items. Limit plan to < 400 words.
- **Execution Phase**: Implement only the approved plan using minimal code diffs. Never refactor surrounding untouched code.
- **Search & Inspection**: Locate exact line numbers before editing. Never dump full files into chat.

## 2. Core Stack Specifications
- **App Shell**: Vue 3 `<script setup>` + Vite 8
- **React Bridge**: Veaury (`applyReactInVue`)
- **React UI Libraries**: Watermelon UI, Shadcn UI (`base-nova`), Radix Vue
- **Styling**: Tailwind CSS v4 + `tw-animate-css`
- **Animations**: `framer-motion`, `motion`, `react-use-measure`
- **Subpath Aliases**: `#components/*` (`./src/components/*.tsx`), `#lib/*` (`./src/lib/*.ts`), `#hooks/*` (`./src/hooks/*.ts`)

## 3. Strict Code Implementation Rules

### RULE 1: React Components in Vue
NEVER import `.tsx` or React components directly into `.vue` template files.
ALWAYS wrap them with `applyReactInVue` inside `src/components/watermelon-ui.ts` and import the wrapped component into Vue.

### RULE 2: Design Token Usage
ALWAYS use custom theme variables defined in `src/styles/theme.css`:
- Colors: `atlassian-blue`, `midnight-navy`, `carbon-edge`, `slate-current`, `taxicab-yellow`, `lavender-wash`, `confetti-gradient`
- Fonts: `font-charlie-display`, `font-charlie-text`
- Utilities: Apply classes via `cn(...)` utility helper (`src/lib/utils.ts`).

### RULE 3: Verification
After generating or modifying code, verify the build with `npm run build` or `npm run dev`.
```

---

## 4. First-run Steps

1. Run `opencode` in your project root.
2. Run `/connect` and authenticate your AI provider.
3. Run `/models` and select your target model.
4. Use `Tab` to switch between `plan` mode (read-only) and `build` mode.

---

## 5. Plugin Diagnostics & Compatibility Notes

| Plugin                        | Resolved Version | Operational Status & Notes |
| ----------------------------- | ---------------- | -------------------------- |
| `@tarquinen/opencode-dcp`     | `3.2.0`          | Verified operational       |
| `opencode-mem`                | `2.28.3`         | Manages conversation memory hooks |
| `cc-safety-net`               | `2.5.2`          | Command safety layer       |
| `opencode-snip@1.6.1`         | `1.6.1`          | Code snippet extraction    |
| `opencode-caveman`            | `0.1.4`          | Summarization assistant    |
| `oh-my-opencode-slim`         | `3.0.2`          | Minimal extension suite    |
| `opencode-usage-plugin@0.0.1` | `0.0.1`          | Usage monitoring           |
