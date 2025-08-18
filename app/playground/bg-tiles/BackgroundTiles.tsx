"use client";

import React, { useMemo, useRef } from "react";

const ROWS = 22;
const COLS = 22;
const LINE_COLOR = "#e5e7eb";
const HOVER_COLORS = [
  "#f9fafb",
  "#f3f4f6",
  "#f1f5f9",
  "#e5e7eb",
  "#e2e8f0",
  "#f8fafc",
  "#f4f4f5",
  "#e4e4e7",
];

function getRandomColor() {
  return HOVER_COLORS[Math.floor(Math.random() * HOVER_COLORS.length)];
}

export default function BackgroundTiles() {
  const tileColors = useMemo(
    () => Array.from({ length: ROWS * COLS }, getRandomColor),
    []
  );

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full z-0"
      style={{
        WebkitMaskImage:
          "radial-gradient(circle at 50% 60%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0) 100%)",
        maskImage:
          "radial-gradient(circle at 50% 60%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0) 100%)",
      }}
    >
      {/* Horizontal lines */}
      {Array.from({ length: ROWS - 1 }).map((_, i) => (
        <div
          key={`h-${i}`}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${((i + 1) * 100) / ROWS}%`,
            height: 1,
            background: LINE_COLOR,
            opacity: 0.7,
            pointerEvents: "none",
          }}
        />
      ))}
      {/* Vertical lines */}
      {Array.from({ length: COLS - 1 }).map((_, i) => (
        <div
          key={`v-${i}`}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${((i + 1) * 100) / COLS}%`,
            width: 1,
            background: LINE_COLOR,
            opacity: 0.7,
            pointerEvents: "none",
          }}
        />
      ))}
      {/* Overlay grid for hover */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {tileColors.map((color, i) => (
          <HoverTrailTile key={i} color={color} />
        ))}
      </div>
      <style jsx>{`
        .tile-hover {
          transition: background 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: background;
        }
      `}</style>
    </div>
  );
}

function HoverTrailTile({ color }: { color: string }) {
  const [hover, setHover] = React.useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // On hover, set color and clear any pending fade
  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHover(true);
  };

  // On leave, fade out after a short delay for trail effect
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setHover(false), 350);
  };

  return (
    <div
      className="tile-hover"
      style={{
        background: hover ? color : "transparent",
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}
