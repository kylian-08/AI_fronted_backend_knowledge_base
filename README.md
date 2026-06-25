# Prompt Assistant

前端风格与组件 AI 提示词助手平台。浏览、搜索、复制高质量 UI 与后端 Prompt 模板。

## 功能

- **UI 风格**：97 种风格（32 个详细命名的精选风格 + 核心设计系统 + 调色变体），统一 Showcase 组件横向对比
- **风格预览**：列表卡片直接展示预览画面，无需进入详情
- **应用到本应用**：一键把任意风格应用到整个 App，界面实时变色
- **风格导入 / 导出**：支持 JSON 格式（含 prompt 与参考图 referenceImage），导入后可直接应用
- **参考图**：每个风格可一键复制 / 下载参考图（PNG）供 AI 参考
- **UI 组件**：模态框、Toast、表格、导航、登录表单等，预览跟随当前应用的风格变化
- **后端框架**：NestJS、FastAPI、Express、Django 结构化 Prompt
- **架构绘图**：占位模块，预留蓝图编辑器
- **Prompt 组合器**：风格 + 组件 + 后端一键组合
- **中英文切换** & **键盘左右键 / 侧边悬浮按钮翻页**

## Release Notes

### v0.2.0 (2026-06-25)

**新增**
- 🎨 新增 **32 个详细命名风格**：Apple 毛玻璃、Windows 11 Fluent、老式 Windows 98、奶油风、蒸汽波、北欧极简、全息立体、赛博朋克、工业机甲、新拟物、黏土拟态、孟菲斯波普、装饰艺术、包豪斯、瑞士国际主义、Y2K 千禧铬、暗黑奢华金、卡哇伊马卡龙、复古终端、Material You、Frutiger Aero、网格渐变、野兽派网页、科幻 HUD、中国水墨、报纸印刷、拟物化 iOS6、糖果渐变、植物有机、企业简洁、暗色玻璃霓虹、暖阳落日，每个均带**确定且详细**的双语提示词。
- 🖼️ **风格参考图**：一键复制图片到剪贴板 / 下载 PNG。
- 📥 **风格导入 / 导出**：JSON 格式支持 `prompt` 与 `referenceImage`，导入后可直接「应用」。
- ✨ **应用到本应用**：把风格 token 映射到全局主题，整个 App 实时换肤。
- 🧩 **组件预览跟随风格**：模态框 / Toast / 表格 / 导航 / 表单预览随当前应用的风格动态变化。
- ⌨️ **翻页增强**：键盘左右方向键 + 两侧悬浮翻页按钮（不遮挡卡片）。
- 🌐 **中英文切换**；首页改版（Hero + 数据统计 + 精选预览）。

**修复**
- 修复玻璃拟态预览与应用后的渲染问题。
- 修复左侧菜单栏滚动时丢失（改为 sticky 固定）。
- 桌面版禁用 Service Worker，避免 WebView2 缓存导致更新后仍显示旧界面。
- 卡片按钮重排，修复「应用」按钮文字竖排问题。

**下载**：见本页 Assets 中的 `Prompt-Assistant-v0.2.0.exe`（Windows 便携版，免安装）。

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
