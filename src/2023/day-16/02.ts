import { Coordinate, energize, getInput, Option } from "./01";

const bestEnergizer = (map: Option[][]) => {
  const xs = Array.from({ length: map[0].length }, (_, i) => i);
  const ys = Array.from({ length: map.length }, (_, i) => i);

  const coordinates: Coordinate[] = [];

  xs.forEach((x) => {
    coordinates.push({ x, y: 0, direction: "down" });
    coordinates.push({ x, y: map.length - 1, direction: "up" });
  });

  ys.forEach((y) => {
    coordinates.push({ x: 0, y, direction: "right" });
    coordinates.push({ x: map[0].length - 1, y, direction: "left" });
  });

  const values = coordinates.map((coordinate) => energize(coordinate, map));
  return Math.max(...values);
};

export const part02 = (file: string) => {
  const input = getInput(file);
  return bestEnergizer(input as Option[][]);
};
