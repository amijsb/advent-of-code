import { readFileSync } from "fs";

interface Coordinate {
  x: number;
  y: number;
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n");
};

const digLagoonEdge = (input: string[]) => {
  let coordinates = [{ x: 0, y: 0 }];

  input.forEach((line, i) => {
    const direction = line[0];
    const steps = Number(line.match(/(\d)+(?= )/g));

    const { x, y } = coordinates[i];

    if (direction === "L") coordinates.push({ x: x - steps, y });
    if (direction === "R") coordinates.push({ x: x + steps, y });
    if (direction === "U") coordinates.push({ x, y: y - steps });
    if (direction === "D") coordinates.push({ x, y: y + steps });
  });

  return coordinates;
};

const greatestCommonDivisor = (a: number, b: number): number =>
  b === 0 ? a : greatestCommonDivisor(b, a % b);

// The digWholeLagoon function combines Pick's theorem and the Shoelace formula

export const digWholeLagoon = (coordinates: Coordinate[]): number => {
  let area = 0;
  let boundaryPoints = 0;

  const n = coordinates.length;

  coordinates.forEach((coordinate, i) => {
    const { x, y } = coordinate;
    const next = coordinates[(i + 1) % n];

    const dx = Math.abs(next.x - x);
    const dy = Math.abs(next.y - y);
    const gcd = greatestCommonDivisor(dx, dy);

    area += x * next.y - y * next.x;
    boundaryPoints += gcd;
  });

  area = Math.abs(area) / 2;

  return area - boundaryPoints / 2 + 1 + boundaryPoints;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const coordinates = digLagoonEdge(input);

  return digWholeLagoon(coordinates);
};
