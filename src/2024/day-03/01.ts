import { readFileSync } from "fs";

const regex = /(mul\(\d{1,3},\d{1,3}\))/g;

export const parseInstruction = (instruction: string) => instruction.match(/\d{1,3}/g)!;

export const getInput = (file: string, regex: RegExp): string[] => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.match(regex)!;
};

export const multiply = (input: string[][]) =>
  input.map((instruction) => {
    const [a, b] = instruction?.map(Number);
    return a * b;
  });

export const part01 = (file: string) => {
  const input = getInput(file, regex);
  const parsedInput = input.map(parseInstruction);
  const parsedInstructions = multiply(parsedInput);

  return parsedInstructions.reduce((acc, curr) => acc + curr, 0);
};
