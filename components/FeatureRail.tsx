// components/FeatureRail.tsx
'use client';

import React, { MouseEvent } from "react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import BlurReveal from "@/components/BlurReveal";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ModalBlurDialogFancy, type FancyModalItem } from "@/components/ModalBlurDialogFancy";

type RailItem = {
  eyebrow?: string;
  title: string;
  imageSrc: string;
  imageAlt?: string;
  href?: string;
  overlay?: React.ReactNode | string;
  textLight?: boolean;
  colorOverlay?: React.ReactNode | string;
  description?: string;
  modalContent?: string; 
};

interface CardShellProps {
  item: RailItem;
  index: number;
  seqActive: boolean;
  onOpenModal: (payload: FancyModalItem) => void;
}

const CardShell = React.memo(function CardShell({ item, index, seqActive, onOpenModal }: CardShellProps) {
  const { ref } = useInViewOnce<HTMLDivElement>({
    rootMargin: "0% 0px -10% 0px",
    threshold: 0.05,
  });

  const delayMs = index * 100;

  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (seqActive && !hasAnimated) setHasAnimated(true);
  }, [seqActive, hasAnimated]);

  const wrapperStyle: CSSProperties = useMemo(
    () =>
      hasAnimated
        ? {
            opacity: 1,
            transform: "translateY(0)",
            transition: "opacity 420ms ease, transform 500ms cubic-bezier(.22,.9,.23,1)",
            transitionDelay: `${delayMs}ms`,
            willChange: "opacity, transform",
          }
        : { opacity: 0, transform: "translateY(12px)" },
    [hasAnimated, delayMs]
  );

  const baseCardClasses = `
    snap-start relative rounded-3xl overflow-hidden shadow-sm hover:shadow-md 
    transition-all duration-300 border border-black/5 h-[64vh] min-h-[420px] 
    max-h-[680px] flex flex-col bg-neutral-900 group
    hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500
  `;

  const handleOpen = () =>
    onOpenModal({
      title: item.title,
      description: item.description,
      imageSrc: item.imageSrc,
      modalContent: item.modalContent,
    });

  const handleCardClick = (e: MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
    // Allow standard link behavior only on modifier or middle click
    const isMeta = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
    const isMiddle = e.button === 1;
    if (item.href && (isMeta || isMiddle)) return;

    e.preventDefault();
    handleOpen();
  };

  const CardContent = (
    <>
      <div className="absolute inset-0">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt ?? item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width:1024px) 24vw, (min-width:768px) 45vw, (min-width:640px) 55vw, 80vw"
          priority={index < 3}
          loading={index < 3 ? "eager" : "lazy"}
          quality={85}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <div
          className={`space-y-4 ${item.textLight ? 'text-white' : 'text-black'} transform transition-all duration-300 ${
            hasAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: `${delayMs + 200}ms` }}
        >
          <h3 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight">
            {item.title}
          </h3>
          {item.eyebrow && (
            <p className="text-sm tracking-tight leading-relaxed text-pretty opacity-70 drop-shadow max-w-full lg:max-w-[80%]">
              {item.eyebrow}
            </p>
          )}
        </div>
      </div>

      {typeof item.overlay === "string" ? (
        <div style={{ background: item.overlay }} className="absolute inset-0 pointer-events-none" />
      ) : (
        item.overlay
      )}

      {typeof item.colorOverlay === "string" ? (
        <div style={{ background: item.colorOverlay }} className="absolute inset-0 pointer-events-none" />
      ) : (
        item.colorOverlay ?? (
          <div
            style={{ background: "linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0.05) 33.54%, rgba(0, 0, 0, 0.03) 68%)" }}
            className="absolute inset-0 pointer-events-none"
          />
        )
      )}
    </>
  );

  return (
    <div ref={ref} className="h-full relative" style={wrapperStyle}>
      {item.href ? (
        <a
          href={item.href}
          rel="noopener noreferrer"
          onClick={handleCardClick}
          onAuxClick={handleCardClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Open details for ${item.title}`}
          className={baseCardClasses + ' cursor-pointer'}
        >
          {CardContent}
        </a>
      ) : (
        <div
          onClick={handleCardClick}
          onAuxClick={handleCardClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Open details for ${item.title}`}
          className={baseCardClasses + ' cursor-pointer'}
        >
          {CardContent}
        </div>
      )}
    </div>
  );
});

interface FeatureRailProps {
  heading?: string;
  items: RailItem[];
  className?: string;
  showNavigation?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function FeatureRail({
  heading = "Featured Content",
  items = [],
  className = "",
  showNavigation = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}: FeatureRailProps) {
  const { ref: headingRef, inView: headingInView } = useInViewOnce<HTMLDivElement>({
  rootMargin: "400px 0px -10px 0px",
    threshold: 0
  });

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

const [open, setOpen] = useState(false);
const [activeItem, setActiveItem] = useState<FancyModalItem | null>(null);

// Close -> clear content after the exit duration (200ms)
useEffect(() => {
  if (open) return;
  const t = window.setTimeout(() => setActiveItem(null), 200);
  return () => window.clearTimeout(t);
}, [open]);

  const onOpenModal = useCallback((payload: FancyModalItem) => {
    setActiveItem(payload);
    setOpen(true);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!api || !autoPlay) return;
    const id = window.setInterval(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, autoPlayInterval);
    return () => window.clearInterval(id);
  }, [api, autoPlay, autoPlayInterval]);

  // Update nav state + clean subscription correctly
  const updateScrollState = useCallback(() => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    // Create a stable handler to subscribe/unsubscribe
    const onSelect = () => updateScrollState();
    updateScrollState();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, updateScrollState]);

  const handlePrev = useCallback(() => {
    if (api && canScrollPrev) api.scrollPrev();
  }, [api, canScrollPrev]);

  const handleNext = useCallback(() => {
    if (api && canScrollNext) api.scrollNext();
  }, [api, canScrollNext]);

  const carouselOpts = useMemo(
    () => ({
      align: "start" as const,
      loop: false,
      skipSnaps: false,
      containScroll: "trimSnaps" as const,
      slidesToScroll: 1,
      dragFree: false,
    }),
    []
  );

  if (items.length === 0) return null;

  return (
    <section className={`relative overflow-hidden w-full py-12 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
        <div ref={headingRef}>
          <BlurReveal as="div" inView={headingInView} delay={0}>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.3rem] font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              {heading}
            </h2>
          </BlurReveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Carousel setApi={setApi} opts={carouselOpts} className="w-full">
          <CarouselContent className="gap-4 sm:gap-5 lg:gap-6 pb-4">
            {items.map((item, index) => (
              <CarouselItem
                key={`${item.title}-${index}`}
                className="basis-[85%] xs:basis-[75%] sm:basis-[60%] md:basis-[45%] lg:basis-[32%] xl:basis-[30%]"
              >
                <CardShell
                  item={item}
                  index={index}
                  seqActive={headingInView}
                  onOpenModal={onOpenModal}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {showNavigation && items.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-4 sm:mt-6 sm:justify-end">
              <button
                onClick={handlePrev}
                disabled={!canScrollPrev}
                className={`
                  flex items-center justify-center w-12 h-12 rounded-full border border-neutral-700 
                  bg-neutral-800/50 backdrop-blur-sm text-white transition-all duration-200
                  ${canScrollPrev ? 'hover:bg-neutral-700 hover:border-neutral-600 hover:shadow-lg cursor-pointer' : 'opacity-40 cursor-not-allowed'}
                `}
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                disabled={!canScrollNext}
                className={`
                  flex items-center justify-center w-12 h-12 rounded-full border border-neutral-700 
                  bg-neutral-800/50 backdrop-blur-sm text-white transition-all duration-200
                  ${canScrollNext ? 'hover:bg-neutral-700 hover:border-neutral-600 hover:shadow-lg cursor-pointer' : 'opacity-40 cursor-not-allowed'}
                `}
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </Carousel>
      </div>

      <ModalBlurDialogFancy open={open} onOpenChange={setOpen} item={activeItem} />
    </section>
  );
}
