import type { ArchitectureBlueprint } from '@/types/catalog'

export const architectureBlueprints: ArchitectureBlueprint[] = [
  {
    id: 'placeholder-blueprint',
    kind: 'architecture',
    title: { 'zh-CN': '自定义框架绘图', 'en-US': 'Custom Framework Blueprint' },
    description: {
      'zh-CN': '可视化拖拽式系统架构设计工具，即将推出。',
      'en-US': 'Visual drag-and-drop system architecture designer, coming soon.',
    },
    status: 'placeholder',
    diagramType: 'tbd',
    nodes: [],
  },
]
