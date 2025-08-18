'use client'

import Sequence from './Sequence'
import MonkeyCycle from './Slider'

export default function EmojiPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Emoji Playground</h1>
      <div className="space-y-12 w-full">
        <MonkeyCycle auto speed={2000} />
      </div>
      <div className="mt-16  w-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Emoji Sequence</h2>
        <Sequence />
      </div>
    </div>
  )
}