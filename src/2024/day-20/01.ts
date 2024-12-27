import { readFileSync } from "fs";

interface Coordinate {
  x: number;
  y: number;
}

interface RaceCoordinate {
  x: number;
  y: number;
  steps: number;
  route: Coordinate[];
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map((line) => line.split(""));
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

const findNextCoordinates = (currentPosition: RaceCoordinate, map: string[][]) => {
  const { x, y, steps, route } = currentPosition;
  const nextCoordinates: RaceCoordinate[] = [];

  const left = map[y][x - 1] ?? undefined;
  const right = map[y][x + 1] ?? undefined;
  const up = map[y - 1] && map[y - 1][x];
  const down = map[y + 1] && map[y + 1][x];

  if (left && left !== "#")
    nextCoordinates.push({ x: x - 1, y, steps: steps + 1, route: [...route, { x, y }] });
  if (right && right !== "#")
    nextCoordinates.push({ x: x + 1, y, steps: steps + 1, route: [...route, { x, y }] });
  if (up && up !== "#")
    nextCoordinates.push({ x, y: y - 1, steps: steps + 1, route: [...route, { x, y }] });
  if (down && down !== "#")
    nextCoordinates.push({ x, y: y + 1, steps: steps + 1, route: [...route, { x, y }] });

  return nextCoordinates;
};

export const race = (
  map: string[][],
  start: { x: number; y: number },
  end: { x: number; y: number },
  best = Infinity,
) => {
  const stack: RaceCoordinate[] = [{ ...start, steps: 0, route: [] }];
  const memory = new Map<string, number>();

  let bestRoute: Coordinate[] = [];

  while (stack.length) {
    const { x, y, steps, route } = stack.shift()!;

    if (x === end.x && y === end.y) {
      steps < best && (best = steps);
      bestRoute = [...route, end];
    }

    const key = `${x},${y}`;
    if (memory.has(key) && memory.get(key)! <= steps) continue;
    memory.set(key, steps);

    const nextCoordinates = findNextCoordinates({ x, y, steps, route }, map);
    stack.push(...nextCoordinates);
  }

  return bestRoute;
};

export const cheat = (coordinates: Coordinate[], maxCheatingTime = 2) => {
  const cheats = new Map<number, number>();

  const stringifiedCoordinates = coordinates.map((coordinate) => JSON.stringify(coordinate));

  coordinates.forEach(({ x, y }) => {
    const cheatCoordinates = coordinates.filter(({ x: cox, y: coy }) => {
      const xDiff = Math.abs(cox - x);
      const yDiff = Math.abs(coy - y);

      return xDiff + yDiff <= maxCheatingTime;
    });

    const indexOfCoordinate = stringifiedCoordinates.indexOf(JSON.stringify({ x, y }));

    cheatCoordinates.forEach(({ x: cox, y: coy }) => {
      const cheatIndex = stringifiedCoordinates.indexOf(JSON.stringify({ x: cox, y: coy }));

      if (cheatIndex > indexOfCoordinate) {
        const cheatingTime = Math.abs(cox - x) + Math.abs(coy - y);
        const save = cheatIndex - indexOfCoordinate - cheatingTime;

        if (save > 0) {
          if (cheats.has(save)) cheats.set(save, cheats.get(save)! + 1);
          else cheats.set(save, 1);
        }
      }
    });
  });

  return [...cheats.entries()];
};

export const part01 = (file: string) => {
  const input = getInput(file);

  const s = findCoordinates(input, "S");
  const e = findCoordinates(input, "E");

  const coordinates = race(input, s, e);
  const cheats = cheat(coordinates);

  let total = 0;

  cheats.forEach((cheat) => {
    const [shortCut, totalCheats] = cheat;
    if (shortCut >= 100) total += totalCheats;
  });

  return total;
};
