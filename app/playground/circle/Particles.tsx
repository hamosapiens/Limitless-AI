"use client";

import { cn } from "../../../lib/utils";
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";

type MouseXY = { x: number; y: number };

function useMousePosition(): MouseXY {
  const [mousePosition, setMousePosition] = useState<MouseXY>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
}

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  const hexInt = parseInt(hex, 16);
  return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255];
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mouseXY = useMousePosition();
  const mouse = useRef<MouseXY>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  const rafID = useRef<number | null>(null);
  const resizeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rgb = hexToRgb(color);

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    start();
    const onResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => initCanvas(), 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      if (rafID.current != null) cancelAnimationFrame(rafID.current);
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  useEffect(() => {
    updateMouseFromClientXY();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseXY.x, mouseXY.y]);

  useEffect(() => {
    initCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, quantity]);

  const initCanvas = () => {
    resizeCanvas();
    buildParticles();
  };

  const updateMouseFromClientXY = () => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const { w, h } = canvasSize.current;
    const x = mouseXY.x - rect.left - w / 2;
    const y = mouseXY.y - rect.top - h / 2;
    const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
    if (inside) {
      mouse.current.x = x;
      mouse.current.y = y;
    }
  };

  const resizeCanvas = () => {
    if (!containerRef.current || !canvasRef.current || !ctx.current) return;
    canvasSize.current.w = containerRef.current.offsetWidth;
    canvasSize.current.h = containerRef.current.offsetHeight;

    canvasRef.current.width = Math.max(1, Math.floor(canvasSize.current.w * dpr));
    canvasRef.current.height = Math.max(1, Math.floor(canvasSize.current.h * dpr));
    canvasRef.current.style.width = `${canvasSize.current.w}px`;
    canvasRef.current.style.height = `${canvasSize.current.h}px`;

    ctx.current.setTransform(1, 0, 0, 1, 0, 0);
    ctx.current.scale(dpr, dpr);
  };

  const circleParams = (): Circle => {
    const x = Math.random() * canvasSize.current.w;
    const y = Math.random() * canvasSize.current.h;
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.random() * 2 + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 4;
    return { x, y, translateX, translateY, size: pSize, alpha, targetAlpha, dx, dy, magnetism };
  };

  const clear = () => {
    if (!ctx.current) return;
    ctx.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
  };

  const drawCircle = (c: Circle, add = false) => {
    if (!ctx.current) return;
    const { x, y, translateX, translateY, size, alpha } = c;
    ctx.current.save();
    ctx.current.translate(translateX, translateY);
    ctx.current.beginPath();
    ctx.current.arc(x, y, size, 0, Math.PI * 2);
    ctx.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
    ctx.current.fill();
    ctx.current.restore();
    if (add) circles.current.push(c);
  };

  const buildParticles = () => {
    clear();
    circles.current = [];
    for (let i = 0; i < quantity; i++) drawCircle(circleParams(), true);
  };

  const remap = (value: number, a1: number, a2: number, b1: number, b2: number) => {
    const v = ((value - a1) * (b2 - b1)) / (a2 - a1) + b1;
    return v > 0 ? v : 0;
  };

  const tick = () => {
    clear();
    const { w, h } = canvasSize.current;
    circles.current.forEach((c, i) => {
      const edge = [
        c.x + c.translateX - c.size,
        w - c.x - c.translateX - c.size,
        c.y + c.translateY - c.size,
        h - c.y - c.translateY - c.size,
      ];
      const closest = edge.reduce((a, b) => Math.min(a, b));
      const edgeAlpha = parseFloat(remap(closest, 0, 20, 0, 1).toFixed(2));
      if (edgeAlpha > 1) {
        c.alpha = Math.min(c.targetAlpha, c.alpha + 0.02);
      } else {
        c.alpha = c.targetAlpha * edgeAlpha;
      }

      c.x += c.dx + vx;
      c.y += c.dy + vy;

      c.translateX += (mouse.current.x / (staticity / c.magnetism) - c.translateX) / ease;
      c.translateY += (mouse.current.y / (staticity / c.magnetism) - c.translateY) / ease;

      drawCircle(c);

      if (
        c.x < -c.size ||
        c.x > w + c.size ||
        c.y < -c.size ||
        c.y > h + c.size
      ) {
        circles.current.splice(i, 1);
        drawCircle(circleParams(), true);
      }
    });
    rafID.current = requestAnimationFrame(tick);
  };

  const start = () => {
    if (rafID.current != null) cancelAnimationFrame(rafID.current);
    rafID.current = requestAnimationFrame(tick);
  };

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={containerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};

export default Particles;
