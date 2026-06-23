# Prompt Assistant

前端风格与组件 AI 提示词助手平台。浏览、搜索、复制高质量 UI 与后端 Prompt 模板。

## 功能

- **UI 风格**：统一 Showcase 组件横向对比（极简、玻璃拟态、新粗野主义等）
- **UI 组件**：模态框、Toast、表格、导航、登录表单等
- **后端框架**：NestJS、FastAPI、Express、Django 结构化 Prompt
- **架构绘图**：占位模块，预留蓝图编辑器
- **Prompt 组合器**：风格 + 组件 + 后端一键组合

## 快速开始

```bash
npm install
npm run dev          # Web 开发 http://localhost:5173
npm run dev:desktop  # Tauri 桌面开发（需 Rust）
npm run build        # 生产构建
npm run preview      # 预览构建产物
```

## 跨平台部署

| 方式 | 命令 / 说明 |
|------|-------------|
| 浏览器 | 部署 `dist/` 到任意静态服务器 |
| PWA | 构建后支持「添加到主屏幕」 |
| Docker (Linux) | `docker compose up` → http://localhost:8080 |
| Windows .exe | `npm run build:desktop`（需 Rust + WebView2） |
| macOS .app | 在 macOS 上运行 `npm run build:desktop` |
| Linux AppImage | 在 Linux 上运行 `npm run build:desktop` |

## Tauri 桌面打包

前置条件：
- [Rust](https://rustup.rs/)
- Windows: [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
- Linux: `webkit2gtk` 等（见 [Tauri 文档](https://v2.tauri.app/start/prerequisites/)）

```bash
npm run build:desktop
```

产物位于 `src-tauri/target/release/bundle/`。

## 项目结构

```
src/
  data/          # 风格、组件、后端 JSON/TS 数据
  components/    # UI、Showcase、Layout
  pages/         # 路由页面
  lib/           # 搜索、i18n、平台、组合器
scripts/         # 构建索引、校验
src-tauri/       # Tauri 桌面壳
```

## 校验

```bash
npm run validate:prompts
```
