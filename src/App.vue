<script setup>
import { ref } from 'vue'
import TopBar from './components/TopBar.vue'
import { events } from './data/demo'

const search = ref('')
const selectedDate = ref(null)
</script>

<template>
  <TopBar
    :search="search"
    @update:search="search = $event"
  />

  <RouterView v-slot="{ Component }">
    <component
      :is="Component"
      :search="search"
      :selected-date="selectedDate"
      :events="events"
      @select-date="selectedDate = $event"
    />
  </RouterView>
</template>