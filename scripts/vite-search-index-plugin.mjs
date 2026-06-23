import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// Build-time plugin: emit search-index.json into public/
const __dirname = dirname(fileURLToPath(import.meta.url))

export function emitSearchIndexPlugin() {
  return {
    name: 'emit-search-index',
    async buildStart() {
      const { styles } = await import('../src/data/styles/registry.ts')
      const { components } = await import('../src/data/components/registry.ts')
      const { backendItems } = await import('../src/data/backend/registry.ts')

      const toEntry = (item) => ({
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
      })

      const index = [
        ...styles.map(toEntry),
        ...components.map(toEntry),
        ...backendItems.map(toEntry),
      ]

      const outDir = join(__dirname, '..', 'public')
      mkdirSync(outDir, { recursive: true })
      writeFileSync(join(outDir, 'search-index.json'), JSON.stringify(index, null, 2))
      console.log(`[emit-search-index] wrote ${index.length} entries`)
    },
  }
}
