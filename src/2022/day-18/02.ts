import { findOverlap, getInput } from "./01";

const findOuterSides = (cubes: number[][]) => {
  const x = cubes.map(([x]) => x);
  const y = cubes.map(([, y]) => y);
  const z = cubes.map(([, , z]) => z);

  return {
    maxX: Math.max(...x),
    minX: Math.min(...x),
    maxY: Math.max(...y),
    minY: Math.min(...y),
    maxZ: Math.max(...z),
    minZ: Math.min(...z),
  };
};

const findAdjacentCubes = (cubes: number[][], cube: number[], compareAir: boolean) => {
  const { minX, maxX, minY, maxY, minZ, maxZ } = findOuterSides(cubes);

  const array: number[][] = [];
  const [x, y, z] = cube;

  if (x - 1 >= minX) array.push([x - 1, y, z]);
  if (y - 1 >= minY) array.push([x, y - 1, z]);
  if (z - 1 >= minZ) array.push([x, y, z - 1]);
  if (x + 1 <= maxX) array.push([x + 1, y, z]);
  if (y + 1 <= maxY) array.push([x, y + 1, z]);
  if (z + 1 <= maxZ) array.push([x, y, z + 1]);

  const parsedCubes = cubes.map((cube) => JSON.stringify(cube));

  return compareAir ? array.filter((cube) => !parsedCubes.includes(JSON.stringify(cube))) : array;
};

const findAir = (cubes: number[][], air = [[]], compareAir = false) => {
  const { minX, maxX, minY, maxY, minZ, maxZ } = findOuterSides(cubes);
  let allCubes: Set<string> = new Set();
  let queue: number[][] = [];

  allCubes.add(JSON.stringify([minX - 1, minY - 1, minZ - 1]));
  queue.push([minX - 1, minY - 1, minZ - 1]);

  const parsedCubes = cubes.map((cube) => JSON.stringify(cube));
  const parsedAir = air.map((cube) => JSON.stringify(cube));

  while (queue.length !== 0) {
    let currentPosition: number[] = queue.shift()!;
    if (currentPosition[0] === maxX && currentPosition[1] === maxY && currentPosition[2] === maxZ)
      break;

    findAdjacentCubes(cubes, currentPosition, compareAir).forEach((cube) => {
      if (!allCubes.has(JSON.stringify(cube))) {
        allCubes.add(JSON.stringify(cube));
        queue.push(cube);
      }
    });
  }

  return compareAir
    ? parsedAir.filter((cube) => ![...allCubes].includes(cube)).map((cube) => JSON.parse(cube))
    : [...allCubes].filter((cube) => !parsedCubes.includes(cube)).map((cube) => JSON.parse(cube));
};

const outerSurfaceArea = (innerAir: number[][], cubes: number[][], sides = 6) => {
  const adjacentSides = cubes.map((cube) => findOverlap(cubes, cube));
  const adjacentAir = innerAir.map((airCube) => findOverlap(innerAir, airCube));

  return (
    cubes.length * sides -
    adjacentSides.reduce((a, b) => a + b) -
    (innerAir.length * sides - adjacentAir.reduce((a, b) => a + b, 0))
  );
};

export const part02 = (file: string) => {
  const cubes = getInput(file);

  const totalAir = findAir(cubes);
  const innerAir = findAir(cubes, totalAir, true);

  return outerSurfaceArea(innerAir, cubes);
};
