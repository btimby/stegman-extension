import path from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
        all: true,
        include: ['src/*'],
    },
  },
  root:  path.resolve(__dirname, '.'),
  resolve: {
    alias: {
      '@' : path.resolve(__dirname, './src')
    },
  }
})
