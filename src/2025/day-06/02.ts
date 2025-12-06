import { rowsToColumns } from "../../../helpers/rows-to-columns";
import { getDivisions, getInput, solveAssignment } from "./01";

const parseProblems = (problems: string[]) => {
  const operatorIndex = problems.findIndex((value) => value[0] === "*" || value[0] === "+");

  const divisions = getDivisions(problems);

  const parsedProblems: string[][] = [];

  divisions.reduce((acc, arr, index) => {
    let bla = [];

    if (index === divisions.length - 1) bla = problems.map((problem) => problem.slice(arr));
    else bla = problems.map((problem) => problem.slice(acc, arr));

    const bloem = bla.map((line) => line.split(""));

    const operator = bla[operatorIndex].trim();

    const vloer = rowsToColumns(bloem).map((bla) => bla.slice(0, operatorIndex).join("").trim());
    parsedProblems.push([...vloer, operator].filter((value) => !!value));

    return (acc = arr);
  });

  return parsedProblems;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const problems = parseProblems(input);

  return solveAssignment(problems);
};
