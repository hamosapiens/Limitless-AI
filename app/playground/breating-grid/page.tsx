'use client'

import { useEffect, useRef } from 'react'
import MixedBlur from '../../playground/text/MixedBlur'

export default function BreathingGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const spacing = 48
    const waveSpeed = 90
    const waveThickness = 160
    const restartGap = waveThickness * 1.5 // restart a bit before the edge
    let time = 0
    let lastTime = 0
    let started = false

    // palette: Tailwind-ish light blues
    const PALETTE = ['#000', '#ccc', '#999', '#666', '#777', '#555']
    let base = pick(PALETTE)
    let prevFront = 0

    const cells: { x: number; y: number; offset: number }[] = []

    function pick<T>(arr: T[]) {
      return arr[(Math.random() * arr.length) | 0]
    }
    function hexToRgb(hex: string) {
      const h = hex.replace('#', '')
      const v = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16)
      return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 }
    }

    function generateGrid() {
      cells.length = 0
      const cols = Math.ceil(canvas.width / spacing)
      const rows = Math.ceil(canvas.height / spacing)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing + 0.5
          const y = r * spacing + 0.5
          const dx = x - canvas.width / 2
          const dy = y - canvas.height / 2
          const offset = Math.sqrt(dx * dx + dy * dy)
          cells.push({ x, y, offset })
        }
      }
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generateGrid()
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    function animate(timestamp: number) {
      if (!lastTime) lastTime = timestamp
      const deltaTime = timestamp - lastTime
      lastTime = timestamp
      time += deltaTime * 0.003

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // only the initial delay
      if (!started && time < 8) {
        requestAnimationFrame(animate)
        return
      }
      if (!started) {
        started = true
        time = 0 // start clean after the initial hold
      }

      const maxDist = Math.sqrt(canvas.width ** 2 + canvas.height ** 2)
      const wrapRange = Math.max(1, maxDist - restartGap)
      const waveFront = (time * waveSpeed) % wrapRange

      // on wrap ⇒ pick a new light-blue base
      if (waveFront < prevFront) base = pick(PALETTE)
      prevFront = waveFront

      hexToRgb(base)

      for (const cell of cells) {
        const distToWave = Math.abs(cell.offset - waveFront)
        let pulse = 0
        if (distToWave < waveThickness / 2) {
          const normalized = 1 - distToWave / (waveThickness / 2)
          pulse = Math.sin(normalized * Math.PI)
        }
        const glow = 0.04 + pulse * 0.18
        const size = 3 + pulse * 6
        ctx.save()
        ctx.globalAlpha = glow
        ctx.translate(cell.x, cell.y)
        ctx.rotate(Math.PI / 4)
        ctx.fillRect(-size/2, -0.7, size, 1.4)
        ctx.fillRect(-0.7, -size/2, 1.4, size)
        ctx.restore()
      }

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return (
    <>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full flex justify-center items-center"
      >
        <MixedBlur />
      </div>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full block bg-[#f8f8f8] z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.035) 1px, transparent 1px)',
          backgroundSize: '3rem 3rem',
        }}
      />
    </>
  )
}
