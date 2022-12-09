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
  let headMovement: { [key: string]: number }[] = [];

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

export const moveTail = (headMovement: Instruction[], tailLength: number): any => {
  let coordinates: { [key: string]: number }[] = [];
  let tailPosition = { x: 0, y: 0 };

  headMovement.forEach((headPosition) => {
    if (Math.abs(headPosition.x - tailPosition.x) > 1 && headPosition.y === tailPosition.y) {
      headPosition.x - tailPosition.x < 0 ? (tailPosition.x -= 1) : (tailPosition.x += 1);
    }

    if (Math.abs(headPosition.y - tailPosition.y) > 1 && headPosition.x === tailPosition.x) {
      headPosition.y - tailPosition.y < 0 ? (tailPosition.y -= 1) : (tailPosition.y += 1);
    }

    if (
      Math.abs(headPosition.y - tailPosition.y) > 1 ||
      Math.abs(headPosition.x - tailPosition.x) > 1
    ) {
      headPosition.y - tailPosition.y < 0 ? (tailPosition.y -= 1) : (tailPosition.y += 1);
      headPosition.x - tailPosition.x < 0 ? (tailPosition.x -= 1) : (tailPosition.x += 1);
    }

    coordinates.push({ ...tailPosition });
  });

  if (tailLength > 1) {
    return moveTail(coordinates, tailLength - 1);
  }

  if (tailLength === 1) {
    const values = coordinates.map((co) => `${co.x},${co.y}`);
    return new Set(values).size;
  }
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const headMovement = moveHead(input);
  return moveTail(headMovement, 1);
};
