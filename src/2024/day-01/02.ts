import { getInput } from "./01";

export const part02 = (file: string) => {
  const { left, right } = getInput(file);

  const similarityScores = left.map((value) => right.filter((x) => x === value).length * value);
  return similarityScores.reduce((a, b) => a + b, 0);
};
