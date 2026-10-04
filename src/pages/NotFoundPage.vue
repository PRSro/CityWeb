<script setup lang="ts">
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <main class="mx-auto w-full max-w-7xl px-4 py-24 md:px-6">
    <div class="mx-auto max-w-md text-center">
      <h1 class="text-2xl font-bold text-zinc-50">
        {{ t('notFound.title') }}
      </h1>
      <p class="mt-2 text-sm text-zinc-500">
        {{ t('notFound.body') }}
      </p>
      <RouterLink
        to="/evenimente"
        class="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        {{ t('notFound.cta') }}
      </RouterLink>
    </div>
  </main>
</template>