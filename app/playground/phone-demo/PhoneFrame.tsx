// components/PhoneFrame.tsx
import * as React from "react";

type PhoneFrameProps = {
  /** Your app UI that should appear inside the phone screen */
  children: React.ReactNode;

  /** Optional: override the frame SVG */
  frameSrc?: string;
  frameAlt?: string;

  /** Tuning knobs (sane defaults for the linked iPhone X SVG) */
  maxWidthPx?: number;        // overall max width of the phone
  outerAspect?: number;       // frame aspect (height/width)
  insetXPercent?: number;     // screen inset from left/right (percent)
  insetYPercent?: number;     // screen inset from top/bottom (percent)
  screenRadiusPx?: number;    // screen corner radius (px)
  verticalPadPx?: number;     // breathing room used for height calc (px)

  /** Add extra classes to the wrapper if you want */
  className?: string;
};

export default function PhoneFrame({
  children,
  frameSrc = "https://assets.website-files.com/5cbf695823d78e7178b85765/5cbf695823d78e2d06b85774_iphonex.svg",
  frameAlt = "iPhone frame",
  maxWidthPx = 420,
  outerAspect = 447 / 216,   // ≈ 2.069 for the given SVG
  insetXPercent = 7.6,
  insetYPercent = 5.3,
  screenRadiusPx = 28,
  verticalPadPx = 72,
  className = "",
}: PhoneFrameProps) {
  const vars: React.CSSProperties = {
    // CSS custom properties for the calc()s below
    ["--phone-max-width" as any]: `${maxWidthPx}px`,
    ["--phone-outer-aspect" as any]: String(outerAspect),
    ["--screen-inset-x" as any]: `${insetXPercent}%`,
    ["--screen-inset-y" as any]: `${insetYPercent}%`,
    ["--screen-radius" as any]: `${screenRadiusPx}px`,
    ["--vpad" as any]: `${verticalPadPx}px`,
  };

  return (
    <div
      className={[
        // subtle drop shadow & transition; width is handled inline to honor calc()
        "relative transition-[transform,filter] duration-300 ease-out",
        "drop-shadow-[0_18px_35px_rgba(0,0,0,0.45)]",
        "shadow-[0_4px_12px_rgba(0,0,0,0.35)]",
        className,
      ].join(" ")}
      style={{
        ...vars,
        // Width respects both viewport width and AVAILABLE height (svh) using the frame aspect
        width:
          "min(92vw, var(--phone-max-width), calc((100svh - var(--vpad)) / var(--phone-outer-aspect)))",
      }}
    >
      {/* Screen area (your interactive UI goes here). Absolutely fills the frame hole. */}
      <div
        className="absolute z-[1] overflow-hidden rounded-[var(--screen-radius)]"
        style={{
          left: "var(--screen-inset-x)",
          right: "var(--screen-inset-x)",
          top: "var(--screen-inset-y)",
          bottom: "var(--screen-inset-y)",
          // nice subtle bezel edge
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,.05), inset 0 0 0 2px rgba(0,0,0,.35)",
          background:
            "linear-gradient(180deg, #0e121b, #0b1019)",
        }}
      >
        {/* Glare overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{
            background:
              "linear-gradient(200deg, rgba(255,255,255,.16), transparent 45%), linear-gradient(180deg, rgba(255,255,255,.05), transparent 35%)",
          }}
        />
        {/* Your app content fills the screen; scrolls when short */}
        <div className="h-full w-full">{children}</div>
      </div>

      {/* Frame image sits on top so the bezel hides the screen edges */}
      <img
        src={frameSrc}
        alt={frameAlt}
        className="relative z-[2] block h-auto w-full select-none"
        draggable={false}
      />
    </div>
  );
}
