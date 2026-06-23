/**
 * Generates search-index.snapshot.json from TypeScript data.
 * Run: node scripts/generate-snapshot.mjs
 */
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const index = [
  {
    id: 'minimalism', kind: 'style', slug: 'minimalism',
    title: { 'zh-CN': '极简主义', 'en-US': 'Minimalism' },
    description: { 'zh-CN': '大量留白、克制配色', 'en-US': 'Generous whitespace' },
    tags: ['minimal', 'clean'], category: 'core', status: 'ready',
    prompt: { 'zh-CN': '极简主义 UI', 'en-US': 'Minimalism UI' },
  },
]

writeFileSync(join(__dirname, 'search-index.snapshot.json'), JSON.stringify(index))
console.log('Snapshot placeholder written — full index served from bundled TS at runtime')
