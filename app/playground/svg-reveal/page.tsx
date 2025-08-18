"use client";
import { useEffect, useRef, useState } from "react";

const PATHS = [
  {
    id: "path1",
    d: "M987.166 1395.98C1188.05 1395.98 1350.89 1237.44 1350.89 1041.86C1350.89 846.288 1188.05 687.744 987.166 687.744C786.286 687.744 623.439 846.288 623.439 1041.86C623.439 1237.44 786.286 1395.98 987.166 1395.98Z",
    fill: "#FEBE58",
  },
  {
    id: "path2",
    d: "M515.593 1754C700.936 1754 851.187 1607.99 851.187 1427.87C851.187 1247.76 700.936 1101.75 515.593 1101.75C330.25 1101.75 180 1247.76 180 1427.87C180 1607.99 330.25 1754 515.593 1754Z",
    fill: "#24EDFF",
  },
  {
    id: "path3",
    d: "M632.147 884.33C832.287 884.33 994.534 726.66 994.534 532.165C994.534 337.67 832.287 180 632.147 180C432.006 180 269.759 337.67 269.759 532.165C269.759 726.66 432.006 884.33 632.147 884.33Z",
    fill: "#FFFA6B",
  },
];

export default function SVGRevealPage() {
  const [revealed, setRevealed] = useState([false, false, false]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!svgRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setRevealed([true, true, true]);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Stagger reveal
          PATHS.forEach((_, i) => {
            setTimeout(() => {
              setRevealed((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 400); // 400ms stagger
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(svgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* Spacer to force scroll */}
      <div className="h-[100vh] flex items-center justify-center">
        <p className="text-lg text-gray-400">Scroll down to reveal the SVG paths</p>
      </div>
      <h1 className="mb-8 text-3xl font-bold text-white">SVG Path Reveal</h1>
      <svg
        ref={svgRef}
        width="100%"
        height="934"
        viewBox="0 0 1531 1934"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="svgTitle"
        role="img"
        tabIndex={0}
      >
        <title id="svgTitle">Animated SVG Paths</title>
        <g filter="url(#filter0_f_351_32)">
          {PATHS.map((p, i) => (
            <path
              key={p.id}
              d={p.d}
              fill={p.fill}
              style={{
                opacity: revealed[i] ? 1 : 0,
                transition: "opacity 0.8s cubic-bezier(.4,0,.2,1)",
              }}
              aria-hidden={!revealed[i]}
            />
          ))}
        </g>
        <defs>
          <filter id="filter0_f_351_32" x="0" y="0" width="1530.89" height="1934" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="90" result="effect1_foregroundBlur_351_32"/>
          </filter>
        </defs>
      </svg>
    </main>
  );
}