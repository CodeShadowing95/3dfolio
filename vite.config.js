import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,           // écoute sur 0.0.0.0 pour Docker
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,   // nécessaire sur Windows/Mac avec volumes Docker
      interval: 100,
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',  // HMR accessible depuis le navigateur hôte
      port: 5173,
    },
  },
})
