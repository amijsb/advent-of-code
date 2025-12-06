import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");

  const lines = fileContent.split("\n");
  return lines.map((line) => line.split("").map(Number));
};

const getHighestNumber = (bank: number[]) => Math.max(...bank);

export const getJoltage = (bank: number[], batteries = 2) => {
  let slots: number[] = [];
  let index = 0;
  let count = 0;

  while (count < batteries) {
    count++;

    const searchArea = bank.slice(index, bank.length - (batteries - count));

    const highestNumber = getHighestNumber(searchArea);
    index = bank.indexOf(highestNumber, index) + 1;

    slots.push(highestNumber);
  }

  return Number(slots.join(""));
};

export const part01 = (file: string) => {
  const input = getInput(file);

  const joltages = input.map((bank) => getJoltage(bank));

  return joltages.reduce((a, b) => a + b, 0);
};
