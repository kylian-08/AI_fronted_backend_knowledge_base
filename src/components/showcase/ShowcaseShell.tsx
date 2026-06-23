import type { StyleItem } from '@/types/catalog'
import {
  ShowcaseButton,
  ShowcaseCard,
  ShowcaseForm,
  ShowcaseNav,
  ShowcaseTable,
} from '@/components/showcase/slots'
import { cn } from '@/lib/utils'

const SLOTS = [
  { id: 'button', label: 'Button', Component: ShowcaseButton },
  { id: 'card', label: 'Card', Component: ShowcaseCard },
  { id: 'nav', label: 'Navigation', Component: ShowcaseNav },
  { id: 'form', label: 'Form', Component: ShowcaseForm },
  { id: 'table', label: 'Table', Component: ShowcaseTable },
] as const

interface ShowcaseShellProps {
  style: StyleItem
  className?: string
  compact?: boolean
}

export function ShowcaseShell({ style, className, compact }: ShowcaseShellProps) {
  const bg = style.tokens['--sc-bg']
  const isGradient = bg?.startsWith('linear')

  return (
    <div
      className={cn('overflow-hidden rounded-xl border border-border', className)}
      data-style={style.id}
    >
      <div
        style={{
          background: isGradient ? bg : undefined,
          backgroundColor: isGradient ? undefined : bg,
          padding: compact ? '12px' : '20px',
          minHeight: compact ? '200px' : '320px',
        }}
      >
        <div
          className={cn(
            'grid gap-4',
            compact
              ? 'grid-cols-1 sm:grid-flow-col sm:auto-cols-[minmax(200px,1fr)] sm:overflow-x-auto'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {SLOTS.map(({ id, label, Component }) => (
            <div
              key={id}
              className="rounded-lg border border-white/10 bg-black/10 p-3 backdrop-blur-sm"
            >
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/60">
                {label}
              </p>
              <Component tokens={style.tokens} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
