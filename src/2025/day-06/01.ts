import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n");
};

const getIndices = (row: string, find: string) => {
  const indices = [];
  let index = row.indexOf(find);

  while (index !== -1) {
    indices.push(index);
    index = row.indexOf(find, index + 1);
  }

  return indices;
};

export const getDivisions = (problems: string[]) => {
  const operatorIndex = problems.findIndex((value) => value[0] === "*" || value[0] === "+");
  const plusIndices = getIndices(problems[operatorIndex], "+");
  const multiplyIndices = getIndices(problems[operatorIndex], "*");

  return [...plusIndices, ...multiplyIndices].sort((a, b) => a - b);
};

const parseProblems = (problems: string[]) => {
  const divisions = getDivisions(problems);

  const parsedProblems: string[][] = [];

  divisions.reduce((acc, arr, index) => {
    let bla = [];

    if (index === divisions.length - 1) bla = problems.map((problem) => problem.slice(arr).trim());
    else bla = problems.map((problem) => problem.slice(acc, arr).trim());

    parsedProblems.push(bla);

    return (acc = arr);
  });

  return parsedProblems;
};

export const solveAssignment = (problems: string[][]) => {
  let total = 0;

  problems.forEach((array) => {
    const operator = array[array.length - 1];
    const numbers = array.slice(0, array.length - 1).map(Number);

    if (operator === "*") total += numbers.reduce((a, b) => a * b);
    if (operator === "+") total += numbers.reduce((a, b) => a + b);
  });

  return total;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const problems = parseProblems(input);

  return solveAssignment(problems);
};
