import { readFileSync } from "fs";

export type Registers = Record<"a" | "b" | "c", number>;

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const [registers, program] = fileContent.split("\n\n");

  const parsedRegisters = registers.split("\n").reduce((acc, arr, index) => {
    const value = arr.match(/\d+/);

    const keys: { [key: number]: "a" | "b" | "c" } = { 0: "a", 1: "b", 2: "c" };
    return { ...acc, [keys[index]]: Number(value) };
  }, {});

  return {
    registers: parsedRegisters as Registers,
    program: [...program.match(/\d+/g)!].map(Number),
  };
};

const instructions = (
  a: number,
  b: number,
  c: number,
  opcode: number,
  operand: number,
  output: number[],
  instructionPointer: number,
) => {
  const coperand: Record<number, number> = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: a,
    5: b,
    6: c,
    7: 7,
  };

  const instructions = (opcode: number) => {
    switch (opcode) {
      case 0:
        return (a = Math.trunc(a / Math.pow(2, coperand[operand])));
      case 1:
        return (b = (b ^ operand) >>> 0);
      case 2:
        return (b = coperand[operand] % 8);
      case 3:
        return a === 0 ? null : (instructionPointer = operand);
      case 4:
        return (b = (b ^ c) >>> 0);
      case 5:
        return (output = [...output, coperand[operand] % 8]);
      case 6:
        return (b = Math.trunc(a / Math.pow(2, coperand[operand])));
      case 7:
        return (c = Math.trunc(a / Math.pow(2, coperand[operand])));
      default:
        return null;
    }
  };

  instructions(opcode);

  if (opcode === 3) {
    return instructions(opcode) === null
      ? { a, b, c, output, instructionPointer: (instructionPointer += 2) }
      : { a, b, c, output, instructionPointer };
  }

  return { a, b, c, output, instructionPointer: (instructionPointer += 2) };
};

export const readProgram = (
  program: number[],
  registers: Registers,
  instructionPointer = 0,
  output = [] as number[],
) => {
  let { a, b, c } = registers;

  while (instructionPointer <= program.length - 2) {
    const [opcode, operand] = program.slice(instructionPointer, instructionPointer + 2);

    const result = instructions(a, b, c, opcode, operand, output, instructionPointer);

    a = result.a;
    b = result.b;
    c = result.c;
    output = result.output;
    instructionPointer = result.instructionPointer;
  }

  return output;
};

export const part01 = (file: string) => {
  const { registers, program } = getInput(file);

  return readProgram(program, registers).join(",");
};
