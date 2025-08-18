"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type GlowMovingCardLightProps = {
  radius?: string;
  chip?: string;
  text?: string;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export default function GlowMovingCardLight({
  radius = "0.5rem",
  chip = "Minimalistic Card",
  text = "This is a minimalistic card with an animated gradient border.",
  className,
  ...rest
}: GlowMovingCardLightProps) {
  return (
    <main className={cn("h-screen grid place-items-center p-6 bg-white text-black", className)}>
      <article
        className="relative overflow-hidden rounded-md p-[2px] bg-neutral-300"
        style={
          {
            borderRadius: radius,
            // feed radius into the motion path to match corners
            "--r": radius,
          } as React.CSSProperties
        }
        {...rest}
      >
        <div className="glow pointer-events-none absolute inset-0 w-[100px] h-[100px] rotate-45" />
        <section className="relative z-10 inline-block rounded-md bg-white px-5 py-2 space-y-2">
          <h1 className="uppercase font-semibold text-base">{chip}</h1>
          <p className="text-sm font-thin">{text}</p>
        </section>
      </article>

      <style>{`
        /* move a soft dot around the card edge */
        @supports (offset-path: inset(0)) {
          .glow {
            animation: move 5s linear infinite;
            offset-path: inset(0 round var(--r));
            offset-distance: 0%;
            offset-rotate: 0deg;
            background: radial-gradient(#000, #94a3b8, transparent);
          }
          @keyframes move {
            to { offset-distance: 100%; }
          }
        }
        /* fallback: if motion path isn't supported, just hide the glow */
        @supports not (offset-path: inset(0)) {
          .glow { display: none; }
        }
      `}</style>
    </main>
  );
}

