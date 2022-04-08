import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  publicDir: 'https://yuanbingrui.github.io/floating-ball/',
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  build: {
    assetsDir: '.',
  },
  plugins: [react()],
});
