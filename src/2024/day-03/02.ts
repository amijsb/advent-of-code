import { getInput, multiply, parseInstruction } from "./01";

const regex = /(mul\(\d{1,3},\d{1,3}\))|(don't\(\))|(do\(\))/g;

const checkInput = (input: string[], bla: number = 0) =>
  input.reduce((acc: string[], curr, index) => {
    if (curr === "don't()") {
      bla = index;
      return acc;
    }

    if (curr === "do()") {
      bla = 0;
      return acc;
    }

    if (bla !== 0) return acc;

    acc = [...acc, curr];
    return acc;
  }, []);

export const part02 = (file: string) => {
  const input = getInput(file, regex);
  const parsedInput = checkInput(input);
  const parsedInstructions = parsedInput.map(parseInstruction);

  const multipliedInstructions = multiply(parsedInstructions);

  return multipliedInstructions.reduce((acc, curr) => acc + curr, 0);
};
