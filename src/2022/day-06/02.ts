import { getInput, getMarker } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);
  return getMarker(input, 14);
};
