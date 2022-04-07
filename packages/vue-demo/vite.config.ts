import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
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
