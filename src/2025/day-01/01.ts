import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n");
};

const turnDial = ({
  click,
  instruction,
  position,
}: {
  click: number;
  instruction: string;
  position: number;
}) => {
  const direction = instruction[0];
  const amount = Number(instruction.slice(1));
  const turns = amount % 100;

  if (turns !== amount) click += (amount - turns) / 100;

  const prevPosition = position;

  switch (direction) {
    case "L":
      position = position - turns;

      if (position < 0) {
        position += 100;

        if (position !== 100 && prevPosition !== 0) click += 1;
      }

      break;
    case "R":
      position = position + turns;

      if (position > 99) {
        position -= 100;

        if (position !== 0 && prevPosition !== 0) click += 1;
      }

      break;
  }

  return { newClick: click, newPosition: position };
};

export const getPassword = (input: string[]) => {
  let click = 0;
  let count = 0;
  let position = 50;

  input.forEach((instruction) => {
    const { newClick, newPosition } = turnDial({ click, instruction, position });

    click = newClick;
    position = newPosition;

    if (position === 0) {
      click += 1;
      count += 1;
    }
  });

  return { click, count };
};

export const part01 = (file: string) => {
  const input = getInput(file);

  const { count } = getPassword(input);
  return count;
};
