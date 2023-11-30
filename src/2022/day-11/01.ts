import { readFileSync } from "fs";

interface Monkey {
  items: number[];
  operation: (old: number) => number;
  test: {
    division: (worryLevel: number) => boolean;
    true: number;
    false: number;
  };
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n");
};

export const parseData = (input: string[]) => {
  let monkeys: Monkey[] = [];
  let monkeyNumber: number = 0;
  let monkeyIndex: number = 0;

  let nums: { [key: number]: number } = { 0: 0 };

  input.forEach((line, i) => {
    if (line.startsWith("Monkey")) {
      monkeyIndex = i;
      monkeyNumber = Number(line.split(" ")[1].slice(0, 1));
    }

    const num = Number(input[monkeyIndex + 3].trim().split(" ").slice(3));

    if (!nums[monkeyIndex]) {
      nums = { ...nums, [monkeyIndex]: num };
    }

    const action = input[monkeyIndex + 2].trim().split(" ").slice(1)[3];
    const multiplyer = input[monkeyIndex + 2].trim().split(" ").slice(1)[4];

    const operation = (old: number) =>
      action === "+"
        ? old + (multiplyer === "old" ? old : Number(multiplyer))
        : old * (multiplyer === "old" ? old : Number(multiplyer));

    if (!monkeys[monkeyNumber]) {
      monkeys[monkeyNumber] = {
        items: input[monkeyIndex + 1]
          .trim()
          .split(" ")
          .slice(2)
          .map((line) => Number(line.replaceAll(",", ""))),
        operation: operation,
        test: {
          division: (worryLevel: number) => worryLevel % num === 0,
          true: Number(input[monkeyIndex + 4].trim().split(" ").slice(-1)),
          false: Number(input[monkeyIndex + 5].trim().split(" ").slice(-1)),
        },
      };
    }
  });

  const commonDivisor = Object.values(nums).reduce((a, b) => a * b);

  return { monkeys, commonDivisor };
};

export const monkeyBusiness = (
  monkeys: Monkey[],
  worryLevelDivider: boolean,
  numberOfRounds: number,
  commonDivisor: number,
) => {
  const rounds = Array.from({ length: numberOfRounds }, (_, i) => i);
  let count: { [key: number]: number } = { 0: 0 };

  rounds.forEach((_) => {
    monkeys.forEach(({ items, operation, test }, i) => {
      let worryLevel: any = 0;
      if (!count[i]) {
        count = { ...count, [i]: 0 };
      }
      items.forEach((item) => {
        count = { ...count, [i]: (count[i] += 1) };
        worryLevelDivider
          ? (worryLevel = Math.floor(operation(item) / 3))
          : (worryLevel = Math.floor(operation(item) % commonDivisor));
        const targetMonkey = test.division(worryLevel) ? test.true : test.false;
        monkeys[targetMonkey].items.push(worryLevel);
      });
      monkeys[i].items.splice(0);
    });
  });

  const monkeyBusiness = Object.values(count)
    .sort((a, b) => a - b)
    .slice(-2);

  return monkeyBusiness.reduce((a, b) => a * b);
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const { monkeys, commonDivisor } = parseData(input);

  return monkeyBusiness(monkeys, true, 20, commonDivisor);
};
