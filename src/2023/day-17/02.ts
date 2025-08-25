import { getHeatLoss, getInput } from "./01";

// 819 too low

export const part02 = (file: string) => {
  const input = getInput(file);
  return getHeatLoss(
    [
      { x: 0, y: 1, total: 0, previous: "d" },
      { x: 1, y: 0, total: 0, previous: "r" },
    ],
    input,
    true,
  );
};
