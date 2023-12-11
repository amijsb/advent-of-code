import { Coordinate, findLoop, getInput } from "./01";

// makes use of the winding number algorithm, which I'm still trying to understand

const isLeft = (p1: Coordinate, p2: Coordinate, p3: Coordinate): boolean =>
  (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y) > 0;

const windingNumbers = (coordinates: Coordinate[], loop: Coordinate[]) => {
  const numbers: number[] = [];

  coordinates.forEach((coordinate) => {
    let windingNumber = 0;

    loop.forEach((_, i) => {
      const vertex1 = loop[i];
      const vertex2 = loop[(i + 1) % loop.length];

      if (vertex1.y <= coordinate.y) {
        if (vertex2.y > coordinate.y && isLeft(vertex1, vertex2, coordinate)) {
          windingNumber += 1;
        }
      } else {
        if (vertex2.y <= coordinate.y && !isLeft(vertex1, vertex2, coordinate)) {
          windingNumber -= 1;
        }
      }
    });

    numbers.push(windingNumber);
  });

  return numbers.filter((num) => num !== 0).length;
};

export const part02 = (file: string) => {
  const input = getInput(file);
  const loop = findLoop(input);

  const allCoordinates = input
    .map((line, y) =>
      line.map((_, x) =>
        JSON.stringify({
          x,
          y,
        }),
      ),
    )
    .flat();

  const notInLoop = allCoordinates.filter((co) => !loop.has(co));

  const loopValues = [...loop].map((co) => JSON.parse(co));
  const parsedCoordinates = notInLoop.map((co) => JSON.parse(co));

  return windingNumbers(parsedCoordinates, loopValues);
};
