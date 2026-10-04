<script setup lang="ts">
import { ref, computed } from 'vue'
import { events, neighborhoods } from '../data/demo.ts'
import { useI18n } from '../i18n/index'

const props = defineProps<{
  search: string
  selectedDate: string | null
}>()

const { t, intlLocale } = useI18n()

const sortBy = ref('date')
const category = ref('')
const selected = ref<(typeof events)[number] | null>(null)

const CATEGORIES = [
  { value: 'muzica', key: 'events.category.muzica' },
  { value: 'cariera', key: 'events.category.cariera' },
  { value: 'comunitate', key: 'events.category.comunitate' },
]

const categoryOf = (tags: string[] = []) => {
  const joined = tags.join(' ').toLowerCase()
  if (joined.includes('muzic') || joined.includes('concert')) return 'muzica'
  if (joined.includes('job') || joined.includes('carier') || joined.includes('recrutare')) return 'cariera'
  if (joined.includes('meetup') || joined.includes('sustainab') || joined.includes('comunit')) return 'comunitate'
  return ''
}

const neighborhoodName = (id: string) =>
  neighborhoods.find((n) => n.id === id)?.localizedName ?? id

const categoryLabel = (tags: string[] = []) => {
  const value = categoryOf(tags)
  return value ? t(`events.category.${value}`) : ''
}

const displayedEvents = computed(() => {
  let result = [...events]

  if (props.selectedDate) {
    result = result.filter((e) => {
      const d = new Date(e.when)
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      return iso === props.selectedDate
    })
  }

  if (category.value) {
    result = result.filter((e) => categoryOf(e.tags) === category.value)
  }

  const q = props.search.trim().toLowerCase()
  if (q) {
    const terms = q.split(/\s+/)
    result = result.filter((e) => {
      const haystack = [
        e.title,
        e.description,
        e.localizedTitle,
        e.localizedDescription,
        neighborhoodName(e.neighborhood),
        ...(e.tags ?? []),
        ...(e.organizers ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return terms.every((t) => haystack.includes(t))
    })
  }

  if (sortBy.value === 'name') {
    result.sort((a, b) => a.title.localeCompare(b.title, 'ro'))
  } else if (sortBy.value === 'date') {
    result.sort((a, b) => new Date(a.when).getTime() - new Date(b.when).getTime())
  }

  return result
})

const activeDateLabel = computed(() => {
  if (!props.selectedDate) return null
  const d = new Date(`${props.selectedDate}T00:00:00`)
  return d.toLocaleDateString(intlLocale.value, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
})

const formatWhen = (iso: string) =>
  new Date(iso).toLocaleString(intlLocale.value, {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })

const hasLinks = (e: (typeof events)[number]) =>
  e.connectedPolls.length + e.connectedJobs.length + e.connectedTraffic.length

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') selected.value = null
}
</script>

<template>
  <div
    class="space-y-5"
    tabindex="-1"
    @keydown="onKeydown"
  >
    <div class="flex flex-wrap items-center gap-3">
      <h1 class="text-2xl font-bold text-zinc-50">
        {{ t('events.title') }}
      </h1>

      <span
        v-if="activeDateLabel"
        class="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-medium capitalize text-indigo-300"
      >
        {{ activeDateLabel }}
      </span>

      <div class="ml-auto flex flex-wrap items-center gap-2">
        <label
          class="sr-only"
          for="sort"
        >{{ t('events.sort.label') }}</label>
        <select
          id="sort"
          v-model="sortBy"
          class="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500 focus:outline-none"
        >
          <option value="date">
            {{ t('events.sort.date') }}
          </option>
          <option value="name">
            {{ t('events.sort.name') }}
          </option>
        </select>

        <label
          class="sr-only"
          for="category"
        >{{ t('events.category.label') }}</label>
        <select
          id="category"
          v-model="category"
          class="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 focus:border-indigo-500 focus:outline-none"
        >
          <option value="">
            {{ t('events.category.all') }}
          </option>
          <option
            v-for="c in CATEGORIES"
            :key="c.value"
            :value="c.value"
          >
            {{ t(c.key) }}
          </option>
        </select>
      </div>
    </div>

    <p class="text-sm text-zinc-500">
      <template v-if="displayedEvents.length">
        {{
          displayedEvents.length === 1
            ? t('events.countOne', { n: displayedEvents.length })
            : t('events.count', { n: displayedEvents.length })
        }}
      </template>
      <template v-else>
        {{ t('events.empty') }}
      </template>
    </p>

    <div
      v-if="displayedEvents.length"
      class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <button
        v-for="event in displayedEvents"
        :key="event.id"
        type="button"
        class="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 text-left transition-all hover:-translate-y-0.5 hover:border-indigo-500/60 hover:shadow-xl hover:shadow-indigo-500/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        @click="selected = event"
      >
        <div class="relative h-40 overflow-hidden bg-zinc-800">
          <img
            :src="event.image || 'https://placehold.co/800x500?text=Eveniment'"
            :alt="event.title"
            loading="lazy"
            width="800"
            height="500"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          >
          <span
            v-if="categoryOf(event.tags)"
            class="absolute left-3 top-3 rounded-full bg-zinc-950/80 px-2.5 py-1 text-[11px] font-medium text-zinc-200 backdrop-blur"
          >
            {{ categoryLabel(event.tags) }}
          </span>
        </div>

        <div class="flex flex-1 flex-col gap-2 p-4">
          <h2 class="line-clamp-2 text-base font-semibold text-zinc-50">
            {{ event.title }}
          </h2>
          <p class="text-xs text-zinc-500">
            {{ formatWhen(event.when) }}
          </p>
          <p class="text-sm text-zinc-400">
            📍 {{ neighborhoodName(event.neighborhood) }}
          </p>

          <div class="mt-auto flex flex-wrap items-center gap-3 pt-3 text-xs text-zinc-500">
            <span>👥 {{ event.rsvpCount }} {{ t('events.rsvp') }}</span>
            <span
              v-if="event.qrCheckIn"
              class="text-emerald-400"
            >✓ {{ t('events.checkin') }}</span>
            <span
              v-if="hasLinks(event)"
              class="text-indigo-400"
            >
              {{ t('events.connections', { n: hasLinks(event) }) }}
            </span>
          </div>
        </div>
      </button>
    </div>

    <div
      v-else
      class="rounded-2xl border border-dashed border-zinc-800 py-16 text-center"
    >
      <p class="text-zinc-400">
        {{ t('events.emptyTitle') }}
      </p>
      <p class="mt-1 text-sm text-zinc-600">
        {{ t('events.emptyHint') }}
      </p>
    </div>

    <Teleport to="body">
      <div
        v-if="selected"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        @click.self="selected = null"
      >
        <div
          class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl"
          role="dialog"
          aria-modal="true"
          :aria-label="selected.title"
        >
          <div class="relative">
            <img
              :src="selected.image || 'https://placehold.co/800x500?text=Eveniment'"
              :alt="selected.title"
              width="800"
              height="400"
              class="h-48 w-full rounded-t-2xl object-cover"
            >
            <button
              type="button"
              class="absolute right-3 top-3 rounded-full bg-zinc-950/80 p-2 text-zinc-300 backdrop-blur transition-colors hover:text-white"
              :aria-label="t('action.close')"
              @click="selected = null"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              ><path d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7l1.4-1.4 6.3 6.3 6.3-6.3z" /></svg>
            </button>
          </div>

          <div class="space-y-4 p-5">
            <div>
              <h2 class="text-xl font-bold text-zinc-50">
                {{ selected.title }}
              </h2>
              <p class="mt-1 text-sm text-zinc-500">
                {{ selected.localizedTitle }}
              </p>
            </div>

            <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt class="text-zinc-500">
                {{ t('event.when') }}
              </dt>
              <dd class="capitalize text-zinc-200">
                {{ formatWhen(selected.when) }}
              </dd>

              <dt class="text-zinc-500">
                {{ t('event.where') }}
              </dt>
              <dd class="text-zinc-200">
                {{ neighborhoodName(selected.neighborhood) }}
              </dd>

              <dt class="text-zinc-500">
                {{ t('event.organizers') }}
              </dt>
              <dd class="text-zinc-200">
                {{ selected.organizers.join(', ') }}
              </dd>

              <dt class="text-zinc-500">
                {{ t('event.interest') }}
              </dt>
              <dd class="text-right text-zinc-200">
                {{ t('event.people', { n: selected.rsvpCount }) }}
              </dd>
            </dl>

            <p
              v-if="selected.description"
              class="text-sm leading-relaxed text-zinc-400"
            >
              {{ selected.description }}
            </p>

            <div
              v-if="selected.tags?.length"
              class="flex flex-wrap gap-1.5"
            >
              <span
                v-for="tag in selected.tags"
                :key="tag"
                class="rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] text-zinc-400"
              >#{{ tag }}</span>
            </div>

            <div
              v-if="selected.connectedPolls.length || selected.connectedJobs.length"
              class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-xs"
            >
              <p class="mb-1 font-semibold text-zinc-300">
                {{ t('event.connectedWith') }}
              </p>
              <ul class="space-y-1 text-zinc-500">
                <li
                  v-for="id in [...selected.connectedPolls, ...selected.connectedJobs]"
                  :key="id"
                >
                  {{ id }}
                </li>
              </ul>
            </div>

            <div class="flex gap-2">
              <button
                type="button"
                class="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
              >
                {{ t('event.rsvpCta') }}
              </button>
              <button
                type="button"
                class="rounded-lg border border-zinc-800 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-900"
                @click="selected = null"
              >
                {{ t('action.close') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>