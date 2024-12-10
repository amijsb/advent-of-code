import { outOfBounds } from "../../../helpers/out-of-bounds";
import { Direction, findStartingPosition, getInput, move, moveGuard, turnRight } from "./01";

const guardRoute = (
  map: string[][],
  direction: Direction,
  guardPosition: { x: number; y: number },
) => {
  let { x, y } = guardPosition;
  const bumps = new Set<string>();

  while (true) {
    let { x: newX, y: newY } = move(direction, x, y);
    if (outOfBounds(newX, newY, map[0].length - 1, map.length - 1)) return false;

    while (map[newY][newX] === "#" || map[newY][newX] === "O") {
      if (bumps.has(`${newX},${newY},${direction}}`)) return true;

      bumps.add(`${newX},${newY},${direction}}`);

      direction = turnRight(direction);

      newX = move(direction, x, y).x;
      newY = move(direction, x, y).y;
    }

    x = newX;
    y = newY;
  }
};

const loopGuard = (
  map: string[][],
  direction: Direction,
  guardPosition: { x: number; y: number },
): number => {
  let obstacleCount = 0;

  map.forEach((line, y) => {
    line.forEach((char, x) => {
      if (char === "X") {
        map[y][x] = "O";
        if (guardRoute(map, direction, guardPosition)) obstacleCount++;
        map[y][x] = "X";
      }
    });
  });

  return obstacleCount;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const startingPosition = findStartingPosition(input);

  const { map } = moveGuard(input, "^", startingPosition);
  return loopGuard(map, "^", startingPosition);
};
