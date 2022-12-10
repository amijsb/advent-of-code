import { getInput } from "./01";

export const getPartialOverlap = (input: number[][][]) => {
  let count = 0;

  input.forEach((line) => {
    if (
      (line[0][0] >= line[1][0] && line[0][1] <= line[1][1]) ||
      (line[1][0] <= line[0][1] && line[1][0] >= line[0][0]) ||
      (line[1][1] <= line[0][1] && line[1][1] >= line[0][0])
    )
      count++;
  });

  return count;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  return getPartialOverlap(input);
};
