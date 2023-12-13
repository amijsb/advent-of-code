import { getInput, getReflections } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);
  const summary = getReflections(input, 1);

  return summary.reduce((a, b) => a + b, 0);
};
