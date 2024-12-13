import { readFileSync } from "fs";

type Combination = {
  Na: number;
  Nb: number;
} | null;

type ParsedData = Record<string, Coordinates>;

interface Coordinates {
  x: number;
  y: number;
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const instructions = fileContent.split("\n\n").map((line) => line.split("\n"));

  const parsedData = instructions.map((instruction) =>
    instruction.reduce<ParsedData>((acc, match) => {
      let [prefix, inst] = match.split(": ");
      const [x, y] = inst.split(" ");

      if (prefix === "Button A") prefix = "a";
      if (prefix === "Button B") prefix = "b";
      if (prefix === "Prize") prefix = "p";

      acc[prefix] = {
        x: Number(String(x.match(/(\d+)/g)!)),
        y: Number(String(y.match(/(\d+)/g)!)),
      };
      return acc;
    }, {}),
  );

  return parsedData;
};

export const solveLinearEquations = (instruction: ParsedData, addToPrize = 0): Combination => {
  let { a, b, p } = instruction;

  p.x = p.x + addToPrize;
  p.y = p.y + addToPrize;

  const determinant = a.x * b.y - a.y * b.x;

  if (determinant === 0) return null;

  const Na = (p.x * b.y - p.y * b.x) / determinant;
  const Nb = (a.x * p.y - a.y * p.x) / determinant;

  if (Na % 1 !== 0 || Nb % 1 !== 0) return null;

  return { Na, Nb };
};

export const calculateCoins = (input: ParsedData[], combinations: Combination[]) =>
  input.reduce((acc, _, index) => {
    const combination = combinations[index];
    if (combination === null) return acc;
    else return acc + combination.Na * 3 + combination.Nb * 1;
  }, 0);

export const part01 = (file: string) => {
  const input = getInput(file);
  const combinations = input.map((instruction) => solveLinearEquations(instruction));

  return calculateCoins(input, combinations);
};
