import { defineConfig } from 'vite'
import veauryVite from 'veaury/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    veauryVite({
      type: 'vue',
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '#': path.resolve(import.meta.dirname, './src'),
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})


