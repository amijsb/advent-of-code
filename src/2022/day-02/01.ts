import { readFileSync } from "fs";

export interface Score {
  [key: string]: number;
}

interface Outcome {
  [key: string]: string;
}

const baseScore: Score = {
  X: 1,
  Y: 2,
  Z: 3,
};

const draw: Outcome = {
  A: "X",
  B: "Y",
  C: "Z",
};

const win: Outcome = {
  A: "Y",
  B: "Z",
  C: "X",
};

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map((line) => [line[0], line[2]]);
};

export const getScore = (input: string[][]) => {
  let count = 0;

  input.forEach((line: string[]) => {
    const opponent = line[0];
    const you = line[1];
    const result = win[opponent] === you ? 6 : draw[opponent] === you ? 3 : 0;

    count += result + baseScore[you];
  });

  return count;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  return getScore(input);
};
