import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

/** Fail production build if no analytics is configured (so visits are always recorded). */
function requireAnalytics() {
  return {
    name: 'require-analytics',
    configResolved(config: { mode: string }) {
      if (config.mode !== 'production') return
      const umami = process.env.VITE_UMAMI_WEBSITE_ID
      const ga = process.env.VITE_GA_MEASUREMENT_ID
      if (umami?.trim() || ga?.trim()) return
      throw new Error(
        'Analytics is required in production. Set VITE_UMAMI_WEBSITE_ID or VITE_GA_MEASUREMENT_ID in .env (see .env.example).'
      )
    },
  }
}

// https://vite.dev/config/
// base must match GitHub repo name for Pages: https://<user>.github.io/<repo>/
export default defineConfig({
  base: '/vue-projects/',
  plugins: [requireAnalytics(), vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url))
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    include: ['vue', 'vuetify', 'webfontloader'],
    exclude: ['@mdi/font']
  }
})
