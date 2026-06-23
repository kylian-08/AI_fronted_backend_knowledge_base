import Fuse from 'fuse.js'
import type { CatalogKind, SearchIndexEntry } from '@/types/catalog'

let fuseInstance: Fuse<SearchIndexEntry> | null = null
let indexData: SearchIndexEntry[] = []

export async function loadSearchIndex(): Promise<SearchIndexEntry[]> {
  if (indexData.length > 0) return indexData
  try {
    const res = await fetch('/search-index.json')
    if (res.ok) {
      indexData = (await res.json()) as SearchIndexEntry[]
      return indexData
    }
  } catch {
    // fallback to bundled index
  }
  const { getBundledSearchIndex } = await import('@/data/searchIndex')
  indexData = getBundledSearchIndex()
  return indexData
}

export async function getFuse(): Promise<Fuse<SearchIndexEntry>> {
  if (fuseInstance) return fuseInstance
  const data = await loadSearchIndex()
  fuseInstance = new Fuse(data, {
    keys: [
      { name: 'title.zh-CN', weight: 0.3 },
      { name: 'title.en-US', weight: 0.3 },
      { name: 'description.zh-CN', weight: 0.15 },
      { name: 'description.en-US', weight: 0.15 },
      { name: 'tags', weight: 0.2 },
      { name: 'prompt.zh-CN', weight: 0.1 },
      { name: 'prompt.en-US', weight: 0.1 },
      { name: 'category', weight: 0.1 },
    ],
    threshold: 0.35,
    includeScore: true,
  })
  return fuseInstance
}

export async function searchCatalog(
  query: string,
  kind?: CatalogKind,
  tags?: string[],
): Promise<SearchIndexEntry[]> {
  const data = await loadSearchIndex()
  let results = data

  if (kind) {
    results = results.filter((item) => item.kind === kind)
  }

  if (tags && tags.length > 0) {
    results = results.filter((item) =>
      tags.some((tag) => item.tags.includes(tag)),
    )
  }

  if (!query.trim()) return results

  const fuse = await getFuse()
  const fuseResults = fuse.search(query.trim())
  const ids = new Set(fuseResults.map((r) => r.item.id))
  return results.filter((item) => ids.has(item.id))
}

export function getAllTags(entries: SearchIndexEntry[]): string[] {
  const tagSet = new Set<string>()
  entries.forEach((e) => e.tags.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).sort()
}
