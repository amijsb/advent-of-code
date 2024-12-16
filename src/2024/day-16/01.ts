import { readFileSync } from "fs";

export type Direction = "^" | ">" | "v" | "<";

export interface Coordinate {
  x: number;
  y: number;
}

export interface ReindeerCoordinate extends Coordinate {
  direction: Direction;
  score: number;
  trace: Coordinate[];
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map((row) => row.split(""));
};

export const findCoordinates = (map: string[][], toFind: string) =>
  map.reduce(
    (acc, arr, index) => {
      const start = arr.indexOf(toFind);
      if (start !== -1) return (acc = { x: start, y: index });
      return acc;
    },
    { x: 0, y: 0 },
  );

type ScoreChart = {
  [key in Direction]: Record<Direction, number>;
};

const scoreChart: ScoreChart = {
  ">": {
    "^": 1001,
    "<": 2001,
    ">": 1,
    v: 1001,
  },
  v: {
    "^": 2001,
    "<": 1001,
    ">": 1001,
    v: 1,
  },
  "<": {
    "^": 1001,
    "<": 1,
    ">": 2001,
    v: 1001,
  },
  "^": {
    "^": 1,
    "<": 1001,
    ">": 1001,
    v: 2001,
  },
};

const updateScore = (score: number, currentDirection: Direction, newDirection: Direction) =>
  score + scoreChart[currentDirection][newDirection];

export const findNextCoordinates = (
  map: string[][],
  x: number,
  y: number,
  currentDirection: Direction,
  score: number,
  trace: Coordinate[],
) => {
  const nextCoordinates: ReindeerCoordinate[] = [];

  if (map[y][x - 1] !== "#")
    nextCoordinates.push({
      x: x - 1,
      y,
      direction: "<",
      score: updateScore(score, currentDirection, "<"),
      trace,
    });
  if (map[y][x + 1] !== "#")
    nextCoordinates.push({
      x: x + 1,
      y,
      direction: ">",
      score: updateScore(score, currentDirection, ">"),
      trace,
    });
  if (map[y - 1][x] !== "#")
    nextCoordinates.push({
      x,
      y: y - 1,
      direction: "^",
      score: updateScore(score, currentDirection, "^"),
      trace,
    });
  if (map[y + 1][x] !== "#")
    nextCoordinates.push({
      x,
      y: y + 1,
      direction: "v",
      score: updateScore(score, currentDirection, "v"),
      trace,
    });

  return nextCoordinates;
};

export const moveReindeer = (
  map: string[][],
  start: Coordinate,
  end: Coordinate,
  compare?: number,
  best = Infinity,
) => {
  const stack: ReindeerCoordinate[] = [
    { ...start, direction: ">" as Direction, score: 0, trace: [] },
  ];

  const memory = new Map<string, number>();
  const bestSeats = new Set<string>();

  while (stack.length > 0) {
    let { x, y, direction, score, trace } = stack.shift()!;

    trace = [...trace, { x, y }];

    if (x === end.x && y === end.y) {
      if (score === compare) trace.forEach(({ x, y }) => bestSeats.add(`${x},${y}`));

      score < best && (best = score);
    }

    if (memory.has(`${x},${y},${direction}`) && memory.get(`${x},${y},${direction}`)! < score)
      continue;
    memory.set(`${x},${y},${direction}`, score);

    const nextCoordinates = findNextCoordinates(map, x, y, direction, score, trace);
    stack.push(...nextCoordinates);
  }

  return { best, bestSeats };
};

export const part01 = (file: string) => {
  const input = getInput(file);

  const s = findCoordinates(input, "S");
  const e = findCoordinates(input, "E");

  const { best } = moveReindeer(input, s, e);
  return best;
};
