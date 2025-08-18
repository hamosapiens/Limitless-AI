"use client";

import React from "react";

type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number; // seconds
  xOffset?: number;  // px
};

export const SpotlightNewDemo = ({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
}: SpotlightProps = {}) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 h-full w-full opacity-0 animate-[spotlight-fade_1.5s_ease_forwards]"
    >
      {/* LEFT OSCILLATOR */}
      <div
        className="absolute top-0 left-0 z-40 h-screen w-screen pointer-events-none animate-[spotlight-osc_var(--dur)_ease-in-out_infinite_alternate]"
        style={
          {
            // CSS vars drive animation distance & speed
            ["--offset" as any]: `${xOffset}px`,
            ["--dur" as any]: `${duration}s`,
          } as React.CSSProperties
        }
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 left-0"
        />

        <div
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 left-0 origin-top-left"
        />

        <div
          style={{
            transform: "rotate(-45deg) translate(-180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 left-0 origin-top-left"
        />
      </div>

      {/* RIGHT OSCILLATOR */}
      <div
        className="absolute top-0 right-0 z-40 h-screen w-screen pointer-events-none animate-[spotlight-osc-rev_var(--dur)_ease-in-out_infinite_alternate]"
        style={
          {
            ["--offset" as any]: `${xOffset}px`,
            ["--dur" as any]: `${duration}s`,
          } as React.CSSProperties
        }
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 right-0"
        />

        <div
          style={{
            transform: "rotate(45deg) translate(-5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 right-0 origin-top-right"
        />

        <div
          style={{
            transform: "rotate(45deg) translate(180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 right-0 origin-top-right"
        />
      </div>

      {/* local keyframes */}
      <style jsx global>{`
        @keyframes spotlight-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        /* left group oscillates +X then back */
        @keyframes spotlight-osc {
          0%   { transform: translateX(0); }
          50%  { transform: translateX(var(--offset)); }
          100% { transform: translateX(0); }
        }
        /* right group oscillates -X then back */
        @keyframes spotlight-osc-rev {
          0%   { transform: translateX(0); }
          50%  { transform: translateX(calc(var(--offset) * -1)); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default SpotlightNewDemo;