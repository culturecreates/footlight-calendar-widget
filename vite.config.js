/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

export default defineConfig(() => ({
  plugins: [react(), svgr()],
  base: './',
  define: {
    'process.env': {},
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // Used for iframe-based embedding
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name && chunkInfo.name.endsWith('.css')) {
            return 'static/css/widget.[ext]';
          }
          return 'static/js/widget.[ext]';
        },
        entryFileNames: 'static/js/widget.js',
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 2,
      },
    },
    lib: {
      entry: resolve(__dirname, 'src/index.jsx'),
      name: 'CalendarWidget',
      formats: ['iife'],
      fileName: () => `widget.js`,
    },
  },
  server: {
    port: 3001,
  },
}));
