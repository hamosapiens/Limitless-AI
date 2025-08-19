// app/components/HeroSplit.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import { Eye, AudioLines, Ear } from "lucide-react";
import LightOverlay from "./LightOverlay";

type Logo = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

type Props = {
  title: string;
  description?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  imageSrc: string;
  imageAlt?: string;
  logos?: Logo[];
  className?: string;
  showHipaa?: boolean;
};

interface BlurElementProps {
  children: React.ReactNode;
  delay: number;
  inView: boolean;
  className?: string;
}

const BlurElement = ({ children, delay, inView, className = "" }: BlurElementProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (!inView || isRevealed) return;
    
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, delay, isRevealed]);

  return (
    <div
      className={`inline-block transition-all duration-700 ease-out ${className}`}
      style={{
        filter: isRevealed ? "blur(0px)" : "blur(12px)",
        opacity: isRevealed ? 1 : 0.4,
        transform: isRevealed ? "translateY(0px)" : "translateY(3px)",
      }}
    >
      {children}
    </div>
  );
};

export default function HeroSplit({
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  imageSrc,
  imageAlt = "",
  logos = [],
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const ICONS = {
    seen: { Component: Eye, color: "text-blue-500" },
    said: { Component: AudioLines, color: "text-green-500" },
    heard: { Component: Ear, color: "text-purple-500" },
  };

  const words = description ? description.split(/\s+/) : [];
  let delayCounter = 0;

  return (
    <section
      className={`relative isolate overflow-hidden bg-black text-white ${className ?? ""}`}
    >
<div
        className={`absolute inset-0 -z-10 transition-opacity duration-1000 ease-out ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `
            /* vignette fade left→right */
            linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,1) 70%, transparent 100%),
            /* vertical grid lines */
            linear-gradient(to right, rgba(255,255,255,0.08) 2px, transparent 2px),
            /* horizontal grid lines */
            linear-gradient(to bottom, rgba(255,255,255,0.08) 2px, transparent 2px)
          `,
          backgroundSize: `
            auto,       /* vignette spans full */
            50px 50px,/* vertical grid cells */
            50px 50px /* horizontal grid cells */
          `,
          backgroundPosition: 'left top',
          transitionDelay: '800ms', // Delay before grid appears
        }}
      />

      {/* LEFT LIGHT OVERLAY */}
      <LightOverlay
        src="/images/65c46cd7d1f4702114ee364d_Hero_Left.webp"
        alt="Light effect"
      />

      {/* IMAGE
         - Mobile: relative block at top; face centered/bias right
         - Desktop (lg+): absolute, pinned right; crop from RIGHT using lg:object-left
      */}
      
      <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-auto lg:aspect-auto">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-[70%_50%] sm:object-[72%_50%] md:object-[68%_50%] lg:object-center"
          sizes="(min-width:1024px) 50vw, 100vw"
        />

        {/* Desktop fade (left → right), narrow so 1024px isn't over-faded */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute inset-y-0 left-0 hidden lg:block
            lg:w-[34%] xl:w-[28%] 2xl:w-[24%]
            bg-[linear-gradient(to_right,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.48)_38%,rgba(0,0,0,0.12)_70%,transparent_100%)]
          "
        />

        {/* Mobile fade (bottom → up) */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute inset-x-0 bottom-0 lg:hidden
            h-[32%] sm:h-[36%] md:h-[40%]
            bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.5)_55%,transparent_100%)]
          "
        />
      </div>

      {/* MAIN CONTAINER - Now uses flexbox for dynamic spacing */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:min-h-screen lg:py-6 lg:flex lg:flex-col">
        
        {/* MAIN CONTENT - Centers dynamically when featured logos exist */}
        <div className={`text-center lg:text-left ${logos.length > 0 ? 'lg:flex-1 lg:flex lg:flex-col lg:justify-center' : 'lg:flex lg:flex-col lg:justify-end lg:pb-8'}`}>
          <div ref={containerRef} className="max-w-xl mt-0 mx-auto lg:mx-0 lg:mt-20">
            
            {/* Announcement banner above title */}
            <BlurElement delay={delayCounter++ * 80} inView={inView}>
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="relative rounded-full px-4 py-1.5 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:ring-white/20 bg-gradient-to-r from-black/80 via-gray-900/80 to-black/60 backdrop-blur-lg shadow-lg">
                  <span className="mr-2">Announcing our next round of funding.</span>
                </div>
              </div>
            </BlurElement>

            {/* Title */}
            <BlurElement delay={delayCounter++ * 80} inView={inView}>
              <h1 className="text-4xl md:text-6xl font-semibold text-balance tracking-tight leading-[1.2] text-center lg:text-left">
                {title}
              </h1>
            </BlurElement>

            {/* Description with word-by-word reveal and icons */}
            {description && (
              <div className="mt-6 max-w-lg text-base md:text-lg text-white/75 text-balance text-center lg:text-left mx-auto lg:mx-0">
                {words.map((word, index) => {
                  const cleanWord = word.replace(/[.,!?;:]/, '').toLowerCase();
                  const iconConfig = ICONS[cleanWord as keyof typeof ICONS];

                  if (iconConfig) {
                    const IconComponent = iconConfig.Component;
                    return (
                      <span key={index} className="inline-flex items-center align-middle mr-2">
                        <BlurElement
                          delay={delayCounter++ * 80}
                          inView={inView}
                          className={`mr-2 ${iconConfig.color} align-middle`}
                        >
                          <IconComponent size={24} className="align-middle relative top-[1px]" />
                        </BlurElement>
                        <BlurElement delay={delayCounter++ * 80} inView={inView} className="align-middle">
                          {word}
                        </BlurElement>
                      </span>
                    );
                  }

                  return (
                    <BlurElement
                      key={index}
                      delay={delayCounter++ * 80}
                      inView={inView}
                      className="mr-2 align-middle"
                    >
                      {word}
                    </BlurElement>
                  );
                })}
              </div>
            )}

            {/* CTAs */}
            <BlurElement delay={delayCounter++ * 80} inView={inView}>
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
            </BlurElement>
          </div>
        </div>

        {/* FEATURED IN - Separate section that stays at bottom on desktop */}
        {logos.length > 0 && (
          <BlurElement delay={delayCounter * 20 + 400} inView={inView} className="w-full">
            <div className="mt-10 lg:pb-8 flex flex-col items-center lg:items-start">
              <p className="text-xs uppercase tracking-wider text-white/60 text-center lg:text-left">
                Featured in
              </p>
              <div className="mt-4 inline-grid grid-cols-[max-content_max-content] justify-center gap-x-20 gap-y-4 lg:flex lg:flex-wrap lg:items-center lg:gap-x-8 lg:gap-y-4 lg:justify-start">
                {logos.map((logo, i) => {
                  const aspectRatio = (logo.width ?? 96) / (logo.height ?? 32);
                  const reservedWidth = 40 * aspectRatio;
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-center w-full"
                      style={{
                        width: `${reservedWidth}px`,
                        height: '40px',
                        minWidth: '60px',
                      }}
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt ?? "Logo"}
                        width={logo.width ?? 96}
                        height={logo.height ?? 32}
                        className="opacity-70 grayscale contrast-125 transition hover:opacity-100"
                        unoptimized
                        style={{
                          height: '40px',
                          width: 'auto',
                          maxWidth: '100%',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </BlurElement>
        )}
      </div>
    </section>
  );
}