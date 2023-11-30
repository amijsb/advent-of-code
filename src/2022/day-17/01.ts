import { readFileSync } from "fs";

export interface Coordinate {
  x: number;
  y: number;
}

export interface Shapes {
  "-": Coordinate[];
  "+": Coordinate[];
  "/": Coordinate[];
  "|": Coordinate[];
  "#": Coordinate[];
}

export const blocked = [
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
  { x: 4, y: 0 },
  { x: 5, y: 0 },
  { x: 6, y: 0 },
  { x: 7, y: 0 },
];

export const shapes: Shapes = {
  "-": [
    { x: 3, y: 4 },
    { x: 4, y: 4 },
    { x: 5, y: 4 },
    { x: 6, y: 4 },
  ],
  "+": [
    { x: 3, y: 5 },
    { x: 4, y: 6 },
    { x: 4, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 5 },
  ],
  "/": [
    { x: 3, y: 4 },
    { x: 4, y: 4 },
    { x: 5, y: 4 },
    { x: 5, y: 5 },
    { x: 5, y: 6 },
  ],
  "|": [
    { x: 3, y: 4 },
    { x: 3, y: 5 },
    { x: 3, y: 6 },
    { x: 3, y: 7 },
  ],
  "#": [
    { x: 3, y: 4 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 4, y: 5 },
  ],
};

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n")[0].split("");
};

export const fallingBlocks = (
  wind: string[],
  shapes: Shapes,
  blockedList = blocked,
  fallingStone = shapes["-"],
  jetIndex = 0,
  fallenStones = 0,
): number => {
  const order: ("-" | "+" | "/" | "|" | "#")[] = ["-", "+", "/", "|", "#"];

  while (fallenStones < 2022) {
    if (jetIndex === wind.length) {
      jetIndex = 0;
    }

    const jet = wind[jetIndex];

    const highestX = Math.max(...fallingStone.map((co: Coordinate) => co.x));
    const lowestX = Math.min(...fallingStone.map((co: Coordinate) => co.x));

    const blockedLeftX = fallingStone.some(
      ({ x, y }) => blockedList.findIndex((el) => el.x === x - 1 && el.y === y) !== -1,
    );
    const blockedRightX = fallingStone.some(
      ({ x, y }) => blockedList.findIndex((el) => el.x === x + 1 && el.y === y) !== -1,
    );

    fallingStone = fallingStone.map(({ x, y }) =>
      jet === "<"
        ? lowestX - 1 === 0 || blockedLeftX
          ? { x, y }
          : { x: x - 1, y }
        : highestX + 1 === 8 || blockedRightX
        ? { x, y }
        : { x: x + 1, y },
    );

    jetIndex += 1;

    const blockedY = fallingStone.some(
      ({ x, y }) => blockedList.findIndex((el) => el.x === x && el.y === y - 1) !== -1,
    );

    fallingStone = fallingStone.map(({ x, y }) => (blockedY ? { x, y } : { x, y: y - 1 }));

    if (blockedY) {
      fallenStones += 1;

      const stoneIndex = fallenStones % 5;
      const currentStone = order[stoneIndex];

      blockedList = [...blockedList, ...fallingStone];

      const newY = Math.max(...blockedList.map((co: Coordinate) => co.y));

      fallingStone = shapes[currentStone];
      fallingStone = fallingStone.map((co: Coordinate) => {
        const { x, y } = co;
        return { x, y: y + newY };
      });
    }
  }

  return Math.max(...blockedList.map((co: Coordinate) => co.y));
};

export const part01 = (file: string) => {
  const wind = getInput(file);
  return fallingBlocks(wind, shapes);
};
