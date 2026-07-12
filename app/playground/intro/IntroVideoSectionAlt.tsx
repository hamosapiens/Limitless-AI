'use client';

import { useEffect, useRef } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useStaggered } from "@/hooks/useStaggered";
import BlurReveal from "@/components/BlurReveal";
import FullWidthDotsBand from "@/components/FullWidthDotsBand";
import { Eye } from "lucide-react";
import FullWidthDotsBandLight from "@/components/FullWidthDotsBandLight";
import IconSection from "@/components/IconSection";

export default function IntroVideoSection() {
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

    if (stageInView) tryPlay(); else v.pause();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [stageInView]);

  return (
    <>
      <style jsx global>{`
        @keyframes rainbow-inner-glow {
          0% { 
            box-shadow: 
              inset 0 0 20px 2px color(display-p3 0.95 0.06 0.02 / 0.3),
              inset 0 0 40px 4px color(display-p3 0.97 0.61 0.07 / 0.2),
              inset 0 0 60px 6px color(display-p3 0.83 0.87 0.04 / 0.1),
              0 6px 12px -6px rgba(0, 0, 0, 0.12),
              0 1px 2px 0px rgba(0, 0, 0, 0.05);
          }
          12.5% { 
            box-shadow: 
              inset 0 0 20px 2px color(display-p3 0.97 0.61 0.07 / 0.3),
              inset 0 0 40px 4px color(display-p3 0.83 0.87 0.04 / 0.2),
              inset 0 0 60px 6px color(display-p3 0.31 0.89 0.05 / 0.1),
              0 6px 12px -6px rgba(0, 0, 0, 0.12),
              0 1px 2px 0px rgba(0, 0, 0, 0.05);
          }
          25% { 
            box-shadow: 
              inset 0 0 20px 2px color(display-p3 0.83 0.87 0.04 / 0.3),
              inset 0 0 40px 4px color(display-p3 0.31 0.89 0.05 / 0.2),
              inset 0 0 60px 6px color(display-p3 0.12 0.88 0.88 / 0.1),
              0 6px 12px -6px rgba(0, 0, 0, 0.12),
              0 1px 2px 0px rgba(0, 0, 0, 0.05);
          }
          37.5% { 
            box-shadow: 
              inset 0 0 20px 2px color(display-p3 0.31 0.89 0.05 / 0.3),
              inset 0 0 40px 4px color(display-p3 0.12 0.88 0.88 / 0.2),
              inset 0 0 60px 6px color(display-p3 0.15 0.8 0.93 / 0.1),
              0 6px 12px -6px rgba(0, 0, 0, 0.12),
              0 1px 2px 0px rgba(0, 0, 0, 0.05);
          }
          50% { 
            box-shadow: 
              inset 0 0 20px 2px color(display-p3 0.12 0.88 0.88 / 0.3),
              inset 0 0 40px 4px color(display-p3 0.15 0.8 0.93 / 0.2),
              inset 0 0 60px 6px color(display-p3 0.14 0.47 0.99 / 0.1),
              0 6px 12px -6px rgba(0, 0, 0, 0.12),
              0 1px 2px 0px rgba(0, 0, 0, 0.05);
          }
          62.5% { 
            box-shadow: 
              inset 0 0 20px 2px color(display-p3 0.15 0.8 0.93 / 0.3),
              inset 0 0 40px 4px color(display-p3 0.14 0.47 0.99 / 0.2),
              inset 0 0 60px 6px color(display-p3 0.38 0.14 0.99 / 0.1),
              0 6px 12px -6px rgba(0, 0, 0, 0.12),
              0 1px 2px 0px rgba(0, 0, 0, 0.05);
          }
          75% { 
            box-shadow: 
              inset 0 0 20px 2px color(display-p3 0.14 0.47 0.99 / 0.3),
              inset 0 0 40px 4px color(display-p3 0.38 0.14 0.99 / 0.2),
              inset 0 0 60px 6px color(display-p3 0.73 0.04 0.94 / 0.1),
              0 6px 12px -6px rgba(0, 0, 0, 0.12),
              0 1px 2px 0px rgba(0, 0, 0, 0.05);
          }
          87.5% { 
            box-shadow: 
              inset 0 0 20px 2px color(display-p3 0.38 0.14 0.99 / 0.3),
              inset 0 0 40px 4px color(display-p3 0.73 0.04 0.94 / 0.2),
              inset 0 0 60px 6px color(display-p3 0.93 0.03 0.85 / 0.1),
              0 6px 12px -6px rgba(0, 0, 0, 0.12),
              0 1px 2px 0px rgba(0, 0, 0, 0.05);
          }
          100% { 
            box-shadow: 
              inset 0 0 20px 2px color(display-p3 0.73 0.04 0.94 / 0.3),
              inset 0 0 40px 4px color(display-p3 0.93 0.03 0.85 / 0.2),
              inset 0 0 60px 6px color(display-p3 0.95 0.06 0.02 / 0.1),
              0 6px 12px -6px rgba(0, 0, 0, 0.12),
              0 1px 2px 0px rgba(0, 0, 0, 0.05);
          }
        }

        .rainbow-inner-glow {
          background: white;
          border-radius: 1.5rem;
          animation: rainbow-inner-glow 8s ease-in-out infinite;
        }

        /* Fallback for browsers without P3 support */
        @supports not (color: color(display-p3 0.93 0.03 0.85)) {
          @keyframes rainbow-inner-glow {
            0% { 
              box-shadow: 
                inset 0 0 20px 2px hsla(3, 93%, 48%, 0.3),
                inset 0 0 40px 4px hsla(26, 91%, 52%, 0.2),
                inset 0 0 60px 6px hsla(65, 89%, 46%, 0.1),
                0 6px 12px -6px rgba(0, 0, 0, 0.12),
                0 1px 2px 0px rgba(0, 0, 0, 0.05);
            }
            12.5% { 
              box-shadow: 
                inset 0 0 20px 2px hsla(26, 91%, 52%, 0.3),
                inset 0 0 40px 4px hsla(65, 89%, 46%, 0.2),
                inset 0 0 60px 6px hsla(122, 86%, 48%, 0.1),
                0 6px 12px -6px rgba(0, 0, 0, 0.12),
                0 1px 2px 0px rgba(0, 0, 0, 0.05);
            }
            25% { 
              box-shadow: 
                inset 0 0 20px 2px hsla(65, 89%, 46%, 0.3),
                inset 0 0 40px 4px hsla(122, 86%, 48%, 0.2),
                inset 0 0 60px 6px hsla(181, 78%, 50%, 0.1),
                0 6px 12px -6px rgba(0, 0, 0, 0.12),
                0 1px 2px 0px rgba(0, 0, 0, 0.05);
            }
            37.5% { 
              box-shadow: 
                inset 0 0 20px 2px hsla(122, 86%, 48%, 0.3),
                inset 0 0 40px 4px hsla(181, 78%, 50%, 0.2),
                inset 0 0 60px 6px hsla(193, 76%, 53%, 0.1),
                0 6px 12px -6px rgba(0, 0, 0, 0.12),
                0 1px 2px 0px rgba(0, 0, 0, 0.05);
            }
            50% { 
              box-shadow: 
                inset 0 0 20px 2px hsla(181, 78%, 50%, 0.3),
                inset 0 0 40px 4px hsla(193, 76%, 53%, 0.2),
                inset 0 0 60px 6px hsla(219, 95%, 56%, 0.1),
                0 6px 12px -6px rgba(0, 0, 0, 0.12),
                0 1px 2px 0px rgba(0, 0, 0, 0.05);
            }
            62.5% { 
              box-shadow: 
                inset 0 0 20px 2px hsla(193, 76%, 53%, 0.3),
                inset 0 0 40px 4px hsla(219, 95%, 56%, 0.2),
                inset 0 0 60px 6px hsla(269, 95%, 56%, 0.1),
                0 6px 12px -6px rgba(0, 0, 0, 0.12),
                0 1px 2px 0px rgba(0, 0, 0, 0.05);
            }
            75% { 
              box-shadow: 
                inset 0 0 20px 2px hsla(219, 95%, 56%, 0.3),
                inset 0 0 40px 4px hsla(269, 95%, 56%, 0.2),
                inset 0 0 60px 6px hsla(292, 93%, 47%, 0.1),
                0 6px 12px -6px rgba(0, 0, 0, 0.12),
                0 1px 2px 0px rgba(0, 0, 0, 0.05);
            }
            87.5% { 
              box-shadow: 
                inset 0 0 20px 2px hsla(269, 95%, 56%, 0.3),
                inset 0 0 40px 4px hsla(292, 93%, 47%, 0.2),
                inset 0 0 60px 6px hsla(327, 96%, 47%, 0.1),
                0 6px 12px -6px rgba(0, 0, 0, 0.12),
                0 1px 2px 0px rgba(0, 0, 0, 0.05);
            }
            100% { 
              box-shadow: 
                inset 0 0 20px 2px hsla(292, 93%, 47%, 0.3),
                inset 0 0 40px 4px hsla(327, 96%, 47%, 0.2),
                inset 0 0 60px 6px hsla(3, 93%, 48%, 0.1),
                0 6px 12px -6px rgba(0, 0, 0, 0.12),
                0 1px 2px 0px rgba(0, 0, 0, 0.05);
            }
          }
        }
      `}</style>

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
        <div className="bg-gradient-to-b from-white to-neutral-100">
          <div
            className="mx-auto px-6 transition-all duration-1000 ease-out"
            style={{
              maxWidth: stageInView ? "80rem" : "60rem",
              width: "100%",
              transform: stageInView ? "translateY(-180px)" : "translateY(0px)",
            }}
          >
            {/* Rainbow border container - choose one of the three options */}
            <div className="rainbow-inner-glow p-8 sm:p-14">
                {/* Title */}
                <div className="text-center mb-12">
                  <BlurReveal as="div" delay={delay(0)} inView={stageInView}>
                    <h2 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight py-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600">
                      Go beyond your
                      <br />
                      mind&apos;s limitations
                    </h2>
                  </BlurReveal>
                </div>

                {/* Video */}
                <div className="mb-14 flex items-center justify-center">
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
                      onLoadedData={() => { try { videoRef.current?.play(); } catch {} }}
                      onCanPlay={() => { try { videoRef.current?.play(); } catch {} }}
                    >
                      <source src="/pendant.mp4" type="video/mp4" />
                      <source src="/pendant.webm" type="video/webm" />
                    </video>
                  </BlurReveal>
                </div>

                {/* Description + CTA (own threshold) */}
                <div className="text-center flex-col items-center" ref={descRef}>
                  <p className="mx-auto max-w-lg sm:text-lg text-balance text-black/60 font-normal tracking-tight leading-relaxed mb-10">
                    {"Pendant is an elegant, lightweight wearable that remembers what you say throughout the day, from in-person meetings, impromptu conversations, and personal insights."
                      .split(" ")
                      .map((word, i) => (
                        <BlurReveal
                          key={i}
                          delay={delay(i)}
                          inView={descInView}
                          as="span"
                          className="inline-block mr-2"
                        >
                          {word}
                        </BlurReveal>
                      ))}
                  </p>

                  <BlurReveal as="div" delay={delay(4)} inView={descInView}>
                    <button className="inline-flex cursor-pointer mb-2 items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out">
                      Get It Now!
                    </button>
                  </BlurReveal>
                </div>
                </div>
          </div>

          <div className="relative">
            <div
              className="absolute left-0 right-0 bottom-0 h-[140px] sm:h-[140px] px-6"
              style={{ zIndex: 1 }}
            >
              <IconSection />
            </div>

            <div
              className="absolute left-0 right-0 -bottom-8 h-[120px] sm:h-[110px] px-6 rotate-180"
              style={{ zIndex: 0 }}
            >
              <FullWidthDotsBandLight 
                active={stageInView}
                speed={400}
                pauseLeadMs={0}
                ellipseXScale={19.5}
                ellipseYScale={12}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-[0px] bg-white"></div>
      </section>
    </>
  );
}