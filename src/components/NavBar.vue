<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n, type Locale } from '../i18n'

const { t, locale, setLocale } = useI18n()
const route = useRoute()

const links = [
  { to: '/evenimente', key: 'nav.events' },
  { to: '/calendar', key: 'nav.calendar' },
]

const locales: Locale[] = ['ro', 'en']

const isActive = (to: string) => route.path === to
</script>

<template>
  <nav
    :aria-label="t('nav.label')"
    class="flex items-center gap-1 overflow-x-auto"
  >
    <RouterLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      :aria-current="isActive(link.to) ? 'page' : undefined"
      class="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500"
      :class="isActive(link.to)
        ? 'bg-indigo-500/15 text-indigo-100'
        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'"
    >
      {{ t(link.key) }}
    </RouterLink>

    <span class="ml-auto flex shrink-0 items-center gap-1 pl-2">
      <button
        v-for="option in locales"
        :key="option"
        type="button"
        class="rounded px-2 py-1 text-xs font-semibold uppercase transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500"
        :class="locale === option
          ? 'bg-zinc-800 text-zinc-100'
          : 'text-zinc-500 hover:text-zinc-200'"
        :aria-pressed="locale === option"
        :aria-label="t('nav.locale')"
        @click="setLocale(option)"
      >
        {{ option }}
      </button>
    </span>
  </nav>
</template>