import fs from 'node:fs/promises'
import path from 'node:path'

const defaultSiteUrl = 'https://azoe-afh-site.pages.dev'
const siteUrl = (process.env.VITE_SITE_URL || defaultSiteUrl).replace(/\/+$/, '')
const publicDir = path.join(process.cwd(), 'public')

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`

const manifest = {
  name: 'AZOE Adult Family Home',
  short_name: 'AZOE AFH',
  description:
    'Personalized senior care, medication support, dementia support, and respite care in Lacey, Washington.',
  start_url: '/',
  display: 'standalone',
  background_color: '#f5efe6',
  theme_color: '#f5efe6',
  icons: [
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
}

await fs.writeFile(path.join(publicDir, 'robots.txt'), robotsTxt)
await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemapXml)
await fs.writeFile(
  path.join(publicDir, 'site.webmanifest'),
  `${JSON.stringify(manifest, null, 2)}\n`,
)
