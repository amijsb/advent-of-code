import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const [workflows, parts] = fileContent.split("\n\n");

  return { parts: parts.split("\n"), workflows: workflows.split("\n") };
};

interface Part {
  x: number;
  m: number;
  a: number;
  s: number;
}

const parseParts = (parts: string[]) =>
  parts.map((part) => {
    const xmas = part.split(",");
    let parsedPart: Part = { x: 0, m: 0, a: 0, s: 0 };

    xmas.forEach((string) => {
      const letter = String(string.match(/([a-z])/g));
      const value = Number(string.match(/(\d)+/g));

      parsedPart = { ...parsedPart, [letter]: value };
    });

    return parsedPart;
  });

export interface Workflows {
  [key: string]: string[][];
}

export const parseWorkflows = (workflows: string[]) => {
  let parsedWorkflows: Workflows = {};

  workflows.forEach((workflow) => {
    const name = String(workflow.match(/\w+(?={)/g));
    const flow = String(workflow.match(/(?={).+/g));

    let rules: any[] = [];

    flow.split(",").forEach((el) => {
      const instructions = el.split(":").map((el) => el.replace(/([{}])/g, " ").trim());
      rules = [...rules, instructions];
    });

    parsedWorkflows = { ...parsedWorkflows, [name]: rules };
  });

  return parsedWorkflows;
};

export const throughWorkflows = (part: Part, position: string, workflows: Workflows): string => {
  for (const flow of workflows[position]) {
    const [comparison, goTo] = flow;

    if (goTo) {
      const [category, operator, value] = comparison.split(/([><])/g);

      if (eval(part[category as "x" | "m" | "a" | "s"] + operator + value)) {
        return goTo === "A" || goTo === "R" ? goTo : throughWorkflows(part, goTo, workflows);
      }
    } else {
      return comparison === "R" || comparison === "A"
        ? comparison
        : throughWorkflows(part, comparison, workflows);
    }
  }

  return "de nada";
};

const getRatings = (parts: Part[], workflows: Workflows) =>
  parts.map((part) => {
    const { x, m, a, s } = part;
    const verdict = throughWorkflows(part, "in", workflows);

    return verdict === "A" ? x + m + a + s : 0;
  });

export const part01 = (file: string) => {
  const { parts, workflows } = getInput(file);
  const parsedParts = parseParts(parts);
  const parsedWorkflows = parseWorkflows(workflows);

  const ratings = getRatings(parsedParts, parsedWorkflows);
  return ratings.reduce((a, b) => a + b, 0);
};
