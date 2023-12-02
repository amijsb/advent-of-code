import { getInput } from "./01";
import { Turn } from "./types";

const getPower = (input: Turn[][]) =>
  input.map((game) =>
    game.reduce(
      (previousValue, { blue, green, red }) => ({
        blue: Math.max(blue, previousValue.blue),
        green: Math.max(green, previousValue.green),
        red: Math.max(red, previousValue.red),
      }),
      { blue: 0, green: 0, red: 0 },
    ),
  );

export const part02 = (file: string) => {
  const input = getInput(file);
  const power = getPower(input).map(({ blue, green, red }) => blue * green * red);

  return power.reduce((a, b) => a + b, 0);
};
