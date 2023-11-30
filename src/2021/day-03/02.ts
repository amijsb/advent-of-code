import { getInput, binaryToInteger } from "./01";

const getRatings = (lines: number[][], scrub = false) => {
  let value: number[] = [];
  let array = lines;

  lines[0].map((_, i) => {
    let count = 0;

    array.forEach((line, index) => {
      count += line[i];

      if (index === array.length - 1) {
        count >= array.length / 2
          ? (array = array.filter((line) => (scrub ? line[i] === 0 : line[i] === 1)))
          : (array = array.filter((line) => (scrub ? line[i] === 1 : line[i] === 0)));
      }
    });

    if (array.length === 1) {
      value = array.flat();
    }
  });

  return binaryToInteger(value);
};

export const part02 = (file: string) => {
  const input = getInput(file);

  const oxGenRating = getRatings(input);
  const co2ScrubRating = getRatings(input, true);

  return oxGenRating * co2ScrubRating;
};
