import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n");
};

export const getParts = (input: string[]) => {
  const part1 = input.map((line) => line.split("", line.length / 2));
  const part2 = input.map((line) => line.slice(line.length / 2).split(""));

  return [part1, part2];
};

export const getOverlap = (parts: string[][][]) => {
  let overlap: string[] = [];
  for (let i = 0; i < parts[0].length; i++) {
    const el = parts[0][i].filter((element) => parts[1][i].includes(element));
    const individualValues = new Set(el).values().next();
    overlap.push(individualValues.value);
  }
  return overlap;
};

export const getValues = (overlap: string[]) =>
  overlap.map((letter) => {
    const value = letter.charCodeAt(0);
    return value <= 90 ? value - 38 : value - 96;
  });

export const part01 = (file: string) => {
  const input = getInput(file);
  const parts = getParts(input);

  const overlap = getOverlap(parts);
  const values = getValues(overlap);

  return values.reduce((a, b) => a + b);
};
