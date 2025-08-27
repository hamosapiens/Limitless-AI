'use client';

import React, { useState, useEffect } from 'react';

const RainbowCard = ({ children, className = "" }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Mouse tracking functionality
    const getCursorPosition = (element, event) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = event.clientX - centerX;
      const y = centerY - event.clientY;
      return { x, y };
    };

    const cards = document.querySelectorAll('[data-rainbow-card]');
    
    cards.forEach((card) => {
      const handleMouseMove = (event) => {
        const { x, y } = getCursorPosition(card, event);
        card.style.setProperty('--coord-x', `${x}`);
        card.style.setProperty('--coord-y', `${y}`);
      };

      const handleMouseLeave = () => {
        card.style.setProperty('--coord-x', '0');
        card.style.setProperty('--coord-y', '0');
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, [mounted]);

  if (!mounted) return (
    <div className={className}>
      {children}
    </div>
  );

  return (
    <>
      <style jsx global>{`
        @property --rainbow-opacity {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --rainbow-glow-opacity {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --coord-y {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --coord-x {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }

        [data-rainbow-card] {
          --coord-y: 0;
          --coord-x: 0;
          --rainbow-opacity: 0;
          --rainbow-glow-opacity: 0;

          --color-red: color(display-p3 0.95 0.06 0.02 / var(--rainbow-opacity));
          --color-orange: color(display-p3 0.97 0.61 0.07 / var(--rainbow-opacity));
          --color-olive: color(display-p3 0.83 0.87 0.04 / var(--rainbow-opacity));
          --color-lime: color(display-p3 0.31 0.89 0.05 / var(--rainbow-opacity));
          --color-teal: color(display-p3 0.12 0.88 0.88 / var(--rainbow-opacity));
          --color-tealer: color(display-p3 0.15 0.8 0.93 / var(--rainbow-opacity));
          --color-blue: color(display-p3 0.14 0.47 0.99 / var(--rainbow-opacity));
          --color-purple: color(display-p3 0.38 0.14 0.99 / var(--rainbow-opacity));
          --color-purpler: color(display-p3 0.73 0.04 0.94 / var(--rainbow-opacity));
          --color-pink: color(display-p3 0.93 0.03 0.85 / var(--rainbow-opacity));

          position: relative;
          overflow: hidden;
          
          transition: 
            --coord-y .075s linear,
            --coord-x .075s linear, 
            --rainbow-opacity .3s ease,
            --rainbow-glow-opacity .3s ease;
        }

        [data-rainbow-card]:before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          border-radius: 1.5rem;
          background: conic-gradient(from 180deg, 
            var(--color-red) 0%,
            var(--color-orange) 10%,
            var(--color-olive) 20%,
            var(--color-lime) 30%,
            var(--color-teal) 40%,
            var(--color-tealer) 50%,
            var(--color-blue) 60%,
            var(--color-purple) 70%,
            var(--color-purpler) 80%,
            var(--color-pink) 90%,
            var(--color-red) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: var(--rainbow-opacity);
          pointer-events: none;
          z-index: 1;
        }

        [data-rainbow-card]:after {
          content: '';
          position: absolute;
          inset: -20px;
          background: conic-gradient(from 180deg, 
            var(--color-red) 0%,
            var(--color-orange) 10%,
            var(--color-olive) 20%,
            var(--color-lime) 30%,
            var(--color-teal) 40%,
            var(--color-tealer) 50%,
            var(--color-blue) 60%,
            var(--color-purple) 70%,
            var(--color-purpler) 80%,
            var(--color-pink) 90%,
            var(--color-red) 100%
          );
          filter: blur(20px);
          opacity: calc(var(--rainbow-glow-opacity) / 2);
          transform: translate(calc(var(--coord-x) / 3 * 1px), calc(var(--coord-y) / 3 * -1px));
          pointer-events: none;
          z-index: -1;
        }

        [data-rainbow-card]:hover {
          --rainbow-opacity: 0.6;
          --rainbow-glow-opacity: 0.4;
        }

        [data-rainbow-card] > * {
          position: relative;
          z-index: 2;
        }

        /* Fallback for browsers that don't support P3 */
        @supports not (color: color(display-p3 0.93 0.03 0.85)) {
          [data-rainbow-card] {
            --color-red: hsl(3 93% 48% / var(--rainbow-opacity));
            --color-orange: hsl(26 91% 52% / var(--rainbow-opacity));
            --color-olive: hsl(65 89% 46% / var(--rainbow-opacity));
            --color-lime: hsl(122 86% 48% / var(--rainbow-opacity));
            --color-teal: hsl(181 78% 50% / var(--rainbow-opacity));
            --color-tealer: hsl(193 76% 53% / var(--rainbow-opacity));
            --color-blue: hsl(219 95% 56% / var(--rainbow-opacity));
            --color-purple: hsl(269 95% 56% / var(--rainbow-opacity));
            --color-purpler: hsl(292 93% 47% / var(--rainbow-opacity));
            --color-pink: hsl(327 96% 47% / var(--rainbow-opacity));
          }
        }
      `}</style>
      
      <div 
        data-rainbow-card 
        className={className}
      >
        {children}
      </div>
    </>
  );
};

// Demo usage
export default function RainbowCardDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-100 to-white p-8 flex items-center justify-center">
      <RainbowCard className="mx-auto bg-white rounded-3xl shadow-[10_10px_60px_rgba(0,0,0,0.03)] shadow-[rgba(0, 0, 0, 0.05) 0px 1px 2px 0px] p-6 sm:p-10 max-w-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-neutral-900">
            Hover for Rainbow Effect
          </h2>
          <p className="text-lg text-neutral-600 mb-6">
            Move your mouse around this card to see the rainbow border and glow effect.
          </p>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full inline-block">
            Interactive Card Demo
          </div>
        </div>
      </RainbowCard>
    </div>
  );
}