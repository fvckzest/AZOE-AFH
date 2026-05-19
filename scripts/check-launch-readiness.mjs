import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()

function stripJsonComments(value) {
  return value
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
}

function readText(relativePath) {
  return readFileSync(path.join(rootDir, relativePath), 'utf8')
}

function check(condition, message) {
  if (!condition) {
    console.error(`FAIL ${message}`)
    failures += 1
    return
  }

  console.log(`OK   ${message}`)
}

let failures = 0

const requiredFiles = [
  'src/App.jsx',
  'src/main.jsx',
  'public/azoe-logo.png',
  'docs/30_MINUTE_LAUNCH_SCRIPT.md',
  'docs/WEBSITE_OWNERSHIP_SHEET.md',
  'scripts/cloudflare-pages.mjs',
  'wrangler.jsonc',
  '.gitignore',
  'index.html',
]

for (const relativePath of requiredFiles) {
  check(existsSync(path.join(rootDir, relativePath)), `${relativePath} exists`)
}

const packageJson = JSON.parse(readText('package.json'))
const requiredScripts = [
  'build',
  'cf:project:create',
  'cf:deploy',
  'handoff:check',
]

for (const scriptName of requiredScripts) {
  check(Boolean(packageJson.scripts?.[scriptName]), `package.json includes ${scriptName}`)
}

const wranglerConfig = JSON.parse(stripJsonComments(readText('wrangler.jsonc')))
check(Boolean(wranglerConfig.name), 'wrangler.jsonc includes a Pages project name')
check(
  wranglerConfig.pages_build_output_dir === './dist',
  'wrangler.jsonc points Pages output to ./dist',
)
check(
  /^\d{4}-\d{2}-\d{2}$/.test(String(wranglerConfig.compatibility_date || '')),
  'wrangler.jsonc includes a compatibility_date',
)

const launchRunbook = readText('docs/30_MINUTE_LAUNCH_SCRIPT.md')
check(launchRunbook.includes('npm run handoff:check'), 'launch runbook includes handoff check')
check(launchRunbook.includes('npm run cf:project:create'), 'launch runbook includes Pages project command')
check(launchRunbook.includes('npm run cf:deploy'), 'launch runbook includes Pages deploy command')
check(
  !readText('src/App.jsx').includes('/api/contact'),
  'site no longer references the removed contact form endpoint',
)

if (failures > 0) {
  console.error(`\nLaunch readiness failed with ${failures} issue(s).`)
  process.exit(1)
}

console.log('\nLaunch readiness checks passed.')
