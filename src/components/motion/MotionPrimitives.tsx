import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'motion/react'
import { MOTION_PRESETS, type MotionPresetKey } from '@/lib/motion/presets'
import { cn } from '@/lib/utils'

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
  const p = MOTION_PRESETS[preset]
  const rise = preset === 'none' ? 0 : 6
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: rise }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...p.enter, delay }}
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
  const p = MOTION_PRESETS[preset]
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
  const p = MOTION_PRESETS[preset]
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
