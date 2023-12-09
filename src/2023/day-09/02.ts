import { extrapolateNumbers, getInput } from "./01";

const extrapolatedValues = (input: number[][]) =>
  input.map((history) => {
    const values = extrapolateNumbers([history], history);
    return values.reverse().reduce((acc, arr): number => arr[0] - acc, 0);
  });

export const part02 = (file: string) => {
  const input = getInput(file);
  const values = extrapolatedValues(input);

  return values.reduce((a, b) => a + b, 0);
};
