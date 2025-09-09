import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 9002,      // The port Vite runs on inside the container
    hmr: {
      // The browser client needs to connect to the proxy, which is on port 443
      protocol: 'wss',
      clientPort: 443
    }
  }
})
