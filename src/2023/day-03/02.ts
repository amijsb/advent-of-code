import { getInput, getNumbers, getSymbols, Number, Symbol } from "./01";

const getGears = (numbers: Number[], symbols: Symbol[]) => {
  const gears: { [key: string]: Number[] } = {};

  numbers.forEach((number) => {
    symbols.forEach((symbol) => {
      if (
        number.range.some((num) => symbol.range.includes(num)) &&
        Math.abs(number.line - symbol.line) <= 1 &&
        symbol.symbol === "*"
      ) {
        const key = `${symbol.line}${symbol.index}`;
        gears[key] = gears[key] || [];
        gears[key].push(number);
      }
    });
  });

  return Object.values(gears).filter((values) => values.length === 2);
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const numbers = getNumbers(input);
  const symbols = getSymbols(input).filter(({ symbol }) => symbol === "*");

  const gears = getGears(numbers, symbols);
  const gearRatios = gears.map((gear) => gear.reduce((a, b) => a * b.numbers, 1));

  return gearRatios.reduce((a, b) => a + b, 0);
};
