import { getInput } from "./01";

const getIncreases = (input: number[]) => {
  let increases: number = 0;

  input.forEach((number, i) =>
    number + input[i - 2] + input[i - 1] > input[i - 3] + input[i - 2] + input[i - 1]
      ? increases++
      : increases,
  );

  return increases;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  return getIncreases(input);
};
