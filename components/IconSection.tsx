// components/IconSection.tsx
import { useState } from "react";
import IconCard from "./IconCard";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import BlurReveal from "@/components/BlurReveal";

// Simplified icon configuration - no manual sizing needed!
const ICON_CONFIG = [
  {
    name: "brain",
    title: "Discover Pendant",
    description: "Experience the future of wearable.",
    alt: "Brain",
    svgSize: { width: 51, height: 42 }
  },
  {
    name: "eye",
    title: "Discover Pendant", 
    description: "Experience the future of wearable.",
    alt: "Eye",
    svgSize: { width: 53, height: 42 }
  },
  {
    name: "mouth",
    title: "Discover Pendant",
    description: "Experience the future of wearable.", 
    alt: "Mouth",
    svgSize: { width: 71, height: 42 }
  },
  {
    name: "ear",
    title: "Discover Pendant",
    description: "Experience the future of wearable.",
    alt: "Ear", 
    svgSize: { width: 39.96, height: 42 }
  }
];

const ROUNDED_POSITIONS = ["left", "none", "none", "right"] as const;

export default function IconSection() {
  const [usePng, setUsePng] = useState(false);

  const toggleIconType = () => {
    setUsePng(!usePng);
  };

  return (
    <div className="max-w-[77rem] mx-auto w-full h-full text-center rounded-2xl relative">
      {/* Toggle Button */}
      <button
        onClick={toggleIconType}
        className="absolute -top-5 sm:-top-15 right-0 z-10 bg-white/50 cursor-pointer backdrop-blur-md border border-white/30 rounded-sm p-3 shadow-xs hover:bg-white/50 transition-all duration-200 flex items-center justify-center"
        aria-label="Toggle icon type"
      >
        <RotateCcw className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" />
      </button>

      <div className="flex gap-[2px] md:items-center md:justify-center h-full overflow-x-auto snap-x snap-mandatory md:overflow-visible scrollbar-hide no-scrollbar [&>*]:min-w-[calc(100vw-2rem)] md:[&>*]:min-w-0 pl-[1px] md:pl-0">
        {ICON_CONFIG.map((iconConfig, index) => {
          const iconPath = usePng 
            ? `/illustrations/${iconConfig.name}.png`
            : `/icons/${iconConfig.name}.svg`;

          return (
            <IconCard
              key={iconConfig.name}
              icon={
  <BlurReveal as="div" inView={true} key={iconPath}>
    <div className="h-[60px] w-[100px] flex items-center justify-center"> {/* Fixed width AND height */}
      {usePng ? (
        <Image 
          src={iconPath}
          alt={iconConfig.alt}
          width={100}
          height={60}
          quality={100}
          className="max-w-full max-h-full object-contain transition-all duration-300 ease-in-out"
        />
      ) : (
        <Image 
          src={iconPath}
          alt={iconConfig.alt}
          width={iconConfig.svgSize.width}
          height={iconConfig.svgSize.height}
          className="max-w-full max-h-full object-contain transition-all duration-300 ease-in-out"
        />
      )}
    </div>
  </BlurReveal>
}
              title={iconConfig.title}
              description={iconConfig.description}
              rounded={ROUNDED_POSITIONS[index]}
            />
          );
        })}
      </div>
    </div>
  );
}