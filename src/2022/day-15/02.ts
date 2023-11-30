import { getInput, manhattanDistance, MDco } from "./01";

export const getPartialOverlap = (accumulator: number[], currentValue: number[]) => {
  if (
    (accumulator[0] >= currentValue[0] && accumulator[accumulator.length - 1] <= currentValue[1]) ||
    (currentValue[0] <= accumulator[accumulator.length - 1] && currentValue[0] >= accumulator[0]) ||
    (currentValue[1] <= accumulator[accumulator.length - 1] && currentValue[1] >= accumulator[0])
  )
    return [...accumulator, ...currentValue].sort((a, b) => a - b);

  return [...currentValue];
};

export const getCoordinates = (coordinates: MDco[], targetRow: number, limit: number) => {
  let ranges: { [key: number]: number[][] } = { [targetRow]: [] };

  coordinates.forEach((coordinate) => {
    const { sensor, manhattanDistance } = coordinate;
    const { x, y } = sensor;

    if (y + manhattanDistance >= targetRow && y - manhattanDistance <= targetRow) {
      const distanceToRow = Math.abs(y - targetRow);
      const pointsOnRow = Math.abs(manhattanDistance - distanceToRow) * 2 + 1;
      const startX = x - Math.abs(manhattanDistance - distanceToRow);

      const totalPoints = startX < 0 ? pointsOnRow + startX : pointsOnRow;
      const beginning = startX < 0 ? 0 : startX;
      const range = beginning + totalPoints > limit ? limit : beginning + totalPoints;

      if (!ranges[targetRow]) {
        ranges = { ...ranges, [targetRow]: [] };
      }

      ranges[targetRow].push([beginning, range]);
    }
  });

  const hallo = ranges[targetRow]
    .sort((a, b) => a[0] - b[0])
    .reduce((acc: number[], cur: number[]) => {
      let array = [...acc];
      return getPartialOverlap(array, cur);
    });

  return hallo[0] - 1 !== -1
    ? { p: true, coordinate: [hallo[0] - 1, targetRow] }
    : { p: false, coordinate: [] };
};

const limit = 4000000;

export const part02 = (file: string) => {
  const input = getInput(file);
  const distances = manhattanDistance(input);

  const getTuningFrequency = () => {
    let a: boolean = false;
    while (!a) {
      for (let row = 0; row <= limit; row++) {
        const { p, coordinate } = getCoordinates(distances, row, limit);
        a = p;
        if (p === true) return coordinate[0] * 4000000 + coordinate[1];
      }
    }
    return;
  };

  return getTuningFrequency();
};
