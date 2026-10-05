<script setup lang="ts">
import { ref } from 'vue'
import type { Event } from '../data/demo'

const props = defineProps<{
  event?: Event
  neighborhood: string
  address: string
  localizedAddress: string
  cx?: number
  cy?: number
}>()

const emit = defineEmits<{
  (e: 'select', event: Event): void
}>()

const isHovered = ref(false)
</script>

<template>
  <g
    v-if="props.cx !== undefined && props.cy !== undefined"
    class="cursor-pointer group"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="emit('select', props.event as Event)"
  >
    <circle
      :cx="props.cx"
      :cy="props.cy"
      r="12"
      class="fill-accent/20 stroke-accent/40 stroke-1"
    />

    <circle
      :cx="props.cx"
      :cy="props.cy"
      r="7"
      class="fill-action/60 stroke-action stroke-2 transition-all duration-300 group-hover:r-9 group-hover:fill-accent group-hover:stroke-accent"
    />

    <circle
      :cx="props.cx"
      :cy="props.cy"
      r="3"
      class="fill-action-text transition-all duration-300 group-hover:r-4"
    />

    <g
      class="transition-opacity duration-200 pointer-events-none"
      :class="isHovered ? 'opacity-100' : 'opacity-0'"
    >
      <rect
        :x="props.cx - 60"
        :y="props.cy - 35"
        width="120"
        height="24"
        rx="6"
        class="fill-bg stroke-control-border stroke-1"
      />
      <text
        :x="props.cx"
        :y="props.cy - 19"
        text-anchor="middle"
        class="fill-text font-ui text-[9px] font-semibold tracking-wide"
      >
        {{ props.localizedAddress }}
      </text>
    </g>
  </g>
</template>