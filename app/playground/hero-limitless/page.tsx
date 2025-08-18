import HeroSplit from './HeroSplit';

export default function HeroLimitlessPage() {
  return (
    <div className="relative">
      <HeroSplit
        title="Go beyond your mind’s limitations"
        description="Personalized AI powered by what you’ve seen, said, and heard."
        ctaPrimary={{ label: "Get Started", href: "/signup" }}
        ctaSecondary={{ label: "Learn More", href: "/product" }}
        imageSrc="/images/Amm_Limitless_In-Situ_1920x1080.jpg"
        logos={[
          { src: "/logos/forbes.svg", alt: "Forbes" },
          { src: "/logos/fast.svg", alt: "TechCrunch" },
          { src: "/logos/verge.svg", alt: "The Verge" },
          { src: "/logos/wired.svg", alt: "WIRED" },
        ]}
      />
    </div>
  );
}
