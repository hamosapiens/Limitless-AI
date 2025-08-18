

// Remove "use client" if you want to use async/await at the top level
// (recommended for server components/pages in Next.js App Router)
import BentoSlider from "./BentoSlider";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    

export default async function BentoSliderPlayground() {
  await sleep(1000); // Simulate fetch


  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <BentoSlider
        title="Meet Your Match"
        titleClassName="font-[amsterdam]"
        sections={[
          {
            slides: [
              {
                title: "Breakthrough Technology",
                body:
                  "The next generation of cannabis consumption with innovative design and cutting-edge technology.",
                toneClass: "bg-black text-white",
                images: [
                  {
                    src: "https://cdn.shopify.com/s/files/1/0276/3256/6375/files/odin-dev23.webp?v=1738875375",
                    alt: "Odin",
                    className: "w-3/4 -mb-7 -mr-6",
                  },
                ],
              },
              {
                title: "How It Works",
                body:
                  "Our devices use vaporization and heat-not-burn technologies to heat cannabis flower or concentrates to a temperature that releases cannabinoids and terpenes as a vapor without burning the material.",
                images: [
                  {
                    src: "https://cdn.shopify.com/s/files/1/0276/3256/6375/files/stelo-ww-n_1_-fotor-bg-remover-20240306101451_1.webp?v=1738655214",
                    alt: "Device",
                    className: "w-full -mb-6 -mt-8 mix-blend-multiply",
                  },
                ],
              },
              {
                title: "A Cleaner, More Efficient Experience",
                body:
                  "Eliminating combustion reduces harmful toxins, preserves the good stuff, and delivers a cleaner, smoother, and more flavorful cannabis experience.",
                images: [
                  {
                    src: "https://cdn.shopify.com/s/files/1/0276/3256/6375/files/nugs.webp?v=1738698130",
                    alt: "Flower",
                    className: "w-full -mb-8 -mt-4 mix-blend-multiply",
                  },
                ],
              },
            ],
          },
          {
            slides: [
              {
                title: "Pioneering the Future",
                body:
                  "Our portable, high-performance devices cater to all cannabis consumers, offering both pre-dosed convenience with our closed system and customizable freedom with our open system—ensuring the perfect experience for every preference.",
                images: [
                  {
                    src: "https://cdn.shopify.com/s/files/1/0276/3256/6375/files/20250206-124715.webp?v=1738876894",
                    alt: "Left device",
                    className: "w-[245px] -mb-6 object-contain",
                  },
                  {
                    src: "https://cdn.shopify.com/s/files/1/0276/3256/6375/files/Screen_Shot_2025-02-03_at_3.45.58_PM_1.png?v=1738658555",
                    alt: "Right UI",
                    className: "h-[230px] w-auto -mb-6 -mr-6 rounded-lg object-contain",
                  },
                ],
              },
              {
                title: "Open VS Closed Systems",
                body:
                  "Our Odin device is a closed system, designed exclusively for our pre-dosed pairings, ensuring consistency and ease of use, while our Iven device is an open system, allowing users to enjoy their choice of flower or concentrates for a fully customizable experience.",
                toneClass: "bg-black text-white",
                images: [
                  {
                    src: "https://cdn.shopify.com/s/files/1/0276/3256/6375/files/Group_35647.webp?v=1738696920",
                    alt: "Comparison",
                    className: "w-full max-w-[340px] -mb-6 mx-auto",
                  },
                ],
              },
            ],
          },
        ]}
      />
    </main>
  );
}

