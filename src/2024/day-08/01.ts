import { readFileSync } from "fs";
import { outOfBounds } from "../../../helpers/out-of-bounds";

interface Anntennae {
  [key: string]: {
    x: number;
    y: number;
  }[];
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const frequencies = new Set(fileContent.match(/([A-Za-z\d])/g));

  const map = fileContent.split("\n").map((line) => line.split(""));
  return { frequencies: [...frequencies], map };
};

export const findAntennae = (frequencies: string[], map: string[][]) =>
  frequencies.reduce((acc: Anntennae, frequency) => {
    const coordinates = map.reduce((acc: { x: number; y: number }[], arr, index) => {
      const antenna = arr.indexOf(frequency);
      if (antenna !== -1) return (acc = [...acc, { x: antenna, y: index }]);
      return acc;
    }, []);

    return { ...acc, [frequency]: coordinates };
  }, {});

export const getAntinodes = (antennae: Anntennae, map: string[][], harmonics = false) => {
  for (const frequency in antennae) {
    const coordinates = antennae[frequency];

    coordinates.reduce((acc, curr, index) => {
      const remainingCoordinates = coordinates.slice(index);

      remainingCoordinates.forEach((co) => {
        const x = acc.x - co.x;
        const y = acc.y - co.y;

        if (harmonics) {
          map[acc.y][acc.x] = "#";
          map[co.y][co.x] = "#";

          let multiplier = 1;

          while (true) {
            const newX = x * multiplier;
            const newY = y * multiplier;

            if (
              outOfBounds(acc.x + newX, acc.y + newY, map[0].length - 1, map.length - 1) &&
              outOfBounds(co.x - newX, co.y - newY, map[0].length - 1, map.length - 1)
            )
              break;

            if (!outOfBounds(acc.x + newX, acc.y + newY, map[0].length - 1, map.length - 1))
              map[acc.y + newY][acc.x + newX] = "#";

            if (!outOfBounds(co.x - newX, co.y - newY, map[0].length - 1, map.length - 1))
              map[co.y - newY][co.x - newX] = "#";

            multiplier++;
          }
        }

        if (!outOfBounds(acc.x + x, acc.y + y, map[0].length - 1, map.length - 1))
          map[acc.y + y][acc.x + x] = "#";
        if (!outOfBounds(co.x - x, co.y - y, map[0].length - 1, map.length - 1))
          map[co.y - y][co.x - x] = "#";
      });

      return (acc = curr);
    });
  }
};

export const part01 = (file: string) => {
  const { frequencies, map } = getInput(file);
  const antennae = findAntennae(frequencies, map);

  getAntinodes(antennae, map);
  return map.flat().filter((co) => co === "#").length;
};
