// /test/page.tsx
import HeroSplit from "@/components/HeroSplit";
import BottomSheetDisclaimer from "@/components/BottomSheetDisclaimer";
import FeatureRail from "@/components/FeatureRail";
import IntroVideoSection from './playground/intro/IntroVideoSection';


export default function Page() {
  return (
  <main className="space-y-0 lg:space-y-0">
      <div className="relative">
        <HeroSplit
          title="Go beyond your mind’s limitations"
          description="Personalized AI powered by what you’ve seen, said, and heard."
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


        <FeatureRail
          heading="Go beyond the screen"
          items={[
            {
              eyebrow: "An intuitive way to capture unexpected strokes of genius.",
              title: "Future unlocked",
              imageSrc: "/images/GT2TKmVWgAE4ine.jpeg",
              href: "/#",
              textLight: true,
              modalContent:
       "Stay engaged without the worry of writing things down.\n\nGather insights about your life by better understanding how you communicate.\n\nKeep conversations private with permission-based data protection."


            },
                        {
              eyebrow: "Preserve conversations and ask your personalized AI anything.",
              title: "Ask Limitless AI anything",
              imageSrc: "/images/app-mkp.jpg",
              // colorOverlay: "linear-gradient(358.27deg, #E8B170 1.08%, rgba(232, 177, 112, 0.5) 20.86%, rgba(232, 177, 112, 0.05) 34.99%)",
              textLight: true,
              href: "/#",
              modalContent:
              "Effortlessly retrieve conversations with an intuitive app.\n\nBookmark moments by tapping Pendant to easily mark a moment.\n\nAsk your personalized AI anything using the latest AI models."
            },
            {
              eyebrow: "Keep conversations private with permission-based data protection.",
              title: "Privacy matters",
              imageSrc: "/images/Amm_Limitless_Sweater_1080x1350.jpg",
              textLight: true,
              href: "/#",
              modalContent:
              "Stay engaged without the worry of writing things down.\n\nGather insights about your life by better understanding how you communicate.\n\nKeep conversations private with permission-based data protection."
            },
            {
              eyebrow: "Versatile magnetic clasp design — wear pendant however you like.",
              title: "Beautiful and durable",
              imageSrc: "/images/Group 132.jpg",
              textLight: true,
              href: "/#",
              modalContent:
              "Effortlessly retrieve conversations with an intuitive app.\n\nBookmark moments by tapping Pendant to easily mark a moment.\n\nAsk your personalized AI anything using the latest AI models."
            },
            {
              eyebrow: "Bookmark moments by tapping Pendant to easily mark a moment.",
              title: "Bookmark moments",
              imageSrc: "/images/GU8VX4sW4AAN52n.jpeg",
              colorOverlay: "linear-gradient(0.04deg, #000000 0.03%, rgba(0, 0, 0, 0.5) 33.55%, rgba(0, 0, 0, 0.1) 67.99%)",
              textLight: true,
              href: "/#",
              modalContent:
                            "Stay engaged without the worry of writing things down.\n\nGather insights about your life by better understanding how you communicate.\n\nKeep conversations private with permission-based data protection."
            },
                        {
              eyebrow: "Stay engaged without the worry of writing things down.",
              title: "Small & lightweight",
              imageSrc: "/images/notes.jpg",
              colorOverlay: "linear-gradient(0.04deg, #000000 0.01%, rgba(0, 0, 0, 0.1) 33.55%, rgba(0, 0, 0, 0.1) 67.99%)",
              textLight: true,
              href: "/#",
              modalContent:
              "Effortlessly retrieve conversations with an intuitive app.\n\nBookmark moments by tapping Pendant to easily mark a moment.\n\nAsk your personalized AI anything using the latest AI models."
            },

          ]}
          className="bg-black pb-10 pt-12 sm:pt-28"
        />


      <IntroVideoSection />



      {/* Scroll Sequence */}
      {/* <div className="min-h-screen">
      <ScrollSequence
        frameCount={16}
        basePath="/seq/seq_"
        ext="webp"
        showFrameCounter
        heightVh={200}
      />
    </div> */}

          <BottomSheetDisclaimer title="Disclaimer" side="right">
        {/* optional content */}
      </BottomSheetDisclaimer>
      
    </main>
  );
}
