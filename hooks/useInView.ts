// hooks/useInView.ts
'use client';

import { useEffect, useRef, useState } from "react";

type Opts = { root?: Element | null; rootMargin?: string; threshold?: number };

export function useInView(opts: Opts = {}) {
  const { root = null, rootMargin = "0px", threshold = 0.15 } = opts;
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { root, rootMargin, threshold }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [root, rootMargin, threshold]);

  return { ref, inView };
}
