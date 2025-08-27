"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "xl";

export interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  loading?: boolean;
  /** Gradient colors for the outer glow frame */
  frameFrom?: string; // e.g. "#D03C4A"
  frameTo?: string;   // e.g. "#AC4ADA"
  /** Border beam colors */
  beamFrom?: string;  // e.g. "#60A5FA"
  beamTo?: string;    // e.g. "#A78BFA"
  /** Thickness (px) of the frame “gap” around the button */
  framePadding?: number;
}

const sizeClass: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-12 px-7 text-[1rem]",
  xl: "h-14 px-8 text-[1.05rem]",
};

/**
 * BorderBeam (internal)
 * A lightweight beam that orbits around the wrapper’s rounded border.
 * Implemented with an absolutely-positioned <span> using offset-path.
 */
function BorderBeam({
  size = 280,
  duration = 10,
  anchor = 90,
  borderWidth = 2,
  colorFrom = "#60A5FA", // blue-400
  colorTo = "#A78BFA",   // violet-400
  delay = 0,
  className,
}: {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}) {
  const mask =
    // clip to border ring (content-box vs border-box xor)
    "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)";
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}
      style={{
        // create a ring area so the beam shows only on the border
        border: `${borderWidth}px solid transparent`,
        WebkitMaskComposite: "xor" as string,
        mask,
        WebkitMask: mask,
      }}
      aria-hidden
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          width: `${size}px`,
          aspectRatio: "1 / 1",
          // orbit around the rounded rect
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          offsetAnchor: `${anchor}% 50%`,
          // nice beam gradient
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
          filter: "blur(1px)",
          animation: `border-beam ${duration}s linear infinite both`,
          animationDelay: `-${delay}s`,
        }}
      />
    </div>
  );
}

/**
 * GlowButton — simple CTA:
 * - Pulsing gradient frame (blurred) that brightens on hover
 * - Orbiting border beam around the frame
 * - Solid white inner button surface (change to taste)
 */
export function GlowButton({
  className,
  size = "xl",
  loading = false,
  children,
  disabled,
  frameFrom = "#D03C4A", // red-ish
  frameTo = "#AC4ADA",   // violet-ish
  beamFrom = "#60A5FA",  // blue-400
  beamTo = "#A78BFA",    // violet-400
  framePadding = 2,
  ...props
}: GlowButtonProps) {
  return (
    <div
      // wrapper = animated frame
      className={cn(
        "relative inline-block rounded-[12px] p-[1px] transition-transform",
        // mild lift on hover
        "hover:scale-[1.015] active:scale-[0.99]",
        className
      )}
      style={{
        padding: framePadding,
      }}
    >
      {/* gradient frame layer (blurred) */}
      <div
        className="absolute inset-0 rounded-[inherit] opacity-80 will-change-transform"
        style={{
          background: `linear-gradient(92deg, ${frameFrom} 2.26%, ${frameTo} 95.81%)`,
          filter: "blur(1px)",
          animation: "bg-shift 8s ease-in-out infinite",
          transition: "opacity 250ms ease, filter 250ms ease",
        }}
        aria-hidden
      />
      {/* border beam layer */}
      <BorderBeam
        size={300}
        duration={10}
        anchor={90}
        borderWidth={framePadding}
        colorFrom={beamFrom}
        colorTo={beamTo}
        delay={0}
      />

      {/* the actual button surface */}
      <button
        className={cn(
          "relative z-10 rounded-[10px] bg-white text-black",
          "shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
          "transition-[transform,box-shadow] duration-300",
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-500/40",
          // hover feel
          "hover:shadow-[0_16px_50px_rgba(0,0,0,0.10)]",
          sizeClass[size]
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 size-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 0 1 8-8"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        )}
        <span className="relative">{children}</span>
      </button>

      {/* keyframes scoped once (global so they work for all instances) */}
      <style jsx global>{`
        @keyframes bg-shift {
          0% { filter: blur(1px) hue-rotate(0deg); }
          50% { filter: blur(1.5px) hue-rotate(10deg); }
          100% { filter: blur(1px) hue-rotate(0deg); }
        }
        @keyframes border-beam {
          to { offset-distance: 100%; }
        }
      `}</style>
    </div>
  );
}
