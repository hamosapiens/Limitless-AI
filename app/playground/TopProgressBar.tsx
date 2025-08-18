"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Easing function for smooth progress (easeOutCubic)
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function TopProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const animationRef = useRef<number | null>(null);
  const finishTimer = useRef<NodeJS.Timeout | null>(null);
  const fadeTimer = useRef<NodeJS.Timeout | null>(null);

  // Animate progress smoothly up to 92%
  function animateToNinetyTwo() {
    let start: number | null = null;
    const duration = 700; // faster ramp-up
    const from = 0;
    const to = 92;

    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = from + (to - from) * easeOutCubic(t);
      setProgress(eased);

      if (t < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }
    animationRef.current = requestAnimationFrame(animate);
  }

  // Instantly finish and fade out
  function finishProgress() {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setProgress(100);
    fadeTimer.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 320); // slightly faster fade
  }

  // Clean up timers/animations
  function clearAll() {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (finishTimer.current) clearTimeout(finishTimer.current);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
  }

  useEffect(() => {
    clearAll();
    setVisible(true);
    setProgress(0);

    // Animate to 92% smoothly and quickly
    animateToNinetyTwo();

    // If navigation takes too long, keep bar at 92% until next route
    finishTimer.current = setTimeout(() => {
      finishProgress();
    }, 1600); // fallback for very slow navigation

    return () => {
      clearAll();
      setProgress(100);
      setVisible(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // When progress hits 100, fade out (for instant navigations)
  useEffect(() => {
    if (progress === 100) {
      fadeTimer.current = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 320);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 w-full z-[9999] pointer-events-none"
      style={{ height: 3 }}
    >
      <div
        className="bg-blue-600"
        style={{
          width: `${progress}%`,
          height: "100%",
          opacity: visible ? 1 : 0,
          transition:
            "width 0.28s cubic-bezier(.4,0,.2,1),opacity 0.32s cubic-bezier(.4,0,.2,1)",
          boxShadow: visible
            ? "0 0 8px 0 #2563eb88"
            : "0 0 0 0 transparent",
        }}
      />
    </div>
  );
}