import { readFileSync } from "fs";

interface Directory {
  [key: string]: number;
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");

  return lines;
};

export const getDirectorySizes = (input: string[]) => {
  let directories: Directory = { "/": 0 };
  let dirs: string[] = [];

  //@ts-ignore
  input.forEach((line) => {
    if (!directories[dirs.join("/")]) {
      directories = {
        ...directories,
        [dirs.join("/")]: 0,
      };
    }

    if (line.startsWith("$ cd")) {
      if (line === "$ cd ..") {
        const previousDir = dirs.join("/");

        dirs.pop();

        directories = {
          ...directories,
          [dirs.join("/")]: directories[dirs.join("/")] + directories[previousDir],
        };

        return dirs;
      }

      const dir = line.split(" ");
      dirs.push(dir[dir.length - 1]);
    }

    if (!line.startsWith("$") && !line.startsWith("dir")) {
      const dirSize = Number(line.split(" ")[0]);

      directories = {
        ...directories,
        [dirs.join("/")]: directories[dirs.join("/")] + dirSize,
      };
    }
  });

  [...dirs].reverse().forEach((dir) => {
    if (dir !== "/") {
      const previousDir = dirs.join("/");

      dirs.pop();

      directories = {
        ...directories,
        [dirs.join("/")]: directories[dirs.join("/")] + directories[previousDir],
      };
    }
  });

  return Object.values(directories);
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const sizes = getDirectorySizes(input);

  return sizes.filter((size) => size <= 100000).reduce((a, b) => a + b);
};
