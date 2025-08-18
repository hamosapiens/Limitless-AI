'use client'

import CircleHoverText from './CircleHoverText'
import MixedBlur from '../../text/MixedBlur'
import { BlurReveal } from './BlurReveal'

import {
  Factory,
  User,
  Layers3,
  Network,
  Globe,
  Code2,
  Brain,
  ShoppingCart,
  Landmark,
  Cpu,
  ServerCog,
  DatabaseZap,
  Blocks,
  ShieldCheck,
  FileCode2,
  Sparkle,
  Cloud,
} from 'lucide-react'

export default function BuiltForPage() {
  const innerIcons = [
    User,
    Layers3,
    Network,
    Globe,
    Code2,
    Brain,
    ShoppingCart,
    Landmark,
  ]

  const outerIcons = [
    Cpu,
    ServerCog,
    DatabaseZap,
    Blocks,
    ShieldCheck,
    FileCode2,
    Sparkle,
    Cloud,
  ]

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#e0f2ff] via-[#f2f6f9] to-[#c7d2fe] px-4 py-12">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-0 md:gap-0">
        <div className="flex-1 flex flex-col items-center justify-center text-center md:text-left px-6 py-12">
          <MixedBlur />
        </div>
        <div className="flex-1 flex items-center justify-center w-full relative">
          {/* Centered, large orbit with BlurReveal effect, no text */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full h-full">
            <BlurReveal>
              <div className="flex items-center justify-center w-[480px] h-[480px] md:w-[700px] md:h-[700px]">
                <CircleHoverText />
              </div>
            </BlurReveal>
          </div>
        </div>
      </div>
    <div className="fixed bottom-4 right-4">
      <a
        href="/playground/circle"
        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
      >
        Go back to Circle 1
      </a>
      <a
        href="/playground/circle/3"
        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
      >
        Go to Circle 3
      </a>
    </div>
      </div>
  )
}


