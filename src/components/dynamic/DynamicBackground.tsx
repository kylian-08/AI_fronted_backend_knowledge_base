import { forwardRef } from 'react'
import type { CSSProperties } from 'react'
import type { DynamicEffectKey } from '@/types/catalog'
import { ParticleNetworkCanvas, StarfieldCanvas, MatrixRainCanvas } from './canvasEffects'

interface DynamicBackgroundProps {
  effect?: DynamicEffectKey
  tokens: Record<string, string>
  className?: string
}

/** Picks 3 accent colors out of a style's tokens for the ambient effect to use. */
function pickAccentColors(tokens: Record<string, string>): [string, string, string] {
  const primary = tokens['--sc-primary'] || '#6366f1'
  const secondary = tokens['--sc-muted-fg'] || tokens['--sc-border'] || '#a855f7'
  const tertiary = tokens['--sc-fg'] || tokens['--sc-primary-fg'] || '#22d3ee'
  return [safeColor(primary), safeColor(secondary), safeColor(tertiary)]
}

/** Effects only support solid colors; gradients/vars are swapped for a sane fallback. */
function safeColor(value: string): string {
  if (value.startsWith('#') || value.startsWith('rgb')) return value
  return '#8b5cf6'
}

/**
 * Renders the ambient background layer for a Dynamic Style. Sits absolutely
 * behind real content (z-index 0) inside a `position: relative` ancestor —
 * see `DynamicSurface`, which also wires up pointer tracking for the
 * `cursor-glow` interactive effect via the forwarded ref.
 */
export const DynamicBackground = forwardRef<HTMLDivElement, DynamicBackgroundProps>(
  function DynamicBackground({ effect, tokens, className }, ref) {
    if (!effect) return null
    const [a, b, c] = pickAccentColors(tokens)
    const vars = { '--dyn-a': a, '--dyn-b': b, '--dyn-c': c } as CSSProperties
    const cls = (name: string) => `dyn-layer ${name}${className ? ` ${className}` : ''}`

    switch (effect) {
      case 'aurora':
        return <div ref={ref} className={cls('dyn-aurora')} style={vars} />
      case 'mesh':
        return (
          <div ref={ref} className={cls('dyn-mesh')} style={vars}>
            <span />
            <span />
            <span />
          </div>
        )
      case 'pulse-glow':
        return <div ref={ref} className={cls('dyn-pulse-glow')} style={vars} />
      case 'shimmer':
        return <div ref={ref} className={cls('dyn-shimmer')} style={vars} />
      case 'scanlines':
        return <div ref={ref} className={cls('dyn-scanlines')} style={vars} />
      case 'grid-pulse':
        return <div ref={ref} className={cls('dyn-grid')} style={vars} />
      case 'neon-flicker':
        return <div ref={ref} className={cls('dyn-neon')} style={vars} />
      case 'blob-morph':
        return (
          <div ref={ref} className={cls('dyn-blob')} style={vars}>
            <span />
          </div>
        )
      case 'wave':
        return (
          <div ref={ref} className={cls('')} style={vars}>
            <div className="dyn-wave-track">
              <WaveSvg color={a} />
              <WaveSvg color={a} />
            </div>
          </div>
        )
      case 'cursor-glow':
        return <div ref={ref} className={cls('dyn-cursor-glow')} style={vars} />
      case 'particle-network':
        return <ParticleNetworkCanvas colors={[a, b]} className={className} />
      case 'starfield':
        return <StarfieldCanvas colors={[a, b]} className={className} />
      case 'matrix-rain':
        return <MatrixRainCanvas colors={[a, b]} className={className} />
      default:
        return null
    }
  },
)

function WaveSvg({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden>
      <path
        d="M0 30 C 25 10, 45 50, 70 30 S 120 10, 140 30 S 190 50, 200 30 L 200 60 L 0 60 Z"
        fill={color}
        opacity={0.45}
      />
    </svg>
  )
}
