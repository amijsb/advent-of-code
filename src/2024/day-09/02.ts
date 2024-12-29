import { findChecksum, getInput, rearrangeFiles } from "./01";

const findEmptySpaces = (files: string[]) => {
  let index = 0;

  const spaces = files.reduce(
    (acc: number[][], curr, i, array) => {
      if (curr === ".") {
        if (!acc[index]) acc.push([]);
        acc[index].push(i);
        if (array[i + 1] !== ".") index++;
      }

      return acc;
    },
    [[]],
  );

  return spaces;
};

const moveFiles = (files: string[]) => {
  let emptySpaces = findEmptySpaces(files);
  let currentFile = files.findLastIndex((value) => value !== ".");

  let startOfBlock = files.findIndex((value) => value === files[currentFile]);
  let endOfBlock = files.findLastIndex((value) => value === files[currentFile]);
  let toMove = Array.from({ length: endOfBlock - startOfBlock + 1 }, (_, i) => startOfBlock + i);

  while (files[currentFile] !== "0") {
    for (const emptySpace of emptySpaces) {
      if (
        emptySpace.some((space) => space > currentFile) ||
        emptySpaces.indexOf(emptySpace) === emptySpaces.length - 1
      ) {
        currentFile = files.findLastIndex(
          (value) => value === String(Number(files[currentFile]) - 1),
        );

        break;
      }

      if (emptySpace.length < toMove.length) continue;

      currentFile = files.findLastIndex(
        (value) => value === String(Number(files[currentFile]) - 1),
      );

      toMove.forEach((number, i) => {
        const index = emptySpace[i];
        const move = files[number];

        files[index] = move;
        files[number] = ".";
      });

      break;
    }

    emptySpaces = findEmptySpaces(files);

    startOfBlock = files.findIndex((value) => value === files[currentFile]);
    endOfBlock = files.findLastIndex((value) => value === files[currentFile]);
    toMove = Array.from({ length: endOfBlock - startOfBlock + 1 }, (_, i) => startOfBlock + i);
  }

  return files;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const rearrangedFiles = rearrangeFiles(input);

  const movedFiles = moveFiles(rearrangedFiles);
  return findChecksum(movedFiles);
};
