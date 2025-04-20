import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/News/',
  build: {
    outDir: 'docs', // Изменили на docs для GitHub Pages
  },
});