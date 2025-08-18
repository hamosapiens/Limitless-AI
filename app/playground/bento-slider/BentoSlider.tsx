"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

// ========================= Types =========================
export type BentoImage = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

export type BentoSlide = {
  id?: string;
  title: string;
  body?: string;
  images?: BentoImage[];
  /** Tailwind classes to override card background/text (e.g. 'bg-black text-white') */
  toneClass?: string;
  /** Extra classes for the card */
  className?: string;
};

export type BentoSection = {
  id?: string;
  slides: BentoSlide[];
};

export type BentoSliderProps = {
  title?: string;
  titleClassName?: string;
  sections: BentoSection[];
  /** Card width on mobile (percentage string without % sign) */
  mobileCardWidthPct?: 70 | 75 | 80 | 90
  className?: string
}

// ========================= Helpers =========================
const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ')

// ========================= Component =========================
export default function BentoSlider({
  title,
  titleClassName,
  sections,
  mobileCardWidthPct = 80,
  className,
}: BentoSliderProps) {
  return (
    <section
      aria-label={title ?? "Bento slider"}
      className={cx("w-full flex justify-center", className)}
    >
      <div className="w-full max-w-[1440px] flex flex-col gap-9 md:gap-10 px-4 md:px-16 py-12">
        {title ? (
          <h2
            className={cx(
              "text-4xl md:text-6xl leading-none tracking-[0.2em] uppercase font-medium text-center",
              titleClassName
            )}
          >
            {title}
          </h2>
        ) : null}

        {sections.map((section, idx) => (
          <BentoRow
            // eslint-disable-next-line react/no-array-index-key
            key={section.id ?? idx}
            slides={section.slides}
            mobileCardWidthPct={mobileCardWidthPct}
          />
        ))}
      </div>
    </section>
  );
}

// ========================= Row =========================
function BentoRow({
  slides,
  mobileCardWidthPct,
}: {
  slides: BentoSlide[];
  mobileCardWidthPct: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Keyboard accessibility: left/right arrow scroll
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const el = trackRef.current;
    if (!el) return;
    if (e.key === "ArrowRight") {
      el.scrollBy({ left: el.clientWidth * 0.8, behavior: "smooth" });
      e.preventDefault();
    }
    if (e.key === "ArrowLeft") {
      el.scrollBy({ left: -el.clientWidth * 0.8, behavior: "smooth" });
      e.preventDefault();
    }
  };

  // Focus ring for accessibility
  const [showFocus, setShowFocus] = useState(false);

  // Responsive card width
  const basisClass = `basis-[${mobileCardWidthPct}%]`;

  return (
    <div className="relative">
      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
        {slides.map((s, i) => (
          <BentoCard key={s.id ?? i} slide={s} />
        ))}
      </div>

      {/* Mobile horizontal scroll */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          role="listbox"
          aria-label="Bento items"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className={cx(
            "flex gap-4 px-4 -mx-4 overflow-x-auto scroll-smooth select-none",
            "snap-x snap-mandatory",
            "scrollbar-thin scrollbar-transparent",
            showFocus && "outline outline-2 outline-blue-500"
          )}
          onFocus={() => setShowFocus(true)}
          onBlur={() => setShowFocus(false)}
          style={{
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
          }}
        >
          {slides.map((s, i) => (
            <div
              key={s.id ?? i}
              role="option"
              aria-label={s.title}
              aria-selected={false}
              data-bento-card
              data-index={i}
              className={cx(
                "shrink-0",
                basisClass,
                "snap-center",
                "focus:outline-none"
              )}
              tabIndex={-1}
            >
              <BentoCard slide={s} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========================= Card =========================
function BentoCard({ slide }: { slide: BentoSlide }) {
  return (
    <article
      className={cx(
        "h-full flex flex-col justify-between rounded-xl p-6 md:p-8 shadow-[0_6px_24px_rgba(0,0,0,0.05)] ring-1 ring-black/5",
        "bg-slate-50 text-black",
        slide.toneClass,
        slide.className
      )}
      tabIndex={-1}
      aria-label={slide.title}
    >
      <div className="space-y-3">
        <h3 className="text-base font-semibold leading-tight">{slide.title}</h3>
        {slide.body ? (
          <p className="text-sm leading-relaxed tracking-tight text-pretty">{slide.body}</p>
        ) : null}
      </div>

      {slide.images && slide.images.length > 0 ? (
        <div className="mt-6 flex items-end justify-between gap-4">
          {slide.images.map((img, i) => (
            <img
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className={cx("max-w-full h-auto", img.className)}
              style={img.style}
            />
          ))}
        </div>
      ) : null}
    </article>
  );
}

// ========================= Example Usage =========================
// Put this where you render the component. Adjust data to your needs.
//
// <BentoSlider
//   title="Meet Your Match"
//   titleClassName="font-[amsterdam]"
//   sections={[
//     {
//       slides: [
//         {
//           title: 'Breakthrough Technology',
//           body:
//             'The next generation of cannabis consumption with innovative design and cutting-edge technology.',
//           toneClass: 'bg-black text-white',
//           images: [
//             {
//               src: 'https://cdn.shopify.com/s/files/1/0276/3256/6375/files/odin-dev23.webp?v=1738875375',
//               alt: 'Odin',
//               className: 'w-3/4 -mb-7 -mr-6',
//             },
//           ],
//         },
//         {
//           title: 'How It Works',
//           body:
//             'Our devices use vaporization and heat-not-burn technologies to heat cannabis flower or concentrates to a temperature that releases cannabinoids and terpenes as a vapor without burning the material.',
//           images: [
//             {
//               src: 'https://cdn.shopify.com/s/files/1/0276/3256/6375/files/stelo-ww-n_1_-fotor-bg-remover-20240306101451_1.webp?v=1738655214',
//               alt: 'Device',
//               className: 'w-full -mb-6 -mt-8 mix-blend-multiply',
//             },
//           ],
//         },
//         {
//           title: 'A Cleaner, More Efficient Experience',
//           body:
//             'Eliminating combustion reduces harmful toxins, preserves the good stuff, and delivers a cleaner, smoother, and more flavorful cannabis experience.',
//           images: [
//             {
//               src: 'https://cdn.shopify.com/s/files/1/0276/3256/6375/files/nugs.webp?v=1738698130',
//               alt: 'Flower',
//               className: 'w-full -mb-8 -mt-4 mix-blend-multiply',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       slides: [
//         {
//           title: 'Pioneering the Future',
//           body:
//             'Our portable, high-performance devices cater to all cannabis consumers, offering both pre-dosed convenience with our closed system and customizable freedom with our open system—ensuring the perfect experience for every preference.',
//           images: [
//             {
//               src: 'https://cdn.shopify.com/s/files/1/0276/3256/6375/files/20250206-124715.webp?v=1738876894',
//               alt: 'Left device',
//               className: 'w-[245px] -mb-6 object-contain',
//             },
//             {
//               src: 'https://cdn.shopify.com/s/files/1/0276/3256/6375/files/Screen_Shot_2025-02-03_at_3.45.58_PM_1.png?v=1738658555',
//               alt: 'Right UI',
//               className: 'h-[230px] w-auto -mb-6 -mr-6 rounded-lg object-contain',
//             },
//           ],
//         },
//         {
//           title: 'Open VS Closed Systems',
//           body:
//             'Our Odin device is a closed system, designed exclusively for our pre-dosed pairings, ensuring consistency and ease of use, while our Iven device is an open system, allowing users to enjoy their choice of flower or concentrates for a fully customizable experience.',
//           toneClass: 'bg-black text-white',
//           images: [
//             {
//               src: 'https://cdn.shopify.com/s/files/1/0276/3256/6375/files/Group_35647.webp?v=1738696920',
//               alt: 'Comparison',
//               className: 'w-full max-w-[340px] -mb-6 mx-auto',
//             },
//           ],
//         },
//       ],
//     },
//   ]}
// />
