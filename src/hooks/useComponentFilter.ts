import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import type { ComponentItem } from '@/types/catalog'

const PAGE_SIZE = 24

export function useComponentFilter(items: ComponentItem[]) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [page, setPage] = useState(1)

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          'title.zh-CN',
          'title.en-US',
          'description.zh-CN',
          'description.en-US',
          'tags',
          'category',
        ],
        threshold: 0.35,
      }),
    [items],
  )

  const filtered = useMemo(() => {
    let list = items
    if (query.trim()) list = fuse.search(query.trim()).map((r) => r.item)
    if (selectedCategory) list = list.filter((c) => c.category === selectedCategory)
    if (selectedTags.length) list = list.filter((c) => selectedTags.some((tag) => c.tags.includes(tag)))
    return list
  }, [items, fuse, query, selectedCategory, selectedTags])

  const allTags = useMemo(() => {
    const pool = selectedCategory ? items.filter((c) => c.category === selectedCategory) : items
    const set = new Set<string>()
    pool.forEach((c) => c.tags.forEach((tag) => set.add(tag)))
    return Array.from(set).sort()
  }, [items, selectedCategory])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function setQueryAndReset(q: string) {
    setQuery(q)
    setPage(1)
  }

  function setCategoryAndReset(cat: string | null) {
    setSelectedCategory(cat)
    setSelectedTags([])
    setPage(1)
  }

  function setTagsAndReset(tags: string[]) {
    setSelectedTags(tags)
    setPage(1)
  }

  return {
    query,
    setQuery: setQueryAndReset,
    selectedCategory,
    setSelectedCategory: setCategoryAndReset,
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
