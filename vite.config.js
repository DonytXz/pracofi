import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to the repository name so GitHub Pages serves assets from the correct subpath
export default defineConfig({
  base: '/pracofi/',
  plugins: [react()]
})
