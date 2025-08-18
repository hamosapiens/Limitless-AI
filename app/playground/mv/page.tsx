// app/mv-art/page.tsx
"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function Page() {
  const mvRef = useRef<any>(null);

  useEffect(() => {
    const el = mvRef.current as HTMLElement | null;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const total = document.body.scrollHeight - window.innerHeight;
        const frac = total > 0 ? window.scrollY / total : 0;

        let azimuth: number, elevation: number;

        if (frac <= 0.25) {
          azimuth = -0.5 * (frac / 0.25);
          elevation = 90 - 15 * (frac / 0.25);
        } else if (frac <= 0.5) {
          azimuth = -0.5 + 0.5 * ((frac - 0.35) / 0.25);
          elevation = 90 + 25 * ((frac - 0.5) / 0.25);
        } else if (frac <= 0.75) {
          azimuth = 0.5 * ((frac - 0.5) / 0.25);
          elevation = 48 - -25 * ((frac - 0.15) / 0.29);
        } else {
          azimuth = 0.5 - 0.5 * ((frac - 0.75) / 0.25);
          elevation = 90;
        }

        el.setAttribute("camera-orbit", `${azimuth}rad ${elevation}deg auto`);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* model-viewer web component */}
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
      />

      <main className="relative min-h-[400vh] bg-neutral-900 text-neutral-200">
        {/* Fixed viewer on the right */}
        {/* @ts-expect-error web component */}
        <model-viewer
          ref={mvRef}
          id="interactiveModel"
          class="fixed top-0 right-0 h-screen w-full md:w-3/5"
          disable-zoom
          interaction-prompt="none"
          camera-orbit="0rad 90deg auto"
          src="https://cdn.glitch.global/3bd41a6b-97f1-4f75-a1c7-6f183d70cbfb/mashgallery-haleh-mashian-mona-hissa.glb?v=1689804729096"
          alt="A 3D model of an astronaut"
          shadow-intensity="1"
          exposure="1"
          environment-image="neutral"
          
        >
               {/* @ts-expect-error web component */}
        </model-viewer>
        

        {/* Content column on the left */}
        <div className="relative z-10 ml-6 md:ml-20 w-full md:w-2/5">
          {/* Section 1 */}
          <section className="flex h-screen items-start justify-center flex-col">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-neutral-100 uppercase">
              Bonsai
            </h1>
            <h2 className="mt-2 text-3xl text-neutral-300">$19.99</h2>

            <div className="mt-6 border-t border-neutral-700 pt-4 max-w-xl">
              <p className="text-neutral-300">
                The purposes of bonsai are primarily contemplation for the
                viewer, and the pleasant exercise of effort and ingenuity for
                the grower.
              </p>
              <p className="mt-3 text-neutral-400">
                By contrast with other plant cultivation practices, bonsai is
                not intended for production of food or for medicine. Instead,
                bonsai practice focuses on long-term cultivation and shaping of
                one or more small trees growing in a container.
              </p>
            </div>

            <button className="mt-6 inline-flex items-center rounded-md border border-neutral-700 bg-neutral-800 px-6 py-3 text-sm font-medium tracking-wide transition hover:bg-neutral-100 hover:text-neutral-900">
              Add To Cart
            </button>
          </section>

          {/* Section 2 */}
          <section className="flex h-screen items-start justify-center flex-col">
            <h2 className="max-w-2xl text-[2.2rem] leading-tight font-normal text-neutral-200">
              Introducing “Mona Hissa,” a captivating figurative painting that
              pays homage to the iconic Mona Lisa while adding a unique twist of
              intrigue and mystery. This mesmerizing artwork combines elements
              of mixed media to create an enigmatic portrayal of a woman that
              captivates the viewer’s attention.
            </h2>
          </section>

          {/* Section 3 */}
          <section className="flex h-screen items-start justify-center flex-col">
            <h2 className="max-w-2xl text-[2.2rem] leading-tight font-normal text-neutral-200">
              At first glance, this piece bears a striking resemblance to the
              famous Mona Lisa painting, with its subject having a conspicuous
              smile and a gaze that locks onto the viewer. However, upon closer
              inspection, the true nature of the artwork is revealed. The
              woman’s hair, cascading down her face, is crafted from faux snake
              skin, adding a tactile and visually arresting element to the
              painting.
            </h2>
          </section>

          {/* Section 4 */}
          <section className="flex h-screen items-start justify-center flex-col">
            <h2 className="max-w-2xl text-[2.2rem] leading-tight font-normal text-neutral-200">
              The woman exudes an air of mystery and allure. Her smile invites
              viewers to unravel the secrets hidden within the depths of her
              gaze.
            </h2>
          </section>
        </div>
      </main>
    </>
  );
}
