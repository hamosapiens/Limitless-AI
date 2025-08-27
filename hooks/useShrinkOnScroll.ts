import { useEffect, useState } from "react";

/**
 * useShrinkOnScroll
 * @param ref - React ref to the element whose height should shrink
 * @param options - { min, max, threshold } for height and scroll range
 * @returns height (number)
 */
export function useShrinkOnScroll(
  ref: React.RefObject<HTMLElement>,
  options: { min: number; max: number; threshold: number }
) {
  const { min, max, threshold } = options;
  const [height, setHeight] = useState(max);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // progress: 0 when top at top, 1 when threshold px below
      const progress = Math.min(Math.max(rect.top / threshold, 0), 1);
      setHeight(min + (max - min) * progress);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, min, max, threshold]);

  return height;
}
