// app/page.tsx
import TextGlowLight from './TextGlowLight';
import TextGlow from './TextGlow';

export default function Page() {
  return (
    <>
    <div className="min-h-screen bg-[#f7faff] grid place-items-center">
      <TextGlowLight text="Samuel" />
    </div>
    <div className="min-h-screen bg-[#05060f] grid place-items-center">
      <TextGlow text="Samuel" />
    </div>
    </>
  );
}
