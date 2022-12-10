import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n").map(Number);

  let array: number[][] = [[]];

  lines.forEach((line) => (line === 0 ? array.push([line]) : array[array.length - 1].push(line)));
  return array;
};

export const getCalories = (elves: number[][]) => elves.map((elf) => elf.reduce((a, b) => a + b));

export const part01 = (file: string) => {
  const input = getInput(file);
  const calories = getCalories(input);

  return Math.max(...calories);
};
