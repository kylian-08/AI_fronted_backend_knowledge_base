import { useEffect, useRef } from 'react'

type DrawFn = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => void

/**
 * Shared rAF + resize plumbing for the canvas-based Dynamic Style effects
 * (particle network / starfield / matrix rain). Sizes the canvas to its
 * parent element (device-pixel-ratio aware, capped at 2x to keep many
 * simultaneous instances — e.g. a full page of style cards — cheap) and
 * calls `draw` every frame with elapsed seconds since mount.
 */
export function useCanvasLoop(draw: DrawFn) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawRef = useRef(draw)

  useEffect(() => {
    drawRef.current = draw
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      const rect = canvas!.parentElement?.getBoundingClientRect()
      width = rect?.width ?? canvas!.clientWidth ?? 0
      height = rect?.height ?? canvas!.clientHeight ?? 0
      canvas!.width = Math.max(1, Math.round(width * dpr))
      canvas!.height = Math.max(1, Math.round(height * dpr))
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const observer = new ResizeObserver(resize)
    if (canvas.parentElement) observer.observe(canvas.parentElement)

    let frameId = 0
    const start = performance.now()
    function loop(now: number) {
      if (width > 0 && height > 0) drawRef.current(ctx!, width, height, (now - start) / 1000)
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
    }
  }, [])

  return canvasRef
}
