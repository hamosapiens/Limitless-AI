// components/SequenceBlock.tsx
'use client';

import ScrollSequence from './ScrollSequence';
import BlurReveal from '@/components/BlurReveal';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { useStaggered } from '@/hooks/useStaggered';

export default function SequenceBlock({
  frames,
  heightVh = 200,
  cacheWindow = 24,
}: {
  frames: string[];
  heightVh?: number | undefined;
  cacheWindow?: number;
}) {
  const { ref, inView } = useInViewOnce({ rootMargin: '0px 0px -15% 0px', threshold: 0.1 });
  const delay = useStaggered(150); // same pattern you used in HeroText

  return (
    <section ref={ref} className="relative">
      {/* fade the sequence itself in when it enters view */}
      <div
        className={`transition-all duration-700 will-change-transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <ScrollSequence
          frames={frames}
          frameCount={frames.length}
          heightVh={heightVh}   // you can switch this to dvh or the responsive helper we discussed
          cacheWindow={cacheWindow}
          className="my-0"
        />
      </div>

      {/* below-sequence content, revealed using your BlurReveal pattern */}
      <div className="min-h-screen">
        <BlurReveal inView={inView} delay={delay(0)}>
          <h2 className="mt-6 mb-6 text-center text-xl sm:text-4xl font-semibold text-black">
            Explore the Sequence
          </h2>
        </BlurReveal>

        <BlurReveal inView={inView} delay={delay(1)}>
          <p className="mx-auto max-w-prose text-center text-black/70">
            This copy and any CTAs can cascade in with your existing stagger logic.
          </p>
        </BlurReveal>
      </div>
    </section>
  );
}
