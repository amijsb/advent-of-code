import { checkUpdate, getInput, getMiddleNumbers } from "./01";

const rectifyUpdate = (rules: number[][], update: number[]) => {
  const reorderedUpdate = update.reduce((prev: number[], curr) => {
    if (!prev.length) return (prev = [curr]);

    const compare = prev[prev.length - 1];

    const rule = rules.filter((rule) => rule.includes(curr) && rule.includes(compare));

    if (rule[0][0] !== compare) {
      prev.pop();
      prev = [...prev, curr, compare];
    } else prev = [...prev, curr];

    return prev;
  }, []);

  const correct = checkUpdate(rules, reorderedUpdate);

  if (!correct) return rectifyUpdate(rules, reorderedUpdate);
  return reorderedUpdate;
};

export const part02 = (file: string) => {
  const { rules, updates } = getInput(file);
  const checkedUpdates = updates.map((update) => checkUpdate(rules, update));

  const incorrectUpdates = checkedUpdates.reduce((acc: number[][], arr, index) => {
    return !arr ? (acc = [...acc, updates[index]]) : acc;
  }, []);

  const rectifiedUpdates = incorrectUpdates.map((update) => rectifyUpdate(rules, update));
  const middleNumbers = getMiddleNumbers(rectifiedUpdates);

  return middleNumbers.reduce((a, b) => a + b, 0);
};
