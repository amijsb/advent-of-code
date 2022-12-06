import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("");
};

export const getMarker = (input: string[], size: number) => {
  let message: string[] = [];
  let marker: number[] = [];

  input.forEach((letter, i) => {
    if (new Set(message).size === size) {
      marker.push(i);
      return message;
    }

    if (message.length === size) {
      message.splice(0, 1);
      message.push(letter);
      return;
    }

    message.push(letter);
    return message;
  });

  return Math.min(...marker);
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const marker = getMarker(input, 4);

  return marker;
};
