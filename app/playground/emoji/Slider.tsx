'use client'
import { useState, useEffect } from 'react'

const sequence = [
  { emoji: '🙈', text: 'See no evil', subtext: 'Your privacy matters' },
  { emoji: '🙉', text: 'Hear no evil', subtext: 'Safe conversations' },
  { emoji: '🙊', text: 'Speak no evil', subtext: 'Thoughtful responses' }
]

type Props = {
  auto?: boolean
  speed?: number
}

export default function MonkeyCycle({ auto = true, speed = 4000 }: Props) {
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const next = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % sequence.length)
      setIsVisible(true)
    }, 250) // slightly longer for blur effect
  }

  useEffect(() => {
    if (!auto) return
    const timer = setInterval(next, speed)
    return () => clearInterval(timer)
  }, [auto, speed])

  const currentItem = sequence[index]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="text-center space-y-6 max-w-md">
        {/* Emoji display */}
        <div 
          className={`text-9xl cursor-pointer select-none transition-all duration-500 transform ${
            isVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-90 blur-md'
          } ${!auto ? 'hover:scale-110' : ''}`}
          onClick={() => !auto && next()}
        >
          <div>
            {currentItem.emoji}
          </div>
        </div>

        {/* Text content */}
        <div className={`transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-md'
        }`}>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            {currentItem.text}
          </h2>
          <p className="text-gray-600 text-lg">
            {currentItem.subtext}
          </p>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {sequence.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === index ? 'bg-gray-600 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Control hint */}
        {!auto && (
          <p className="text-sm text-gray-500 mt-4">
            Click the emoji to continue
          </p>
        )}
      </div>
    </div>
  )
}