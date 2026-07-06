import type { StyleItem } from '@/types/catalog'

const D = (s: Omit<StyleItem, 'kind' | 'status' | 'source' | 'category'>): StyleItem => ({
  ...s,
  kind: 'style',
  status: 'ready',
  source: 'bundled',
  category: 'dynamic',
})

/**
 * Dynamic Styles — UI styles defined by *continuous ambient motion* rather
 * than a static palette. Each entry sets `dynamicEffect`, which
 * `ShowcaseShell` renders as a looping CSS/canvas background behind the
 * preview (see `src/components/dynamic/`). These replace roughly half of
 * the old palette-only variant slots (see `generator.ts`).
 */
export const dynamicStyles: StyleItem[] = [
  D({
    id: 'aurora-borealis-night',
    slug: 'aurora-borealis-night',
    title: { 'zh-CN': '极光之夜', 'en-US': 'Aurora Borealis Night' },
    description: {
      'zh-CN': '深夜天幕上缓缓流动的绿紫极光，呼应星空主题产品或沉浸式落地页。',
      'en-US': 'Slow-drifting green-violet aurora across a midnight sky — great for immersive landing pages.',
    },
    tags: ['dynamic', 'aurora', 'dark', 'space', 'gradient'],
    stack: ['React', 'Tailwind CSS', 'CSS Animation'],
    motionPreset: 'editorial',
    dynamicEffect: 'aurora',
    tokens: {
      '--sc-bg': 'linear-gradient(180deg, #050914 0%, #0a1226 100%)',
      '--sc-bg-fallback': '#050914',
      '--sc-fg': '#eef2ff',
      '--sc-primary': '#34d399',
      '--sc-primary-fg': '#04140d',
      '--sc-muted': 'rgba(255,255,255,0.08)',
      '--sc-muted-fg': '#a5b4d8',
      '--sc-border': 'rgba(255,255,255,0.12)',
      '--sc-radius': '16px',
      '--sc-shadow': '0 20px 60px rgba(0,0,0,0.5)',
      '--sc-font': 'Inter, system-ui, sans-serif',
      '--sc-backdrop': 'blur(16px)',
    },
    prompt: {
      'zh-CN': `生成「极光之夜」动态风格 UI：
- 背景：深夜蓝黑渐变 (#050914 → #0a1226)，叠加缓慢流动的绿-紫-青极光带（linear-gradient 多色，background-size 300%+，12~16s ease-in-out 循环 background-position）
- 卡片：半透明白 rgba(255,255,255,0.08) + blur(16px)，16px 圆角，几乎无描边
- 主色：荧光绿 #34d399；文字 #eef2ff，次要 #a5b4d8
- 动效：极光层需 filter: blur(36px) saturate(150%)，透明度 0.5~0.6，置于内容下层且不可交互
- 要求：TypeScript strict、响应式、无障碍 ARIA、动画使用 prefers-reduced-motion 降级`,
      'en-US': `Design an "Aurora Borealis Night" dynamic UI:
- Background: midnight navy gradient (#050914 → #0a1226) with a slow-drifting green-violet-teal aurora band (multi-stop linear-gradient, 300%+ background-size, 12-16s ease-in-out background-position loop)
- Cards: translucent white rgba(255,255,255,0.08) + blur(16px), 16px radius, near-borderless
- Accent: neon green #34d399; text #eef2ff, secondary #a5b4d8
- Motion: aurora layer needs filter: blur(36px) saturate(150%), opacity 0.5-0.6, behind content and non-interactive
- Respect prefers-reduced-motion; TypeScript strict, responsive, accessible ARIA`,
    },
  }),
  D({
    id: 'solar-aurora-dawn',
    slug: 'solar-aurora-dawn',
    title: { 'zh-CN': '旭日极光', 'en-US': 'Solar Aurora Dawn' },
    description: {
      'zh-CN': '暖橙粉金三色流动光带，明亮日间场景下的活力动态背景。',
      'en-US': 'A warm orange-pink-gold drifting light band for energetic, bright daytime surfaces.',
    },
    tags: ['dynamic', 'aurora', 'light', 'warm', 'gradient'],
    stack: ['React', 'Tailwind CSS', 'CSS Animation'],
    motionPreset: 'bouncy',
    dynamicEffect: 'aurora',
    tokens: {
      '--sc-bg': 'linear-gradient(180deg, #fff7ed 0%, #ffedd5 100%)',
      '--sc-bg-fallback': '#fff7ed',
      '--sc-fg': '#431407',
      '--sc-primary': '#f97316',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': 'rgba(255,255,255,0.7)',
      '--sc-muted-fg': '#9a3412',
      '--sc-border': 'rgba(154,52,18,0.15)',
      '--sc-radius': '18px',
      '--sc-shadow': '0 12px 32px rgba(249,115,22,0.18)',
      '--sc-font': '"Poppins", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成「旭日极光」动态风格 UI：
- 背景：暖白到浅橙渐变 (#fff7ed → #ffedd5)，叠加橙-粉-金流动光带，10~14s 循环
- 卡片：白色半透明 rgba(255,255,255,0.7)，18px 圆角，暖橙投影 0 12px 32px rgba(249,115,22,0.18)
- 主色：活力橙 #f97316；文字 #431407，次要 #9a3412
- 字体：Poppins，圆润友好；按钮/图标使用暖色渐变填充
- 动效：光带透明度 0.4~0.5，需在内容下层，尊重 prefers-reduced-motion`,
      'en-US': `Design a "Solar Aurora Dawn" dynamic UI:
- Background: warm white to light orange gradient (#fff7ed → #ffedd5) with an orange-pink-gold drifting band, 10-14s loop
- Cards: white translucent rgba(255,255,255,0.7), 18px radius, warm shadow 0 12px 32px rgba(249,115,22,0.18)
- Accent: vibrant orange #f97316; text #431407, secondary #9a3412
- Font: Poppins, friendly and round; warm gradient fills on buttons/icons
- Motion: band opacity 0.4-0.5, stays behind content, respect prefers-reduced-motion`,
    },
  }),
  D({
    id: 'nebula-mesh-drift',
    slug: 'nebula-mesh-drift',
    title: { 'zh-CN': '星云漂移', 'en-US': 'Nebula Mesh Drift' },
    description: {
      'zh-CN': '深空紫、品红、青三色模糊光斑缓慢漂移融合，营造星云质感背景。',
      'en-US': 'Three blurred blobs (violet, magenta, cyan) slowly drifting and blending like a nebula.',
    },
    tags: ['dynamic', 'mesh', 'dark', 'space', 'gradient'],
    stack: ['React', 'Tailwind CSS', 'CSS Animation'],
    motionPreset: 'editorial',
    dynamicEffect: 'mesh',
    tokens: {
      '--sc-bg': '#0b0715',
      '--sc-bg-fallback': '#0b0715',
      '--sc-fg': '#f3e8ff',
      '--sc-primary': '#c084fc',
      '--sc-primary-fg': '#1e0b33',
      '--sc-muted': 'rgba(255,255,255,0.06)',
      '--sc-muted-fg': '#c4b5e0',
      '--sc-border': 'rgba(255,255,255,0.1)',
      '--sc-radius': '20px',
      '--sc-shadow': '0 24px 60px rgba(0,0,0,0.55)',
      '--sc-font': 'Inter, system-ui, sans-serif',
      '--sc-backdrop': 'blur(20px)',
    },
    prompt: {
      'zh-CN': `生成「星云漂移」动态风格 UI：
- 背景：纯深紫黑 #0b0715，叠加 3 个大尺寸模糊光斑（紫 #c084fc、品红、青），blur(46px)，各自以不同周期（10~18s）漂移缩放
- 卡片：极低透明度白 rgba(255,255,255,0.06) + blur(20px)，20px 大圆角，几乎无边框
- 主色：淡紫 #c084fc；文字 #f3e8ff，次要 #c4b5e0
- 动效：光斑层 z-index 置于内容之下，不可交互，尊重 prefers-reduced-motion
- 排版：大留白、居中构图，适合作品集/AI 产品官网首屏`,
      'en-US': `Design a "Nebula Mesh Drift" dynamic UI:
- Background: pure deep violet-black #0b0715 with 3 large blurred blobs (violet #c084fc, magenta, cyan), blur(46px), each drifting/scaling on its own 10-18s cycle
- Cards: near-transparent white rgba(255,255,255,0.06) + blur(20px), 20px large radius, near-borderless
- Accent: soft violet #c084fc; text #f3e8ff, secondary #c4b5e0
- Motion: blob layer sits behind content, non-interactive, respect prefers-reduced-motion
- Layout: generous whitespace, centered composition — great for AI product hero sections`,
    },
  }),
  D({
    id: 'pastel-cloud-mesh',
    slug: 'pastel-cloud-mesh',
    title: { 'zh-CN': '云朵渐变', 'en-US': 'Pastel Cloud Mesh' },
    description: {
      'zh-CN': '粉、蓝、薄荷三色柔光斑漂浮，轻盈治愈的浅色渐变背景。',
      'en-US': 'Pink, blue and mint blobs float gently — a soft, calming light gradient backdrop.',
    },
    tags: ['dynamic', 'mesh', 'light', 'pastel', 'gradient'],
    stack: ['React', 'Tailwind CSS', 'CSS Animation'],
    motionPreset: 'editorial',
    dynamicEffect: 'mesh',
    tokens: {
      '--sc-bg': '#fdfcff',
      '--sc-bg-fallback': '#fdfcff',
      '--sc-fg': '#312e4a',
      '--sc-primary': '#a78bfa',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': 'rgba(255,255,255,0.75)',
      '--sc-muted-fg': '#6b7280',
      '--sc-border': 'rgba(167,139,250,0.18)',
      '--sc-radius': '20px',
      '--sc-shadow': '0 16px 40px rgba(167,139,250,0.16)',
      '--sc-font': '"Quicksand", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成「云朵渐变」动态风格 UI：
- 背景：近白 #fdfcff，叠加粉、天蓝、薄荷绿三个柔光斑（blur(46px)，透明度 0.5~0.65），慢速漂浮
- 卡片：白色半透明 rgba(255,255,255,0.75)，20px 圆角，淡紫投影
- 主色：薰衣草紫 #a78bfa；文字 #312e4a
- 字体：Quicksand，圆润轻盈；适合母婴/教育/健康类产品
- 动效：光斑漂浮周期 10~16s，柔和不抢视觉焦点`,
      'en-US': `Design a "Pastel Cloud Mesh" dynamic UI:
- Background: near-white #fdfcff with pink, sky-blue and mint blurred blobs (blur(46px), opacity 0.5-0.65), floating slowly
- Cards: white translucent rgba(255,255,255,0.75), 20px radius, soft violet shadow
- Accent: lavender #a78bfa; text #312e4a
- Font: Quicksand, round and light — fits parenting/education/wellness products
- Motion: blobs float on a 10-16s cycle, soft and never distracting`,
    },
  }),
  D({
    id: 'pulse-reactor-glow',
    slug: 'pulse-reactor-glow',
    title: { 'zh-CN': '反应堆脉冲', 'en-US': 'Pulse Reactor Glow' },
    description: {
      'zh-CN': '深色科幻界面，中心呼吸式红橙光晕如同能量核心跳动。',
      'en-US': 'A dark sci-fi surface with a breathing red-orange glow, like a pulsing energy core.',
    },
    tags: ['dynamic', 'pulse-glow', 'dark', 'sci-fi', 'gaming'],
    stack: ['React', 'Tailwind CSS', 'CSS Animation'],
    motionPreset: 'bouncy',
    dynamicEffect: 'pulse-glow',
    tokens: {
      '--sc-bg': '#0c0a0a',
      '--sc-bg-fallback': '#0c0a0a',
      '--sc-fg': '#fee2e2',
      '--sc-primary': '#f97316',
      '--sc-primary-fg': '#1a0a02',
      '--sc-muted': 'rgba(249,115,22,0.08)',
      '--sc-muted-fg': '#fca5a5',
      '--sc-border': 'rgba(249,115,22,0.25)',
      '--sc-radius': '10px',
      '--sc-shadow': '0 0 40px rgba(249,115,22,0.15)',
      '--sc-font': '"Rajdhani", "Orbitron", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成「反应堆脉冲」动态风格 UI：
- 背景：近黑 #0c0a0a；卡片中央有一层呼吸光晕（box-shadow 从 0 0 20px 到 0 0 70px 16px 橙色 #f97316，3~3.5s ease-in-out 循环）
- 卡片：极淡橙色描边 rgba(249,115,22,0.25)，10px 圆角，棱角分明
- 主色：能量橙 #f97316；文字 #fee2e2，次要 #fca5a5
- 字体：Rajdhani / Orbitron，科技感等宽风格；适合游戏 HUD、能源/机甲主题产品
- 动效：呼吸光晕仅作为背景装饰，不影响可点击区域`,
      'en-US': `Design a "Pulse Reactor Glow" dynamic UI:
- Background: near-black #0c0a0a; cards have a breathing glow at their center (box-shadow from 0 0 20px to 0 0 70px 16px orange #f97316, 3-3.5s ease-in-out loop)
- Cards: faint orange border rgba(249,115,22,0.25), 10px radius, sharp edges
- Accent: reactor orange #f97316; text #fee2e2, secondary #fca5a5
- Font: Rajdhani / Orbitron, techy and geometric — fits gaming HUDs, energy/mech-themed products
- Motion: the breathing glow is purely decorative and never blocks clickable areas`,
    },
  }),
  D({
    id: 'zen-breathing-light',
    slug: 'zen-breathing-light',
    title: { 'zh-CN': '禅意呼吸光', 'en-US': 'Zen Breathing Light' },
    description: {
      'zh-CN': '浅鼠尾草绿背景，中央柔和光晕缓慢呼吸，用于冥想/健康类应用。',
      'en-US': 'A sage-green surface with a slow, soft breathing glow — perfect for meditation/wellness apps.',
    },
    tags: ['dynamic', 'pulse-glow', 'light', 'calm', 'wellness'],
    stack: ['React', 'Tailwind CSS', 'CSS Animation'],
    motionPreset: 'editorial',
    dynamicEffect: 'pulse-glow',
    tokens: {
      '--sc-bg': '#f1f5f0',
      '--sc-bg-fallback': '#f1f5f0',
      '--sc-fg': '#1f2e1c',
      '--sc-primary': '#84a98c',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': 'rgba(132,169,140,0.14)',
      '--sc-muted-fg': '#52796f',
      '--sc-border': 'rgba(82,121,111,0.18)',
      '--sc-radius': '24px',
      '--sc-shadow': '0 0 30px rgba(132,169,140,0.12)',
      '--sc-font': '"Nunito", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成「禅意呼吸光」动态风格 UI：
- 背景：柔和鼠尾草绿 #f1f5f0；核心卡片中央有柔光呼吸效果（4~5s 长周期，比常规呼吸光更慢更轻）
- 卡片：24px 大圆角，几乎无描边，绿色柔光阴影
- 主色：鼠尾草绿 #84a98c；文字 #1f2e1c
- 字体：Nunito，圆润友好；大量留白、呼吸感排版
- 动效：整体节奏放缓，营造放松、专注的氛围，适合冥想计时器/呼吸练习类界面`,
      'en-US': `Design a "Zen Breathing Light" dynamic UI:
- Background: soft sage green #f1f5f0; the hero card has a soft breathing glow at its center (4-5s long cycle, slower and gentler than typical pulses)
- Cards: 24px large radius, nearly borderless, soft green glow shadow
- Accent: sage green #84a98c; text #1f2e1c
- Font: Nunito, round and friendly; generous whitespace, breathable layout
- Motion: overall pacing is slow and calming — fits meditation timers / breathing-exercise UIs`,
    },
  }),
  D({
    id: 'holographic-shimmer',
    slug: 'holographic-shimmer',
    title: { 'zh-CN': '全息扫光', 'en-US': 'Holographic Shimmer' },
    description: {
      'zh-CN': '深色玻璃卡片表面周期性掠过一道彩虹光带，如全息卡片质感。',
      'en-US': 'A rainbow-tinted light sweeps across dark glass cards periodically, like a holographic trading card.',
    },
    tags: ['dynamic', 'shimmer', 'dark', 'glass', 'holographic'],
    stack: ['React', 'Tailwind CSS', 'CSS Animation'],
    motionPreset: 'snappy',
    dynamicEffect: 'shimmer',
    tokens: {
      '--sc-bg': 'linear-gradient(160deg, #0f0c29 0%, #1a1440 100%)',
      '--sc-bg-fallback': '#100c29',
      '--sc-fg': '#f4f1ff',
      '--sc-primary': '#8b5cf6',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': 'rgba(255,255,255,0.06)',
      '--sc-muted-fg': '#b8b3d9',
      '--sc-border': 'rgba(255,255,255,0.14)',
      '--sc-radius': '16px',
      '--sc-shadow': '0 12px 40px rgba(0,0,0,0.4)',
      '--sc-font': 'Inter, system-ui, sans-serif',
      '--sc-backdrop': 'blur(18px)',
    },
    prompt: {
      'zh-CN': `生成「全息扫光」动态风格 UI：
- 背景：深紫黑渐变 (#0f0c29 → #1a1440)；卡片表面每 3s 掠过一道倾斜彩虹/紫色光带（transform: translateX + skew，宽度约 32%）
- 卡片：半透明白 rgba(255,255,255,0.06) + blur(18px)，16px 圆角
- 主色：紫罗兰 #8b5cf6；文字 #f4f1ff
- 动效：光带 opacity 0.5，ease-in-out，仅作装饰不影响交互；卡片本身可叠加轻微渐变描边模拟"全息卡"质感
- 适合：NFT/收藏品、会员卡、高级订阅套餐展示`,
      'en-US': `Design a "Holographic Shimmer" dynamic UI:
- Background: deep violet-black gradient (#0f0c29 → #1a1440); a diagonal rainbow/violet light sweeps across cards every ~3s (translateX + skew, ~32% width)
- Cards: translucent white rgba(255,255,255,0.06) + blur(18px), 16px radius
- Accent: violet #8b5cf6; text #f4f1ff
- Motion: sweep opacity 0.5, ease-in-out, purely decorative; optionally add a subtle gradient border for a "holo card" feel
- Fits: NFT/collectibles, membership cards, premium subscription tiers`,
    },
  }),
  D({
    id: 'gold-foil-shimmer',
    slug: 'gold-foil-shimmer',
    title: { 'zh-CN': '烫金扫光', 'en-US': 'Gold Foil Shimmer' },
    description: {
      'zh-CN': '黑金奢华配色，金色光带周期性掠过卡片边缘，如烫金请柬质感。',
      'en-US': 'Black-and-gold luxury palette with a golden sweep across card edges, like foil-stamped invitations.',
    },
    tags: ['dynamic', 'shimmer', 'dark', 'luxury', 'gold'],
    stack: ['React', 'Tailwind CSS', 'CSS Animation'],
    motionPreset: 'editorial',
    dynamicEffect: 'shimmer',
    tokens: {
      '--sc-bg': '#0a0a0a',
      '--sc-bg-fallback': '#0a0a0a',
      '--sc-fg': '#f5e9c8',
      '--sc-primary': '#d4af37',
      '--sc-primary-fg': '#1a1400',
      '--sc-muted': 'rgba(212,175,55,0.08)',
      '--sc-muted-fg': '#c9b787',
      '--sc-border': 'rgba(212,175,55,0.3)',
      '--sc-radius': '6px',
      '--sc-shadow': '0 12px 32px rgba(0,0,0,0.6)',
      '--sc-font': '"Playfair Display", Georgia, serif',
    },
    prompt: {
      'zh-CN': `生成「烫金扫光」动态风格 UI：
- 背景：纯黑 #0a0a0a；卡片描边金色 rgba(212,175,55,0.3)，每 3.5s 一道金色光带缓慢掠过
- 卡片：6px 小圆角（偏正式），深投影 0 12px 32px rgba(0,0,0,0.6)
- 主色：香槟金 #d4af37；文字米白 #f5e9c8
- 字体：Playfair Display 衬线体，营造奢华请柬/高端会员感
- 适合：奢侈品官网、高端活动邀请函、VIP 会员中心`,
      'en-US': `Design a "Gold Foil Shimmer" dynamic UI:
- Background: pure black #0a0a0a; card borders in gold rgba(212,175,55,0.3), a golden sweep glides across every ~3.5s
- Cards: 6px small radius (formal), deep shadow 0 12px 32px rgba(0,0,0,0.6)
- Accent: champagne gold #d4af37; text ivory #f5e9c8
- Font: Playfair Display serif for a luxury-invitation, VIP-membership feel
- Fits: luxury brand sites, premium event invitations, VIP member centers`,
    },
  }),
  D({
    id: 'retro-crt-terminal',
    slug: 'retro-crt-terminal',
    title: { 'zh-CN': '复古 CRT 终端', 'en-US': 'Retro CRT Terminal' },
    description: {
      'zh-CN': '经典绿色磷光终端，缓慢下移的扫描线还原老式显示器质感。',
      'en-US': 'Classic green-phosphor terminal with slowly scrolling scanlines, straight out of an old CRT monitor.',
    },
    tags: ['dynamic', 'scanlines', 'dark', 'retro', 'terminal'],
    stack: ['React', 'CSS Animation'],
    motionPreset: 'snappy',
    dynamicEffect: 'scanlines',
    tokens: {
      '--sc-bg': '#020803',
      '--sc-bg-fallback': '#020803',
      '--sc-fg': '#39ff88',
      '--sc-primary': '#39ff88',
      '--sc-primary-fg': '#020803',
      '--sc-muted': 'rgba(57,255,136,0.08)',
      '--sc-muted-fg': '#2fbf6d',
      '--sc-border': 'rgba(57,255,136,0.35)',
      '--sc-radius': '2px',
      '--sc-shadow': '0 0 24px rgba(57,255,136,0.25)',
      '--sc-font': '"JetBrains Mono", "Courier New", monospace',
    },
    prompt: {
      'zh-CN': `生成「复古 CRT 终端」动态风格 UI：
- 背景：近黑绿 #020803；全屏叠加水平扫描线（repeating-linear-gradient，1px 亮线 + 3px 间隔），2.5s 线性向下循环
- 文字/边框：磷光绿 #39ff88，带轻微 text-shadow 发光
- 圆角：2px（几乎直角）；字体：JetBrains Mono 等宽字体
- 交互：光标使用块状闪烁效果，按钮 hover 时反色（背景变绿、文字变黑）
- 适合：黑客主题、开发者工具、复古游戏界面`,
      'en-US': `Design a "Retro CRT Terminal" dynamic UI:
- Background: near-black green #020803; horizontal scanlines overlay the whole screen (repeating-linear-gradient, 1px bright line + 3px gap), 2.5s linear downward loop
- Text/borders: phosphor green #39ff88 with a subtle glowing text-shadow
- Radius: 2px (near-square); font: JetBrains Mono monospace
- Interaction: block-style blinking cursor, buttons invert on hover (green background, black text)
- Fits: hacker-themed sites, dev tools, retro game UIs`,
    },
  }),
  D({
    id: 'vhs-glitch-scan',
    slug: 'vhs-glitch-scan',
    title: { 'zh-CN': 'VHS 故障扫描', 'en-US': 'VHS Glitch Scan' },
    description: {
      'zh-CN': '紫青撞色配上颗粒扫描线，仿旧录像带故障质感的复古氛围。',
      'en-US': 'Violet-cyan clash paired with grainy scanlines — a nostalgic broken-VHS aesthetic.',
    },
    tags: ['dynamic', 'scanlines', 'dark', 'retro', 'glitch'],
    stack: ['React', 'CSS Animation'],
    motionPreset: 'bouncy',
    dynamicEffect: 'scanlines',
    tokens: {
      '--sc-bg': '#120019',
      '--sc-bg-fallback': '#120019',
      '--sc-fg': '#f0e6ff',
      '--sc-primary': '#ff2ec4',
      '--sc-primary-fg': '#120019',
      '--sc-muted': 'rgba(255,46,196,0.08)',
      '--sc-muted-fg': '#5eead4',
      '--sc-border': 'rgba(94,234,212,0.3)',
      '--sc-radius': '4px',
      '--sc-shadow': '0 0 30px rgba(255,46,196,0.2)',
      '--sc-font': '"Space Mono", monospace',
    },
    prompt: {
      'zh-CN': `生成「VHS 故障扫描」动态风格 UI：
- 背景：深紫黑 #120019；扫描线用青色 #5eead4，间隔更宽（4px），叠加轻微色差（chromatic aberration：红/青通道错位 1~2px）
- 主色：品红 #ff2ec4，辅助青绿 #5eead4；描边偏青色
- 圆角：4px；字体：Space Mono，故障感强
- 动效：可周期性（每 6~8s）触发一次短暂的水平位移抖动（0.15s），模拟磁带跳帧
- 适合：音乐/潮流品牌、复古游戏、赛博朋克风格网站`,
      'en-US': `Design a "VHS Glitch Scan" dynamic UI:
- Background: deep violet-black #120019; cyan #5eead4 scanlines with a wider 4px gap, plus a slight chromatic-aberration offset (red/cyan channels shifted 1-2px)
- Accent: magenta #ff2ec4 with cyan #5eead4 as secondary; borders lean cyan
- Radius: 4px; font: Space Mono for a broken-tape feel
- Motion: every 6-8s, trigger a brief horizontal jitter (0.15s) to simulate a dropped frame
- Fits: music/streetwear brands, retro gaming, cyberpunk sites`,
    },
  }),
  D({
    id: 'cyber-hud-grid',
    slug: 'cyber-hud-grid',
    title: { 'zh-CN': '赛博 HUD 网格', 'en-US': 'Cyber HUD Grid' },
    description: {
      'zh-CN': '黑底青色网格线呼吸闪烁，如同科幻电影里的抬头显示界面。',
      'en-US': 'A breathing cyan grid on black, straight out of a sci-fi heads-up-display.',
    },
    tags: ['dynamic', 'grid-pulse', 'dark', 'sci-fi', 'hud'],
    stack: ['React', 'Tailwind CSS', 'CSS Animation'],
    motionPreset: 'snappy',
    dynamicEffect: 'grid-pulse',
    tokens: {
      '--sc-bg': '#050a0a',
      '--sc-bg-fallback': '#050a0a',
      '--sc-fg': '#c8fffa',
      '--sc-primary': '#22d3ee',
      '--sc-primary-fg': '#04191c',
      '--sc-muted': 'rgba(34,211,238,0.06)',
      '--sc-muted-fg': '#67e8f9',
      '--sc-border': 'rgba(34,211,238,0.3)',
      '--sc-radius': '4px',
      '--sc-shadow': '0 0 30px rgba(34,211,238,0.15)',
      '--sc-font': '"Orbitron", "Rajdhani", sans-serif',
    },
    prompt: {
      'zh-CN': `生成「赛博 HUD 网格」动态风格 UI：
- 背景：近黑青 #050a0a；全屏叠加 26px 间距的青色细网格线，透明度在 0.22~0.6 之间 3s 循环呼吸
- 卡片：4px 小圆角，青色描边 rgba(34,211,238,0.3)，直角科技感
- 主色：青色 #22d3ee；文字 #c8fffa
- 字体：Orbitron / Rajdhani；数据展示可加角标装饰线（如 HUD 边角）
- 适合：数据看板、无人机/机甲控制台、太空探索类产品`,
      'en-US': `Design a "Cyber HUD Grid" dynamic UI:
- Background: near-black cyan #050a0a; a fine cyan grid (26px spacing) covers the screen, breathing opacity 0.22-0.6 on a 3s cycle
- Cards: 4px small radius, cyan border rgba(34,211,238,0.3), sharp techy edges
- Accent: cyan #22d3ee; text #c8fffa
- Font: Orbitron / Rajdhani; add HUD-style corner brackets around key data
- Fits: dashboards, drone/mech control consoles, space-exploration products`,
    },
  }),
  D({
    id: 'blueprint-grid-pulse',
    slug: 'blueprint-grid-pulse',
    title: { 'zh-CN': '工程蓝图网格', 'en-US': 'Blueprint Grid Pulse' },
    description: {
      'zh-CN': '经典工程蓝图配色，白色网格线在深蓝底上缓慢呼吸，专业严谨。',
      'en-US': 'Classic engineering-blueprint blue with slowly breathing white gridlines — precise and professional.',
    },
    tags: ['dynamic', 'grid-pulse', 'dark', 'technical', 'engineering'],
    stack: ['React', 'Tailwind CSS', 'CSS Animation'],
    motionPreset: 'editorial',
    dynamicEffect: 'grid-pulse',
    tokens: {
      '--sc-bg': '#0b3d66',
      '--sc-bg-fallback': '#0b3d66',
      '--sc-fg': '#eaf4ff',
      '--sc-primary': '#ffffff',
      '--sc-primary-fg': '#0b3d66',
      '--sc-muted': 'rgba(255,255,255,0.1)',
      '--sc-muted-fg': '#bcd7f0',
      '--sc-border': 'rgba(255,255,255,0.25)',
      '--sc-radius': '2px',
      '--sc-shadow': 'none',
      '--sc-font': '"IBM Plex Mono", monospace',
    },
    prompt: {
      'zh-CN': `生成「工程蓝图网格」动态风格 UI：
- 背景：经典蓝图蓝 #0b3d66；白色细网格线（28px 间距）透明度 0.2~0.55，4s 缓慢呼吸
- 卡片：2px 近直角，白色半透明描边，无阴影（保持图纸平面感）
- 主色：白色 #ffffff on 蓝底；文字 #eaf4ff
- 字体：IBM Plex Mono，图纸标注风格；可加十字准星/坐标标注装饰
- 适合：工程/建筑类工具、CAD 相关产品、技术文档站点`,
      'en-US': `Design a "Blueprint Grid Pulse" dynamic UI:
- Background: classic blueprint blue #0b3d66; fine white grid (28px spacing) breathing opacity 0.2-0.55 over 4s
- Cards: 2px near-square corners, translucent white border, no shadow (keeps the flat drafting-paper feel)
- Accent: white #ffffff on blue; text #eaf4ff
- Font: IBM Plex Mono for a drafting-annotation feel; optional crosshair/coordinate decorations
- Fits: engineering/architecture tools, CAD-adjacent products, technical documentation sites`,
    },
  }),
  D({
    id: 'ocean-current-wave',
    slug: 'ocean-current-wave',
    title: { 'zh-CN': '深海洋流', 'en-US': 'Ocean Current Wave' },
    description: {
      'zh-CN': '深蓝渐变底部叠加缓慢横移的波浪层，宛如深海洋流涌动。',
      'en-US': 'A deep-blue gradient with a slow horizontally-scrolling wave band at the bottom, like ocean currents.',
    },
    tags: ['dynamic', 'wave', 'dark', 'ocean', 'gradient'],
    stack: ['React', 'Tailwind CSS', 'SVG', 'CSS Animation'],
    motionPreset: 'editorial',
    dynamicEffect: 'wave',
    tokens: {
      '--sc-bg': 'linear-gradient(180deg, #012a4a 0%, #013a63 100%)',
      '--sc-bg-fallback': '#012a4a',
      '--sc-fg': '#e8f6ff',
      '--sc-primary': '#48cae4',
      '--sc-primary-fg': '#012a4a',
      '--sc-muted': 'rgba(255,255,255,0.08)',
      '--sc-muted-fg': '#89c2d9',
      '--sc-border': 'rgba(255,255,255,0.14)',
      '--sc-radius': '14px',
      '--sc-shadow': '0 16px 40px rgba(1,42,74,0.5)',
      '--sc-font': '"Nunito Sans", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成「深海洋流」动态风格 UI：
- 背景：深海蓝渐变 (#012a4a → #013a63)；底部 40%~60% 高度叠加一条 SVG 波浪，8~10s 线性横向循环平移
- 卡片：半透明白 rgba(255,255,255,0.08)，14px 圆角，柔和深蓝投影
- 主色：浅蓝 #48cae4；文字 #e8f6ff
- 字体：Nunito Sans；适合海洋保护、潜水、水族馆类产品官网
- 动效：波浪需无缝首尾拼接（两份 SVG 并排循环），避免可见跳变`,
      'en-US': `Design an "Ocean Current Wave" dynamic UI:
- Background: deep-sea blue gradient (#012a4a → #013a63); an SVG wave band across the bottom 40-60% loops horizontally over 8-10s (linear)
- Cards: translucent white rgba(255,255,255,0.08), 14px radius, soft deep-blue shadow
- Accent: light blue #48cae4; text #e8f6ff
- Font: Nunito Sans — fits ocean conservation, diving, aquarium products
- Motion: the wave must tile seamlessly (two SVGs side by side looping) with no visible jump`,
    },
  }),
  D({
    id: 'sunset-tide-wave',
    slug: 'sunset-tide-wave',
    title: { 'zh-CN': '日落潮汐', 'en-US': 'Sunset Tide Wave' },
    description: {
      'zh-CN': '珊瑚橙到暖粉的日落天空，配合缓慢起伏的潮汐波浪层。',
      'en-US': 'A coral-to-pink sunset sky paired with a gently rolling tide wave band.',
    },
    tags: ['dynamic', 'wave', 'light', 'sunset', 'gradient'],
    stack: ['React', 'Tailwind CSS', 'SVG', 'CSS Animation'],
    motionPreset: 'bouncy',
    dynamicEffect: 'wave',
    tokens: {
      '--sc-bg': 'linear-gradient(180deg, #ff9a76 0%, #ff6f91 100%)',
      '--sc-bg-fallback': '#ff8a80',
      '--sc-fg': '#3a0f1f',
      '--sc-primary': '#ffffff',
      '--sc-primary-fg': '#c2255c',
      '--sc-muted': 'rgba(255,255,255,0.35)',
      '--sc-muted-fg': '#7a1f3d',
      '--sc-border': 'rgba(255,255,255,0.4)',
      '--sc-radius': '20px',
      '--sc-shadow': '0 16px 36px rgba(194,37,92,0.25)',
      '--sc-font': '"Baloo 2", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成「日落潮汐」动态风格 UI：
- 背景：珊瑚橙到暖粉渐变 (#ff9a76 → #ff6f91)；底部叠加白色半透明潮汐波浪，9~11s 循环横移
- 卡片：白色半透明 rgba(255,255,255,0.35)，20px 大圆角，通透活泼
- 主色：白色按钮配深粉文字；文字 #3a0f1f
- 字体：Baloo 2，圆润有趣；适合旅行/度假/生活方式类产品
- 动效：波浪起伏幅度不宜过大，保持轻松惬意的氛围`,
      'en-US': `Design a "Sunset Tide Wave" dynamic UI:
- Background: coral-to-pink gradient (#ff9a76 → #ff6f91); a translucent white tide wave along the bottom loops horizontally over 9-11s
- Cards: translucent white rgba(255,255,255,0.35), 20px large radius, airy and playful
- Accent: white buttons with deep-pink text; text #3a0f1f
- Font: Baloo 2, round and fun — fits travel/vacation/lifestyle products
- Motion: keep the wave's amplitude modest to preserve a relaxed, easygoing mood`,
    },
  }),
  D({
    id: 'neon-tokyo-flicker',
    slug: 'neon-tokyo-flicker',
    title: { 'zh-CN': '东京霓虹', 'en-US': 'Neon Tokyo Flicker' },
    description: {
      'zh-CN': '午夜都市配色，品红青色霓虹光带随机闪烁，如深夜街头招牌。',
      'en-US': 'Midnight-city palette with magenta-cyan neon glow that flickers irregularly, like a late-night sign.',
    },
    tags: ['dynamic', 'neon-flicker', 'dark', 'cyberpunk', 'night'],
    stack: ['React', 'Tailwind CSS', 'CSS Animation'],
    motionPreset: 'bouncy',
    dynamicEffect: 'neon-flicker',
    tokens: {
      '--sc-bg': 'linear-gradient(160deg, #05010f 0%, #170824 100%)',
      '--sc-bg-fallback': '#0c0518',
      '--sc-fg': '#f5ecff',
      '--sc-primary': '#ff2ec4',
      '--sc-primary-fg': '#170018',
      '--sc-muted': 'rgba(34,211,238,0.08)',
      '--sc-muted-fg': '#22d3ee',
      '--sc-border': 'rgba(255,46,196,0.3)',
      '--sc-radius': '10px',
      '--sc-shadow': '0 0 26px rgba(255,46,196,0.2)',
      '--sc-font': '"Rajdhani", sans-serif',
    },
    prompt: {
      'zh-CN': `生成「东京霓虹」动态风格 UI：
- 背景：深紫黑渐变 (#05010f → #170824)；卡片描边 + 内发光品红 #ff2ec4，模拟霓虹灯管
- 动效：内发光通过 box-shadow inset 实现不规则闪烁（模拟霓虹灯老化的忽明忽暗），4~4.5s 周期含多个瞬时暗闪
- 主色：品红 #ff2ec4，辅助青色 #22d3ee；文字 #f5ecff
- 字体：Rajdhani；适合夜生活/音乐节/潮牌电商类产品
- 圆角 10px，避免直角显得过硬`,
      'en-US': `Design a "Neon Tokyo Flicker" dynamic UI:
- Background: deep violet-black gradient (#05010f → #170824); card borders + inner glow in magenta #ff2ec4 mimic a neon tube
- Motion: the inner glow (box-shadow inset) flickers irregularly like an aging neon sign, 4-4.5s cycle with a few brief dim flashes
- Accent: magenta #ff2ec4 with cyan #22d3ee as secondary; text #f5ecff
- Font: Rajdhani — fits nightlife/music-festival/streetwear e-commerce
- 10px radius to avoid an overly harsh, sharp-edged look`,
    },
  }),
  D({
    id: 'retro-diner-neon',
    slug: 'retro-diner-neon',
    title: { 'zh-CN': '复古霓虹餐厅', 'en-US': 'Retro Diner Neon' },
    description: {
      'zh-CN': '80 年代美式餐厅配色，粉绿霓虹灯管闪烁，怀旧复古氛围。',
      'en-US': '80s American diner palette with flickering pink-teal neon tubes for a nostalgic retro vibe.',
    },
    tags: ['dynamic', 'neon-flicker', 'dark', 'retro', '80s'],
    stack: ['React', 'Tailwind CSS', 'CSS Animation'],
    motionPreset: 'bouncy',
    dynamicEffect: 'neon-flicker',
    tokens: {
      '--sc-bg': '#160b21',
      '--sc-bg-fallback': '#160b21',
      '--sc-fg': '#fff0f8',
      '--sc-primary': '#ff6ec7',
      '--sc-primary-fg': '#2a0518',
      '--sc-muted': 'rgba(45,212,191,0.1)',
      '--sc-muted-fg': '#2dd4bf',
      '--sc-border': 'rgba(255,110,199,0.3)',
      '--sc-radius': '12px',
      '--sc-shadow': '0 0 24px rgba(255,110,199,0.22)',
      '--sc-font': '"Pacifico", cursive',
    },
    prompt: {
      'zh-CN': `生成「复古霓虹餐厅」动态风格 UI：
- 背景：深紫 #160b21；霓虹粉 #ff6ec7 + 薄荷绿 #2dd4bf 双色搭配，卡片描边发光
- 动效：内发光闪烁效果同「东京霓虹」但配色不同，节奏稍慢（5s 周期），营造复古招牌的悠闲感
- 字体：Pacifico 手写体标题 + 常规无衬线正文，呼应美式餐厅菜单牌
- 圆角 12px；适合餐饮品牌、复古主题活动页`,
      'en-US': `Design a "Retro Diner Neon" dynamic UI:
- Background: deep violet #160b21; neon pink #ff6ec7 paired with mint teal #2dd4bf, glowing card borders
- Motion: the same flicker technique as "Neon Tokyo" but slower-paced (5s cycle) for a laid-back retro-sign feel
- Font: Pacifico script for headings + a plain sans-serif body, echoing a diner menu board
- 12px radius; fits food & beverage brands, retro-themed event pages`,
    },
  }),
  D({
    id: 'liquid-chrome-blob',
    slug: 'liquid-chrome-blob',
    title: { 'zh-CN': '液态铬合金', 'en-US': 'Liquid Chrome Blob' },
    description: {
      'zh-CN': '深色背景上一枚金属质感的液态光斑持续变形流动，未来科技感十足。',
      'en-US': 'A metallic liquid blob continuously morphs on a dark backdrop — sleek, futuristic and tactile.',
    },
    tags: ['dynamic', 'blob-morph', 'dark', 'metallic', 'futuristic'],
    stack: ['React', 'Tailwind CSS', 'CSS Animation'],
    motionPreset: 'snappy',
    dynamicEffect: 'blob-morph',
    tokens: {
      '--sc-bg': '#0d0f12',
      '--sc-bg-fallback': '#0d0f12',
      '--sc-fg': '#eef1f5',
      '--sc-primary': '#94a3b8',
      '--sc-primary-fg': '#0d0f12',
      '--sc-muted': 'rgba(148,163,184,0.1)',
      '--sc-muted-fg': '#cbd5e1',
      '--sc-border': 'rgba(148,163,184,0.2)',
      '--sc-radius': '18px',
      '--sc-shadow': '0 20px 50px rgba(0,0,0,0.5)',
      '--sc-font': '"Inter", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成「液态铬合金」动态风格 UI：
- 背景：近黑 #0d0f12；卡片内部或背景角落有一枚液态金属光斑（linear-gradient 银-灰 #94a3b8 → 白），border-radius 持续在多组不规则值间过渡（7s 周期），营造液态流动感
- 卡片：18px 圆角，浅灰描边，深投影
- 主色：金属灰 #94a3b8；文字 #eef1f5
- 字体：Inter；极简克制的排版，让液态光斑成为唯一的视觉焦点
- 适合：科技产品发布页、未来主义 Landing Page`,
      'en-US': `Design a "Liquid Chrome Blob" dynamic UI:
- Background: near-black #0d0f12; a liquid-metal blob (silver-grey #94a3b8 → white gradient) sits in a corner or behind a card, its border-radius continuously morphing between irregular values (7s cycle) for a liquid-flow feel
- Cards: 18px radius, light grey border, deep shadow
- Accent: metallic grey #94a3b8; text #eef1f5
- Font: Inter; keep layout minimal and restrained so the blob remains the visual focal point
- Fits: tech product launch pages, futuristic landing pages`,
    },
  }),
  D({
    id: 'lava-lamp-blob',
    slug: 'lava-lamp-blob',
    title: { 'zh-CN': '熔岩灯', 'en-US': 'Lava Lamp Blob' },
    description: {
      'zh-CN': '70 年代复古熔岩灯配色，橙紫双色光斑缓慢变形融合。',
      'en-US': "A 70s retro lava-lamp palette — orange and violet blobs slowly morphing and merging.",
    },
    tags: ['dynamic', 'blob-morph', 'dark', 'retro', '70s'],
    stack: ['React', 'Tailwind CSS', 'CSS Animation'],
    motionPreset: 'bouncy',
    dynamicEffect: 'blob-morph',
    tokens: {
      '--sc-bg': '#1a0e2e',
      '--sc-bg-fallback': '#1a0e2e',
      '--sc-fg': '#fef3e2',
      '--sc-primary': '#fb923c',
      '--sc-primary-fg': '#2a0f00',
      '--sc-muted': 'rgba(251,146,60,0.1)',
      '--sc-muted-fg': '#f0abfc',
      '--sc-border': 'rgba(251,146,60,0.25)',
      '--sc-radius': '24px',
      '--sc-shadow': '0 20px 44px rgba(0,0,0,0.4)',
      '--sc-font': '"Fredoka", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成「熔岩灯」动态风格 UI：
- 背景：深紫 #1a0e2e；橙 #fb923c 到品紫 #f0abfc 渐变液态光斑，border-radius 持续变形（7~8s 周期），比金属版更饱和、更有玩趣感
- 卡片：24px 超大圆角，呼应熔岩灯的圆润造型
- 主色：橙色 #fb923c；文字米白 #fef3e2
- 字体：Fredoka，圆润俏皮；适合音乐/派对/怀旧潮流品牌
- 动效：可叠加轻微上下浮动（translateY ±6px）增强"漂浮"感`,
      'en-US': `Design a "Lava Lamp Blob" dynamic UI:
- Background: deep violet #1a0e2e; an orange #fb923c to magenta #f0abfc gradient blob continuously morphs (7-8s cycle), more saturated and playful than the metallic version
- Cards: 24px extra-large radius, echoing the lava lamp's rounded silhouette
- Accent: orange #fb923c; text ivory #fef3e2
- Font: Fredoka, round and playful — fits music/party/retro-revival brands
- Motion: optionally add a subtle vertical float (translateY ±6px) to enhance the "floating" feel`,
    },
  }),
  D({
    id: 'constellation-network',
    slug: 'constellation-network',
    title: { 'zh-CN': '星座连线', 'en-US': 'Constellation Network' },
    description: {
      'zh-CN': '深蓝夜空背景下，漂浮的光点随机靠近时以细线相连，如星座连线。',
      'en-US': 'On a deep navy night sky, floating dots connect with thin lines when they drift close, like constellations.',
    },
    tags: ['dynamic', 'particle-network', 'dark', 'space', 'canvas'],
    stack: ['React', 'Canvas API', 'Tailwind CSS'],
    motionPreset: 'editorial',
    dynamicEffect: 'particle-network',
    tokens: {
      '--sc-bg': '#04081a',
      '--sc-bg-fallback': '#04081a',
      '--sc-fg': '#e6ecff',
      '--sc-primary': '#7dd3fc',
      '--sc-primary-fg': '#04081a',
      '--sc-muted': 'rgba(125,211,252,0.08)',
      '--sc-muted-fg': '#93c5fd',
      '--sc-border': 'rgba(125,211,252,0.2)',
      '--sc-radius': '14px',
      '--sc-shadow': '0 18px 44px rgba(0,0,0,0.5)',
      '--sc-font': 'Inter, system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成「星座连线」动态风格 UI：
- 背景：深夜蓝 #04081a；使用 Canvas 绘制约 20~24 个浅蓝光点 #7dd3fc 缓慢随机漂移，距离小于阈值时以半透明细线相连
- 卡片：半透明深蓝，14px 圆角，弱描边
- 主色：天蓝 #7dd3fc；文字 #e6ecff
- 动效：光点运动应平滑（requestAnimationFrame），整体透明度克制（连线 0.2~0.35），不干扰前景内容阅读
- 适合：社交网络、知识图谱、AI/数据科学类产品`,
      'en-US': `Design a "Constellation Network" dynamic UI:
- Background: deep-night blue #04081a; a Canvas layer draws ~20-24 light-blue dots #7dd3fc drifting slowly and randomly, connecting with thin translucent lines when close enough
- Cards: translucent dark blue, 14px radius, faint border
- Accent: sky blue #7dd3fc; text #e6ecff
- Motion: motion should be smooth (requestAnimationFrame), line opacity kept subtle (0.2-0.35) so it never competes with foreground readability
- Fits: social networks, knowledge graphs, AI/data-science products`,
    },
  }),
  D({
    id: 'circuit-node-network',
    slug: 'circuit-node-network',
    title: { 'zh-CN': '电路节点网络', 'en-US': 'Circuit Node Network' },
    description: {
      'zh-CN': '黑绿科技配色，节点与连线模拟电路板上的信号流动。',
      'en-US': 'A black-and-green tech palette where nodes and lines simulate signal flow across a circuit board.',
    },
    tags: ['dynamic', 'particle-network', 'dark', 'tech', 'canvas'],
    stack: ['React', 'Canvas API', 'Tailwind CSS'],
    motionPreset: 'snappy',
    dynamicEffect: 'particle-network',
    tokens: {
      '--sc-bg': '#03110a',
      '--sc-bg-fallback': '#03110a',
      '--sc-fg': '#d8ffe9',
      '--sc-primary': '#4ade80',
      '--sc-primary-fg': '#03110a',
      '--sc-muted': 'rgba(74,222,128,0.08)',
      '--sc-muted-fg': '#86efac',
      '--sc-border': 'rgba(74,222,128,0.25)',
      '--sc-radius': '6px',
      '--sc-shadow': '0 0 30px rgba(74,222,128,0.12)',
      '--sc-font': '"JetBrains Mono", monospace',
    },
    prompt: {
      'zh-CN': `生成「电路节点网络」动态风格 UI：
- 背景：极深绿黑 #03110a；Canvas 绘制的节点用绿色 #4ade80，连线更密集、更直角化（可视觉上模拟电路走线）
- 卡片：6px 小圆角，绿色细描边，几乎无阴影
- 主色：荧光绿 #4ade80；文字 #d8ffe9
- 字体：JetBrains Mono；适合芯片/半导体、后端基础设施类产品官网
- 动效：节点移动速度略快于「星座连线」，营造"数据流动"的紧凑科技感`,
      'en-US': `Design a "Circuit Node Network" dynamic UI:
- Background: near-black green #03110a; Canvas-drawn nodes in green #4ade80 with denser, more angular connections evoking circuit traces
- Cards: 6px small radius, thin green border, almost no shadow
- Accent: neon green #4ade80; text #d8ffe9
- Font: JetBrains Mono — fits chip/semiconductor and backend-infrastructure product sites
- Motion: nodes move slightly faster than "Constellation Network" for a tighter, "data flowing" tech feel`,
    },
  }),
  D({
    id: 'deep-space-starfield',
    slug: 'deep-space-starfield',
    title: { 'zh-CN': '深空星域', 'en-US': 'Deep Space Starfield' },
    description: {
      'zh-CN': '纯黑深空背景中繁星闪烁并缓慢下移，宁静深邃的太空氛围。',
      'en-US': 'Twinkling stars drift slowly across a pure-black void — a calm, deep-space atmosphere.',
    },
    tags: ['dynamic', 'starfield', 'dark', 'space', 'canvas'],
    stack: ['React', 'Canvas API', 'Tailwind CSS'],
    motionPreset: 'editorial',
    dynamicEffect: 'starfield',
    tokens: {
      '--sc-bg': '#000000',
      '--sc-bg-fallback': '#000000',
      '--sc-fg': '#f5f5f7',
      '--sc-primary': '#e5e7eb',
      '--sc-primary-fg': '#000000',
      '--sc-muted': 'rgba(255,255,255,0.06)',
      '--sc-muted-fg': '#9ca3af',
      '--sc-border': 'rgba(255,255,255,0.12)',
      '--sc-radius': '16px',
      '--sc-shadow': '0 20px 50px rgba(0,0,0,0.6)',
      '--sc-font': 'Inter, system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成「深空星域」动态风格 UI：
- 背景：纯黑 #000000；Canvas 绘制约 40~46 颗白色小星点，各自以不同频率闪烁（sin 函数控制透明度），并缓慢向下漂移
- 卡片：半透明白 rgba(255,255,255,0.06)，16px 圆角，弱描边
- 主色：浅灰白 #e5e7eb；文字 #f5f5f7
- 字体：Inter；极简排版，让星空成为唯一背景装饰
- 适合：天文/航天类产品、极简作品集、深色模式 SaaS 官网`,
      'en-US': `Design a "Deep Space Starfield" dynamic UI:
- Background: pure black #000000; a Canvas layer draws ~40-46 small white stars, each twinkling at its own frequency (sine-driven opacity) and drifting slowly downward
- Cards: translucent white rgba(255,255,255,0.06), 16px radius, faint border
- Accent: light grey-white #e5e7eb; text #f5f5f7
- Font: Inter; keep the layout minimal so the starfield remains the sole ambient decoration
- Fits: astronomy/aerospace products, minimalist portfolios, dark-mode SaaS sites`,
    },
  }),
  D({
    id: 'cosmic-dust-drift',
    slug: 'cosmic-dust-drift',
    title: { 'zh-CN': '宇宙尘埃', 'en-US': 'Cosmic Dust Drift' },
    description: {
      'zh-CN': '紫粉色调的漂浮尘埃粒子，配合深空背景，梦幻而神秘。',
      'en-US': 'Violet-pink dust particles drift across a deep-space backdrop — dreamy and mysterious.',
    },
    tags: ['dynamic', 'starfield', 'dark', 'space', 'canvas'],
    stack: ['React', 'Canvas API', 'Tailwind CSS'],
    motionPreset: 'editorial',
    dynamicEffect: 'starfield',
    tokens: {
      '--sc-bg': 'linear-gradient(180deg, #10041f 0%, #1c0a2e 100%)',
      '--sc-bg-fallback': '#150729',
      '--sc-fg': '#fbe8ff',
      '--sc-primary': '#e879f9',
      '--sc-primary-fg': '#2a0630',
      '--sc-muted': 'rgba(232,121,249,0.08)',
      '--sc-muted-fg': '#f0abfc',
      '--sc-border': 'rgba(232,121,249,0.22)',
      '--sc-radius': '18px',
      '--sc-shadow': '0 20px 46px rgba(0,0,0,0.5)',
      '--sc-font': '"Poppins", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成「宇宙尘埃」动态风格 UI：
- 背景：深紫渐变 (#10041f → #1c0a2e)；星点改为品紫色 #e879f9，比标准星空更大、更柔和（模拟尘埃颗粒），闪烁频率更低
- 卡片：18px 圆角，品紫描边，柔和投影
- 主色：品紫 #e879f9；文字米粉 #fbe8ff
- 字体：Poppins；适合占星/塔罗、梦境/冥想类内容产品
- 动效：粒子飘动轨迹可略带弧线，增强"漂浮"而非"下落"的感觉`,
      'en-US': `Design a "Cosmic Dust Drift" dynamic UI:
- Background: deep violet gradient (#10041f → #1c0a2e); particles are tinted magenta #e879f9, larger and softer than a standard starfield (mimicking dust), twinkling at a lower frequency
- Cards: 18px radius, magenta border, soft shadow
- Accent: magenta #e879f9; text pale pink #fbe8ff
- Font: Poppins — fits astrology/tarot, dream-journal/meditation content products
- Motion: give particle paths a gentle curve to feel like "floating" rather than "falling"`,
    },
  }),
  D({
    id: 'matrix-code-rain',
    slug: 'matrix-code-rain',
    title: { 'zh-CN': '母体代码雨', 'en-US': 'Matrix Code Rain' },
    description: {
      'zh-CN': '经典黑绿字符雨持续下落，致敬《黑客帝国》的标志性视觉。',
      'en-US': 'The iconic falling green character rain, a tribute to The Matrix\'s signature visual.',
    },
    tags: ['dynamic', 'matrix-rain', 'dark', 'hacker', 'canvas'],
    stack: ['React', 'Canvas API', 'Tailwind CSS'],
    motionPreset: 'snappy',
    dynamicEffect: 'matrix-rain',
    tokens: {
      '--sc-bg': '#000000',
      '--sc-bg-fallback': '#000000',
      '--sc-fg': '#c8ffd4',
      '--sc-primary': '#22c55e',
      '--sc-primary-fg': '#001a08',
      '--sc-muted': 'rgba(34,197,94,0.08)',
      '--sc-muted-fg': '#4ade80',
      '--sc-border': 'rgba(34,197,94,0.3)',
      '--sc-radius': '2px',
      '--sc-shadow': '0 0 30px rgba(34,197,94,0.2)',
      '--sc-font': '"JetBrains Mono", monospace',
    },
    prompt: {
      'zh-CN': `生成「母体代码雨」动态风格 UI：
- 背景：纯黑 #000000；Canvas 逐列绘制随机字符（假名/数字/符号混合）持续下落，每列速度、起始位置随机，字符头部亮绿 #4ade80，拖尾渐暗
- 卡片：2px 近直角，绿色细描边，等宽字体
- 主色：荧光绿 #22c55e；文字浅绿 #c8ffd4
- 字体：JetBrains Mono；适合黑客主题活动页、极客社区、安全产品官网
- 交互提示：代码雨仅作装饰层，前景内容需保证足够对比度可读性`,
      'en-US': `Design a "Matrix Code Rain" dynamic UI:
- Background: pure black #000000; a Canvas draws random characters (katakana/digit/symbol mix) falling column by column, each column with its own speed and start offset — bright green #4ade80 head, fading trail
- Cards: 2px near-square, thin green border, monospace font
- Accent: neon green #22c55e; text light green #c8ffd4
- Font: JetBrains Mono — fits hacker-themed event pages, geek communities, security product sites
- Note: the code rain is purely decorative; foreground content must keep sufficient contrast for readability`,
    },
  }),
  D({
    id: 'spotlight-cursor-card',
    slug: 'spotlight-cursor-card',
    title: { 'zh-CN': '光标聚光灯', 'en-US': 'Spotlight Cursor Card' },
    description: {
      'zh-CN': '深色卡片跟随鼠标位置投射柔光，交互式的高级感 hover 效果。',
      'en-US': 'A soft light follows your cursor across dark cards — an interactive, premium hover effect.',
    },
    tags: ['dynamic', 'cursor-glow', 'dark', 'interactive', 'premium'],
    stack: ['React', 'Tailwind CSS', 'CSS Variables'],
    motionPreset: 'snappy',
    dynamicEffect: 'cursor-glow',
    tokens: {
      '--sc-bg': '#0a0a0c',
      '--sc-bg-fallback': '#0a0a0c',
      '--sc-fg': '#f4f4f5',
      '--sc-primary': '#818cf8',
      '--sc-primary-fg': '#0a0a0c',
      '--sc-muted': 'rgba(255,255,255,0.06)',
      '--sc-muted-fg': '#a1a1aa',
      '--sc-border': 'rgba(255,255,255,0.1)',
      '--sc-radius': '16px',
      '--sc-shadow': '0 20px 50px rgba(0,0,0,0.5)',
      '--sc-font': 'Inter, system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成「光标聚光灯」动态风格 UI：
- 背景：近黑 #0a0a0c；卡片内以 radial-gradient 实现跟随鼠标位置的柔光（半径约 260px，颜色靛蓝 #818cf8，透明度 0.5~0.6）
- 交互：需在容器上监听 mousemove，将相对坐标（百分比）写入 CSS 变量 --dyn-x/--dyn-y 驱动径向渐变位置
- 卡片：16px 圆角，弱描边，深投影
- 主色：靛蓝 #818cf8；文字 #f4f4f5
- 字体：Inter；适合开发者工具、设计工具、高级订阅产品的功能卡片区
- 无障碍：鼠标离开时光晕应平滑淡出或回到默认位置，不依赖光效传达关键信息`,
      'en-US': `Design a "Spotlight Cursor Card" dynamic UI:
- Background: near-black #0a0a0c; cards use a radial-gradient spotlight following the cursor (radius ~260px, indigo #818cf8, opacity 0.5-0.6)
- Interaction: listen for mousemove on the container and write the relative percentage position into CSS variables --dyn-x/--dyn-y to drive the radial gradient
- Cards: 16px radius, faint border, deep shadow
- Accent: indigo #818cf8; text #f4f4f5
- Font: Inter — fits dev tools, design tools, feature-card sections of premium subscriptions
- Accessibility: the glow should fade smoothly or return to a default position on mouse-leave, and must never be the sole carrier of key information`,
    },
  }),
]
