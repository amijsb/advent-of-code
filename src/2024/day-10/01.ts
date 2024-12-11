import { readFileSync } from "fs";

interface Coordinate {
  x: number;
  y: number;
  xStart: number;
  yStart: number;
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent
    .split("\n")
    .map((line) => line.split(""))
    .map((line) => line.map(Number));
};

export const findTrailheads = (map: number[][]) => {
  const trailheads: Coordinate[] = [];

  map.forEach((col, y) =>
    col.forEach((_, x) => {
      if (map[y][x] === 0) trailheads.push({ x, y, xStart: x, yStart: y });
    }),
  );

  return trailheads;
};

const findNextCoordinates = (currentPosition: Coordinate, map: number[][]) => {
  const { x, y, xStart, yStart } = currentPosition;
  const nextCoordinates: Coordinate[] = [];

  const left = map[y][x - 1] ?? undefined;
  const right = map[y][x + 1] ?? undefined;
  const up = map[y - 1] && map[y - 1][x];
  const down = map[y + 1] && map[y + 1][x];

  const current = map[y][x];

  if (left && left - current === 1) nextCoordinates.push({ x: x - 1, y, xStart, yStart });
  if (right && right - current === 1) nextCoordinates.push({ x: x + 1, y, xStart, yStart });
  if (up && up - current === 1) nextCoordinates.push({ x, y: y - 1, xStart, yStart });
  if (down && down - current === 1) nextCoordinates.push({ x, y: y + 1, xStart, yStart });

  return nextCoordinates;
};

export const hike = (
  map: number[][],
  trailheads: Coordinate[],
  ratings = false,
  totalScore = 0,
) => {
  const stack = trailheads;
  const coordinates = new Set();

  while (stack.length > 0) {
    const currentPosition = stack.pop()!;
    const { x, y, xStart, yStart } = currentPosition;

    if (map[y][x] === 9 && !ratings && !coordinates.has(`${x},${y},${xStart},${yStart}`)) {
      coordinates.add(`${x},${y},${xStart},${yStart}`);
      totalScore++;
    } else if (map[y][x] === 9 && ratings) totalScore++;

    const nextCoordinates = findNextCoordinates(currentPosition, map);
    stack.push(...nextCoordinates);
  }

  return totalScore;
};

export const part01 = (file: string) => {
  const input = getInput(file);

  const trailheads = findTrailheads(input);
  return hike(input, trailheads);
};
