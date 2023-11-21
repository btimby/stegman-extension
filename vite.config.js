import path from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json' assert { type: 'json' } 
//import copy from '@guanghechen/rollup-plugin-copy';
//import execute from 'rollup-plugin-execute';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), crx({ manifest })],
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
/*  build: {
    rollupOptions: {
      plugins: [
        copy({
          targets: [
            { src: 'manifest.json', dest: 'dist/'  },
            { src: 'manifestv3.json', dest: 'dist/'  },
            { src: 'src/content/index.css', dest: 'dist/src/content/' },
            { src: 'src/content/index.js', dest: 'dist/src/content/' },
            { src: 'src/background/index.html', dest: 'dist/src/background/' },
            { src: 'src/background/index.js', dest: 'dist/src/background/' },
          ],
          verbose: true,
          hook: 'writeBundle',
        }),
        execute('xdg-open http://reload.extensions'),
      ]
    }
  }*/
})
