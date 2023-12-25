import { getInput, navigateWasteland, Nodes } from "./01";
import { findLCM } from "../../../helpers/lowest-common-denominator";

const ghostSteps = (instructions: string, nodes: Nodes) => {
  const currentPositions = Object.keys(nodes).filter((key) => key.endsWith("A"));

  const stepsPerPosition = currentPositions.map((position) =>
    navigateWasteland(instructions, nodes, position, "Z"),
  );

  return findLCM(stepsPerPosition);
};

export const part02 = (file: string) => {
  const { instructions, nodes } = getInput(file);
  return ghostSteps(instructions, nodes);
};
