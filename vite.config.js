import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n'

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/dist/',
  build: {
    manifest: true,
    outDir: path.resolve(__dirname, 'public/dist'),
    rollupOptions: {
      input: 'resources/js/app.js',
    },
  },

  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(__dirname, './resources/lang/**')
    })
  ],

  server: {
    host: '0.0.0.0'
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname,'/resources/js'),
    },
  },
}));