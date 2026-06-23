import { useEffect, useState } from 'react'
import type { CatalogKind, SearchIndexEntry } from '@/types/catalog'
import { getAllTags, searchCatalog } from '@/lib/search'

export function useCatalogSearch(kind?: CatalogKind) {
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [results, setResults] = useState<SearchIndexEntry[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    searchCatalog(query, kind, selectedTags.length ? selectedTags : undefined)
      .then((data) => {
        if (!cancelled) {
          setResults(data)
          setAllTags(getAllTags(data))
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [query, kind, selectedTags])

  return {
    query,
    setQuery,
    selectedTags,
    setSelectedTags,
    results,
    allTags,
    loading,
  }
}
