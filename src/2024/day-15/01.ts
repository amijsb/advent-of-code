import { readFileSync } from "fs";
import { rowsToColumns } from "../../../helpers/rows-to-columns";

export type Direction = "^" | ">" | "v" | "<";
export type Map = string[][];

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const [map, directions] = fileContent.split("\n\n");

  return {
    map: map.split("\n").map((line) => line.split("")),
    directions: directions.split("\n").flatMap((line) => line.split("")) as Direction[],
  };
};

const robot = "@";
const obstacle = "#";
const space = ".";
const box = "O";

export const findStartingPosition = (map: Map) =>
  map.reduce(
    (acc, arr, index) => {
      const start = arr.indexOf(robot);
      if (start !== -1) return (acc = { x: start, y: index });
      return acc;
    },
    { x: 0, y: 0 },
  );

export const move = (direction: Direction, x: number, y: number, steps = 1) => {
  switch (direction) {
    case "^":
      return { x, y: y - steps };
    case ">":
      return { x: x + steps, y };
    case "v":
      return { x, y: y + steps };
    case "<":
      return { x: x - steps, y };
  }
};

export const lookAhead = (direction: Direction, x: number, y: number, map: Map) => {
  switch (direction) {
    case "^":
      return rowsToColumns(map)[x].slice(0, y).reverse();
    case ">":
      return map[y].slice(x + 1);
    case "v":
      return rowsToColumns(map)[x].slice(y + 1);
    case "<":
      return map[y].slice(0, x).reverse();
  }
};

export const moveRobot = (
  map: Map,
  directions: Direction[],
  robotPos: { x: number; y: number },
) => {
  let { x, y } = robotPos;

  directions.forEach((dir) => {
    const { x: nX, y: nY } = move(dir, x, y);

    if (map[nY][nX] === space) {
      map[y][x] = space;
      map[nY][nX] = robot;

      x = nX;
      y = nY;
    }

    if (map[nY][nX] === box) {
      const path = lookAhead(dir, x, y, map);
      const block = path.indexOf(obstacle);

      if (path.some((value, index) => value === space && index < block)) {
        const moveBy = path.indexOf(space);
        const { x: nbX, y: nbY } = move(dir, x, y, moveBy + 1);

        map[y][x] = space;
        map[nY][nX] = robot;
        map[nbY][nbX] = box;

        x = nX;
        y = nY;
      }
    }
  });

  return map;
};

export const findBoxes = (map: Map, box = "O") => {
  const coordinates: { x: number; y: number }[] = [];

  map.forEach((line, y) => {
    line.forEach((_, x) => {
      const position = map[y][x];

      if (position === box) coordinates.push({ x, y });
    });
  });

  return coordinates;
};

export const part01 = (file: string) => {
  const { map, directions } = getInput(file);
  const robotStart = findStartingPosition(map);

  const finalPositions = moveRobot(map, directions, robotStart);
  const boxCoordinates = findBoxes(finalPositions);

  return boxCoordinates.reduce((acc, arr) => {
    const { x, y } = arr;
    return acc + (y * 100 + x);
  }, 0);
};
