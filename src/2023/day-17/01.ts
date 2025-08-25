import { readFileSync } from "fs";

type Direction = "r" | "l" | "u" | "d";

interface Crucible {
  previous: string;
  total: number;
  x: number;
  y: number;
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent
    .split("\n")
    .map((line) => line.split(""))
    .map((line) => line.map(Number));
};

const opposite = {
  r: "l",
  l: "r",
  u: "d",
  d: "u",
};

const isWithinBounds = (x: number, y: number, maxX: number, maxY: number) =>
  x >= 0 && x < maxX + 1 && y >= 0 && y < maxY + 1;

const moveCrucible = (
  crucible: Crucible,
  maxX: number,
  maxY: number,
  ultra = false,
): Crucible[] => {
  let { x, y, total, previous } = crucible;
  const nextCoordinates: Crucible[] = [];

  const currentDirection = previous[previous.length - 1] as Direction;

  const addDirections = {
    r: { x: x + 1, y },
    l: { x: x - 1, y },
    u: { x, y: y - 1 },
    d: { x, y: y + 1 },
  };

  const newPrevious = previous.length === (ultra ? 10 : 3) ? previous.slice(1) : previous;

  const addNextCoordinate = (directions: Direction[]) => {
    directions.forEach((direction) => {
      const { x, y } = addDirections[direction];

      if (isWithinBounds(x, y, maxX, maxY)) {
        nextCoordinates.push({
          x,
          y,
          total,
          previous: newPrevious.concat(direction),
        });
      }
    });
  };

  const allDirections: Direction[] = ["l", "r", "d", "u"];

  if (ultra) {
    if (previous.length === 10 && previous.split("").every((dir) => dir === currentDirection)) {
      addNextCoordinate(
        allDirections.filter(
          (dir) => dir !== currentDirection && dir !== opposite[currentDirection],
        ),
      );
    } else if (
      previous.length >= 4 &&
      previous
        .slice(-4)
        .split("")
        .every((dir) => dir === currentDirection)
    ) {
      addNextCoordinate(allDirections.filter((dir) => dir !== opposite[currentDirection]));
    } else {
      addNextCoordinate([currentDirection]);
    }
  } else {
    if (previous.length === 3 && previous.split("").every((dir) => dir === currentDirection)) {
      addNextCoordinate(
        allDirections.filter(
          (dir) => dir !== currentDirection && dir !== opposite[currentDirection],
        ),
      );
    } else {
      addNextCoordinate(allDirections.filter((dir) => dir !== opposite[currentDirection]));
    }
  }

  return nextCoordinates;
};

const getAverage = (
  current: { x: number; y: number },
  end: { x: number; y: number },
  map: number[][],
  total = 0,
): number => {
  if (current.x === end.x && current.y === end.y) return total;
  return getAverage(
    { x: current.x + 1, y: current.y + 1 },
    end,
    map,
    (total += map[current.y][current.x + 1] + map[current.y + 1][current.x + 1]),
  );
};

export const getHeatLoss = (start: Crucible[], map: number[][], ultra = false) => {
  let queue = start;

  const memory = new Map();

  const maxX = map[0].length - 1;
  const maxY = map.length - 1;

  let heatLoss = getAverage({ x: 0, y: 0 }, { x: maxX, y: maxY }, map);

  while (queue.length > 0) {
    let { x, y, total, previous } = queue.pop()!;

    total += map[y][x];

    if (heatLoss < total) continue;

    if (memory.get(`${x},${y},${previous}`) <= total) continue;
    memory.set(`${x},${y},${previous}`, total);

    if (x === maxX && y === maxY) {
      heatLoss = Math.min(heatLoss, total);
      continue;
    }

    const newCoordinates = moveCrucible({ x, y, total, previous }, maxX, maxY, ultra).filter(
      // ({ x, y, total }) => (memory.get(`${x},${y},${previous}`) <= total ),
      ({ x, y, total }) => !queue.some((el) => el.x === x && el.y === y && total >= el.total),
    );

    newCoordinates.forEach((coordinate) => queue.push(coordinate));
  }

  return heatLoss;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  // return getHeatLoss(
  //   [
  //     { x: 0, y: 1, total: 0, previous: "d" },
  //     { x: 1, y: 0, total: 0, previous: "r" },
  //   ],
  //   input,
  // );
};
