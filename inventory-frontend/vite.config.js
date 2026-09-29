import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),

  ],

  server: {
    proxy: {
      '/api/orders': {
        target: 'http://localhost:8088',
        changeOrigin: true,
      },
      '/api/products': {
        target: 'http://localhost:8089',
        changeOrigin: true,
      },
    },
  },
})
