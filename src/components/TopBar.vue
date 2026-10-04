<script setup lang="ts">
import { useRoute } from 'vue-router'
import NavBar from './NavBar.vue'
import { useI18n } from '../i18n'

defineProps<{
  search: string
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
}>()

const { t } = useI18n()
const route = useRoute()
const calendarActive = () => route.path === '/calendar'
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-3 md:px-6">
      <div class="flex items-center gap-3 md:gap-4">
        <RouterLink
          to="/evenimente"
          class="flex shrink-0 flex-col leading-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <span class="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-xl font-bold text-transparent">
            {{ t('brand.name') }}
          </span>
          <span class="mt-1 hidden text-xs text-zinc-500 lg:block">
            {{ t('brand.tagline') }}
          </span>
        </RouterLink>

        <div class="relative min-w-0 flex-1">
          <svg
            class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 2a8 8 0 105.3 14l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
          </svg>
          <input
            :value="search"
            type="search"
            :placeholder="t('search.placeholder')"
            :aria-label="t('search.label')"
            class="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            @input="emit('update:search', ($event.target as HTMLInputElement).value)"
          >
        </div>

        <RouterLink
          to="/calendar"
          class="shrink-0 rounded-lg border p-2.5 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500"
          :class="calendarActive()
            ? 'border-indigo-500 bg-indigo-500/15 text-indigo-200'
            : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-zinc-100'"
          :aria-current="calendarActive() ? 'page' : undefined"
          :aria-label="t('calendar.toggle')"
          :title="t('calendar.toggle')"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7 2v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm12 8v10H5V10h14zM5 8V6h14v2H5z" />
          </svg>
        </RouterLink>
      </div>

      <NavBar />
    </div>
  </header>
</template>