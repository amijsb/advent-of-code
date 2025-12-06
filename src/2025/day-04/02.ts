import { getAccessibleRolls, getInput } from "./01";

const space = ".";

const removeRolls = (map: string[][], removedRolls = 0) => {
  while (true) {
    const accessibleRolls = getAccessibleRolls(map);

    if (accessibleRolls.length === 0) break;

    accessibleRolls.forEach(({ x, y }) => (map[y][x] = space));
    removedRolls += accessibleRolls.length;

    return removeRolls(map, removedRolls);
  }

  return removedRolls;
};

export const part02 = (file: string) => {
  const input = getInput(file);

  return removeRolls(input);
};
