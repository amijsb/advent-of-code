import { getInput } from "./01";

const findXMas = (input: string[][], coordinate: { x: number; y: number }): number => {
  const { x, y } = coordinate;

  let count = 0;

  if (
    input[y - 1] &&
    input[y - 1][x - 1] === "M" &&
    input[y - 1][x + 1] === "M" &&
    input[y + 1] &&
    input[y + 1][x - 1] === "S" &&
    input[y + 1][x + 1] === "S"
  )
    count++;
  if (
    input[y - 1] &&
    input[y - 1][x - 1] === "S" &&
    input[y - 1][x + 1] === "S" &&
    input[y + 1] &&
    input[y + 1][x - 1] === "M" &&
    input[y + 1][x + 1] === "M"
  )
    count++;
  if (
    input[y - 1] &&
    input[y - 1][x - 1] === "S" &&
    input[y - 1][x + 1] === "M" &&
    input[y + 1] &&
    input[y + 1][x - 1] === "S" &&
    input[y + 1][x + 1] === "M"
  )
    count++;
  if (
    input[y - 1] &&
    input[y - 1][x - 1] === "M" &&
    input[y - 1][x + 1] === "S" &&
    input[y + 1] &&
    input[y + 1][x - 1] === "M" &&
    input[y + 1][x + 1] === "S"
  )
    count++;

  return count;
};

const findAs = (input: string[][]) => {
  const coordinates: { x: number; y: number }[] = [];

  input.forEach((line, y) => {
    line.forEach((_, x) => {
      const letter = input[y][x];

      if (letter === "A") coordinates.push({ x, y });
    });
  });

  return coordinates;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const as = findAs(input);

  const xMas = as.map((coordinate) => findXMas(input, coordinate));
  return xMas.reduce((a, b) => a + b, 0);
};
