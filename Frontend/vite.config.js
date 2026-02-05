import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'accretionary-minta-unwarrantably.ngrok-free.dev'
    ]
  }
})
