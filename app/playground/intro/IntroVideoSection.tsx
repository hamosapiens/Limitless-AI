"use client";

import { useEffect, useRef, useState } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useStaggered } from "@/hooks/useStaggered";
import BlurReveal from "@/components/BlurReveal";
import FullWidthDotsBand from "@/components/FullWidthDotsBand";
import IconSection from "@/components/IconSection";

export default function IntroVideoSection() {
  const [loading, setLoading] = useState(false);

  // Section (stage + video): earlier trigger
  const { ref: sectionRef, inView: stageInView } = useInViewOnce({
    rootMargin: "15% 0px -15% 0px",
    threshold: 0.1,
  });

  // Description + CTA: later, stricter trigger
  const { ref: descRef, inView: descInView } = useInViewOnce<HTMLDivElement>({
    rootMargin: "0px 0px 15% 0px",
    threshold: 0.02,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const delay = useStaggered(160);

  // Video autoplay/pause tied to the stage visibility only
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => v.play().catch(() => {});
    const onVisibility = () => {
      if (document.hidden) v.pause();
      else if (stageInView) tryPlay();
    };

    if (stageInView) tryPlay();
    else v.pause();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [stageInView]);

  return (
    <section ref={sectionRef}>
      {/* static black header band */}
      <div className="bg-black h-[220px] sm:h-[250px] flex flex-col justify-end">
        <FullWidthDotsBand
          active={stageInView}
          height={140}
          spacing={10}
          speed={290}
          thickness={80}
        />
      </div>

      {/* white stage */}
<div className="relative h-full w-full bg-gradient-to-b from-neutral-100 to-white">
  
  <div className="absolute h-full w-full bg-[radial-gradient(#e7e7e7_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_55%_50%_at_50%_40%,#000_80%,transparent_100%)]"></div>
        <div
          className="mx-auto px-6 transition-all duration-1000 ease-out"
          style={{
            maxWidth: stageInView ? "80rem" : "60rem",
            width: "100%",
            transform: stageInView ? "translateY(-180px)" : "translateY(0px)",
          }}
        >
          <div className="mx-auto bg-white rounded-3xl shadow-[10_10px_60px_rgba(0,0,0,0.03)] shadow-[rgba(0, 0, 0, 0.05) 0px 1px 2px 0px] p-6 sm:p-10">
            
            {/* Title */}
            <div className="text-center mt-8 mb-18">
              <h2 className="flex flex-col sm:flex-row flex-wrap items-center sm:items-baseline justify-center gap-x-1 gap-y-2 max-w-4xl mx-auto leading-tight">
                {/* Main headline */}
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 text-center sm:text-left">
                  {["Meet", "Pendant."].map((word, i) => (
                    <BlurReveal
                      key={i}
                      delay={delay(i)}
                      inView={stageInView}
                      as="span"
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </BlurReveal>
                  ))}
                </span>

                {/* Tagline */}
                <span className="text-lg sm:text-2xl font-[300] text-neutral-300 tracking-tighter text-center sm:text-left">
                  {"The world's most wearable AI.".split(" ").map((word, i) => (
                    <BlurReveal
                      key={i + 10}
                      delay={delay(i + 2)}
                      inView={stageInView}
                      as="span"
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </BlurReveal>
                  ))}
                </span>
              </h2>
            </div>

            {/* Video */}
            <div className="mb-16 flex items-center justify-center">
              <BlurReveal as="div" delay={delay(2)} inView={stageInView}>
                <video
                  ref={videoRef}
                  className="block w-full max-w-lg h-auto rounded-2xl"
                  preload="auto"
                  autoPlay
                  muted
                  playsInline
                  loop
                  controls={false}
                  poster="/videos/intro-poster.jpg"
                  onLoadedData={() => {
                    try {
                      videoRef.current?.play();
                    } catch {}
                  }}
                  onCanPlay={() => {
                    try {
                      videoRef.current?.play();
                    } catch {}
                  }}
                >
                  <source src="/pendant.mp4" type="video/mp4" />
                  <source src="/pendant.webm" type="video/webm" />
                </video>
              </BlurReveal>
            </div>

            {/* Description + CTA (own threshold) */}
            <div className="text-center flex-col items-center" ref={descRef}>
              <div className="mx-auto max-w-xl sm:text-md text-neutral-500 font-normal tracking-normal leading-normal mb-10 flex flex-wrap gap-x-2 gap-y-2 justify-center">
                {"Pendant is an elegant, lightweight wearable that remembers what you say throughout the day, from in-person meetings, impromptu conversations, and personal insights."
                  .split(" ")
                  .map((word, i) => (
                    <BlurReveal
                      key={i}
                      delay={delay(i)}
                      inView={descInView}
                      as="span"
                      className="inline-block"
                    >
                      {word}
                    </BlurReveal>
                  ))}
              </div>

              <BlurReveal as="div" delay={delay(4)} inView={descInView}>
                <div className="relative inline-block group">
                    <button
                      className={`relative z-10 inline-flex cursor-pointer mb-2 items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out gap-3 backdrop-blur-md ${loading ? "opacity-70 pointer-events-none" : ""}`}
                      onClick={() => {
                        setLoading(true);
                        window.location.href = "https://buy.stripe.com/14k2bs6rF39bcsU9BJ";
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                      ) : null}
                      <span className="line-through text-white/60 mr-1">$787</span>
                      <span className="font-bold text-white">$399</span>
                      <span className="ml-[1.2px]">Get Limitless</span>
                    </button>
                  <p className="mt-1 text-[9px] text-neutral-400">You will be redirected to checkout.</p>
                </div>
              </BlurReveal>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute left-0 right-0 bottom-9 px-6"
            style={{ zIndex: 1 }}
          >
            <IconSection />
          </div>

          <div
            className="absolute left-0 right-0  bottom-0 h-[120px] rotate-180"
            style={{ zIndex: 0 }}
          >
            <div className="mx-auto max-w-7xl w-full px-6 hidden sm:block">
              <FullWidthDotsBand
                active={stageInView}
                speed={100}
                height={230}
                pauseLeadMs={0}
                spacing={12}
                centerYOffset={1}
                backgroundColor="transparent"
                fillColor="#e7e7e7"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full h-[100px] bg-black">
fdf
</div> */}
    </section>
  );
}
