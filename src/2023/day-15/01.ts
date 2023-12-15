import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split(",");
};

export const getASCIIvalues = (input: string[]) =>
  input.map((sequence) => {
    const iteration = Array.from({ length: sequence.length }).fill(".");
    const values = iteration.map((_, i) => sequence.charCodeAt(i));

    return values.reduce((a, b) => ((a + b) * 17) % 256, 0);
  });

export const part01 = (file: string) => {
  const input = getInput(file);
  const values = getASCIIvalues(input);

  return values.reduce((a, b) => a + b, 0);
};
