import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { buildStructuredData } from './src/seo.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://azoeafh.com').replace(/\/+$/, '')
  const jsonLd = buildStructuredData(siteUrl)
    .map(
      (item) =>
        `<script type="application/ld+json">${JSON.stringify(item)}</script>`,
    )
    .join('\n    ')

  return {
    plugins: [
      react(),
      {
        name: 'inject-seo-site-url',
        transformIndexHtml(html) {
          return html
            .replaceAll('__SITE_URL__', siteUrl)
            .replace('__JSON_LD__', jsonLd)
        },
      },
    ],
  }
})
