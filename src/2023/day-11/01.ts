import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map((line) => line.split(""));
};

export const getGalaxyLocations = (universe: string[][]) => {
  const galaxyLocations: { x: number; y: number }[] = [];

  universe.forEach((col, y) => {
    col.forEach((node, x) => {
      if (node === "#") galaxyLocations.push({ x, y });
    });
  });

  return galaxyLocations;
};

export const expandTheUniverse = (
  input: string[][],
  galaxyLocations: { x: number; y: number }[],
  multiplication: number,
) => {
  let rowIndices: number[] = [];
  let colIndices: number[] = [];

  input.forEach((row, y) => !row.includes("#") && rowIndices.push(y));

  const columns: string[][] = [[]];

  input.forEach((row, y) => {
    row.forEach((_, x) => {
      if (!columns[x]) {
        columns.push([]);
      }

      columns[x].push(input[y][x]);
    });
  });

  columns.forEach((col, x) => !col.includes("#") && colIndices.push(x));

  colIndices = colIndices.map((index, i) => index + i * multiplication);
  rowIndices = rowIndices.map((index, i) => index + i * multiplication);

  const newCoordinates = galaxyLocations.map((location) => {
    let { x, y } = location;

    colIndices.forEach((index) => {
      if (x > index) x += multiplication;
    });

    rowIndices.forEach((index) => {
      if (y > index) y += multiplication;
    });

    return { x, y };
  });

  return newCoordinates;
};

const getDistances = (co1: { x: number; y: number }, co2: { x: number; y: number }) =>
  Math.abs(co1.x - co2.x) + Math.abs(co1.y - co2.y);

export const getLengths = (galaxyLocations: { x: number; y: number }[]) => {
  let lengths: number[] = [];

  while (galaxyLocations.length > 0) {
    const currentLocation = galaxyLocations.shift()!;
    const distances = galaxyLocations.map((location) => getDistances(currentLocation, location));

    lengths = [...lengths, ...distances];
  }

  return lengths.reduce((a, b) => a + b, 0);
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const galaxyLocations = getGalaxyLocations(input);

  const expandedUniverse = expandTheUniverse(input, galaxyLocations, 1);
  return getLengths(expandedUniverse);
};
