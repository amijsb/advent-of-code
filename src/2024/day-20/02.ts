import { cheat, findCoordinates, getInput, race } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);

  const s = findCoordinates(input, "S");
  const e = findCoordinates(input, "E");

  const coordinates = race(input, s, e);
  const cheats = cheat(coordinates, 20);

  let total = 0;

  cheats.forEach((cheat) => {
    const [shortCut, totalCheats] = cheat;
    if (shortCut >= 100) total += totalCheats;
  });

  return total;
};
