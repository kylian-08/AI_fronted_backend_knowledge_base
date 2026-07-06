# Prompt Assistant

前端风格与组件 AI 提示词助手平台。浏览、搜索、复制高质量 UI 与后端 Prompt 模板。

## 功能

- **UI 风格**：91 种风格（32 个详细命名的精选风格 + 24 个动态风格 + 5 个核心设计系统 + 30 个调色变体），统一 Showcase 组件横向对比
- **动态风格**：极光/渐变光斑/呼吸光晕/扫光/扫描线/网格脉冲/波浪/霓虹闪烁/液态变形/粒子网络/星空/数字雨/光标追光等 13 种循环播放的动态背景效果，预览与详情页均实时播放
- **提示词附带代码**：每个风格的 Prompt 末尾自动附带对应的 CSS 变量代码块，复制即可直接使用，配色/圆角/字体与设计完全一致
- **风格预览**：列表卡片直接展示预览画面，无需进入详情
- **应用到本应用**：一键把任意风格应用到整个 App，界面实时变色
- **风格导入 / 导出**：支持 JSON 格式（含 prompt 与参考图 referenceImage），导入后可直接应用
- **参考图**：每个风格可一键复制 / 下载参考图（PNG）供 AI 参考
- **UI 组件**：45 个组件模板，覆盖操作、反馈、数据展示、导航、表单五大分类；列表卡片预览跟随当前应用风格动态变化，预览文案支持中英文
- **组件导入 / 导出**：支持 JSON 格式导入自定义组件 Prompt，与风格库能力对齐
- **后端框架**：NestJS、FastAPI、Express、Django、Gin、Spring 结构化 Prompt（11 个模板）
- **架构绘图**：占位模块，预留蓝图编辑器
- **Prompt 组合器**：风格（含已导入）+ 组件 + 后端一键组合，支持搜索与分类筛选
- **风格分类**：精选 / 动态 / 核心 / 变体 / 已导入五大分类 Tab，快速定位目标风格
- **AI Agent Studio（Beta）**：描述产品与品牌，Agent 从风格库与组件库中自动编排出可交互的界面方案；内置离线启发式引擎，预留真实模型接入接口
- **动效系统（Motion Layer）**：风格详情页与组件预览接入随风格联动的进场/悬停/点击动效（`snappy` / `editorial` / `bouncy` / `none` 四种性格），32 个精选风格逐一手动分配
- **动效参数调试**：组件详情页与 AI Agent Studio 生成结果页支持实时拖动滑块调整动效参数，并一键复制对应代码
- **前端代码直出**：风格 CSS 变量 / Tailwind 配置一键复制，组件详情页支持复制内嵌当前主题 tokens 的独立 React 代码
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

### v0.6.0 (2026-07-06)

**新增**
- 🌌 **动态风格（Dynamic Styles）**：新增 24 个以「持续动态效果」而非纯配色为核心的风格，覆盖 13 种可复用动画引擎——极光流动 `aurora`、渐变光斑漂移 `mesh`、呼吸光晕 `pulse-glow`、扫光 `shimmer`、扫描线 `scanlines`、脉冲网格 `grid-pulse`、波浪律动 `wave`、霓虹闪烁 `neon-flicker`、液态变形 `blob-morph`（纯 CSS）+ 粒子网络 `particle-network`、星空漂移 `starfield`、数字矩阵雨 `matrix-rain`（Canvas）+ 光标追光 `cursor-glow`（交互，跟随鼠标实时渲染径向光斑）。效果接入 `ShowcaseShell`，风格列表缩略图与详情页预览均实时播放，遵循 `prefers-reduced-motion`。
- 📐 程序化调色变体从 60 个减至 30 个（保留作纯配色补充），腾出的名额由 24 个动态风格填补，风格总数 91 个。
- 🏷️ 风格分类新增「动态」Tab（`精选 / 动态 / 核心 / 变体 / 已导入`）。
- 📋 **提示词自动附带样例代码**：所有内置风格（精选/动态/核心/变体）的 Prompt 文案末尾统一追加对应的 CSS 变量代码块（`appendCodeSampleToPrompt`），复制后配色/圆角/字体等设计令牌可直接被下游 AI/开发工具复用，不再仅依赖文字描述。用户导入的风格保持原样，不会被重复追加。

**下载**：见本页 Assets 中的 `Prompt-Assistant-v0.6.0.exe`（Windows 便携版，免安装）。

### v0.5.1 (2026-07-06)

**修复**
- 🐛 **风格卡片 hover 果冻感不一致**：风格列表卡片的缩略图（`ShowcaseShell previewOnly`）内部的按钮/卡片本身带有独立的 hover 动效，此前未屏蔽鼠标事件，导致鼠标移到缩略图内的按钮/卡片上时会与外层卡片的 hover 动效叠加缩放，同一张卡片在不同鼠标位置呈现不同的弹性幅度。现为缩略图整体加上 `pointer-events-none`（与组件卡片的处理方式对齐），确保同一张卡片任意位置 hover 观感一致。

### v0.5.0 (2026-07-06)

**新增**
- 🧩 **前端代码直出（Phase 2）**：风格详情页新增「复制 CSS 变量」「复制 Tailwind 配置」按钮；组件详情页新增「复制 React 代码」，导出内嵌当前风格 tokens 的独立 TSX（16 个高频组件为专属模板，其余为 tokens 精确的通用脚手架），导出代码尾部附带当前调参面板的动效参数。
- 🎚️ **动效参数开放调试（Phase 3）**：新增 `MotionPanel` 滑块面板（stiffness/damping/mass/进场时长/延迟/hover 缩放/按下缩放/hover 上浮 + 4 个 preset 快捷切换 + 重播 + 重置），通过 `MotionOverrideContext` 实时覆盖预览动效（仅会话内生效），并可一键复制对应的 framer-motion 代码。挂载于组件详情页与 AI Agent Studio 生成结果页（自动按匹配风格初始化）。

### v0.4.0 (2026-07-02)

**新增**
- 🎬 **动效系统（Motion Layer）**：引入 `motion`（Framer Motion）依赖，新增 `MotionPreset` 数据结构（`snappy` / `editorial` / `bouncy` / `none` 四种动效性格，含 `duration`/`delay`/`damping`/`stiffness`/`mass` 等参数）。32 个精选风格逐一手动分配匹配的动效性格（如 Apple 毛玻璃 → 柔和 `bouncy`，赛博朋克/科幻 HUD → 快速 `snappy`，瑞士国际主义/包豪斯 → 克制的 `editorial`，Windows 98/水墨 → `none`），60 个程序化变体走标签启发式兜底。
- ✨ 新增可复用动效组件 `MotionEnter`（进场淡入+错位延迟）、`MotionLift`（卡片悬停抬升）、`MotionButton`（按钮悬停/点击反馈），接入风格详情页 Showcase、风格库/组件库列表卡片、约 35/45 个组件预览的共享容器，以及「按钮」组件预览的完整交互示例。
- 🔗 `AppContext` 新增 `activeMotionPreset`，随「已应用风格」实时联动。

**下载**：见本页 Assets 中的 `Prompt-Assistant-v0.4.0.exe`（Windows 便携版，免安装）。

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
