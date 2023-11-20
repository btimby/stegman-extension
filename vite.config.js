import path from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from '@guanghechen/rollup-plugin-copy';

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
  },
  build: {
    rollupOptions: {
      input: {
        'index.html': path.resolve(__dirname, "index.html"),
        'src/content/index.js': path.resolve(__dirname, "src/content/index.js"),
        'background/index.html': path.resolve(__dirname, "src/background/index.html"),
      },
      output: {
        entryFileNames: '[name]',
      },
      plugins: [
        copy({
          targets: [
            { src: 'manifest.json', dest: 'dist/'  },
            { src: 'manifestv3.json', dest: 'dist/'  },
            { src: 'src/content/index.css', dest: 'dist/src/content/' },
          ],
          verbose: true,
          hook: 'writeBundle',
        })
      ]
    }
  }
})
