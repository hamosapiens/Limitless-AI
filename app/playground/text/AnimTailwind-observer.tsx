"use client";

import { useEffect, useRef, useState } from "react";

interface AnimTailwindProps {
  text: string;
}

const AnimTailwind = ({ text }: AnimTailwindProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto p-5 overflow-hidden font-sans text-xl text-center"
      aria-label={text}
    >
      {text.split(" ").map((word, index) => (
        <Word key={index} word={word} delay={index * 150} inView={inView} />
      ))}
    </div>
  );
};

const Word = ({
  word,
  delay,
  inView,
}: {
  word: string;
  delay: number;
  inView: boolean;
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView || !spanRef.current) return;
    const element = spanRef.current;
    element.style.opacity = "0";
    element.style.transform = `translate(${Math.random() * 50 - 25}px, ${
      Math.random() * -400
    }px)`;
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translate(0, 0)";
    }, delay);
  }, [inView, delay]);

  return (
    <span
      ref={spanRef}
      className="inline-block opacity-0 relative transform translate-y-[-300px] transition-all duration-1000 ease-out whitespace-nowrap mr-1 last:mr-0"
    >
      {word}
    </span>
  );
};

export default AnimTailwind;
