import { RotateCcw, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/catalog/CopyButton'
import { useApp } from '@/contexts/AppContext'
import { motionParamsToCode } from '@/lib/codeExport'
import type { MotionParams, MotionPresetKey } from '@/lib/motion/presets'
import type { MotionTuning } from '@/hooks/useMotionTuning'
import type { MessageKey } from '@/lib/messages'
import { cn } from '@/lib/utils'

const PRESET_KEYS: MotionPresetKey[] = ['snappy', 'editorial', 'bouncy', 'none']

const PRESET_LABEL: Record<MotionPresetKey, MessageKey> = {
  snappy: 'motion.preset.snappy',
  editorial: 'motion.preset.editorial',
  bouncy: 'motion.preset.bouncy',
  none: 'motion.preset.none',
}

interface SliderDef {
  key: keyof MotionParams
  label: MessageKey
  min: number
  max: number
  step: number
}

const SLIDERS: SliderDef[] = [
  { key: 'stiffness', label: 'motion.stiffness', min: 50, max: 800, step: 10 },
  { key: 'damping', label: 'motion.damping', min: 5, max: 60, step: 1 },
  { key: 'mass', label: 'motion.mass', min: 0.2, max: 3, step: 0.1 },
  { key: 'enterDuration', label: 'motion.enterDuration', min: 0.05, max: 1.2, step: 0.05 },
  { key: 'enterDelay', label: 'motion.enterDelay', min: 0, max: 0.6, step: 0.05 },
  { key: 'hoverScale', label: 'motion.hoverScale', min: 1, max: 1.15, step: 0.005 },
  { key: 'pressScale', label: 'motion.pressScale', min: 0.85, max: 1, step: 0.005 },
  { key: 'hoverLift', label: 'motion.hoverLift', min: -10, max: 0, step: 0.5 },
]

interface MotionPanelProps {
  tuning: MotionTuning
  className?: string
}

/** Slider panel to tune motion parameters live against the wrapped preview. */
export function MotionPanel({ tuning, className }: MotionPanelProps) {
  const { t } = useApp()
  const { params, setParams, presetKey, selectPreset, reset, replay } = tuning

  return (
    <div className={cn('rounded-xl border border-border bg-card p-4', className)}>
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">{t('motion.title')}</h3>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs" onClick={replay}>
            <Play className="h-3 w-3" />
            {t('motion.replay')}
          </Button>
          <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs" onClick={reset}>
            <RotateCcw className="h-3 w-3" />
            {t('motion.reset')}
          </Button>
        </div>
      </div>
      <p className="mb-3 text-xs text-muted-foreground">{t('motion.hint')}</p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {PRESET_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => selectPreset(key)}
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
              key === presetKey
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80',
            )}
          >
            {t(PRESET_LABEL[key])}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {SLIDERS.map((s) => (
          <label key={s.key} className="block">
            <span className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{t(s.label)}</span>
              <span className="tabular-nums text-muted-foreground">{params[s.key]}</span>
            </span>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={params[s.key]}
              onChange={(e) =>
                setParams({ ...params, [s.key]: Number(e.target.value) })
              }
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
            />
          </label>
        ))}
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <CopyButton
          text={motionParamsToCode(params)}
          label={t('motion.copyCode')}
          copiedLabel={t('styles.copied')}
          className="w-full"
        />
      </div>
    </div>
  )
}
