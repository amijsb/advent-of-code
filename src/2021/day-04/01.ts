import { readFileSync } from "fs";

interface BingoCard {
  [key: number]: {
    [key: string]: number[];
  };
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const numbers = fileContent.split("\n")[0].split(",").map(Number);
  const rows = fileContent.split("\n").filter((line) => line !== "");

  rows.shift();

  const cards = rows.map((row) =>
    row
      .split(" ")
      .filter((num) => num !== "")
      .map(Number),
  );

  return { cards, numbers };
};

// 5 nummers in 1 row of 5 nummers in 1 column
// unmarkedNumbers opslaan
// markedNumbers opslaan
// winningNumber opslaan

// welk bord wint als eerst?

const testArray = [0, 0, 0, 1, 1, 0, 0, 2];

const isWinner = (bla: number[]) => {
  let count = 0;
  testArray.forEach((num) => {});
};

export const getBingo = (cards: number[][], numbers: number[]) => {
  let bingoCard: BingoCard = { 0: { rows: [], columns: [] } };
  let drawnNumbers: number[] = [];
  let winningNumber = -1;

  numbers.forEach((number) => {
    if (winningNumber === -1) {
      drawnNumbers.push(number);
    }

    cards.forEach((card, i) => {
      const index = Math.floor(i / 5);

      if (!bingoCard[index]) {
        bingoCard = { ...bingoCard, [index]: { rows: [], columns: [] } };
      }

      const xMark = card.findIndex((el) => el === number);

      if (xMark !== -1) {
        bingoCard[index].rows.push(xMark);
        bingoCard[index].columns.push(i);
      }
    });
  });

  console.log(bingoCard, drawnNumbers);
};

export const part01 = (file: string) => {
  const { cards, numbers } = getInput(file);
  const bingo = getBingo(cards, numbers);
  return "part-01";
};
