import { getInput, moveHead, moveTail } from "./01";

export const part02 = (file: string) => {
  const input = getInput(file);
  const headMovement = moveHead(input);
  return moveTail(headMovement, 9);
};
