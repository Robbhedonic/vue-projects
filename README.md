# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Deploy to GitHub Pages

The app must be deployed as a **built** site (HTML + JS), not the source. If you see "video/mp2t" or a blank page, the server is serving the source and requesting `.ts` files, which many servers treat as video.

**Option A (recommended)**  
1. In your repo: **Settings → Pages**.  
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.  
3. Push to `main`. The workflow uploads the build and deploys it.

**Option B (branch)**  
1. In your repo: **Settings → Pages**.  
2. Set **Source** to **Deploy from a branch**.  
3. Choose **Branch**: `gh-pages`, **Folder**: `/` (root). Save.  
4. Push to `main`. The workflow builds the app and pushes the result to the `gh-pages` branch; that branch is what the site serves.

Site URL: e.g. `https://<user>.github.io/vue-projects/`
