import type { StyleItem } from '@/types/catalog'
import {
  ShowcaseButton,
  ShowcaseCard,
  ShowcaseForm,
  ShowcaseNav,
  ShowcaseTable,
} from '@/components/showcase/slots'
import { isGlassStyle } from '@/components/showcase/styleUtils'
import { MotionEnter } from '@/components/motion/MotionPrimitives'
import { resolveMotionPresetKey } from '@/lib/motion/presets'
import { DynamicSurface } from '@/components/dynamic/DynamicSurface'
import { cn } from '@/lib/utils'

const ALL_SLOTS = [
  { id: 'button', label: 'Button', Component: ShowcaseButton },
  { id: 'card', label: 'Card', Component: ShowcaseCard },
  { id: 'nav', label: 'Navigation', Component: ShowcaseNav },
  { id: 'form', label: 'Form', Component: ShowcaseForm },
  { id: 'table', label: 'Table', Component: ShowcaseTable },
] as const

const PREVIEW_SLOTS = ALL_SLOTS.slice(0, 2)

interface ShowcaseShellProps {
  style: StyleItem
  className?: string
  compact?: boolean
  /** Card list: button + card only */
  previewOnly?: boolean
}

export function ShowcaseShell({ style, className, compact, previewOnly }: ShowcaseShellProps) {
  const bg = style.tokens['--sc-bg']
  const isGradient = bg?.startsWith('linear') || bg?.startsWith('radial')
  const isGlass = isGlassStyle(style.tokens)
  const slots = previewOnly ? PREVIEW_SLOTS : ALL_SLOTS
  const preset = resolveMotionPresetKey(style)

  return (
    <div
      className={cn(
        previewOnly ? 'rounded-none border-0' : 'overflow-hidden rounded-xl border border-border',
        className,
      )}
      data-style={style.id}
    >
      <div
        style={{
          background: isGradient ? bg : undefined,
          backgroundColor: isGradient ? undefined : bg,
          padding: previewOnly ? '10px' : compact ? '12px' : '20px',
          minHeight: previewOnly ? '140px' : compact ? '200px' : '320px',
          overflow: 'hidden',
        }}
      >
        <DynamicSurface effect={style.dynamicEffect} tokens={style.tokens}>
          <div
            className={cn(
              'grid gap-3',
              previewOnly
                ? 'grid-cols-2'
                : compact
                  ? 'grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {slots.map(({ id, label, Component }, index) => (
              <MotionEnter key={id} preset={preset} delay={index * 0.05}>
                <div
                  className={cn(
                    isGlass
                      ? previewOnly
                        ? 'p-1'
                        : 'p-2'
                      : cn(
                          'rounded-lg border border-white/10 bg-black/10 backdrop-blur-sm',
                          previewOnly ? 'p-2' : 'p-3',
                        ),
                  )}
                >
                  {!previewOnly && (
                    <p
                      className={cn(
                        'mb-2 text-xs font-medium uppercase tracking-wide',
                        !isGlass && 'text-white/60',
                      )}
                      style={isGlass ? { color: style.tokens['--sc-muted-fg'] } : undefined}
                    >
                      {label}
                    </p>
                  )}
                  <Component tokens={style.tokens} compact={previewOnly || compact} preset={preset} />
                </div>
              </MotionEnter>
            ))}
          </div>
        </DynamicSurface>
      </div>
    </div>
  )
}
