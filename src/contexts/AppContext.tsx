import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Locale, StyleItem, ComponentItem } from '@/types/catalog'
import { getLocale, setLocale as persistLocale, localized } from '@/lib/i18n'
import { messages, type MessageKey } from '@/lib/messages'
import {
  applyStyleToApp,
  getAppliedStyleId,
  resetAppTheme,
  restoreAppliedTheme,
} from '@/lib/themeApplier'
import {
  getAllStylesList,
  getStyleById,
  importStylesFromJson,
  exportImportedStyles,
} from '@/data/styles/registry'
import {
  getAllComponentsList,
  importComponentsFromJson,
  exportImportedComponents,
} from '@/data/components/registry'
import { resolveMotionPresetKey, type MotionPresetKey } from '@/lib/motion/presets'

/** Default showcase tokens matching the app's built-in dark theme. */
export const DEFAULT_SC_TOKENS: Record<string, string> = {
  '--sc-bg': '#0f172a',
  '--sc-bg-fallback': '#0f172a',
  '--sc-fg': '#f8fafc',
  '--sc-primary': '#6366f1',
  '--sc-primary-fg': '#ffffff',
  '--sc-muted': '#1e293b',
  '--sc-muted-fg': '#94a3b8',
  '--sc-border': '#334155',
  '--sc-radius': '8px',
  '--sc-shadow': '0 4px 12px rgba(0,0,0,0.3)',
  '--sc-font': 'Inter, system-ui, sans-serif',
}

interface AppContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: MessageKey, vars?: Record<string, string | number>) => string
  tr: (obj: { 'zh-CN': string; 'en-US': string }) => string
  appliedStyleId: string | null
  applyStyle: (style: StyleItem) => void
  resetTheme: () => void
  importStyles: (json: unknown) => { ok: boolean; count: number; error?: string }
  exportStyles: () => string
  importComponents: (json: unknown) => { ok: boolean; count: number; error?: string }
  exportComponents: () => string
  allStyles: StyleItem[]
  allComponents: ComponentItem[]
  refreshStyles: () => void
  refreshComponents: () => void
  /** Design tokens of the currently applied style (or the default theme). */
  activeTokens: Record<string, string>
  /** Motion "personality" of the currently applied style (or 'none'). */
  activeMotionPreset: MotionPresetKey
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getLocale)
  const [appliedStyleId, setAppliedStyleId] = useState<string | null>(getAppliedStyleId)
  const [styleVersion, setStyleVersion] = useState(0)
  const [componentVersion, setComponentVersion] = useState(0)

  useEffect(() => {
    restoreAppliedTheme(getStyleById)
    setAppliedStyleId(getAppliedStyleId())
  }, [])

  const setLocale = useCallback((loc: Locale) => {
    persistLocale(loc)
    setLocaleState(loc)
  }, [])

  const t = useCallback(
    (key: MessageKey, vars?: Record<string, string | number>): string => {
      let text: string = messages[key][locale] ?? messages[key]['zh-CN']
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v))
        })
      }
      return text
    },
    [locale],
  )

  const tr = useCallback(
    (obj: { 'zh-CN': string; 'en-US': string }) => localized(obj, locale),
    [locale],
  )

  const applyStyle = useCallback((style: StyleItem) => {
    applyStyleToApp(style)
    setAppliedStyleId(style.id)
  }, [])

  const resetTheme = useCallback(() => {
    resetAppTheme()
    setAppliedStyleId(null)
  }, [])

  const importStyles = useCallback((json: unknown) => {
    const result = importStylesFromJson(json)
    if (result.ok) setStyleVersion((v) => v + 1)
    return result
  }, [])

  const importComponents = useCallback((json: unknown) => {
    const result = importComponentsFromJson(json)
    if (result.ok) setComponentVersion((v) => v + 1)
    return result
  }, [])

  const refreshStyles = useCallback(() => setStyleVersion((v) => v + 1), [])
  const refreshComponents = useCallback(() => setComponentVersion((v) => v + 1), [])

  const allStyles = useMemo(() => {
    void styleVersion
    return getAllStylesList()
  }, [styleVersion])

  const allComponents = useMemo(() => {
    void componentVersion
    return getAllComponentsList()
  }, [componentVersion])

  const appliedStyle = useMemo(() => {
    void styleVersion
    return appliedStyleId ? getStyleById(appliedStyleId) : undefined
  }, [appliedStyleId, styleVersion])

  const activeTokens = useMemo(() => appliedStyle?.tokens ?? DEFAULT_SC_TOKENS, [appliedStyle])

  const activeMotionPreset = useMemo(() => resolveMotionPresetKey(appliedStyle), [appliedStyle])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      tr,
      appliedStyleId,
      applyStyle,
      resetTheme,
      importStyles,
      exportStyles: exportImportedStyles,
      importComponents,
      exportComponents: exportImportedComponents,
      allStyles,
      allComponents,
      refreshStyles,
      refreshComponents,
      activeTokens,
      activeMotionPreset,
    }),
    [locale, setLocale, t, tr, appliedStyleId, applyStyle, resetTheme, importStyles, importComponents, allStyles, allComponents, refreshStyles, refreshComponents, activeTokens, activeMotionPreset],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
