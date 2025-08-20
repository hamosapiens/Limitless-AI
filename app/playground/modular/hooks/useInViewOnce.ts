'use client';

import { useEffect, useRef, useState } from 'react';

type Options = IntersectionObserverInit & { once?: boolean };

export function useInViewOnce<T extends HTMLElement>(opts: Options = { threshold: 0.1, once: true }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (opts.once !== false) observer.unobserve(node);
      }
    }, opts);

    observer.observe(node);
    return () => observer.disconnect();
  }, [opts]);

  return { ref, inView };
}
