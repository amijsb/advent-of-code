import { getInput } from "./01";

const getViewingDistance = (array: number[], direction: number) => {
  return direction === -1 ? direction + array.length + 1 : direction + 1;
};

export const getScenicScore = (trees: number[][]) => {
  let scenicScores: number[] = [];

  trees[0].forEach((_, i) => {
    const verticalLines = trees.map((line) => line[i]);

    trees.forEach((line, index) => {
      const tree = trees[index][i];

      const treesToLeft = line.slice(0, i);
      const treesToRight = line.slice(i + 1);
      const treesToTop = verticalLines.slice(0, index);
      const treesToBottom = verticalLines.slice(index + 1);

      const left = [...treesToLeft].reverse().findIndex((otherTree) => otherTree >= tree);
      const right = treesToRight.findIndex((otherTree) => otherTree >= tree);
      const top = [...treesToTop].reverse().findIndex((otherTree) => otherTree >= tree);
      const bottom = treesToBottom.findIndex((otherTree) => otherTree >= tree);

      scenicScores.push(
        getViewingDistance(treesToLeft, left) *
          getViewingDistance(treesToRight, right) *
          getViewingDistance(treesToBottom, bottom) *
          getViewingDistance(treesToTop, top),
      );
    });
  });

  return Math.max(...scenicScores);
};

export const part02 = (file: string) => {
  const input = getInput(file);
  return getScenicScore(input);
};
