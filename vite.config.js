import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3001,
  },
  define: {
    'process.env': {},
  },
  base: './',
  build: {
    outDir: 'build',
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 2,
      },
    },
    lib: {
      entry: 'src/index.jsx',
      name: 'CalendarWidget',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        assetFileNames: 'static/css/widget.[ext]',
        entryFileNames: 'static/js/widget.js',
      },
    },
  },
});
