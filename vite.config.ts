import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    // Every page is rendered to plain HTML at build time; the Worker just serves files.
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        // Lumen AI's API reference is Dokka's own static HTML (public/ai/reference): served as is.
        // Download and Changelog render on the Worker with the current releases (src/releases.ts).
        filter: ({ path }) => !path.startsWith('/ai/reference') && path !== '/download' && path !== '/changelog',
      },
    }),
    viteReact(),
  ],
})
