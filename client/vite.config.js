import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-hot-toast']
  },
  build: {
    rollupOptions: {
      external: ['buffer'] // Ensure 'buffer' is treated as an external module
    }}

})
