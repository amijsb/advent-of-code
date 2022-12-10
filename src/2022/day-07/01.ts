import { readFileSync } from "fs";

interface Directory {
  [key: string]: number;
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n");
};

const addPreviousDirValue = (dirs: string[], directories: Directory) => {
  const previousDir = dirs.join("/");

  dirs.pop();

  directories = {
    ...directories,
    [dirs.join("/")]: directories[dirs.join("/")] + directories[previousDir],
  };

  return { dirs, directories };
};

export const getDirectorySizes = (input: string[]) => {
  let directories: Directory = { "/": 0 };
  let dirs: string[] = [];

  input.forEach((line) => {
    let dirName = dirs.join("/");

    if (!directories[dirName] && dirs.length) {
      directories = {
        ...directories,
        [dirName]: 0,
      };
    }

    if (line.startsWith("$ cd")) {
      const dir = line.split(" ");

      line === "$ cd .."
        ? ({ dirs, directories } = addPreviousDirValue(dirs, directories))
        : dirs.push(dir[dir.length - 1]);
    }

    if (!line.startsWith("$") && !line.startsWith("dir")) {
      const dirSize = Number(line.split(" ")[0]);

      directories = {
        ...directories,
        [dirName]: directories[dirName] + dirSize,
      };
    }
  });

  [...dirs].reverse().forEach((dir) => {
    dir !== "/" && ({ dirs, directories } = addPreviousDirValue(dirs, directories));
  });

  return Object.values(directories);
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const sizes = getDirectorySizes(input);

  return sizes.filter((size) => size <= 100000).reduce((a, b) => a + b);
};
