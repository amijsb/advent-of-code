import { getInput, getValues } from "./01";

export const getGroups = (input: string[]) => {
  const chunk = 3;

  const groups = input.reduce((resultArray: any[], item: string, index: number): string[][] => {
    const chunkIndex = Math.floor(index / chunk);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  return groups;
};

export const getOverlap = (groups: string[][]) => {
  const overlap = groups.map((group) => {
    const arrays = group.map((line) => line.split(""));
    const overlap = arrays.reduce((a, b) => a.filter((c) => b.includes(c)));
    const individualValues = new Set(overlap.flat()).values().next();
    return individualValues.value;
  });

  return overlap;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const groups = getGroups(input);

  const overlap = getOverlap(groups);
  const values = getValues(overlap);

  return values.reduce((a, b) => a + b);
};
