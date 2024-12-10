import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const [rules, updates] = fileContent.split("\n\n");

  const formattedRules = rules.split("\n").map((rule) => {
    const [a, b] = rule.split("|");
    return [Number(a), Number(b)];
  });

  const formattedUpdates = updates.split("\n").map((update) => {
    const numbers = update.split(",");
    return numbers.map(Number);
  });

  return { rules: formattedRules, updates: formattedUpdates };
};

export const checkUpdate = (rules: number[][], update: number[], correct = true) => {
  update.reduce((prev, curr, index) => {
    if (!correct) return curr;

    const remainingNumbers = update.slice(index);

    remainingNumbers.forEach((rn) => {
      const rule = rules.filter((rule) => rule.includes(prev) && rule.includes(rn));
      if (rule[0][0] !== prev) correct = false;
    });

    if (index !== update.length - 1) return (prev = curr);
    else return curr;
  });

  return correct;
};

export const getMiddleNumbers = (updates: number[][]) =>
  updates.map((update) => {
    const middle = Math.floor(update.length / 2);
    return update[middle];
  });

export const part01 = (file: string) => {
  const { rules, updates } = getInput(file);
  const checkedUpdates = updates.map((update) => checkUpdate(rules, update));

  const correctUpdates = checkedUpdates.reduce((acc: number[][], arr, index) => {
    return arr ? (acc = [...acc, updates[index]]) : acc;
  }, []);

  const middleNumbers = getMiddleNumbers(correctUpdates);
  return middleNumbers.reduce((a, b) => a + b, 0);
};
