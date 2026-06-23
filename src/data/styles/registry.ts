import type { StyleItem } from '@/types/catalog'

export const styleRegistry = {
  version: '1.0.0',
  categories: {
    core: {
      name: { 'zh-CN': '核心设计系统', 'en-US': 'Core Design Systems' },
      key: 'core',
      items: ['minimalism', 'glassmorphism', 'neoBrutalism', 'materialDesign', 'darkMode'],
    },
  },
} as const

export const styles: StyleItem[] = [
  {
    id: 'minimalism',
    slug: 'minimalism',
    kind: 'style',
    category: 'core',
    status: 'ready',
    title: { 'zh-CN': '极简主义', 'en-US': 'Minimalism' },
    description: {
      'zh-CN': '大量留白、克制配色、清晰层级，去除一切装饰性元素。',
      'en-US': 'Generous whitespace, restrained palette, clear hierarchy, no decorative clutter.',
    },
    tags: ['minimal', 'clean', 'light'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#ffffff',
      '--sc-fg': '#111827',
      '--sc-primary': '#111827',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': '#f3f4f6',
      '--sc-muted-fg': '#6b7280',
      '--sc-border': '#e5e7eb',
      '--sc-radius': '4px',
      '--sc-shadow': 'none',
      '--sc-font': 'system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成极简主义风格 UI：

视觉意图：安静、中性、大量留白。无阴影，仅用细线分隔。
配色：白底 #FFFFFF，文字 #111827，次要文字 #6B7280。
圆角：4px，按钮实心黑底白字。
排版：标题 font-semibold，正文 text-sm，行高宽松。
禁止：渐变、玻璃效果、重阴影、装饰性图标背景。`,
      'en-US': `Generate a Minimalism UI:

Visual intent: quiet, neutral, generous whitespace. No shadows, subtle dividers only.
Colors: white #FFFFFF background, text #111827, muted #6B7280.
Radius: 4px. Buttons: solid black fill, white label.
Typography: semibold headings, text-sm body, relaxed line-height.
Avoid: gradients, glass effects, heavy shadows, decorative icon backgrounds.`,
    },
  },
  {
    id: 'glassmorphism',
    slug: 'glassmorphism',
    kind: 'style',
    category: 'core',
    status: 'ready',
    title: { 'zh-CN': '玻璃拟态', 'en-US': 'Glassmorphism' },
    description: {
      'zh-CN': '半透明磨砂玻璃、柔和光晕、层次分明的浮动卡片。',
      'en-US': 'Frosted glass surfaces, soft glow, layered floating cards.',
    },
    tags: ['glass', 'modern', 'blur'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      '--sc-fg': '#ffffff',
      '--sc-primary': 'rgba(255,255,255,0.25)',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': 'rgba(255,255,255,0.1)',
      '--sc-muted-fg': 'rgba(255,255,255,0.7)',
      '--sc-border': 'rgba(255,255,255,0.2)',
      '--sc-radius': '16px',
      '--sc-shadow': '0 8px 32px rgba(0,0,0,0.2)',
      '--sc-font': 'system-ui, sans-serif',
      '--sc-backdrop': 'blur(12px)',
    },
    prompt: {
      'zh-CN': `生成玻璃拟态风格 UI：

视觉意图：半透明磨砂卡片浮于渐变背景之上。
背景：135deg 渐变 #667eea → #764ba2。
卡片：backdrop-blur(12px)，背景 rgba(255,255,255,0.15)，边框 1px rgba(255,255,255,0.2)。
圆角：16px。阴影：0 8px 32px rgba(0,0,0,0.2)。
文字：白色，次要文字 opacity 0.7。`,
      'en-US': `Generate Glassmorphism UI:

Visual intent: frosted glass cards floating over a gradient background.
Background: 135deg gradient #667eea → #764ba2.
Cards: backdrop-blur(12px), bg rgba(255,255,255,0.15), border 1px rgba(255,255,255,0.2).
Radius: 16px. Shadow: 0 8px 32px rgba(0,0,0,0.2).
Text: white, secondary at 0.7 opacity.`,
    },
  },
  {
    id: 'neoBrutalism',
    slug: 'neo-brutalism',
    kind: 'style',
    category: 'core',
    status: 'ready',
    title: { 'zh-CN': '新粗野主义', 'en-US': 'Neo-Brutalism' },
    description: {
      'zh-CN': '粗黑边框、高饱和色块、硬阴影、反精致美学。',
      'en-US': 'Thick black borders, saturated color blocks, hard shadows, anti-polish aesthetic.',
    },
    tags: ['brutal', 'bold', 'playful'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#fef08a',
      '--sc-fg': '#000000',
      '--sc-primary': '#f472b6',
      '--sc-primary-fg': '#000000',
      '--sc-muted': '#fde047',
      '--sc-muted-fg': '#000000',
      '--sc-border': '#000000',
      '--sc-radius': '0px',
      '--sc-shadow': '4px 4px 0 #000000',
      '--sc-font': "'Courier New', monospace",
    },
    prompt: {
      'zh-CN': `生成新粗野主义风格 UI：

视觉意图：大胆、顽皮、反精致。粗黑边框 2-3px，硬阴影 4px 4px 0 #000。
配色：黄底 #FEF08A，粉色按钮 #F472B6，纯黑文字。
圆角：0px。字体：Courier New 等宽。
禁止：渐变、圆角、柔和阴影、细线边框。`,
      'en-US': `Generate Neo-Brutalism UI:

Visual intent: bold, playful, anti-polish. Thick 2-3px black borders, hard shadow 4px 4px 0 #000.
Colors: yellow bg #FEF08A, pink buttons #F472B6, pure black text.
Radius: 0px. Font: Courier New monospace.
Avoid: gradients, rounded corners, soft shadows, thin borders.`,
    },
  },
  {
    id: 'materialDesign',
    slug: 'material-design',
    kind: 'style',
    category: 'core',
    status: 'ready',
    title: { 'zh-CN': 'Material Design', 'en-US': 'Material Design' },
    description: {
      'zh-CN': 'Google Material 3 风格：elevation 阴影、FAB、ripple 动效。',
      'en-US': 'Google Material 3: elevation shadows, FAB, ripple interactions.',
    },
    tags: ['material', 'google', 'elevation'],
    stack: ['React', 'Tailwind CSS', 'MUI'],
    tokens: {
      '--sc-bg': '#fef7ff',
      '--sc-fg': '#1d1b20',
      '--sc-primary': '#6750a4',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': '#e8def8',
      '--sc-muted-fg': '#49454f',
      '--sc-border': '#cac4d0',
      '--sc-radius': '12px',
      '--sc-shadow': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      '--sc-font': 'Roboto, system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成 Material Design 3 风格 UI：

主色：#6750A4（Primary），表面 #FEF7FF。
圆角：12px 容器，28px FAB。
Elevation：卡片 shadow-md，悬停 elevation+1。
交互：ripple 点击反馈，状态层 opacity 叠加。
字体：Roboto，标题 Medium 权重。`,
      'en-US': `Generate Material Design 3 UI:

Primary: #6750A4, surface #FEF7FF.
Radius: 12px containers, 28px FAB.
Elevation: card shadow-md, hover elevation+1.
Interaction: ripple on press, state-layer opacity overlay.
Font: Roboto, Medium weight headings.`,
    },
  },
  {
    id: 'darkMode',
    slug: 'dark-mode',
    kind: 'style',
    category: 'core',
    status: 'ready',
    title: { 'zh-CN': '深色模式', 'en-US': 'Dark Mode' },
    description: {
      'zh-CN': '深色背景、低对比柔光、护眼配色，适合夜间使用。',
      'en-US': 'Dark backgrounds, low-contrast soft glow, eye-friendly palette for night use.',
    },
    tags: ['dark', 'night', 'contrast'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#0f172a',
      '--sc-fg': '#f1f5f9',
      '--sc-primary': '#818cf8',
      '--sc-primary-fg': '#0f172a',
      '--sc-muted': '#1e293b',
      '--sc-muted-fg': '#94a3b8',
      '--sc-border': '#334155',
      '--sc-radius': '8px',
      '--sc-shadow': '0 4px 6px rgba(0,0,0,0.4)',
      '--sc-font': 'system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成深色模式 UI：

背景：#0F172A，卡片 #1E293B，边框 #334155。
主色：#818CF8（indigo-400），主色文字 #0F172A。
文字：主 #F1F5F9，次 #94A3B8。
圆角：8px。阴影：深色半透明。
确保对比度 WCAG AA，避免纯黑 #000 背景。`,
      'en-US': `Generate Dark Mode UI:

Background: #0F172A, cards #1E293B, borders #334155.
Primary: #818CF8 (indigo-400), on-primary #0F172A.
Text: primary #F1F5F9, secondary #94A3B8.
Radius: 8px. Shadows: dark semi-transparent.
Ensure WCAG AA contrast, avoid pure #000 backgrounds.`,
    },
  },
]

export function getStyleById(id: string): StyleItem | undefined {
  return styles.find((s) => s.id === id || s.slug === id)
}
