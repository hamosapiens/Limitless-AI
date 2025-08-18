"use client";

import { useEffect, useRef, useState } from "react";

interface RevealBlurBlockProps {
  title: string;
  description: string;
  imgSrc?: string;
  imgAlt?: string;
}

const RevealBlurBlock = ({
  title,
  description,
  imgSrc,
  imgAlt,
}: RevealBlurBlockProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="max-w-3xl mx-auto py-16 text-center"
      aria-label={title}
    >
      <h1
        className="text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ease-out"
        style={{
          filter: inView ? "blur(0px)" : "blur(18px)",
          opacity: inView ? 1 : 0.4,
        }}
      >
        {title}
      </h1>
      <p
        className="text-lg md:text-2xl text-gray-500 transition-all duration-1000 ease-out"
        style={{
          filter: inView ? "blur(0px)" : "blur(12px)",
          opacity: inView ? 1 : 0.4,
          transitionDelay: inView ? "0.2s" : "0s",
        }}
      >
        {description}
      </p>
      {imgSrc && (
        <img
          src={imgSrc}
          alt={imgAlt ?? ""}
          className="mx-auto mt-10 rounded-lg shadow-lg transition-all duration-1000 ease-out"
          style={{
            filter: inView ? "blur(0px)" : "blur(18px)",
            opacity: inView ? 1 : 0.4,
            transitionDelay: inView ? "0.4s" : "0s",
            maxWidth: "100%",
            height: "auto",
          }}
        />
      )}
    </div>
  );
};

export default RevealBlurBlock;