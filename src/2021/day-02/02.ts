import { getInput } from "./01";

const getDirections = (input: string[]) => {
  let position = {
    aim: 0,
    depth: 0,
    horizontal: 0,
  };

  input.forEach((line) => {
    const number = Number(line[line.length - 1]);

    if (line.includes("forward")) {
      position.horizontal += number;
      position.depth += position.aim * number;
    } else line.includes("up") ? (position.aim -= number) : (position.aim += number);
  });

  return position.depth * position.horizontal;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  return getDirections(input);
};
