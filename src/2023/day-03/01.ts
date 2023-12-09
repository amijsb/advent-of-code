import { readFileSync } from "fs";

export interface Number {
  line: number;
  numbers: number;
  range: number[];
}

export interface Symbol {
  index: number;
  line: number;
  range: number[];
  symbol: string;
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n");
};

export const getNumbers = (input: string[]): Number[] =>
  input.flatMap((line, i) =>
    [...line.matchAll(/[\d]+/g)].flatMap((match) => ({
      line: i,
      numbers: Number(match[0]),
      range: Array.from({ length: match[0].length }, (_, i) => match.index! + i),
    })),
  );

export const getSymbols = (input: string[]): Symbol[] =>
  input.flatMap((line, i) =>
    [...line.matchAll(/[^\w\.]/g)].flatMap((match) => ({
      index: match.index!,
      line: i,
      range: [match.index! - 1, match.index!, match.index! + 1],
      symbol: match[0],
    })),
  );

const getParts = (numbers: Number[], symbols: Symbol[]) =>
  numbers.filter((number) =>
    symbols.some(
      (symbol) =>
        number.range.some((num) => symbol.range.includes(num)) &&
        Math.abs(number.line - symbol.line) <= 1,
    ),
  );

export const part01 = (file: string) => {
  const input = getInput(file);
  const numbers = getNumbers(input);
  const symbols = getSymbols(input);
  const parts = getParts(numbers, symbols);

  return parts.map((part) => part.numbers).reduce((a, b) => a + b, 0);
};
