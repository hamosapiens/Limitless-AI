'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type CTA = { label: string; href: string };

type Props = {
  // Content
  title?: React.ReactNode;
  description?: string;
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
  // Visual tuning
  intensity?: number; // 0.0–1.0 veil strength
  radiusPx?: number;  // reveal radius
  centerBias?: [number, number]; // x,y in % of block (e.g., [40,50])
  className?: string;
};

export default function MixedBlur({
  title = "Your AI, Your Experience",
  description = "Personalized AI powered by what you've seen, said, and heard.",
  ctaPrimary,
  ctaSecondary,
  intensity = 0.9,
  radiusPx = 260,
  centerBias = [46, 50],
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25, rootMargin: '80px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative max-w-xl ${className}`}>
      {/* Veil (blur + desaturate) that fades away when inView */}
      <div
        className={`
          pointer-events-none absolute inset-0 transition-[opacity,filter]
          duration-800 ease-out will-change-[opacity,filter]
          ${inView ? 'opacity-0 blur-0' : 'opacity-100'}
        `}
        style={{
          // soft veil that is “cut out” by a radial mask
          filter: inView ? 'none' : `blur(10px) brightness(${1 - intensity}) saturate(0.6)`,
          WebkitMaskImage: `radial-gradient(${radiusPx}px ${radiusPx}px at ${centerBias[0]}% ${centerBias[1]}%, transparent 45%, black 60%)`,
          maskImage: `radial-gradient(${radiusPx}px ${radiusPx}px at ${centerBias[0]}% ${centerBias[1]}%, transparent 45%, black 60%)`,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.35))',
        }}
      />

      {/* Content */}
      <div className="relative">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="mt-5 text-base md:text-lg text-white/75">
            {description}
          </p>
        )}

        {(ctaPrimary || ctaSecondary) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {ctaPrimary && (
              <Link
                href={ctaPrimary.href}
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
              >
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className="inline-flex items-center rounded-full border border-white/25 bg-transparent px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
              >
                {ctaSecondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
