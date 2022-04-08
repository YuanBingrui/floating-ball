import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  publicDir: 'https://yuanbingrui.github.io/floating-ball/',
  server: {
    port: 3001,
    open: true,
    host: true,
  },
  build: {
    assetsDir: '.',
  },
  plugins: [vue()],
});
