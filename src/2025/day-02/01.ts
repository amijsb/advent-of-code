import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split(",");
};

export const getRange = (range: string) => {
  const [start, stop] = range.split("-");

  return Array.from({ length: Number(stop) - Number(start) + 1 }, (_, i) => Number(start) + i);
};

const checkId = (id: number) => {
  const idLength = String(id).length;

  if (idLength % 2 !== 0) return 0;

  const splitBy = idLength / 2;

  const left = String(id).slice(0, splitBy);
  const right = String(id).slice(splitBy);

  return Number(left) === Number(right) ? id : 0;
};

export const part01 = (file: string) => {
  const input = getInput(file);

  const ranges = input.map((range) => getRange(range));
  const falseIds = ranges.flatMap((range) =>
    range.map((id) => checkId(id)).filter((num) => num !== 0),
  );

  return falseIds.reduce((a, b) => a + b, 0);
};
