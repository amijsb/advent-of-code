import { readFileSync } from "fs";
import { rowsToColumns } from "../../../helpers/rows-to-columns";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map((line) => line.split(""));
};

export const moveRocks = (input: string[][]) => {
  const platform: string[][] = [];

  input.forEach((column) => {
    const newCol = [];

    while (column.length > 0) {
      if (!column.includes("O")) {
        newCol.push(...column);
        break;
      }

      const currentCharacter = column.shift()!;

      if (currentCharacter === "O" || currentCharacter === "#") {
        newCol.push(currentCharacter);
      }

      if (currentCharacter === ".") {
        const rockIndex = column.indexOf("O");
        const stopIndex = column.indexOf("#");

        if (rockIndex < stopIndex || stopIndex === -1) {
          newCol.push("O");
          column.splice(rockIndex, 1, ".");
        } else newCol.push(".");
      }
    }

    platform.push(newCol);
  });

  return platform;
};

export const getTotalLoad = (rocks: string[][]) => {
  const total = rocks.map((column, index) => {
    const rocks = column.filter((stone) => stone === "O");
    return rocks.length > 0 ? rocks.length * (column.length - index) : 0;
  });

  return total.reduce((a, b) => a + b, 0);
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const columns = rowsToColumns(input);
  const movedRocks = moveRocks(columns);

  return getTotalLoad(rowsToColumns(movedRocks));
};
