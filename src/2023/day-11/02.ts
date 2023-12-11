import { expandTheUniverse, getGalaxyLocations, getInput, getLengths } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);
  const galaxyLocations = getGalaxyLocations(input);

  const expandedUniverse = expandTheUniverse(input, galaxyLocations, 999999);
  return getLengths(expandedUniverse);
};
