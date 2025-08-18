"use client";
import { useEffect, useRef, useState } from "react";

export default function GlowShowcase() {
  const [animate, setAnimate] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setAnimate(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-950">
        <div className="mb-8 text-center text-gray-300 h-[80vh]">
            <p className="text-lg">Scroll down to see the glowing circle animation</p>
        </div>
      <h1 className="mb-8 text-3xl font-bold text-white">Glowing SVG Demo</h1>
      <svg
        ref={svgRef}
        width={320}
        height={320}
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="glowCircleTitle"
        role="img"
        tabIndex={0}
      >
        <title id="glowCircleTitle">Animated Glowing Circle</title>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <circle
          cx={160}
          cy={160}
          r={animate ? 100 : 60}
          fill="#38bdf8"
          filter="url(#glow)"
          style={{
            opacity: animate ? 1 : 0,
            transition:
              "opacity 0.7s cubic-bezier(.4,0,.2,1), r 1.2s cubic-bezier(.4,0,.2,1)",
            boxShadow: animate
              ? "0 0 80px 30px #38bdf8cc"
              : "none",
          }}
        />
      </svg>
      <p className="mt-8 text-gray-300 text-center max-w-md">
        This SVG circle fades in, grows, and glows when it enters the viewport.
      </p>
    </main>
  );
}