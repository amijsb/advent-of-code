import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const patterns = fileContent.split("\n\n");

  return patterns.map((pattern) => pattern.split("\n"));
};

const compareStrings = (one: string, two: string) => {
  let count = 0;

  for (let i = 0; i < one.length; i++) {
    const char1 = one[i];
    const char2 = two[i];

    if (char1 !== char2) count++;
  }

  return count;
};

const findReflection = (
  pattern: string[],
  allowedDifference: number,
  horizontal = true,
): number => {
  let mirror: number = 0;

  pattern.forEach((_, i) => {
    const compare = pattern.slice(0, i).reverse();
    const rest = pattern.slice(i);

    const difference = Math.abs(compare.length - rest.length);

    if (difference > 0) {
      compare.length > rest.length
        ? compare.splice(rest.length, difference)
        : rest.splice(compare.length, difference);
    }

    let comparison = 0;

    compare.forEach((line, lineIndex) => {
      comparison += compareStrings(line, rest[lineIndex]);
    });

    if (comparison === allowedDifference) mirror = i;
  });

  const columns: string[][] = [[]];
  const transformPattern = pattern.map((row) => row.split(""));

  transformPattern.forEach((row, y) => {
    row.forEach((_, x) => {
      if (!columns[x]) {
        columns.push([]);
      }

      columns[x].push(transformPattern[y][x]);
    });
  });

  if (!mirror) {
    return findReflection(
      columns.map((column) => String(column).replaceAll(",", "")),
      allowedDifference,
      false,
    );
  }

  return horizontal ? mirror * 100 : mirror;
};

export const getReflections = (patterns: string[][], allowedDifference: number) =>
  patterns.map((pattern) => findReflection(pattern, allowedDifference));

export const part01 = (file: string) => {
  const input = getInput(file);
  const summary = getReflections(input, 0);

  return summary.reduce((a, b) => a + b, 0);
};
