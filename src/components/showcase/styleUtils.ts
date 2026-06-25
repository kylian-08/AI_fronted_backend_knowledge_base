import type { CSSProperties } from 'react'

export function isGlassStyle(tokens: Record<string, string>): boolean {
  return Boolean(tokens['--sc-backdrop'])
}

export function glassSurface(tokens: Record<string, string>): CSSProperties {
  if (!tokens['--sc-backdrop']) return {}
  return {
    backdropFilter: tokens['--sc-backdrop'],
    WebkitBackdropFilter: tokens['--sc-backdrop'],
  }
}
