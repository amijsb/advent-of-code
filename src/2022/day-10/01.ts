import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");

  return lines.map((line) => {
    const split = line.split(" ");
    return split.length > 1 ? Number(split[1]) : split[0];
  });
};

export const getCircuit = (input: (string | number)[]) => {
  let cycleNumber = 0;
  let xRegister = 1;

  let circuit: { [key: number]: number } = { [cycleNumber]: xRegister };

  input.forEach((line) => {
    if (typeof line === "number") {
      cycleNumber += 2;
      xRegister += line;
    } else {
      cycleNumber += 1;
    }

    circuit = { ...circuit, [cycleNumber]: xRegister };
  });

  return circuit;
};

export const getSignalStrengths = (circuit: { [key: number]: number }) => {
  const cycleNumbers = Object.keys(circuit).map(Number);
  const targetCycles = [20, 60, 100, 140, 180, 220];

  const signalStrengths = targetCycles.map((cycle) => {
    const goal = circuit[cycle] !== undefined ? cycle - 1 : cycle;
    const num = cycleNumbers.reduce((a, b) => (Math.abs(b - goal) < Math.abs(a - goal) ? b : a));

    return circuit[num] * cycle;
  });

  return signalStrengths.reduce((a, b) => a + b);
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const circuit = getCircuit(input);

  return getSignalStrengths(circuit);
};
