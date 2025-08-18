"use client";
import { useEffect, useRef, useState } from "react";

const textContent = `I am a Senior Full-Stack Developer and 2D/3D Designer with over ten years of experience, focused on developing cutting-edge strategies that enhance innovation and drive business growth. By the age of 13, I had already developed my first website, a go-to resource for soccer fans. Since then, my career has adapted to the demands of fast-paced, evolving environments, focusing on crafting precise solutions quickly to meet the ever-changing technology landscape. My approach involves integrating profound programming skills, keen aesthetic sensibilities, and strategic marketing to develop solutions that are both innovative and highly effective in engaging audiences.`;

function TextOpacityScroll({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateOpacity = () => {
      if (!containerRef.current) return;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const spans = containerRef.current.querySelectorAll<HTMLSpanElement>(".word");
      spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - windowHeight / 2);
        const opacity = 1 - Math.min(distanceFromCenter / (windowHeight / 2), 1);
        span.style.opacity = opacity.toString();
      });
    };
    window.addEventListener("scroll", updateOpacity, { passive: true });
    updateOpacity();
    return () => window.removeEventListener("scroll", updateOpacity);
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-[2.1rem] max-w-2xl font-normal font-sans leading-snug tracking-tight text-center mx-auto"
      aria-label={text}
    >
      {text.split(/\s+/).map((word, i) => (
        <span key={i} className="word transition-opacity duration-200">
          {word + " "}
        </span>
      ))}
    </div>
  );
}

export default function Page() {
  const [dark, setDark] = useState(false);

  return (
    <main className={dark ? "dark bg-zinc-900 text-white" : "bg-white text-zinc-900"}>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setDark((d) => !d)}
          className="px-4 py-2 rounded shadow bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 transition"
          aria-label="Toggle dark mode"
        >
          {dark ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center transition-colors duration-300">
        <section className="h-screen flex flex-col items-center justify-end"></section>
        <section className="min-h-screen flex flex-col items-center justify-center">
          <TextOpacityScroll text={textContent} />
        </section>
      </div>
    </main>
  );
}