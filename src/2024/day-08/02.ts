import { findAntennae, getAntinodes, getInput } from "./01";

export const part02 = (file: string) => {
  const { frequencies, map } = getInput(file);
  const antennae = findAntennae(frequencies, map);

  getAntinodes(antennae, map, true);
  return map.flat().filter((co) => co === "#").length;
};
