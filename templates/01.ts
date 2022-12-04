import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n");
};

export const part01 = (file: string) => {
  const input = getInput(file);
  return "part-01";
};
