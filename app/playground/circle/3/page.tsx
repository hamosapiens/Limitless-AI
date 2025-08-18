'use client';

import CircleHoverText from '../3/CircleHoverText';
import NParticles from '../2/NParticles';
import { BlurReveal } from '../2/BlurReveal';
import Logo from '../2/logo';
import MixedBlur from '../../text/MixedBlur';

export default function Circle3Page() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-[#f2f6f9] to-[#e0f2ff] px-4 py-12">
      {/* Large, light faded circle background */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2200px] h-[2200px] md:w-[2600px] md:h-[2600px] rounded-full bg-blue-100/40 blur-[120px] z-0" />
      {/* Top and bottom fade overlays, lighter */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white/80 via-transparent to-transparent blur-2xl z-20" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white/80 via-transparent to-transparent blur-2xl z-20" />
      {/* Animated particles background */}
      <NParticles quantity={100} className="absolute inset-0 z-0" color="#a5b4fc" />
      {/* MixedBlur text effect centered in the middle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full flex justify-center items-center">
        <MixedBlur />
      </div>
      {/* Centered, ultra large orbit with BlurReveal effect */}
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