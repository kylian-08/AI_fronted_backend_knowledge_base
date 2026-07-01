import type { StyleItem } from '@/types/catalog'

export type StyleBucket = 'signature' | 'core' | 'variant' | 'imported'

export const STYLE_BUCKET_META: Record<
  StyleBucket,
  { 'zh-CN': string; 'en-US': string }
> = {
  signature: { 'zh-CN': '精选', 'en-US': 'Signature' },
  core: { 'zh-CN': '核心', 'en-US': 'Core' },
  variant: { 'zh-CN': '变体', 'en-US': 'Variants' },
  imported: { 'zh-CN': '已导入', 'en-US': 'Imported' },
}

export function getStyleBucket(style: StyleItem): StyleBucket {
  if (style.source === 'imported' || style.category === 'imported') return 'imported'
  if (style.category === 'signature') return 'signature'
  if (style.category === 'core') return 'core'
  return 'variant'
}

export function styleMatchesBucket(style: StyleItem, bucket: StyleBucket | null): boolean {
  if (!bucket) return true
  return getStyleBucket(style) === bucket
}
