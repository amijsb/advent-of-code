import { getInput } from "./01";

const getViewingDistance = (tree: number, array: number[], reverse = false) => {
  const reversedArray = [...array].reverse();
  const blocked = reverse
    ? reversedArray.findIndex((otherTree) => otherTree >= tree)
    : array.findIndex((otherTree) => otherTree >= tree);
  return blocked === -1 ? blocked + array.length + 1 : blocked + 1;
};

export const getScenicScore = (trees: number[][]) => {
  let scenicScores: number[] = [];

  trees[0].forEach((_, i) => {
    const verticalLines = trees.map((line) => line[i]);

    trees.forEach((line, index) => {
      const tree = trees[index][i];

      const treesToBottom = verticalLines.slice(index + 1);
      const treesToLeft = line.slice(0, i);
      const treesToRight = line.slice(i + 1);
      const treesToTop = verticalLines.slice(0, index);

      const scenicScore =
        getViewingDistance(tree, treesToBottom) *
        getViewingDistance(tree, treesToLeft, true) *
        getViewingDistance(tree, treesToRight) *
        getViewingDistance(tree, treesToTop, true);

      scenicScores.push(scenicScore);
    });
  });

  return Math.max(...scenicScores);
};

export const part02 = (file: string) => {
  const input = getInput(file);
  return getScenicScore(input);
};
