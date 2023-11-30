import { getInput, monkeyBusiness, parseData } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);
  const { monkeys, commonDivisor } = parseData(input);

  return monkeyBusiness(monkeys, false, 10000, commonDivisor);
};
