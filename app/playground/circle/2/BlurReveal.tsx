'use client';

import React, { useEffect, useRef, useState } from "react";

export const BlurReveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return (
    <div
      className={` transition-all w-full duration-700 ease-out ${className}`}
      style={{
        filter: isRevealed ? "blur(0px)" : "blur(12px)",
        opacity: isRevealed ? 1 : 0.4,
        transform: isRevealed ? "translateY(0px)" : "translateY(3px)",
      }}
    >
      {children}
    </div>
  );
};