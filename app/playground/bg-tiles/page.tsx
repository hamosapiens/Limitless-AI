import RevealBlurBlock from "../text/RevealBlurBlock";
import BackgroundTiles from "./BackgroundTiles";

export default function Page() {
  return (
    <>
      <div className="h-screen" />
    <div className="relative min-h-screen bg-white overflow-hidden">
      <BackgroundTiles />
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <RevealBlurBlock
            title="Reveal Hero Title"
            description="This is a beautiful blur-reveal hero block centered over animated background tiles."
            imgSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            imgAlt="Sample"
          />
        </div>
      </div>
    </div>
    <div className="h-screen">
      <div className="flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Hello World</h1>
      </div>
    </div>
    </>
  );
}