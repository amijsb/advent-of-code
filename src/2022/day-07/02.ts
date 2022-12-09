import { getInput, getDirectorySizes } from "./01";

const availableSpace = 70000000;
const update = 30000000;

export const part02 = (file: string) => {
  const input = getInput(file);
  const sizes = getDirectorySizes(input);

  const unusedSpace = availableSpace - Math.max(...sizes);
  const neededSpace = update - unusedSpace;

  const candidates = sizes.filter((size) => size >= neededSpace);
  return Math.min(...candidates);
};
