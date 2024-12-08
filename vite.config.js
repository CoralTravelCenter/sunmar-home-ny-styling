import {defineConfig} from 'vite'
import monkey from 'vite-plugin-monkey'

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.sunmar.ru/*'],
      },
    }),
  ],
})