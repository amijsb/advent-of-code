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

const getOverlap = (parts: string[][][]) => {
  let overlap: string[] = [];

  parts[0].forEach((_, i) => {
    const intersection = parts[0][i].filter((element) => parts[1][i].includes(element));
    overlap.push(...new Set(intersection));
  });

  return overlap;
};

export const getPriorities = (overlap: string[]) =>
  overlap.map((letter) => {
    const value = letter.charCodeAt(0);
    return value <= 90 ? value - 38 : value - 96;
  });

export const part01 = (file: string) => {
  const input = getInput(file);
  const parts = getParts(input);

  const overlap = getOverlap(parts);
  const priorities = getPriorities(overlap);

  return priorities.reduce((a, b) => a + b);
};
