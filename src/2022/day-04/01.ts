import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");

  return lines.map((line) => {
    const split: string[] = line.split(",");
    return [split[0].split("-").map(Number), split[1].split("-").map(Number)];
  });
};

export const getCompleteOverlap = (input: number[][][]) => {
  let count = 0;

  input.forEach((line) => {
    if (
      (line[0][0] >= line[1][0] && line[0][1] <= line[1][1]) ||
      (line[1][0] >= line[0][0] && line[1][1] <= line[0][1])
    )
      count++;
  });

  return count;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  return getCompleteOverlap(input);
};
