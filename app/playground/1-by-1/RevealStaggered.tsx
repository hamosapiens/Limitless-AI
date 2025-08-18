"use client";

import { useEffect, useState } from "react";

interface RevealStaggeredProps {
  items: React.ReactNode[];
  delayStep?: number;
  className?: string;
}

export default function RevealStaggered({
  items,
  delayStep = 120,
  className = "",
}: RevealStaggeredProps) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= items.length) return;
    const timeout = setTimeout(() => setVisible((v) => v + 1), delayStep);
    return () => clearTimeout(timeout);
  }, [visible, items.length, delayStep]);

  // If items change, reset animation
  useEffect(() => {
    setVisible(0);
  }, [items.length]);

  return (
    <div className={className}>
      {items.map((item, i) => (
        <div
          key={i}
          className={`transition-all duration-700 ease-out`}
          style={{
            opacity: i <= visible ? 1 : 0,
            transform: i <= visible ? "translateY(0)" : "translateY(24px)",
            pointerEvents: i <= visible ? "auto" : "none",
            visibility: i <= visible ? "visible" : "hidden",
            transitionDelay: `${i * delayStep * 0.5}ms`,
            minHeight: "3.25rem", // ensures space is always reserved
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}