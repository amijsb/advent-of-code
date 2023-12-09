import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map((line: string) => line.split(" ").map(Number));
};

const findDifference = (history: number[]) => {
  let array: number[] = [];

  history.reduce((acc: number, arr: number) => {
    const difference = arr - acc;

    acc = arr;
    array.push(difference);

    return acc;
  });

  return array;
};

export const extrapolateNumbers = (array: number[][], history: number[]): number[][] => {
  const difference = findDifference(history);
  array.push(difference);

  return difference.every((num) => num === difference[0])
    ? array
    : extrapolateNumbers(array, difference);
};

const extrapolatedValues = (input: number[][]) =>
  input.map((history) => {
    const values = extrapolateNumbers([history], history);
    return values.reduce((acc, arr): number => acc + arr[arr.length - 1], 0);
  });

export const part01 = (file: string) => {
  const input = getInput(file);
  const values = extrapolatedValues(input);

  return values.reduce((a, b) => a + b, 0);
};
