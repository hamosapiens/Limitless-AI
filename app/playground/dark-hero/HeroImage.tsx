"use client";
import React from "react";

export default function HeroImage({
  src = "/images/hmv2.webp",
  alt = "Hero",
  className = "",
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <img
        src={src}
        alt={alt}
        className="object-cover w-full h-full max-h-[40rem] rounded-md"
        style={{ filter: "brightness(0.85)" }}
        loading="eager"
      />
      {/* Fade overlay for desktop */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent" />
      {/* Fade overlay for mobile */}
      <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
    </div>
  );
}
