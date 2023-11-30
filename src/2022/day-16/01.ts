import { readFileSync } from "fs";

export interface Valves {
  [key: string]: {
    flowRate: number;
    leadsTo: string[];
  };
}

export interface State {
  currentPosition: string;
  minute: number;
  opened: Set<string>;
  pressure: number;
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");

  let valves = {};

  lines.forEach((line) => {
    const splits = line.split(" ");
    const valve = splits[1];
    const flow = splits[4].slice(splits[4].indexOf("=") + 1, splits[4].indexOf(";"));
    const leadsTo = splits.slice(9).map((el) => el.replaceAll(",", ""));

    valves = {
      ...valves,
      [valve]: { flowRate: Number(flow), leadsTo },
    };
  });

  return valves;
};

export const updateFlow = (opened: string[], valves: Valves) =>
  opened.map((valve) => valves[valve].flowRate).reduce((a, b) => a + b, 0);

export const releasePressure = (
  valves: Valves,
  stack: State[],
  memory: Set<string>,
  best = 0,
  totalMinutes = 30,
) => {
  while (stack.length > 0) {
    let { currentPosition, minute, pressure, opened } = stack.pop()!;

    if (minute === totalMinutes) {
      pressure > best && (best = pressure);
      continue;
    }

    memory.add(`${currentPosition},${minute},${pressure}`);

    const flow = updateFlow([...opened], valves);

    valves[currentPosition].leadsTo
      .sort((a, b) => valves[a].flowRate - valves[b].flowRate)
      .forEach((option) => {
        const entry = `${option},${minute + 1},${pressure + flow}`;
        if (!memory.has(entry))
          stack.push({
            currentPosition: option,
            minute: minute + 1,
            opened: new Set(opened),
            pressure: pressure + flow,
          });
      });

    if (valves[currentPosition].flowRate > 0 && !opened.has(currentPosition)) {
      opened.add(currentPosition);

      const accFlow = updateFlow([...opened], valves);

      if (!memory.has(`${currentPosition},${minute + 1},${pressure + accFlow}`))
        stack.push({
          currentPosition,
          minute: minute + 1,
          opened: new Set(opened),
          pressure: pressure + accFlow,
        });
    }
  }

  return best;
};

export const part01 = (file: string) => {
  const valves = getInput(file);

  const initialState = {
    currentPosition: "AA",
    minute: 1,
    opened: new Set<string>(),
    pressure: 0,
  };

  return releasePressure(valves, [initialState], new Set<string>());
};
