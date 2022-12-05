import { readFileSync } from "fs";

export interface Stack {
  crates: string[];
}

export interface Instruction {
  amount: number;
  from: number;
  to: number;
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n");
};

export const parseInput = (input: string[]) => {
  const separator = input.findIndex((line) => line.toString() === "");
  const stackLines = input.slice(0, separator);

  const instructions = input.slice(separator + 1).map((instruction) => {
    const splits = instruction.split(" ");
    return { amount: Number(splits[1]), from: Number(splits[3]), to: Number(splits[5]) };
  });

  const stackNumbers = stackLines[separator - 1];
  const amountOfStacks = [...stackNumbers]
    .map(Number)
    .sort((a, b) => a - b)
    .pop();

  stackLines.pop();
  return { amountOfStacks, instructions, stackLines, stackNumbers };
};

export const getStacks = (amountOfStacks: number, stackLines: string[], stackNumbers: string) => {
  const numbers = Array.from({ length: amountOfStacks }, (_, i) => i + 1);

  let stacks: Stack[] = numbers.map((_) => {
    return { crates: [] };
  });

  numbers.forEach((number, i) => {
    const index = stackNumbers.indexOf(number.toString());
    const { crates } = stacks[i];

    stackLines.forEach((line) => {
      const item = line[index];
      item !== " " && crates.push(item);
    });

    crates.reverse();
  });

  return stacks;
};

export const moveCrates = (instructions: Instruction[], reverse: boolean, stacks: Stack[]) => {
  instructions.forEach(({ amount, from, to }) => {
    const { crates } = stacks[from - 1];
    const movedCrates = crates.splice(crates.length - amount, amount);
    reverse && movedCrates.reverse();
    stacks[to - 1].crates.push(...movedCrates);
  });

  const topCrates = stacks.map((stack) => stack.crates.pop());
  return topCrates.toString().replaceAll(",", "");
};

export const part01 = (file: string, reverse = true) => {
  const input = getInput(file);
  const { amountOfStacks, instructions, stackLines, stackNumbers } = parseInput(input);
  const stacks = getStacks(amountOfStacks!, stackLines, stackNumbers);

  return moveCrates(instructions, reverse, stacks);
};
