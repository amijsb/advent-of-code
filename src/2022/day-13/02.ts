import { readFileSync } from "fs";
import { decisionMaking } from "./01";

const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n").filter((line) => line !== "");
  const parsed = lines.map((el) => JSON.parse(el));

  parsed.push([[2]]);
  parsed.push([[6]]);

  return parsed;
};

const findIndices = (element: any, array: any[]) =>
  array.findIndex((el) => JSON.stringify(element) == JSON.stringify(el));

export const getOrder = (packs: any[]) => {
  const sortedPacks = packs.sort((a, b) => {
    const decision = decisionMaking(a, b);
    if (decision) return -1;
    if (!decision) return 1;
    return 0;
  });

  const decoder1 = findIndices([[2]], sortedPacks);
  const decoder2 = findIndices([[6]], sortedPacks);

  return (decoder1 + 1) * (decoder2 + 1);
};

export const part02 = (file: string) => {
  const input = getInput(file);
  return getOrder(input);
};
