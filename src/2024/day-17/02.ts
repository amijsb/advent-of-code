import { getInput, readProgram, Registers } from "./01";

let d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];

const findAValue = (program: number[], registers: Registers) => {
  let current = d.length - 1;

  while (true) {
    registers.a = d.map((_, i) => d[i] * Math.pow(8, i)).reduce((a, b) => a + b, 0);

    const result = readProgram(program, registers);

    if (result.join(",") === program.join(",")) break;

    if (result.slice(current).join(",") === program.slice(current).join(",")) current -= 1;
    else {
      if (d[current] === 7) {
        d[current] = 0;
        current += 1;
      }

      d[current] += 1;
    }
  }

  return registers.a;
};

export const part02 = (file: string) => {
  const { registers, program } = getInput(file);

  return findAValue(program, registers);
};
