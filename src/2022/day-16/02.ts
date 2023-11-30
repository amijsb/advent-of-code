import { getInput, Valves, State, updateFlow } from "./01";

interface ElephantState extends State {
  elephantPosition: string;
}

// goede limiet
// het aantal minuten dat nog over is
// de flow rate die zou kunnen ontstaan vanaf de huidige positie van de olifant en de mens

// misschien curryen met je eigen stappen en die van de olifant?

const estimatedPressure = (
  valves: Valves,
  currentPosition: string,
  elephantPosition: string,
  minute: number,
  totalMinutes = 26,
) =>
  (valves[currentPosition].flowRate + valves[elephantPosition].flowRate) * (totalMinutes - minute);

export const santasElephantHelper = (
  valves: Valves,
  stack: ElephantState[],
  memory: Set<string>,
  best = 0,
  totalMinutes = 26,
) => {
  while (stack.length !== 0) {
    const { currentPosition, minute, opened, pressure, elephantPosition } = stack.pop()!;

    if (minute === totalMinutes) {
      pressure > best && (best = pressure);
      continue;
    }

    memory.add(`${currentPosition},${elephantPosition},${minute},${pressure}`);

    const flow = updateFlow([...opened], valves);

    valves[currentPosition].leadsTo.forEach((option) => {
      valves[elephantPosition].leadsTo.forEach((eleOption) => {
        if (!memory.has(`${option},${eleOption},${minute + 1},${pressure + flow}`))
          stack.push({
            currentPosition: option,
            elephantPosition: eleOption,
            minute: minute + 1,
            opened: new Set(opened),
            pressure: pressure + flow,
          });
      });
    });

    if (valves[currentPosition].flowRate > 0 && !opened.has(currentPosition)) {
      if (valves[elephantPosition].flowRate > 0 && !opened.has(elephantPosition)) {
        if (currentPosition === elephantPosition) {
          opened.add(currentPosition);
        } else {
          opened.add(currentPosition);
          opened.add(elephantPosition);
        }

        const accFlow = updateFlow([...opened], valves);

        if (
          !memory.has(`${currentPosition},${elephantPosition},${minute + 1},${pressure + accFlow}`)
        )
          stack.push({
            currentPosition,
            elephantPosition,
            minute: minute + 1,
            opened: new Set(opened),
            pressure: pressure + accFlow,
          });

        continue;
      }

      opened.add(currentPosition);

      const accFlow = updateFlow([...opened], valves);

      valves[elephantPosition].leadsTo.forEach((option) => {
        if (!memory.has(`${currentPosition},${option},${minute + 1},${pressure + accFlow}`))
          stack.push({
            currentPosition,
            elephantPosition: option,
            minute: minute + 1,
            opened: new Set(opened),
            pressure: pressure + accFlow,
          });
      });

      continue;
    }

    if (
      valves[elephantPosition].flowRate > 0 &&
      !opened.has(elephantPosition) &&
      (valves[currentPosition].flowRate === 0 || opened.has(currentPosition))
    ) {
      opened.add(elephantPosition);
      const accFlow = updateFlow([...opened], valves);

      valves[currentPosition].leadsTo.forEach((option) => {
        if (!memory.has(`${option},${elephantPosition},${minute + 1},${pressure + accFlow}`))
          stack.push({
            currentPosition: option,
            elephantPosition,
            minute: minute + 1,
            opened: new Set(opened),
            pressure: pressure + accFlow,
          });
      });
    }
  }

  return best;
};

export const part02 = (file: string) => {
  const valves = getInput(file);

  const initialState = {
    currentPosition: "AA",
    elephantPosition: "AA",
    minute: 1,
    opened: new Set<string>(),
    pressure: 0,
  };

  return santasElephantHelper(valves, [initialState], new Set<string>());
};
