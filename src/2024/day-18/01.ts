import { readFileSync } from "fs";

export interface Coordinate {
  x: number;
  y: number;
}

interface NewCoordinate extends Coordinate {
  steps: number;
}

export const maxX = 70;
export const maxY = 70;

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map((line) => {
    const [x, y] = line.split(",");
    return { x: Number(x), y: Number(y) };
  });
};

export const createMap = () => {
  const row = Array.from({ length: maxX + 1 });
  const col = Array.from({ length: maxY + 1 });

  return col.map((_) => row.map((_) => "."));
};

export const dropBytes = (map: string[][], bytes: Coordinate[], maxBytes = 1024) => {
  let count = 0;

  while (count < maxBytes) {
    const { x, y } = bytes[count];
    map[y][x] = "#";

    count++;
  }

  return map;
};

export const findNextCoordinates = (currentPosition: NewCoordinate, map: string[][]) => {
  const { x, y, steps } = currentPosition;
  const nextCoordinates: NewCoordinate[] = [];

  const left = map[y][x - 1] ?? undefined;
  const right = map[y][x + 1] ?? undefined;
  const up = map[y - 1] && map[y - 1][x];
  const down = map[y + 1] && map[y + 1][x];

  if (left && left !== "#") nextCoordinates.push({ x: x - 1, y, steps: steps + 1 });
  if (right && right !== "#") nextCoordinates.push({ x: x + 1, y, steps: steps + 1 });
  if (up && up !== "#") nextCoordinates.push({ x, y: y - 1, steps: steps + 1 });
  if (down && down !== "#") nextCoordinates.push({ x, y: y + 1, steps: steps + 1 });

  return nextCoordinates;
};

export const exitMemory = (map: string[][], leastSteps = Infinity) => {
  const exit = { x: maxX, y: maxY };

  const stack = [{ x: 0, y: 0, steps: 0 }];
  const memory = new Map<string, number>();

  while (stack.length) {
    const { x, y, steps } = stack.shift()!;

    if (x === exit.x && y === exit.y) steps < leastSteps && (leastSteps = steps);

    const key = `${x},${y}`;
    if (memory.has(key) && memory.get(key)! <= steps) continue;
    memory.set(key, steps);

    const nextCoordinates = findNextCoordinates({ x, y, steps }, map);
    stack.push(...nextCoordinates);
  }

  if (leastSteps === Infinity) return "No exit found";

  return leastSteps;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const map = createMap();

  const corruptedMemory = dropBytes(map, input);
  return exitMemory(corruptedMemory);
};
