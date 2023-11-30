import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");
  const coordinates = lines.map((el) => {
    const coordinates = el.split(" -> ");
    return coordinates.map((el) => el.split(",").map(Number));
  });

  return coordinates;
};

const range = (start: number, stop: number) =>
  Array.from({ length: stop - start + 1 }, (_, i) => start + i);

export const getRockPositions = (caveData: number[][][]) => {
  const rock = caveData.map((path) => {
    const allCoordinates = path.reduce((acc: number[], coordinates: number[]) => {
      let array: number[] = [...acc];
      let value: number[] = [];

      if (
        acc[acc.length - 2] === coordinates[0] &&
        Math.abs(acc[acc.length - 1] - coordinates[1]) > 1 &&
        acc[acc.length - 1] < coordinates[1]
      ) {
        const bla = range(acc[acc.length - 1], coordinates[1]);

        bla.forEach((el) => {
          value.push(coordinates[0]);
          value.push(el);
        });

        return [...array, ...value];
      }
      if (
        acc[acc.length - 2] < coordinates[0] &&
        Math.abs(acc[acc.length - 2] - coordinates[0]) > 1 &&
        acc[acc.length - 1] === coordinates[1]
      ) {
        const bla = range(acc[acc.length - 2], coordinates[0]);

        bla.forEach((el) => {
          value.push(el);
          value.push(coordinates[1]);
        });

        return [...array, ...value];
      }
      if (
        acc[acc.length - 2] > coordinates[0] &&
        Math.abs(acc[acc.length - 2] - coordinates[0]) > 1 &&
        acc[acc.length - 1] === coordinates[1]
      ) {
        const bla = range(coordinates[0], acc[acc.length - 2]).reverse();

        bla.forEach((el) => {
          value.push(el);
          value.push(coordinates[1]);
        });

        return [...array, ...value];
      }
      if (
        acc[acc.length - 2] === coordinates[0] &&
        Math.abs(acc[acc.length - 1] - coordinates[1]) > 1 &&
        acc[acc.length - 1] > coordinates[1]
      ) {
        const bla = range(coordinates[1], acc[acc.length - 1]).reverse();

        bla.forEach((el) => {
          value.push(coordinates[0]);
          value.push(el);
        });

        return [...array, ...value];
      }

      return [...array, ...coordinates];
    });

    let blah: number[][] = [[]];

    allCoordinates.forEach((co, i) => {
      if (!blah[i]) {
        blah = [...blah, []];
      }

      if (i % 2 !== 0) {
        blah[i - 1].push(co);
      } else {
        blah[i].push(co);
      }
    });

    return blah.filter((el) => JSON.stringify(el) !== JSON.stringify([]));
  });

  const uniqueCoordinates: Set<string> = new Set();

  rock.flat().forEach((el) => uniqueCoordinates.add(JSON.stringify(el)));
  return [...uniqueCoordinates].map((el) => JSON.parse(el));
};

export const drawCave = (caveData: number[][][], rocks: number[][], bigCave = false) => {
  let xCoordinates: number[] = [];
  let yCoordinates: number[] = [];

  caveData.forEach((path) => {
    path.forEach((coordinate) => {
      const [x, y] = coordinate;
      xCoordinates.push(x);
      yCoordinates.push(y);
    });
  });

  const minWidth = Math.min(...xCoordinates);
  const maxWidth = Math.max(...xCoordinates);
  const depth = Math.max(...yCoordinates);

  const row = bigCave ? range(minWidth - 1000, maxWidth + 1000) : range(minWidth, maxWidth);
  const cave = Array.from({ length: bigCave ? depth + 3 : depth + 1 }, () => [...row]);

  rocks.forEach((co) => {
    const [x, y] = co;
    const index = cave[y].indexOf(x);
    cave[y].splice(index, 1, 0);
  });

  const caveFloor = Array.from({ length: maxWidth + 1000 - (minWidth - 1000) + 1 }, () => 0);

  bigCave && cave.splice(-1, 1, [...caveFloor]);

  return cave;
};

export const fallingSand = (sand: number[], cave: number[][]): number => {
  let [x, y] = [...sand];
  let xCo = cave[0].indexOf(x);

  let bla = -1;

  while (bla === -1) {
    if (cave[y][xCo - 1] === undefined || cave[y][xCo + 1] === undefined) {
      return (bla = 1);
    }

    if (cave[y + 1][xCo] === 0 && cave[y + 1][xCo - 1] === 0 && cave[y + 1][xCo + 1] === 0) {
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

  // hier nog iets aan doen.
  while (koe !== 1) {
    koe = fallingSand(sand, cave);
    vlaai++;
  }

  return vlaai - 1;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const rocks: number[][] = getRockPositions(input);
  const cave = drawCave(input, rocks);

  return fillCave(cave);
};
