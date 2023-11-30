import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");

  let separators: number[] = [];
  lines.forEach((line, i) => line === "" && separators.push(i));

  separators.splice(0, 0, 0);

  const vlaai = separators.map((el, i) => {
    if (i === 0) return lines.slice(0, separators[i + 1]);
    return lines.slice(el + 1, separators[i + 1]);
  });

  return vlaai.map((el) => el.map((st) => JSON.parse(st)));
};

export const decisionMaking = (left: any, right: any, decision = 0) => {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    left < right ? (decision = 1) : left > right ? (decision = -1) : (decision = 0);
    return decision === 1 ? true : decision === -1 ? false : decision;
  }

  if (Number.isInteger(left) && Array.isArray(right)) left = [left];
  if (Array.isArray(left) && Number.isInteger(right)) right = [right];

  if (Array.isArray(left) && Array.isArray(right)) {
    left.length < right.length
      ? right.some((item, i) => {
          const bla = decisionMaking(left[i], item, decision);

          if (bla === true || bla === false) {
            return bla ? (decision = 1) : (decision = -1);
          }

          return decision;
        })
      : left.some((item, i) => {
          const bla = decisionMaking(item, right[i], decision);

          if (bla === true || bla === false) {
            return bla ? (decision = 1) : (decision = -1);
          }

          return decision;
        });

    return decision === 1 ? true : decision === -1 ? false : decision;
  }

  left === undefined && (decision = 1);
  right === undefined && (decision = -1);

  return decision === 1 ? true : false;
};

export const getOrder = (packs: any) => {
  let indices: number[] = [];

  packs.forEach((packet: any[], packetIndex: number) => {
    decisionMaking(packet[0], packet[1]) && indices.push(packetIndex + 1);
  });

  return indices;
};

export const part01 = (file: string) => {
  const input: number[][] = getInput(file);
  const order = getOrder(input);

  return order.reduce((a, b) => a + b);
};
