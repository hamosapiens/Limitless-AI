// app/page.tsx
import IphoneHomeMock from "./IphoneHomeMock";

export default function Page() {
  return (
    <IphoneHomeMock
      // Optional tuning:
      // minPhoneHeightPx={360}
      // minScale={0.5}
      // stagePaddingPx={32}
    />
  );
}
