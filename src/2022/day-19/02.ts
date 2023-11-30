import { getInput, parseInput, openGeodes, Blueprint, initialState } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);
  const blueprints: Blueprint[] = parseInput(input);

  // const geodes = blueprints
  //   .slice(0, 3)
  //   .map((print) => openGeodes(print, [initialState], {}, 0, 32));

  // console.log(geodes);

  // return geodes.reduce((a, b) => a * b);
};
