import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3001,
  },
  base: './',
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        assetFileNames: 'static/css/widget.[ext]',
        entryFileNames: 'static/js/widget.js',
      },
    },
  },
});
