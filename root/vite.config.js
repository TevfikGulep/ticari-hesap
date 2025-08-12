import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 9002,
    hmr: {
      protocol: 'wss',
      host: '9000-firebase-hesaplayicigit-1754034725473.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev',
      clientPort: 443, // Use 443 for WebSocket connections over HTTPS in the browser
    },
  },
})
