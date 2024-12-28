import { Coordinate, getInput, getRegions } from "./01";

const getCorners = (regions: Coordinate[][]) =>
  regions.map((region) => {
    const stringifiedRegion = region.map(({ x, y }) => `${x},${y}`);

    let corners = 0;

    region.forEach(({ x, y }) => {
      const groups = [
        [`${x},${y - 1}`, `${x - 1},${y - 1}`, `${x - 1},${y}`],
        [`${x},${y - 1}`, `${x + 1},${y - 1}`, `${x + 1},${y}`],
        [`${x + 1},${y}`, `${x + 1},${y + 1}`, `${x},${y + 1}`],
        [`${x},${y + 1}`, `${x - 1},${y + 1}`, `${x - 1},${y}`],
      ];

      groups.forEach((group) => {
        if (
          group.every((coordinate) => !stringifiedRegion.includes(coordinate)) ||
          (!stringifiedRegion.includes(group[1]) &&
            stringifiedRegion.includes(group[0]) &&
            stringifiedRegion.includes(group[2])) ||
          (stringifiedRegion.includes(group[1]) &&
            !stringifiedRegion.includes(group[0]) &&
            !stringifiedRegion.includes(group[2]))
        )
          corners++;
      });
    });

    return corners;
  });

export const part02 = (file: string) => {
  const input = getInput(file);
  const regions = getRegions(input);

  const corners = getCorners(regions);

  const result = corners.reduce((acc, curr, index) => {
    const region = regions[index].length;
    return acc + curr * region;
  }, 0);

  return result;
};
