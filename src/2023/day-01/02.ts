import { getInput } from "./01";
import { numbers, searchTerm } from "./helpers";

const parseInput = (input: string[]) =>
  input.map((line) => {
    const firstIndices = searchTerm.map((term) => line.indexOf(term));
    const lastIndices = searchTerm.map((term) => line.lastIndexOf(term));

    const indices = [...firstIndices, ...lastIndices.filter((i) => !firstIndices.includes(i))];
    const filteredIndices = indices.sort((a, b) => a - b).filter((num) => num !== -1);

    const substrings = filteredIndices.map((i) => line.slice(i));

    return substrings.map(
      (string) =>
        string.match(
          /((zero)|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|(\d))/g,
        )![0],
    );
  });

const getCalibrationValues = (parsedInput: string[][]) =>
  parsedInput.map((input) => {
    const numericals = input.map((string) => {
      const nums = numbers.find(({ spelledOut }) => string === spelledOut)?.numerical;
      return nums === undefined ? string : nums;
    });

    return Number(numericals[0] + numericals[numericals.length - 1]);
  });

export const part02 = (file: string) => {
  const input = getInput(file);
  const parsedInput = parseInput(input);

  const calibrationValues = getCalibrationValues(parsedInput);

  return calibrationValues.reduce((a, b) => a + b, 0);
};
