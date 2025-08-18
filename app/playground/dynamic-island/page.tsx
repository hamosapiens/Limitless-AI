"use client";

import { useEffect, useRef } from "react";
import DynamicIsland, { IslandEvent } from "./DynamicIsland";

export default function Page() {
  const islandRef = useRef<HTMLDivElement>(null);

  // Fire a demo event after mount
  useEffect(() => {
    const ev: IslandEvent = {
      kind: "now-playing",
      title: "Ocean View — Mellow Beats",
      subtitle: "LoFi Collective",
      timeoutMs: 2500,
    };
    window.dispatchEvent(new CustomEvent<IslandEvent>("island:show", { detail: ev }));
  }, []);

  return (
    <main className="min-h-[200vh] bg-zinc-50 dark:bg-zinc-950 p-6">
      <h1 className="mb-4 text-2xl font-bold">Dynamic Island demo</h1>
      <p className="mb-6 opacity-70">Scroll around; the island stays docked.</p>

      <DynamicIsland />

      <div className="mt-24 flex gap-3">
        <button
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent<IslandEvent>("island:show", {
                detail: {
                  kind: "timer",
                  title: "Timer running",
                  subtitle: "04:59 remaining",
                  timeoutMs: 5000,
                },
              })
            )
          }
          className="rounded-lg bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
        >
          Show timer
        </button>

        <button
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent<IslandEvent>("island:show", {
                detail: {
                  kind: "generic",
                  title: "AirPods connected",
                  subtitle: "Battery 92%",
                  timeoutMs: 1800,
                },
              })
            )
          }
          className="rounded-lg ring-1 ring-black/10 px-4 py-2 dark:ring-white/10"
        >
          Show generic
        </button>
      </div>
    </main>
  );
}
