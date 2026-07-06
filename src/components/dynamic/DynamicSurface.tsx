import { useRef } from 'react'
import type { ReactNode, MouseEvent } from 'react'
import type { DynamicEffectKey } from '@/types/catalog'
import { DynamicBackground } from './DynamicBackground'
import { isInteractiveEffect } from '@/lib/dynamic/effects'

interface DynamicSurfaceProps {
  effect?: DynamicEffectKey
  tokens: Record<string, string>
  children: ReactNode
  className?: string
}

/**
 * Wraps showcase content with an ambient Dynamic Style background. The
 * overlay is `pointer-events: none` and z-indexed behind `children`, so it
 * never intercepts clicks/hover on the real content — mouse tracking for the
 * `cursor-glow` effect instead listens on this wrapper (which does receive
 * events) and pushes the pointer position into the overlay via CSS vars, so
 * it works even though the overlay itself ignores pointer events.
 */
export function DynamicSurface({ effect, tokens, children, className }: DynamicSurfaceProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const interactive = isInteractiveEffect(effect)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!interactive || !overlayRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100
    const y = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 100
    overlayRef.current.style.setProperty('--dyn-x', `${x}%`)
    overlayRef.current.style.setProperty('--dyn-y', `${y}%`)
  }

  if (!effect) return <>{children}</>

  return (
    <div
      className={`relative${className ? ` ${className}` : ''}`}
      onMouseMove={interactive ? handleMouseMove : undefined}
    >
      <DynamicBackground ref={overlayRef} effect={effect} tokens={tokens} />
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}
