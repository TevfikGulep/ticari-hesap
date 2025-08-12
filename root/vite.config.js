import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 9002,      // The port Vite runs on inside the container
    hmr: {
      // Let the client infer the host from the browser's location,
      // but explicitly tell it to use the secure protocol and standard HTTPS port.
      protocol: 'wss',
      clientPort: 443
    }
  }
})
