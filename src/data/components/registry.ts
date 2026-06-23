import type { ComponentItem } from '@/types/catalog'

export const componentRegistry = {
  version: '1.0.0',
  categories: {
    feedback: {
      name: { 'zh-CN': '反馈组件', 'en-US': 'Feedback' },
      key: 'feedback',
      items: ['modal-dialog', 'toast-notifications'],
    },
    dataDisplay: {
      name: { 'zh-CN': '数据展示', 'en-US': 'Data Display' },
      key: 'dataDisplay',
      items: ['table-basic'],
    },
    navigation: {
      name: { 'zh-CN': '导航', 'en-US': 'Navigation' },
      key: 'navigation',
      items: ['navbar'],
    },
    forms: {
      name: { 'zh-CN': '表单', 'en-US': 'Forms' },
      key: 'forms',
      items: ['sign-in-form'],
    },
  },
} as const

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
]

export function getComponentById(id: string): ComponentItem | undefined {
  return components.find((c) => c.id === id || c.slug === id)
}
