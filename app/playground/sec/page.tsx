'use client';

import React, { useState, useEffect } from 'react';

const RainbowButtons = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Mouse tracking functionality
    const getCursorPosition = (element: HTMLElement, event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = event.clientX - centerX;
      const y = centerY - event.clientY;
      return { x, y };
    };

    const buttons = document.querySelectorAll('button[data-rainbow]');
    
    buttons.forEach((button) => {
      const handleMouseMove = (event: Event) => {
        const mouseEvent = event as MouseEvent;
        const { x, y } = getCursorPosition(button as HTMLElement, mouseEvent);
        (button as HTMLElement).style.setProperty('--coord-x', `${x}`);
        (button as HTMLElement).style.setProperty('--coord-y', `${y}`);
      };

      const handleMouseLeave = () => {
        (button as HTMLElement).style.setProperty('--coord-x', '0');
        (button as HTMLElement).style.setProperty('--coord-y', '0');
      };

      button.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        button.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        @property --button-shadow-opacity {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --button-shadow-spread {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --button-bg-opacity {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        } 
        @property --button-after-opacity {
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

        :root {
          --context-bg: hsl(0deg 0% 99%);
          --bg-container: hsl(0deg 0% 96%);
          --bg-button: hsl(179deg 7% 97%);
          --color-button: hsl(359deg 1% 35%);
          
          --button-shadow-opacity: 0;
          --button-shadow-spread: 0;
          --button-bg-opacity: 0;
          --button-after-opacity: 0;
          --btn-border-color: transparent;
          --btn-inner-shadow: 1;
          
          --container-border-color: rgb(0 0 0 / 8%);
          --container-box-shadow-color: rgb(0 0 0 / 12%);
          
          --timing: .3s;
        }

        * {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .rainbow-main {
          width: 100%;
          height: 100vh;
          margin: 0;
          padding: 0;
          background: var(--context-bg);
          font-family: "Inter", sans-serif;
          display: grid;
          place-items: center;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: 1fr;
        }

        @media (max-width: 720px) {
          .rainbow-main {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(2, 1fr);
          }
        }

        .container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--context-bg);
          transform: scale(1);
        }

        .container > div {
          background: var(--bg-container);
          padding: 2em;
          border: 1px solid var(--container-border-color);
          border-radius: 0.9em;
          box-shadow: 0 6px 12px -6px var(--container-box-shadow-color);
          display: flex;
          gap: 16px;
        }

        button[data-rainbow] {
          all: unset;
          --coord-y: 0;
          --coord-x: 0;

          --color-red: color(display-p3 0.95 0.06 0.02 / var(--button-bg-opacity));
          --color-orange: color(display-p3 0.97 0.61 0.07 / var(--button-bg-opacity));
          --color-olive: color(display-p3 0.83 0.87 0.04 / var(--button-bg-opacity));
          --color-lime: color(display-p3 0.31 0.89 0.05 / var(--button-bg-opacity));
          --color-teal: color(display-p3 0.12 0.88 0.88 / var(--button-bg-opacity));
          --color-tealer: color(display-p3 0.15 0.8 0.93 / var(--button-bg-opacity));
          --color-blue: color(display-p3 0.14 0.47 0.99 / var(--button-bg-opacity));
          --color-purple: color(display-p3 0.38 0.14 0.99 / var(--button-bg-opacity));
          --color-purpler: color(display-p3 0.73 0.04 0.94 / var(--button-bg-opacity));
          --color-pink: color(display-p3 0.93 0.03 0.85 / var(--button-bg-opacity));

          cursor: pointer;
          color: var(--color-button);
          border-radius: .80em;
          font-weight: 600;
          box-shadow: 0 8px calc(var(--button-shadow-spread) * 1px) -8px rgb(0 0 0 / calc(var(--button-shadow-opacity) * 1%));

          border: 1px solid var(--btn-border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background-color: rgb(0 0 0 / 6%);
          background-image: conic-gradient(from 180deg, 
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
                var(--color-red)  100%
              );
          background-size: calc(100% + 2px);
          background-position: -1px -1px;
          
          transition: 
            --coord-y .075s linear,
            --coord-x .075s linear, 
            --button-shadow-opacity var(--timing) ease,
            --button-shadow-spread var(--timing) ease,
            --button-bg-opacity var(--timing) ease,
            --button-after-opacity var(--timing) ease,
            opacity var(--timing) ease, 
            box-shadow var(--timing) ease, 
            background-image var(--timing) ease;
        }

        .button-inner {
          padding: 0.55em .85em;
          background: var(--bg-button);
          border-radius: .70em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 
            inset 0 calc(var(--btn-inner-shadow)*2px) calc(var(--btn-inner-shadow)*1px) rgb(255 255 255 / 90%),
            inset 0 calc(var(--btn-inner-shadow)*-2px) calc(var(--btn-inner-shadow)*3px) rgb(0 0 0 / 3%);
        }

        button[data-rainbow]:before, 
        button[data-rainbow]:after {
          pointer-events: none;
          border-radius: .80em;
          content: '';
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          transition: 
            --coord-y .075s linear,
            --coord-x .075s linear, 
            --button-shadow-opacity var(--timing) ease,
            --button-shadow-spread var(--timing) ease,
            --button-bg-opacity var(--timing) ease,
            --button-after-opacity var(--timing) ease,
            opacity var(--timing) ease, 
            box-shadow var(--timing) ease, 
            background-image var(--timing) ease;
          
          background-image: conic-gradient(from 180deg, 
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
              var(--color-red)  100%
            );
        }
        
        button[data-rainbow]:before {
          z-index: -1;
          filter: saturate(1.2);
          display: none;
        }
        
        button[data-rainbow]:after {
          filter: saturate(2) blur(5px);
          transform: translate(calc(calc(var(--coord-x)/1.5) * 1px), calc(calc(var(--coord-y)/1.5) * -1px));
          width: 180%;
          height: 180%;
          opacity: calc(var(--button-after-opacity)/3);
        }

        .button-shortcut {
          pointer-events: none;
          font-size: 0.85em;
          padding: 4px;
          border: 1px solid rgb(0 0 0 / 10%);
          border-radius: 6px;
          font-weight: 400;
        }

        button[data-rainbow]:hover {      
          --button-shadow-opacity: 16;
          --button-shadow-spread: 16;
          --button-after-opacity: 0.7;
          --button-bg-opacity: 0.15;
        }

        button[data-rainbow]:hover:active { 
          --button-shadow-opacity: 26;
          --button-shadow-spread: 26;
          --button-after-opacity: 0.9;
          --button-bg-opacity: 0.25;
        }

        button[data-rainbow]:not(:hover) {
          --button-shadow-opacity: 0;
          --button-shadow-spread: 0;
          --coord-y: 0;
          --coord-x: 0;
          --button-bg-opacity: 0;  
        }

        /* Dark theme styles */
        .dark-theme {
          --context-bg: hsl(0deg 0% 8%);
          --bg-container: hsl(0deg 0% 10%);
          --bg-button: hsl(0deg 0% 10%);
          --color-button: hsl(0deg 0% 66%);
          --btn-border-color: rgb(255 255 255 / 5%);
          --btn-inner-shadow: 1;
          --container-border-color: rgb(255 255 255 / 8%);
          --container-box-shadow-color: rgb(0 0 0 / 80%);
        }

        .dark-theme button[data-rainbow]:hover {
          --button-after-opacity: 0.5;
          --button-bg-opacity: 0.10;
        }

        .dark-theme button[data-rainbow]:hover:active { 
          --button-after-opacity: 0.75;
          --button-bg-opacity: 0.19;
        }

        .dark-theme .button-inner {
          box-shadow: 
            inset 0 calc(var(--btn-inner-shadow)*2px) calc(var(--btn-inner-shadow)*3px) rgb(255 255 255 / 1%),
            inset 0 calc(var(--btn-inner-shadow)*-2px) calc(var(--btn-inner-shadow)*3px) rgb(0 0 0 / 25%);
        }

        .dark-theme .button-shortcut {
          border: 1px solid rgb(255 255 255 / 10%);
        }

        /* Fallback for browsers that don't support P3 */
        @supports not (color: color(display-p3 0.93 0.03 0.85)) {
          button[data-rainbow] {
            --color-red: hsl(3 93% 48% / var(--button-bg-opacity));
            --color-orange: hsl(26 91% 52% / var(--button-bg-opacity));
            --color-olive: hsl(65 89% 46% / var(--button-bg-opacity));
            --color-lime: hsl(122 86% 48% / var(--button-bg-opacity));
            --color-teal: hsl(181 78% 50% / var(--button-bg-opacity));
            --color-tealer: hsl(193 76% 53% / var(--button-bg-opacity));
            --color-blue: hsl(219 95% 56% / var(--button-bg-opacity));
            --color-purple: hsl(269 95% 56% / var(--button-bg-opacity));
            --color-purpler: hsl(292 93% 47% / var(--button-bg-opacity));
            --color-pink: hsl(327 96% 47% / var(--button-bg-opacity));
          }
        }
      `}</style>

      <main className="rainbow-main">
        <div className="container">
          <div>
            <button data-rainbow onClick={() => console.log('Cancel clicked')}>
              <div className="button-inner">
                Cancel <span className="button-shortcut">Esc</span>
              </div>
            </button>
            <button data-rainbow onClick={() => console.log('Enjoy clicked')}>
              <div className="button-inner">
                Enjoy <span className="button-shortcut">Shift</span>
              </div>
            </button>
          </div>
        </div>
        
        <div className="container dark-theme">
          <div>
            <button data-rainbow onClick={() => console.log('Cancel clicked (dark)')}>
              <div className="button-inner">
                Cancel <span className="button-shortcut">Esc</span>
              </div>
            </button>
            <button data-rainbow onClick={() => console.log('Enjoy clicked (dark)')}>
              <div className="button-inner">
                Enjoy <span className="button-shortcut">Shift</span>
              </div>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default RainbowButtons;