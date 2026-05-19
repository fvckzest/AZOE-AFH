import { mkdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const rootDir = process.cwd()
const mode = process.argv[2]
const targetDir = process.argv[3] || 'dist'

function stripJsonComments(value) {
  return value
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
}

function loadWranglerConfig() {
  const configPath = path.join(rootDir, 'wrangler.jsonc')
  const raw = readFileSync(configPath, 'utf8')
  return JSON.parse(stripJsonComments(raw))
}

function runWrangler(args) {
  const wranglerHome = path.join(rootDir, '.wrangler')
  mkdirSync(wranglerHome, { recursive: true })

  const command = process.platform === 'win32' ? 'npx.cmd' : 'npx'
  const result = spawnSync(command, args, {
    cwd: rootDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      WRANGLER_HOME: wranglerHome,
      XDG_CONFIG_HOME: wranglerHome,
    },
  })

  process.exit(result.status ?? 1)
}

const wranglerConfig = loadWranglerConfig()
const projectName = process.env.CF_PAGES_PROJECT_NAME || wranglerConfig.name
const productionBranch = process.env.CF_PAGES_PRODUCTION_BRANCH || 'main'
const compatibilityDate = wranglerConfig.compatibility_date

if (!projectName) {
  console.error('Cloudflare Pages project name is missing. Update wrangler.jsonc first.')
  process.exit(1)
}

if (!compatibilityDate) {
  console.error('Cloudflare compatibility date is missing. Update wrangler.jsonc first.')
  process.exit(1)
}

if (mode === 'create') {
  runWrangler([
    'wrangler',
    'pages',
    'project',
    'create',
    projectName,
    '--production-branch',
    productionBranch,
    '--compatibility-date',
    compatibilityDate,
  ])
}

if (mode === 'deploy') {
  runWrangler([
    'wrangler',
    'pages',
    'deploy',
    targetDir,
    '--project-name',
    projectName,
    '--branch',
    productionBranch,
  ])
}

if (mode === 'dev') {
  runWrangler([
    'wrangler',
    'pages',
    'dev',
    targetDir,
    '--ip',
    '127.0.0.1',
    '--port',
    '8788',
    '--persist-to',
    path.join('.wrangler', 'state'),
  ])
}

console.error('Usage: node ./scripts/cloudflare-pages.mjs <create|deploy|dev> [directory]')
process.exit(1)
