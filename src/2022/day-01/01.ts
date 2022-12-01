import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n").map(Number);

  let array: number[][] = [[]];

  lines.map((line) => {
    return line === 0 ? array.push([line]) : array[array.length - 1].push(line);
  });

  return array;
};

export const getCalories = (input: number[][]) => {
  const calories = input.map((set) => set.reduce((a, b) => a + b));
  return calories;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const calories = getCalories(input);

  return calories.sort((a, b) => a - b).pop();
};
