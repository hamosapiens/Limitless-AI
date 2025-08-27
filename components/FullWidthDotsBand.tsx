// app/components/FullWidthDotsBand.tsx
'use client';

import { useEffect, useRef } from 'react';

type Props = {
  active?: boolean;      // pass stageInView
  height?: number;       // band height in px
  spacing?: number;      // grid spacing in px
  speed?: number;        // wave speed (px/sec)
  thickness?: number;    // wave thickness in "elliptical" units
  pauseLeadMs?: number;  // delay before first start (ms)
  ellipseXScale?: number; // >1 wider horizontally
  ellipseYScale?: number; // <1 flatter vertically
  centerYOffset?: number; // 0..1, push origin toward bottom
  backgroundColor?: string; // background color for band
  fillColor?: string; // color for dots
};

export default function FullWidthDotsBand({
  active = true,
  height = 270,
  spacing = 22,
  speed = 220,
  thickness = 160,
  pauseLeadMs = 0,
  ellipseXScale = 1.0,
  ellipseYScale = 0.65,
  centerYOffset = 1,
  backgroundColor = "#000",
  fillColor = "#fff",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
  const wrap = wrapRef.current!;
  const canvas = canvasRef.current!;
  const ctx = canvas.getContext('2d')!;

    const getDPR = () => (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);

    let Wcss = 0, Hcss = 0, ratio = 1;

    // ---- Grid state & builder (DECLARED BEFORE resize) ----
    type Cell = { x: number; y: number; ex: number; ey: number };
    const cells: Cell[] = [];

    function buildGrid() {
      cells.length = 0;
      const step = spacing;
      const half = step * 0.5;
      const cx = Wcss * 0.5;
      const cy = Hcss * (0.5 + centerYOffset);
      const exScale = Math.max(ellipseXScale, 1e-6);
      const eyScale = Math.max(ellipseYScale, 1e-6);

      for (let y = half; y <= Hcss; y += step) {
        for (let x = half; x <= Wcss; x += step) {
          const ex = (x - cx) / exScale;
          const ey = (y - cy) / eyScale;
          cells.push({ x, y, ex, ey });
        }
      }
    }

    // ---- Resize uses buildGrid() now that it exists ----
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      ratio = getDPR();
      Wcss = Math.max(1, Math.floor(r.width));
      Hcss = Math.max(1, Math.floor(r.height));
      canvas.width = Math.max(1, Math.floor(Wcss * ratio));
      canvas.height = Math.max(1, Math.floor(Hcss * ratio));
      canvas.style.width = `${Wcss}px`;
      canvas.style.height = `${Hcss}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      buildGrid();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    let startTs = 0;
    let waveOffset = 0;
    let prevTs = 0;

    const animate = (ts: number) => {
      if (!startTs) startTs = ts + pauseLeadMs;
      const dt = Math.max(0, ts - (prevTs || ts));
      prevTs = ts;

  ctx.clearRect(0, 0, Wcss, Hcss);

      const exScale = Math.max(ellipseXScale, 1e-6);
      const eyScale = Math.max(ellipseYScale, 1e-6);
      const maxDist = Math.hypot(Wcss / exScale, Hcss / eyScale);
      const pxPerMs = speed / 1000;

      if (active) {
        waveOffset = (waveOffset + dt * pxPerMs) % Math.max(1, maxDist - thickness * 0.8);
      }

      const halfT = thickness * 0.5;

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        const dist = Math.hypot(c.ex, c.ey);
        const d = Math.abs(dist - waveOffset);

        let pulse = 0;
        if (d < halfT) {
          const n = 1 - d / halfT;
          pulse = Math.sin(n * Math.PI);
        }

        const alpha = 0.10 + pulse * 0.45;
        const size = 2 + pulse * 3;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(c.x, c.y, size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (active) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
      }
    };

    // start/stop with active
    const start = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    const stop = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    if (active) start();
    else {
      requestAnimationFrame((ts) => animate(ts));
      stop();
    }

    return () => {
      ro.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, spacing, speed, thickness, pauseLeadMs, ellipseXScale, ellipseYScale, centerYOffset, fillColor, backgroundColor]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden"
      style={{ height, backgroundColor }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block pointer-events-none" />
      {backgroundColor === "#000" && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[90px] bg-gradient-to-b from-black via-black/70 to-transparent" />
      )}
    </div>
  );
}
