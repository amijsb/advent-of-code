import { readFileSync } from "fs";

interface Wire {
  [wire: string]: number;
}

interface Connection {
  gates: string[];
  operator: string;
  output: string;
}

export const getInput = (file: string): { wires: Wire; connections: Connection[] } => {
  const fileContent = readFileSync(file, "utf-8");
  const [wires, connections] = fileContent.split("\n\n");

  return {
    wires: wires.split("\n").reduce((acc, wire) => {
      const [w, value] = wire.split(": ");
      return { ...acc, [w]: Number(value) };
    }, {}),
    connections: connections.split("\n").map((connection) => {
      const [gates, output] = connection.split(" -> ");
      const operator = gates.match(/(AND)|(XOR)|(OR)/g)?.toString()!;

      return { gates: gates.split(operator).map((gate) => gate.trim()), operator, output };
    }),
  };
};

const wires = (input: { wires: Wire; connections: Connection[] }) => {
  let { wires, connections } = input;

  while (connections.length > 0) {
    const { gates, operator, output } = connections.shift()!;

    const [left, right] = gates;

    if (!Object.keys(wires).includes(left) || !Object.keys(wires).includes(right)) {
      connections.push({ gates, operator, output });
      continue;
    }

    if (operator === "AND" && wires[left] === 1 && wires[right] === 1)
      wires = { ...wires, [output]: 1 };
    else if (operator === "OR" && (wires[left] === 1 || wires[right] === 1))
      wires = { ...wires, [output]: 1 };
    else if (
      operator === "XOR" &&
      ((wires[left] === 1 && wires[right] === 0) || (wires[left] === 0 && wires[right] === 1))
    )
      wires = { ...wires, [output]: 1 };
    else wires = { ...wires, [output]: 0 };
  }

  const zValues = Object.keys(wires)
    .filter((wire) => wire.startsWith("z"))
    .sort()
    .reverse();

  return zValues.map((wire) => wires[wire]).join("");
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const binary = wires(input);

  return parseInt(binary, 2);
};
