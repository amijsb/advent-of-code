import { getInput, drawCave, getRockPositions } from "./01";

export const fallingSand = (sand: number[], cave: number[][]): number => {
  let [x, y] = [...sand];
  const initialCoordinate = cave[0].indexOf(x);
  let xCo = cave[0].indexOf(x);

  let bla = -1;

  while (bla === -1) {
    if (cave[y + 1][xCo] === 0 && cave[y + 1][xCo - 1] === 0 && cave[y + 1][xCo + 1] === 0) {
      if (y === 0 && xCo === initialCoordinate) {
        return (bla = 1);
      }
      cave[y].splice(xCo, 1, 0);
      return (bla = 0);
    }

    if (cave[y + 1][xCo] !== 0) {
      y += 1;
    }
    if (cave[y + 1][xCo] === 0 && cave[y + 1][xCo - 1] !== 0) {
      xCo -= 1;
      y += 1;
    }
    if (cave[y + 1][xCo] === 0 && cave[y + 1][xCo - 1] === 0 && cave[y + 1][xCo + 1] !== 0) {
      xCo += 1;
      y += 1;
    }
  }
  return bla;
};

export const fillCave = (cave: number[][]) => {
  const sand = [500, 0];
  let koe = 0;
  let vlaai = 0;

  while (koe !== 1) {
    vlaai++;
    koe = fallingSand(sand, cave);
  }

  return vlaai;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const rocks: number[][] = getRockPositions(input);
  const cave = drawCave(input, rocks, true);

  return fillCave(cave);
};
