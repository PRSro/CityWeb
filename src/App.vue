<script setup>
import { ref, onMounted } from 'vue'
import { AuthScreen, CardAccordion } from '#/components/watermelon-ui'

const activeTab = ref('all')
const events = ref([])
const polls = ref([])
const isLoading = ref(false)

// Payload API Data Fetchers for Piața
async function fetchPiataData() {
  isLoading.value = true
  try {
    const [eventsRes, pollsRes] = await Promise.all([
      fetch('/api/events').catch(() => null),
      fetch('/api/polls').catch(() => null)
    ])
    if (eventsRes?.ok) {
      const data = await eventsRes.json()
      events.value = data.docs || []
    }
    if (pollsRes?.ok) {
      const data = await pollsRes.json()
      polls.value = data.docs || []
    }
  } catch (err) {
    console.warn('Payload API not reachable locally yet:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchPiataData()
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center">
    <!-- Top Navigation Bar -->
    <header class="w-full border-b border-zinc-800 bg-zinc-900/50 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="text-xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
          Watermelon UI Testing Suite — Piața
        </span>
        <span class="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-mono">Vue 3 + React + Neon Postgres</span>
      </div>

      <!-- Component Switcher Tabs -->
      <div class="flex items-center bg-zinc-800/80 p-1 rounded-xl gap-1">
        <button 
          @click="activeTab = 'all'"
          :class="activeTab === 'all' ? 'bg-zinc-700 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'"
          class="px-4 py-1.5 text-sm font-medium rounded-lg transition-all"
        >
          All Components
        </button>
        <button 
          @click="activeTab = 'auth'"
          :class="activeTab === 'auth' ? 'bg-zinc-700 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'"
          class="px-4 py-1.5 text-sm font-medium rounded-lg transition-all"
        >
          Auth 10
        </button>
        <button 
          @click="activeTab = 'accordion'"
          :class="activeTab === 'accordion' ? 'bg-zinc-700 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'"
          class="px-4 py-1.5 text-sm font-medium rounded-lg transition-all"
        >
          Card Accordion
        </button>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="w-full max-w-7xl p-6 flex flex-col items-center gap-12">
      <!-- Auth Screen Component -->
      <section v-if="activeTab === 'all' || activeTab === 'auth'" class="w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
        <div class="bg-zinc-900/80 border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
          <span class="text-sm font-semibold text-zinc-300">🍉 Watermelon UI - Auth 10</span>
          <span class="text-xs text-zinc-500">src/components/ui/auth-10.tsx</span>
        </div>
        <AuthScreen />
      </section>

      <!-- Card Accordion Component -->
      <section v-if="activeTab === 'all' || activeTab === 'accordion'" class="w-full max-w-3xl rounded-2xl bg-zinc-900/40 border border-zinc-800 p-8 shadow-2xl">
        <div class="border-b border-zinc-800/80 pb-4 mb-6 flex items-center justify-between">
          <span class="text-sm font-semibold text-zinc-300">🍉 Watermelon UI - Card Split Accordion</span>
          <span class="text-xs text-zinc-500">src/components/card-split-accordian.tsx</span>
        </div>
        <CardAccordion />
      </section>
    </main>
  </div>
</template>
