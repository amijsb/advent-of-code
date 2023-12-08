import { PokerHand, getInput, getRanks } from "./01";
import { availableHands, numericalValues } from "./helpers";

export const playPoker = (input: PokerHand[]) =>
  input.map(({ hand, bid }) => {
    let cards: { [key: number]: number } = {};
    let jokers = 0;

    hand.forEach((card) => {
      if (card === 1) {
        jokers += 1;
      } else {
        if (!cards[card]) {
          cards = { ...cards, [card]: 1 };
        } else {
          cards[card]++;
        }
      }
    });

    if (jokers === 5) {
      cards = { 1: 5 };
    }

    const highestValue = Math.max(...Object.values(cards));

    let sortedHands = Object.values(cards).sort((a, b) => a - b);
    const update = sortedHands.lastIndexOf(highestValue);

    if (jokers < 5) {
      sortedHands[update] += jokers;
    }

    return { hand, bid, type: availableHands[String(sortedHands)] };
  });

export const part02 = (file: string) => {
  const input = getInput(file, { ...numericalValues, J: "1" });
  const poker = playPoker(input);
  const rankedHands = getRanks(poker);

  const winnings = rankedHands.map((hands) => {
    const { bid, rank } = hands;
    return bid * rank;
  });

  return winnings.reduce((a, b) => a + b, 0);
};
