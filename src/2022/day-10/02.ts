import { getInput, getCircuit } from "./01";

const createScreen = (cycles: number[]) => {
  const screen = cycles.map((cycle, i) => {
    const start = i === 0 ? i : cycles[i - 1];
    const stop = cycle;
    return Array.from({ length: stop - start }, (_, i) => i + start);
  });

  return screen;
};

const cycles = [40, 80, 120, 160, 200, 240];

const drawPixels = (circuit: { [key: number]: number }) => {
  const screen = createScreen(cycles);

  const drawing = screen.map((row) => {
    let spritePos = 1;

    const drawnRow = row.map((num, i) => {
      circuit[num] !== undefined ? (spritePos = circuit[num]) : spritePos;
      const sprite = [spritePos - 1, spritePos, spritePos + 1];

      return sprite.some((el) => el === i) ? "🐷" : "🎄";
    });

    return drawnRow.join("");
  });

  console.log(drawing);
  return "see console.log()";
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const circuit = getCircuit(input);

  return drawPixels(circuit);
};

[
  "🐷🐷🐷🎄🎄🎄🐷🐷🎄🎄🐷🎄🎄🎄🎄🐷🐷🐷🎄🎄🐷🐷🐷🎄🎄🐷🐷🐷🐷🎄🎄🐷🐷🎄🎄🐷🎄🎄🐷🎄",
  "🐷🎄🎄🐷🎄🐷🎄🎄🐷🎄🐷🎄🎄🎄🎄🐷🎄🎄🐷🎄🐷🎄🎄🐷🎄🎄🎄🎄🐷🎄🐷🎄🎄🐷🎄🐷🎄🎄🐷🎄",
  "🐷🎄🎄🐷🎄🐷🎄🎄🎄🎄🐷🎄🎄🎄🎄🐷🎄🎄🐷🎄🐷🐷🐷🎄🎄🎄🎄🐷🎄🎄🐷🎄🎄🐷🎄🐷🎄🎄🐷🎄",
  "🐷🐷🐷🎄🎄🐷🎄🐷🐷🎄🐷🎄🎄🎄🎄🐷🐷🐷🎄🎄🐷🎄🎄🐷🎄🎄🐷🎄🎄🎄🐷🐷🐷🐷🎄🐷🎄🎄🐷🎄",
  "🐷🎄🐷🎄🎄🐷🎄🎄🐷🎄🐷🎄🎄🎄🎄🐷🎄🐷🎄🎄🐷🎄🎄🐷🎄🐷🎄🎄🎄🎄🐷🎄🎄🐷🎄🐷🎄🎄🐷🎄",
  "🐷🎄🎄🐷🎄🎄🐷🐷🐷🎄🐷🐷🐷🐷🎄🐷🎄🎄🐷🎄🐷🐷🐷🎄🎄🐷🐷🐷🐷🎄🐷🎄🎄🐷🎄🎄🐷🐷🎄🎄",
];
