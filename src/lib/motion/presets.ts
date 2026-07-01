import type { Transition } from 'motion/react'
import type { StyleItem } from '@/types/catalog'

/**
 * Phase 1 (Motion Layer): every style resolves to one of these four motion
 * "personalities". This is intentionally a small closed set — the goal is a
 * perceptible difference in *feel* between styles, not a bespoke animation
 * per style, which would be unmaintainable across 97 styles.
 */
export type MotionPresetKey = 'snappy' | 'editorial' | 'bouncy' | 'none'

export interface MotionPreset {
  /** Used for hover/tap feedback on interactive elements. */
  spring: Transition
  /** Used for on-mount entrance (fade + slight rise). */
  enter: Transition
  hoverScale: number
  pressScale: number
  /** Vertical lift in px on hover (negative = up). */
  hoverLift: number
}

export const MOTION_PRESETS: Record<MotionPresetKey, MotionPreset> = {
  snappy: {
    spring: { type: 'spring', stiffness: 500, damping: 30, mass: 0.6 },
    enter: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
    hoverScale: 1.03,
    pressScale: 0.96,
    hoverLift: -2,
  },
  editorial: {
    spring: { type: 'spring', stiffness: 220, damping: 26, mass: 1 },
    enter: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    hoverScale: 1.008,
    pressScale: 0.99,
    hoverLift: -1,
  },
  bouncy: {
    spring: { type: 'spring', stiffness: 320, damping: 14, mass: 0.8 },
    enter: { duration: 0.32, ease: [0.34, 1.56, 0.64, 1] },
    hoverScale: 1.05,
    pressScale: 0.94,
    hoverLift: -3,
  },
  none: {
    spring: { type: 'spring', stiffness: 400, damping: 40, mass: 1 },
    enter: { duration: 0.16, ease: 'linear' },
    hoverScale: 1,
    pressScale: 0.99,
    hoverLift: 0,
  },
}

/**
 * Explicit per-style assignment for the 32 hand-curated "signature" styles —
 * chosen to match each style's brand personality rather than derived from
 * tags. Programmatic/base styles fall back to the tag-based heuristic below.
 */
export const CURATED_STYLE_MOTION: Record<string, MotionPresetKey> = {
  'apple-frosted-glass': 'bouncy',
  'windows-11-fluent': 'editorial',
  'windows-98-retro': 'none',
  'cream-soft': 'bouncy',
  vaporwave: 'bouncy',
  'nordic-minimal': 'editorial',
  'holographic-3d': 'snappy',
  'cyberpunk-neon': 'snappy',
  'industrial-mecha': 'snappy',
  'neumorphism-soft': 'bouncy',
  claymorphism: 'bouncy',
  'memphis-pop': 'bouncy',
  'art-deco-gold': 'editorial',
  bauhaus: 'editorial',
  'swiss-international': 'editorial',
  'y2k-chrome': 'snappy',
  'dark-luxury-gold': 'editorial',
  'kawaii-pastel': 'bouncy',
  'retro-terminal': 'snappy',
  'material-you': 'editorial',
  'frutiger-aero': 'bouncy',
  'gradient-mesh': 'bouncy',
  'brutalist-web': 'snappy',
  'sci-fi-hud': 'snappy',
  'ink-wash-chinese': 'none',
  'newspaper-print': 'none',
  'skeuomorphism-ios6': 'none',
  'candy-gradient': 'bouncy',
  'botanical-organic': 'bouncy',
  'corporate-clean': 'editorial',
  'dark-glass-neon': 'snappy',
  'sunset-warm-gradient': 'bouncy',
}

const TAG_PRESET_RULES: { tags: string[]; preset: MotionPresetKey }[] = [
  { tags: ['neon', 'cyber', 'sci-fi', 'retro'], preset: 'snappy' },
  { tags: ['minimal', 'clean', 'corporate', 'professional'], preset: 'editorial' },
  { tags: ['soft', 'pastel', 'playful', 'organic'], preset: 'bouncy' },
]

function heuristicFromTags(tags: string[]): MotionPresetKey {
  const lower = tags.map((t) => t.toLowerCase())
  for (const rule of TAG_PRESET_RULES) {
    if (rule.tags.some((t) => lower.includes(t))) return rule.preset
  }
  return 'none'
}

/**
 * Resolve which motion preset a style should animate with, in priority
 * order: explicit `style.motionPreset` override > curated lookup table >
 * tag-based heuristic (covers the 65 programmatic/base styles) > 'none'.
 */
export function resolveMotionPresetKey(style?: StyleItem | null): MotionPresetKey {
  if (!style) return 'none'
  if (style.motionPreset) return style.motionPreset
  if (CURATED_STYLE_MOTION[style.id]) return CURATED_STYLE_MOTION[style.id]
  return heuristicFromTags(style.tags)
}

export function resolveMotionPreset(style?: StyleItem | null): MotionPreset {
  return MOTION_PRESETS[resolveMotionPresetKey(style)]
}

/**
 * Fallback resolver for call sites that only have design tokens (no full
 * StyleItem), e.g. component preview renderers. Glass styles read as
 * "bouncy" (soft, floaty), everything else defaults to a restrained 'none'.
 */
export function resolveMotionPresetKeyFromTokens(tokens: Record<string, string>): MotionPresetKey {
  return tokens['--sc-backdrop'] ? 'bouncy' : 'none'
}

export function resolveMotionPresetFromTokens(tokens: Record<string, string>): MotionPreset {
  return MOTION_PRESETS[resolveMotionPresetKeyFromTokens(tokens)]
}
