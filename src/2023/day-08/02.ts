import { getInput, navigateWasteland, Nodes } from "./01";

const findLCMOfArray = (numbers: number[]): number => {
  const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
  const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);
  return numbers.reduce(lcm);
};

const ghostSteps = (instructions: string, nodes: Nodes) => {
  const currentPositions = Object.keys(nodes).filter((key) => key.endsWith("A"));

  const stepsPerPosition = currentPositions.map((position) =>
    navigateWasteland(instructions, nodes, position, "Z"),
  );

  return findLCMOfArray(stepsPerPosition);
};

export const part02 = (file: string) => {
  const { instructions, nodes } = getInput(file);
  return ghostSteps(instructions, nodes);
};
