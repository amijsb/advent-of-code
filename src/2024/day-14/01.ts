import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n");
};

export const minX = 0;
export const minY = 0;
export const maxX = 100;
export const maxY = 102;

const moveRobots = (robots: string[]) =>
  robots.map((robot) => {
    let seconds = 100;

    let [x, y, vx, vy] = robot.match(/-?\d+/g)!.map(Number);

    while (seconds > 0) {
      seconds--;

      if (x + vx > maxX) x = x + vx - maxX - 1;
      else if (x + vx < minX) x = x + vx + maxX + 1;
      else x += vx;

      if (y + vy > maxY) y = y + vy - maxY - 1;
      else if (y + vy < minY) y = y + vy + maxY + 1;
      else y += vy;
    }

    return { x, y };
  });

const robotsPerQuadrant = (positions: { x: number; y: number }[]) => {
  const middleX = maxX / 2;
  const middleY = maxY / 2;

  const remainingRobots = positions.filter(({ x, y }) => x !== middleX && y !== middleY);

  const qOne = remainingRobots.filter(({ x, y }) => x < middleX && y < middleY).length;
  const qTwo = remainingRobots.filter(({ x, y }) => x > middleX && y < middleY).length;
  const qThree = remainingRobots.filter(({ x, y }) => x < middleX && y > middleY).length;
  const qFour = remainingRobots.filter(({ x, y }) => x > middleX && y > middleY).length;

  return [qOne, qTwo, qThree, qFour];
};

export const part01 = (file: string) => {
  const robots = getInput(file);
  const positions = moveRobots(robots);

  const qRobots = robotsPerQuadrant(positions);
  return qRobots.reduce((a, b) => a * b);
};
