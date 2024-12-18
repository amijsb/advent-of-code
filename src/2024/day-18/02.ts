import { createMap, dropBytes, exitMemory, getInput } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);
  const map = createMap();

  let bytes = 1024;

  while (true) {
    const corruptedMemory = dropBytes(map, input, bytes);
    const answer = exitMemory(corruptedMemory);

    if (answer === "No exit found") break;

    bytes++;
  }

  return `${input[bytes - 1].x},${input[bytes - 1].y}`;
};
