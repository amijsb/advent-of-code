import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n").map((line) => line.split("-"));
};

export const getPairs = (pairs: string[][]) => {
  const finds: string[][] = [];

  pairs.forEach((pair) => {
    const [left, right] = pair;
    const rightMatches = pairs.filter((pair) => pair.includes(right));

    rightMatches.forEach((pair) => {
      const buddy = pair.filter((value) => value !== right && value !== left);
      const find = pairs.some((pair) => pair.includes(String(buddy)) && pair.includes(left));
      if (find) finds.push([left, right, String(buddy)]);
    });
  });

  const uniqueFinds = new Set<string>();

  const sortedFinds = finds.map((find) => find.sort());
  sortedFinds.forEach((find) => uniqueFinds.add(find.join(",")));

  return [...uniqueFinds];
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const pairs = getPairs(input);

  const pairsWithT = pairs.filter((pair) => {
    const [one, two, three] = pair.split(",");
    return [one, two, three].some((el) => el.startsWith("t"));
  });

  return pairsWithT.length;
};
