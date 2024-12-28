import { getInput, blink } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);

  return blink(input, 75);
};
