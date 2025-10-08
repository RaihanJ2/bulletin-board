import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // allows external connections
    port: 5173, // optional: make it fixed
  },
  plugins: [ tailwindcss(),react()],
})

