import { rowsToColumns } from "../../../helpers/rows-to-columns";
import { getInput, getTotalLoad, moveRocks } from "./01";

const totalCycles = 1000000000;

const spinPlatform = (
  platform: string[][],
  cycles: number,
  set: Set<string>,
): string[][] | number => {
  cycles -= 1;

  const north = moveRocks(rowsToColumns(platform));
  const west = moveRocks(rowsToColumns(north));
  const south = moveRocks(rowsToColumns(west.reverse()));
  const east = moveRocks(rowsToColumns(south.reverse()).reverse());

  const result = [...east].map((line) => line.reverse());

  if (set.has(JSON.stringify(result))) {
    const parsedSet = [...set];
    const start = parsedSet.indexOf(JSON.stringify(result));

    const length = set.size - start;
    const answerIndex = (totalCycles - start) % length;

    const pattern = parsedSet.slice(start).map((val) => JSON.parse(val));
    return getTotalLoad(pattern[answerIndex - 1]);
  }

  set.add(JSON.stringify(result));

  return cycles > 0 ? spinPlatform(result, cycles, set) : rowsToColumns(result);
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const set: Set<string> = new Set();

  return spinPlatform(input, totalCycles, set);
};
