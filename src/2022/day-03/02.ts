import { getInput, getPriorities } from "./01";

const groupSize = 3;

const getGroups = (input: string[]) => {
  let groups: any[] = [];

  input.forEach((line, i) => {
    const index = Math.floor(i / groupSize);
    if (!groups[index]) {
      groups[index] = [];
    }
    groups[index].push(line);
  });

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
