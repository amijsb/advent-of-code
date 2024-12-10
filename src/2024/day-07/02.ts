import { evaluateLeftToRight, generateCombinations, getInput } from "./01";

const operators: string[] = ["+", "*", "||"];

export const part02 = (file: string) => {
  const input = getInput(file);

  const equations: number[] = [];

  for (const total in input) {
    const operatorCombinations = generateCombinations(operators, [], input[total].length - 1);
    const totals = operatorCombinations.map((set) => evaluateLeftToRight(input[total], set));

    if (totals.includes(Number(total))) equations.push(Number(total));
  }

  return equations.reduce((a, b) => a + b, 0);
};
