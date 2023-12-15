import { getASCIIvalues, getInput } from "./01";

interface Box {
  [boxNo: number]: {
    label: string;
    focalLength: number;
  }[];
}

const fillBoxes = (input: string[]) => {
  let boxes: Box = {};

  input.forEach((sequence) => {
    if (sequence.includes("=")) {
      const [label, focalLength] = sequence.split("=");
      const box = Number(getASCIIvalues([label]));

      if (!boxes[box]) {
        boxes = { ...boxes, [box]: [] };
      }

      if (boxes[box] && boxes[box].find((sequence) => sequence.label === label)) {
        const existingSequence = boxes[box].find((sequence) => sequence.label === label);
        boxes[box] = boxes[box].map((sequence) => {
          if (existingSequence === sequence)
            return { ...sequence, focalLength: Number(focalLength) };
          return sequence;
        });
      } else {
        boxes[box].push({ label, focalLength: Number(focalLength) });
      }
    } else {
      const [label] = sequence.split("-");
      const box = Number(getASCIIvalues([label]));

      if (boxes[box]) {
        boxes[box] = boxes[box].filter((sequence) => sequence.label !== label);
      }
    }
  });

  return boxes;
};

const getFocusingPower = (boxes: Box) => {
  const boxNumbers = Array.from({ length: 256 }, (_, i) => i);
  return boxNumbers.map((number) =>
    boxes[number]?.length > 0
      ? boxes[number]
          .map(({ focalLength }, i) => (number + 1) * (i + 1) * focalLength)
          .reduce((a, b) => a + b, 0)
      : 0,
  );
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const boxes = fillBoxes(input);
  const focusingPower = getFocusingPower(boxes);

  return focusingPower.reduce((a, b) => a + b, 0);
};
