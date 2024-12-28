import { readFileSync } from "fs";

export interface Coordinate {
  x: number;
  y: number;
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map((line) => line.split(""));
};

const findNeighbours = (currentPosition: Coordinate, map: string[][]) => {
  const { x, y } = currentPosition;
  const nextCoordinates: Coordinate[] = [];

  const left = map[y][x - 1] ?? undefined;
  const right = map[y][x + 1] ?? undefined;
  const up = map[y - 1] && map[y - 1][x];
  const down = map[y + 1] && map[y + 1][x];

  const current = map[y][x];

  if (left && left === current) nextCoordinates.push({ x: x - 1, y });
  if (right && right === current) nextCoordinates.push({ x: x + 1, y });
  if (up && up === current) nextCoordinates.push({ x, y: y - 1 });
  if (down && down === current) nextCoordinates.push({ x, y: y + 1 });

  return nextCoordinates;
};

export const getRegions = (input: string[][]) => {
  const regions: Coordinate[][] = [];
  const visited = new Set<string>();

  input.forEach((line, y) =>
    line.forEach((_, x) => {
      const stack = [{ x, y }];
      const region: Coordinate[] = [];

      while (stack.length > 0) {
        const currentPosition = stack.pop()!;
        const { x, y } = currentPosition;

        if (visited.has(`${x},${y}`)) continue;

        visited.add(`${x},${y}`);
        region.push({ x, y });

        const neighbours = findNeighbours({ x, y }, input);
        stack.push(...neighbours);
      }

      if (region.length) regions.push(region);
    }),
  );

  return regions;
};

export const getPerimeter = (region: Coordinate[]) => {
  const perimeter: string[] = [];

  region.forEach(({ x, y }) => {
    const left = `${x - 1},${y}`;
    const right = `${x + 1},${y}`;
    const up = `${x},${y - 1}`;
    const down = `${x},${y + 1}`;

    if (!region.find(({ x, y }) => `${x},${y}` === left)) perimeter.push(left);
    if (!region.find(({ x, y }) => `${x},${y}` === right)) perimeter.push(right);
    if (!region.find(({ x, y }) => `${x},${y}` === up)) perimeter.push(up);
    if (!region.find(({ x, y }) => `${x},${y}` === down)) perimeter.push(down);
  });

  return perimeter;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const regions = getRegions(input);
  const perimeters = regions.map(getPerimeter);

  const result = perimeters.reduce((acc, curr, index) => {
    const region = regions[index].length;
    return acc + curr.length * region;
  }, 0);

  return result;
};
