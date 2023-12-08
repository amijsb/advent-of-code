import { readFileSync } from "fs";
import { numericalValues, availableHands } from "./helpers";

export interface PokerHand {
  hand: number[];
  bid: number;
}

export interface HandWithType {
  hand: number[];
  bid: number;
  type: number;
}

export const getInput = (file: string, numValues: { [key: string]: string }) => {
  const fileContent = readFileSync(file, "utf-8");
  const hands = fileContent.split("\n");

  return hands.map((hand) => {
    const [inHand, bid] = hand.split(" ");
    const convertedHand = inHand.split("").map((value) => {
      if (!value.match(/(\d)+/g)) {
        return Number(value.replaceAll(/([A-Z])/g, numValues[value]));
      }
      return Number(value);
    });

    return { hand: convertedHand, bid: Number(bid) };
  });
};

const playPoker = (input: PokerHand[]): HandWithType[] =>
  input.map(({ hand, bid }) => {
    let cards: { [key: number]: number } = {};

    hand.forEach((card) => {
      if (!cards[card]) {
        cards = { ...cards, [card]: 1 };
      } else {
        cards[card]++;
      }
    });

    const sortedHands = Object.values(cards).sort((a, b) => a - b);

    return { hand, bid, type: availableHands[String(sortedHands)] };
  });

export const getRanks = (poker: HandWithType[]) => {
  const sortedHands = poker.sort(
    (a, b) =>
      a.type - b.type ||
      a.hand[0] - b.hand[0] ||
      a.hand[1] - b.hand[1] ||
      a.hand[2] - b.hand[2] ||
      a.hand[3] - b.hand[3] ||
      a.hand[4] - b.hand[4],
  );

  return sortedHands.map((hand, i) => ({ ...hand, rank: i + 1 }));
};

export const part01 = (file: string) => {
  const input: PokerHand[] = getInput(file, numericalValues);
  const poker = playPoker(input);
  const rankedHands = getRanks(poker);

  const winnings = rankedHands.map((hands) => {
    const { bid, rank } = hands;
    return bid * rank;
  });

  return winnings.reduce((a, b) => a + b, 0);
};
