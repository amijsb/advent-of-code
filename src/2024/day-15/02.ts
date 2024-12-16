import { rowsToColumns } from "../../../helpers/rows-to-columns";
import { Direction, findBoxes, findStartingPosition, getInput, lookAhead, Map, move } from "./01";

const robot = "@";
const obstacle = "#";
const space = ".";

const enlargeMap = (map: Map) => {
  const largeMap: string[][] = Array.from({ length: map.length }, () => []);

  map.forEach((row, y) => {
    row.forEach((_, x) => {
      const current = map[y][x];
      switch (current) {
        case "#":
          return largeMap[y].push("#", "#");
        case "O":
          return largeMap[y].push("[", "]");
        case ".":
          return largeMap[y].push(".", ".");
        case "@":
          return largeMap[y].push("@", ".");
        default:
          return null;
      }
    });
  });

  return largeMap;
};

const getSibling = (map: Map, x: number, y: number) =>
  map[y][x] === "[" ? { x: x + 1, y } : { x: x - 1, y };

const findAdjacentBoxes = (
  map: Map,
  coordinates: { x: number; y: number }[],
  direction: Direction,
) => {
  let adjacentBoxes: { x: number; y: number }[] = [...coordinates];
  const stack = [...coordinates];

  const memory = new Set<string>();

  while (stack.length > 0) {
    const { x, y } = stack.shift()!;
    const { x: nX, y: nY } = move(direction, x, y);

    if (map[nY][nX] === obstacle) {
      adjacentBoxes = [];
      break;
    }

    if (memory.has(`${nX},${nY}`)) continue;
    memory.add(`${x},${y}`);

    if (map[nY][nX] === "[" || map[nY][nX] === "]") {
      adjacentBoxes.push({ x: nX, y: nY });
      stack.push({ x: nX, y: nY });

      const { x: sX, y: sY } = getSibling(map, nX, nY);

      if (memory.has(`${sX},${sY}`)) continue;
      memory.add(`${sX},${sY}`);

      adjacentBoxes.push({ x: sX, y: sY });
      stack.push({ x: sX, y: sY });
    }
  }

  return adjacentBoxes;
};

export const moveRobot = (
  map: Map,
  directions: Direction[],
  robotPos: { x: number; y: number },
) => {
  let { x, y } = robotPos;

  directions.forEach((dir) => {
    const { x: nX, y: nY } = move(dir, x, y);

    if (map[nY][nX] === space) {
      map[y][x] = space;
      map[nY][nX] = robot;

      x = nX;
      y = nY;
    }

    if (map[nY][nX] === "[" || map[nY][nX] === "]") {
      if (dir === "<" || dir === ">") {
        const path = lookAhead(dir, x, y, map);
        const block = path.indexOf(obstacle);

        if (path.some((value, index) => value === space && index < block)) {
          const moveBy = path.indexOf(space);
          const toBeMoved = path.slice(0, moveBy);

          if (dir === "<") toBeMoved.forEach((char, i) => (map[nY][nX - i - 1] = char));
          else toBeMoved.forEach((char, i) => (map[nY][nX + i + 1] = char));

          map[y][x] = space;
          map[nY][nX] = robot;

          x = nX;
          y = nY;
        }
      } else {
        const sibling = getSibling(map, nX, nY);
        const adjacentBoxes = findAdjacentBoxes(map, [{ x: nX, y: nY }, sibling], dir);

        adjacentBoxes.reverse().forEach(({ x, y }) => {
          const character = map[y][x];
          const { x: nX, y: nY } = move(dir, x, y);

          map[nY][nX] = character;
          map[y][x] = space;
        });

        if (adjacentBoxes.length) {
          map[y][x] = space;
          map[nY][nX] = robot;

          x = nX;
          y = nY;
        }
      }
    }
  });

  return map;
};

export const part02 = (file: string) => {
  const { map, directions } = getInput(file);
  const largeMap = enlargeMap(map);

  const robotStart = findStartingPosition(largeMap);
  const finalPositions = moveRobot(largeMap, directions, robotStart);

  const boxCoordinates = findBoxes(finalPositions, "[");
  return boxCoordinates.reduce((acc, arr) => {
    const { x, y } = arr;
    return acc + (y * 100 + x);
  }, 0);
};
