import { useRef } from 'react'
import { useCanvasLoop } from './useCanvasLoop'

interface CanvasEffectProps {
  /** [accent, secondary] hex/rgb colors derived from the style's tokens. */
  colors: [string, string]
  className?: string
}

function hexToRgb(color: string): [number, number, number] {
  const c = color.trim()
  if (c.startsWith('#')) {
    const hex = c.length === 4
      ? c.slice(1).split('').map((ch) => ch + ch).join('')
      : c.slice(1)
    const num = parseInt(hex.slice(0, 6), 16)
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
  }
  const m = c.match(/rgba?\(([^)]+)\)/)
  if (m) {
    const [r, g, b] = m[1].split(',').map((n) => parseFloat(n.trim()))
    return [r || 0, g || 0, b || 0]
  }
  return [255, 255, 255]
}

function rgba(color: string, alpha: number): string {
  const [r, g, b] = hexToRgb(color)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/** Small seeded PRNG so particle layouts stay stable across re-renders. */
function makeRng(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

/** Drifting nodes connected by fading lines when close together. */
export function ParticleNetworkCanvas({ colors, className }: CanvasEffectProps) {
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number }[] | null>(null)
  const canvasRef = useCanvasLoop((ctx, width, height, time) => {
    if (!particlesRef.current) {
      const rng = makeRng(42)
      particlesRef.current = Array.from({ length: 22 }, () => ({
        x: rng(),
        y: rng(),
        vx: (rng() - 0.5) * 0.05,
        vy: (rng() - 0.5) * 0.05,
      }))
    }
    const particles = particlesRef.current
    ctx.clearRect(0, 0, width, height)
    const dt = 1 / 60
    for (const p of particles) {
      p.x += p.vx * dt
      p.y += p.vy * dt
      if (p.x < 0 || p.x > 1) p.vx *= -1
      if (p.y < 0 || p.y > 1) p.vy *= -1
      p.x = Math.min(1, Math.max(0, p.x))
      p.y = Math.min(1, Math.max(0, p.y))
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i]
        const b = particles[j]
        const dx = (a.x - b.x) * width
        const dy = (a.y - b.y) * height
        const dist = Math.hypot(dx, dy)
        const maxDist = Math.min(width, height) * 0.32
        if (dist < maxDist) {
          ctx.strokeStyle = rgba(colors[1], 0.35 * (1 - dist / maxDist))
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x * width, a.y * height)
          ctx.lineTo(b.x * width, b.y * height)
          ctx.stroke()
        }
      }
    }
    for (const p of particles) {
      ctx.fillStyle = rgba(colors[0], 0.85)
      ctx.beginPath()
      ctx.arc(p.x * width, p.y * height, 2.2, 0, Math.PI * 2)
      ctx.fill()
    }
    void time
  })
  return (
    <div className={`dyn-layer dyn-canvas-layer ${className ?? ''}`}>
      <canvas ref={canvasRef} />
    </div>
  )
}

/** Twinkling starfield with a gentle drift. */
export function StarfieldCanvas({ colors, className }: CanvasEffectProps) {
  const starsRef = useRef<{ x: number; y: number; r: number; phase: number; speed: number }[] | null>(null)
  const canvasRef = useCanvasLoop((ctx, width, height, time) => {
    if (!starsRef.current) {
      const rng = makeRng(7)
      starsRef.current = Array.from({ length: 46 }, () => ({
        x: rng(),
        y: rng(),
        r: 0.6 + rng() * 1.6,
        phase: rng() * Math.PI * 2,
        speed: 0.6 + rng() * 1.2,
      }))
    }
    ctx.clearRect(0, 0, width, height)
    for (const s of starsRef.current) {
      const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(time * s.speed + s.phase))
      const y = (s.y + time * 0.004 * s.speed) % 1
      ctx.fillStyle = rgba(colors[0], twinkle)
      ctx.beginPath()
      ctx.arc(s.x * width, y * height, s.r, 0, Math.PI * 2)
      ctx.fill()
    }
  })
  return (
    <div className={`dyn-layer dyn-canvas-layer ${className ?? ''}`}>
      <canvas ref={canvasRef} />
    </div>
  )
}

/** Falling character-column "digital rain". */
const MATRIX_CHARS = '01アイウエオカキクケコサシスセソ・:。=+*'.split('')

export function MatrixRainCanvas({ colors, className }: CanvasEffectProps) {
  const columnsRef = useRef<{ y: number; speed: number; chars: string[] }[] | null>(null)
  const canvasRef = useCanvasLoop((ctx, width, height, time) => {
    const colWidth = 14
    const colCount = Math.max(4, Math.floor(width / colWidth))
    if (!columnsRef.current || columnsRef.current.length !== colCount) {
      const rng = makeRng(99)
      columnsRef.current = Array.from({ length: colCount }, () => ({
        y: rng() * -20,
        speed: 4 + rng() * 5,
        chars: Array.from({ length: 10 }, () => MATRIX_CHARS[Math.floor(rng() * MATRIX_CHARS.length)]),
      }))
    }
    ctx.clearRect(0, 0, width, height)
    ctx.font = '12px ui-monospace, monospace'
    ctx.textBaseline = 'top'
    const rowHeight = 15
    for (let i = 0; i < columnsRef.current.length; i++) {
      const col = columnsRef.current[i]
      col.y += col.speed * (1 / 60)
      const totalRows = height / rowHeight + col.chars.length
      if (col.y > totalRows) col.y = -col.chars.length
      for (let r = 0; r < col.chars.length; r++) {
        const rowY = (col.y - r) * rowHeight
        if (rowY < -rowHeight || rowY > height) continue
        const alpha = r === 0 ? 0.95 : Math.max(0, 0.6 - r * 0.08)
        ctx.fillStyle = rgba(colors[r === 0 ? 1 : 0], alpha)
        ctx.fillText(col.chars[r], i * colWidth, rowY)
      }
    }
    void time
  })
  return (
    <div className={`dyn-layer dyn-canvas-layer ${className ?? ''}`}>
      <canvas ref={canvasRef} />
    </div>
  )
}
