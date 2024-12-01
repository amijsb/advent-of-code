import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");

  const input = fileContent.split("\n");

  const left: number[] = [];
  const right: number[] = [];

  input.forEach((line) => {
    const [a, b] = line.split("   ");

    left.push(Number(a));
    right.push(Number(b));
  });

  return { left, right };
};

export const part01 = (file: string) => {
  const { left, right } = getInput(file);

  const distances = left.sort().map((value, index) => Math.abs(value - right.sort()[index]));

  return distances.reduce((a, b) => a + b, 0);
};
