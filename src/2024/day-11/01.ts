import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split(" ").map(Number);
};

const flipStone = (stone: number) => {
  if (stone === 0) return [1];
  else if (String(stone).length % 2 === 0) {
    const middle = String(stone).length / 2;
    const [left, right] = [String(stone).slice(0, middle), String(stone).slice(middle)];
    return [left, right].map(Number);
  } else return [stone * 2024];
};

const updateStones = (stones: Record<number, number>) => {
  let newStones: Record<number, number> = {};

  Object.keys(stones).forEach((stone) => {
    const flippedStones = flipStone(Number(stone));

    flippedStones.forEach((flipped) => {
      if (!newStones[flipped]) newStones = { ...newStones, [flipped]: 0 };
      newStones[flipped] += stones[Number(stone)];
    });
  });

  return newStones;
};

export const blink = (stones: number[], blinks = 25) => {
  let mappedStones: Record<number, number> = {};

  stones.forEach((stone) => (mappedStones = { ...mappedStones, [stone]: 1 }));

  while (blinks > 0) {
    mappedStones = updateStones(mappedStones);
    blinks--;
  }

  return Object.values(mappedStones).reduce((a, b) => a + b, 0);
};

export const part01 = (file: string) => {
  const input = getInput(file);

  return blink(input);
};
