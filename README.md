# Prompt Assistant

前端风格与组件 AI 提示词助手平台。浏览、搜索、复制高质量 UI 与后端 Prompt 模板。

## 功能

- **UI 风格**：97 种风格（32 个详细命名的精选风格 + 5 个核心设计系统 + 60 个调色变体），统一 Showcase 组件横向对比
- **风格预览**：列表卡片直接展示预览画面，无需进入详情
- **应用到本应用**：一键把任意风格应用到整个 App，界面实时变色
- **风格导入 / 导出**：支持 JSON 格式（含 prompt 与参考图 referenceImage），导入后可直接应用
- **参考图**：每个风格可一键复制 / 下载参考图（PNG）供 AI 参考
- **UI 组件**：45 个组件模板，覆盖操作、反馈、数据展示、导航、表单五大分类；列表卡片预览跟随当前应用风格动态变化，预览文案支持中英文
- **组件导入 / 导出**：支持 JSON 格式导入自定义组件 Prompt，与风格库能力对齐
- **后端框架**：NestJS、FastAPI、Express、Django、Gin、Spring 结构化 Prompt（11 个模板）
- **架构绘图**：占位模块，预留蓝图编辑器
- **Prompt 组合器**：风格（含已导入）+ 组件 + 后端一键组合，支持搜索与分类筛选
- **风格分类**：精选 / 核心 / 变体 / 已导入四大分类 Tab，快速定位目标风格
- **AI Agent Studio（Beta）**：描述产品与品牌，Agent 从风格库与组件库中自动编排出可交互的界面方案；内置离线启发式引擎，预留真实模型接入接口
- **中英文切换** & **键盘左右键 / 侧边悬浮按钮翻页**

### UI 组件分类（45 个）

| 分类 | 组件 |
|------|------|
| 操作 Actions | 按钮、图标按钮、按钮组、开关 |
| 反馈 Feedback | 模态框、Toast、进度条、警告横幅、工具提示、空状态、骨架屏、加载指示器、抽屉、弹出层、通知中心 |
| 数据展示 Data Display | 数据表格、徽章、内容卡片、折叠面板、头像组、统计卡片、列表、时间线、星级评分、轮播图 |
| 导航 Navigation | 导航栏、侧边栏、标签页、面包屑、分页器、步骤条、下拉菜单、命令面板、右键菜单 |
| 表单 Forms | 登录表单、搜索框、文本输入、下拉选择、复选框组、单选组、多行文本、日期选择、文件上传、滑块、标签输入 |

## Release Notes

### v0.3.0 (2026-07-01)

**新增**
- 🤖 **AI Agent Studio（Beta）**：新增 `/agent` 页面，用户描述产品/品牌/风格关键词/页面区块后，Agent 自动匹配风格并编排出可交互的界面方案（导航、Hero、功能、价格、评价、表单、FAQ、页脚等区块），生成结果可一键「应用」风格或复制 Prompt。内置离线启发式引擎（无需 API Key），并预留 `remote-llm` 远程模型接口（`src/lib/agent/`），后续可无缝切换为真实 LLM 驱动。
- 🎛️ **Prompt 组合器重构**：风格/组件选择器改为搜索 + 分类 Tab（`ComposerPicker`），替代原先的按钮平铺；风格选择接入含用户导入项的完整风格库。
- 🏷️ **风格分类 Tab**：风格库列表新增「精选 / 核心 / 变体 / 已导入」筛选，更快定位目标风格。
- 📥 **组件导入 / 导出**：对齐风格库能力，支持 JSON 格式导入自定义组件 Prompt。
- 🧱 **后端模板扩展至 11 个**：新增 Gin（Go）REST CRUD / JWT 认证、Spring Boot（Java）REST CRUD / Security JWT。
- 🌐 **组件预览 i18n**：45 个组件预览的示例文案（按钮、状态、占位符等）随 App 语言切换，不再写死中文。

**文档**
- 新增 `docs/DEVELOPMENT_PLAN.md`：架构现状梳理与后续 Roadmap（动效系统、代码直出、参数调试、多方案对比、AI Native 深化、工程化）。
- README 与实际数据同步（97 风格 / 45 组件 / 11 后端模板）。

**工程**
- 修复 ESLint 未忽略 `src-tauri/target` 构建产物导致的海量误报。

**下载**：见本页 Assets 中的 `Prompt-Assistant-v0.3.0.exe`（Windows 便携版，免安装）。

### v0.2.1 (2026-06-29)

**新增**
- 🧩 **UI 组件库扩展至 45 个**：新增日期选择、文件上传、滑块、标签输入、弹出层、通知中心、右键菜单、轮播图等；全部支持主题化预览与双语 Prompt。
- 🏷️ **组件页分类筛选**、详情页分类/技术栈展示、中英文 i18n。

**下载**：见本页 Assets 中的 `Prompt-Assistant-v0.2.1.exe`（Windows 便携版，免安装）。

### v0.2.1-dev (2026-06-25)

**新增（组件库第一阶段）**
- 🧩 UI 组件从 5 个扩展至 37 个；组件预览跟随当前应用风格。
- 🏷️ 组件页分类筛选与 i18n；README 文档对齐。

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
  pages/         # 路由页面（含 agent/ AI Studio）
  lib/           # 搜索、i18n、平台、组合器、agent（AI Provider 抽象）
  types/         # 数据类型（catalog、agent）
scripts/         # 构建索引、校验
src-tauri/       # Tauri 桌面壳
docs/            # 开发文档与 Roadmap
```

## 校验

```bash
npm run validate:prompts
```
