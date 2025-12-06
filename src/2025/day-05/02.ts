import { getInput } from "./01";

const freshIngredientIds = (ranges: number[][]) => {
  const sortedRanges = ranges.sort((a, b) => a[0] - b[0]);

  const overlap = sortedRanges.reduce(
    (acc: number[][], arr, index) => {
      if (index === 0) acc.splice(index, 1, arr);

      if (arr[0] > acc[acc.length - 1][1]) return (acc = [...acc, arr]);

      if (
        arr[0] >= acc[acc.length - 1][0] &&
        arr[0] <= acc[acc.length - 1][1] &&
        arr[1] >= acc[acc.length - 1][1]
      )
        acc.splice(acc.length - 1, 1, [acc[acc.length - 1][0], arr[1]]);

      return acc;
    },
    [[]],
  );

  return overlap;
};

export const part02 = (file: string) => {
  const { ranges } = getInput(file);

  const ids = freshIngredientIds(ranges);
  const amount = ids.map(([min, max]) => max - min + 1);

  return amount.reduce((a, b) => a + b);
};
