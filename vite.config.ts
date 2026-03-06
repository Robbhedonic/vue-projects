import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

/** Warn in production build if no analytics is configured (optional; set in hosting for visits). */
function warnIfNoAnalytics() {
  return {
    name: 'warn-if-no-analytics',
    configResolved(config: { mode: string }) {
      if (config.mode !== 'production') return
      const umami = process.env.VITE_UMAMI_WEBSITE_ID
      const ga = process.env.VITE_GA_MEASUREMENT_ID
      if (umami?.trim() || ga?.trim()) return
      console.warn(
        'Tip: Set VITE_UMAMI_WEBSITE_ID or VITE_GA_MEASUREMENT_ID in your hosting env to record visits (see .env.example).'
      )
    },
  }
}

// https://vite.dev/config/
// base: '/' for Vercel/Render; use '/vue-projects/' for GitHub Pages
export default defineConfig({
  base: '/',
  plugins: [warnIfNoAnalytics(), vue(), vuetify({ autoImport: true })],
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
      '/uploads': {
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
