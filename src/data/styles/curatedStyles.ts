import type { StyleItem } from '@/types/catalog'

const S = (s: Omit<StyleItem, 'kind' | 'status' | 'source'>): StyleItem => ({
  ...s,
  kind: 'style',
  status: 'ready',
  source: 'bundled',
})

export const curatedStyles: StyleItem[] = [
  S({
    id: 'apple-frosted-glass',
    slug: 'apple-frosted-glass',
    category: 'signature',
    title: { 'zh-CN': 'Apple 毛玻璃', 'en-US': 'Apple Frosted Glass' },
    description: {
      'zh-CN': 'macOS / iOS 风格的半透明磨砂面板，柔和高斯模糊、细腻分隔线与 SF 字体。',
      'en-US': 'macOS / iOS translucent frosted panels with soft blur and SF typography.',
    },
    tags: ['apple', 'glass', 'blur', 'ios', 'macos'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': 'linear-gradient(160deg, #e8edf5 0%, #f6f8fc 100%)',
      '--sc-bg-fallback': '#eef2f8',
      '--sc-fg': '#1d1d1f',
      '--sc-primary': '#0a84ff',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': 'rgba(255,255,255,0.6)',
      '--sc-muted-fg': '#6e6e73',
      '--sc-border': 'rgba(0,0,0,0.08)',
      '--sc-radius': '14px',
      '--sc-shadow': '0 8px 30px rgba(0,0,0,0.12)',
      '--sc-font': '-apple-system, "SF Pro Display", "PingFang SC", system-ui, sans-serif',
      '--sc-backdrop': 'blur(20px) saturate(180%)',
    },
    prompt: {
      'zh-CN': `生成 Apple 毛玻璃风格界面（macOS Sonoma / iOS 17）：
- 背景：浅灰到白的柔和渐变 (#e8edf5 → #f6f8fc)，可叠加模糊的彩色光斑
- 面板：半透明白色 rgba(255,255,255,0.6)，backdrop-filter: blur(20px) saturate(180%)
- 主色：系统蓝 #0a84ff；文字 #1d1d1f，次要文字 #6e6e73
- 圆角统一 14px，1px 极淡分隔线 rgba(0,0,0,0.08)，柔和投影 0 8px 30px rgba(0,0,0,0.12)
- 字体：SF Pro / PingFang SC；控件留白充足、层级清晰
- 细节：开关/按钮带轻微高光，hover 微微提亮，禁止重描边与硬阴影`,
      'en-US': `Design an Apple frosted-glass UI (macOS Sonoma / iOS 17):
- Background: soft light-grey to white gradient (#e8edf5 → #f6f8fc) with optional blurred color blobs
- Panels: translucent white rgba(255,255,255,0.6), backdrop-filter: blur(20px) saturate(180%)
- Accent: system blue #0a84ff; text #1d1d1f, secondary #6e6e73
- 14px radius, hairline dividers rgba(0,0,0,0.08), soft shadow 0 8px 30px rgba(0,0,0,0.12)
- Font: SF Pro / system; generous spacing, clear hierarchy
- Subtle highlights on controls, gentle hover brighten; no heavy borders or hard shadows`,
    },
  }),
  S({
    id: 'windows-11-fluent',
    slug: 'windows-11-fluent',
    category: 'signature',
    title: { 'zh-CN': 'Windows 11 Fluent', 'en-US': 'Windows 11 Fluent' },
    description: {
      'zh-CN': 'Fluent Design：Mica 云母材质、圆角卡片、强调色高亮与亚克力模糊。',
      'en-US': 'Fluent Design with Mica material, rounded cards and acrylic blur.',
    },
    tags: ['windows', 'fluent', 'mica', 'microsoft'],
    stack: ['React', 'Tailwind CSS', 'WinUI'],
    tokens: {
      '--sc-bg': 'linear-gradient(135deg, #f3f3f3 0%, #eaeef3 100%)',
      '--sc-bg-fallback': '#f3f3f3',
      '--sc-fg': '#1a1a1a',
      '--sc-primary': '#0067c0',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': 'rgba(255,255,255,0.7)',
      '--sc-muted-fg': '#5d5d5d',
      '--sc-border': 'rgba(0,0,0,0.0785)',
      '--sc-radius': '8px',
      '--sc-shadow': '0 2px 8px rgba(0,0,0,0.10)',
      '--sc-font': '"Segoe UI Variable", "Segoe UI", "Microsoft YaHei", system-ui, sans-serif',
      '--sc-backdrop': 'blur(30px) saturate(125%)',
    },
    prompt: {
      'zh-CN': `生成 Windows 11 Fluent Design 界面：
- 背景：Mica 云母材质，浅灰渐变 (#f3f3f3 → #eaeef3)，桌面壁纸透出
- 卡片：亚克力半透明 rgba(255,255,255,0.7) + blur(30px) saturate(125%)，8px 圆角
- 强调色：Windows 蓝 #0067c0，选中项左侧有强调色竖条指示器
- 文字 #1a1a1a / 次要 #5d5d5d，1px 极淡描边 rgba(0,0,0,0.078)
- 字体：Segoe UI Variable / 微软雅黑；控件高度 32px，hover 轻微填充
- 投影柔和 0 2px 8px；遵循 4px 间距网格，图标用 Fluent System Icons`,
      'en-US': `Design a Windows 11 Fluent UI:
- Background: Mica material, light grey gradient (#f3f3f3 → #eaeef3)
- Cards: acrylic translucent rgba(255,255,255,0.7) + blur(30px) saturate(125%), 8px radius
- Accent: Windows blue #0067c0 with left selection bar indicator
- Text #1a1a1a / secondary #5d5d5d, hairline border rgba(0,0,0,0.078)
- Font: Segoe UI Variable; 32px control height, subtle hover fill
- Soft shadow 0 2px 8px; 4px spacing grid, Fluent System Icons`,
    },
  }),
  S({
    id: 'windows-98-retro',
    slug: 'windows-98-retro',
    category: 'signature',
    title: { 'zh-CN': '老式 Windows 98', 'en-US': 'Retro Windows 98' },
    description: {
      'zh-CN': '经典 Win98/2000：灰色立体凸起按钮、双线斜角边框、标题栏蓝、像素字体。',
      'en-US': 'Classic Win98/2000 beveled grey controls, title bars and pixel fonts.',
    },
    tags: ['retro', 'windows', 'skeuomorphic', 'pixel', '90s'],
    stack: ['React', 'CSS'],
    tokens: {
      '--sc-bg': '#008080',
      '--sc-bg-fallback': '#008080',
      '--sc-fg': '#000000',
      '--sc-primary': '#000080',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': '#c0c0c0',
      '--sc-muted-fg': '#000000',
      '--sc-border': '#808080',
      '--sc-radius': '0px',
      '--sc-shadow': 'inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff',
      '--sc-font': '"MS Sans Serif", "Tahoma", "SimSun", sans-serif',
    },
    prompt: {
      'zh-CN': `生成经典 Windows 98 / 2000 复古界面：
- 桌面背景：经典蓝绿 #008080；窗口面板银灰 #c0c0c0
- 立体边框：凸起按钮用 inset 高光/暗影 (上左 #ffffff，下右 #808080)，按下时反转
- 标题栏：深蓝 #000080 渐变到亮蓝，白色粗体标题，右侧最小化/最大化/关闭方形按钮
- 0 圆角、1px 实线、复选框/单选为方形凹陷样式
- 字体：MS Sans Serif / Tahoma，11px，可带点阵质感
- 细节：虚线焦点框、菜单栏带下划线快捷键、滚动条为立体灰块`,
      'en-US': `Design a classic Windows 98 / 2000 retro UI:
- Desktop teal #008080; window panels silver-grey #c0c0c0
- 3D bevels: raised buttons via inset highlight/shadow (top-left #fff, bottom-right #808080), inverted on press
- Title bar: navy #000080 → bright blue gradient, white bold caption, square min/max/close buttons
- 0 radius, 1px solid borders, square sunken checkboxes/radios
- Font: MS Sans Serif / Tahoma 11px, slightly pixelated
- Dotted focus rectangles, underlined menu accelerators, 3D grey scrollbars`,
    },
  }),
  S({
    id: 'cream-soft',
    slug: 'cream-soft',
    category: 'signature',
    title: { 'zh-CN': '奶油风', 'en-US': 'Cream Soft' },
    description: {
      'zh-CN': '温柔奶油色调、米白背景、低饱和棕橘点缀，圆润柔和、治愈感十足。',
      'en-US': 'Warm cream palette, off-white base, soft rounded healing aesthetic.',
    },
    tags: ['cream', 'soft', 'warm', 'cozy', 'minimal'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#f7f1e8',
      '--sc-bg-fallback': '#f7f1e8',
      '--sc-fg': '#4a3f35',
      '--sc-primary': '#c08457',
      '--sc-primary-fg': '#fffaf3',
      '--sc-muted': '#fdf8f0',
      '--sc-muted-fg': '#9a8a78',
      '--sc-border': '#e7dccb',
      '--sc-radius': '20px',
      '--sc-shadow': '0 6px 20px rgba(150,120,80,0.10)',
      '--sc-font': '"Quicksand", "Nunito", "PingFang SC", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成奶油风（Cream / 拿铁）界面：
- 背景：米白奶油 #f7f1e8，卡片更浅 #fdf8f0
- 主色：低饱和焦糖棕 #c08457，文字暖棕 #4a3f35，次要 #9a8a78
- 大圆角 20px，柔和暖调投影 0 6px 20px rgba(150,120,80,0.10)，描边 #e7dccb
- 字体：Quicksand / Nunito 圆体，字重适中、行距宽松
- 氛围：温柔治愈、留白充足，点缀奶油色色块与小图标，避免高对比与纯黑`,
      'en-US': `Design a cream / latte soft UI:
- Background cream #f7f1e8, cards lighter #fdf8f0
- Accent caramel brown #c08457, text warm brown #4a3f35, secondary #9a8a78
- Large 20px radius, soft warm shadow 0 6px 20px rgba(150,120,80,0.10), border #e7dccb
- Font: Quicksand / Nunito rounded, relaxed line-height
- Gentle healing mood, generous whitespace; avoid high contrast and pure black`,
    },
  }),
  S({
    id: 'vaporwave',
    slug: 'vaporwave',
    category: 'signature',
    title: { 'zh-CN': '蒸汽波', 'en-US': 'Vaporwave' },
    description: {
      'zh-CN': '80/90 年代美学：粉紫青霓虹渐变、网格地平线、故障字与落日意象。',
      'en-US': '80s/90s aesthetic: pink-purple-cyan neon, grid horizon and glitch type.',
    },
    tags: ['vaporwave', 'retro', 'neon', 'gradient', '80s'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': 'linear-gradient(180deg, #2b1055 0%, #7597de 55%, #ff6ec7 100%)',
      '--sc-bg-fallback': '#3a1c71',
      '--sc-fg': '#fdf4ff',
      '--sc-primary': '#ff71ce',
      '--sc-primary-fg': '#1a0033',
      '--sc-muted': 'rgba(120,80,200,0.35)',
      '--sc-muted-fg': '#b9f3ff',
      '--sc-border': '#01cdfe',
      '--sc-radius': '6px',
      '--sc-shadow': '0 0 18px rgba(255,113,206,0.6)',
      '--sc-font': '"VT323", "Orbitron", "Courier New", monospace',
    },
    prompt: {
      'zh-CN': `生成蒸汽波（Vaporwave）界面：
- 背景：紫到粉的落日渐变 (#2b1055 → #7597de → #ff6ec7)，叠加青色透视网格地平线
- 霓虹：洋红 #ff71ce 与青蓝 #01cdfe 互补描边/发光，文字带 0 0 18px 粉色辉光
- 元素：罗马雕像、棕榈树、Windows 95 窗口、日文/英文故障文字
- 小圆角 6px，发光阴影，文字用 VT323 / Orbitron 像素或科技字体
- 氛围：怀旧、梦核、轻微 CRT 扫描线与色差 glitch`,
      'en-US': `Design a vaporwave UI:
- Background sunset gradient (#2b1055 → #7597de → #ff6ec7) with cyan perspective grid horizon
- Neon magenta #ff71ce + cyan #01cdfe complementary glow, text glow 0 0 18px pink
- Motifs: roman busts, palm trees, Win95 windows, JP/EN glitch text
- 6px radius, glow shadows, VT323 / Orbitron type
- Nostalgic dreamcore mood, subtle CRT scanlines and chromatic aberration`,
    },
  }),
  S({
    id: 'nordic-minimal',
    slug: 'nordic-minimal',
    category: 'signature',
    title: { 'zh-CN': '北欧极简', 'en-US': 'Nordic Minimal' },
    description: {
      'zh-CN': '斯堪的纳维亚设计：大量留白、原木与雾灰、克制点缀、功能至上。',
      'en-US': 'Scandinavian design: whitespace, wood & fog grey, restrained accents.',
    },
    tags: ['nordic', 'minimal', 'scandinavian', 'clean', 'light'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#fafafa',
      '--sc-bg-fallback': '#fafafa',
      '--sc-fg': '#2e2e2e',
      '--sc-primary': '#5b7b7a',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': '#f0eeea',
      '--sc-muted-fg': '#8a8a86',
      '--sc-border': '#e3e1dc',
      '--sc-radius': '8px',
      '--sc-shadow': '0 1px 3px rgba(0,0,0,0.05)',
      '--sc-font': '"Inter", "Helvetica Neue", "PingFang SC", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成北欧极简（Scandinavian）界面：
- 背景近白 #fafafa，面板雾灰米色 #f0eeea，原木/雾蓝点缀
- 主色：低饱和灰绿 #5b7b7a，文字炭灰 #2e2e2e，次要 #8a8a86
- 8px 圆角、极淡阴影 0 1px 3px、细描边 #e3e1dc
- 字体：Inter / Helvetica Neue，强调留白与网格对齐，克制装饰
- 氛围：安静、温暖、功能至上；少量自然材质纹理与几何插画`,
      'en-US': `Design a Scandinavian minimal UI:
- Near-white #fafafa, panels fog-beige #f0eeea, wood/fog-blue accents
- Accent muted sage #5b7b7a, text charcoal #2e2e2e, secondary #8a8a86
- 8px radius, faint shadow 0 1px 3px, thin border #e3e1dc
- Font Inter / Helvetica Neue; whitespace and grid alignment, restrained decor
- Quiet, warm, function-first mood; subtle natural textures`,
    },
  }),
  S({
    id: 'holographic-3d',
    slug: 'holographic-3d',
    category: 'signature',
    title: { 'zh-CN': '全息立体', 'en-US': 'Holographic 3D' },
    description: {
      'zh-CN': '镭射全息光泽、彩虹流动渐变、玻璃质感与 3D 浮起卡片。',
      'en-US': 'Iridescent holographic sheen, rainbow flow, glassy 3D floating cards.',
    },
    tags: ['holographic', 'iridescent', '3d', 'futuristic', 'gradient'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': 'linear-gradient(120deg, #a18cd1 0%, #fbc2eb 35%, #8fd3f4 70%, #a6c0fe 100%)',
      '--sc-bg-fallback': '#a6c0fe',
      '--sc-fg': '#222038',
      '--sc-primary': 'rgba(255,255,255,0.55)',
      '--sc-primary-fg': '#2a2750',
      '--sc-muted': 'rgba(255,255,255,0.35)',
      '--sc-muted-fg': '#4a466f',
      '--sc-border': 'rgba(255,255,255,0.6)',
      '--sc-radius': '18px',
      '--sc-shadow': '0 10px 40px rgba(120,100,200,0.35)',
      '--sc-font': '"Space Grotesk", "Sora", system-ui, sans-serif',
      '--sc-backdrop': 'blur(14px) saturate(160%)',
    },
    prompt: {
      'zh-CN': `生成全息立体（Holographic / Iridescent）界面：
- 背景：彩虹流动渐变 (#a18cd1 → #fbc2eb → #8fd3f4 → #a6c0fe)，可随动态缓慢流动
- 卡片：玻璃质感 rgba(255,255,255,0.35) + blur(14px)，边缘有镭射彩虹高光描边
- 3D：卡片轻微悬浮、带视差倾斜，投影 0 10px 40px rgba(120,100,200,0.35)
- 文字深紫灰 #222038，18px 大圆角，元素表面有油膜/镭射反光
- 字体：Space Grotesk / Sora；氛围未来、梦幻、科技感`,
      'en-US': `Design a holographic / iridescent 3D UI:
- Background: flowing rainbow gradient (#a18cd1 → #fbc2eb → #8fd3f4 → #a6c0fe), slow animated
- Cards: glassy rgba(255,255,255,0.35) + blur(14px), iridescent rainbow rim highlight
- 3D: cards float with parallax tilt, shadow 0 10px 40px rgba(120,100,200,0.35)
- Text deep violet-grey #222038, 18px radius, oil-slick / laser reflections
- Font Space Grotesk / Sora; futuristic dreamy tech mood`,
    },
  }),
  S({
    id: 'cyberpunk-neon',
    slug: 'cyberpunk-neon',
    category: 'signature',
    title: { 'zh-CN': '赛博朋克', 'en-US': 'Cyberpunk Neon' },
    description: {
      'zh-CN': '霓虹夜城：深黑底、洋红与青色霓虹、故障特效、HUD 切角面板。',
      'en-US': 'Neon night city: black base, magenta/cyan neon, glitch and HUD chamfers.',
    },
    tags: ['cyberpunk', 'neon', 'dark', 'glitch', 'futuristic'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#0a0612',
      '--sc-bg-fallback': '#0a0612',
      '--sc-fg': '#f0e9ff',
      '--sc-primary': '#ff003c',
      '--sc-primary-fg': '#0a0612',
      '--sc-muted': '#150f24',
      '--sc-muted-fg': '#00f0ff',
      '--sc-border': '#fcee0a',
      '--sc-radius': '2px',
      '--sc-shadow': '0 0 16px rgba(0,240,255,0.55)',
      '--sc-font': '"Rajdhani", "Orbitron", "Chakra Petch", monospace',
    },
    prompt: {
      'zh-CN': `生成赛博朋克（Cyberpunk 2077 风）界面：
- 背景：近黑深紫 #0a0612，可叠加雨夜城市/扫描线
- 霓虹三色：警示红 #ff003c、电光青 #00f0ff、警告黄 #fcee0a，互相碰撞
- 面板：切角（clip-path 斜角）HUD 框，发光描边 0 0 16px 青色辉光，小圆角 2px
- 文字 #f0e9ff，标题用 Rajdhani / Orbitron，带数据流、二进制、glitch 抖动与色差
- 氛围：高科技低生活、强对比、信息密集；按钮 hover 触发霓虹闪烁`,
      'en-US': `Design a Cyberpunk 2077-style UI:
- Background near-black violet #0a0612 with rainy-city / scanline overlay
- Neon triad: alert red #ff003c, electric cyan #00f0ff, warning yellow #fcee0a
- Panels: chamfered (clip-path) HUD frames, glow border 0 0 16px cyan, 2px radius
- Text #f0e9ff, titles Rajdhani / Orbitron, data streams, binary, glitch jitter + chromatic aberration
- High-tech low-life, high contrast, dense info; neon flicker on hover`,
    },
  }),
  S({
    id: 'industrial-mecha',
    slug: 'industrial-mecha',
    category: 'signature',
    title: { 'zh-CN': '工业机甲', 'en-US': 'Industrial Mecha' },
    description: {
      'zh-CN': '军工机甲风：哑光金属、铆钉螺丝、警示条纹、单色等宽数据显示。',
      'en-US': 'Military mecha: matte metal, rivets, hazard stripes, mono data readouts.',
    },
    tags: ['industrial', 'mecha', 'metal', 'technical', 'dark'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': 'linear-gradient(145deg, #2b2e33 0%, #1c1f24 100%)',
      '--sc-bg-fallback': '#23262b',
      '--sc-fg': '#d4d7da',
      '--sc-primary': '#e8a317',
      '--sc-primary-fg': '#161616',
      '--sc-muted': '#33373d',
      '--sc-muted-fg': '#8c9196',
      '--sc-border': '#4a4f56',
      '--sc-radius': '3px',
      '--sc-shadow': 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 10px rgba(0,0,0,0.5)',
      '--sc-font': '"Oxanium", "JetBrains Mono", "Share Tech Mono", monospace',
    },
    prompt: {
      'zh-CN': `生成工业机甲（Mecha / 军工 HUD）界面：
- 背景：哑光深灰金属拉丝渐变 (#2b2e33 → #1c1f24)，带细密网格与铆钉螺丝
- 主色：警示橙黄 #e8a317，搭配钢灰 #4a4f56 描边；黑黄斜纹危险条
- 面板：硬朗 3px 直角、内嵌高光 inset 0 1px、深投影；标签用等宽数据读数
- 文字 #d4d7da，字体 Oxanium / JetBrains Mono，全大写编号 (SYS-01, PWR 88%)
- 氛围：重型、机械、可靠；进度条/仪表盘风格，hover 亮起橙色指示灯`,
      'en-US': `Design an industrial mecha / military HUD UI:
- Background brushed dark-metal gradient (#2b2e33 → #1c1f24) with fine grid, rivets and screws
- Accent hazard amber #e8a317 with steel-grey #4a4f56 borders; black-yellow hazard stripes
- Panels: hard 3px square corners, inset top highlight, deep shadow; mono data readouts
- Text #d4d7da, font Oxanium / JetBrains Mono, uppercase codes (SYS-01, PWR 88%)
- Heavy, mechanical, reliable; gauges/progress bars, amber indicator on hover`,
    },
  }),
  S({
    id: 'neumorphism-soft',
    slug: 'neumorphism-soft',
    category: 'signature',
    title: { 'zh-CN': '新拟物', 'en-US': 'Neumorphism' },
    description: {
      'zh-CN': '柔和挤出质感：同色背景上的双向内外阴影，元素仿佛从表面凸起。',
      'en-US': 'Soft extruded surfaces with dual inner/outer shadows on a single tone.',
    },
    tags: ['neumorphism', 'soft', 'shadow', 'monochrome'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#e0e5ec',
      '--sc-bg-fallback': '#e0e5ec',
      '--sc-fg': '#4d5562',
      '--sc-primary': '#6d83f3',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': '#e0e5ec',
      '--sc-muted-fg': '#8b95a5',
      '--sc-border': '#c8ccd4',
      '--sc-radius': '18px',
      '--sc-shadow': '8px 8px 16px #b8bec9, -8px -8px 16px #ffffff',
      '--sc-font': '"Poppins", "PingFang SC", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成新拟物（Neumorphism）界面：
- 背景与元素同色 #e0e5ec（关键：底与控件一致）
- 阴影：右下深 8px 8px 16px #b8bec9 + 左上亮 -8px -8px 16px #ffffff，营造凸起
- 按下/选中态用 inset 内阴影表现凹陷；主色点缀蓝紫 #6d83f3
- 大圆角 18px、文字 #4d5562，避免强描边与高对比
- 字体 Poppins；氛围柔软、安静；注意可访问性对比度，关键文字加深`,
      'en-US': `Design a neumorphism UI:
- Background and controls share one tone #e0e5ec (key rule)
- Shadows: bottom-right dark 8px 8px 16px #b8bec9 + top-left light -8px -8px 16px #fff for extrusion
- Pressed/active uses inset shadow for sunken look; accent indigo #6d83f3
- 18px radius, text #4d5562, avoid strong borders/contrast
- Font Poppins; soft quiet mood; keep key text dark enough for accessibility`,
    },
  }),
  S({
    id: 'claymorphism',
    slug: 'claymorphism',
    category: 'signature',
    title: { 'zh-CN': '黏土拟态', 'en-US': 'Claymorphism' },
    description: {
      'zh-CN': '3D 黏土质感：饱满圆润、内发光、柔软糖果色，俏皮可爱。',
      'en-US': 'Puffy 3D clay surfaces, inner glow, soft candy colors, playful.',
    },
    tags: ['clay', '3d', 'playful', 'soft', 'colorful'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': 'linear-gradient(135deg, #f6e7ff 0%, #e7f0ff 100%)',
      '--sc-bg-fallback': '#eee7ff',
      '--sc-fg': '#5b3d8a',
      '--sc-primary': '#a374ff',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': '#ffffff',
      '--sc-muted-fg': '#9b86c0',
      '--sc-border': '#efe6ff',
      '--sc-radius': '28px',
      '--sc-shadow': '0 18px 40px rgba(120,80,200,0.22), inset 0 -8px 14px rgba(150,110,230,0.18), inset 0 8px 14px rgba(255,255,255,0.9)',
      '--sc-font': '"Baloo 2", "Quicksand", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成黏土拟态（Claymorphism）界面：
- 背景：柔和紫蓝渐变 (#f6e7ff → #e7f0ff)
- 控件：饱满圆润超大圆角 28px，双内阴影制造黏土膨胀感（顶部白色高光 + 底部紫色暗部）+ 外投影
- 配色：糖果紫 #a374ff、薄荷、蜜桃等高明度低饱和；文字 #5b3d8a
- 字体 Baloo 2 / Quicksand 圆胖；图标也做成 3D 黏土风
- 氛围：俏皮、可爱、有触感；元素之间间距大、像可捏的软糖`,
      'en-US': `Design a claymorphism UI:
- Background soft violet-blue gradient (#f6e7ff → #e7f0ff)
- Controls: puffy huge 28px radius, dual inset shadows for inflated clay (top white highlight + bottom violet) plus outer drop shadow
- Palette candy purple #a374ff, mint, peach — bright low-sat; text #5b3d8a
- Font Baloo 2 / Quicksand chubby; 3D clay-style icons
- Playful tactile mood, generous spacing, squeezable look`,
    },
  }),
  S({
    id: 'memphis-pop',
    slug: 'memphis-pop',
    category: 'signature',
    title: { 'zh-CN': '孟菲斯波普', 'en-US': 'Memphis Pop' },
    description: {
      'zh-CN': '80 年代孟菲斯：撞色几何、波点斜纹、随意拼贴、粗黑描边。',
      'en-US': '80s Memphis: clashing geometry, dots & squiggles, bold collage.',
    },
    tags: ['memphis', 'pop', 'geometric', 'bold', 'colorful'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#fdf6e3',
      '--sc-bg-fallback': '#fdf6e3',
      '--sc-fg': '#1a1a1a',
      '--sc-primary': '#ff5d73',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': '#ffe066',
      '--sc-muted-fg': '#1a1a1a',
      '--sc-border': '#1a1a1a',
      '--sc-radius': '10px',
      '--sc-shadow': '6px 6px 0 #2ec4b6',
      '--sc-font': '"Poppins", "Futura", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成孟菲斯波普（Memphis Design）界面：
- 背景：暖米 #fdf6e3，散布几何装饰（波点、锯齿、斜条、三角、波浪线）
- 撞色：珊瑚红 #ff5d73、明黄 #ffe066、青绿 #2ec4b6、宝蓝随意碰撞
- 粗黑 2-3px 描边 #1a1a1a，硬色块投影 6px 6px 0 #2ec4b6（无模糊）
- 中等圆角 10px，字体 Poppins / Futura 几何无衬线，粗体
- 氛围：80 年代、欢快、随意拼贴、强烈视觉冲击`,
      'en-US': `Design a Memphis pop UI:
- Background warm cream #fdf6e3 scattered with geometric decor (dots, zigzags, stripes, triangles, squiggles)
- Clashing colors: coral #ff5d73, yellow #ffe066, teal #2ec4b6, royal blue
- Bold 2-3px black borders #1a1a1a, hard offset shadow 6px 6px 0 #2ec4b6 (no blur)
- 10px radius, font Poppins / Futura geometric sans, bold
- 80s playful collage, strong visual impact`,
    },
  }),
  S({
    id: 'art-deco-gold',
    slug: 'art-deco-gold',
    category: 'signature',
    title: { 'zh-CN': '装饰艺术', 'en-US': 'Art Deco' },
    description: {
      'zh-CN': '20 年代华丽：墨绿与金箔、对称几何、扇形放射、衬线大标题。',
      'en-US': '1920s glamour: emerald & gold, symmetric geometry, sunburst, serif.',
    },
    tags: ['artdeco', 'gold', 'luxury', 'vintage', 'geometric'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#0f2a26',
      '--sc-bg-fallback': '#0f2a26',
      '--sc-fg': '#f2e6c9',
      '--sc-primary': '#c9a227',
      '--sc-primary-fg': '#0f2a26',
      '--sc-muted': '#16352f',
      '--sc-muted-fg': '#b9a878',
      '--sc-border': '#c9a227',
      '--sc-radius': '4px',
      '--sc-shadow': '0 4px 18px rgba(0,0,0,0.45)',
      '--sc-font': '"Cormorant Garamond", "Playfair Display", "Songti SC", serif',
    },
    prompt: {
      'zh-CN': `生成装饰艺术（Art Deco / Gatsby）界面：
- 背景：深墨绿 #0f2a26，搭配金箔 #c9a227 线条与对称几何
- 装饰：扇形放射(sunburst)、阶梯纹、菱形、细金边框与分隔
- 文字：暖象牙 #f2e6c9，衬线大标题 Cormorant / Playfair，字距宽、可全大写
- 小圆角 4px，奢华深投影；金色用于强调与分隔线
- 氛围：1920 年代、华丽、对称、高级感；避免圆润与卡通元素`,
      'en-US': `Design an Art Deco / Gatsby UI:
- Background deep emerald #0f2a26 with gold #c9a227 lines and symmetric geometry
- Decor: sunburst rays, stepped motifs, diamonds, thin gold frames/dividers
- Text ivory #f2e6c9, serif display Cormorant / Playfair, wide tracking, optional all-caps
- 4px radius, luxurious deep shadow; gold for accents and dividers
- 1920s glamour, symmetry, premium feel; avoid rounded/cartoon elements`,
    },
  }),
  S({
    id: 'bauhaus',
    slug: 'bauhaus',
    category: 'signature',
    title: { 'zh-CN': '包豪斯', 'en-US': 'Bauhaus' },
    description: {
      'zh-CN': '红黄蓝三原色 + 黑白、圆方三角基本形、网格秩序、功能主义。',
      'en-US': 'Primary red/yellow/blue + black/white, basic shapes, grid order.',
    },
    tags: ['bauhaus', 'geometric', 'primary', 'modernist', 'bold'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#f4f1ea',
      '--sc-bg-fallback': '#f4f1ea',
      '--sc-fg': '#1a1a1a',
      '--sc-primary': '#d62828',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': '#ffffff',
      '--sc-muted-fg': '#444444',
      '--sc-border': '#1a1a1a',
      '--sc-radius': '0px',
      '--sc-shadow': 'none',
      '--sc-font': '"Futura", "Archivo", "Helvetica Neue", sans-serif',
    },
    prompt: {
      'zh-CN': `生成包豪斯（Bauhaus）界面：
- 背景：暖白纸色 #f4f1ea；三原色块：红 #d62828、黄 #fcbf49、蓝 #003049 + 黑白
- 基本几何形（圆、方、三角）作为构图与装饰，强网格与对齐
- 0 圆角、粗黑实线 #1a1a1a、无阴影，功能主义、极简秩序
- 字体：Futura / Archivo 几何无衬线，标题可超大、版式即设计
- 氛围：现代主义、理性、原始几何美；色块大面积平涂`,
      'en-US': `Design a Bauhaus UI:
- Background warm paper #f4f1ea; primaries red #d62828, yellow #fcbf49, blue #003049 + black/white
- Basic shapes (circle, square, triangle) as composition and decor, strong grid
- 0 radius, bold black lines #1a1a1a, no shadow, functionalist order
- Font Futura / Archivo geometric sans, oversized titles, typography as design
- Modernist rational primal-geometry mood; large flat color fields`,
    },
  }),
  S({
    id: 'swiss-international',
    slug: 'swiss-international',
    category: 'signature',
    title: { 'zh-CN': '瑞士国际主义', 'en-US': 'Swiss International' },
    description: {
      'zh-CN': '国际主义排版：严格网格、Helvetica、左对齐、红黑配色、信息至上。',
      'en-US': 'Grid typography, Helvetica, flush-left, red/black, clarity first.',
    },
    tags: ['swiss', 'typographic', 'grid', 'minimal', 'editorial'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#ffffff',
      '--sc-bg-fallback': '#ffffff',
      '--sc-fg': '#111111',
      '--sc-primary': '#e3120b',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': '#f2f2f2',
      '--sc-muted-fg': '#666666',
      '--sc-border': '#111111',
      '--sc-radius': '0px',
      '--sc-shadow': 'none',
      '--sc-font': '"Helvetica Neue", "Arial", "Inter", sans-serif',
    },
    prompt: {
      'zh-CN': `生成瑞士国际主义（Swiss / International Typographic）界面：
- 纯白底 #ffffff，黑字 #111111，唯一强调色：信号红 #e3120b
- 严格的模块网格、基线对齐，内容一律左对齐(flush-left ragged-right)
- 0 圆角、无阴影、细黑分隔线；大量留白，层级靠字号/字重区分
- 字体：Helvetica Neue / Arial，标题超大、正文精确行高
- 氛围：客观、清晰、编辑感；装饰极少，排版即一切`,
      'en-US': `Design a Swiss / International Typographic UI:
- Pure white #ffffff, black text #111111, single accent signal red #e3120b
- Strict modular grid, baseline alignment, flush-left ragged-right text
- 0 radius, no shadow, thin black dividers; lots of whitespace, hierarchy via size/weight
- Font Helvetica Neue / Arial, oversized headings, precise line-height
- Objective, clear, editorial; minimal decoration, typography is everything`,
    },
  }),
  S({
    id: 'y2k-chrome',
    slug: 'y2k-chrome',
    category: 'signature',
    title: { 'zh-CN': 'Y2K 千禧铬', 'en-US': 'Y2K Chrome' },
    description: {
      'zh-CN': '千禧年美学：液态金属铬、彩虹镭射、气泡按钮、星星与光晕。',
      'en-US': 'Millennium aesthetic: liquid chrome, rainbow laser, bubble buttons.',
    },
    tags: ['y2k', 'chrome', 'metallic', 'retro', 'glossy'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': 'linear-gradient(135deg, #c2e9fb 0%, #d4d4ff 50%, #e0c3fc 100%)',
      '--sc-bg-fallback': '#d4d4ff',
      '--sc-fg': '#2a2a4a',
      '--sc-primary': 'linear-gradient(180deg, #f5f7fa 0%, #b8c6db 100%)',
      '--sc-primary-fg': '#2a2a4a',
      '--sc-muted': 'rgba(255,255,255,0.55)',
      '--sc-muted-fg': '#6a6a8a',
      '--sc-border': '#9fb4d6',
      '--sc-radius': '24px',
      '--sc-shadow': '0 6px 18px rgba(120,140,200,0.35), inset 0 2px 4px rgba(255,255,255,0.9)',
      '--sc-font': '"Arial Rounded MT Bold", "Verdana", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成 Y2K 千禧铬（Frutiger-adjacent / chrome）界面：
- 背景：天蓝-淡紫梦幻渐变 (#c2e9fb → #d4d4ff → #e0c3fc)，点缀星星、镜头光晕
- 控件：液态铬金属质感，胶囊气泡大圆角 24px，顶部白色高光 inset、底部反射
- 彩虹镭射高光、玻璃水滴感；文字深蓝紫 #2a2a4a
- 字体：Arial Rounded / Verdana 圆润粗体；图标光滑发亮
- 氛围：2000 年代乐观未来感、闪亮、塑料/金属混搭`,
      'en-US': `Design a Y2K chrome UI:
- Background dreamy sky-to-lilac gradient (#c2e9fb → #d4d4ff → #e0c3fc) with stars and lens flares
- Controls: liquid chrome metal, pill bubble 24px radius, top white inset highlight, bottom reflection
- Rainbow laser sheen, glassy water-drop feel; text deep blue-violet #2a2a4a
- Font Arial Rounded / Verdana bold; glossy glowing icons
- Optimistic 2000s futurism, shiny plastic/metal mix`,
    },
  }),
  S({
    id: 'dark-luxury-gold',
    slug: 'dark-luxury-gold',
    category: 'signature',
    title: { 'zh-CN': '暗黑奢华金', 'en-US': 'Dark Luxury Gold' },
    description: {
      'zh-CN': '高端暗夜：纯黑底、香槟金描边、衬线标题、克制留白与微光。',
      'en-US': 'Premium night: black base, champagne gold, serif titles, restraint.',
    },
    tags: ['luxury', 'dark', 'gold', 'premium', 'elegant'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#0c0c0e',
      '--sc-bg-fallback': '#0c0c0e',
      '--sc-fg': '#f5f0e6',
      '--sc-primary': '#cBa45c',
      '--sc-primary-fg': '#0c0c0e',
      '--sc-muted': '#16161a',
      '--sc-muted-fg': '#9a937f',
      '--sc-border': '#2a2820',
      '--sc-radius': '6px',
      '--sc-shadow': '0 10px 30px rgba(0,0,0,0.6)',
      '--sc-font': '"Cinzel", "Playfair Display", "Songti SC", serif',
    },
    prompt: {
      'zh-CN': `生成暗黑奢华金（Dark Luxury）界面：
- 背景：极深近黑 #0c0c0e，卡片 #16161a
- 强调：香槟金 #cba45c 细描边与文字点缀，金色用量克制、只作画龙点睛
- 文字：暖白 #f5f0e6，衬线标题 Cinzel / Playfair，字距宽、优雅
- 小圆角 6px，深邃投影，微妙金色渐变高光线
- 氛围：高端、神秘、克制；大量负空间，避免饱和色与卡通元素`,
      'en-US': `Design a dark luxury gold UI:
- Background near-black #0c0c0e, cards #16161a
- Accent champagne gold #cba45c thin borders and text, used sparingly as highlights
- Text warm white #f5f0e6, serif titles Cinzel / Playfair, wide elegant tracking
- 6px radius, deep shadow, subtle gold gradient highlight lines
- Premium mysterious restrained mood; lots of negative space; avoid saturated/cartoon`,
    },
  }),
  S({
    id: 'kawaii-pastel',
    slug: 'kawaii-pastel',
    category: 'signature',
    title: { 'zh-CN': '卡哇伊马卡龙', 'en-US': 'Kawaii Pastel' },
    description: {
      'zh-CN': '日系可爱：马卡龙粉蓝、圆润气泡、贴纸表情、手写圆体。',
      'en-US': 'Japanese cute: macaron pastels, bubbles, sticker faces, rounded type.',
    },
    tags: ['kawaii', 'pastel', 'cute', 'playful', 'soft'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#fff0f6',
      '--sc-bg-fallback': '#fff0f6',
      '--sc-fg': '#7a5c6e',
      '--sc-primary': '#ff9ec4',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': '#fdfdff',
      '--sc-muted-fg': '#b79dad',
      '--sc-border': '#ffd6e7',
      '--sc-radius': '22px',
      '--sc-shadow': '0 6px 16px rgba(255,158,196,0.3)',
      '--sc-font': '"Baloo 2", "M PLUS Rounded 1c", "PingFang SC", sans-serif',
    },
    prompt: {
      'zh-CN': `生成卡哇伊马卡龙（Kawaii Pastel）界面：
- 背景：淡粉 #fff0f6，搭配马卡龙粉蓝黄紫等高明度低饱和色
- 主色：樱花粉 #ff9ec4，大圆角 22px，柔粉投影 0 6px 16px rgba(255,158,196,0.3)
- 装饰：圆点、爱心、星星、贴纸表情(>ω<)，气泡对话框
- 字体：Baloo 2 / 圆体，胖乎乎；文字暖紫灰 #7a5c6e
- 氛围：可爱、甜美、治愈；元素拟人化、留白柔和`,
      'en-US': `Design a kawaii pastel UI:
- Background pale pink #fff0f6 with macaron pastels (pink, blue, yellow, lilac)
- Accent sakura pink #ff9ec4, 22px radius, soft pink shadow 0 6px 16px rgba(255,158,196,0.3)
- Decor: dots, hearts, stars, sticker faces (>ω<), speech bubbles
- Font Baloo 2 / rounded chubby; text warm mauve #7a5c6e
- Cute sweet healing mood, anthropomorphic elements, soft spacing`,
    },
  }),
  S({
    id: 'retro-terminal',
    slug: 'retro-terminal',
    category: 'signature',
    title: { 'zh-CN': '复古终端', 'en-US': 'Retro Terminal' },
    description: {
      'zh-CN': 'CRT 绿屏终端：磷光绿等宽字、扫描线、闪烁光标、命令行美学。',
      'en-US': 'CRT green terminal: phosphor mono type, scanlines, blinking cursor.',
    },
    tags: ['terminal', 'crt', 'mono', 'retro', 'hacker'],
    stack: ['React', 'CSS'],
    tokens: {
      '--sc-bg': '#0a0f0a',
      '--sc-bg-fallback': '#0a0f0a',
      '--sc-fg': '#33ff66',
      '--sc-primary': '#33ff66',
      '--sc-primary-fg': '#0a0f0a',
      '--sc-muted': '#0f1a0f',
      '--sc-muted-fg': '#1f9c4a',
      '--sc-border': '#1f6b34',
      '--sc-radius': '0px',
      '--sc-shadow': '0 0 10px rgba(51,255,102,0.4)',
      '--sc-font': '"IBM Plex Mono", "VT323", "Courier New", monospace',
    },
    prompt: {
      'zh-CN': `生成复古终端（CRT Green Terminal）界面：
- 背景：近黑深绿 #0a0f0a，整屏叠加细扫描线与轻微弧面暗角
- 文字：磷光绿 #33ff66，等宽字体 IBM Plex Mono / VT323，带 0 0 10px 绿色辉光
- 元素：命令行提示符 >、闪烁方块光标、ASCII 边框、进度用 [#####-----]
- 0 圆角、绿色细线 #1f6b34；hover/选中用反白(绿底黑字)
- 氛围：黑客、复古计算机、80 年代机房；可加打字机逐字动画`,
      'en-US': `Design a retro CRT green terminal UI:
- Background near-black green #0a0f0a with scanlines and subtle curved vignette
- Text phosphor green #33ff66, mono IBM Plex Mono / VT323, glow 0 0 10px green
- Elements: command prompt >, blinking block cursor, ASCII borders, [#####-----] progress
- 0 radius, thin green lines #1f6b34; hover/active inverts (green bg, black text)
- Hacker retro-computer 80s mood; optional typewriter reveal animation`,
    },
  }),
  S({
    id: 'material-you',
    slug: 'material-you',
    category: 'signature',
    title: { 'zh-CN': 'Material You', 'en-US': 'Material You (M3)' },
    description: {
      'zh-CN': 'Android 12+ Material 3：动态取色、大圆角、色调表面、表达性排版。',
      'en-US': 'Android 12+ Material 3: dynamic color, large radius, tonal surfaces.',
    },
    tags: ['material', 'google', 'android', 'dynamic', 'expressive'],
    stack: ['React', 'Tailwind CSS', 'MUI'],
    tokens: {
      '--sc-bg': '#fef7ff',
      '--sc-bg-fallback': '#fef7ff',
      '--sc-fg': '#1d1b20',
      '--sc-primary': '#6750a4',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': '#e7e0ec',
      '--sc-muted-fg': '#49454f',
      '--sc-border': '#cac4d0',
      '--sc-radius': '20px',
      '--sc-shadow': '0 1px 3px rgba(0,0,0,0.12)',
      '--sc-font': '"Roboto Flex", "Google Sans", "PingFang SC", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成 Material You / Material 3 界面：
- 动态取色：以单一种子色生成主色 #6750a4 与色调表面 (primary/secondary/tertiary container)
- 表面：浅紫白 #fef7ff，容器 #e7e0ec；超大圆角（按钮 full、卡片 12-20px）
- 强调“表达性”：大标题、彩色填充芯片、FAB、状态层(state layer) hover/press 叠色
- 文字 #1d1b20，字体 Roboto Flex / Google Sans；elevation 用柔和阴影 + tonal overlay
- 氛围：友好、现代、个性化；遵循 M3 间距与动效曲线`,
      'en-US': `Design a Material You / Material 3 UI:
- Dynamic color: derive primary #6750a4 and tonal surfaces (primary/secondary/tertiary containers) from one seed
- Surfaces: lilac-white #fef7ff, container #e7e0ec; large radius (buttons full, cards 12-20px)
- Expressive: big headlines, colored filled chips, FAB, state-layer hover/press overlays
- Text #1d1b20, font Roboto Flex / Google Sans; elevation via soft shadow + tonal overlay
- Friendly modern personalized mood following M3 spacing/motion`,
    },
  }),
  S({
    id: 'frutiger-aero',
    slug: 'frutiger-aero',
    category: 'signature',
    title: { 'zh-CN': 'Frutiger Aero', 'en-US': 'Frutiger Aero' },
    description: {
      'zh-CN': '2007 era：水滴玻璃、清新天蓝绿、气泡光泽、自然环保意象。',
      'en-US': '2007-era glossy glass, fresh sky-green, bubbles, eco-nature vibe.',
    },
    tags: ['frutiger', 'aero', 'glossy', 'fresh', 'skeuomorphic'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': 'linear-gradient(180deg, #aee1ff 0%, #d8f5e3 100%)',
      '--sc-bg-fallback': '#bfe7f5',
      '--sc-fg': '#10384f',
      '--sc-primary': '#2fb4e9',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': 'rgba(255,255,255,0.55)',
      '--sc-muted-fg': '#3d6b80',
      '--sc-border': 'rgba(255,255,255,0.7)',
      '--sc-radius': '16px',
      '--sc-shadow': '0 8px 22px rgba(40,140,200,0.28), inset 0 2px 6px rgba(255,255,255,0.85)',
      '--sc-font': '"Segoe UI", "Myriad Pro", "PingFang SC", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成 Frutiger Aero（2007 Windows Vista 时代）界面：
- 背景：清新天蓝到嫩绿渐变 (#aee1ff → #d8f5e3)，常见气泡、水滴、绿叶、晴空意象
- 控件：光泽玻璃质感，顶部强高光 inset、胶囊大圆角 16px、外发光蓝投影
- 主色：明亮天蓝 #2fb4e9，文字深青 #10384f
- 字体：Segoe UI / Myriad Pro；图标水润反光、健康环保隐喻
- 氛围：乐观、清新、自然科技；强调“湿润”玻璃与光感`,
      'en-US': `Design a Frutiger Aero (2007 Vista-era) UI:
- Background fresh sky-blue to green gradient (#aee1ff → #d8f5e3) with bubbles, water drops, leaves, clear skies
- Controls: glossy glass, strong top inset highlight, pill 16px radius, blue outer glow
- Accent bright sky blue #2fb4e9, text deep teal #10384f
- Font Segoe UI / Myriad Pro; wet glossy icons, eco-tech metaphors
- Optimistic fresh natural-tech mood; emphasize 'wet' glass and light`,
    },
  }),
  S({
    id: 'gradient-mesh',
    slug: 'gradient-mesh',
    category: 'signature',
    title: { 'zh-CN': '网格渐变', 'en-US': 'Gradient Mesh' },
    description: {
      'zh-CN': '现代 SaaS：多彩网格渐变背景、玻璃卡片、柔光球、明快科技感。',
      'en-US': 'Modern SaaS: colorful mesh gradient, glass cards, glow orbs.',
    },
    tags: ['gradient', 'mesh', 'saas', 'modern', 'glass'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': 'radial-gradient(at 20% 20%, #ff7eb3 0px, transparent 50%), radial-gradient(at 80% 0%, #7afcff 0px, transparent 50%), radial-gradient(at 60% 90%, #feff9c 0px, transparent 50%), #1b1340',
      '--sc-bg-fallback': '#241a52',
      '--sc-fg': '#f6f3ff',
      '--sc-primary': '#8b5cf6',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': 'rgba(255,255,255,0.08)',
      '--sc-muted-fg': '#c9c2e8',
      '--sc-border': 'rgba(255,255,255,0.16)',
      '--sc-radius': '16px',
      '--sc-shadow': '0 12px 40px rgba(0,0,0,0.4)',
      '--sc-font': '"Inter", "Sora", system-ui, sans-serif',
      '--sc-backdrop': 'blur(16px)',
    },
    prompt: {
      'zh-CN': `生成现代网格渐变（Mesh Gradient SaaS）界面：
- 背景：深紫底 #1b1340 上多个柔光彩色球(粉/青/黄)径向渐变交融，制造 mesh 效果
- 卡片：玻璃 rgba(255,255,255,0.08) + blur(16px)，1px 半透明白描边，16px 圆角
- 主色：紫 #8b5cf6，文字近白 #f6f3ff，次要 #c9c2e8
- 深投影 0 12px 40px；字体 Inter / Sora；按钮带渐变填充与微光
- 氛围：现代 SaaS/AI 产品官网、明快、有科技呼吸感`,
      'en-US': `Design a modern mesh-gradient SaaS UI:
- Background deep violet #1b1340 with multiple soft color orbs (pink/cyan/yellow) radial-blended into a mesh
- Cards: glass rgba(255,255,255,0.08) + blur(16px), 1px translucent white border, 16px radius
- Accent violet #8b5cf6, text near-white #f6f3ff, secondary #c9c2e8
- Deep shadow 0 12px 40px; font Inter / Sora; gradient-filled buttons with glow
- Modern SaaS/AI landing mood, vibrant, tech 'breathing'`,
    },
  }),
  S({
    id: 'brutalist-web',
    slug: 'brutalist-web',
    category: 'signature',
    title: { 'zh-CN': '野兽派网页', 'en-US': 'Brutalist Web' },
    description: {
      'zh-CN': '原始野兽派：裸 HTML 质感、系统字、粗黑线、刺眼撞色、无修饰。',
      'en-US': 'Raw brutalism: naked HTML feel, system fonts, harsh borders.',
    },
    tags: ['brutalist', 'raw', 'bold', 'experimental', 'mono'],
    stack: ['React', 'CSS'],
    tokens: {
      '--sc-bg': '#ffffff',
      '--sc-bg-fallback': '#ffffff',
      '--sc-fg': '#000000',
      '--sc-primary': '#0000ff',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': '#f0f0f0',
      '--sc-muted-fg': '#000000',
      '--sc-border': '#000000',
      '--sc-radius': '0px',
      '--sc-shadow': '5px 5px 0 #000000',
      '--sc-font': '"Times New Roman", "Courier New", monospace',
    },
    prompt: {
      'zh-CN': `生成野兽派网页（Brutalist Web）界面：
- 纯白底黑字，刺眼超链接蓝 #0000ff（带下划线），可加红色警示
- 粗黑 3px 实线边框、硬阴影 5px 5px 0 #000（无模糊）、0 圆角
- 排版“裸”：系统/衬线/等宽字混用，行宽不限，故意不对齐、不留白讲究
- 元素直白：原生按钮、明显边框、可见网格线；拒绝渐变与柔和阴影
- 氛围：反设计、原始、实验、强烈个性；内容优先、加载极快`,
      'en-US': `Design a brutalist web UI:
- Pure white bg, black text, harsh link blue #0000ff (underlined), optional red alerts
- Bold 3px black borders, hard shadow 5px 5px 0 #000 (no blur), 0 radius
- 'Naked' typography: mixed system/serif/mono, full-width text, intentional misalignment
- Blunt elements: native buttons, visible borders/grid; no gradients or soft shadows
- Anti-design raw experimental mood; content-first, ultra-fast`,
    },
  }),
  S({
    id: 'sci-fi-hud',
    slug: 'sci-fi-hud',
    category: 'signature',
    title: { 'zh-CN': '科幻 HUD', 'en-US': 'Sci-Fi HUD' },
    description: {
      'zh-CN': '太空座舱 HUD：青蓝全息线框、环形仪表、数据流、半透明叠层。',
      'en-US': 'Spaceship HUD: cyan holographic wireframes, ring gauges, data streams.',
    },
    tags: ['scifi', 'hud', 'futuristic', 'tech', 'dark'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': 'radial-gradient(circle at 50% 40%, #0a1f33 0%, #050b14 100%)',
      '--sc-bg-fallback': '#071524',
      '--sc-fg': '#bdecff',
      '--sc-primary': '#22d3ee',
      '--sc-primary-fg': '#021018',
      '--sc-muted': 'rgba(34,211,238,0.08)',
      '--sc-muted-fg': '#6fb8d6',
      '--sc-border': 'rgba(34,211,238,0.45)',
      '--sc-radius': '4px',
      '--sc-shadow': '0 0 20px rgba(34,211,238,0.4)',
      '--sc-font': '"Orbitron", "Exo 2", "Share Tech Mono", monospace',
    },
    prompt: {
      'zh-CN': `生成科幻 HUD（太空座舱界面）：
- 背景：深空蓝径向渐变 (#0a1f33 → #050b14)，叠加细网格与星点
- 全息线框：青蓝 #22d3ee 细线、环形/弧形仪表、雷达扫描、角标切角框
- 半透明叠层 rgba(34,211,238,0.08) + 发光 0 0 20px；小圆角 4px
- 文字浅青 #bdecff，字体 Orbitron / Exo 2，全大写编号与实时数据流
- 氛围：未来太空、信息可视化、动态扫描线；强调线条而非实心面`,
      'en-US': `Design a sci-fi HUD (spaceship cockpit) UI:
- Background deep-space blue radial (#0a1f33 → #050b14) with fine grid and stars
- Holographic wireframes: cyan #22d3ee thin lines, ring/arc gauges, radar sweeps, chamfered corner frames
- Translucent overlays rgba(34,211,238,0.08) + glow 0 0 20px; 4px radius
- Text pale cyan #bdecff, font Orbitron / Exo 2, uppercase codes and live data streams
- Futuristic space data-viz mood, animated scanlines; emphasize lines over solid fills`,
    },
  }),
  S({
    id: 'ink-wash-chinese',
    slug: 'ink-wash-chinese',
    category: 'signature',
    title: { 'zh-CN': '中国水墨', 'en-US': 'Chinese Ink Wash' },
    description: {
      'zh-CN': '东方水墨：宣纸米色、浓淡墨韵、朱红印章、留白意境与衬线书法。',
      'en-US': 'Eastern ink: rice-paper beige, ink gradients, vermilion seal, serenity.',
    },
    tags: ['ink', 'chinese', 'oriental', 'elegant', 'minimal'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#f3efe6',
      '--sc-bg-fallback': '#f3efe6',
      '--sc-fg': '#1c1c1c',
      '--sc-primary': '#9e2b25',
      '--sc-primary-fg': '#f3efe6',
      '--sc-muted': '#e8e2d4',
      '--sc-muted-fg': '#5c574c',
      '--sc-border': '#cfc7b4',
      '--sc-radius': '2px',
      '--sc-shadow': '0 4px 16px rgba(60,50,30,0.12)',
      '--sc-font': '"Songti SC", "STSong", "Noto Serif SC", serif',
    },
    prompt: {
      'zh-CN': `生成中国水墨（东方意境）界面：
- 背景：宣纸米色 #f3efe6，可加淡淡墨晕与纤维纹理
- 墨色：浓淡变化的黑 #1c1c1c 作主体，朱红 #9e2b25 仅用于印章/落款/强调
- 大量留白(计白当黑)，构图疏密有致；分隔用淡墨细线 #cfc7b4
- 字体：宋体/思源宋体衬线，标题可竖排，配书法笔触装饰
- 小圆角 2px、柔和投影；氛围：禅意、雅致、克制、东方哲学`,
      'en-US': `Design a Chinese ink-wash (Eastern) UI:
- Background rice-paper beige #f3efe6 with faint ink bleed and fiber texture
- Ink: gradated black #1c1c1c as the body, vermilion #9e2b25 only for seals/signatures/accents
- Lots of whitespace (negative space as composition); thin ink dividers #cfc7b4
- Font Songti / Noto Serif SC, optional vertical titles, calligraphic strokes
- 2px radius, soft shadow; zen elegant restrained Eastern mood`,
    },
  }),
  S({
    id: 'newspaper-print',
    slug: 'newspaper-print',
    category: 'signature',
    title: { 'zh-CN': '报纸印刷', 'en-US': 'Newspaper Print' },
    description: {
      'zh-CN': '老报纸：泛黄纸张、衬线大标题、多栏排版、黑白半调网点。',
      'en-US': 'Vintage paper, serif mastheads, multi-column, halftone B/W.',
    },
    tags: ['newspaper', 'editorial', 'print', 'serif', 'vintage'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#f5f1e6',
      '--sc-bg-fallback': '#f5f1e6',
      '--sc-fg': '#1a1a1a',
      '--sc-primary': '#1a1a1a',
      '--sc-primary-fg': '#f5f1e6',
      '--sc-muted': '#eae4d3',
      '--sc-muted-fg': '#55503f',
      '--sc-border': '#1a1a1a',
      '--sc-radius': '0px',
      '--sc-shadow': 'none',
      '--sc-font': '"Playfair Display", "Times New Roman", "Songti SC", serif',
    },
    prompt: {
      'zh-CN': `生成老式报纸（Editorial Newspaper）界面：
- 背景：泛黄报纸纸色 #f5f1e6，可加轻微噪点与折痕
- 排版：多栏(column)布局、衬线大刊头标题(Playfair/Times)、首字下沉、栏间细黑分隔线
- 黑白为主 #1a1a1a，强调用方框/反白小标签；图片用半调网点(halftone)处理
- 0 圆角、无阴影、细黑实线边框；正文紧凑、行宽窄、对齐两端
- 氛围：复古印刷、权威、信息密集；日期/版次/栏目线点缀`,
      'en-US': `Design a vintage newspaper editorial UI:
- Background aged newsprint #f5f1e6 with subtle noise and creases
- Layout: multi-column, serif masthead (Playfair/Times), drop caps, thin black column rules
- Mostly black/white #1a1a1a, accents via boxed/inverted labels; images as halftone dots
- 0 radius, no shadow, thin black borders; tight justified body text, narrow columns
- Retro print authoritative dense mood; dates, edition, section rules`,
    },
  }),
  S({
    id: 'skeuomorphism-ios6',
    slug: 'skeuomorphism-ios6',
    category: 'signature',
    title: { 'zh-CN': '拟物化 iOS6', 'en-US': 'Skeuomorphism' },
    description: {
      'zh-CN': '旧 iOS 拟物：真实材质、缝线皮革、立体高光按钮、写实图标。',
      'en-US': 'Old iOS skeuomorphic: real textures, stitched leather, glossy buttons.',
    },
    tags: ['skeuomorphic', 'ios', 'realistic', 'texture', 'glossy'],
    stack: ['React', 'CSS'],
    tokens: {
      '--sc-bg': 'linear-gradient(180deg, #4a3a2a 0%, #3a2c1e 100%)',
      '--sc-bg-fallback': '#41331f',
      '--sc-fg': '#fdf6e3',
      '--sc-primary': 'linear-gradient(180deg, #6fb1fc 0%, #3a6fd8 100%)',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': 'linear-gradient(180deg, #faf6ee 0%, #e7ddc8 100%)',
      '--sc-muted-fg': '#5c4a32',
      '--sc-border': '#2a2014',
      '--sc-radius': '12px',
      '--sc-shadow': '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5)',
      '--sc-font': '"Helvetica Neue", "PingFang SC", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成拟物化（Skeuomorphism, iOS 6 时代）界面：
- 真实材质隐喻：缝线皮革、拉丝金属、毛毡、木纹、纸张
- 背景深棕皮革渐变 (#4a3a2a → #3a2c1e)，面板奶白凸起带顶部高光 inset
- 按钮：立体渐变 + 高光 + 投影，仿真实物理凸起；蓝色按钮 (#6fb1fc → #3a6fd8)
- 12px 圆角、文字暖白/深棕，写实图标带阴影与反光
- 氛围：真实、厚重、可触摸；模拟现实物件的光影与质感`,
      'en-US': `Design a skeuomorphic (iOS 6-era) UI:
- Real-material metaphors: stitched leather, brushed metal, felt, wood, paper
- Background dark leather gradient (#4a3a2a → #3a2c1e), cream raised panels with top inset highlight
- Buttons: 3D gradient + highlight + shadow, physically raised; blue button (#6fb1fc → #3a6fd8)
- 12px radius, warm-white/brown text, realistic icons with shadows and gloss
- Tactile heavy realistic mood mimicking real-world light and texture`,
    },
  }),
  S({
    id: 'candy-gradient',
    slug: 'candy-gradient',
    category: 'signature',
    title: { 'zh-CN': '糖果渐变', 'en-US': 'Candy Gradient' },
    description: {
      'zh-CN': '高饱和糖果色渐变、活力撞色、圆润大按钮，年轻有活力。',
      'en-US': 'High-saturation candy gradients, vivid clashes, big rounded CTAs.',
    },
    tags: ['candy', 'gradient', 'vibrant', 'playful', 'colorful'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 40%, #a18cd1 100%)',
      '--sc-bg-fallback': '#f4a6c0',
      '--sc-fg': '#3a2740',
      '--sc-primary': 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': 'rgba(255,255,255,0.7)',
      '--sc-muted-fg': '#7a5c78',
      '--sc-border': 'rgba(255,255,255,0.8)',
      '--sc-radius': '24px',
      '--sc-shadow': '0 10px 26px rgba(248,87,166,0.3)',
      '--sc-font': '"Poppins", "Nunito", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成糖果渐变（Candy Gradient）界面：
- 背景：高饱和暖色渐变 (#ff9a9e → #fad0c4 → #a18cd1)，活力满满
- 主按钮：粉红渐变 (#f857a6 → #ff5858)，超大圆角 24px，彩色发光投影
- 卡片：半透明白 rgba(255,255,255,0.7)，文字深紫 #3a2740
- 字体 Poppins / Nunito 圆润粗体；强调大 CTA、彩色标签、活泼插画
- 氛围：年轻、活力、社交/娱乐 App；色彩明快但保持可读性`,
      'en-US': `Design a candy gradient UI:
- Background high-saturation warm gradient (#ff9a9e → #fad0c4 → #a18cd1), energetic
- Primary button pink gradient (#f857a6 → #ff5858), 24px radius, colorful glow shadow
- Cards translucent white rgba(255,255,255,0.7), text deep violet #3a2740
- Font Poppins / Nunito rounded bold; big CTAs, colorful chips, lively illustrations
- Young energetic social/entertainment mood; vivid yet readable`,
    },
  }),
  S({
    id: 'botanical-organic',
    slug: 'botanical-organic',
    category: 'signature',
    title: { 'zh-CN': '植物有机', 'en-US': 'Botanical Organic' },
    description: {
      'zh-CN': '自然有机：苔绿大地色、植物插画、不规则圆形、温暖手作感。',
      'en-US': 'Natural organic: moss & earth tones, botanical art, blob shapes.',
    },
    tags: ['organic', 'nature', 'green', 'earthy', 'warm'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#f4f1e9',
      '--sc-bg-fallback': '#f4f1e9',
      '--sc-fg': '#33402f',
      '--sc-primary': '#6b8e5a',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': '#e8e6d8',
      '--sc-muted-fg': '#7a7b66',
      '--sc-border': '#d6d2c0',
      '--sc-radius': '24px',
      '--sc-shadow': '0 8px 22px rgba(80,90,60,0.14)',
      '--sc-font': '"Fraunces", "Lora", "Songti SC", serif',
    },
    prompt: {
      'zh-CN': `生成植物有机（Botanical / Organic）界面：
- 背景：自然亚麻米 #f4f1e9，搭配苔绿 #6b8e5a、大地棕、赤陶等自然色
- 形状：不规则有机圆形(blob)、叶片曲线、手绘植物插画做装饰
- 大圆角 24px、柔和暖投影；衬线字体 Fraunces / Lora，文字深橄榄 #33402f
- 纹理：再生纸/亚麻质感，强调可持续、手作、温暖
- 氛围：自然、健康、宁静；适合环保/食品/健康类产品`,
      'en-US': `Design a botanical / organic UI:
- Background natural linen #f4f1e9 with moss green #6b8e5a, earth brown, terracotta
- Shapes: irregular organic blobs, leaf curves, hand-drawn botanical illustrations
- 24px radius, soft warm shadow; serif Fraunces / Lora, text deep olive #33402f
- Recycled-paper/linen textures, sustainable handmade warmth
- Natural healthy calm mood; great for eco/food/wellness products`,
    },
  }),
  S({
    id: 'corporate-clean',
    slug: 'corporate-clean',
    category: 'signature',
    title: { 'zh-CN': '企业简洁', 'en-US': 'Corporate Clean' },
    description: {
      'zh-CN': '专业可信：蓝白配色、清晰栅格、克制阴影、数据友好的 B 端风格。',
      'en-US': 'Professional trust: blue/white, clean grid, B2B data-friendly.',
    },
    tags: ['corporate', 'professional', 'b2b', 'clean', 'blue'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': '#f7f9fc',
      '--sc-bg-fallback': '#f7f9fc',
      '--sc-fg': '#1f2a44',
      '--sc-primary': '#2563eb',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': '#ffffff',
      '--sc-muted-fg': '#647084',
      '--sc-border': '#e2e8f2',
      '--sc-radius': '10px',
      '--sc-shadow': '0 2px 8px rgba(30,50,90,0.06)',
      '--sc-font': '"Inter", "Roboto", "PingFang SC", system-ui, sans-serif',
    },
    prompt: {
      'zh-CN': `生成企业简洁（Corporate / B2B SaaS）界面：
- 背景浅蓝灰 #f7f9fc，卡片纯白；主色信赖蓝 #2563eb
- 文字深蓝灰 #1f2a44，次要 #647084；细描边 #e2e8f2，柔和阴影 0 2px 8px
- 10px 圆角、清晰的 12 列栅格、规整的表格/表单/数据卡片与图表
- 字体 Inter / Roboto；强调一致性、可读性、信息密度与可访问性
- 氛围：专业、可信、高效；克制装饰，适合后台/仪表盘/管理系统`,
      'en-US': `Design a corporate / B2B SaaS UI:
- Background light blue-grey #f7f9fc, white cards; accent trustworthy blue #2563eb
- Text deep slate #1f2a44, secondary #647084; thin border #e2e8f2, soft shadow 0 2px 8px
- 10px radius, clean 12-col grid, tidy tables/forms/data cards and charts
- Font Inter / Roboto; consistency, readability, density, accessibility
- Professional trustworthy efficient mood for dashboards/admin systems`,
    },
  }),
  S({
    id: 'dark-glass-neon',
    slug: 'dark-glass-neon',
    category: 'signature',
    title: { 'zh-CN': '暗色玻璃霓虹', 'en-US': 'Dark Glass Neon' },
    description: {
      'zh-CN': '暗黑玻璃拟态：深色背景上的磨砂卡片 + 霓虹边缘光，现代炫酷。',
      'en-US': 'Dark glassmorphism: frosted cards on black with neon edge glow.',
    },
    tags: ['dark', 'glass', 'neon', 'modern', 'blur'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': 'radial-gradient(circle at 30% 10%, #1e1b4b 0%, #0a0a14 60%)',
      '--sc-bg-fallback': '#12101f',
      '--sc-fg': '#eef0ff',
      '--sc-primary': '#7c3aed',
      '--sc-primary-fg': '#ffffff',
      '--sc-muted': 'rgba(255,255,255,0.06)',
      '--sc-muted-fg': '#a5a8c4',
      '--sc-border': 'rgba(124,58,237,0.45)',
      '--sc-radius': '16px',
      '--sc-shadow': '0 0 24px rgba(124,58,237,0.4)',
      '--sc-font': '"Inter", "Sora", system-ui, sans-serif',
      '--sc-backdrop': 'blur(18px) saturate(140%)',
    },
    prompt: {
      'zh-CN': `生成暗色玻璃霓虹（Dark Glassmorphism）界面：
- 背景：深空紫黑径向渐变 (#1e1b4b → #0a0a14)
- 卡片：暗色磨砂玻璃 rgba(255,255,255,0.06) + blur(18px)，紫色霓虹边缘光 0 0 24px
- 主色：电紫 #7c3aed，文字近白 #eef0ff，次要 #a5a8c4
- 16px 圆角、半透明紫描边；按钮 hover 增强霓虹辉光
- 氛围：现代、炫酷、夜间科技产品；玻璃层级 + 霓虹强调点缀`,
      'en-US': `Design a dark glassmorphism neon UI:
- Background deep violet-black radial (#1e1b4b → #0a0a14)
- Cards: dark frosted glass rgba(255,255,255,0.06) + blur(18px), purple neon edge glow 0 0 24px
- Accent electric violet #7c3aed, text near-white #eef0ff, secondary #a5a8c4
- 16px radius, translucent violet border; buttons intensify neon glow on hover
- Modern cool nighttime-tech mood; layered glass with neon accents`,
    },
  }),
  S({
    id: 'sunset-warm-gradient',
    slug: 'sunset-warm-gradient',
    category: 'signature',
    title: { 'zh-CN': '暖阳落日', 'en-US': 'Sunset Warm' },
    description: {
      'zh-CN': '温暖落日渐变：橙粉紫天空、柔光、圆润卡片，浪漫治愈。',
      'en-US': 'Warm sunset gradient: orange-pink-violet sky, soft glow, romantic.',
    },
    tags: ['sunset', 'warm', 'gradient', 'soft', 'romantic'],
    stack: ['React', 'Tailwind CSS'],
    tokens: {
      '--sc-bg': 'linear-gradient(160deg, #ff9966 0%, #ff5e7e 45%, #b06ab3 100%)',
      '--sc-bg-fallback': '#ff7a72',
      '--sc-fg': '#3d1f2e',
      '--sc-primary': '#ffffff',
      '--sc-primary-fg': '#c2476a',
      '--sc-muted': 'rgba(255,255,255,0.22)',
      '--sc-muted-fg': '#fff0e8',
      '--sc-border': 'rgba(255,255,255,0.4)',
      '--sc-radius': '20px',
      '--sc-shadow': '0 10px 30px rgba(180,70,110,0.3)',
      '--sc-font': '"Sora", "Poppins", system-ui, sans-serif',
      '--sc-backdrop': 'blur(10px)',
    },
    prompt: {
      'zh-CN': `生成暖阳落日（Sunset Gradient）界面：
- 背景：橙→粉→紫的落日天空渐变 (#ff9966 → #ff5e7e → #b06ab3)
- 卡片：半透明白雾 rgba(255,255,255,0.22) + blur(10px)，20px 大圆角
- 主按钮：白底粉字 (#c2476a)，柔和暖投影 0 10px 30px rgba(180,70,110,0.3)
- 文字暖深红 #3d1f2e / 浅米 #fff0e8；字体 Sora / Poppins
- 氛围：浪漫、温暖、治愈；适合生活/旅行/情感类产品，光感柔和`,
      'en-US': `Design a warm sunset gradient UI:
- Background sunset-sky gradient orange→pink→violet (#ff9966 → #ff5e7e → #b06ab3)
- Cards: translucent white mist rgba(255,255,255,0.22) + blur(10px), 20px radius
- Primary button white with pink text (#c2476a), soft warm shadow 0 10px 30px rgba(180,70,110,0.3)
- Text warm maroon #3d1f2e / cream #fff0e8; font Sora / Poppins
- Romantic warm healing mood for lifestyle/travel/social; soft light`,
    },
  }),

]
