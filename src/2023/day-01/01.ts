import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n");
};

const getCalibrationValues = (input: string[]): number[] =>
  input.map((string) => {
    const nums = string.match(/(\d)/g);

    return nums ? Number(nums[0] + nums[nums.length - 1]) : 0;
  });

export const part01 = (file: string) => {
  const input = getInput(file);
  const calibrationValues = getCalibrationValues(input);

  return calibrationValues.reduce((a, b) => a + b, 0);
};
