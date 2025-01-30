import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.jsonserve.com',  // API endpoint
        changeOrigin: true,  // This helps with CORS issues
        rewrite: (path) => path.replace(/^\/api/, '')  // Optionally rewrite the path
      }
    }
  }
})
