'use client'
import { useEffect } from 'react'

export function useDragScroll(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let isDown = false
    let startX = 0
    let scrollLeft = 0
    let velocity = 0
    let momentumID: number

    const down = (e: MouseEvent) => {
      isDown = true
      startX = e.pageX
      scrollLeft = el.scrollLeft
      velocity = 0
      cancelAnimationFrame(momentumID)
      el.classList.add('cursor-grabbing')
    }

    const up = () => {
      if (!isDown) return
      isDown = false
      el.classList.remove('cursor-grabbing')

      const momentum = () => {
        el.scrollLeft -= velocity
        velocity *= 0.95
        if (Math.abs(velocity) > 0.5) {
          momentumID = requestAnimationFrame(momentum)
        }
      }
      momentum()
    }

    const move = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX
      const walk = x - startX
      const prev = el.scrollLeft
      el.scrollLeft = scrollLeft - walk
      velocity = el.scrollLeft - prev
    }

    el.addEventListener('mousedown', down)
    el.addEventListener('mouseup', up)
    el.addEventListener('mouseleave', up)
    el.addEventListener('mousemove', move)

    return () => {
      el.removeEventListener('mousedown', down)
      el.removeEventListener('mouseup', up)
      el.removeEventListener('mouseleave', up)
      el.removeEventListener('mousemove', move)
    }
  }, [ref])
}
