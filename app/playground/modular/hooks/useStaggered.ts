// tiny helper to compute a delay for any index
export function useStaggered(step = 80, start = 0) {
  return (index: number) => start + index * step;
}
