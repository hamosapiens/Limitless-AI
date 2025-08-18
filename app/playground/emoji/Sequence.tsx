'use client'

import { useState, useEffect } from 'react'

const sequence = ['🙈', '🙉', '🐵', '🙊', '🐵']

type Props = {
  auto?: boolean
  speed?: number
}

export default function MonkeyCycle({ auto = true, speed = 1000 }: Props) {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((prev) => (prev + 1) % sequence.length)

  useEffect(() => {
    if (!auto) return
    const timer = setInterval(next, speed)
    return () => clearInterval(timer)
  }, [auto, speed])

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-100 text-6xl cursor-pointer select-none"
      onClick={() => !auto && next()}
    >
      <span key={index} className="animate-fadeIn">
        {sequence[index]}
      </span>

      {/* Scoped animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s forwards;
        }
      `}</style>
    </div>
  )
}
