import type {
  BackendItem,
  ComponentItem,
  Locale,
  StyleItem,
} from '@/types/catalog'
import { localized } from '@/lib/i18n'

export interface ComposerSelection {
  style?: StyleItem
  components: ComponentItem[]
  backend?: BackendItem
}

export function composePrompt(
  selection: ComposerSelection,
  locale: Locale = 'zh-CN',
): string {
  const sections: string[] = []

  sections.push(
    locale === 'zh-CN'
      ? '# 完整项目 AI 提示词\n\n请根据以下约束生成一个完整的前后端项目：\n'
      : '# Full Project AI Prompt\n\nGenerate a complete full-stack project following these constraints:\n',
  )

  if (selection.style) {
    sections.push(
      locale === 'zh-CN' ? '\n## 设计风格\n' : '\n## Design Style\n',
    )
    sections.push(localized(selection.style.title, locale))
    sections.push('\n')
    sections.push(localized(selection.style.prompt, locale))
    sections.push('\n\nDesign tokens:')
    Object.entries(selection.style.tokens).forEach(([key, value]) => {
      sections.push(`\n- ${key}: ${value}`)
    })
  }

  if (selection.components.length > 0) {
    sections.push(
      locale === 'zh-CN' ? '\n\n## UI 组件\n' : '\n\n## UI Components\n',
    )
    selection.components.forEach((comp, i) => {
      sections.push(`\n### ${i + 1}. ${localized(comp.title, locale)}\n`)
      sections.push(localized(comp.prompt, locale))
      if (comp.states?.length) {
        sections.push(
          locale === 'zh-CN'
            ? `\n必须处理的状态: ${comp.states.join(', ')}`
            : `\nRequired states: ${comp.states.join(', ')}`,
        )
      }
    })
  }

  if (selection.backend) {
    sections.push(
      locale === 'zh-CN' ? '\n\n## 后端架构\n' : '\n\n## Backend Architecture\n',
    )
    sections.push(
      `${selection.backend.framework.toUpperCase()} — ${selection.backend.patterns.join(', ')}\n`,
    )
    sections.push(localized(selection.backend.prompt, locale))
  }

  sections.push(
    locale === 'zh-CN'
      ? '\n\n## 交付要求\n- TypeScript strict\n- 响应式布局（mobile-first）\n- 无障碍（ARIA、键盘导航）\n- 完整错误处理与 loading 状态'
      : '\n\n## Deliverables\n- TypeScript strict\n- Responsive mobile-first layout\n- Accessibility (ARIA, keyboard nav)\n- Complete error handling and loading states',
  )

  return sections.join('')
}
