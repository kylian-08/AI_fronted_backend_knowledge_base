import type { ComponentItem } from '@/types/catalog'

export const componentRegistry = {
  version: '1.3.0',
  categories: {
    actions: {
      name: { 'zh-CN': '操作', 'en-US': 'Actions' },
      key: 'actions',
      items: ['buttons', 'icon-button', 'button-group', 'toggle-switch'],
    },
    feedback: {
      name: { 'zh-CN': '反馈组件', 'en-US': 'Feedback' },
      key: 'feedback',
      items: ['modal-dialog', 'toast-notifications', 'progress-bar', 'alert-banner', 'tooltip', 'empty-state', 'skeleton-loader', 'spinner', 'drawer-panel', 'popover', 'notification-center'],
    },
    dataDisplay: {
      name: { 'zh-CN': '数据展示', 'en-US': 'Data Display' },
      key: 'dataDisplay',
      items: ['table-basic', 'badges', 'content-card', 'accordion', 'avatar-group', 'stat-card', 'list-view', 'timeline', 'rating-stars', 'carousel'],
    },
    navigation: {
      name: { 'zh-CN': '导航', 'en-US': 'Navigation' },
      key: 'navigation',
      items: ['navbar', 'sidebar', 'tabs', 'breadcrumb', 'pagination', 'stepper', 'dropdown-menu', 'command-palette', 'context-menu'],
    },
    forms: {
      name: { 'zh-CN': '表单', 'en-US': 'Forms' },
      key: 'forms',
      items: ['sign-in-form', 'search-input', 'text-input', 'select-field', 'checkbox-group', 'radio-group', 'textarea-field', 'date-picker', 'file-upload', 'slider-range', 'chip-input'],
    },
  },
} as const

/** Compact builder for token-driven components (preview rendered via themed renderer). */
function C(c: {
  id: string
  category: string
  title: { 'zh-CN': string; 'en-US': string }
  description: { 'zh-CN': string; 'en-US': string }
  tags: string[]
  stack?: string[]
  states?: string[]
  prompt: { 'zh-CN': string; 'en-US': string }
}): ComponentItem {
  return {
    id: c.id,
    slug: c.id,
    kind: 'component',
    category: c.category,
    status: 'ready',
    title: c.title,
    description: c.description,
    tags: c.tags,
    stack: c.stack ?? ['React', 'TypeScript', 'Tailwind CSS'],
    previewType: 'html',
    previewSource: '',
    states: c.states,
    prompt: c.prompt,
  }
}

export const components: ComponentItem[] = [
  {
    id: 'modal-dialog',
    slug: 'modal-dialog',
    kind: 'component',
    category: 'feedback',
    status: 'ready',
    title: { 'zh-CN': '模态对话框', 'en-US': 'Modal Dialog' },
    description: {
      'zh-CN': '可访问的模态对话框，含遮罩、焦点陷阱与 ESC 关闭。',
      'en-US': 'Accessible modal with overlay, focus trap, and ESC to close.',
    },
    tags: ['modal', 'dialog', 'overlay'],
    stack: ['React', 'Tailwind CSS', 'Radix UI'],
    previewType: 'html',
    previewSource: `<div style="position:relative;padding:24px;background:#1e293b;border-radius:12px;max-width:400px">
  <div style="position:absolute;inset:0;background:rgba(0,0,0,0.5);border-radius:12px"></div>
  <div style="position:relative;background:#0f172a;border:1px solid #334155;border-radius:8px;padding:20px;z-index:1">
    <h3 style="margin:0 0 8px;color:#f8fafc;font-size:18px">确认删除</h3>
    <p style="margin:0 0 16px;color:#94a3b8;font-size:14px">此操作不可撤销，确定继续吗？</p>
    <div style="display:flex;gap:8px;justify-content:flex-end">
      <button style="padding:8px 16px;border:1px solid #334155;background:transparent;color:#f8fafc;border-radius:6px;cursor:pointer">取消</button>
      <button style="padding:8px 16px;border:none;background:#ef4444;color:white;border-radius:6px;cursor:pointer">删除</button>
    </div>
  </div>
</div>`,
    states: ['open', 'closed', 'loading'],
    prompt: {
      'zh-CN': `生成模态对话框组件：

Framework: React 19 + TypeScript strict
Styling: Tailwind CSS + Radix UI Dialog
Accessibility: role="dialog", aria-modal, aria-labelledby, focus trap, ESC 关闭
States: open, closed, loading（确认按钮 spinner）
Backdrop: 点击遮罩关闭（可配置）
动画: fade + scale 150ms ease-out`,
      'en-US': `Generate a Modal Dialog component:

Framework: React 19 + TypeScript strict
Styling: Tailwind CSS + Radix UI Dialog
Accessibility: role="dialog", aria-modal, aria-labelledby, focus trap, ESC to close
States: open, closed, loading (confirm button spinner)
Backdrop: click-to-close (configurable)
Animation: fade + scale 150ms ease-out`,
    },
  },
  {
    id: 'toast-notifications',
    slug: 'toast-notifications',
    kind: 'component',
    category: 'feedback',
    status: 'ready',
    title: { 'zh-CN': 'Toast 通知', 'en-US': 'Toast Notifications' },
    description: {
      'zh-CN': '非阻塞式通知，支持 success/error/warning/info 四种类型。',
      'en-US': 'Non-blocking notifications with success/error/warning/info variants.',
    },
    tags: ['toast', 'notification', 'alert'],
    stack: ['React', 'Tailwind CSS'],
    previewType: 'html',
    previewSource: `<div style="display:flex;flex-direction:column;gap:8px;padding:16px">
  <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:#052e16;border:1px solid #166534;border-radius:8px;color:#86efac;font-size:14px">✓ 保存成功</div>
  <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:#450a0a;border:1px solid #991b1b;border-radius:8px;color:#fca5a5;font-size:14px">✕ 操作失败，请重试</div>
</div>`,
    states: ['visible', 'dismissing', 'stacked'],
    prompt: {
      'zh-CN': `生成 Toast 通知组件：

Framework: React 19 + TypeScript
位置: 右上角固定，最多堆叠 3 条
类型: success(绿) / error(红) / warning(黄) / info(蓝)
自动消失: 4 秒，悬停暂停计时
Accessibility: role="status", aria-live="polite"
动画: slide-in-right + fade-out`,
      'en-US': `Generate Toast Notifications:

Framework: React 19 + TypeScript
Position: top-right fixed, max 3 stacked
Variants: success/error/warning/info
Auto-dismiss: 4s, pause on hover
Accessibility: role="status", aria-live="polite"
Animation: slide-in-right + fade-out`,
    },
  },
  {
    id: 'table-basic',
    slug: 'table-basic',
    kind: 'component',
    category: 'dataDisplay',
    status: 'ready',
    title: { 'zh-CN': '数据表格', 'en-US': 'Data Table' },
    description: {
      'zh-CN': '可排序、可分页的基础数据表格。',
      'en-US': 'Sortable, paginated basic data table.',
    },
    tags: ['table', 'data', 'grid'],
    stack: ['React', 'Tailwind CSS'],
    previewType: 'html',
    previewSource: `<table style="width:100%;border-collapse:collapse;font-size:14px;color:#f8fafc">
  <thead><tr style="border-bottom:1px solid #334155">
    <th style="padding:12px;text-align:left;color:#94a3b8">名称</th>
    <th style="padding:12px;text-align:left;color:#94a3b8">状态</th>
    <th style="padding:12px;text-align:right;color:#94a3b8">数量</th>
  </tr></thead>
  <tbody>
    <tr style="border-bottom:1px solid #1e293b"><td style="padding:12px">项目 Alpha</td><td style="padding:12px"><span style="background:#052e16;color:#86efac;padding:2px 8px;border-radius:4px;font-size:12px">活跃</span></td><td style="padding:12px;text-align:right">128</td></tr>
    <tr><td style="padding:12px">项目 Beta</td><td style="padding:12px"><span style="background:#1e293b;color:#94a3b8;padding:2px 8px;border-radius:4px;font-size:12px">暂停</span></td><td style="padding:12px;text-align:right">42</td></tr>
  </tbody>
</table>`,
    states: ['loading', 'empty', 'error', 'populated'],
    prompt: {
      'zh-CN': `生成数据表格组件：

Framework: React 19 + TypeScript
功能: 列排序（点击表头）、分页（每页 10/25/50）
States: loading(skeleton rows), empty(插图+文案), error(重试按钮), populated
样式: 斑马纹行，悬停高亮，固定表头
Responsive: 手机端横向滚动`,
      'en-US': `Generate a Data Table component:

Framework: React 19 + TypeScript
Features: column sort (header click), pagination (10/25/50 per page)
States: loading(skeleton), empty(illustration), error(retry), populated
Style: zebra rows, hover highlight, sticky header
Responsive: horizontal scroll on mobile`,
    },
  },
  {
    id: 'navbar',
    slug: 'navbar',
    kind: 'component',
    category: 'navigation',
    status: 'ready',
    title: { 'zh-CN': '导航栏', 'en-US': 'Navbar' },
    description: {
      'zh-CN': '响应式顶部导航，含 Logo、链接组与 CTA 按钮。',
      'en-US': 'Responsive top navbar with logo, link group, and CTA.',
    },
    tags: ['nav', 'header', 'responsive'],
    stack: ['React', 'Tailwind CSS'],
    previewType: 'html',
    previewSource: `<nav style="display:flex;align-items:center;justify-content:space-between;padding:12px 24px;background:#0f172a;border-bottom:1px solid #334155">
  <span style="font-weight:700;color:#f8fafc;font-size:18px">Brand</span>
  <div style="display:flex;gap:24px;align-items:center">
    <a href="#" style="color:#94a3b8;text-decoration:none;font-size:14px">首页</a>
    <a href="#" style="color:#94a3b8;text-decoration:none;font-size:14px">产品</a>
    <a href="#" style="color:#94a3b8;text-decoration:none;font-size:14px">定价</a>
    <button style="padding:8px 16px;background:#6366f1;color:white;border:none;border-radius:6px;font-size:14px;cursor:pointer">开始使用</button>
  </div>
</nav>`,
    states: ['desktop', 'mobile-menu-open'],
    prompt: {
      'zh-CN': `生成响应式导航栏：

Framework: React 19 + TypeScript + Tailwind CSS
布局: Logo 左，链接居中/右，CTA 按钮最右
Responsive: >= md 水平链接；< md 汉堡菜单 + 全屏抽屉
Accessibility: nav landmark, aria-expanded on menu button
States: desktop, mobile-menu-open（抽屉滑入）`,
      'en-US': `Generate a responsive Navbar:

Framework: React 19 + TypeScript + Tailwind CSS
Layout: logo left, links center/right, CTA far right
Responsive: >= md horizontal links; < md hamburger + fullscreen drawer
Accessibility: nav landmark, aria-expanded on menu button
States: desktop, mobile-menu-open (drawer slide-in)`,
    },
  },
  {
    id: 'sign-in-form',
    slug: 'sign-in-form',
    kind: 'component',
    category: 'forms',
    status: 'ready',
    title: { 'zh-CN': '登录表单', 'en-US': 'Sign In Form' },
    description: {
      'zh-CN': '邮箱+密码登录表单，含验证与错误提示。',
      'en-US': 'Email + password sign-in form with validation and error messages.',
    },
    tags: ['form', 'auth', 'login'],
    stack: ['React', 'Tailwind CSS', 'react-hook-form'],
    previewType: 'html',
    previewSource: `<form style="max-width:360px;padding:24px;background:#1e293b;border-radius:12px;border:1px solid #334155">
  <h2 style="margin:0 0 4px;color:#f8fafc;font-size:20px">登录</h2>
  <p style="margin:0 0 20px;color:#94a3b8;font-size:14px">欢迎回来</p>
  <label style="display:block;margin-bottom:16px"><span style="display:block;margin-bottom:4px;color:#94a3b8;font-size:13px">邮箱</span><input type="email" placeholder="you@example.com" style="width:100%;padding:10px 12px;background:#0f172a;border:1px solid #334155;border-radius:6px;color:#f8fafc;font-size:14px;box-sizing:border-box"/></label>
  <label style="display:block;margin-bottom:20px"><span style="display:block;margin-bottom:4px;color:#94a3b8;font-size:13px">密码</span><input type="password" placeholder="••••••••" style="width:100%;padding:10px 12px;background:#0f172a;border:1px solid #334155;border-radius:6px;color:#f8fafc;font-size:14px;box-sizing:border-box"/></label>
  <button type="submit" style="width:100%;padding:10px;background:#6366f1;color:white;border:none;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer">登录</button>
</form>`,
    states: ['idle', 'submitting', 'error', 'success'],
    prompt: {
      'zh-CN': `生成登录表单组件：

Framework: React 19 + TypeScript + react-hook-form + zod
字段: email(required, email格式), password(required, min 8)
States: idle, submitting(按钮 disabled + spinner), error(字段级+表单级), success
Accessibility: label htmlFor, aria-describedby 指向错误, aria-live="polite"
布局: max-w-sm 居中，单列`,
      'en-US': `Generate a Sign In Form:

Framework: React 19 + TypeScript + react-hook-form + zod
Fields: email(required, valid email), password(required, min 8)
States: idle, submitting(disabled + spinner), error(field+form level), success
Accessibility: label htmlFor, aria-describedby for errors, aria-live="polite"
Layout: max-w-sm centered, single column`,
    },
  },
  C({
    id: 'buttons',
    category: 'actions',
    title: { 'zh-CN': '按钮', 'en-US': 'Buttons' },
    description: { 'zh-CN': '主要/次要/描边/幽灵/禁用等按钮变体与状态。', 'en-US': 'Primary/secondary/outline/ghost/disabled button variants.' },
    tags: ['button', 'action', 'cta'],
    states: ['default', 'hover', 'active', 'disabled', 'loading'],
    prompt: {
      'zh-CN': `生成按钮组件：
变体: primary / secondary / outline / ghost / destructive
尺寸: sm / md / lg；支持图标 + 文本、纯图标
状态: default, hover, active, focus-visible(ring), disabled, loading(spinner)
Accessibility: 原生 <button>、可聚焦、aria-busy（loading）`,
      'en-US': `Generate a Button component:
Variants: primary / secondary / outline / ghost / destructive
Sizes: sm / md / lg; icon+text and icon-only
States: default, hover, active, focus-visible(ring), disabled, loading(spinner)
Accessibility: native <button>, focusable, aria-busy when loading`,
    },
  }),
  C({
    id: 'badges',
    category: 'dataDisplay',
    title: { 'zh-CN': '徽章标签', 'en-US': 'Badges' },
    description: { 'zh-CN': '状态徽章与标签，含圆点状态与描边样式。', 'en-US': 'Status badges and tags with dot and outline styles.' },
    tags: ['badge', 'tag', 'status'],
    states: ['solid', 'outline', 'dot'],
    prompt: {
      'zh-CN': `生成徽章/标签组件：
类型: solid(填充) / soft(浅色) / outline(描边) / dot(状态圆点)
语义色: success / warning / error / info / neutral
尺寸: sm / md；可选关闭按钮（可移除标签）
Accessibility: 状态用文本+颜色双重表达`,
      'en-US': `Generate Badge/Tag component:
Types: solid / soft / outline / dot(status)
Semantic colors: success / warning / error / info / neutral
Sizes: sm / md; optional dismiss button (removable tag)
Accessibility: convey status via text + color`,
    },
  }),
  C({
    id: 'content-card',
    category: 'dataDisplay',
    title: { 'zh-CN': '内容卡片', 'en-US': 'Content Card' },
    description: { 'zh-CN': '含封面图、标题、描述与操作的内容卡片。', 'en-US': 'Content card with cover, title, description and action.' },
    tags: ['card', 'content', 'media'],
    states: ['default', 'hover', 'loading'],
    prompt: {
      'zh-CN': `生成内容卡片组件：
结构: 封面图/媒体区 + 标题 + 描述 + 操作区(按钮/链接)
变体: 垂直 / 水平；可选标签、头像、元信息
状态: default, hover(抬升阴影), loading(skeleton)
Responsive: 网格自适应，图片 16:9 懒加载`,
      'en-US': `Generate a Content Card:
Structure: cover/media + title + description + actions
Variants: vertical / horizontal; optional tags, avatar, meta
States: default, hover(elevation), loading(skeleton)
Responsive: responsive grid, 16:9 lazy-loaded image`,
    },
  }),
  C({
    id: 'tabs',
    category: 'navigation',
    title: { 'zh-CN': '标签页', 'en-US': 'Tabs' },
    description: { 'zh-CN': '下划线/分段式标签页，键盘可达。', 'en-US': 'Underline/segmented tabs, keyboard accessible.' },
    tags: ['tabs', 'navigation', 'segmented'],
    states: ['active', 'inactive', 'disabled'],
    prompt: {
      'zh-CN': `生成标签页组件：
样式: underline(下划线) / pills(胶囊) / segmented(分段)
交互: 键盘左右箭头切换、Home/End、roving tabindex
Accessibility: role="tablist"/"tab"/"tabpanel", aria-selected, aria-controls
状态: active(主色下划线), inactive, disabled`,
      'en-US': `Generate a Tabs component:
Styles: underline / pills / segmented
Interaction: arrow keys, Home/End, roving tabindex
Accessibility: role tablist/tab/tabpanel, aria-selected, aria-controls
States: active(accent), inactive, disabled`,
    },
  }),
  C({
    id: 'accordion',
    category: 'dataDisplay',
    title: { 'zh-CN': '折叠面板', 'en-US': 'Accordion' },
    description: { 'zh-CN': '可展开/收起的手风琴面板，适合 FAQ。', 'en-US': 'Expandable accordion panels, great for FAQs.' },
    tags: ['accordion', 'collapse', 'faq'],
    states: ['expanded', 'collapsed'],
    prompt: {
      'zh-CN': `生成折叠面板(手风琴)组件：
模式: single(单开) / multiple(多开)
动画: 高度过渡 200ms，箭头旋转
Accessibility: <button aria-expanded aria-controls>，面板 region
状态: expanded, collapsed；键盘可达`,
      'en-US': `Generate an Accordion component:
Mode: single / multiple open
Animation: height transition 200ms, chevron rotate
Accessibility: <button aria-expanded aria-controls>, panel region
States: expanded, collapsed; keyboard accessible`,
    },
  }),
  C({
    id: 'dropdown-menu',
    category: 'navigation',
    title: { 'zh-CN': '下拉菜单', 'en-US': 'Dropdown Menu' },
    description: { 'zh-CN': '触发器 + 浮层菜单，支持分组与快捷键。', 'en-US': 'Trigger + floating menu with groups and shortcuts.' },
    tags: ['dropdown', 'menu', 'overlay'],
    states: ['open', 'closed', 'item-active'],
    prompt: {
      'zh-CN': `生成下拉菜单组件：
触发: 点击/悬停；浮层定位(Popper/Floating UI)，避免溢出视口
内容: 菜单项、分组、分隔线、图标、快捷键、危险项
Accessibility: role="menu"/"menuitem", 上下键导航, Esc 关闭, 焦点返回触发器
动画: fade + 轻微位移`,
      'en-US': `Generate a Dropdown Menu:
Trigger: click/hover; floating positioning, avoid viewport overflow
Content: items, groups, separators, icons, shortcuts, destructive item
Accessibility: role menu/menuitem, arrow nav, Esc close, focus return
Animation: fade + slight translate`,
    },
  }),
  C({
    id: 'tooltip',
    category: 'feedback',
    title: { 'zh-CN': '工具提示', 'en-US': 'Tooltip' },
    description: { 'zh-CN': '悬停/聚焦显示的轻量提示气泡。', 'en-US': 'Lightweight tooltip on hover/focus.' },
    tags: ['tooltip', 'hint', 'overlay'],
    states: ['hidden', 'visible'],
    prompt: {
      'zh-CN': `生成工具提示组件：
触发: hover + focus（键盘可达），延迟显示 ~300ms
定位: top/right/bottom/left + 自动翻转，带小箭头
Accessibility: aria-describedby 关联触发元素, role="tooltip"
动画: fade 120ms`,
      'en-US': `Generate a Tooltip component:
Trigger: hover + focus (keyboard), ~300ms delay
Placement: top/right/bottom/left + auto-flip, with arrow
Accessibility: aria-describedby on trigger, role="tooltip"
Animation: fade 120ms`,
    },
  }),
  C({
    id: 'avatar-group',
    category: 'dataDisplay',
    title: { 'zh-CN': '头像组', 'en-US': 'Avatar Group' },
    description: { 'zh-CN': '重叠头像组，含缩写回退与溢出计数。', 'en-US': 'Overlapping avatars with initials fallback and overflow.' },
    tags: ['avatar', 'user', 'group'],
    states: ['image', 'initials', 'overflow'],
    prompt: {
      'zh-CN': `生成头像/头像组组件：
单个: 圆形/方圆，图片 + 缩写回退 + 状态点(在线)
组: 重叠排列, 超出显示 +N，悬停展开 tooltip 显示姓名
尺寸: xs/sm/md/lg；Accessibility: alt 文本/aria-label`,
      'en-US': `Generate Avatar / Avatar Group:
Single: circle/rounded, image + initials fallback + status dot
Group: overlapped, +N overflow, hover tooltip with names
Sizes: xs/sm/md/lg; Accessibility: alt/aria-label`,
    },
  }),
  C({
    id: 'progress-bar',
    category: 'feedback',
    title: { 'zh-CN': '进度条', 'en-US': 'Progress Bar' },
    description: { 'zh-CN': '确定/不确定进度条，含标签与百分比。', 'en-US': 'Determinate/indeterminate progress with label.' },
    tags: ['progress', 'loading', 'feedback'],
    states: ['determinate', 'indeterminate', 'complete'],
    prompt: {
      'zh-CN': `生成进度条组件：
类型: determinate(已知%) / indeterminate(循环动画)
要素: 标签 + 百分比、可选分段、语义色
Accessibility: role="progressbar", aria-valuenow/min/max
状态: 进行中 / 完成(变色) / 错误`,
      'en-US': `Generate a Progress Bar:
Types: determinate / indeterminate(looping)
Elements: label + percent, optional segments, semantic colors
Accessibility: role="progressbar", aria-valuenow/min/max
States: in-progress / complete(color) / error`,
    },
  }),
  C({
    id: 'alert-banner',
    category: 'feedback',
    title: { 'zh-CN': '警告横幅', 'en-US': 'Alert Banner' },
    description: { 'zh-CN': '页面级提示横幅，含图标、标题与操作。', 'en-US': 'Inline alert banner with icon, title and action.' },
    tags: ['alert', 'banner', 'inline'],
    states: ['info', 'success', 'warning', 'error'],
    prompt: {
      'zh-CN': `生成警告横幅组件：
语义: info / success / warning / error（左侧色条 + 图标）
要素: 标题 + 描述 + 可选操作链接 + 可关闭
Accessibility: role="alert"(error) / role="status"(info), 可聚焦关闭按钮`,
      'en-US': `Generate an Alert Banner:
Semantics: info / success / warning / error (left bar + icon)
Elements: title + description + optional action + dismissible
Accessibility: role alert(error)/status(info), focusable close`,
    },
  }),
  C({
    id: 'breadcrumb',
    category: 'navigation',
    title: { 'zh-CN': '面包屑', 'en-US': 'Breadcrumb' },
    description: { 'zh-CN': '层级路径导航，末项为当前页。', 'en-US': 'Hierarchical path navigation, last item is current.' },
    tags: ['breadcrumb', 'navigation', 'path'],
    states: ['default', 'collapsed'],
    prompt: {
      'zh-CN': `生成面包屑组件：
结构: 链接 + 分隔符(/ 或 ›)，末项 aria-current="page" 不可点
溢出: 中间项折叠为 …（可展开）
Accessibility: <nav aria-label="Breadcrumb"> + 有序列表`,
      'en-US': `Generate a Breadcrumb:
Structure: links + separators(/ or ›), last item aria-current="page"
Overflow: collapse middle into … (expandable)
Accessibility: <nav aria-label="Breadcrumb"> + ordered list`,
    },
  }),
  C({
    id: 'pagination',
    category: 'navigation',
    title: { 'zh-CN': '分页器', 'en-US': 'Pagination' },
    description: { 'zh-CN': '页码分页，含上/下一页与省略号。', 'en-US': 'Page navigation with prev/next and ellipsis.' },
    tags: ['pagination', 'navigation', 'pager'],
    states: ['first', 'middle', 'last'],
    prompt: {
      'zh-CN': `生成分页器组件：
要素: 上一页/下一页、页码、首尾页、省略号、可选每页条数
逻辑: 当前页高亮, 边界禁用, 大量页时折叠中间
Accessibility: <nav aria-label>, aria-current="page", 键盘可达`,
      'en-US': `Generate a Pagination component:
Elements: prev/next, page numbers, first/last, ellipsis, page-size select
Logic: highlight current, disable bounds, collapse middle when many
Accessibility: <nav aria-label>, aria-current="page", keyboard`,
    },
  }),
  C({
    id: 'toggle-switch',
    category: 'actions',
    title: { 'zh-CN': '开关', 'en-US': 'Toggle Switch' },
    description: { 'zh-CN': '即时生效的开/关切换开关。', 'en-US': 'Instant on/off toggle switch.' },
    tags: ['switch', 'toggle', 'form'],
    states: ['on', 'off', 'disabled'],
    prompt: {
      'zh-CN': `生成开关(Switch)组件：
外观: 轨道 + 滑块，开启用主色，平滑过渡
尺寸: sm / md；可带左右标签与说明文本
Accessibility: role="switch" 或 checkbox, aria-checked, 键盘 Space 切换, focus ring
状态: on, off, disabled`,
      'en-US': `Generate a Toggle Switch:
Look: track + thumb, accent when on, smooth transition
Sizes: sm / md; optional label and helper text
Accessibility: role="switch"/checkbox, aria-checked, Space to toggle, focus ring
States: on, off, disabled`,
    },
  }),
  C({
    id: 'stepper',
    category: 'navigation',
    title: { 'zh-CN': '步骤条', 'en-US': 'Stepper' },
    description: { 'zh-CN': '多步流程指示器，含完成/当前/待办状态。', 'en-US': 'Multi-step indicator with done/active/todo states.' },
    tags: ['stepper', 'wizard', 'steps'],
    states: ['done', 'active', 'todo', 'error'],
    prompt: {
      'zh-CN': `生成步骤条组件：
方向: 水平 / 垂直；每步: 序号/对勾 + 标题 + 可选描述
状态: done(对勾), active(主色), todo(灰), error(红)
连接线随进度着色；Accessibility: aria-current="step", 列表语义`,
      'en-US': `Generate a Stepper component:
Direction: horizontal / vertical; each step: number/check + title + desc
States: done(check), active(accent), todo(grey), error(red)
Connector colored by progress; Accessibility: aria-current="step", list semantics`,
    },
  }),
  C({
    id: 'stat-card',
    category: 'dataDisplay',
    title: { 'zh-CN': '统计卡片', 'en-US': 'Stat Card' },
    description: { 'zh-CN': '指标数值卡片，含标签、数值与同比变化。', 'en-US': 'Metric card with label, value and delta trend.' },
    tags: ['stats', 'metric', 'dashboard'],
    states: ['up', 'down', 'neutral', 'loading'],
    prompt: {
      'zh-CN': `生成统计卡片组件：
要素: 标签 + 大数值 + 同比变化(↑/↓ 着色) + 可选迷你趋势图(sparkline)/图标
布局: 网格自适应 (KPI 仪表盘)
状态: up(绿)/down(红)/neutral, loading(skeleton)`,
      'en-US': `Generate a Stat Card:
Elements: label + big value + delta(↑/↓ colored) + optional sparkline/icon
Layout: responsive grid (KPI dashboard)
States: up(green)/down(red)/neutral, loading(skeleton)`,
    },
  }),
  C({
    id: 'empty-state',
    category: 'feedback',
    title: { 'zh-CN': '空状态', 'en-US': 'Empty State' },
    description: { 'zh-CN': '无数据时的占位插图、说明与主操作。', 'en-US': 'Placeholder illustration, text and primary action.' },
    tags: ['empty', 'placeholder', 'zero-data'],
    states: ['no-data', 'no-results', 'error'],
    prompt: {
      'zh-CN': `生成空状态组件：
要素: 插图/图标 + 标题 + 说明 + 主操作按钮(可选次要操作)
场景: 无数据(首次) / 搜索无结果 / 加载失败(重试)
布局: 居中、克制；Accessibility: 文案清晰可读`,
      'en-US': `Generate an Empty State:
Elements: illustration/icon + title + description + primary action(+secondary)
Scenarios: no-data(first run) / no search results / load error(retry)
Layout: centered, restrained; Accessibility: clear copy`,
    },
  }),
  C({
    id: 'icon-button',
    category: 'actions',
    title: { 'zh-CN': '图标按钮', 'en-US': 'Icon Button' },
    description: { 'zh-CN': '纯图标操作按钮，含圆形/方形变体。', 'en-US': 'Icon-only action buttons with circle/square variants.' },
    tags: ['button', 'icon', 'action'],
    states: ['default', 'hover', 'active', 'disabled'],
    prompt: {
      'zh-CN': `生成图标按钮组件：
变体: default / primary / ghost / destructive；形状: square / circle
尺寸: sm(32px) / md(36px) / lg(40px)；支持 aria-label 必填
状态: hover, active, focus-visible(ring), disabled
Accessibility: 必须 aria-label 或 title，键盘可达`,
      'en-US': `Generate Icon Button:
Variants: default / primary / ghost / destructive; shapes: square / circle
Sizes: sm/md/lg; aria-label required
States: hover, active, focus-visible, disabled
Accessibility: aria-label or title, keyboard focusable`,
    },
  }),
  C({
    id: 'button-group',
    category: 'actions',
    title: { 'zh-CN': '按钮组', 'en-US': 'Button Group' },
    description: { 'zh-CN': '分段式互斥按钮组，适合视图切换。', 'en-US': 'Segmented mutually-exclusive button group for view toggles.' },
    tags: ['button', 'segmented', 'toggle'],
    states: ['selected', 'unselected', 'disabled'],
    prompt: {
      'zh-CN': `生成按钮组(Segmented Control)：
模式: single-select(互斥) / multi-select
样式: 首尾圆角、中间无间距、选中项主色填充
Accessibility: role="group", aria-pressed on each button, roving tabindex
键盘: 左右箭头切换选中项`,
      'en-US': `Generate Button Group (Segmented Control):
Mode: single-select / multi-select
Style: rounded ends, flush middle, accent fill when selected
Accessibility: role="group", aria-pressed, roving tabindex
Keyboard: arrow keys to change selection`,
    },
  }),
  C({
    id: 'search-input',
    category: 'forms',
    title: { 'zh-CN': '搜索框', 'en-US': 'Search Input' },
    description: { 'zh-CN': '带搜索图标、清除按钮的搜索输入框。', 'en-US': 'Search field with icon and clear button.' },
    tags: ['input', 'search', 'form'],
    states: ['empty', 'filled', 'loading', 'focused'],
    prompt: {
      'zh-CN': `生成搜索框组件：
要素: 左侧搜索图标、输入框、有内容时显示清除按钮、可选 loading spinner
事件: onChange debounce 300ms, onSubmit(Enter), onClear
Accessibility: role="search", label 或 aria-label, 清除按钮 aria-label
尺寸: sm / md / lg；可选快捷键提示(⌘K)`,
      'en-US': `Generate Search Input:
Elements: search icon, input, clear button when filled, optional loading
Events: debounced onChange, onSubmit(Enter), onClear
Accessibility: role="search", label/aria-label, clear button aria-label
Sizes: sm/md/lg; optional shortcut hint`,
    },
  }),
  C({
    id: 'text-input',
    category: 'forms',
    title: { 'zh-CN': '文本输入框', 'en-US': 'Text Input' },
    description: { 'zh-CN': '带标签、占位符、错误提示的基础输入框。', 'en-US': 'Basic input with label, placeholder and error message.' },
    tags: ['input', 'text', 'form'],
    states: ['default', 'focused', 'error', 'disabled'],
    prompt: {
      'zh-CN': `生成文本输入框组件：
要素: label + input + helper text + error message
类型: text / email / password(可切换可见) / number
状态: default, focus(ring), error(红框+文案), disabled
Accessibility: label htmlFor, aria-invalid, aria-describedby 关联错误/帮助`,
      'en-US': `Generate Text Input:
Elements: label + input + helper + error
Types: text / email / password(toggle visibility) / number
States: default, focus, error, disabled
Accessibility: htmlFor, aria-invalid, aria-describedby`,
    },
  }),
  C({
    id: 'select-field',
    category: 'forms',
    title: { 'zh-CN': '下拉选择', 'en-US': 'Select Field' },
    description: { 'zh-CN': '表单用下拉选择器，支持分组与搜索。', 'en-US': 'Form select with groups and optional search.' },
    tags: ['select', 'dropdown', 'form'],
    states: ['closed', 'open', 'disabled', 'error'],
    prompt: {
      'zh-CN': `生成下拉选择(Select)组件：
触发: 显示当前值 + chevron；浮层: 选项列表、分组、分隔线
可选: 搜索过滤、多选(tags 展示)、虚拟滚动(长列表)
Accessibility: Listbox pattern, aria-expanded, 键盘上下/Enter/Esc
Framework: Radix Select 或原生 styled select fallback`,
      'en-US': `Generate Select Field:
Trigger: current value + chevron; panel: options, groups, separators
Optional: search filter, multi-select with tags, virtual scroll
Accessibility: Listbox, aria-expanded, arrow/Enter/Esc keys
Framework: Radix Select or styled native fallback`,
    },
  }),
  C({
    id: 'checkbox-group',
    category: 'forms',
    title: { 'zh-CN': '复选框组', 'en-US': 'Checkbox Group' },
    description: { 'zh-CN': '多选复选框组，含全选与半选状态。', 'en-US': 'Multi-select checkbox group with select-all and indeterminate.' },
    tags: ['checkbox', 'form', 'multi-select'],
    states: ['unchecked', 'checked', 'indeterminate', 'disabled'],
    prompt: {
      'zh-CN': `生成复选框组组件：
布局: 垂直 / 水平；可选「全选」父级(indeterminate 半选)
状态: unchecked, checked, indeterminate, disabled
Accessibility: fieldset + legend, 每个 checkbox 关联 label, aria-checked="mixed"
受控/非受控均支持`,
      'en-US': `Generate Checkbox Group:
Layout: vertical / horizontal; optional select-all parent (indeterminate)
States: unchecked, checked, indeterminate, disabled
Accessibility: fieldset + legend, label per checkbox, aria-checked="mixed"`,
    },
  }),
  C({
    id: 'radio-group',
    category: 'forms',
    title: { 'zh-CN': '单选组', 'en-US': 'Radio Group' },
    description: { 'zh-CN': '互斥单选按钮组，卡片式或列表式。', 'en-US': 'Mutually exclusive radio group, list or card style.' },
    tags: ['radio', 'form', 'single-select'],
    states: ['selected', 'unselected', 'disabled'],
    prompt: {
      'zh-CN': `生成单选组(Radio Group)组件：
变体: default(圆点) / card(卡片选项，含描述)
布局: vertical / horizontal grid
Accessibility: role="radiogroup", 每个 radio + label, 箭头键在组内切换
状态: selected(主色圆点/边框), disabled`,
      'en-US': `Generate Radio Group:
Variants: default dot / card with description
Layout: vertical / horizontal grid
Accessibility: role="radiogroup", radio+label, arrow keys within group
States: selected(accent), disabled`,
    },
  }),
  C({
    id: 'textarea-field',
    category: 'forms',
    title: { 'zh-CN': '多行文本框', 'en-US': 'Textarea' },
    description: { 'zh-CN': '可调整高度的多行文本输入，含字数统计。', 'en-US': 'Resizable multiline input with character count.' },
    tags: ['textarea', 'form', 'multiline'],
    states: ['default', 'focused', 'error', 'max-length'],
    prompt: {
      'zh-CN': `生成多行文本框(Textarea)：
要素: label + textarea + 字数统计(如 120/500) + error
可选: auto-resize(随内容增高), min/max rows
状态: focus, error, 达到 maxLength 时计数变红
Accessibility: label htmlFor, aria-describedby 关联计数/错误`,
      'en-US': `Generate Textarea:
Elements: label + textarea + char count + error
Optional: auto-resize, min/max rows
States: focus, error, count turns red at maxLength
Accessibility: htmlFor, aria-describedby for count/error`,
    },
  }),
  C({
    id: 'skeleton-loader',
    category: 'feedback',
    title: { 'zh-CN': '骨架屏', 'en-US': 'Skeleton Loader' },
    description: { 'zh-CN': '内容加载占位动画，含卡片/列表/表格变体。', 'en-US': 'Loading placeholder shimmer for card/list/table layouts.' },
    tags: ['skeleton', 'loading', 'placeholder'],
    states: ['loading', 'loaded'],
    prompt: {
      'zh-CN': `生成骨架屏(Skeleton)组件：
变体: text(line) / circle(avatar) / rect(card) / table-row
动画: pulse 或 shimmer 渐变扫过
预设: CardSkeleton, ListSkeleton(3行), TableSkeleton(5行)
Accessibility: aria-busy="true", aria-label="加载中"`,
      'en-US': `Generate Skeleton Loader:
Variants: text line / circle / rect / table row
Animation: pulse or shimmer gradient
Presets: CardSkeleton, ListSkeleton, TableSkeleton
Accessibility: aria-busy, aria-label loading`,
    },
  }),
  C({
    id: 'spinner',
    category: 'feedback',
    title: { 'zh-CN': '加载指示器', 'en-US': 'Spinner' },
    description: { 'zh-CN': '旋转加载动画，可内联或全屏遮罩。', 'en-US': 'Spinning loader, inline or fullscreen overlay.' },
    tags: ['spinner', 'loading', 'feedback'],
    states: ['inline', 'overlay', 'button-inline'],
    prompt: {
      'zh-CN': `生成加载指示器(Spinner)：
尺寸: xs/sm/md/lg；颜色: primary / muted / white(深色背景)
模式: inline(行内) / overlay(半透明遮罩+居中) / button-inline(按钮内)
Accessibility: role="status", aria-live="polite", 可见文案「加载中」
动画: rotate 360deg linear infinite`,
      'en-US': `Generate Spinner:
Sizes: xs/sm/md/lg; colors: primary/muted/white
Modes: inline / overlay / button-inline
Accessibility: role="status", aria-live, visible "Loading" text
Animation: rotate 360deg linear infinite`,
    },
  }),
  C({
    id: 'drawer-panel',
    category: 'feedback',
    title: { 'zh-CN': '抽屉面板', 'en-US': 'Drawer Panel' },
    description: { 'zh-CN': '从侧边滑入的面板，含遮罩与 ESC 关闭。', 'en-US': 'Side-sliding panel with overlay and ESC to close.' },
    tags: ['drawer', 'sheet', 'overlay'],
    states: ['open', 'closed', 'loading'],
    prompt: {
      'zh-CN': `生成抽屉(Drawer/Sheet)组件：
方向: left / right(默认) / top / bottom
要素: 遮罩、面板、标题、关闭按钮、可选 footer 操作区
动画: slide + fade 250ms；移动端 bottom sheet 可拖拽关闭
Accessibility: role="dialog", focus trap, Esc 关闭, aria-modal`,
      'en-US': `Generate Drawer/Sheet:
Directions: left / right / top / bottom
Elements: overlay, panel, title, close, optional footer
Animation: slide + fade 250ms; mobile bottom sheet drag dismiss
Accessibility: role="dialog", focus trap, Esc, aria-modal`,
    },
  }),
  C({
    id: 'list-view',
    category: 'dataDisplay',
    title: { 'zh-CN': '列表视图', 'en-US': 'List View' },
    description: { 'zh-CN': '带头像/图标、标题、副标题的可点击列表项。', 'en-US': 'Clickable list items with avatar/icon, title and subtitle.' },
    tags: ['list', 'item', 'data'],
    states: ['default', 'hover', 'selected', 'disabled'],
    prompt: {
      'zh-CN': `生成列表(List)组件：
项结构: leading(avatar/icon) + title + subtitle + trailing(chevron/badge/action)
变体: default / compact / divided
交互: 整行可点击, hover 背景, selected 左边框或背景
Accessibility: ul/li 或 role="list", 可聚焦项`,
      'en-US': `Generate List View:
Item: leading + title + subtitle + trailing
Variants: default / compact / divided
Interaction: row click, hover bg, selected accent
Accessibility: ul/li or role="list", focusable items`,
    },
  }),
  C({
    id: 'timeline',
    category: 'dataDisplay',
    title: { 'zh-CN': '时间线', 'en-US': 'Timeline' },
    description: { 'zh-CN': '垂直时间线，展示事件顺序与状态。', 'en-US': 'Vertical timeline showing events and statuses.' },
    tags: ['timeline', 'history', 'steps'],
    states: ['completed', 'active', 'pending'],
    prompt: {
      'zh-CN': `生成时间线(Timeline)组件：
布局: vertical(默认) / horizontal
节点: dot/icon + 连接线(已完成段主色) + 标题 + 时间 + 描述
状态: completed(实心+着色线), active(脉冲), pending(灰)
Accessibility: ordered list, 时间用 <time datetime>`,
      'en-US': `Generate Timeline:
Layout: vertical / horizontal
Node: dot/icon + connector + title + time + description
States: completed, active(pulse), pending
Accessibility: ordered list, <time datetime>`,
    },
  }),
  C({
    id: 'rating-stars',
    category: 'dataDisplay',
    title: { 'zh-CN': '星级评分', 'en-US': 'Star Rating' },
    description: { 'zh-CN': '可交互或只读的星级评分组件。', 'en-US': 'Interactive or read-only star rating.' },
    tags: ['rating', 'stars', 'review'],
    states: ['readonly', 'interactive', 'half-star'],
    prompt: {
      'zh-CN': `生成星级评分(Rating)组件：
模式: readonly(展示) / interactive(点击/悬停选分)
支持: 半星(0.5), 最大 5 星, 显示数值(4.2)
Accessibility: role="slider" 或 group of radio, aria-valuenow/min/max, 键盘左右调分
动画: hover 时未选中星预览高亮`,
      'en-US': `Generate Star Rating:
Modes: readonly / interactive
Features: half stars, max 5, show numeric value
Accessibility: role slider or radio group, aria-valuenow, arrow keys
Animation: hover preview highlight`,
    },
  }),
  C({
    id: 'sidebar',
    category: 'navigation',
    title: { 'zh-CN': '侧边栏导航', 'en-US': 'Sidebar Navigation' },
    description: { 'zh-CN': '可折叠的应用侧边栏，含分组与图标。', 'en-US': 'Collapsible app sidebar with groups and icons.' },
    tags: ['sidebar', 'nav', 'layout'],
    states: ['expanded', 'collapsed', 'mobile-overlay'],
    prompt: {
      'zh-CN': `生成侧边栏(Sidebar)导航：
结构: Logo + 导航分组 + 底部用户区；项: icon + label + optional badge
状态: expanded(240px) / collapsed(64px 仅图标) / mobile(overlay drawer)
Accessibility: nav landmark, aria-current="page", 折叠按钮 aria-expanded
动画: width transition 200ms`,
      'en-US': `Generate Sidebar Navigation:
Structure: logo + grouped nav + footer user area; icon + label + badge
States: expanded / collapsed(icon-only) / mobile overlay
Accessibility: nav landmark, aria-current, collapse aria-expanded
Animation: width transition 200ms`,
    },
  }),
  C({
    id: 'command-palette',
    category: 'navigation',
    title: { 'zh-CN': '命令面板', 'en-US': 'Command Palette' },
    description: { 'zh-CN': '⌘K 唤起的快捷命令搜索面板。', 'en-US': '⌘K quick command search palette.' },
    tags: ['command', 'palette', 'search', 'shortcut'],
    states: ['closed', 'open', 'empty', 'loading'],
    prompt: {
      'zh-CN': `生成命令面板(Command Palette)：
触发: ⌘K / Ctrl+K 全局快捷键；居中 modal 浮层
功能: 模糊搜索命令/页面/操作, 分组(最近/导航/操作), 键盘上下选择 Enter 执行
Accessibility: role="dialog", combobox + listbox, aria-activedescendant
动画: fade + scale; 空状态友好提示`,
      'en-US': `Generate Command Palette:
Trigger: ⌘K / Ctrl+K global shortcut; centered modal
Features: fuzzy search, groups(recent/nav/actions), arrow nav, Enter to run
Accessibility: dialog, combobox + listbox, aria-activedescendant
Animation: fade + scale; empty state hint`,
    },
  }),
  C({
    id: 'date-picker',
    category: 'forms',
    title: { 'zh-CN': '日期选择器', 'en-US': 'Date Picker' },
    description: { 'zh-CN': '日历面板选日期，支持范围选择与禁用日期。', 'en-US': 'Calendar date picker with range and disabled dates.' },
    tags: ['date', 'calendar', 'form'],
    states: ['closed', 'open', 'range-start', 'range-end'],
    prompt: {
      'zh-CN': `生成日期选择器(Date Picker)：
模式: single / range(起止双日历)；面板: 月视图 + 前后翻页
禁用: min/max date, disabledDates 数组, 周末灰显
Accessibility: grid role, aria-selected, 键盘箭头选日 Enter 确认
Framework: react-day-picker 或 Radix Popover + 自定义日历`,
      'en-US': `Generate Date Picker:
Modes: single / range; panel: month view + prev/next
Disable: min/max, disabledDates, weekend styling
Accessibility: grid, aria-selected, arrow keys, Enter
Framework: react-day-picker or Radix Popover + calendar`,
    },
  }),
  C({
    id: 'file-upload',
    category: 'forms',
    title: { 'zh-CN': '文件上传', 'en-US': 'File Upload' },
    description: { 'zh-CN': '拖拽/点击上传，含进度与文件列表。', 'en-US': 'Drag-and-drop upload with progress and file list.' },
    tags: ['upload', 'file', 'form'],
    states: ['idle', 'dragover', 'uploading', 'success', 'error'],
    prompt: {
      'zh-CN': `生成文件上传组件：
交互: 点击选择 + drag & drop 高亮区域
限制: accept 类型, maxSize, maxFiles；列表展示文件名+大小+删除
状态: idle, dragover(边框高亮), uploading(进度条), success, error(重试)
Accessibility: input type=file 隐藏但可键盘触发, aria-describedby 限制说明`,
      'en-US': `Generate File Upload:
Interaction: click + drag & drop zone
Limits: accept, maxSize, maxFiles; list with name/size/remove
States: idle, dragover, uploading(progress), success, error
Accessibility: hidden file input keyboard accessible, aria-describedby`,
    },
  }),
  C({
    id: 'slider-range',
    category: 'forms',
    title: { 'zh-CN': '滑块', 'en-US': 'Slider' },
    description: { 'zh-CN': '单值或范围滑块，含刻度与标签。', 'en-US': 'Single or range slider with ticks and labels.' },
    tags: ['slider', 'range', 'form'],
    states: ['default', 'dragging', 'disabled'],
    prompt: {
      'zh-CN': `生成滑块(Slider)组件：
模式: single thumb / range(双 thumb)
要素: track + filled range + thumb + 可选 ticks/labels + 当前值 tooltip
Accessibility: role="slider", aria-valuemin/max/now, 键盘左右/Home/End 调值
状态: dragging 时 thumb 放大, disabled 灰化`,
      'en-US': `Generate Slider:
Modes: single / range dual thumb
Elements: track, fill, thumb, optional ticks/labels, value tooltip
Accessibility: role="slider", aria-valuemin/max/now, arrow/Home/End keys
States: dragging thumb scale, disabled muted`,
    },
  }),
  C({
    id: 'chip-input',
    category: 'forms',
    title: { 'zh-CN': '标签输入', 'en-US': 'Chip Input' },
    description: { 'zh-CN': '输入多个标签/Chip，支持删除与自动完成。', 'en-US': 'Multi-tag chip input with remove and autocomplete.' },
    tags: ['chip', 'tags', 'input', 'form'],
    states: ['empty', 'filled', 'focused', 'invalid'],
    prompt: {
      'zh-CN': `生成标签输入(Chip/Tags Input)：
交互: 输入 + Enter/逗号 添加 chip；Backspace 删除最后一个；chip 上 × 删除
可选: autocomplete 下拉建议, maxTags, 重复校验
Accessibility: combobox + listbox 建议, 每个 chip 可聚焦删除
布局: flex wrap 内联 chips + 输入框`,
      'en-US': `Generate Chip/Tags Input:
Interaction: type + Enter/comma add; Backspace remove last; × on chip
Optional: autocomplete, maxTags, duplicate validation
Accessibility: combobox + listbox, focusable chip remove
Layout: flex wrap chips + input`,
    },
  }),
  C({
    id: 'popover',
    category: 'feedback',
    title: { 'zh-CN': '弹出层', 'en-US': 'Popover' },
    description: { 'zh-CN': '点击触发的轻量浮层，比 Tooltip 内容更丰富。', 'en-US': 'Click-triggered floating panel, richer than tooltip.' },
    tags: ['popover', 'overlay', 'floating'],
    states: ['closed', 'open'],
    prompt: {
      'zh-CN': `生成 Popover 组件：
触发: click(默认) / 可选 hover；定位: Floating UI 自动翻转
内容: 标题 + 正文 + 可选 footer 按钮；可含表单
Accessibility: aria-expanded, focus trap(若含交互), Esc 关闭
动画: fade + scale 150ms`,
      'en-US': `Generate Popover:
Trigger: click / optional hover; Floating UI positioning
Content: title + body + optional footer; may contain form
Accessibility: aria-expanded, focus trap if interactive, Esc close
Animation: fade + scale 150ms`,
    },
  }),
  C({
    id: 'notification-center',
    category: 'feedback',
    title: { 'zh-CN': '通知中心', 'en-US': 'Notification Center' },
    description: { 'zh-CN': '铃铛入口 + 下拉通知列表，含已读/未读。', 'en-US': 'Bell trigger + dropdown notification list with read/unread.' },
    tags: ['notification', 'inbox', 'bell'],
    states: ['empty', 'unread', 'all-read'],
    prompt: {
      'zh-CN': `生成通知中心组件：
触发: 铃铛 icon + 未读 badge 数字；面板: 通知列表(标题+时间+摘要)
操作: 单条标记已读, 全部已读, 查看全部链接
空状态: 暂无通知插图
Accessibility: button aria-expanded, list aria-live="polite" 新通知`,
      'en-US': `Generate Notification Center:
Trigger: bell icon + unread badge; panel: list(title+time+summary)
Actions: mark read, mark all read, view all link
Empty state illustration
Accessibility: aria-expanded, aria-live for new items`,
    },
  }),
  C({
    id: 'context-menu',
    category: 'navigation',
    title: { 'zh-CN': '右键菜单', 'en-US': 'Context Menu' },
    description: { 'zh-CN': '右键/长按触发的上下文菜单。', 'en-US': 'Right-click or long-press context menu.' },
    tags: ['context-menu', 'menu', 'right-click'],
    states: ['closed', 'open', 'submenu-open'],
    prompt: {
      'zh-CN': `生成右键菜单(Context Menu)：
触发: contextmenu 事件 / 长按(移动端)；定位: 鼠标坐标，视口边界检测
内容: 菜单项、分隔线、子菜单(chevron)、快捷键、危险项(红色)
Accessibility: role="menu"/"menuitem", 上下键导航, Esc 关闭, typeahead
Framework: Radix Context Menu`,
      'en-US': `Generate Context Menu:
Trigger: contextmenu / long-press; position at cursor, clamp to viewport
Content: items, separators, submenus, shortcuts, destructive item
Accessibility: menu/menuitem roles, arrow nav, Esc, typeahead
Framework: Radix Context Menu`,
    },
  }),
  C({
    id: 'carousel',
    category: 'dataDisplay',
    title: { 'zh-CN': '轮播图', 'en-US': 'Carousel' },
    description: { 'zh-CN': '图片/内容轮播，含指示点与左右箭头。', 'en-US': 'Image/content carousel with dots and arrows.' },
    tags: ['carousel', 'slider', 'gallery'],
    states: ['idle', 'autoplay', 'dragging'],
    prompt: {
      'zh-CN': `生成轮播(Carousel)组件：
功能: 左右箭头、底部分页点、可选 autoplay(悬停暂停)、触摸滑动
布局: 单张全宽 / 多卡 peek；loop 循环
Accessibility: region aria-roledescription="carousel", 每张 slide aria-label, 暂停 autoplay 按钮
动画: translateX transition 300ms ease`,
      'en-US': `Generate Carousel:
Features: arrows, dots, optional autoplay(pause on hover), touch swipe
Layout: single full-width / multi-card peek; loop
Accessibility: region roledescription carousel, slide labels, pause button
Animation: translateX 300ms ease`,
    },
  }),
]

export function getComponentById(id: string): ComponentItem | undefined {
  return components.find((c) => c.id === id || c.slug === id)
}

export function getComponentCategories(): { key: string; name: { 'zh-CN': string; 'en-US': string } }[] {
  return Object.values(componentRegistry.categories).map((c) => ({
    key: c.key,
    name: c.name,
  }))
}

export function getComponentCategoryName(
  categoryKey: string,
): { 'zh-CN': string; 'en-US': string } | undefined {
  return getComponentCategories().find((c) => c.key === categoryKey)?.name
}
