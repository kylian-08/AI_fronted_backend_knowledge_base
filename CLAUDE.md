# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Prompt Assistant 是一个跨平台的 AI 提示词助手应用，用于浏览和管理 UI 风格、UI 组件、后端框架的 Prompt 模板。基于 React 19 + TypeScript + Vite 8 + Tailwind 4，支持 Web、PWA、Docker 和 Tauri 桌面端。

## 开发命令

```bash
# Web 开发（默认端口 5173）
npm run dev

# Tauri 桌面开发（需要 Rust 环境）
npm run dev:desktop

# 生产构建（自动生成搜索索引）
npm run build

# Tauri 桌面打包（需要 Rust + WebView2/webkit2gtk）
npm run build:desktop

# 预览构建产物
npm run preview

# 代码检查
npm run lint

# 校验提示词数据格式
npm run validate:prompts
```

## 核心架构

### 数据注册表模式

所有目录项（风格、组件、后端）通过 `src/data/*/registry.ts` 管理：

- **StyleItem**：包含 `tokens`（CSS 变量）、`referenceImage`（参考图）、`showcaseVariant`
- **ComponentItem**：包含 `previewType`（react/html/jsx）、`previewSource`（预览代码）
- **BackendItem**：包含 `framework`、`patterns`

每个 registry 提供：
- `getAll*List()` - 获取所有项（bundled + imported）
- `import*FromJson()` - 从 JSON 导入用户自定义项
- `export*()` - 导出已导入项

导入的数据存储在 `localStorage`（key: `imported-styles`、`imported-components`）。

### 全局状态管理（AppContext）

`src/contexts/AppContext.tsx` 通过 Context API 管理：

- **语言切换**：`locale`、`setLocale()`、`t()` 翻译函数、`tr()` 对象翻译
- **主题应用**：`appliedStyleId`、`applyStyle()`、`resetTheme()`、`activeTokens`
- **数据管理**：`allStyles`、`allComponents`、`importStyles()`、`exportStyles()`
- **响应式更新**：`styleVersion`/`componentVersion` 触发重新计算

主题应用逻辑（`src/lib/themeApplier.ts`）：
- 将 StyleItem 的 `tokens` 映射到 CSS 变量（`--app-*` 前缀）
- 持久化到 `localStorage`（key: `applied-style-id`）
- 页面加载时自动恢复

### 双语支持

所有用户可见文本使用 `LocalizedText` 类型：
```typescript
interface LocalizedText {
  'zh-CN': string
  'en-US': string
}
```

翻译函数：
- `t(key)` - 从 `src/lib/messages.ts` 获取消息
- `tr(obj)` - 翻译 `LocalizedText` 对象
- `localized(obj, locale)` - 工具函数

### 搜索索引

- **构建时生成**：`scripts/export-search-index.ts` 在 `npm run build` 前自动运行，生成 `src/data/searchIndex.ts`
- **运行时**：使用 Fuse.js 对 `searchIndex` 进行模糊搜索
- 搜索字段：`title`、`description`、`tags`、`category`

### 组件预览系统

组件卡片（`ComponentCard.tsx`）支持动态预览：
- 从 `AppContext.activeTokens` 获取当前主题的 CSS 变量
- 通过 `--sc-*` 前缀注入到预览容器的 inline style
- 预览类型：
  - `react` - 从 `src/components/showcase/*` 导入 React 组件
  - `html`/`jsx` - 直接渲染 HTML 字符串（未实现）

## 数据结构约定

### 添加新风格

1. 在 `src/data/styles/curatedStyles.ts` 或 `baseStyles.ts` 添加条目
2. 必需字段：
   - `id`、`slug` - 唯一标识
   - `title`、`description`、`prompt` - 双语文本
   - `tokens` - CSS 变量对象，key 必须与主题系统兼容
   - `tags`、`category` - 用于筛选和搜索
   - `status` - `'ready'` | `'draft'` | `'placeholder'`
3. 可选：`referenceImage`（base64 或 URL）、`showcaseVariant`

### 添加新组件

1. 在 `src/data/components/registry.ts` 添加条目
2. 创建预览组件：`src/components/showcase/componentPreviews.tsx`
3. 组件必须：
   - 接受 `tokens: Record<string, string>` prop
   - 使用 `tokens` 中的 CSS 变量（如 `var(--sc-primary)`）
   - 避免硬编码颜色
4. 在 registry 中设置 `previewType: 'react'`，`previewSource` 为组件名

### 分类系统

组件分类在 `src/data/components/registry.ts` 的 `COMPONENT_CATEGORIES` 定义：
- Actions（操作）
- Feedback（反馈）
- DataDisplay（数据展示）
- Navigation（导航）
- Forms（表单）

## Tauri 平台特性

- **剪贴板**：使用 `@tauri-apps/plugin-clipboard-manager` 复制文本和图片
- **平台检测**：`src/lib/platform.ts` 提供 `isTauri()`、`isBrowser()` 判断
- **桌面特有**：禁用 Service Worker（`vite.config.ts` 中条件判断 `mode === 'tauri'`）
- **配置文件**：`src-tauri/tauri.conf.json`、`src-tauri/Cargo.toml`

## 构建流程

1. `tsx scripts/export-search-index.ts` - 生成搜索索引
2. `tsc -b` - TypeScript 类型检查
3. `vite build` - 打包（Web）或 `vite build --mode tauri`（桌面）
4. Tauri 构建会额外调用 `tauri build`，产物在 `src-tauri/target/release/bundle/`

## 代码风格

- 使用 TypeScript 6.0，启用严格模式
- React 19 新特性：使用 `use` hook（如需）
- Tailwind 4：配置在 `@import "tailwindcss"` + `@theme` 块
- 组件库：优先使用 Radix UI（无样式组件）+ 自定义样式
- 文件引用：使用 `@/` 别名（映射到 `src/`）

## 常见任务

### 更新搜索索引
构建时自动运行，手动执行：
```bash
npx tsx scripts/export-search-index.ts
```

### 校验数据完整性
```bash
npm run validate:prompts
```

### 调试 Tauri 应用
```bash
npm run dev:desktop
# Rust 日志会输出到终端，前端日志在 DevTools
```

### 清理 Tauri 缓存
删除 `src-tauri/target/` 目录后重新构建。
