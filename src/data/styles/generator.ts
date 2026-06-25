import type { StyleItem } from '@/types/catalog'
import { baseStyles } from './baseStyles'
import { curatedStyles } from './curatedStyles'

const CATEGORIES = [
  { key: 'modern', zh: '现代风格', en: 'Modern', tags: ['modern', 'clean'] },
  { key: 'retro', zh: '复古风格', en: 'Retro', tags: ['retro', 'vintage'] },
  { key: 'nature', zh: '自然风格', en: 'Nature', tags: ['nature', 'organic'] },
  { key: 'corporate', zh: '商务风格', en: 'Corporate', tags: ['corporate', 'professional'] },
  { key: 'creative', zh: '创意风格', en: 'Creative', tags: ['creative', 'artistic'] },
  { key: 'neon', zh: '霓虹风格', en: 'Neon', tags: ['neon', 'cyber'] },
  { key: 'soft', zh: '柔和风格', en: 'Soft', tags: ['soft', 'pastel'] },
  { key: 'bold', zh: '大胆风格', en: 'Bold', tags: ['bold', 'contrast'] },
  { key: 'mono', zh: '单色风格', en: 'Monochrome', tags: ['mono', 'minimal'] },
  { key: 'warm', zh: '暖色风格', en: 'Warm', tags: ['warm', 'cozy'] },
  { key: 'cool', zh: '冷色风格', en: 'Cool', tags: ['cool', 'calm'] },
  { key: 'luxury', zh: '奢华风格', en: 'Luxury', tags: ['luxury', 'premium'] },
] as const

const FONTS = [
  'system-ui, sans-serif',
  'Georgia, serif',
  "'Courier New', monospace",
  'Inter, system-ui, sans-serif',
  'ui-monospace, monospace',
  '"Segoe UI", sans-serif',
]

const RADII = ['0px', '4px', '8px', '12px', '16px', '20px', '999px']

function hsl(h: number, s: number, l: number): string {
  return `hsl(${Math.round(h)} ${s}% ${l}%)`
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function buildPrompt(style: StyleItem, locale: 'zh-CN' | 'en-US'): string {
  const title = style.title[locale]
  const tokens = style.tokens
  if (locale === 'zh-CN') {
    return `生成「${title}」风格 UI：

主色：${tokens['--sc-primary']}，背景：${tokens['--sc-bg']}
文字：${tokens['--sc-fg']}，次要：${tokens['--sc-muted-fg']}
圆角：${tokens['--sc-radius']}，阴影：${tokens['--sc-shadow']}
字体：${tokens['--sc-font']}
标签：${style.tags.join(', ')}
要求：TypeScript strict、响应式、无障碍 ARIA。`
  }
  return `Generate "${title}" style UI:

Primary: ${tokens['--sc-primary']}, Background: ${tokens['--sc-bg']}
Text: ${tokens['--sc-fg']}, Muted: ${tokens['--sc-muted-fg']}
Radius: ${tokens['--sc-radius']}, Shadow: ${tokens['--sc-shadow']}
Font: ${tokens['--sc-font']}
Tags: ${style.tags.join(', ')}
Requirements: TypeScript strict, responsive, accessible ARIA.`
}

function generateVariant(index: number): StyleItem {
  const cat = CATEGORIES[index % CATEGORIES.length]
  const hue = (index * 137.508) % 360
  const isDark = index % 3 !== 0
  const sat = 45 + (index % 5) * 8
  const radius = RADII[index % RADII.length]
  const font = FONTS[index % FONTS.length]
  const variantNum = index + 1

  const bg = isDark ? hsl(hue, sat, 12) : hsl(hue, sat - 10, 97)
  const fg = isDark ? hsl(hue, 20, 95) : hsl(hue, sat, 15)
  const primary = hsl(hue, sat + 15, isDark ? 65 : 45)
  const primaryFg = isDark ? hsl(hue, sat, 10) : '#ffffff'
  const muted = isDark ? hsl(hue, sat - 5, 18) : hsl(hue, sat - 15, 92)
  const mutedFg = isDark ? hsl(hue, 15, 70) : hsl(hue, sat - 20, 40)
  const border = isDark ? hsl(hue, sat - 10, 28) : hsl(hue, sat - 25, 85)

  const shadowStyle = index % 7 === 0 ? 'none' : index % 7 === 1
    ? `4px 4px 0 ${isDark ? '#000' : hsl(hue, sat, 30)}`
    : `0 ${4 + (index % 4)}px ${12 + (index % 8)}px rgba(0,0,0,${isDark ? 0.35 : 0.12})`

  const nameZh = `${cat.zh} ${variantNum}`
  const nameEn = `${cat.en} ${variantNum}`
  const id = `style-${cat.key}-${variantNum}`

  const style: StyleItem = {
    id,
    slug: slugify(id),
    kind: 'style',
    category: cat.key,
    status: 'ready',
    title: { 'zh-CN': nameZh, 'en-US': nameEn },
    description: {
      'zh-CN': `${cat.zh}变体 — 色相 ${Math.round(hue)}°，${isDark ? '深色' : '浅色'}主题。`,
      'en-US': `${cat.en} variant — hue ${Math.round(hue)}°, ${isDark ? 'dark' : 'light'} theme.`,
    },
    tags: [...cat.tags, isDark ? 'dark' : 'light', `hue-${Math.round(hue)}`],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': bg,
      '--sc-fg': fg,
      '--sc-primary': primary,
      '--sc-primary-fg': primaryFg,
      '--sc-muted': muted,
      '--sc-muted-fg': mutedFg,
      '--sc-border': border,
      '--sc-radius': radius,
      '--sc-shadow': shadowStyle,
      '--sc-font': font,
    },
    prompt: { 'zh-CN': '', 'en-US': '' },
  }

  style.prompt = {
    'zh-CN': buildPrompt(style, 'zh-CN'),
    'en-US': buildPrompt(style, 'en-US'),
  }

  return style
}

/**
 * Detailed curated styles lead the catalog, followed by the hand-crafted base
 * styles, then programmatic palette variants for breadth.
 */
const PALETTE_VARIANT_COUNT = 60

export function generateAllStyles(): StyleItem[] {
  const generated = Array.from({ length: PALETTE_VARIANT_COUNT }, (_, i) => generateVariant(i))
  return [...curatedStyles, ...baseStyles, ...generated]
}

export const generatedStyles = generateAllStyles()

export function buildStyleRegistry() {
  const categories: Record<string, { name: { 'zh-CN': string; 'en-US': string }; key: string; items: string[] }> = {
    signature: {
      name: { 'zh-CN': '精选风格', 'en-US': 'Signature Styles' },
      key: 'signature',
      items: curatedStyles.map((s) => s.id),
    },
    core: {
      name: { 'zh-CN': '核心设计系统', 'en-US': 'Core Design Systems' },
      key: 'core',
      items: baseStyles.map((s) => s.id),
    },
  }

  for (const cat of CATEGORIES) {
    categories[cat.key] = {
      name: { 'zh-CN': cat.zh, 'en-US': cat.en },
      key: cat.key,
      items: generatedStyles.filter((s) => s.category === cat.key).map((s) => s.id),
    }
  }

  return { version: '2.0.0', categories }
}
