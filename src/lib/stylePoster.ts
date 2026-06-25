import type { StyleItem } from '@/types/catalog'

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function resolveBg(tokens: Record<string, string>): { fill: string; defs: string } {
  const bg = tokens['--sc-bg'] ?? '#ffffff'
  const grad = bg.match(/linear-gradient\(([^,]+),\s*(.+)\)/)
  if (grad) {
    const stops = grad[2]
      .split(/,(?![^(]*\))/)
      .map((part, i, arr) => {
        const m = part.trim().match(/(.+?)\s+(\d+%)$/)
        const color = m ? m[1] : part.trim()
        const offset = m ? m[2] : `${(i / Math.max(1, arr.length - 1)) * 100}%`
        return `<stop offset="${offset}" stop-color="${esc(color)}" />`
      })
      .join('')
    const defs = `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">${stops}</linearGradient>`
    return { fill: 'url(#bg)', defs }
  }
  return { fill: esc(bg), defs: '' }
}

/** Build an SVG poster (mock UI) from a style's design tokens. */
export function styleToSvg(style: StyleItem, width = 640, height = 400): string {
  const t = style.tokens
  const { fill, defs } = resolveBg(t)
  const fg = t['--sc-fg'] ?? '#111'
  const primary = t['--sc-primary'] ?? '#4f46e5'
  const primaryFg = t['--sc-primary-fg'] ?? '#fff'
  const muted = t['--sc-muted'] ?? '#f3f4f6'
  const mutedFg = t['--sc-muted-fg'] ?? '#6b7280'
  const border = t['--sc-border'] ?? '#e5e7eb'
  const radius = Math.min(28, parseInt(t['--sc-radius'] ?? '12', 10) || 12)
  const font = (t['--sc-font'] ?? 'system-ui, sans-serif').replace(/"/g, "'")
  const title = style.title['zh-CN']
  const titleEn = style.title['en-US']
  const isGlass = Boolean(t['--sc-backdrop'])
  const glassFilter = isGlass ? 'filter="url(#blur)"' : ''

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="${esc(font)}">
  <defs>
    ${defs}
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0" /></filter>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="6" stdDeviation="10" flood-opacity="0.18" /></filter>
  </defs>
  <rect width="${width}" height="${height}" fill="${fill}" />
  <text x="40" y="56" fill="${esc(fg)}" font-size="30" font-weight="700">${esc(title)}</text>
  <text x="40" y="84" fill="${esc(mutedFg)}" font-size="15">${esc(titleEn)}</text>

  <g transform="translate(40,120)" ${glassFilter}>
    <rect width="270" height="150" rx="${radius}" fill="${esc(muted)}" stroke="${esc(border)}" filter="url(#shadow)" />
    <text x="24" y="44" fill="${esc(fg)}" font-size="18" font-weight="600">Card 卡片</text>
    <text x="24" y="74" fill="${esc(mutedFg)}" font-size="13">Unified showcase surface.</text>
    <rect x="24" y="96" width="130" height="38" rx="${Math.min(radius, 19)}" fill="${esc(primary)}" stroke="${esc(border)}" />
    <text x="89" y="120" fill="${esc(primaryFg)}" font-size="14" font-weight="600" text-anchor="middle">Primary</text>
  </g>

  <g transform="translate(330,120)" ${glassFilter}>
    <rect width="270" height="150" rx="${radius}" fill="${esc(muted)}" stroke="${esc(border)}" filter="url(#shadow)" />
    <rect x="24" y="26" width="222" height="34" rx="${Math.min(radius, 12)}" fill="${fill}" stroke="${esc(border)}" />
    <text x="38" y="48" fill="${esc(mutedFg)}" font-size="13">you@example.com</text>
    <rect x="24" y="74" width="222" height="34" rx="${Math.min(radius, 12)}" fill="${fill}" stroke="${esc(border)}" />
    <rect x="24" y="118" width="100" height="14" rx="7" fill="${esc(primary)}" />
    <rect x="134" y="118" width="60" height="14" rx="7" fill="${esc(border)}" />
  </g>

  <g transform="translate(40,300)">
    <rect width="560" height="60" rx="${radius}" fill="${esc(muted)}" stroke="${esc(border)}" opacity="0.92" />
    <circle cx="36" cy="30" r="12" fill="${esc(primary)}" />
    <text x="60" y="35" fill="${esc(fg)}" font-size="15" font-weight="600">Brand</text>
    <text x="360" y="35" fill="${esc(mutedFg)}" font-size="13">Home</text>
    <text x="430" y="35" fill="${esc(mutedFg)}" font-size="13">Docs</text>
    <text x="500" y="35" fill="${esc(mutedFg)}" font-size="13">About</text>
  </g>
</svg>`
}

export function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

/** Reference image for a style: explicit referenceImage wins, else a generated poster. */
export function styleReferenceSrc(style: StyleItem): string {
  if (style.referenceImage) return style.referenceImage
  return svgToDataUri(styleToSvg(style))
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/** Render the reference image to a PNG blob (rasterized via canvas). */
export async function styleReferenceToPngBlob(style: StyleItem): Promise<Blob | null> {
  try {
    const src = styleReferenceSrc(style)
    const img = await loadImage(src)
    const w = img.naturalWidth || 640
    const h = img.naturalHeight || 400
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.drawImage(img, 0, 0, w, h)
    return await new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/png'))
  } catch {
    return null
  }
}

/** Copy the style's reference image to the clipboard as a PNG. */
export async function copyStyleReferenceImage(style: StyleItem): Promise<boolean> {
  try {
    const blob = await styleReferenceToPngBlob(style)
    if (!blob) return false
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      return true
    }
    return false
  } catch {
    return false
  }
}

/** Download the reference image as a PNG file (fallback / explicit export). */
export async function downloadStyleReferenceImage(style: StyleItem): Promise<void> {
  const blob = await styleReferenceToPngBlob(style)
  if (!blob) return
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${style.slug || style.id}-reference.png`
  a.click()
  URL.revokeObjectURL(url)
}
