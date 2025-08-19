'use client'
import { useEffect, useState } from 'react'

function RandomGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      const randX = Math.floor(Math.random() * 6) * 200 // multiples of 200px
      const randY = Math.floor(Math.random() * 6) * 200
      setPos({ x: randX, y: randY })
    }, 2000) // every 2s pick a new box
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute w-[100px] h-[100px] bg-fuchsia-500/30 blur-2xl rounded-md transition-all duration-700"
      style={{
        left: pos.x,
        top: pos.y,
      }}
    />
  )
}
export default RandomGlow