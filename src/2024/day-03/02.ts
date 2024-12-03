import { getInput, multiply, parseInstruction } from "./01";

const regex = /(mul\(\d{1,3},\d{1,3}\))|(don't\(\))|(do\(\))/g;

const checkInput = (input: string[], removeIndex: number = 0) =>
  input.reduce((acc: string[], curr, index) => {
    if (curr === "don't()") removeIndex = index;
    if (curr === "do()") {
      removeIndex = 0;
      return acc;
    }

    if (removeIndex === 0) acc = [...acc, curr];
    return acc;
  }, []);

export const part02 = (file: string) => {
  const input = getInput(file, regex);
  const parsedInput = checkInput(input);
  const parsedInstructions = parsedInput.map(parseInstruction);

  const multipliedInstructions = multiply(parsedInstructions);

  return multipliedInstructions.reduce((acc, curr) => acc + curr, 0);
};
