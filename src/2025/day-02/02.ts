import { getInput, getRange } from "./01";

// @ts-ignore
const largestProperDivisor = (n: number) => {
  for (let i = Math.floor(n / 2); i >= 1; i--) {
    if (n % i === 0) return i;
  }
};

const checkId = (id: number) => {
  const idLength = String(id).length;
  const maxSequenceLenth = largestProperDivisor(idLength);

  const range = Array.from({ length: maxSequenceLenth! }, (_, i) => i + 1);

  let isFalse = false;

  range.forEach((num) => {
    if (idLength % num !== 0) return;

    const compare = String(id).slice(0, num);
    const regex = new RegExp(`(${compare})(?<=${compare})`, "g");

    const results = String(id).match(regex);
    const sequence = results?.reduce((a, b) => a + b, "");

    if (Number(sequence) === id) isFalse = true;
  });

  return isFalse ? id : 0;
};

export const part02 = (file: string) => {
  const input = getInput(file);

  const ranges = input.map((range) => getRange(range));
  const falseIds = ranges.flatMap((range) =>
    range.map((id) => checkId(id)).filter((num) => num !== 0),
  );

  return falseIds.reduce((a, b) => a + b, 0);
};
