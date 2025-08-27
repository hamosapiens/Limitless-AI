import fs from "fs";
import path from "path";
import ScrollSequence from "./ScrollSequence";
import BlurReveal from "@/components/BlurReveal";

export default function Page() {
  // Read any .webp/.png/.jpg from /public/seq
  const dir = path.join(process.cwd(), "public/seq");
  const files = fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter((f) => /\.(webp|png|jpe?g)$/i.test(f))
        // numeric sort by digits in filename (001, 6, 010, etc.)
        .sort((a, b) => {
          const na = Number(a.match(/\d+/)?.[0] ?? 0);
          const nb = Number(b.match(/\d+/)?.[0] ?? 0);
          return na - nb;
        })
    : [];

  const frames = files.map((f) => `/seq/${f}`);

  return (
    <main>
      <ScrollSequence
        frames={frames}      // exact URLs; gaps/padding are fine
        frameCount={frames.length}
        heightVh={200}       // scroll distance (tweak)
        cacheWindow={24}     // small cache to avoid jank
        className="my-0"
      />


    </main>
  );
}
