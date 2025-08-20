// app/playground/hero-limitless/page.tsx
import HeroSplitNew from '@/components/HeroSplitNew';
import BottomSheetDisclaimer from "@/components/BottomSheetDisclaimer";

export default function Page() {
  return (
    <>
      <div className="relative">
        <HeroSplitNew
          title="Go beyond your mind’s limitations"
          ctaPrimary={{ label: "Get Limitless", href: "/#" }}
          ctaSecondary={{ label: "Learn More", href: "/#" }}
          imageSrc="/images/Amm_Limitless_In-Situ_1920x1080.jpg"
          logos={[
            { src: "/logos/forbes.svg", alt: "Forbes" },
            { src: "/logos/fast.svg", alt: "TechCrunch" },
            { src: "/logos/verge.svg", alt: "The Verge" },
            { src: "/logos/wired.svg", alt: "WIRED" },
          ]}
        />
      </div>
      <BottomSheetDisclaimer title="Disclaimer" side="right">
        {/* optional content */}
      </BottomSheetDisclaimer>
    </>
  );
}
