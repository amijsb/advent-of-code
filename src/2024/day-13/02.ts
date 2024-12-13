import { calculateCoins, getInput, solveLinearEquations } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);
  const combinations = input.map((instruction) =>
    solveLinearEquations(instruction, 10000000000000),
  );

  return calculateCoins(input, combinations);
};
