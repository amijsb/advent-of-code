import { readFileSync } from "fs";

const numericKeypad = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["#", "0", "A"],
];

const directionalKeypad = [
  ["#", "^", "A"],
  ["<", "v", ">"],
];

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  return fileContent.split("\n");
};

interface Coordinate {
  x: number;
  y: number;
}

const getDirections = (coordinates: Coordinate[]) => {
  const sequence: string[] = [];

  while (coordinates.length) {
    let start = coordinates.shift()!;
    let end = coordinates.shift()!;

    if (end.x === -1 && end.y === -1) {
      sequence.push("A");

      end = coordinates.shift()!;
    }

    if (!end) break;

    const dx = end.x - start.x;
    const dy = end.y - start.y;

    if (dy === 0) {
      if (dx < 0) sequence.push("<");
      else sequence.push(">");
    }

    if (dx === 0) {
      if (dy < 0) sequence.push("^");
      else sequence.push("v");
    }

    coordinates = [end, ...coordinates];
  }

  return sequence;
};

const moveArmOtherOption = (keypad: string[][], instructions: string[]) => {
  const forbiddenCoordinate = keypad.reduce(
    (acc, arr, index) => {
      const target = arr.indexOf("#");
      if (target !== -1) return (acc = { x: target, y: index });
      return acc;
    },
    { x: 0, y: 0 },
  );

  instructions.forEach((instruction) => {
    const sequence = ("A" + instruction).split("");

    let coordinates = sequence.map((char) =>
      keypad.reduce(
        (acc, arr, index) => {
          const target = arr.indexOf(char);
          if (target !== -1) return (acc = { x: target, y: index });
          return acc;
        },
        { x: 0, y: 0 },
      ),
    );

    // const maxLength = coordinates.reduce((acc, current, index) => {
    //   const next = index
    //   return acc;
    // }, 0);

    const routes: Coordinate[][] = [[]];

    let stack = coordinates.map(({ x, y }) => ({ x, y, trace: [] as Coordinate[] }));

    console.log(coordinates);

    while (stack.length) {
      let current = stack.shift()!;
      let next = stack.shift()!;

      if (!next) break;

      console.log(current, next);
      stack = [next, ...stack];
    }
  });
};

const moveArm = (keypad: string[][], instructions: string[]) => {
  const forbiddenCoordinate = keypad.reduce(
    (acc, arr, index) => {
      const target = arr.indexOf("#");
      if (target !== -1) return (acc = { x: target, y: index });
      return acc;
    },
    { x: 0, y: 0 },
  );

  return instructions.map((instruction) => {
    const sequence = ("A" + instruction).split("");

    const coordinates = sequence.map((char) =>
      keypad.reduce(
        (acc, arr, index) => {
          const target = arr.indexOf(char);
          if (target !== -1) return (acc = { x: target, y: index });
          return acc;
        },
        { x: 0, y: 0 },
      ),
    );

    let amountOfOptions = 0;
    let bla: Record<number, Coordinate[]> = { 0: [] };

    const paths = coordinates.reduce(
      (acc: Coordinate[][], curr, index) => {
        if (index + 1 === coordinates.length) return acc;
        if (index === 0) acc = acc.map((array) => [...array, curr]);

        const { x, y } = curr;
        const { x: nx, y: ny } = coordinates[index + 1];

        if (!bla[index]) bla = { ...bla, [index]: [] };

        if (x === nx && y !== ny) {
          const dy = ny - y;
          const totalDy = Math.abs(dy * -1);

          Array.from({ length: totalDy }, (_, i) =>
            dy > 0 ? curr.y + i + 1 : curr.y - i - 1,
          ).forEach((value) => {
            acc = acc.map((array) => [...array, { x, y: value }]);
            bla[index].push({ x, y: value });
          });

          acc = acc.map((array) => [...array, { x: -1, y: -1 }]);
        } else if (x !== nx && y === ny) {
          const dx = nx - x;
          const totalDx = Math.abs(dx * -1);

          Array.from({ length: totalDx }, (_, i) =>
            dx > 0 ? curr.x + i + 1 : curr.x - i - 1,
          ).forEach((value) => {
            acc = acc.map((array) => [...array, { x: value, y }]);
            bla[index].push({ x: value, y });
          });

          acc = acc.map((array) => [...array, { x: -1, y: -1 }]);
        } else if (x !== nx && y !== ny) {
          const dx = nx - x;
          const dy = ny - y;

          const differentOptions = Math.abs(nx - x) + Math.abs(ny - y);

          let options: Coordinate[][] = Array.from({ length: differentOptions }, () => []);

          if (dx > 1 || dx < -1) {
            const totalDx = Math.abs(dx * -1);
            const array = Array.from({ length: totalDx }, (_) => ({ x: dx < -1 ? -1 : 1, y: 0 }));

            options = options.map((option) => [...option, ...array]);
          } else {
            const array = [{ x: dx, y: 0 }];

            options = options.map((option) => [...option, ...array]);
          }

          if (dy > 1 || dy < -1) {
            const totalDy = Math.abs(dy * -1);
            const array = Array.from({ length: totalDy }, (_) => ({ x: 0, y: dy < -1 ? -1 : 1 }));

            options = options.map((option) => [...option, ...array]);
          } else {
            const array = [{ x: 0, y: dy }];

            options = options.map((option) => [...option, ...array]);
          }

          const rearrangedOptions = options.reduce(
            (acc: Coordinate[][], curr, index) => {
              if (index === 0) acc[index].push(...curr);
              else {
                curr = acc[index - 1];
                const last = curr[curr.length - 1];
                const rest = curr.slice(0, -1);
                curr = [last, ...rest];

                if (!acc[index]) acc.push([]);
                acc[index].push(...curr);
              }
              return acc;
            },
            [[]],
          );

          const finalOptions = rearrangedOptions.map((option) => {
            let currx = curr.x;
            let curry = curr.y;

            return option.map(({ x, y }) => {
              currx += x;
              curry += y;

              bla[index].push({ x: currx, y: curry });

              return {
                x: currx,
                y: curry,
              };
            });
          });

          // console.log(curr.x, curr.y, sequence, finalOptions, amountOfOptions);

          const length = differentOptions + amountOfOptions;

          Array.from({ length: differentOptions }).forEach((_, i) => {
            if (!acc[i]) acc.push([...acc[0].slice(0, acc[0].length - finalOptions[i].length - 1)]);
            if (!acc[i + amountOfOptions])
              acc.push([...acc[0].slice(0, acc[0].length - finalOptions[i].length - 1)]);
            acc[i].push(...finalOptions[i], { x: -1, y: -1 });
            if (amountOfOptions > 0)
              acc[i + amountOfOptions].push(...finalOptions[i], { x: -1, y: -1 });
          });

          amountOfOptions += differentOptions;
        } else {
          acc = acc.map((array) => [...array, { x, y }, { x: -1, y: -1 }]);
        }

        return acc;
      },
      [[]],
    );

    console.log(bla);

    // console.log(sequence, amountOfOptions);

    const filteredPaths = paths.filter(
      (path) => !JSON.stringify(path).includes(JSON.stringify(forbiddenCoordinate)),
    );

    // console.log(sequence, filteredPaths);

    return filteredPaths.map((path) => getDirections(path).join(""));
  });
};

// v<<A>>^A<A>AvA<^AA>A<vAAA>^A

export const part01 = (file: string) => {
  const input = getInput(file);

  const sequences = moveArm(numericKeypad, input);
  // const newSequences = moveArmOtherOption(numericKeypad, input);
  // console.log(sequences);
  // sequences zijn goed
  // const sSequences = sequences.map((sequences) => moveArm(directionalKeypad, sequences));
  // console.log(sSequences);

  // const shortS = sSequences.map((sequence) =>
  //   sequence.map((bla) => bla.reduce((acc, arr) => (arr < acc ? arr : acc))),
  // );

  // console.log(shortS);

  // const tSequences = sSequences.map((sequences) =>
  //   sequences.map((sequences) => moveArm(directionalKeypad, sequences)),
  // );

  // console.log(tSequences);
  // const shortT = tSequences.map((sequence) =>
  //   sequence.map((bla) => bla.reduce((acc, arr) => (arr < acc ? arr : acc))),
  // );

  // const shortestSequences = shortT.map((sequences) =>
  //   sequences.reduce((acc, arr) => {
  //     if (arr.length < acc.length) acc = arr;
  //     return acc;
  //   }),
  // );

  // console.log(shortestSequences);

  // return tSequences.reduce((acc, arr, index) => {
  //   const multiplier = input[index].match(/\d+/g);
  //   console.log(arr.length, multiplier);
  //   return (acc = acc + arr.length * Number(multiplier));
  // }, 0);
};
