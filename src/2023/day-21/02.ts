import { getInput, getStartingPosition, rock } from "./01";

const targetSteps = 6;

const walkInGarden = (map: string[][]) => {
  const start = getStartingPosition(map);
  const queue = [{ ...start, steps: 0 }];
  const memory = new Set<string>();

  const calculateX = (x: number) => (x >= 0 ? Math.abs(x) : x + map[0].length);
  const calculateY = (y: number) => (y >= 0 ? Math.abs(y) : y + map.length);

  while (queue.length > 0) {
    const { x, y, steps } = queue.shift()!;

    if (memory.has(`${x},${y},${steps}`)) continue;
    memory.add(`${x},${y},${steps}`);

    if (steps === targetSteps) continue;

    if (map[calculateY(y % map.length)][calculateX((x + 1) % map[0].length)] !== rock)
      queue.push({ x: x + 1, y, steps: steps + 1 });
    if (map[calculateY(y % map.length)][calculateX((x - 1) % map[0].length)] !== rock)
      queue.push({ x: x - 1, y, steps: steps + 1 });
    if (map[calculateY((y + 1) % map.length)][calculateX(x % map[0].length)] !== rock)
      queue.push({ x, y: y + 1, steps: steps + 1 });
    if (map[calculateY((y - 1) % map.length)][calculateX(x % map[0].length)] !== rock)
      queue.push({ x, y: y - 1, steps: steps + 1 });
  }

  const steps = [...memory].filter((el) => {
    const [_, __, steps] = el.split(",");
    return Number(steps) === targetSteps;
  });

  console.log(steps.sort());

  return steps.length;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  return walkInGarden(input);
};
