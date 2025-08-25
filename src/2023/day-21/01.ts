import { readFileSync } from "fs";

export const rock = "#";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map((value) => value.split(""));
};

export const getStartingPosition = (map: string[][]) => {
  let x: number = 0;
  let y: number = 0;

  y = map.findIndex((value) => {
    const index = value.indexOf("S");
    x = index;
    return value.find((pos) => pos === "S");
  });

  return { x, y };
};

const targetSteps = 6;

const walkInGarden = (map: string[][]) => {
  const start = getStartingPosition(map);
  const end = { x: map[0].length - 1, y: map.length - 1 };
  const queue = [{ ...start, steps: 0 }];
  const memory = new Set();

  while (queue.length > 0) {
    const { x, y, steps } = queue.shift()!;

    if (memory.has(`${x},${y},${steps}`)) continue;
    memory.add(`${x},${y},${steps}`);

    if (steps === targetSteps) continue;

    const isWithinBounds = x >= 0 && x < end.x && y >= 0 && y < end.y;

    if (map[y][x + 1] !== rock && isWithinBounds) queue.push({ x: x + 1, y, steps: steps + 1 });
    if (map[y][x - 1] !== rock && isWithinBounds) queue.push({ x: x - 1, y, steps: steps + 1 });
    if (map[y + 1][x] !== rock && isWithinBounds) queue.push({ x, y: y + 1, steps: steps + 1 });
    if (map[y - 1][x] !== rock && isWithinBounds) queue.push({ x, y: y - 1, steps: steps + 1 });
  }

  const steps = [...memory].filter((el: any) => {
    const [_, __, steps] = el.split(",");
    return Number(steps) === targetSteps;
  });

  return steps.length;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  return walkInGarden(input);
};
