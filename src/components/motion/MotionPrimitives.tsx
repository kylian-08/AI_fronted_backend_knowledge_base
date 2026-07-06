import { createContext, useContext, type CSSProperties, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { MOTION_PRESETS, type MotionPreset, type MotionPresetKey } from '@/lib/motion/presets'
import { cn } from '@/lib/utils'

/**
 * Phase 3 (Motion Parameter Debugging): when a `MotionPanel` is tuning
 * parameters, it provides a full `MotionPreset` through this context and
 * every motion primitive below it uses these values instead of its own
 * `preset` prop — no prop-drilling through 45 preview renderers required.
 */
const MotionOverrideContext = createContext<MotionPreset | null>(null)

export function MotionOverrideProvider({
  value,
  children,
}: {
  value: MotionPreset | null
  children: ReactNode
}) {
  return <MotionOverrideContext.Provider value={value}>{children}</MotionOverrideContext.Provider>
}

function useResolvedPreset(preset: MotionPresetKey): MotionPreset {
  const override = useContext(MotionOverrideContext)
  return override ?? MOTION_PRESETS[preset]
}

interface MotionEnterProps {
  preset?: MotionPresetKey
  /** Stagger delay in seconds, e.g. index * 0.05 for cascading lists. */
  delay?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
}

/** Fade + slight rise on mount. Intensity/speed driven by the resolved preset. */
export function MotionEnter({ preset = 'none', delay = 0, className, style, children }: MotionEnterProps) {
  const override = useContext(MotionOverrideContext)
  const p = override ?? MOTION_PRESETS[preset]
  // While tuning (override active), always show the rise so slider changes stay visible.
  const rise = override ? 6 : preset === 'none' ? 0 : 6
  const baseDelay = (p.enter as { delay?: number }).delay ?? 0
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: rise }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...p.enter, delay: baseDelay + delay }}
    >
      {children}
    </motion.div>
  )
}

interface MotionLiftProps {
  preset?: MotionPresetKey
  className?: string
  style?: CSSProperties
  children: ReactNode
  as?: 'div'
}

/** Hover elevation + tap feedback for clickable cards. Wraps in a div. */
export function MotionLift({ preset = 'none', className, style, children }: MotionLiftProps) {
  const p = useResolvedPreset(preset)
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{ y: p.hoverLift, scale: p.hoverScale }}
      whileTap={{ scale: p.pressScale }}
      transition={p.spring}
    >
      {children}
    </motion.div>
  )
}

interface MotionButtonProps {
  preset?: MotionPresetKey
  className?: string
  style?: CSSProperties
  children: ReactNode
  type?: 'button' | 'submit'
  disabled?: boolean
}

/** Drop-in replacement for a plain <button> with hover/tap feedback. */
export function MotionButton({
  preset = 'none',
  className,
  style,
  children,
  type = 'button',
  disabled,
}: MotionButtonProps) {
  const p = useResolvedPreset(preset)
  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={cn(className)}
      style={style}
      whileHover={disabled ? undefined : { scale: p.hoverScale, y: p.hoverLift }}
      whileTap={disabled ? undefined : { scale: p.pressScale }}
      transition={p.spring}
    >
      {children}
    </motion.button>
  )
}
