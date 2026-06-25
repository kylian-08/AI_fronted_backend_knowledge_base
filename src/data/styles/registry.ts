import type { StyleItem } from '@/types/catalog'
import { generatedStyles, buildStyleRegistry } from './generator'

const IMPORT_KEY = 'prompt-assistant-imported-styles'

export const styleRegistry = buildStyleRegistry()

let importedStyles: StyleItem[] = []

function loadImported(): StyleItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(IMPORT_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as { styles?: StyleItem[] }
    return Array.isArray(parsed.styles) ? parsed.styles : []
  } catch {
    return []
  }
}

function saveImported(styles: StyleItem[]) {
  importedStyles = styles
  if (typeof window !== 'undefined') {
    localStorage.setItem(IMPORT_KEY, JSON.stringify({ version: '1.0', styles }))
  }
}

/** Bundled 100 styles */
export const bundledStyles: StyleItem[] = generatedStyles

export function getImportedStyles(): StyleItem[] {
  if (importedStyles.length === 0) importedStyles = loadImported()
  return importedStyles
}

export function getAllStylesList(): StyleItem[] {
  const imported = getImportedStyles()
  const bundledIds = new Set(bundledStyles.map((s) => s.id))
  const uniqueImported = imported.filter((s) => !bundledIds.has(s.id))
  return [...bundledStyles, ...uniqueImported]
}

export function getStyleById(id: string): StyleItem | undefined {
  return getAllStylesList().find((s) => s.id === id || s.slug === id)
}

export function importStylesFromJson(json: unknown): { ok: boolean; count: number; error?: string } {
  try {
    let incoming: StyleItem[] = []
    if (Array.isArray(json)) {
      incoming = json as StyleItem[]
    } else if (json && typeof json === 'object' && 'styles' in json) {
      incoming = (json as { styles: StyleItem[] }).styles
    } else {
      return { ok: false, count: 0, error: 'Invalid format: expected { styles: [...] } or array' }
    }

    const validated = incoming.filter(
      (s) => s.id && s.title && s.tokens && s.prompt,
    ) as StyleItem[]

    if (validated.length === 0) {
      return { ok: false, count: 0, error: 'No valid styles found' }
    }

    const existing = getImportedStyles()
    const map = new Map(existing.map((s) => [s.id, s]))
    validated.forEach((s) => {
      map.set(s.id, { ...s, kind: 'style', status: s.status ?? 'ready', source: 'imported' })
    })
    saveImported(Array.from(map.values()))
    return { ok: true, count: validated.length }
  } catch {
    return { ok: false, count: 0, error: 'Failed to parse JSON' }
  }
}

export function exportImportedStyles(): string {
  return JSON.stringify({ version: '1.0', styles: getImportedStyles() }, null, 2)
}

/** @deprecated use getAllStylesList */
export const styles = bundledStyles
