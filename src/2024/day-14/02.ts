import { getInput, maxX, maxY, minX, minY } from "./01";

const createMap = (maxX: number, maxY: number) => {
  const row = Array.from({ length: maxX + 1 });
  const col = Array.from({ length: maxY + 1 });

  return col.map((_, y) => row.map((_, x) => "."));
};

const findTree = (robots: string[], map: string[][]) => {
  let seconds = 0;

  let parsedRobots = robots.map((robot) => {
    const [x, y, vx, vy] = robot.match(/-?\d+/g)!.map(Number);
    return { x, y, vy, vx };
  });

  while (true) {
    let mapCopy = [...map.map((row) => [...row])];

    seconds++;

    const newPositions = parsedRobots.map((robot) => {
      let { x, y, vx, vy } = robot;

      if (x + vx > maxX) x = x + vx - maxX - 1;
      else if (x + vx < minX) x = x + vx + maxX + 1;
      else x += vx;

      if (y + vy > maxY) y = y + vy - maxY - 1;
      else if (y + vy < minY) y = y + vy + maxY + 1;
      else y += vy;

      return { x, y, vx, vy };
    });

    parsedRobots = newPositions;

    newPositions.forEach(({ x, y }) => (mapCopy[y][x] = "#"));

    if (mapCopy.some((row) => row.join("").includes("#################"))) return seconds;
  }
};

export const part02 = (file: string) => {
  const robots = getInput(file);
  const map = createMap(maxX, maxY);

  return findTree(robots, map);
};
