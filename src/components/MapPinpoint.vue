<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  event?: any;
  neighborhood: string;
  address: string;
  localizedAddress: string;
  cx?: number;
  cy?: number;
}>();

const emit = defineEmits<{
  (e: 'select', event: any): void;
}>();

const isHovered = ref(false);
</script>

<template>
  <g
    v-if="cx !== undefined && cy !== undefined"
    class="cursor-pointer group"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="emit('select', event)"
  >
    <!-- Pulse ring -->
    <circle
      :cx="cx"
      :cy="cy"
      r="12"
      class="fill-indigo-500/20 stroke-indigo-400/40 stroke-1 animate-pulse"
    />

    <!-- Main Outer Ring -->
    <circle
      :cx="cx"
      :cy="cy"
      r="7"
      class="fill-indigo-600/60 stroke-indigo-400 stroke-2 transition-all duration-300 group-hover:r-9 group-hover:fill-pink-500/80 group-hover:stroke-pink-300"
    />

    <!-- Center Dot -->
    <circle
      :cx="cx"
      :cy="cy"
      r="3"
      class="fill-white transition-all duration-300 group-hover:r-4"
    />

    <!-- Pin Label / Tooltip -->
    <g class="transition-opacity duration-200 pointer-events-none" :class="isHovered ? 'opacity-100' : 'opacity-0'">
      <rect
        :x="cx - 60"
        :y="cy - 35"
        width="120"
        height="24"
        rx="6"
        class="fill-zinc-900/95 stroke-zinc-700/80 stroke-1 backdrop-blur"
      />
      <text
        :x="cx"
        :y="cy - 19"
        text-anchor="middle"
        class="fill-zinc-100 text-[9px] font-semibold tracking-wide"
      >
        {{ localizedAddress }}
      </text>
    </g>
  </g>
</template>
