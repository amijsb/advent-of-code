import { getInput, getMarker } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);
  const marker = getMarker(input, 14);

  return marker;
};
