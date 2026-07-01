import type { ComponentItem, StyleItem } from '@/types/catalog'
import type {
  AgentBrief,
  AgentGenerationContext,
  AgentProvider,
  AgentSectionKind,
  GeneratedSection,
  GeneratedUISpec,
} from '@/types/agent'
import { styleMatchesBucket, type StyleBucket } from '@/lib/styleCatalog'
import { localized } from '@/lib/i18n'

const DEFAULT_SECTIONS: AgentSectionKind[] = [
  'nav',
  'hero',
  'features',
  'pricing',
  'testimonial',
  'form',
  'faq',
  'footer',
]

const SECTION_COMPONENT_CANDIDATES: Record<AgentSectionKind, string[]> = {
  nav: ['navbar', 'sidebar'],
  hero: ['content-card', 'carousel', 'stat-card'],
  features: ['content-card', 'badges', 'accordion'],
  pricing: ['stat-card', 'content-card'],
  testimonial: ['avatar-group', 'content-card'],
  form: ['sign-in-form', 'text-input', 'search-input'],
  faq: ['accordion'],
  footer: ['breadcrumb', 'content-card'],
  custom: ['content-card'],
}

const SECTION_LABELS: Record<AgentSectionKind, { 'zh-CN': string; 'en-US': string }> = {
  nav: { 'zh-CN': '导航栏', 'en-US': 'Navigation' },
  hero: { 'zh-CN': '首屏 Hero', 'en-US': 'Hero' },
  features: { 'zh-CN': '功能亮点', 'en-US': 'Features' },
  pricing: { 'zh-CN': '价格方案', 'en-US': 'Pricing' },
  testimonial: { 'zh-CN': '用户评价', 'en-US': 'Testimonials' },
  form: { 'zh-CN': '表单 / 注册', 'en-US': 'Form / Sign-up' },
  faq: { 'zh-CN': '常见问题', 'en-US': 'FAQ' },
  footer: { 'zh-CN': '页脚', 'en-US': 'Footer' },
  custom: { 'zh-CN': '自定义区块', 'en-US': 'Custom section' },
}

const STYLE_BUCKET_KEYS: StyleBucket[] = ['signature', 'core', 'variant', 'imported']

function scoreStyle(style: StyleItem, brief: AgentBrief): number {
  const haystack = [
    style.title['zh-CN'],
    style.title['en-US'],
    style.description['zh-CN'],
    style.description['en-US'],
    ...style.tags,
  ]
    .join(' ')
    .toLowerCase()

  const keywords = [brief.styleHint, brief.industry, ...(brief.toneKeywords ?? [])]
    .filter((k): k is string => Boolean(k && k.trim()))
    .map((k) => k.toLowerCase())

  let score = 0
  keywords.forEach((k) => {
    if (style.tags.some((tag) => tag.toLowerCase() === k)) score += 2
    else if (haystack.includes(k)) score += 1
  })

  if (brief.styleHint) {
    const bucket = brief.styleHint.toLowerCase()
    if (STYLE_BUCKET_KEYS.includes(bucket as StyleBucket) && styleMatchesBucket(style, bucket as StyleBucket)) {
      score += 3
    }
  }

  return score
}

/** Deterministic pick: same brief always resolves to the same style. */
function pickStyle(brief: AgentBrief, styles: StyleItem[]): StyleItem {
  if (styles.length === 0) throw new Error('No styles available in catalog')
  const scored = styles.map((s) => ({ style: s, score: scoreStyle(s, brief) }))
  const topScore = Math.max(...scored.map((s) => s.score))
  const top = scored.filter((s) => s.score === topScore)
  const seed = Array.from(brief.description).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return top[seed % top.length].style
}

function pickComponent(kind: AgentSectionKind, components: ComponentItem[]): ComponentItem | undefined {
  const candidates = SECTION_COMPONENT_CANDIDATES[kind] ?? []
  for (const id of candidates) {
    const found = components.find((c) => c.id === id)
    if (found) return found
  }
  return components[0]
}

function buildSections(brief: AgentBrief, components: ComponentItem[]): GeneratedSection[] {
  const kinds = brief.sections?.length ? brief.sections : DEFAULT_SECTIONS
  return kinds.map((kind, index) => {
    const component = pickComponent(kind, components)
    const compTitleZh = component ? component.title['zh-CN'] : '内容卡片'
    const compTitleEn = component ? component.title['en-US'] : 'Content Card'
    return {
      id: `${kind}-${index}`,
      kind,
      componentId: component?.id ?? 'content-card',
      title: SECTION_LABELS[kind] ?? SECTION_LABELS.custom,
      rationale: {
        'zh-CN': `根据你的描述匹配到「${compTitleZh}」，用于承载${SECTION_LABELS[kind]?.['zh-CN'] ?? '该区块'}内容。`,
        'en-US': `Matched "${compTitleEn}" for the ${SECTION_LABELS[kind]?.['en-US'] ?? 'section'} based on your brief.`,
      },
    }
  })
}

function buildPrompt(brief: AgentBrief, style: StyleItem, sections: GeneratedSection[]): string {
  const locale = brief.locale
  const lines: string[] = []
  lines.push(
    locale === 'zh-CN'
      ? `# AI Agent 生成的界面方案\n\n产品描述：${brief.description}`
      : `# AI Agent Generated UI Plan\n\nBrief: ${brief.description}`,
  )
  if (brief.brandName) lines.push(`\n${locale === 'zh-CN' ? '品牌' : 'Brand'}: ${brief.brandName}`)
  if (brief.industry) lines.push(`\n${locale === 'zh-CN' ? '行业' : 'Industry'}: ${brief.industry}`)
  lines.push(
    locale === 'zh-CN' ? `\n\n## 匹配风格\n${localized(style.title, locale)}` : `\n\n## Matched Style\n${localized(style.title, locale)}`,
  )
  lines.push(`\n${localized(style.prompt, locale)}`)
  lines.push(locale === 'zh-CN' ? '\n\n## 页面结构' : '\n\n## Page Structure')
  sections.forEach((section, i) => {
    lines.push(`\n${i + 1}. ${localized(section.title, locale)} — ${section.componentId}`)
  })
  lines.push(
    locale === 'zh-CN'
      ? '\n\n## 交付要求\n- TypeScript strict、响应式、无障碍 ARIA\n- 按以上顺序拼装为一个完整落地页\n- 沿用给出的 design tokens 保持视觉一致'
      : '\n\n## Deliverables\n- TypeScript strict, responsive, accessible ARIA\n- Assemble sections above into one landing page\n- Reuse the provided design tokens for visual consistency',
  )
  return lines.join('')
}

/**
 * Offline, deterministic default provider. Requires no API key and works
 * fully client-side by matching the brief against the existing style/component
 * catalog. Ships as the safe default so Agent Studio is usable immediately;
 * swap `providerId` to `remote-llm` once a real backend is configured.
 */
export const localHeuristicAgentProvider: AgentProvider = {
  id: 'local-heuristic',
  label: {
    'zh-CN': '本地启发式（离线，无需 API Key）',
    'en-US': 'Local Heuristic (offline, no API key)',
  },
  isConfigured: () => true,
  async generate(brief: AgentBrief, ctx: AgentGenerationContext): Promise<GeneratedUISpec> {
    const style = pickStyle(brief, ctx.styles)
    const sections = buildSections(brief, ctx.components)
    return {
      id: `spec-${Date.now()}`,
      brief,
      style,
      sections,
      prompt: buildPrompt(brief, style, sections),
      providerId: 'local-heuristic',
      createdAt: new Date().toISOString(),
    }
  },
}
