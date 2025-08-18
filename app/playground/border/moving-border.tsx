"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * GlowMovingCard — Minimalistic card with moving glow border (Dark Only)
 * - Uses offset-path animation for glow element
 */

export type GlowMovingCardProps = {
  radius?: string;
  chip?: string;
  text?: string;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export default function GlowMovingCard({
  radius = "0.5rem",
  chip = "Minimalistic Card",
  text = "This is a minimalistic card with an animated gradient border.",
  className,
  ...rest
}: GlowMovingCardProps) {
  return (
    <main
      className={cn("h-screen grid place-items-center bg-black text-white p-6", className)}
    >
      <article
        className={cn("overflow-hidden p-px relative bg-neutral-600 rounded-md")}
        style={{ borderRadius: radius }}
        {...rest}
      >
        <div className="glow inset-0 w-[100px] h-[100px] absolute rotate-45" />
        <section
          className={cn("inline-block space-y-2 z-10 relative px-5 py-2 bg-black rounded-md")}
        >
          <h1 className="uppercase font-semibold text-base">{chip}</h1>
          <p className="text-sm font-thin">{text}</p>
        </section>
      </article>

      <style>{`
        .glow {
          animation: move 5s linear infinite;
          offset-path: rect(0% auto 100% auto);
          background: radial-gradient(#fff, #f1f5f9, transparent);
        }
        @keyframes move {
          0% {
            offset-distance: 0%;
          }
          100% {
            offset-distance: 100%;
          }
        }
      `}</style>
    </main>
  );
}