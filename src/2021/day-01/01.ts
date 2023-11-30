import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map(Number);
};

export const getIncreases = (input: number[]) => {
  let increases: number = 0;
  input.forEach((number, i) => (number > input[i - 1] ? increases++ : increases));

  return increases;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  return getIncreases(input);
};
