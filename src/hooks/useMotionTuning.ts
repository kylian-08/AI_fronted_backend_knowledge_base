import { useCallback, useMemo, useState } from 'react'
import {
  paramsToPreset,
  presetToParams,
  type MotionParams,
  type MotionPreset,
  type MotionPresetKey,
} from '@/lib/motion/presets'

export interface MotionTuning {
  params: MotionParams
  setParams: (params: MotionParams) => void
  presetKey: MotionPresetKey
  selectPreset: (key: MotionPresetKey) => void
  reset: () => void
  replay: () => void
  /** Fully resolved preset to feed into `MotionOverrideProvider`. */
  preset: MotionPreset
  /** Use as a React `key` to remount the preview and replay the entrance. */
  replayKey: string
}

/**
 * Session-scoped motion tuning state (Phase 3). `replayKey` changes whenever
 * entrance-related values change (or `replay()` is called) so callers can use
 * it as a React `key` to remount the preview and replay the enter animation.
 */
export function useMotionTuning(initialPreset: MotionPresetKey): MotionTuning {
  const [presetKey, setPresetKey] = useState<MotionPresetKey>(initialPreset)
  const [params, setParams] = useState<MotionParams>(() => presetToParams(initialPreset))
  const [replayTick, setReplayTick] = useState(0)

  const selectPreset = useCallback((key: MotionPresetKey) => {
    setPresetKey(key)
    setParams(presetToParams(key))
  }, [])

  const reset = useCallback(() => setParams(presetToParams(presetKey)), [presetKey])
  const replay = useCallback(() => setReplayTick((n) => n + 1), [])

  const preset: MotionPreset = useMemo(() => paramsToPreset(params), [params])
  const replayKey = `${params.enterDuration}-${params.enterDelay}-${replayTick}`

  return { params, setParams, presetKey, selectPreset, reset, replay, preset, replayKey }
}
