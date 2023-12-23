import { Workflows, getInput, parseWorkflows } from "./01";

interface Ranges {
  x: number[];
  m: number[];
  a: number[];
  s: number[];
}

const ranges = {
  x: [1, 4000],
  m: [1, 4000],
  a: [1, 4000],
  s: [1, 4000],
};

const throughWorkflows = (
  ranges: Ranges,
  position: string,
  workflows: Workflows,
  total: number[][][],
): number[][][] => {
  for (const flow of workflows[position]) {
    const [comparison, goTo] = flow;

    if (goTo) {
      const [category, operator, value] = comparison.split(/([><])/g);

      let under: Ranges = { x: [], m: [], a: [], s: [] };
      let over: Ranges = { x: [], m: [], a: [], s: [] };

      const [prevLow, prevHigh] = ranges[category as "x" | "m" | "a" | "s"];

      if (operator === "<") {
        over = {
          ...ranges,
          [category]: [Number(value), prevHigh],
        };

        under = {
          ...ranges,
          [category]: [prevLow, Number(value) - 1],
        };

        ranges = over;

        if (goTo === "A") total.push([under.x, under.m, under.a, under.s]);
        goTo === "A" || goTo === "R" ? total : throughWorkflows(under, goTo, workflows, total);
      } else {
        under = {
          ...ranges,
          [category]: [prevLow, Number(value)],
        };

        over = {
          ...ranges,
          [category]: [Number(value) + 1, prevHigh],
        };

        ranges = under;

        if (goTo === "A") total.push([over.x, over.m, over.a, over.s]);
        goTo === "A" || goTo === "R" ? total : throughWorkflows(over, goTo, workflows, total);
      }
    } else {
      if (comparison === "A") total.push([ranges.x, ranges.m, ranges.a, ranges.s]);
      return comparison === "R" || comparison === "A"
        ? total
        : throughWorkflows(ranges, comparison, workflows, total);
    }
  }

  return total;
};

export const part02 = (file: string) => {
  const { workflows } = getInput(file);
  const parsedWorkflows = parseWorkflows(workflows);

  const allRanges = throughWorkflows(ranges, "in", parsedWorkflows, []);

  const totals = allRanges.map((ranges) => {
    const total = ranges.map((range) => range.reduce((a, b) => Math.abs(a - b) + 1));
    return total.reduce((a, b) => a * b);
  });

  return totals.reduce((a, b) => a + b);
};
