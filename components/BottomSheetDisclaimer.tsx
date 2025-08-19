"use client";

import { useEffect, useId, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Info, Globe, Github } from "lucide-react";

type Props = {
  title?: string;
  children?: React.ReactNode;
  side?: "left" | "right"; // easy flip
  zIndexClass?: string;     // override if you have super-high stacks
};

export default function BottomSheetDisclaimer({
  title = "Disclaimer",
  children,
  side = "left",
  zIndexClass = "z-[9999]",
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const labelId = useId();
  const descId = useId();

  useEffect(() => setMounted(true), []);

  const openPanel = () => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  };
  const closePanel = useCallback(() => {
    setOpen(false);
    lastFocusedRef.current?.focus?.();
  }, []);

  // ESC + focus trap
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closePanel();
      }
      if (e.key === "Tab") {
        const f = getFocusable(panelRef.current);
        if (!f.length) {
          e.preventDefault();
          return;
        }
        const first = f[0];
        const last = f[f.length - 1];
        const active = document.activeElement;
        if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, closePanel]);

  // Click outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(t) &&
        !triggerRef.current?.contains(t)
      ) {
        closePanel();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, closePanel]);

  // Focus panel on open
  useEffect(() => {
    if (open) requestAnimationFrame(() => panelRef.current?.focus());
  }, [open]);

  const sideClass =
    side === "right"
      ? "right-4 origin-bottom-right"
      : "left-4 origin-bottom-left";

  return (
    <>
      {/* Trigger */}
      <button
        ref={triggerRef}
        onClick={open ? closePanel : openPanel}
        aria-expanded={open}
        aria-controls={open ? labelId : undefined}
        className={`fixed ${side === "right" ? "right-4" : "left-4"} bottom-[calc(1rem+env(safe-area-inset-bottom))] ${zIndexClass}
                   grid h-12 w-12 place-items-center rounded-full bg-black text-white shadow-lg cursor-pointer
                   hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600`}
      >
        <Info className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Open disclaimer</span>
      </button>

      {/* Panel */}
      {mounted && open &&
        createPortal(
          <div
            className={`fixed ${sideClass} bottom-[calc(5.5rem+env(safe-area-inset-bottom))] ${zIndexClass}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            aria-describedby={descId}
          >
            <div
              ref={panelRef}
              tabIndex={-1}
              className={`
                w-[min(92vw,28rem)] rounded-md bg-white text-black shadow-2xl ring-1 ring-black/10 outline-none
                transform transition duration-200 ease-out
                data-[state=open]:opacity-100 data-[state=open]:scale-100
                data-[state=closed]:opacity-0 data-[state=closed]:scale-95
                opacity-100 scale-100
              `}
              data-state="open"
            >
              {/* Arrow */}
              <div
                className={`pointer-events-none absolute -bottom-2 ${side === "right" ? "right-4" : "left-4"} h-5 w-3 rotate-45  bg-white shadow-[1px_1px_0_0_rgba(0,0,0,0.06)]`}
                aria-hidden="true"
              />

              {/* Header */}
              <div className="flex items-start justify-between gap-3 p-4">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-black text-white">
                    <Info className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h2 id={labelId} className="text-base font-semibold">
                    {title}
                  </h2>
                </div>
                <button
                  onClick={closePanel}
                  aria-label="Close disclaimer"
                  className="rounded-md cursor-pointer p-2 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="px-4 pb-4">
                <div id={descId} className="prose prose-sm max-w-none text-gray-700">
                  {children ?? (
                    <>
   <p className="text-[13px]">
          This is an independent demo project created solely for portfolio and
          job application purposes. It is not affiliated with, endorsed by, or
          representing <strong>Limitless AI</strong>. All trademarks, logos,
          and brand names are the property of their respective owners.
        </p>
                    </>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
  href="https://hamofolio.pages.dev"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
>
  <Globe className="h-4 w-4" aria-hidden="true" />
  Website
</a>
<a
  href="https://github.com/hamosapiens/Limitless-AI"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
>
  <Github className="h-4 w-4" aria-hidden="true" />
  GitHub
</a>
<button
  onClick={closePanel}
  className="ml-auto inline-flex cursor-pointer items-center justify-center rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
>
  Got it
</button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

/** Utils */
function getFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
    "[contenteditable='true']",
  ].join(",");
  return Array.from(root.querySelectorAll<HTMLElement>(selectors)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}
