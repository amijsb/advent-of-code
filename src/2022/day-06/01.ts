import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("");
};

export const getMarker = (input: string[], size: number) => {
  let message: string[] = [];
  let marker: number = -1;

  input.forEach((letter, i) => {
    new Set(message).size === size && marker === -1 && (marker = i);
    message.length === size && message.splice(0, 1);

    message.push(letter);
  });

  return marker;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  return getMarker(input, 4);
};
