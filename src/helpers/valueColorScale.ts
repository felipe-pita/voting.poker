import { percentageToColor } from './percentageToColor';

const VALUE_PERCENTAGE: Record<number, number> = {
  1: 0.10,
  2: 0.26,
  3: 0.42,
  5: 0.58,
  8: 0.74,
  13: 0.90,
};

export const valueToColor = (value: number) => {
  const percentage =
    VALUE_PERCENTAGE[value] ??
    Math.max(0.1, Math.min(1, Math.log10(value) / 2));

  return {
    color: percentageToColor(percentage),
    percentage,
  };
};
