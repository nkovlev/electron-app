import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  main: {
    plugins: []
  },
  preload: {
    plugins: []
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': '/src/renderer/src'
      }
    },
    plugins: [react(), tailwindcss('./tailwind.config.js')]
  }
})
