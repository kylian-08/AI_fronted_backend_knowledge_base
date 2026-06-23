import { cn } from '@/lib/utils'

interface FilterChipsProps {
  tags: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  className?: string
}

export function FilterChips({
  tags,
  selected,
  onChange,
  className,
}: FilterChipsProps) {
  function toggle(tag: string) {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag))
    } else {
      onChange([...selected, tag])
    }
  }

  if (tags.length === 0) return null

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => {
        const active = selected.includes(tag)
        return (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className={cn(
              'min-h-[36px] rounded-full px-3 py-1 text-xs font-medium transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80',
            )}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
