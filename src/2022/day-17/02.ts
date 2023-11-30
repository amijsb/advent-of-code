// non functional
import { getInput, shapes, Shapes, blocked, Coordinate } from "./01";

export const getTowerHeight = (
  wind: string[],
  shapes: Shapes,
  blockedList = blocked,
  fallingStone = shapes["-"],
  jetIndex = 0,
  fallenStones = 0,
): any => {
  const order: ("-" | "+" | "/" | "|" | "#")[] = ["-", "+", "/", "|", "#"];

  let cycles: string[] = [];
  let cyclesWithHeight = [];

  let beginningOfCycle: any[] = [];

  while (fallenStones < Math.pow(10, 12)) {
    if (jetIndex === wind.length) {
      jetIndex = 0;
    }

    const jet = wind[jetIndex];

    const highestX = Math.max(...fallingStone.map((co: Coordinate) => co.x));
    const lowestX = Math.min(...fallingStone.map((co: Coordinate) => co.x));

    const blockedLeftX = fallingStone.some(
      ({ x, y }) => blockedList.findIndex((el) => el.x === x - 1 && el.y === y) !== -1,
    );
    const blockedRightX = fallingStone.some(
      ({ x, y }) => blockedList.findIndex((el) => el.x === x + 1 && el.y === y) !== -1,
    );

    fallingStone = fallingStone.map(({ x, y }) =>
      jet === "<"
        ? lowestX - 1 === 0 || blockedLeftX
          ? { x, y }
          : { x: x - 1, y }
        : highestX + 1 === 8 || blockedRightX
        ? { x, y }
        : { x: x + 1, y },
    );

    jetIndex += 1;

    const blockedY = fallingStone.some(
      ({ x, y }) => blockedList.findIndex((el) => el.x === x && el.y === y - 1) !== -1,
    );

    fallingStone = fallingStone.map(({ x, y }) => (blockedY ? { x, y } : { x, y: y - 1 }));

    if (blockedY) {
      const cycleIndex = fallenStones % 5;
      const cycleStone = order[cycleIndex];

      fallenStones += 1;

      const stoneIndex = fallenStones % 5;
      const currentStone = order[stoneIndex];

      blockedList = [...blockedList, ...fallingStone];

      const newY = Math.max(...blockedList.map((co: Coordinate) => co.y));

      if (cycles.filter((el) => el === JSON.stringify([jetIndex, cycleStone])).length === 3) {
        beginningOfCycle = [jetIndex, cycleStone];
        break;
      }

      cycles.push(JSON.stringify([jetIndex, cycleStone]));
      cyclesWithHeight.push([jetIndex, cycleStone, newY]);

      fallingStone = shapes[currentStone];
      fallingStone = fallingStone.map((co: Coordinate) => {
        const { x, y } = co;
        return { x, y: y + newY };
      });
    }
  }

  const parsedCycles = [...cycles].map((el) => JSON.parse(el));

  const index = parsedCycles.findIndex((el) => {
    const [number, fallingStone] = el;
    return fallingStone === beginningOfCycle[1] && number === beginningOfCycle[0];
  });

  const cycle1 = parsedCycles.splice(index);
  const beforeCycle = parsedCycles;

  const heightBeforeCycle = cyclesWithHeight[beforeCycle.length - 1][2] as number;
  console.log(beforeCycle, beginningOfCycle);

  const secondIndex = [...cycle1].reverse().findIndex((el) => {
    const [number, fallingStone] = el;
    return fallingStone === beginningOfCycle[1] && number === beginningOfCycle[0];
  });

  const cycle2 = cycle1.splice(-(secondIndex + 1));
  const cycle3 = cycle1.splice(-(secondIndex + 1));

  const fakeCycleHeight = cyclesWithHeight.slice(index, secondIndex + 1);
  // .map((el) => el[2]) as number[];

  const heightOfCycle = cyclesWithHeight.slice(-(secondIndex + 1)).map((el) => el[2]) as number[];
  const cycleHeight = Math.max(...heightOfCycle) - Math.min(...heightOfCycle);

  // const heightDifference =
  //   cycleHeight - Math.max(...fakeCycleHeight) - Math.min(...fakeCycleHeight);

  console.log(fakeCycleHeight);

  const remainder = Math.pow(10, 12) % cycle3.length;
  const afterCycle = remainder - beforeCycle.length;

  const heightAfterCycle = heightOfCycle[afterCycle] - heightOfCycle[0];
  console.log(cycleHeight, cycle2);

  const quotient = Math.floor(Math.pow(10, 12) / cycle3.length);
  const towerHeight = quotient * cycleHeight + heightAfterCycle + heightBeforeCycle;
  // quotient * cycleHeight + heightAfterCycle + heightBeforeCycle + heightDifference;

  return towerHeight;
};

// testinput = 1514285714288 own answer
// testinput = 1514285714288 good answer

// 1512941176168;
// 1512941176170; <-- too low
// 1512941176518; <-- too low
// 1523167155421; <-- too high
// 1523167155420; also not right
// 1523167155413; klopt ook niet

export const part02 = (file: string) => {
  const wind = getInput(file);
  return getTowerHeight(wind, shapes);
};
