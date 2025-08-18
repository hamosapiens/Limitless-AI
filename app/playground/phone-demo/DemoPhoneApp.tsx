"use client";

import { useState } from "react";

export default function DemoPhoneApp() {
  const [count, setCount] = useState(0);

  return (
    <div className="grid h-full w-full grid-rows-[auto_1fr_auto] bg-gradient-to-b from-[#0e121b] via-[#11182a] to-[#0a0f19]">
      {/* Status bar (respect the notch) */}
      <div
        className="flex items-center justify-between px-4 text-[12px] text-slate-300"
        style={{ padding: "12px 16px calc(12px + env(safe-area-inset-top))" }}
      >
        <span>9:41</span>
        <span>●●●</span>
      </div>

      {/* App header */}
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/0">
        <div className="opacity-70 text-[12px]" aria-label="Back">←</div>
        <div className="text-[14px] font-semibold text-slate-100">Demo App</div>
        <div className="opacity-70 text-[12px]" aria-label="Menu">⋯</div>
      </header>

      {/* Main content (scrolls if tight height) */}
      <main className="overflow-auto p-5 text-center">
        <span className="inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-slate-200">
          Inside the frame
        </span>

        <h1 className="mt-3 text-[20px] font-bold leading-tight text-slate-100">
          Your UI fills the screen and works on short heights.
        </h1>

        <button
          onClick={() => setCount((c) => c + 1)}
          className="mt-4 inline-flex h-10 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-b from-[#6aa1ff] to-[#5a8cf0] px-4 font-semibold text-[#0a0f17] shadow-[0_6px_20px_rgba(90,140,240,0.35)] active:translate-y-px"
        >
          Tap me ({count})
        </button>

        {/* Tall filler to demo scrolling if needed */}
        <div className="pointer-events-none mt-6 select-none space-y-3 opacity-80">
          <p className="text-sm text-slate-300">
            Add lists, forms, maps, whatever — it’ll clip to the bezel.
          </p>
          <div className="h-48 rounded-2xl bg-white/5" />
          <div className="h-48 rounded-2xl bg-white/5" />
        </div>
      </main>

      {/* Footer (hide if you want more space) */}
      <footer
        className="flex items-center justify-center gap-3 border-t border-white/10 bg-gradient-to-b from-transparent to-black/25 px-3 py-2"
        style={{ paddingBottom: "calc(10px + env(safe-area-inset-bottom))" }}
        aria-hidden
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
      </footer>
    </div>
  );
}
