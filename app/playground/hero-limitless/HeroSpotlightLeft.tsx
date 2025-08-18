"use client";
import React from "react";

export default function HeroSpotlightLeft() {
  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full z-0">
      {/* LEFT OSCILLATOR ONLY */}
      <div
        className="absolute top-0 left-0 h-screen w-screen pointer-events-none animate-[spotlight-osc_7s_ease-in-out_infinite_alternate]"
        style={{
          ["--offset" as any]: `100px`,
          ["--dur" as any]: `7s`,
        } as React.CSSProperties}
      >
        <div
          style={{
            transform: `translateY(-350px) rotate(-45deg)`,
            background:
              "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)",
            width: `560px`,
            height: `1380px`,
          }}
          className="absolute top-0 left-0"
        />
        <div
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            background:
              "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
            width: `240px`,
            height: `1380px`,
          }}
          className="absolute top-0 left-0 origin-top-left"
        />
        <div
          style={{
            transform: "rotate(-45deg) translate(-180%, -70%)",
            background:
              "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
            width: `240px`,
            height: `1380px`,
          }}
          className="absolute top-0 left-0 origin-top-left"
        />
      </div>
      <style jsx global>{`
        @keyframes spotlight-osc {
          0%   { transform: translateX(0); }
          50%  { transform: translateX(var(--offset)); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
