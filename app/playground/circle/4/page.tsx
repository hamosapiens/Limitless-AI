'use client';

import CircleHoverText from '../3/CircleHoverText';
import { BlurReveal } from '../2/BlurReveal';
import Logo from '../2/logo';
import BreathingGrid from '../../breating-grid/BreathingGrid';

export default function Circle3Page() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-[#f2f6f9] to-[#e0f2ff] px-4 py-12">
      {/* Breathing grid background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BreathingGrid />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 w-full h-full overflow-hidden">
        <BlurReveal delay={300}>
          <div className="flex items-center justify-center">
            <CircleHoverText />
          </div>
        </BlurReveal>
      </div>
    </div>
  );
}