import { getInput, getJoltage } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);

  const joltages = input.map((bank) => getJoltage(bank, 12));

  return joltages.reduce((a, b) => a + b, 0);
};
