import type { DynamicEffectKey } from '@/types/catalog'
import type { LocalizedText } from '@/types/catalog'

export interface DynamicEffectMeta {
  key: DynamicEffectKey
  kind: 'css' | 'canvas' | 'interactive'
  label: LocalizedText
}

export const DYNAMIC_EFFECTS: Record<DynamicEffectKey, DynamicEffectMeta> = {
  aurora: { key: 'aurora', kind: 'css', label: { 'zh-CN': '极光流动', 'en-US': 'Aurora Drift' } },
  mesh: { key: 'mesh', kind: 'css', label: { 'zh-CN': '渐变光斑漂移', 'en-US': 'Gradient Mesh Drift' } },
  'pulse-glow': { key: 'pulse-glow', kind: 'css', label: { 'zh-CN': '呼吸光晕', 'en-US': 'Pulse Glow' } },
  shimmer: { key: 'shimmer', kind: 'css', label: { 'zh-CN': '扫光', 'en-US': 'Shimmer Sweep' } },
  scanlines: { key: 'scanlines', kind: 'css', label: { 'zh-CN': '扫描线', 'en-US': 'Scanlines' } },
  'grid-pulse': { key: 'grid-pulse', kind: 'css', label: { 'zh-CN': '脉冲网格', 'en-US': 'Grid Pulse' } },
  wave: { key: 'wave', kind: 'css', label: { 'zh-CN': '波浪律动', 'en-US': 'Wave Motion' } },
  'neon-flicker': { key: 'neon-flicker', kind: 'css', label: { 'zh-CN': '霓虹闪烁', 'en-US': 'Neon Flicker' } },
  'blob-morph': { key: 'blob-morph', kind: 'css', label: { 'zh-CN': '液态变形', 'en-US': 'Liquid Blob Morph' } },
  'particle-network': { key: 'particle-network', kind: 'canvas', label: { 'zh-CN': '粒子网络', 'en-US': 'Particle Network' } },
  starfield: { key: 'starfield', kind: 'canvas', label: { 'zh-CN': '星空漂移', 'en-US': 'Starfield' } },
  'matrix-rain': { key: 'matrix-rain', kind: 'canvas', label: { 'zh-CN': '数字矩阵雨', 'en-US': 'Matrix Rain' } },
  'cursor-glow': { key: 'cursor-glow', kind: 'interactive', label: { 'zh-CN': '光标追光（交互）', 'en-US': 'Cursor Spotlight (interactive)' } },
}

export function isInteractiveEffect(effect?: DynamicEffectKey): boolean {
  return effect === 'cursor-glow'
}
