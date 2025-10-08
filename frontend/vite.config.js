import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'jquery-provide',
      config(config) {
        config.define = config.define || {}
        config.define.global = 'globalThis'
      },
      configureServer(server) {
        server.middlewares.use('/node_modules/', (req, res, next) => {
          next()
        })
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['jquery', 'owl.carousel']
  },
  build: {
    commonjsOptions: {
      include: [/jquery/, /owl.carousel/, /node_modules/]
    }
  }
})