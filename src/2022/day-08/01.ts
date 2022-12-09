import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");
  return lines.map((line) => line.split("").map(Number));
};

const isTreeVisible = (tree: number, array: number[]) => {
  return array.every((otherTree) => otherTree < tree);
};

export const getVisibleTrees = (trees: number[][]) => {
  let count = 0;

  trees[0].forEach((_, i) => {
    const verticalLines = trees.map((line) => line[i]);

    trees.forEach((line, index) => {
      const tree = trees[index][i];

      const treesToBottom = verticalLines.slice(index + 1);
      const treesToLeft = line.slice(0, i);
      const treesToRight = line.slice(i + 1);
      const treesToTop = verticalLines.slice(0, index);

      if (
        isTreeVisible(tree, treesToBottom) ||
        isTreeVisible(tree, treesToLeft) ||
        isTreeVisible(tree, treesToRight) ||
        isTreeVisible(tree, treesToTop)
      ) {
        count += 1;
      }
    });
  });

  return count;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  return getVisibleTrees(input);
};
