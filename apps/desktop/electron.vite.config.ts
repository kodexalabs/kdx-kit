import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer'),
        '@kdx-kit/ui': resolve('../../packages/ui/src'),
        '@kdx-kit/anim': resolve('../../packages/anim/src'),
      },
    },
    plugins: [react()],
  },
})