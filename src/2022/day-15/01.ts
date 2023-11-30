import { readFileSync } from "fs";

interface Coordinate {
  sensor: { [key: string]: number };
  beacon: { [key: string]: number };
}

export interface MDco extends Coordinate {
  manhattanDistance: number;
}

const formatCoordinate = (element: string[]) => {
  const x = Number(element[0].slice(2));
  const y = Number(element[1].slice(2));

  return { x, y };
};

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");

  const coordinates = lines.map((row) => {
    const sensorX = row.indexOf("x");
    const sensorEnd = row.indexOf(":");
    const beaconX = row.lastIndexOf("x");
    const sensor = row.slice(sensorX, sensorEnd).split(", ");
    const beacon = row.slice(beaconX).split(", ");
    const { x, y } = formatCoordinate(sensor);
    const xB = formatCoordinate(beacon).x;
    const yB = formatCoordinate(beacon).y;

    return { sensor: { x, y }, beacon: { x: xB, y: yB } };
  });

  return coordinates;
};

export const manhattanDistance = (coordinates: Coordinate[]) =>
  coordinates.map((coordinate) => {
    const { sensor, beacon } = coordinate;
    const manhattanDistance = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);

    return { ...coordinate, manhattanDistance };
  });

export const beacons = (coordinates: MDco[], targetRow: number) => {
  const set = new Set();

  coordinates.forEach((coordinate) => {
    const { sensor, beacon, manhattanDistance } = coordinate;
    const { x, y } = sensor;

    if (y + manhattanDistance >= targetRow && y - manhattanDistance <= targetRow) {
      const distanceToRow = Math.abs(y - targetRow);
      const pointsOnRow = Math.abs(manhattanDistance - distanceToRow) * 2 + 1;
      const startX = x - Math.abs(manhattanDistance - distanceToRow);

      const points = Array.from({ length: pointsOnRow }, (_, i) =>
        JSON.stringify([startX + i, targetRow]),
      );

      points.forEach((point) => set.add(point));
    }

    if (beacon.y === targetRow) {
      set.delete(JSON.stringify([beacon.x, beacon.y]));
    }
  });

  return set.size;
};

export const part01 = (file: string) => {
  const input = getInput(file);
  const distances = manhattanDistance(input);

  // input
  return beacons(distances, 2000000);
  // test-input
  // return beacons(distances, 10);
};
