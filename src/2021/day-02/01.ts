import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n");
};

export const getDirections = (input: string[]) => {
  let position = {
    depth: 0,
    horizontal: 0,
  };

  input.forEach((line) => {
    const number = Number(line[line.length - 1]);
    line.includes("forward")
      ? (position.horizontal += number)
      : line.includes("up")
      ? (position.depth -= number)
      : (position.depth += number);
  });

  return position.depth * position.horizontal;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  return getDirections(input);
};
