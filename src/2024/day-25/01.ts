import { readFileSync } from "fs";
import { rowsToColumns } from "../../../helpers/rows-to-columns";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const keysAndLocks = fileContent.split("\n\n").map((line) => line.split("\n"));
  const locks = keysAndLocks.filter((value) => {
    const map = value.map((rows) => rows.split(""));
    return map[0].every((char) => char === "#");
  });

  const keys = keysAndLocks.filter((value) => {
    const map = value.map((rows) => rows.split(""));
    return map[map.length - 1].every((char) => char === "#");
  });

  return {
    keys: keys.map((key) => key.map((row) => row.split(""))),
    locks: locks.map((lock) => lock.map((row) => row.split(""))),
  };
};

const getSchematics = (kol: string[][][]) => {
  const converted = kol.map((item) => rowsToColumns(item));

  const schematics = converted.reduce(
    (acc: number[][], curr, i) => {
      curr.forEach((row) => {
        const number = row.filter((value) => value === "#").length;
        if (!acc[i]) acc = [...acc, []];
        acc[i].push(number - 1);
      });

      return acc;
    },
    [[]],
  );

  return schematics;
};

const findOverlap = (keys: number[][], locks: number[][]) => {
  const overlap = locks.reduce(
    (acc: { [key: number]: number[][] }, lock, lockIndex) => {
      lock.forEach((number, i) =>
        keys.map((key, keyIndex) => {
          const total = number + key[i];
          if (!acc[lockIndex]) acc = { ...acc, [lockIndex]: [[]] };
          if (!acc[lockIndex][keyIndex]) acc = { ...acc, [lockIndex]: [...acc[lockIndex], []] };

          acc[lockIndex][keyIndex].push(total);
        }),
      );

      return acc;
    },
    { 0: [[]] },
  );

  return Object.values(overlap)
    .flat()
    .map((value) => value.every((number) => number < 6));
};

export const part01 = (file: string) => {
  const { keys, locks } = getInput(file);

  const keysSchema = getSchematics(keys);
  const locksSchema = getSchematics(locks);

  return findOverlap(keysSchema, locksSchema).filter(Boolean).length;
};
