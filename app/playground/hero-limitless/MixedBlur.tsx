'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Logo = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

type CTA = { label: string; href: string };

type Props = {
  // Content
  announcement?: string;
  title?: React.ReactNode;
  description?: string;
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
  // Image
  imageSrc?: string;
  imageAlt?: string;
  logos?: Logo[];
  // Visual tuning
  intensity?: number; // 0.0–1.0 veil strength
  radiusPx?: number;  // reveal radius
  centerBias?: [number, number]; // x,y in % of block (e.g., [40,50])
  className?: string;
};

export default function MixedBlur({
  announcement = "Announcing our next round of funding.",
  title = "Go beyond your mind's limitations",
  description = "Personalized AI powered by what you've seen, said, and heard.",
  ctaPrimary = { label: "Get Started", href: "/signup" },
  ctaSecondary = { label: "Learn More", href: "/product" },
  imageSrc = "/images/trends2020.webp",
  imageAlt = "Hero",
  logos = [],
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
    <div className={`relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] ${className}`}>
      
      {/* Left: Hero text with blur reveal effect */}
      <div className="flex-1 flex items-center justify-center z-10 px-6 py-12 text-white">
        <div ref={ref} className="relative max-w-xl">
          {/* Veil (blur + desaturate) that fades away when inView */}
          <div
            className={`
              pointer-events-none absolute inset-0 transition-[opacity,filter]
              duration-800 ease-out will-change-[opacity,filter]
              ${inView ? 'opacity-0 blur-0' : 'opacity-100'}
            `}
            style={{
              // soft veil that is "cut out" by a radial mask
              filter: inView ? 'none' : `blur(10px) brightness(${1 - intensity}) saturate(0.6)`,
              WebkitMaskImage: `radial-gradient(${radiusPx}px ${radiusPx}px at ${centerBias[0]}% ${centerBias[1]}%, transparent 45%, black 60%)`,
              maskImage: `radial-gradient(${radiusPx}px ${radiusPx}px at ${centerBias[0]}% ${centerBias[1]}%, transparent 45%, black 60%)`,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.35))',
            }}
          />

          {/* Content */}
          <div className="relative">
            {/* Announcement banner */}
            {announcement && (
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="relative rounded-full px-4 py-1.5 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:ring-white/20 bg-gradient-to-r from-black/80 via-gray-900/80 to-black/60 backdrop-blur-lg shadow-lg">
                  <span>{announcement}</span>
                </div>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-semibold text-balance tracking-tight leading-[1.2] text-center lg:text-left">
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="mt-6 max-w-lg text-base md:text-lg text-white/75 text-balance text-center lg:text-left mx-auto lg:mx-0">
                {description}
              </p>
            )}

            {/* CTAs */}
            {(ctaPrimary || ctaSecondary) && (
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                {ctaPrimary && (
                  <Link
                    href={ctaPrimary.href}
                    className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
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

            {/* Featured In Logos */}
            {logos.length > 0 && (
              <div className="mt-10 flex flex-col items-center lg:items-start">
                <p className="text-xs uppercase tracking-wider text-white/60 text-center lg:text-left">
                  Featured in
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-6 justify-center lg:justify-start">
                  {logos.map((logo, i) => (
                    <div key={i} className="flex items-center justify-center h-8">
                      <Image
                        src={logo.src}
                        alt={logo.alt ?? "Logo"}
                        width={logo.width ?? 96}
                        height={logo.height ?? 32}
                        className="opacity-70 grayscale contrast-125 transition hover:opacity-100 h-8 w-auto"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: Hero image */}
      <div className="flex-1 relative w-full h-[28rem] md:h-[40rem]">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt || "Hero"}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        )}
      </div>
    </div>
  );
}