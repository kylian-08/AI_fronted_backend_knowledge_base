# Prompt Assistant 开发文档 / Roadmap

> 最后更新：2026-07-01　当前已发布版本：**`v0.3.0`**（已 commit / push / tag / GitHub Release，含可下载 exe）
>
> 本文档面向：项目维护者本人、未来加入的协作者、以及需要快速理解现状再继续开发的 AI Agent。
> **约定**：每完成一个 Phase 的收尾工作，回来更新本文档的「当前状态」「版本历史」两节，并把对应 Phase 的 checklist 打勾。

---

## 1. 项目定位

Prompt Assistant 是一个跨平台（Web / PWA / Docker / Tauri 桌面端）的 **AI 提示词与界面设计工作台**，围绕四条主线：

1. **风格库**：97 种 UI 视觉风格（32 精选 + 5 核心 + 60 程序化变体），可直接「应用」到本应用换肤，也可导出 Prompt / 参考图供 AI 生成代码用。
2. **组件库**：45 个常见 UI 组件模板，预览随当前风格动态换肤，预览文案支持中英文，支持导入自定义组件。
3. **组合与生成**：Prompt 组合器（风格 + 组件 + 后端手动拼装，含搜索与分类）与 **AI Agent Studio**（描述需求 → Agent 自动编排出可交互界面方案）。
4. **后端模板**：11 个结构化 Prompt（NestJS / Express / FastAPI / Django / Gin / Spring）。

技术栈：React 19 + TypeScript 6 (strict) + Vite 8 + Tailwind 4 + Tauri 2。详细开发命令见 `CLAUDE.md`。

---

## 2. 架构现状

### 2.1 数据层（`src/data/*/registry.ts`）

| 目录 | 内容 | 数量 | 导入/导出 |
|------|------|------|-----------|
| `data/styles` | `curatedStyles.ts`(32 精选) + `baseStyles.ts`(5 核心) + `generator.ts`(60 程序化变体) | 97 | ✅ 支持 JSON 导入（含 `prompt` + `referenceImage`），存 `localStorage` |
| `data/components` | 5 个手写对象 + 40 个通过 `C()` 构造器生成 | 45 | ✅ 支持 JSON 导入，存 `localStorage` |
| `data/backend` | Node / Python / Go / Java 四类 | 11 | ❌ 暂无导入导出 |
| `data/architecture` | 占位数据 | 1（占位） | — |

所有 catalog 数据都实现 `CatalogItem` 基础接口（`src/types/catalog.ts`），统一提供 `getAllXXXList()` / `getXXXById()` / `importXXXFromJson()` / `exportImportedXXX()` 模式，**新增一类资源时应遵循同一套函数命名约定**。

### 2.2 主题与渲染层

- **Design Tokens**：每个 `StyleItem.tokens` 是一组 `--sc-*` CSS 变量（背景、前景、主色、圆角、阴影、字体、`--sc-backdrop` 玻璃效果等）。
- **主题应用**：`src/lib/themeApplier.ts` 把选中风格的 tokens 写入 `document.documentElement`，实现全局换肤；`AppContext.activeTokens` 暴露「当前应用风格 or 默认主题」的 tokens 给所有预览组件消费。
- **组件预览**：`src/components/showcase/componentPreviews.tsx` 为每个组件 id 注册一个 token 驱动的 React 渲染函数（`ThemedComponentPreview`），预览文案通过 `src/lib/previewLabels.ts` 做中英双语。
- **风格预览海报**：`src/lib/stylePoster.ts` 生成 SVG「参考图」，可复制/下载 PNG。

### 2.3 组合与生成层

- **Prompt Composer**（`src/pages/ComposerPage.tsx`）：风格（单选）+ 组件（多选）+ 后端（单选），通过 `src/lib/promptComposer.ts` 拼装成一段完整 Prompt 文本。选择器为 `ComposerPicker`（搜索 + 分类 Tab），接入含用户导入项的 `allStyles`/`allComponents`。
- **AI Agent Studio**（`src/pages/agent/AgentStudioPage.tsx`，`/agent` 路由）：
  - 类型契约：`src/types/agent.ts`（`AgentBrief` 输入 / `GeneratedUISpec` 输出 / `AgentProvider` 扩展接口） —— **这是 AI Native 的核心接口，新增生成后端只需实现 `AgentProvider` 并在 `lib/agent/index.ts` 注册**
  - **已实现**：`local-heuristic`（离线启发式，根据关键词匹配风格 tag + 组件分类，确定性规则生成，无需 API Key）
  - **接口已就位，待接入**：`remote-llm`（OpenAI-compatible fetch 结构、system prompt 模板、JSON 解析回填已写好，只差真实 endpoint + API key）
  - 生成结果直接用 `ThemedComponentPreview` 渲染成可交互界面，可一键「应用风格」或「复制 Prompt」

### 2.4 i18n / 主题外壳

- `src/lib/messages.ts`：所有 UI 文案的中英字典，`AppContext.t()` / `tr()` 读取。
- `src/components/layout/Layout.tsx`：侧边栏（桌面）+ 底部 Tab（移动端）+ Header，含 6 个导航入口（首页/风格/组件/后端/组合/AI 生成/架构）。
- `src/components/catalog/SidePager.tsx`：列表页键盘左右翻页 + 悬浮翻页按钮，`useStyleFilter` / `useComponentFilter` 统一分页与筛选逻辑。

### 2.5 桌面端（Tauri）

- `src-tauri/`：Rust 壳，`vite.config.ts` 中对 Tauri 构建禁用 PWA（避免 WebView2 Service Worker 缓存导致更新后界面不刷新的历史问题）。
- `src/main.tsx` 启动时会主动清理残留 Service Worker，双保险。
- 打包命令：`npm run build:desktop:portable`（免安装单文件 exe），产物放 `release/`（已 gitignore）。

---

## 3. 版本历史摘要

| 版本 | 状态 | 关键内容 |
|------|------|----------|
| `v0.1.0`（Initial commit） | 已发布 | 基础 Prompt 库、PWA、Docker、Tauri 骨架 |
| `v0.2.0` | 已发布 | 32 个精选风格详细化、应用到本应用主题化、参考图复制/下载、风格 JSON 导入、玻璃拟态修复、侧边栏 sticky、Service Worker 缓存修复 |
| `v0.2.1` | 已发布 | 组件库从 5 个扩展到 45 个、组件分类筛选、组件详情页元信息、组件预览主题化 |
| **`v0.3.0`** | **已发布（当前基线）** | AI Agent Studio、组合器重构（搜索+分类）、风格分类 Tab、组件导入导出、后端模板 7→11、组件预览 i18n |

> Release + 可下载 exe 见 GitHub Releases 页面，三个版本均已上传。

---

## 4. 已完成：Phase 0（v0.3.0 发布收尾）

以下工作已全部完成并验收通过，记录在案供追溯：

- [x] `tsc -b` / `npm run lint` / `npm run validate:prompts` / `npm run build` 全部通过
- [x] 修复 ESLint 未忽略 `src-tauri/target` 构建产物导致的海量误报
- [x] 修复 `ComposerPage.tsx` 中 effect 内 setState 问题（改为派生状态）
- [x] README 与实际数据同步（97 风格 / 45 组件 / 11 后端模板），新增 v0.3.0 Release Notes
- [x] 版本号统一提升至 `0.3.0`（`package.json` / `Cargo.toml` / `Cargo.lock` / `tauri.conf.json` 窗口标题）
- [x] Commit（作者 `kylian-08`，无 `Co-authored-by: Cursor` trailer）→ push → tag `v0.3.0`
- [x] `npm run build:desktop:portable` 重新打包 → 上传 `Prompt-Assistant-v0.3.0.exe` 到 GitHub Release

### ⚠️ 运维教训（务必遵守）

开发过程中先后发生两次「未提交改动被意外丢弃」事故，均已恢复、无实际损失，但记录下来避免重演：

1. 误用 `git checkout -- <file>` 丢弃了未提交改动 → 通过 `git fsck --unreachable` 找到 `git stash` 留下的悬空 commit 找回。
2. 一次工作区状态变化后，`componentPreviews.tsx` / `ComposerPage.tsx` / 版本号 / README / 本文档被回退到旧内容 → 通过 `git checkout HEAD -- <file>` 从已 push 的 `v0.3.0` commit 恢复。

**规则**：

- 操作任何未暂存的改动前，先 `git status` + `git diff` 确认当前状态。
- 大批量变更完成后**尽快 commit**（哪怕不 push），减少「工作区独有、任何地方都没有备份」的时间窗口。
- 怀疑文件被意外还原时，先对比 `git diff HEAD`，而不是凭记忆判断。

---

## 5. 路线图（Phase 1 起）

来源：设计同事提出的四点建议（交互动效预览 / 前端代码直出 / 动效参数调试 / 多风格组合对比）+ 本人提出的 AI Native 方向，已确认落地路径。

### Phase 1：动效系统（Motion Layer）

**目标**：从「静态看样」升级到「可体验交互」。

- [ ] 引入 `motion`（Framer Motion）依赖
- [ ] 设计 `MotionPreset` 数据结构，挂到 `StyleItem` 上（如 `motionPreset: 'snappy' | 'editorial' | 'bouncy' | 'none'`）
  - 预设参数：`duration`、`delay`、`damping`、`stiffness`、`mass`、`ease`
- [ ] 组件预览增加 3 类交互状态动效：`enter`（进场）、`hover`、`press`
- [ ] `ShowcaseShell` / `ComponentCard` 预览接入 motion，随风格切换联动
- [ ] 32 个精选风格逐一分配合适的 motion preset（如 Apple 毛玻璃 → 柔和 spring；赛博朋克 → 快速 snappy）

**验收标准**：任选一个风格切换后，组件预览的 hover/进场节奏应有可感知差异，而不是所有风格动效完全一致。

### Phase 2：前端代码直出

**目标**：从「只给 Prompt」升级到「可直接使用的代码片段」。

- [ ] Token 导出：一键复制/下载当前风格的 `:root { --sc-*: ... }` CSS 或 Tailwind `theme.extend` 配置
- [ ] 单组件代码导出：为每个组件预览增加「复制 React 代码」按钮，输出带当前 tokens 的静态 JSX（生成独立可粘贴的代码字符串，而非依赖 `ThemedComponentPreview` 内部实现）
- [ ] 评估：是否需要为 Phase 1 的 motion 效果同步生成代码（复杂度高，可放到 Phase 2 后半段）

**验收标准**：用户在组件详情页可以拿到一段可以直接粘进 React 项目、且视觉与预览一致的代码。

### Phase 3：动效参数开放调试

**目标**：把「改动画」从返工变成实时调参。

- [ ] 新增 `MotionPanel` 组件（滑块面板）：`duration`、`damping`、`stiffness`、`delay`、`scale`、`opacity` 等
- [ ] 面板改动实时应用到当前预览（不落库，仅会话内生效）
- [ ] 「保存为自定义 preset」→ 可在导出代码/Prompt 时带出具体参数值
- [ ] 挂载位置：组件详情页 + Agent Studio 生成结果页（生成后允许微调节奏）

**验收标准**：拖动阻尼/时长滑块，预览动效实时变化，且能导出带这些参数的代码。

### Phase 4：多风格 / 方案组合对比

**目标**：从「单一方案」升级到「决策依据」。

- [ ] 「品牌方向库」：在现有 32 精选风格之上，按气质重新打标签分组（如 `极简秩序` / `科技叙事` / `编辑画册` / `实验视觉`），而非仅按色相
- [ ] 组合器 / 风格页新增「方案对比」视图：同一组件集合，2～4 个风格并排展示
- [ ] Agent Studio 支持「一次生成多个方案」（复用 `local-heuristic`，取 top-N 候选风格而非只取最高分）
- [ ] 评估 60 个程序化调色变体是否需要精简或重新分组（同质化问题历史反馈已提出）

**验收标准**：用户能在一屏内直接对比至少 2 套完整方案（风格+组件+动效），而不是来回切换标签页。

### Phase 5：AI Native 深化

**目标**：把 Agent Studio 从「Demo」升级为「常用工作流」——这是当前对话中明确提出的「AI Native」诉求的落地阶段。

- [ ] 真实 `remote-llm` provider 联调（至少一个真实 API，如 OpenAI/Claude 兼容端点），在 Agent Studio 设置面板中完成 endpoint + key 配置
- [ ] Agent 生成结果支持**二次编辑**：替换某一区块的组件、重新生成单个区块（而非整页重来）
- [ ] 生成历史记录（localStorage）：保留最近 N 次生成结果，可回看/对比/收藏
- [ ] `AgentProvider` 接口补充流式响应支持（`generate` 可选返回 `AsyncGenerator`，用于展示「Agent 正在思考」的分步过程）
- [ ] 探索：Agent 输出接入 Phase 1 的 motion preset 与 Phase 2 的代码导出，形成「一句话描述 → 可运行代码」完整闭环
- [ ] 评估是否需要更细粒度的用户输入（例如目标用户画像、竞品参考链接、必须包含/排除的区块）以提升生成准确度

### Phase 6：工程化与协作基础

**目标**：为多人协作和长期维护打底。

- [ ] 补充单元测试：`themeApplier`、`promptComposer`、`styleCatalog` 的分桶逻辑、`heuristicProvider` 的打分逻辑
- [ ] 引入基础 CI（GitHub Actions）：push/PR 时跑 `lint` + `tsc -b` + `build`
- [ ] `main` 分支保护：要求 PR + 至少一次 Review
- [ ] 邀请协作者时按角色分配 GitHub 权限（`Write` 给固定开发者，`Admin` 仅所有者本人保留；陌生贡献者走 Fork + PR 流程）
- [ ] 补充 `CONTRIBUTING.md`：本地开发流程、提交规范、如何新增一个风格/组件/后端模板

---

## 6. 优先级建议

```
必须先做（发布基线）
└── Phase 0：✅ 已完成，v0.3.0 已发布

高价值 / 中等成本（建议紧接着做）
└── Phase 1：动效系统  ← 设计师最能直接感知的改进
└── Phase 3：参数调试面板  ← 和 Phase 1 强耦合，建议合并规划、分批交付

中价值 / 视资源投入
└── Phase 2：代码直出
└── Phase 4：多方案对比

长期 / 战略性
└── Phase 5：AI Native 深化  ← 本人明确要求的方向，接口已铺好，需要投入真实模型联调
└── Phase 6：工程化协作基础（若确定要拉人一起开发，优先级应提前）
```

**下一步建议**：Phase 1（动效系统）——当前产品与「专业设计工具」差距最大、也最容易被感知到改进；若近期计划邀请协作者，可将 Phase 6 的分支保护与 CI 提前插入。

---

## 7. 开放问题（需要产品侧决策）

1. **Rive 是否引入**：建议仅在 Phase 4 之后，针对 2～3 个「旗舰演示风格」按需引入，不作为默认渲染引擎（成本高、维护重）。
2. **远程 Agent 用哪家模型**：影响 `remote-llm` provider 的具体实现细节（是否需要支持多个 Provider 并存、密钥如何在桌面端安全存储，目前是明文存 `localStorage`，生产化前需重新评估）。
3. **60 个程序化调色变体是否保留**：与 Phase 4 的「品牌方向库」重新分组会有冲突，需要先决定是精简还是重新包装。
4. **是否需要多人实时协作 / 账号体系**（当前是纯前端 + localStorage，无后端）：如果后续要做用户账号、跨设备同步生成历史，需要补一个轻量后端，这是当前架构里唯一缺失的一层。
5. **是否/何时邀请外部协作者**：决定 Phase 6 的优先级；若近期就要拉人，建议先做分支保护 + CI 再开放 `Write` 权限。

---

## 8. 快速上手（给新协作者 / Agent）

1. 阅读 `CLAUDE.md` 了解开发命令与代码风格约定。
2. 阅读本文档第 2 节了解架构分层，第 5 节了解当前 Roadmap 所在阶段。
3. 开工前先 `git status` + `git diff` 确认工作区是否有未提交改动，遇到看起来「不对」的文件状态先对比 `git diff HEAD` 而不是直接 `checkout --`（见第 4 节教训）。
4. 新增功能前，先确认属于 Roadmap 哪个 Phase，避免与本文档规划冲突；完成后回来更新对应 checklist。
5. 涉及新增 catalog 资源类型（风格/组件/后端之外）时，遵循 `getAllXXXList / getXXXById / importXXXFromJson / exportImportedXXX` 命名约定。
6. 涉及新增 AI 生成后端时，实现 `src/types/agent.ts` 的 `AgentProvider` 接口，并在 `src/lib/agent/index.ts` 注册，无需改动任何 UI 代码。
