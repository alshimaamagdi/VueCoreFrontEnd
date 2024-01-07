import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },

  plugins: [
    vue(),
    {src: '~/plugins/directives.js'},
  {src: '~/plugins/vuelidate.js', mode: 'client'}

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
