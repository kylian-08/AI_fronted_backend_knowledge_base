import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import type { LocalizedText } from '@/types/catalog'
import { cn } from '@/lib/utils'

export interface PickerCategory<T> {
  key: string | null
  label: string
  match: (item: T) => boolean
}

interface ComposerPickerProps<T extends { id: string; title: LocalizedText }> {
  items: T[]
  selectedIds: string[]
  onChange: (ids: string[]) => void
  mode: 'single' | 'multiple'
  categories?: PickerCategory<T>[]
  searchPlaceholder: string
  emptyLabel: string
  tr: (obj: LocalizedText) => string
  className?: string
}

export function ComposerPicker<T extends { id: string; title: LocalizedText }>({
  items,
  selectedIds,
  onChange,
  mode,
  categories,
  searchPlaceholder,
  emptyLabel,
  tr,
  className,
}: ComposerPickerProps<T>) {
  const [query, setQuery] = useState('')
  const [categoryKey, setCategoryKey] = useState<string | null>(categories?.[0]?.key ?? null)

  const activeCategory = categories?.find((c) => c.key === categoryKey) ?? categories?.[0]

  const pool = useMemo(() => {
    let list = items
    if (activeCategory) list = list.filter((item) => activeCategory.match(item))
    return list
  }, [items, activeCategory])

  const fuse = useMemo(
    () =>
      new Fuse(pool, {
        keys: ['title.zh-CN', 'title.en-US', 'id'],
        threshold: 0.35,
      }),
    [pool],
  )

  const filtered = useMemo(() => {
    if (!query.trim()) return pool
    return fuse.search(query.trim()).map((r) => r.item)
  }, [pool, fuse, query])

  function toggle(id: string) {
    if (mode === 'single') {
      onChange(selectedIds.includes(id) ? [] : [id])
      return
    }
    onChange(
      selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id],
    )
  }

  return (
    <div className={cn('rounded-xl border border-border bg-card', className)}>
      {categories && categories.length > 1 && (
        <div className="flex flex-wrap gap-1 border-b border-border p-2">
          {categories.map((cat) => (
            <button
              key={cat.key ?? 'all'}
              type="button"
              onClick={() => setCategoryKey(cat.key)}
              className={cn(
                'rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
                categoryKey === cat.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}
      <div className="border-b border-border p-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      <ul className="max-h-52 overflow-y-auto p-1" role="listbox">
        {filtered.length === 0 && (
          <li className="px-3 py-6 text-center text-xs text-muted-foreground">{emptyLabel}</li>
        )}
        {filtered.map((item) => {
          const selected = selectedIds.includes(item.id)
          return (
            <li key={item.id}>
              <button
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => toggle(item.id)}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors',
                  selected ? 'bg-primary/15 text-foreground' : 'hover:bg-accent',
                )}
              >
                <span
                  className={cn(
                    'flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px]',
                    selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border',
                  )}
                >
                  {selected ? (mode === 'single' ? '●' : '✓') : ''}
                </span>
                <span className="truncate">{tr(item.title)}</span>
              </button>
            </li>
          )
        })}
      </ul>
      {mode === 'multiple' && selectedIds.length > 0 && (
        <div className="border-t border-border p-2 text-xs text-muted-foreground">
          {selectedIds.length}
        </div>
      )}
    </div>
  )
}
