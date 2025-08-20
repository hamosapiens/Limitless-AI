'use client';

import { useEffect, useState } from 'react';

import type { ElementType } from 'react';

type Props = {
  children: React.ReactNode;
  delay?: number;
  inView?: boolean;
  className?: string;
  as?: ElementType; // allow override if needed
};

export default function BlurReveal({
  children,
  delay = 0,
  inView = false,
  className = '',
  as: Component = 'span', // 👈 default to span
}: Props) {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (!inView || isRevealed) return;
    const t = setTimeout(() => setIsRevealed(true), delay);
    return () => clearTimeout(t);
  }, [inView, isRevealed, delay]);

  return (
    <Component
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        display: 'inline-block', // 👈 always inline context
        filter: isRevealed ? 'blur(0px)' : 'blur(12px)',
        opacity: isRevealed ? 1 : 0.4,
        transform: isRevealed ? 'translateY(0px)' : 'translateY(3px)',
      }}
    >
      {children}
    </Component>
  );
}
