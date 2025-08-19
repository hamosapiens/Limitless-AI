import MovingBorderCard from "./moving-border";


export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8">Border Effects Playground</h1>
      <p className="text-center mb-12">
        Explore different border effects with moving animations and glow effects.
      </p>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <MovingBorderCard />
    </div>
    {/* <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <GlowMovingCardLight />
    </div> */}
    </>
  );
}

