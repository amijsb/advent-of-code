import { digWholeLagoon, getInput } from "./01";

interface Directions {
  [key: number]: "R" | "D" | "L" | "U";
}

const directions: Directions = {
  0: "R",
  1: "D",
  2: "L",
  3: "U",
};

const digLagoonEdge = (input: string[]) => {
  let coordinates = [{ x: 0, y: 0 }];

  input.forEach((line, i) => {
    const { x, y } = coordinates[i];

    const hex = line.match(/#([^)]+)/)![1];
    const direction = Number(hex.slice(-1));

    const code = hex.slice(0, 5);
    const steps = parseInt(code, 16);

    if (directions[direction] === "L") coordinates.push({ x: x - steps, y });
    if (directions[direction] === "R") coordinates.push({ x: x + steps, y });
    if (directions[direction] === "U") coordinates.push({ x, y: y - steps });
    if (directions[direction] === "D") coordinates.push({ x, y: y + steps });
  });

  return coordinates;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const coordinates = digLagoonEdge(input);

  return digWholeLagoon(coordinates);
};
