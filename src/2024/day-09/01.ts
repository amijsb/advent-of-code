import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("").map(Number);
};

export const rearrangeFiles = (files: number[]) => {
  let id = 0;

  const rearrangedFiles = files.reduce((acc: string[], curr, i, array) => {
    if (i % 2 === 0) {
      Array.from({ length: curr }).forEach((_) => {
        acc.push(String(id));
      });
      id++;
    } else {
      Array.from({ length: curr }).forEach((_) => {
        acc.push(".");
      });
    }

    return acc;
  }, []);

  return rearrangedFiles;
};

const moveFileBlocks = (files: string[]) => {
  let emptySpace = files.findIndex((value) => value === ".");
  let toMove = files.findLastIndex((value) => value !== ".");

  while (emptySpace < toMove) {
    files[emptySpace] = files[toMove];
    files[toMove] = ".";

    emptySpace = files.findIndex((value) => value === ".");
    toMove = files.findLastIndex((value) => value !== ".");
  }

  return files;
};

export const findChecksum = (files: string[]) =>
  files
    .map((value, i) => {
      if (value === ".") return 0;
      const number = Number(value);
      return number * i;
    })
    .reduce((a, b) => a + b, 0);

export const part01 = (file: string) => {
  const input = getInput(file);
  const rearrangedFiles = rearrangeFiles(input);

  const movedFiles = moveFileBlocks(rearrangedFiles);
  return findChecksum(movedFiles);
};
