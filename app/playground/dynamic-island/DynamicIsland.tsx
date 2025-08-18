"use client";

import { useEffect, useId, useRef, useState } from "react";

type IslandKind = "now-playing" | "timer" | "generic";

export type IslandEvent = {
  id?: string;
  kind: IslandKind;
  title: string;
  subtitle?: string;
  // auto collapse after ms (0 = never)
  timeoutMs?: number;
  // render custom inner content when expanded
  renderExpanded?: () => JSX.Element;
};

type Props = {
  initial?: IslandEvent | null;
  // how tall the collapsed pill is
  pillHeight?: number; // px
  // max width of expanded panel
  maxWidth?: number; // px
};

export default function DynamicIsland({
  initial = null,
  pillHeight = 40,
  maxWidth = 380,
}: Props) {
  const [event, setEvent] = useState<IslandEvent | null>(initial);
  const [expanded, setExpanded] = useState(false);
  const announceRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Auto-collapse on timeout
  useEffect(() => {
    if (!event || !event.timeoutMs) return;
    if (expanded) return; // don’t auto-close while expanded
    const t = setTimeout(() => setEvent(null), event.timeoutMs);
    return () => clearTimeout(t);
  }, [event, expanded]);

  // Announce new events to screen readers
  useEffect(() => {
    if (!event || !announceRef.current) return;
    announceRef.current.textContent = `${event.title}${
      event.subtitle ? `, ${event.subtitle}` : ""
    }`;
  }, [event]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && expanded) {
        e.preventDefault();
        setExpanded(false);
        triggerRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  // Click outside to collapse when expanded
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!expanded) return;
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !triggerRef.current?.contains(t)) {
        setExpanded(false);
      }
    }
    document.addEventListener("pointerdown", onDocClick);
    return () => document.removeEventListener("pointerdown", onDocClick);
  }, [expanded]);

  // Public API: expose a global function to fire an event (optional)
  // window.dispatchEvent(new CustomEvent('island:show', { detail: IslandEvent }))
  useEffect(() => {
    function onShow(e: Event) {
      const detail = (e as CustomEvent<IslandEvent>).detail;
      setEvent({ timeoutMs: 2500, ...detail });
      setExpanded(false);
    }
    window.addEventListener("island:show", onShow as EventListener);
    return () =>
      window.removeEventListener("island:show", onShow as EventListener);
  }, []);

  const pillId = `${id}-pill`;
  const panelId = `${id}-panel`;

  // Styles derived from props
  const pillH = `${pillHeight}px`;
  const expandMaxW = `${maxWidth}px`;

  return (
    <>
      {/* Live region for announcements (offscreen) */}
      <div
        ref={announceRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Container sits at the top center; respects safe area on iOS */}
      <div
        className="fixed left-1/2 z-50 -translate-x-1/2"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 8px)" }}
      >
        {/* Trigger pill (visible in collapsed or expanded) */}
        <button
          ref={triggerRef}
          id={pillId}
          aria-controls={panelId}
          aria-expanded={expanded}
          onClick={() => {
            if (!event) return;
            setExpanded((v) => !v);
          }}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && event) {
              e.preventDefault();
              setExpanded((v) => !v);
            }
          }}
          className={[
            "group mx-auto flex items-center gap-2 rounded-full px-3",
            "shadow/50 shadow-black/10 ring-1 ring-black/10",
            "bg-black text-white dark:bg-white dark:text-black",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            "transition-[width,height,opacity,transform] duration-300 ease-out",
            "motion-reduce:transition-none",
          ].join(" ")}
          style={{
            height: pillH,
            minWidth: 120,
            width: expanded ? Math.min(maxWidth, 340) : 160,
            opacity: event ? 1 : 0,
            pointerEvents: event ? "auto" : "none",
          }}
        >
          {/* Leading status dot */}
          <span
            className="inline-block h-2 w-2 rounded-full bg-emerald-400"
            aria-hidden="true"
          />
          <span className="truncate text-sm font-medium">
            {event ? event.title : ""}
          </span>
          {event?.subtitle && (
            <span className="truncate text-xs/4 opacity-80">{event.subtitle}</span>
          )}
          {/* affordance */}
          <span
            className="ml-auto text-xs opacity-80 group-hover:opacity-100"
            aria-hidden="true"
          >
            {expanded ? "▾" : "▴"}
          </span>
        </button>

        {/* Expanded panel */}
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-labelledby={pillId}
          aria-modal="false"
          // We don’t trap focus (non-blocking UI), but we keep it reachable.
          className={[
            "mx-auto mt-2 w-[92vw] max-w-full",
            "transition-[max-height,opacity,transform] duration-300 ease-out",
            "motion-reduce:transition-none",
          ].join(" ")}
          style={{
            maxWidth: expandMaxW,
            maxHeight: expanded ? 420 : 0,
            opacity: expanded ? 1 : 0,
            transform: expanded ? "scale(1)" : "scale(.98)",
            overflow: "hidden",
          }}
        >
          <div
            className={[
              "rounded-2xl p-3",
              "bg-white text-black shadow-xl ring-1 ring-black/10",
              "dark:bg-zinc-900 dark:text-zinc-100 dark:ring-white/10",
            ].join(" ")}
          >
            {event ? (
              <ExpandedContent event={event} collapse={() => setExpanded(false)} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Expanded content renderer ---------- */

function ExpandedContent({
  event,
  collapse,
}: {
  event: IslandEvent;
  collapse: () => void;
}) {
  if (event.renderExpanded) return event.renderExpanded();

  // Basic presets for common types; replace with your own UI.
  if (event.kind === "now-playing") {
    return (
      <section className="grid grid-cols-[56px_1fr_auto] items-center gap-3">
        <div className="h-14 w-14 rounded-xl bg-zinc-200 dark:bg-zinc-800" aria-hidden />
        <div className="min-w-0">
          <h3 className="truncate font-medium">{event.title}</h3>
          <p className="truncate text-sm opacity-70">{event.subtitle}</p>
          <div className="mt-2 h-1 w-full overflow-hidden rounded bg-zinc-200 dark:bg-zinc-800">
            <div className="h-full w-1/2 animate-[progress_3s_linear_infinite] bg-emerald-500" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IslandIconBtn label="Prev" onClick={() => {}}>⏮</IslandIconBtn>
          <IslandIconBtn label="Play/Pause" onClick={() => {}}>⏯</IslandIconBtn>
          <IslandIconBtn label="Next" onClick={() => {}}>⏭</IslandIconBtn>
        </div>
      </section>
    );
  }

  if (event.kind === "timer") {
    return (
      <section className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-medium">{event.title}</h3>
          <p className="text-sm opacity-70">{event.subtitle}</p>
        </div>
        <IslandIconBtn label="Stop timer" onClick={collapse}>⏹</IslandIconBtn>
      </section>
    );
  }

  return (
    <section>
      <h3 className="font-medium">{event.title}</h3>
      {event.subtitle && <p className="text-sm opacity-70">{event.subtitle}</p>}
      <div className="mt-3 text-sm opacity-80">
        Add your custom expanded content via <code>renderExpanded</code>.
      </div>
    </section>
  );
}

function IslandIconBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-inset ring-black/10 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:ring-white/10 dark:hover:bg-white/10"
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
