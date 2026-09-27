import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Honour a PORT handed down by the environment, so the dev server can be
  // started alongside other projects without colliding on 5173.
  server: { port: Number(process.env.PORT) || 5173 },
  preview: { port: Number(process.env.PORT) || 4173 },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
