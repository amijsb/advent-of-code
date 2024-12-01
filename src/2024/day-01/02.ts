import { getInput } from "./01";

export const part02 = (file: string) => {
  const { left, right } = getInput(file);

  const similarityScores = left.map((value) => {
    const count = right.filter((x) => x === value).length;

    return count * value;
  });

  return similarityScores.reduce((a, b) => a + b, 0);
};
