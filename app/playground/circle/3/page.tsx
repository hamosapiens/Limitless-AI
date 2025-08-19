'use client';

import CircleHoverText from '../3/CircleHoverText';
import NParticles from '../2/NParticles';
import { BlurReveal } from '../2/BlurReveal';

export default function Circle3Page() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-[#f2f6f9] to-[#e0f2ff] px-4 py-12 overflow-x-clip">
      {/* DECOR WRAPPER: clips everything */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        {/* Large, light faded circle background (use vmax so it scales & stays centered) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[140vmax] rounded-full bg-blue-100/40 blur-[120px]" />
        {/* Top & bottom fades */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white/80 via-transparent to-transparent blur-2xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white/80 via-transparent to-transparent blur-2xl" />
        {/* Particles */}
        <NParticles quantity={100} className="absolute inset-0" color="#a5b4fc" />
      </div>

      {/* Center content */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 w-full h-full">
        <BlurReveal delay={300}>
          <div className="flex items-center justify-center">
            <CircleHoverText />
          </div>
        </BlurReveal>
      </div>
    </div>
  );
}
