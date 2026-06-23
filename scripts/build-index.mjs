import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

// Inline minimal index builder — reads from bundled data modules via JSON snapshots
const stylesData = [
  'minimalism', 'glassmorphism', 'neoBrutalism', 'materialDesign', 'darkMode',
]
const componentsData = [
  'modal-dialog', 'toast-notifications', 'table-basic', 'navbar', 'sign-in-form',
]
const backendData = [
  'nestjs-crud', 'nestjs-auth', 'fastapi-crud', 'fastapi-auth',
  'express-crud', 'express-middleware', 'django-drf',
]

console.log('build-index: generating search-index.json placeholder')
console.log('  styles:', stylesData.length, 'components:', componentsData.length, 'backend:', backendData.length)

// The actual index is built at runtime from bundled TS modules.
// This script writes a marker file; full index exported from src/data/searchIndex.ts
// and copied during vite build via plugin below.

const publicDir = join(root, 'public')
mkdirSync(publicDir, { recursive: true })

// Dynamic import won't work easily in plain node without bundling;
// write index by importing compiled data — use a static JSON export instead.
import { readFileSync } from 'fs'

// Generate from a pre-exported snapshot
const snapshotPath = join(root, 'scripts', 'search-index.snapshot.json')
let index = []
try {
  index = JSON.parse(readFileSync(snapshotPath, 'utf-8'))
} catch {
  console.warn('No snapshot found, run validate-prompts first or use bundled fallback')
}

if (index.length > 0) {
  writeFileSync(join(publicDir, 'search-index.json'), JSON.stringify(index, null, 2))
  console.log('Wrote', index.length, 'entries to public/search-index.json')
} else {
  console.log('Skipping search-index.json write (using runtime bundled index)')
}
