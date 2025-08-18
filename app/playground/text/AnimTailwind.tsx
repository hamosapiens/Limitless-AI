"use client";

import { useEffect } from "react";

interface AnimTailwindProps {
  text: string;
}

const AnimTailwind = ({ text }: AnimTailwindProps) => {
  return (
    <div
      className="relative w-full max-w-3xl mx-auto p-5 overflow-hidden font-sans text-xl text-center"
      aria-label={text}
    >
      {text.split(" ").map((word, index) => (
        <Word key={index} word={word} delay={index * 150} />
      ))}
    </div>
  );
};

const Word = ({ word, delay }: { word: string; delay: number }) => {
  useEffect(() => {
    const element = document.getElementById(`word-${delay}`);
    if (element) {
      element.style.opacity = "0";
      element.style.transform = `translate(${Math.random() * 50 - 25}px, ${
        Math.random() * -400
      }px)`;
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translate(0, 0)";
      }, delay);
    }
  }, [delay]);

  return (
    <span
      id={`word-${delay}`}
      className="inline-block opacity-0 relative transform translate-y-[-300px] transition-all duration-1000 ease-out whitespace-nowrap mr-1 last:mr-0"
    >
      {word}
    </span>
  );
};

export default AnimTailwind;
