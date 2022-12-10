import { getInput, getPriorities } from "./01";

const getGroups = (input: string[]) => {
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

const getOverlap = (groups: string[][]) => {
  let overlap: string[] = [];

  groups.forEach((group) => {
    const arrays = group.map((line) => line.split(""));
    const intersection = arrays.reduce((a, b) => a.filter((c) => b.includes(c)));

    overlap.push(...new Set(intersection));
  });

  return overlap;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const groups = getGroups(input);

  const overlap = getOverlap(groups);
  const priorities = getPriorities(overlap);

  return priorities.reduce((a, b) => a + b);
};
