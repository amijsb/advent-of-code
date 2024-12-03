import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");

  return fileContent.split("\n").reduce(
    (acc: { left: number[]; right: number[] }, line) => {
      const [a, b] = line.split("   ");

      acc.left = [...acc.left, Number(a)];
      acc.right = [...acc.right, Number(b)];

      return acc;
    },
    { left: [], right: [] },
  );
};

export const part01 = (file: string) => {
  const { left, right } = getInput(file);

  const distances = left.sort().map((value, index) => Math.abs(value - right.sort()[index]));
  return distances.reduce((a, b) => a + b, 0);
};
