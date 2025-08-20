'use client';

import LightOverlay from './LightOverlay';

export default function HeroBackground({ inView }: { inView: boolean }) {
  return (
    <>
      <div
        className={`absolute inset-0 -z-10 transition-opacity duration-1000 ease-out ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,1) 70%, transparent 100%),
            linear-gradient(to right, rgba(255,255,255,0.08) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 2px, transparent 2px)
          `,
          backgroundSize: `auto, 50px 50px, 50px 50px`,
          backgroundPosition: 'left top',
          transitionDelay: '800ms',
        }}
      />
      <LightOverlay src="/images/65c46cd7d1f4702114ee364d_Hero_Left.webp" alt="Light effect" />
    </>
  );
}
