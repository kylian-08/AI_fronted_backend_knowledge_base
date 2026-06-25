import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import type { StyleItem } from '@/types/catalog'

const PAGE_SIZE = 24

export function useStyleFilter(allStyles: StyleItem[]) {
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [page, setPage] = useState(1)

  const fuse = useMemo(
    () =>
      new Fuse(allStyles, {
        keys: [
          { name: 'title.zh-CN', weight: 0.25 },
          { name: 'title.en-US', weight: 0.25 },
          { name: 'description.zh-CN', weight: 0.15 },
          { name: 'description.en-US', weight: 0.15 },
          { name: 'tags', weight: 0.2 },
          'category',
        ],
        threshold: 0.35,
      }),
    [allStyles],
  )

  const filtered = useMemo(() => {
    let list = allStyles
    if (query.trim()) {
      list = fuse.search(query.trim()).map((r) => r.item)
    }
    if (selectedTags.length > 0) {
      list = list.filter((s) => selectedTags.some((t) => s.tags.includes(t)))
    }
    return list
  }, [allStyles, fuse, query, selectedTags])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    allStyles.forEach((s) => s.tags.forEach((t) => set.add(t)))
    return Array.from(set).sort().slice(0, 30)
  }, [allStyles])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function setQueryAndReset(q: string) {
    setQuery(q)
    setPage(1)
  }

  function setTagsAndReset(tags: string[]) {
    setSelectedTags(tags)
    setPage(1)
  }

  return {
    query,
    setQuery: setQueryAndReset,
    selectedTags,
    setSelectedTags: setTagsAndReset,
    filtered,
    paginated,
    allTags,
    page,
    setPage,
    totalPages,
    total: filtered.length,
  }
}
