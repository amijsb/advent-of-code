import { readFileSync } from "fs";

export const getInput = (file: string): { [key: string]: number[] } => {
  const fileContent = readFileSync(file, "utf-8");

  const lines = fileContent.split("\n");
  return lines.reduce((acc, arr) => {
    const [value, numbers] = arr.split(": ");
    const mappedNumbers = numbers.split(" ").map(Number);
    return { ...acc, [value]: mappedNumbers };
  }, {});
};

const operators: string[] = ["+", "*"];

export const generateCombinations = (
  operators: string[],
  combinations: string[],
  remaining: number,
): string[][] => {
  if (remaining === 0) return [combinations];
  return operators.flatMap((operator) =>
    generateCombinations(operators, [...combinations, operator], remaining - 1),
  );
};

export const evaluateLeftToRight = (numbers: number[], operators: string[]): number =>
  numbers.slice(1).reduce((total, num, index) => {
    switch (operators[index]) {
      case "+":
        return total + num;
      case "*":
        return total * num;
      case "||":
        return Number(`${total}${num}`);
      default:
        return total;
    }
  }, numbers[0]);

export const part01 = (file: string) => {
  const input = getInput(file);

  const equations: number[] = [];

  for (const total in input) {
    const operatorCombinations = generateCombinations(operators, [], input[total].length - 1);
    const totals = operatorCombinations.map((set) => evaluateLeftToRight(input[total], set));

    if (totals.includes(Number(total))) equations.push(Number(total));
  }

  return equations.reduce((a, b) => a + b, 0);
};
