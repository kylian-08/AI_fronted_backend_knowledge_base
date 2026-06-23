import type { SearchIndexEntry } from '@/types/catalog'
import { styles } from '@/data/styles/registry'
import { components } from '@/data/components/registry'
import { backendItems } from '@/data/backend/registry'

export function getBundledSearchIndex(): SearchIndexEntry[] {
  const styleEntries: SearchIndexEntry[] = styles.map((s) => ({
    id: s.id,
    kind: s.kind,
    slug: s.slug,
    title: s.title,
    description: s.description,
    tags: s.tags,
    category: s.category,
    prompt: s.prompt,
    status: s.status,
  }))

  const componentEntries: SearchIndexEntry[] = components.map((c) => ({
    id: c.id,
    kind: c.kind,
    slug: c.slug,
    title: c.title,
    description: c.description,
    tags: c.tags,
    category: c.category,
    prompt: c.prompt,
    status: c.status,
  }))

  const backendEntries: SearchIndexEntry[] = backendItems.map((b) => ({
    id: b.id,
    kind: b.kind,
    slug: b.slug,
    title: b.title,
    description: b.description,
    tags: b.tags,
    category: b.category,
    prompt: b.prompt,
    status: b.status,
    framework: b.framework,
    patterns: b.patterns,
  }))

  return [...styleEntries, ...componentEntries, ...backendEntries]
}
