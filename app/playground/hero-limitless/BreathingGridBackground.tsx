'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

export default function BreathingGridBackground() {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Keep canvas exactly the hero size + DPR crisp
  useLayoutEffect(() => {
    const wrap = wrapRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect()
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    // === PERFECT MATCH WITH CSS GRID ===
    const spacing = 50                 // matches your 50px background grid
    const centerOffset = spacing / 2   // centers @ 25, 75, 125, ...
    // ==================================

    const waveSpeed = 90
    const waveThickness = 160
    const restartGap = waveThickness * 1.5

    let t = 0
    let last = 0
    let started = false
    let prevFront = 0

    const cells: { x: number; y: number; offset: number }[] = []

    function regenCells() {
      cells.length = 0
      const { width, height } = canvas.getBoundingClientRect()

      // compute counts so centers stay aligned to the CSS grid
      const cols = Math.floor((width - centerOffset) / spacing) + 1
      const rows = Math.floor((height - centerOffset) / spacing) + 1

      for (let r = 0; r < rows; r++) {
        const y = centerOffset + r * spacing
        for (let c = 0; c < cols; c++) {
          const x = centerOffset + c * spacing
          const dx = x - width / 2
          const dy = y - height / 2
          const offset = Math.hypot(dx, dy)
          cells.push({ x, y, offset })
        }
      }
    }

    regenCells()
    const ro = new ResizeObserver(regenCells)
    ro.observe(canvas)

    function frame(ts: number) {
      if (!last) last = ts
      const dt = ts - last
      last = ts
      t += dt * 0.003

      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)

      // Intentional short hold
      if (!started && t < 6) {
        requestAnimationFrame(frame)
        return
      }
      if (!started) {
        started = true
        t = 0
      }

      const maxDist = Math.hypot(width, height)
      const wrapRange = Math.max(1, maxDist - restartGap)
      const waveFront = (t * waveSpeed) % wrapRange
      if (waveFront < prevFront) {
        // nothing to change color-wise; we keep it white glow
      }
      prevFront = waveFront

      // White glow, additive blend
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = '#ffffff'

      for (const cell of cells) {
        const dist = Math.abs(cell.offset - waveFront)
        let pulse = 0
        if (dist < waveThickness / 2) {
          const n = 1 - dist / (waveThickness / 2)
          pulse = Math.sin(n * Math.PI)
        }

        // Soft white glow
        const alpha = 0.04 + pulse * 0.22
        const size = 2 + pulse * 6

        ctx.globalAlpha = alpha
        ctx.beginPath()
        // crisp small plus-shape as two thin rects
        ctx.save()
        ctx.translate(cell.x, cell.y)
        ctx.rotate(Math.PI / 4)
        ctx.fillRect(-size / 2, -0.8, size, 1.6)
        ctx.fillRect(-0.8, -size / 2, 1.6, size)
        ctx.restore()
      }

      ctx.restore()
      requestAnimationFrame(frame)
    }

    const raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none">
      {/* Transparent canvas; the vignette & CSS grid overlay will sit above */}
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  )
}
