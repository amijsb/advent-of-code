import { getInput, makeDesigns } from "./01";

export const part02 = (file: string) => {
  const { towels, patterns } = getInput(file);

  return makeDesigns(towels, patterns).allPossible;
};
