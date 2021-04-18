export const clamp = (min: number, max: number, value: number) => {
  return Math.min(max, Math.max(min, value));
};
