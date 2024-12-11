import { findTrailheads, getInput, hike } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);

  const trailheads = findTrailheads(input);
  return hike(input, trailheads, true);
};
