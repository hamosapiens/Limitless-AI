import AnimTailwind from "./AnimTailwind";
import AnimTailwindObserver from "./AnimTailwind-observer";
import RevealBlur from "./RevealBlur";
import RevealBlurBlock from "./RevealBlurBlock";
import MixedBlur from "./MixedBlur";

export default function Text() {
  return (
    <>
      <div className="h-screen" />
      <div className="min-h-screen p-5">
        <AnimTailwind text="Hi there! This is a fun little experiment. Go ahead, test it out and ask me anything!" />
      </div>
      <div className="h-screen" />
      <div className="min-h-screen p-5">
        <AnimTailwindObserver text="Hi there! This is a fun little experiment. Go ahead, test it out and ask me anything!" />
      </div>
      <div className="h-screen" />
      <div className="min-h-screen p-5">
        <RevealBlur text="This text reveals itself by animating from a blur to sharp as it enters the viewport. Try scrolling! This text reveals itself by animating from a blur to sharp as it enters the viewport. Try scrolling! This text reveals itself by animating from a blur to sharp as it enters the viewport. Try scrolling! This text reveals itself by animating from a blur to sharp as it enters the viewport. Try scrolling!"
         />
      </div>
      <div className="h-screen" />
      <div className="min-h-screen p-5">
<RevealBlurBlock
  title="Reveal Blur Block"
  description="This block animates from a blur to sharp as it enters the viewport. The effect applies to the whole heading, description, and image."
  imgSrc="/stn2.svg"
  imgAlt="Hamo portrait"
/>
      </div>
      <div className="h-screen" />
      <div className="min-h-screen">
        <MixedBlur />
      </div>

    </>
  );
}
