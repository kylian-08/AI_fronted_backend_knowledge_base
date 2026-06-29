import { cn } from '@/lib/utils'

export interface CategoryOption {
  key: string
  label: string
}

interface CategoryChipsProps {
  categories: CategoryOption[]
  selected: string | null
  onChange: (key: string | null) => void
  allLabel: string
  className?: string
}

/** Single-select category filter; null means "all". */
export function CategoryChips({
  categories,
  selected,
  onChange,
  allLabel,
  className,
}: CategoryChipsProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      <button
        type="button"
        onClick={() => onChange(null)}
        className={cn(
          'min-h-[36px] rounded-full px-3 py-1 text-xs font-medium transition-colors',
          selected === null
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80',
        )}
      >
        {allLabel}
      </button>
      {categories.map(({ key, label }) => {
        const active = selected === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(active ? null : key)}
            className={cn(
              'min-h-[36px] rounded-full px-3 py-1 text-xs font-medium transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80',
            )}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
