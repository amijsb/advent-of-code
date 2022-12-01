import { getInput, getCalories } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);
  const calories = getCalories(input);

  const topThreeCalories = calories
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((a, b) => a + b);

  return topThreeCalories;
};
