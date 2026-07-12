'use client';

import { useEffect, useRef, useState } from 'react';

type Options = IntersectionObserverInit & { once?: boolean };

export function useInViewOnce<T extends HTMLElement>(opts: Options = { threshold: 0.1, once: true }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const { root = null, rootMargin = '0px', threshold = 0, once = true } = opts;
  // Threshold may be a number or number[]; stringify so array literals passed
  // inline by callers don't defeat the primitive dependency comparison below.
  const thresholdKey = JSON.stringify(threshold);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once !== false) observer.unobserve(node);
      }
    }, { root, rootMargin, threshold });

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root, rootMargin, thresholdKey, once]);

  return { ref, inView };
}
