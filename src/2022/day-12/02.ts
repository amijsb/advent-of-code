//@ts-nocheck

import { getInput, parseInput, Coordinate, findPaths, findShortestPath } from "./01";

const getAllStartCoordinates = (coordinates: Coordinate[][], start: Coordinate) => {
  const vroem = coordinates.flat();
  return vroem.filter((co) => co.elevation === start.elevation);
};

const getAllPaths = (input: number[][], starts: Coordinate[], goal: Coordinate) => {
  const paths = starts.map((start) => {
    const { parsedInput } = parseInput(input);
    const vroem = findPaths(parsedInput, start, goal)?.coordinates;
    const v = { x: 43, y: 20, elevation: 26, visited: true, parent: [43, 21] };
    return vroem && v ? findShortestPath(v, vroem, start, []) : 0;
  });
  const vlaai = paths.filter((path) => path !== 0);
  return Math.min(...vlaai);
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const { parsedInput, startCoordinates, goalCoordinates } = parseInput(input);
  const bla: Coordinate[] = getAllStartCoordinates(parsedInput, startCoordinates);

  return getAllPaths(input, bla, goalCoordinates);
};
