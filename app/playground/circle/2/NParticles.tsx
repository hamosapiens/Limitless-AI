'use client';

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NParticlesProps {
  quantity?: number;
  className?: string;
  color?: string;
}

const COLORS = [
  "#60a5fa", // blue-400
  "#3b82f6", // blue-500
  "#0ea5e9", // sky-500
  "#38bdf8", // sky-400
  "#a5b4fc", // indigo-300
  "#ccc", // sky-100
];

const NParticles: React.FC<NParticlesProps> = ({
  quantity = 40,
  className = "",
  color = "#60a5fa",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const minRadius = 10;
    const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 30;

    class Particle {
      x: number = centerX + Math.cos(Math.random() * Math.PI * 2) * (minRadius + 160 + Math.random() * (maxRadius - minRadius - 20));
      y: number = centerY + Math.sin(Math.random() * Math.PI * 2) * (minRadius + 160 + Math.random() * (maxRadius - minRadius - 20));
      vx: number = 0.7 + Math.random() * 0.7; // rightward speed
      vy: number = -0.7 - Math.random() * 0.7; // upward speed
      size: number = 0.4 + Math.random() * 1.5;
      color: string = COLORS[Math.floor(Math.random() * COLORS.length)];
      glow: number = 4 + Math.random() * 20;
      update() {
        this.x += this.vx;
        this.y += this.vy;
        // Wrap around edges
        if (canvas && this.x > canvas.width) this.x = 0;
        if (canvas && this.y < 0) this.y = canvas.height;
        // Avoid oval region in center (approx 200px wide)
        const avoidCenterX = centerX;
        const avoidCenterY = centerY;
        const avoidWidth = 200;
        const avoidHeight = 200;
        const dx = this.x - avoidCenterX;
        const dy = this.y - avoidCenterY;
        if ((dx * dx) / (avoidWidth * avoidWidth) + (dy * dy) / (avoidHeight * avoidHeight) < 1) {
          // Push particle to edge of oval
          const angleFromCenter = Math.atan2(dy, dx);
          this.x = avoidCenterX + Math.cos(angleFromCenter) * avoidWidth;
          this.y = avoidCenterY + Math.sin(angleFromCenter) * avoidHeight;
        }
      }
      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.glow;
        ctx.globalAlpha = 0.92;
        ctx.fill();
        ctx.restore();
      }
    }

    particlesRef.current = Array.from({ length: quantity }, () => new Particle());

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((particle: any) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [quantity]);

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      <canvas ref={canvasRef} className="w-full h-full nparticles-glow" />
    </div>
  );
};

export default NParticles;
