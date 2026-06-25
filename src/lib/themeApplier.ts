import type { StyleItem } from '@/types/catalog'

const APPLIED_KEY = 'prompt-assistant-applied-style'

const DEFAULT_THEME = {
  '--color-background': '#0f172a',
  '--color-foreground': '#f8fafc',
  '--color-card': '#1e293b',
  '--color-card-foreground': '#f1f5f9',
  '--color-primary': '#6366f1',
  '--color-primary-foreground': '#ffffff',
  '--color-muted': '#334155',
  '--color-muted-foreground': '#94a3b8',
  '--color-border': '#334155',
  '--color-accent': '#1e293b',
  '--color-accent-foreground': '#f8fafc',
  '--radius-md': '0.5rem',
}

const GLASS_EXTRA_VARS = ['--app-bg-gradient', '--app-backdrop'] as const

function isGradientBg(bg: string): boolean {
  return bg.startsWith('linear') || bg.startsWith('radial')
}

function isGlassStyle(style: StyleItem): boolean {
  return Boolean(style.tokens['--sc-backdrop'])
}

function clearGlassMode(root: HTMLElement) {
  delete root.dataset.themeMode
  for (const key of GLASS_EXTRA_VARS) {
    root.style.removeProperty(key)
  }
}

function applyGlassTheme(root: HTMLElement, style: StyleItem): void {
  const t = style.tokens
  const gradient = t['--sc-bg'] ?? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

  root.dataset.themeMode = 'glass'
  root.style.setProperty('--app-bg-gradient', gradient)
  root.style.setProperty('--app-backdrop', t['--sc-backdrop'] ?? 'blur(12px)')
  root.style.setProperty('--color-background', t['--sc-bg-fallback'] ?? '#667eea')
  root.style.setProperty('--color-foreground', t['--sc-fg'] ?? '#ffffff')
  root.style.setProperty('--color-card', t['--sc-muted'] ?? 'rgba(255,255,255,0.14)')
  root.style.setProperty('--color-card-foreground', t['--sc-fg'] ?? '#ffffff')
  root.style.setProperty('--color-primary', t['--sc-primary'] ?? 'rgba(255,255,255,0.32)')
  root.style.setProperty('--color-primary-foreground', t['--sc-primary-fg'] ?? '#ffffff')
  root.style.setProperty('--color-muted', t['--sc-muted'] ?? 'rgba(255,255,255,0.10)')
  root.style.setProperty('--color-muted-foreground', t['--sc-muted-fg'] ?? 'rgba(255,255,255,0.75)')
  root.style.setProperty('--color-border', t['--sc-border'] ?? 'rgba(255,255,255,0.22)')
  root.style.setProperty('--color-accent', t['--sc-muted'] ?? 'rgba(255,255,255,0.12)')
  root.style.setProperty('--color-accent-foreground', t['--sc-fg'] ?? '#ffffff')
  root.style.setProperty('--radius-md', t['--sc-radius'] ?? '16px')
}

function applySolidTheme(root: HTMLElement, style: StyleItem): void {
  const t = style.tokens
  const bg = t['--sc-bg'] ?? '#0f172a'

  clearGlassMode(root)
  root.style.setProperty('--color-background', isGradientBg(bg) ? (t['--sc-bg-fallback'] ?? '#667eea') : bg)
  root.style.setProperty('--color-foreground', t['--sc-fg'] ?? '#f8fafc')
  root.style.setProperty('--color-card', t['--sc-muted'] ?? '#1e293b')
  root.style.setProperty('--color-card-foreground', t['--sc-fg'] ?? '#f1f5f9')
  root.style.setProperty('--color-primary', t['--sc-primary'] ?? '#6366f1')
  root.style.setProperty('--color-primary-foreground', t['--sc-primary-fg'] ?? '#fff')
  root.style.setProperty('--color-muted', t['--sc-muted'] ?? '#334155')
  root.style.setProperty('--color-muted-foreground', t['--sc-muted-fg'] ?? '#94a3b8')
  root.style.setProperty('--color-border', t['--sc-border'] ?? '#334155')
  root.style.setProperty('--color-accent', t['--sc-muted'] ?? '#1e293b')
  root.style.setProperty('--color-accent-foreground', t['--sc-fg'] ?? '#f8fafc')
  root.style.setProperty('--radius-md', t['--sc-radius'] ?? '8px')
}

export function applyStyleToApp(style: StyleItem): void {
  const root = document.documentElement

  if (isGlassStyle(style) && isGradientBg(style.tokens['--sc-bg'] ?? '')) {
    applyGlassTheme(root, style)
  } else {
    applySolidTheme(root, style)
  }

  if (style.tokens['--sc-font']) {
    root.style.fontFamily = style.tokens['--sc-font']
  }

  localStorage.setItem(APPLIED_KEY, style.id)
}

export function resetAppTheme(): void {
  const root = document.documentElement
  clearGlassMode(root)
  Object.entries(DEFAULT_THEME).forEach(([k, v]) => root.style.setProperty(k, v))
  root.style.fontFamily = ''
  localStorage.removeItem(APPLIED_KEY)
}

export function getAppliedStyleId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(APPLIED_KEY)
}

export function restoreAppliedTheme(getStyle: (id: string) => StyleItem | undefined): void {
  const id = getAppliedStyleId()
  if (!id) return
  const style = getStyle(id)
  if (style) applyStyleToApp(style)
}
