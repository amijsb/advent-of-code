import { readFileSync } from "fs";

export interface Instruction {
  [key: string]: number;
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");

  const instructions: Instruction[] = [];

  lines.forEach((line) => {
    const direction = line.split(" ")[0];
    const steps = Number(line.split(" ")[1]);

    for (let i = 0; i < steps; i++) {
      instructions.push({ [direction]: 1 });
    }
  });

  return instructions;
};

export const moveHead = (instructions: Instruction[]) => {
  let headMovement: Instruction[] = [];
  let headPosition = { x: 0, y: 0 };

  instructions.forEach((instruction) => {
    instruction["R"] && (headPosition.x += instruction["R"]);
    instruction["L"] && (headPosition.x -= instruction["L"]);
    instruction["U"] && (headPosition.y += instruction["U"]);
    instruction["D"] && (headPosition.y -= instruction["D"]);

    headMovement.push({ ...headPosition });
  });

  return headMovement;
};

const updateTail = (head: number, tail: number) => (head - tail < 0 ? (tail -= 1) : (tail += 1));

export const moveTail = (headMovement: Instruction[], tailLength: number): any => {
  let coordinates: Instruction[] = [];
  let tailPosition = { x: 0, y: 0 };

  headMovement.forEach((headPosition) => {
    if (
      Math.abs(headPosition.x - tailPosition.x) > 1 ||
      Math.abs(headPosition.y - tailPosition.y) > 1
    ) {
      headPosition.x !== tailPosition.x &&
        (tailPosition.x = updateTail(headPosition.x, tailPosition.x));
      headPosition.y !== tailPosition.y &&
        (tailPosition.y = updateTail(headPosition.y, tailPosition.y));
    }

    coordinates.push({ ...tailPosition });
  });

  return tailLength > 1
    ? moveTail(coordinates, tailLength - 1)
    : new Set(coordinates.map((co) => `${co.x},${co.y}`)).size;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const headMovement = moveHead(input);

  return moveTail(headMovement, 1);
};
