import { readFileSync } from "fs";

export interface Card {
  yourNumbers: number[];
  winningNumbers: number[];
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");

  return lines.map((line) => {
    const numbers = line.split(": ")[1];
    const [yourNumbers, winningNumbers] = numbers.split(" | ");

    return {
      yourNumbers: yourNumbers.match(/(\d)+/g)!.map(Number),
      winningNumbers: winningNumbers.match(/(\d)+/g)!.map(Number),
    };
  });
};

export const getMatches = (cards: Card[]) =>
  cards.map(({ winningNumbers, yourNumbers }) =>
    winningNumbers.filter((num) => yourNumbers.includes(num)),
  );

export const part01 = (file: string) => {
  const cards: Card[] = getInput(file);
  const matches = getMatches(cards);

  const points = matches.map((match) => (match.length ? Math.pow(2, match.length - 1) : 0));
  return points.reduce((a, b) => a + b, 0);
};
