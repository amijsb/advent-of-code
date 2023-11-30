//@ts-nocheck

import { readFileSync } from "fs";

export interface Coordinate {
  elevation: number;
  parent?: any;
  visited: boolean;
  x: number;
  y: number;
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");
  return lines.map((line) => line.split("").map((letter) => letter.charCodeAt(0) - 96));
};

export const parseInput = (input: number[][]) => {
  const startPosition = -13;
  const goal = -27;

  let startCoordinates = { x: 0, y: 0, elevation: 1, visited: false };
  let goalCoordinates = { x: 0, y: 0, elevation: 26, visited: false };

  input.forEach((line, i) => {
    const startIndex = line.indexOf(startPosition);
    const goalIndex = line.indexOf(goal);

    if (startIndex !== -1) startCoordinates = { ...startCoordinates, x: startIndex, y: i };
    if (goalIndex !== -1) goalCoordinates = { ...goalCoordinates, x: goalIndex, y: i };
  });

  const parsedInput: Coordinate[][] = input.map((line, i) =>
    line.map((letter, index) => {
      if (letter === startPosition) return startCoordinates;
      if (letter === goal) return goalCoordinates;
      return { x: index, y: i, elevation: letter, visited: false };
    }),
  );

  return { parsedInput, startCoordinates, goalCoordinates };
};

export const findPaths = (
  coordinates: Coordinate[][],
  startCoordinates: Coordinate,
  goalCoordinates: Coordinate,
): { coordinates: any; co: any } | string => {
  let queue: Coordinate[] = [];
  queue.push({ ...startCoordinates, visited: true });

  while (queue.length !== 0) {
    // change to shift?
    let co = queue.splice(0, 1)[0];
    if (co.x === goalCoordinates.x && co.y === goalCoordinates.y) return { coordinates, co };
    findAdjacentSquares(co, coordinates).forEach((square) => {
      if (!square.visited && reachableSquare(co, square)) {
        coordinates[square.y][square.x].visited = true;
        coordinates[square.y][square.x].parent = [co.x, co.y];

        queue.push(square);
      }
    });
  }
  return "Oh no! A dead end!";
};

export const findAdjacentSquares = (
  currentSquare: Coordinate,
  input: Coordinate[][],
): Coordinate[] => {
  let array: Coordinate[] = [];
  const { x, y } = currentSquare;

  if (input[y][x + 1] !== undefined) array.push(input[y][x + 1]);
  if (input[y][x - 1] !== undefined) array.push(input[y][x - 1]);
  if (input[y + 1] !== undefined) array.push(input[y + 1][x]);
  if (input[y - 1] !== undefined) array.push(input[y - 1][x]);

  return array;
};

export const reachableSquare = (currentSquare: Coordinate, adjacentSquare: Coordinate): boolean => {
  if (adjacentSquare.elevation < currentSquare.elevation) return true;
  return Math.abs(currentSquare.elevation - adjacentSquare.elevation) <= 1 ?? false;
};

export const findShortestPath = (
  currentSquare: Coordinate,
  array: Coordinate[][],
  startCoordinates: Coordinate,
  parentArray: any[],
): number => {
  const [cx, cy] = currentSquare.parent;
  const allCoordinates = array.flat();
  const parent = allCoordinates.filter((co) => co.x === cx && co.y === cy)[0];

  parentArray.push(parent);

  if (parent.x === startCoordinates.x && parent.y === startCoordinates.y) return parentArray.length;
  return findShortestPath(parent, array, startCoordinates, parentArray);
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const { parsedInput, startCoordinates, goalCoordinates } = parseInput(input);
  const { coordinates, co } = findPaths(parsedInput, startCoordinates, goalCoordinates);

  return findShortestPath(co, coordinates, startCoordinates, []);
};
