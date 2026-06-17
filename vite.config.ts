import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },
  resolve: {
    alias: {
      '@splidejs/splide': path.resolve(__dirname, 'node_modules/@splidejs/splide'),
    },
  },
})
