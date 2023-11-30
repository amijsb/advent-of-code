import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");
  return lines.map((line) => line.split(",").map(Number));
};

export const findOverlap = (cubes: number[][], cube: number[], overlap = 0) => {
  const otherCubes = cubes.filter((otherCube: number[]) => otherCube !== cube);
  const [x, y, z] = cube;

  otherCubes.forEach((oCube) => {
    const [ox, oy, oz] = oCube;
    Math.abs(ox - x) + Math.abs(oy - y) + Math.abs(oz - z) === 1 && overlap++;
  });

  return overlap;
};

export const surfaceArea = (cubes: number[][], sides = 6) => {
  const adjacentSides = cubes.map((cube) => findOverlap(cubes, cube));
  return cubes.length * sides - adjacentSides.reduce((a, b) => a + b);
};

export const part01 = (file: string) => {
  const cubes = getInput(file);
  return surfaceArea(cubes);
};
