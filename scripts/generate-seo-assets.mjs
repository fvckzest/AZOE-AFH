import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const projectRoot = process.cwd()
const publicDir = path.join(projectRoot, 'public')
const sourceLogo = path.join(publicDir, 'azoe-logo.png')
const ogImagePath = path.join(publicDir, 'og-image.png')
const squareLogoPath = path.join(publicDir, 'logo-square-512.png')
const faviconPath = path.join(publicDir, 'favicon-32x32.png')
const appleTouchIconPath = path.join(publicDir, 'apple-touch-icon.png')
const android192Path = path.join(publicDir, 'android-chrome-192x192.png')
const android512Path = path.join(publicDir, 'android-chrome-512x512.png')

const brandBackground = '#f8f4ee'
const brandAccent = '#28433b'
const brandMuted = '#5d6f68'

async function ensureSourceExists() {
  await fs.access(sourceLogo)
}

async function createSquareLogo(size, outputPath) {
  const logo = await sharp(sourceLogo)
    .resize(Math.round(size * 0.62), Math.round(size * 0.82), {
      fit: 'contain',
      withoutEnlargement: true,
    })
    .png()
    .toBuffer()

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: brandBackground,
    },
  })
    .composite([
      {
        input: logo,
        gravity: 'center',
      },
    ])
    .png()
    .toFile(outputPath)
}

async function createOgImage() {
  const width = 1200
  const height = 630
  const logoLeft = 92
  const logoTop = 138
  const logo = await sharp(sourceLogo)
    .resize(290, 420, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .png()
    .toBuffer()

  const backgroundOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" rx="0" fill="${brandBackground}" />
      <rect x="52" y="52" width="${width - 104}" height="${height - 104}" rx="28" fill="#fdfaf6" stroke="#e5dbcd" />
    </svg>
  `)

  const foregroundOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="418" y="116" width="2" height="398" fill="#dfd5c7" />
      <text x="472" y="210" fill="${brandAccent}" font-family="Georgia, 'Times New Roman', serif" font-size="60" font-weight="700">
        <tspan x="472" dy="0">AZOE Adult</tspan>
        <tspan x="472" dy="72">Family Home</tspan>
      </text>
      <text x="472" y="370" fill="${brandMuted}" font-family="Arial, Helvetica, sans-serif" font-size="31">
        <tspan x="472" dy="0">Personalized senior care in a calm,</tspan>
        <tspan x="472" dy="44">residential setting in Lacey, Washington.</tspan>
      </text>
      <text x="472" y="502" fill="${brandAccent}" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700">
        Call 360-688-6609
      </text>
    </svg>
  `)

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: brandBackground,
    },
  })
    .composite([
      {
        input: backgroundOverlay,
      },
      {
        input: logo,
        left: logoLeft,
        top: logoTop,
      },
      {
        input: foregroundOverlay,
      },
    ])
    .png()
    .toFile(ogImagePath)
}

await ensureSourceExists()
await createSquareLogo(512, squareLogoPath)
await createSquareLogo(192, android192Path)
await createSquareLogo(512, android512Path)
await createSquareLogo(180, appleTouchIconPath)
await createSquareLogo(32, faviconPath)
await createOgImage()
