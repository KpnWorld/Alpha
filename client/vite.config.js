import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['2a9e7c01-d031-4790-be7f-72f59b432dee-00-342zpxs11sdzi.picard.replit.dev'],
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: '../static/dist',
    emptyOutDir: true,
  }
})