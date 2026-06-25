import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { bundledStyles } from '../src/data/styles/registry.ts'
import { components } from '../src/data/components/registry.ts'
import { backendItems } from '../src/data/backend/registry.ts'
import type { SearchIndexEntry } from '../src/types/catalog.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public')
mkdirSync(outDir, { recursive: true })

function toEntry(item: {
  id: string
  kind: SearchIndexEntry['kind']
  slug: string
  title: SearchIndexEntry['title']
  description: SearchIndexEntry['description']
  tags: string[]
  category: string
  prompt: SearchIndexEntry['prompt']
  status: SearchIndexEntry['status']
  framework?: SearchIndexEntry['framework']
  patterns?: string[]
}): SearchIndexEntry {
  return {
    id: item.id,
    kind: item.kind,
    slug: item.slug,
    title: item.title,
    description: item.description,
    tags: item.tags,
    category: item.category,
    prompt: item.prompt,
    status: item.status,
    ...(item.framework ? { framework: item.framework, patterns: item.patterns } : {}),
  }
}

const index: SearchIndexEntry[] = [
  ...bundledStyles.map(toEntry),
  ...components.map(toEntry),
  ...backendItems.map(toEntry),
]

writeFileSync(join(outDir, 'search-index.json'), JSON.stringify(index, null, 2))
console.log(`export-search-index: wrote ${index.length} entries`)
