import { findCoordinates, getInput, moveReindeer, part01 } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);

  const s = findCoordinates(input, "S");
  const e = findCoordinates(input, "E");

  const best = part01(file);
  const { bestSeats } = moveReindeer(input, s, e, best);

  return bestSeats.size;
};
