import { readFileSync } from "fs";
import { outOfBounds } from "../../../helpers/out-of-bounds";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map((row) => row.split(""));
};

const roll = "@";

const getSurroundingRolls = (map: string[][], x: number, y: number) => {
  const rolls: string[] = [];

  const maxX = map[0].length - 1;
  const maxY = map.length - 1;

  if (!outOfBounds(x - 1, y - 1, maxX, maxY)) rolls.push(map[y - 1][x - 1]);
  if (!outOfBounds(x - 1, y, maxX, maxY)) rolls.push(map[y][x - 1]);
  if (!outOfBounds(x - 1, y + 1, maxX, maxY)) rolls.push(map[y + 1][x - 1]);
  if (!outOfBounds(x, y + 1, maxX, maxY)) rolls.push(map[y + 1][x]);
  if (!outOfBounds(x + 1, y + 1, maxX, maxY)) rolls.push(map[y + 1][x + 1]);
  if (!outOfBounds(x + 1, y, maxX, maxY)) rolls.push(map[y][x + 1]);
  if (!outOfBounds(x + 1, y - 1, maxX, maxY)) rolls.push(map[y - 1][x + 1]);
  if (!outOfBounds(x, y - 1, maxX, maxY)) rolls.push(map[y - 1][x]);

  return rolls;
};

export const getAccessibleRolls = (map: string[][]) => {
  let accessibleRolls: { x: number; y: number }[] = [];

  map.forEach((col, y) =>
    col.forEach((_, x) => {
      if (map[y][x] === roll) {
        const surroundingRolls = getSurroundingRolls(map, x, y);

        if (surroundingRolls.filter((value) => value === roll).length < 4)
          accessibleRolls.push({ x, y });
      }
    }),
  );

  return accessibleRolls;
};

export const part01 = (file: string) => {
  const input = getInput(file);

  return getAccessibleRolls(input).length;
};
