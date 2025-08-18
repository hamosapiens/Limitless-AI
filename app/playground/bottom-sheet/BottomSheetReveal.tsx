"use client";

import {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useId,
  useCallback,
} from "react";
import { createPortal } from "react-dom";

type Route = "root" | "private-key" | "recovery-phrase" | "remove-wallet";

type BottomSheetRevealProps = {
  open: boolean;
  onClose: () => void;
  initialRoute?: Route;
  title?: string; // accessible dialog title
};

export default function BottomSheetReveal({
  open,
  onClose,
  initialRoute = "root",
  title = "Wallet options",
}: BottomSheetRevealProps) {
  const [route, setRoute] = useState<Route>(initialRoute);

  // Refs
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedEl = useRef<HTMLElement | null>(null);

  // IDs for a11y
  const titleId = useId();
  const descId = useId();

  // Sizing
  const [maxHeight, setMaxHeight] = useState<number>(600);
  const [sheetHeight, setSheetHeight] = useState<number | undefined>(undefined);

  // Reset route when closed
  useEffect(() => {
    if (!open) setRoute(initialRoute);
  }, [open, initialRoute]);

  // Body scroll lock (preserves on SSR too)
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Track viewport height and recompute maxHeight (80vh)
  useEffect(() => {
    if (!open) return;
    const set = () => setMaxHeight(Math.round(window.innerHeight * 0.8));
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, [open]);

  // Measure content and cap to maxHeight (now stable for hooks)
  const measure = useCallback(() => {
    if (!open) return;
    const node = contentRef.current;
    if (!node) return;
    const contentHeight = node.scrollHeight;
    setSheetHeight(Math.min(contentHeight, maxHeight));
  }, [open, maxHeight]);

  // Re-measure on route change & when opened
  useLayoutEffect(() => {
    if (!open) return;
    measure();
  }, [open, route, maxHeight, measure]);

  // Re-measure when content size changes (images, fonts, etc.)
  useEffect(() => {
    if (!open || !contentRef.current) return;
    const ro = new ResizeObserver(measure);
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, [open, measure]);

  // Focus management: trap focus and restore on close
  useEffect(() => {
    if (!open) return;

    previouslyFocusedEl.current = document.activeElement as HTMLElement | null;

    // Focus the dialog container
    sheetRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
      if (e.key === "Tab") {
        // simple focus trap
        const focusable = getFocusable(sheetRef.current);
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
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
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      // Restore focus
      previouslyFocusedEl.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  // Backdrop click guard (ignore clicks that originate inside the sheet)
  const onBackdropMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // If the click started on the backdrop (not an inner child), close
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      aria-labelledby={titleId}
      aria-describedby={descId}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 data-[state=open]:animate-fadeIn motion-reduce:animate-none"
        data-state="open"
        onMouseDown={onBackdropMouseDown}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        tabIndex={-1}
        className={`
  relative w-full md:max-w-md mx-auto mb-8
  min-h-[180px]
  rounded-2xl bg-white shadow-lg outline-none
  data-[state=open]:animate-slideUp motion-reduce:animate-none
  focus-visible:ring-2 focus-visible:ring-blue-600
  flex flex-col max-h-[80vh] pb-[env(safe-area-inset-bottom)]
`}
        data-state="open"
      >
        {/* Close button, always top-right */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 rounded-full p-2 bg-white/80 hover:bg-gray-100 shadow focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        >
          <svg width={20} height={20} viewBox="0 0 20 20" aria-hidden="true" fill="none">
            <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
          </svg>
        </button>

        {/* Content: single scroll area */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-4">
            {/* Accessible header (visually visible) */}
            <h2 id={titleId} className="sr-only">
              {title}
            </h2>

            {route === "root" ? (
              <>
                <h3
                  className="text-lg font-semibold opacity-0 animate-fadein"
                  style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}
                >
                  Options
                </h3>
                <p
                  id={descId}
                  className="mt-1 text-sm text-gray-600 opacity-0 animate-fadein"
                  style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
                >
                  Manage your wallet settings.
                </p>
                <div className="mt-3 grid gap-2">
                  <button
                    onClick={() => setRoute("private-key")}
                    className="w-full rounded-lg border px-4 py-3 text-left hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 opacity-0 animate-fadein"
                    style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
                  >
                    View Private Key
                  </button>
                  <button
                    onClick={() => setRoute("recovery-phrase")}
                    className="w-full rounded-lg border px-4 py-3 text-left hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 opacity-0 animate-fadein"
                    style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
                  >
                    View Recovery Phrase
                  </button>
                  <button
                    onClick={() => setRoute("remove-wallet")}
                    className="w-full rounded-lg border border-red-300 px-4 py-3 text-left text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 opacity-0 animate-fadein"
                    style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
                    aria-describedby={`${descId}-danger`}
                  >
                    Remove Wallet
                  </button>
                  <button
                    onClick={onClose}
                    className="mt-3 w-full rounded-lg border px-4 py-2 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 opacity-0 animate-fadein"
                    style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3 flex items-center gap-2 opacity-0 animate-fadein" style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}>
                  <button
                    onClick={() => setRoute("root")}
                    className="rounded border px-2 py-1 text-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    aria-label="Back to options"
                  >
                    ← Back
                  </button>
                  <h3 className="text-lg font-semibold capitalize">
                    {route.replace("-", " ")}
                  </h3>
                </div>

                {route === "private-key" && (
                  <p
                    id={descId}
                    className="text-sm text-gray-600 opacity-0 animate-fadein"
                    style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
                  >
                    Your Private Key is used to back up your wallet. Keep it secret and secure.
                  </p>
                )}

                {route === "recovery-phrase" && (
                  <p
                    id={descId}
                    className="text-sm text-gray-600 opacity-0 animate-fadein"
                    style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
                  >
                    Your recovery phrase restores access to your wallet. Never share it.
                  </p>
                )}

                {route === "remove-wallet" && (
                  <>
                    <p
                      id={`${descId}-danger`}
                      className="text-sm text-gray-700 opacity-0 animate-fadein"
                      style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
                    >
                      This removes the wallet from this device. Make sure you have your recovery phrase.
                      <br />
                      Are you sure you want to proceed?
                    </p>
                    <div
                      className="py-6 opacity-0 animate-fadein"
                      style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
                    >
                      <button
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                      >
                        Confirm
                      </button>
                    </div>
                    <div
                      className="space-y-3 text-sm text-gray-600 opacity-0 animate-fadein"
                      style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
                    >
                      <p>
                        This removes the wallet from this device. Make sure you have your recovery phrase.
                      </p>
                      <p>Are you sure you want to proceed?</p>
                      <div className="h-[40vh]" />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Animations (with reduced-motion guard via Tailwind classes above) */}
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
      <style jsx global>{`
@layer utilities {
  .animate-fadein {
    animation: fadeInUp 0.5s both;
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px);}
    to   { opacity: 1; transform: translateY(0);}
  }
}
      `}</style>
    </div>,
    document.body
  );
}

/** Utilities */
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
