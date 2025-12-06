import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const [ranges, ids] = fileContent.split("\n\n");

  return {
    ranges: ranges.split("\n").map((range) => range.split("-").map(Number)),
    ids: ids.split("\n").map(Number),
  };
};

const getFreshIngredients = (ranges: number[][], ids: number[]) => {
  const freshIds = ids.filter((id) => ranges.some(([min, max]) => id >= min && id <= max));
  return freshIds.length;
};

export const part01 = (file: string) => {
  const { ranges, ids } = getInput(file);

  return getFreshIngredients(ranges, ids);
};
