// components/ScrollSequence.tsx
'use client';

import { useEffect, useLayoutEffect, useRef, useState, CSSProperties } from 'react';

type Props = {
  frameCount: number;
  frames?: string[];
  basePath?: string;
  pad?: number;
  ext?: 'webp' | 'png' | 'jpg';
  heightVh?: number;
  cacheWindow?: number;
  className?: string;
  showFrameCounter?: boolean;
  cardMaxWidthPx?: number;
  cardMinHeightPx?: number;
  cardMaxHeightPx?: number;
  borderColor?: string;
  zoomRange?: number; // 0..0.5 (breath inward), never crops
};

export default function ScrollSequence({
  frameCount,
  frames,
  basePath = '/seq/seq_',
  pad = 4,
  ext = 'webp',
  heightVh = 150,
  cacheWindow = 16,
  className = '',
  showFrameCounter = false,
  cardMaxWidthPx = 800,
  cardMinHeightPx = 480,
  cardMaxHeightPx = 580,
  borderColor = '#eee',
  zoomRange = 0.15,
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasBoxRef = useRef<HTMLDivElement | null>(null);

  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const cacheRef = useRef<Map<number, ImageBitmap | HTMLImageElement>>(new Map());
  const pendingLoads = useRef<Set<number>>(new Set());
  const rafRef = useRef<number | null>(null);
  const dprRef = useRef<number>(1);

  const [inView, setInView] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [hasDrawnOnce, setHasDrawnOnce] = useState(false); // poster until first draw

  const realCount = frames?.length ?? frameCount;
  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
  const urlFor = (i: number) => frames?.[i - 1] ?? `${basePath}${String(i).padStart(pad, '0')}.${ext}`;

  // requestIdle helper
  const idle = (cb: () => void) =>
    'requestIdleCallback' in window
      ? (window as Window & { requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number }).requestIdleCallback(cb, { timeout: 120 })
      : setTimeout(cb, 0);

  async function loadFrame(idx: number) {
    if (cacheRef.current.has(idx) || pendingLoads.current.has(idx)) return;
    pendingLoads.current.add(idx);
    try {
      const url = urlFor(idx);
      let bmp: ImageBitmap | HTMLImageElement;
      if ('createImageBitmap' in window) {
        const res = await fetch(url, { cache: 'force-cache' });
        const blob = await res.blob();
        bmp = await createImageBitmap(blob, { colorSpaceConversion: 'default', premultiplyAlpha: 'premultiply' });
      } else {
        bmp = await new Promise<HTMLImageElement>((resolve, reject) => {
          const im = new Image();
          im.decoding = 'async';
          im.onload = () => resolve(im);
          im.onerror = reject;
          im.src = url;
        });
      }
      cacheRef.current.set(idx, bmp);
    // Add keyframes for glow animation
    const glowStyle = typeof window !== 'undefined' ? document.getElementById('glow-arch-style') : null;
    if (!glowStyle && typeof window !== 'undefined') {
      const style = document.createElement('style');
      style.id = 'glow-arch-style';
      style.innerHTML = `@keyframes glowPulse { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }`;
      document.head.appendChild(style);
    }
    } finally {
      pendingLoads.current.delete(idx);
    }
  }

  function getScrollProgress() {
    const section = sectionRef.current!;
    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const scrolled = clamp(-rect.top, 0, Math.max(total, 1));
    return total <= 0 ? 0 : scrolled / total;
  }

  function indexFromScroll() {
    const section = sectionRef.current!;
    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const scrolled = clamp(-rect.top, 0, Math.max(total, 1));
    const p = total <= 0 ? 0 : scrolled / total;
    return 1 + Math.round(p * (realCount - 1));
  }

  // ---------- DRAW (CSS px coords after setTransform(dpr,...)) ----------
  function draw(idx: number) {
    if (!inView) return;

    const canvas = canvasRef.current, ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const frame = cacheRef.current.get(idx);
    if (!frame) {
      loadFrame(idx);
      for (let i = 1; i <= 4; i++) {
        if (idx + i <= realCount) loadFrame(idx + i);
        if (idx - i >= 1) loadFrame(idx - i);
      }
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const cssW = rect.width;
    const cssH = rect.height;

    if (cssW === 0 || cssH === 0) return; // avoid no-op first paints

    const iw = (frame as ImageBitmap).width || (frame as HTMLImageElement).naturalWidth;
    const ih = (frame as ImageBitmap).height || (frame as HTMLImageElement).naturalHeight;

    // Fit (contain), then breathe inward up to zoomRange — NEVER exceeds fit => no crop
    const fit = Math.min(cssW / iw, cssH / ih) * 0.995;
    const p = getScrollProgress();
    const t = p < 0.4 ? p / 0.4 : p > 0.6 ? 1 - (p - 0.6) / 0.4 : 1;
    const scale = fit * (1 - zoomRange * (1 - t));

    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cssW - dw) / 2;
    const dy = (cssH - dh) / 2;

    ctx.clearRect(0, 0, cssW, cssH);
    ctx.drawImage(frame, dx, dy, dw, dh);

    if (!hasDrawnOnce) setHasDrawnOnce(true); // hide poster
  }

  function onScroll() {
    if (!inView) return;
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const idx = indexFromScroll();
      setCurrentFrame(idx);
      draw(idx);

      const half = Math.floor(cacheWindow / 2);
      const start = clamp(idx - half, 1, realCount);
      const end = clamp(idx + half, 1, realCount);

      idle(() => { for (let i = start; i <= end; i++) loadFrame(i); });

      for (const k of Array.from(cacheRef.current.keys())) {
        if (k < start - 3 || k > end + 3) {
          const img = cacheRef.current.get(k) as ImageBitmap | HTMLImageElement;
          if (img && typeof (img as ImageBitmap).close === 'function') { try { (img as ImageBitmap).close(); } catch {} }
          cacheRef.current.delete(k);
        }
      }
    });
  }

  // ---------- SIZING ----------
  function resizeAll() {
    // Arch radius = half of current card width (fallback is set inline on render)
    if (cardRef.current) {
      const w = cardRef.current.getBoundingClientRect().width;
      const r = Math.max(0, Math.floor(w / 2));
      (cardRef.current.style as CSSStyleDeclaration).setProperty('--arch', `${r}px`);
      (cardRef.current.style as CSSStyleDeclaration).setProperty('--border', borderColor);
    }

    const wrap = canvasBoxRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const rect = wrap.getBoundingClientRect();
    const cssW = Math.max(1, rect.width);
    const cssH = Math.max(1, rect.height);

    const isMobile = window.innerWidth < 768;
    dprRef.current = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);

    canvas.width = Math.floor(cssW * dprRef.current);
    canvas.height = Math.floor(cssH * dprRef.current);

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (ctx) {
      ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0); // coords in CSS px
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctxRef.current = ctx;
    }

    // draw after layout stabilizes
    requestAnimationFrame(() => draw(indexFromScroll()));
  }

  // ---------- EFFECTS ----------
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '200px' });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // Set sizes & default arch BEFORE first paint to avoid jump
  useLayoutEffect(() => {
    resizeAll();
  }, []);

  useEffect(() => {
    // Preload poster (frame 1) ASAP
    loadFrame(1).then(() => {
      // draw after we have size + bitmap
      requestAnimationFrame(() => draw(1));
      // warm neighbors
      for (let i = 2; i <= Math.min(6, realCount); i++) loadFrame(i);
    });

    const ro1 = new ResizeObserver(resizeAll);
    const ro2 = new ResizeObserver(resizeAll);
    if (cardRef.current) ro1.observe(cardRef.current);
    if (canvasBoxRef.current) ro2.observe(canvasBoxRef.current);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resizeAll);

    const cache = cacheRef.current;
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resizeAll);
      ro1.disconnect();
      ro2.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      for (const img of cache.values()) {
        const typedImg = img as ImageBitmap | HTMLImageElement;
        if (typedImg && typeof (typedImg as ImageBitmap).close === 'function') { try { (typedImg as ImageBitmap).close(); } catch {} }
      }
      cache.clear();
    };
  }, [realCount, inView]);

  const cardWidthStyle = `min(${cardMaxWidthPx}px, 95vw)`;

  // Inline CSS vars give us an immediate, non-jumpy arch on first paint
  const cardVars: CSSProperties = {
    // default --arch before JS refines it (prevents the “radius jump”)
    ['--arch' as string]: `${Math.floor(cardMaxWidthPx / 2)}px`,
    ['--border' as string]: borderColor,
  };

  return (
    <div className="min-h-screen">
      <section ref={sectionRef} className={className} style={{ height: `${heightVh}vh` }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ contain: 'paint' }}>
          {/* split bg */}
          <div className="absolute inset-0">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-black" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white" />
          </div>

          {/* Card with responsive dome; continuous border */}
          <div
            ref={cardRef}
            className="relative bg-[white] overflow-hidden shadow-sm"
            style={{
              ...cardVars,
              width: cardWidthStyle,
              height: `clamp(${cardMinHeightPx}px, 70vh, ${cardMaxHeightPx}px)`,
              border: '1px solid var(--border)',
              borderTopLeftRadius: 'var(--arch)',
              borderTopRightRadius: 'var(--arch)',
              // ensure no accidental transitions on radius
              transition: 'border-radius 0s',
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-start pt-24 sm:pt-28">
              {/* Poster shows until first canvas draw */}
              {!hasDrawnOnce && (
                <img
                  src={urlFor(1)}
                  alt=""
                  decoding="async"
                  className="absolute left-1/2 -translate-x-1/2 top-24 sm:top-28"
                  style={{
                    width: 'clamp(260px, 60vw, 380px)',
                    height: 'clamp(260px, 60vw, 380px)',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.25))',
                  }}
                />
              )}

              {/* Square canvas box; bitmap sized to this box */}
              <div
                ref={canvasBoxRef}
                className="aspect-square"
                style={{ width: 'clamp(260px, 60vw, 380px)' }}
              >
                <canvas
                  ref={canvasRef}
                  className="w-full h-full block"
                  style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.25))', willChange: 'transform' }}
                />
              </div>

              {/* <h2 className="mt-6 mb-6 text-center text-xl sm:text-4xl font-semibold text-black">
                Go beyond your mind’s limitations
              </h2>
              <p className="text-center text-gray-600 text-sm sm:text-base px-6 max-w-prose">
                Personalized AI powered by what you’ve seen, said, and heard.
              </p> */}

              {showFrameCounter && (
                <div className="mt-4 text-xs font-mono text-white bg-black/70 px-2 py-1 rounded">
                  Frame {currentFrame} / {realCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
