import { Card, getInput, getMatches } from "./01";

const calculateCopies = (matches: number[][]) => {
  const copies = Array(matches.length).fill(1);

  matches.forEach((match, matchIndex) => {
    const existingCopies = copies[matchIndex];

    match.forEach((_, i) => {
      copies[matchIndex + i + 1] += existingCopies;
    });
  });

  return copies;
};

export const part02 = (file: string) => {
  const cards: Card[] = getInput(file);
  const matches = getMatches(cards);

  const amountOfCopies = calculateCopies(matches);
  return amountOfCopies.reduce((a, b) => a + b, 0);
};
