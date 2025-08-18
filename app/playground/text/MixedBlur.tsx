"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, AudioLines, Ear } from "lucide-react";

interface MixedBlurProps {
  text?: string;
  title?: string;
  showHipaa?: boolean;
}

export default function MixedBlur({
  text = "Personalized AI powered by what you've seen, said, and heard.",
  title = "Go beyond your mind’s limitations",
  showHipaa = true,
}: MixedBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const ICONS = {
    seen: { Component: Eye, color: "text-blue-500" },
    said: { Component: AudioLines, color: "text-green-500" },
    heard: { Component: Ear, color: "text-purple-500" },
  };

  const words = text.split(/\s+/);
  let delayCounter = 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto p-6 overflow-hidden font-sans text-center"
      aria-label={text}
    >
      {/* Title - first in sequence */}
      <BlurElement delay={delayCounter++ * 80} inView={inView}>
        <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-balance">
          {title}
        </h1>
      </BlurElement>

      {/* Text with icons - inline flow */}
      <div className="text-xl md:text-2xl leading-relaxed mb-8 text-balance text-center">
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

          // Fix for "and" alignment
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

      

      {/* HIPAA badge - last in sequence */}
      {showHipaa && (
        <BlurElement delay={delayCounter * 20 + 200} inView={inView}>
                  {/* CTA Button - best spot: after HIPAA badge, before end of container */}
      {/* <div className="flex justify-center mb-8">
        <button
          type="button"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors duration-200"
        >
          Get Started
        </button>
      </div> */}
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm border border-white/30 max-w-xs mb-6">
            <img
              alt="HIPAA Shield"
              width={28}
              height={28}
              src="https://www.limitless.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhipaa-shield.e8409aab.png&w=64&q=75"
              className="flex-shrink-0 mt-0.5"
              loading="lazy"
            />
            <span className="h-6 w-px bg-slate-300 mx-1 rounded" aria-hidden="true" />
            <span className="text-[11px] text-slate-500 leading-relaxed text-left">
              Your data is secured with HIPAA-compliant medical grade privacy protection.
            </span>
          </div>
        </BlurElement>
      )}
    </div>
  );
}

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
    <span
      className={`inline-block transition-all duration-700 ease-out ${className}`}
      style={{
        filter: isRevealed ? "blur(0px)" : "blur(12px)",
        opacity: isRevealed ? 1 : 0.4,
        transform: isRevealed ? "translateY(0px)" : "translateY(3px)",
      }}
    >
      {children}
    </span>
  );
};