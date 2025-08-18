import HeroImage from "./HeroImage";
import MixedBlur from "../text/MixedBlur";

export default function DarkHeroPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      {/* Left: Hero text */}
      <div className="flex-1 flex items-center justify-center z-10 px-6 py-12 text-white">
        <MixedBlur />
      </div>
      {/* Right: Hero image with fade overlays */}
      <div className="flex-1 relative w-full h-[28rem] md:h-[40rem] flex items-center justify-center">
        <HeroImage src="/images/trends2020.webp" alt="Hero" />
      </div>
    </div>
  );
}