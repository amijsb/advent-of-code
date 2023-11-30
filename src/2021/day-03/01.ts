import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");

  return lines.map((line) => line.split("").map(Number));
};

export const binaryToInteger = (input: number[]) => parseInt(input.join(""), 2);

export const getPowerConsumption = (lines: number[][]) => {
  let ones: number[] = Array.from({ length: lines[0].length }, () => 0);

  lines.forEach((line) => {
    line.forEach((number, index) => {
      ones[index] += number;
    });
  });

  const gammaRate = ones.map((number) => (number > lines.length / 2 ? 1 : 0));
  const epsilonRate = ones.map((number) => (number > lines.length / 2 ? 0 : 1));

  return binaryToInteger(gammaRate) * binaryToInteger(epsilonRate);
};

export const part01 = (file: string) => {
  const input = getInput(file);
  return getPowerConsumption(input);
};
