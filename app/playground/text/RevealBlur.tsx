"use client";

import { useEffect, useRef, useState } from "react";

interface RevealBlurProps {
  text: string;
  imgSrc?: string;
  imgAlt?: string;
}

const RevealBlur = ({ text, imgSrc, imgAlt }: RevealBlurProps) => {
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
      <div>
        {text.split(/(\s+|\n)/).map((part, index) =>
          part === "\n" ? (
            <br key={index} />
          ) : part.trim() === "" ? (
            " "
          ) : (
            <BlurWord key={index} word={part} delay={index * 20} inView={inView} />
          )
        )}
      </div>
      {imgSrc && (
        <BlurImage src={imgSrc} alt={imgAlt ?? ""} inView={inView} />
      )}
    </div>
  );
};

const BlurWord = ({
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
    element.style.filter = "blur(12px)";
    element.style.opacity = "0.5";
    setTimeout(() => {
      element.style.filter = "blur(0px)";
      element.style.opacity = "1";
    }, delay);
  }, [inView, delay]);

  return (
    <span
      ref={spanRef}
      className="inline-block relative transition-all duration-700 ease-out whitespace-nowrap mr-1 last:mr-0"
      style={{ filter: "blur(12px)", opacity: 0.5 }}
    >
      {word}
    </span>
  );
};

const BlurImage = ({
  src,
  alt,
  inView,
}: {
  src: string;
  alt: string;
  inView: boolean;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!inView || !imgRef.current) return;
    const element = imgRef.current;
    element.style.filter = "blur(18px)";
    element.style.opacity = "0.5";
    setTimeout(() => {
      element.style.filter = "blur(0px)";
      element.style.opacity = "1";
    }, 400);
  }, [inView]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className="mx-auto mt-8 rounded-lg shadow-lg transition-all duration-1000 ease-out"
      style={{ filter: "blur(18px)", opacity: 0.5, maxWidth: "100%", height: "auto" }}
    />
  );
};

export default RevealBlur;