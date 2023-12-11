import { readFileSync } from "fs";

export interface Coordinate {
  x: number;
  y: number;
}

type Direction = "up" | "down" | "left" | "right";

interface Directions {
  [key: string]: Direction[];
}

const directions: Directions = {
  "-": ["left", "right"],
  ".": [],
  "|": ["up", "down"],
  "7": ["left", "down"],
  F: ["down", "right"],
  J: ["left", "up"],
  L: ["up", "right"],
  S: ["left", "right", "up", "down"],
};

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map((line) => line.split(""));
};

const findNextCoordinates = (currentPosition: Coordinate, input: string[][]) => {
  const { x, y } = currentPosition;
  const nextCoordinates: Coordinate[] = [];

  const left = input[y][x - 1] ?? undefined;
  const right = input[y][x + 1] ?? undefined;
  const up = input[y - 1] && input[y - 1][x];
  const down = input[y + 1] && input[y + 1][x];

  const current = input[y][x];

  if (left && directions[left].includes("right") && directions[current].includes("left"))
    nextCoordinates.push({ x: x - 1, y });
  if (right && directions[right].includes("left") && directions[current].includes("right"))
    nextCoordinates.push({ x: x + 1, y });
  if (up && directions[up].includes("down") && directions[current].includes("up"))
    nextCoordinates.push({ x, y: y - 1 });
  if (down && directions[down].includes("up") && directions[current].includes("down"))
    nextCoordinates.push({ x, y: y + 1 });

  return nextCoordinates;
};

export const findLoop = (input: string[][]) => {
  // refactor this
  const startCoordinate = input
    .map((line, y) => ({ x: line.indexOf("S"), y }))
    .filter(({ x }) => x !== -1)[0]!;

  const stack = [startCoordinate];
  const loop = new Set<string>();

  while (stack.length > 0) {
    let currentCoordinate = stack.pop()!;
    const { x, y } = currentCoordinate;

    if (!loop.has(JSON.stringify({ x, y }))) {
      loop.add(JSON.stringify({ x, y }));
      const nextCoordinates = findNextCoordinates(currentCoordinate, input);

      stack.push(...nextCoordinates);
    }
  }

  return loop;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const loop = findLoop(input);

  return loop.size / 2;
};
