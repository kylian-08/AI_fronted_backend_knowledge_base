import type { Locale } from '@/types/catalog'

const STORAGE_KEY = 'prompt-assistant-locale'

let currentLocale: Locale = 'zh-CN'

export function getLocale(): Locale {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored === 'zh-CN' || stored === 'en-US') return stored
    const lang = navigator.language
    if (lang.startsWith('zh')) return 'zh-CN'
    return 'en-US'
  }
  return currentLocale
}

export function setLocale(locale: Locale) {
  currentLocale = locale
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, locale)
  }
}

export function t(zh: string, en: string, locale?: Locale): string {
  return (locale ?? getLocale()) === 'zh-CN' ? zh : en
}

export function localized(
  obj: { 'zh-CN': string; 'en-US': string },
  locale?: Locale,
): string {
  const loc = locale ?? getLocale()
  return obj[loc] ?? obj['zh-CN']
}
