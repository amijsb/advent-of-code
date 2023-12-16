import { readFileSync } from "fs";

export type Option = "." | "|" | "-" | "\\" | "/";
type Direction = "left" | "down" | "right" | "up";

export interface Coordinate {
  direction: Direction;
  x: number;
  y: number;
}

type Options = {
  [key in Option]: {
    [key in Direction]: Direction[];
  };
};

const options: Options = {
  ".": { up: ["up"], down: ["down"], left: ["left"], right: ["right"] },
  "|": { up: ["up"], down: ["down"], left: ["up", "down"], right: ["up", "down"] },
  "-": { up: ["left", "right"], down: ["left", "right"], left: ["left"], right: ["right"] },
  "\\": { up: ["left"], down: ["right"], left: ["up"], right: ["down"] },
  "/": { up: ["right"], down: ["left"], left: ["down"], right: ["up"] },
};

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map((line) => line.split(""));
};

const handleCoordinate = ({ x, y, direction }: Coordinate) => {
  if (direction === "right") return { x: x + 1, y, direction };
  if (direction === "left") return { x: x - 1, y, direction };
  if (direction === "up") return { x, y: y - 1, direction };
  return { x, y: y + 1, direction };
};

const moveBeam = (coordinate: Coordinate, map: Option[][]) => {
  let { x, y, direction } = coordinate;
  const nextPositions: any[] = [];
  const position = map[y][x];

  const withinBorders = {
    right: x + 1 <= map[0].length - 1,
    left: x - 1 >= 0,
    up: y - 1 >= 0,
    down: y + 1 <= map.length - 1,
  };

  options[position][direction].forEach((direction: Direction) => {
    withinBorders[direction] && nextPositions.push(handleCoordinate({ x, y, direction }));
  });

  return nextPositions;
};

export const energize = (start: Coordinate, map: Option[][]) => {
  const queue: { x: number; y: number; direction: Direction }[] = [start];

  const memory = new Set();
  const splitters = new Set();

  while (queue.length > 0) {
    const coordinate = queue.shift()!;
    const { x, y, direction } = coordinate;

    memory.add(`${x},${y}`);

    const newCoordinates = moveBeam({ x, y, direction }, map);

    if (newCoordinates.length > 1) {
      if (splitters.has(`${x},${y}`)) continue;
      splitters.add(`${x},${y}`);
    }

    queue.push(...newCoordinates);
  }

  return memory.size;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  return energize({ x: 0, y: 0, direction: "right" }, input as Option[][]);
};
