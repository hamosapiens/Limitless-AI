'use client';

import React, { useEffect, useRef, useState } from 'react';

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 * SmoothMarquee - Fixed seamless scrolling in both directions
 */
function SmoothMarquee({
  children,
  className,
  speed = 1,
  direction = 'left',
  pauseOnHover = true,
  gap = '1rem',
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  gap?: string;
}) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const animationSpeed = prefersReducedMotion ? 0 : 20 / speed;

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <div
        ref={marqueeRef}
        className="flex w-max"
        style={{
          gap,
          animation: prefersReducedMotion ? 'none' : `marquee-${direction} ${animationSpeed}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        {/* First copy */}
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        
        {/* Second copy for seamless loop */}
        <div className="flex shrink-0" style={{ gap }} aria-hidden="true">
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}

// Multi-row marquee component
function MultiMarquee({
  items,
  className,
  rows = 2,
  speed = 1,
  pauseOnHover = true,
  gap = '1rem',
}: {
  items: (string | React.ReactNode)[];
  className?: string;
  rows?: number;
  speed?: number;
  pauseOnHover?: boolean;
  gap?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: rows }, (_, i) => (
        <SmoothMarquee
          key={i}
          direction={i % 2 === 0 ? 'left' : 'right'}
          speed={speed + (i * 0.1)}
          pauseOnHover={pauseOnHover}
          gap={gap}
        >
          {items.map((item, index) => (
            <div key={index} className="whitespace-nowrap">
              {typeof item === 'string' ? (
                <span className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
                  {item}
                </span>
              ) : (
                item
              )}
            </div>
          ))}
        </SmoothMarquee>
      ))}
    </div>
  );
}

// Alternative MarqueeRows component with better right-to-left handling
export function MarqueeRows({
  items,
  className,
  gap = 24,
  speed = 1,
  pauseOnHover = true,
  reverseSecond = true,
  rows = 2,
}: {
  items: (string | React.ReactNode)[];
  className?: string;
  gap?: number;
  speed?: number;
  pauseOnHover?: boolean;
  reverseSecond?: boolean;
  rows?: number;
}) {
  return (
    <div className={cn("w-full select-none space-y-4", className)}>
      {Array.from({ length: rows }, (_, i) => {
        const direction = i % 2 === 0 ? 'left' : reverseSecond ? 'right' : 'left';
        return (
          <MarqueeRow
            key={i}
            items={items}
            direction={direction}
            gap={gap}
            speed={speed + (i * 0.2)} // Slight speed variation
            pauseOnHover={pauseOnHover}
          />
        );
      })}
    </div>
  );
}

function MarqueeRow({
  items,
  direction = 'left',
  gap = 24,
  speed = 1,
  pauseOnHover = true,
}: {
  items: (string | React.ReactNode)[];
  direction?: 'left' | 'right';
  gap?: number;
  speed?: number;
  pauseOnHover?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const animationDuration = 30 / speed; // Base duration adjusted by speed

  const content = items.map((item, i) => (
    <div key={i} className="shrink-0" style={{ marginRight: `${gap}px` }}>
      {typeof item === 'string' ? (
        <span className="inline-block rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm">
          {item}
        </span>
      ) : (
        item
      )}
    </div>
  ));

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-3"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {prefersReducedMotion ? (
        // Static layout for reduced motion
        <div className="flex items-center justify-center flex-wrap gap-3 max-w-4xl mx-auto">
          {content}
        </div>
      ) : (
        // Animated marquee
        <div
          className="flex items-center w-max"
          style={{
            animation: `marquee-${direction} ${animationDuration}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {/* First set */}
          <div className="flex items-center">
            {content}
          </div>
          
          {/* Second set for seamless loop */}
          <div className="flex items-center" aria-hidden="true">
            {content}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}

// Demo component
function MarqueeDemo() {
  const techItems = [
    'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 
    'GraphQL', 'Docker', 'AWS', 'Vercel', 'Supabase', 'Prisma'
  ];

  const customComponents = [
    <div key="1" className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-full">
      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
      <span className="text-sm font-medium">Custom Component</span>
    </div>,
    <div key="2" className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-full">
      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
      <span className="text-sm font-medium">Another One</span>
    </div>,
    <div key="3" className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-full">
      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
      <span className="text-sm font-medium">And Another</span>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Fixed Marquee Component
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Now with proper seamless scrolling in both directions - no more disappearing content!
          </p>
        </div>

        {/* Multi Row with MarqueeRows */}
        <section className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">MarqueeRows (Fixed)</h2>
          <MarqueeRows 
            items={techItems} 
            rows={3} 
            speed={1}
          />
        </section>

        {/* Individual direction tests */}
        <section className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Direction Tests</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Left to Right (should be seamless)</h3>
              <SmoothMarquee direction="left" speed={1.2}>
                {techItems.slice(0, 6).map((item, i) => (
                  <span key={i} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium whitespace-nowrap">
                    {item}
                  </span>
                ))}
              </SmoothMarquee>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Right to Left (now fixed!)</h3>
              <SmoothMarquee direction="right" speed={1.2}>
                {techItems.slice(0, 6).map((item, i) => (
                  <span key={i} className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium whitespace-nowrap">
                    {item}
                  </span>
                ))}
              </SmoothMarquee>
            </div>
          </div>
        </section>

        {/* Multi Row with SmoothMarquee */}
        <section className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Multi Row Alternating</h2>
          <MultiMarquee 
            items={techItems} 
            rows={3} 
            speed={0.8}
          />
        </section>

        {/* Custom Components */}
        <section className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Custom Components</h2>
          <SmoothMarquee speed={1.5} direction="right">
            {customComponents}
            {techItems.slice(0, 4).map((item, i) => (
              <span key={i} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium whitespace-nowrap">
                {item}
              </span>
            ))}
          </SmoothMarquee>
        </section>

        {/* Usage Instructions */}
        <div className="text-center text-gray-500 space-y-2">
          <p className="text-sm">✅ Right-to-left scrolling now works seamlessly</p>
          <p className="text-sm">💡 Hover over any marquee to pause it</p>
          <p className="text-sm">♿ Respects reduced motion preferences</p>
        </div>
      </div>
    </div>
  );
}

export default MarqueeDemo;