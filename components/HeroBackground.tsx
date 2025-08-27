// HeroBackground.tsx
'use client';

import LightOverlay from './LightOverlay';

export default function HeroBackground({ inView }: { inView: boolean }) {
  return (
    <>
      {/* base black so any transparency reveals black */}
      <div className="absolute inset-0 -z-30 bg-black" />

      {/* grid + left gradient */}
      <div
        className={`absolute inset-0 -z-20 transition-opacity duration-1000 ease-out ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,1) 70%, transparent 100%),
            linear-gradient(to right, rgba(255,255,255,0.08) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 2px, transparent 2px)
          `,
          backgroundSize: 'auto, 50px 50px, 50px 50px',
          backgroundPosition: 'left top',
          transitionDelay: '800ms',
          backgroundColor: '#000',
        }}
      />

      {/* light overlay now BELOW the fade */}
      <LightOverlay src="/images/65c46cd7d1f4702114ee364d_Hero_Left.webp" alt="Light effect" />

      {/* Desktop: bottom fade OVER everything in the background stack */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-x-0 bottom-0 z-10  /* higher than overlay */
          block
          h-[22%] xl:h-[28%]
          bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.5)_45%,transparent_100%)]
        "
      />
      {/* 1–2px floor to kill subpixel seams */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-10 h-[2px] bg-black pointer-events-none" />
    </>
  );
}
