import { readFileSync } from "fs";
import { outOfBounds } from "../../../helpers/out-of-bounds";

export type Direction = "^" | ">" | "v" | "<";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map((line) => line.split(""));
};

export const findStartingPosition = (map: string[][]) =>
  map.reduce(
    (acc, arr, index) => {
      const start = arr.indexOf("^");
      if (start !== -1) return (acc = { x: start, y: index });
      return acc;
    },
    { x: 0, y: 0 },
  );

export const move = (direction: Direction, x: number, y: number) => {
  switch (direction) {
    case "^":
      return { x, y: y - 1 };
    case ">":
      return { x: x + 1, y };
    case "v":
      return { x, y: y + 1 };
    case "<":
      return { x: x - 1, y };
  }
};

export const turnRight = (direction: Direction) => {
  switch (direction) {
    case "^":
      return ">";
    case ">":
      return "v";
    case "v":
      return "<";
    case "<":
      return "^";
  }
};

export const moveGuard = (
  map: string[][],
  direction: Direction,
  guardPosition: { x: number; y: number },
): { steps: number; map: string[][] } => {
  let { x, y } = guardPosition;

  const steps = new Set<string>();

  while (true) {
    map[y][x] = "X";

    const { x: newX, y: newY } = move(direction, x, y);

    if (outOfBounds(newX, newY, map[0].length - 1, map.length - 1))
      return { steps: steps.size, map };

    if (map[newY][newX] === "#" || map[newY][newX] === "O") {
      direction = turnRight(direction);
    } else {
      x = newX;
      y = newY;

      steps.add(`${x},${y}`);
    }
  }
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const startingPosition = findStartingPosition(input);

  const { steps } = moveGuard(input, "^", startingPosition);

  return steps;
};
