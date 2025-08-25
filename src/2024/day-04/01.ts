import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map((line) => line.split(""));
};

const bla = {
  M: 1,
  A: 2,
  S: 3,
};

const mas: ("M" | "A" | "S")[] = ["M", "A", "S"];

const getBla = (input: string[][], coordinate: { x: number; y: number }) => {
  let count = 0;

  const { x, y } = coordinate;
  const vlaai = mas.map((letter) => {
    return input[y][x + bla[letter]] === letter;
    // if (input[y][x + bla[letter]] === letter) count++;
    // if (input[y][x - bla[letter]] === letter) count++;
    // if (input[y - bla[letter]][x] && input[y - bla[letter]][x] === letter) count++;
  });

  console.log(vlaai);
};

const findXmas = (input: string[][], coordinate: { x: number; y: number }): number => {
  const { x, y } = coordinate;

  console.log(getBla(input, coordinate));

  let count = 0;

  if (input[y][x + 1] === "M" && input[y][x + 2] === "A" && input[y][x + 3] === "S") count++;
  if (input[y][x - 1] === "M" && input[y][x - 2] === "A" && input[y][x - 3] === "S") count++;
  if (
    input[y - 1] &&
    input[y - 2] &&
    input[y - 3] &&
    input[y - 1][x] === "M" &&
    input[y - 2][x] === "A" &&
    input[y - 3][x] === "S"
  )
    count++;
  if (
    input[y + 1] &&
    input[y + 2] &&
    input[y + 3] &&
    input[y + 1][x] === "M" &&
    input[y + 2][x] === "A" &&
    input[y + 3][x] === "S"
  )
    count++;
  if (
    input[y + 1] &&
    input[y + 2] &&
    input[y + 3] &&
    input[y + 1][x + 1] === "M" &&
    input[y + 2][x + 2] === "A" &&
    input[y + 3][x + 3] === "S"
  )
    count++;
  if (
    input[y - 1] &&
    input[y - 2] &&
    input[y - 3] &&
    input[y - 1][x - 1] === "M" &&
    input[y - 2][x - 2] === "A" &&
    input[y - 3][x - 3] === "S"
  )
    count++;
  if (
    input[y - 1] &&
    input[y - 2] &&
    input[y - 3] &&
    input[y - 1][x + 1] === "M" &&
    input[y - 2][x + 2] === "A" &&
    input[y - 3][x + 3] === "S"
  )
    count++;
  if (
    input[y + 1] &&
    input[y + 2] &&
    input[y + 3] &&
    input[y + 1][x - 1] === "M" &&
    input[y + 2][x - 2] === "A" &&
    input[y + 3][x - 3] === "S"
  )
    count++;

  return count;
};

const findXs = (input: string[][]) => {
  const coordinates: { x: number; y: number }[] = [];

  input.forEach((line, y) => {
    line.forEach((_, x) => {
      const letter = input[y][x];

      if (letter === "X") coordinates.push({ x, y });
    });
  });

  return coordinates;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const xs = findXs(input);

  const xmas = xs.map((coordinate) => findXmas(input, coordinate));
  return xmas.reduce((a, b) => a + b, 0);
};
