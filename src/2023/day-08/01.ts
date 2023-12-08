import { readFileSync } from "fs";

export interface Nodes {
  [key: string]: string[];
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");

  const instructions = lines[0].replaceAll("L", "0").replaceAll("R", "1");
  let nodes: Nodes = {};

  lines.slice(2).forEach((node) => {
    const [dir, left, right] = node.match(/([A-Z])\w+/g)!;
    nodes = { ...nodes, [dir]: [left, right] };
  });

  return { instructions, nodes };
};

export const navigateWasteland = (
  instructions: string,
  nodes: Nodes,
  startingPosition: string,
  target: string,
) => {
  let directions = instructions.split("").map(Number);
  let currentPosition = startingPosition;

  let reachedEnd = false;
  let steps = 0;

  while (!reachedEnd) {
    steps++;
    const direction = directions.shift()!;
    directions.push(direction);

    const newPosition = nodes[currentPosition][direction];

    if (newPosition.endsWith(target)) {
      reachedEnd = true;
      break;
    }

    currentPosition = newPosition;
  }

  return steps;
};

export const part01 = (file: string) => {
  const { instructions, nodes } = getInput(file);
  return navigateWasteland(instructions, nodes, "AAA", "ZZZ");
};
