import { getInput } from "./01";

interface Score {
  [key: string]: number;
}

interface BaseScore {
  [key: string]: Score;
}

const score: Score = {
  X: 0,
  Y: 3,
  Z: 6,
};

const baseScore: BaseScore = {
  X: {
    A: 3,
    B: 1,
    C: 2,
  },
  Y: {
    A: 1,
    B: 2,
    C: 3,
  },
  Z: {
    A: 2,
    B: 3,
    C: 1,
  },
};

export const getScore = (input: string[][]) => {
  let count = 0;

  input.forEach((line: string[]) => {
    const opponent = line[0];
    const outcome = line[1];

    count += baseScore[outcome][opponent] + score[outcome];
  });

  return count;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const totalScore = getScore(input);

  return totalScore;
};
