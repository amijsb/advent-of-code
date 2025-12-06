import { rowsToColumns } from "@/helpers/rows-to-columns";
import { getDivisions, getInput, solveAssignment } from "./01";

const parseProblems = (problems: string[]) => {
  const operatorIndex = problems.findIndex((value) => value[0] === "*" || value[0] === "+");

  const divisions = getDivisions(problems);

  const parsedProblems: string[][] = [];

  divisions.reduce((acc, arr, index) => {
    let problem = [];

    if (index === divisions.length - 1) problem = problems.map((problem) => problem.slice(arr));
    else problem = problems.map((problem) => problem.slice(acc, arr));

    const splits = problem.map((line) => line.split(""));
    const operator = problem[operatorIndex].trim();

    const parsed = rowsToColumns(splits).map((split) =>
      split.slice(0, operatorIndex).join("").trim(),
    );

    parsedProblems.push([...parsed, operator].filter((value) => !!value));

    return (acc = arr);
  });

  return parsedProblems;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const problems = parseProblems(input);

  return solveAssignment(problems);
};
