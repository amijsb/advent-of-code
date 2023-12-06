import { readFileSync } from "fs";
import { race } from "./01";

const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");

  const [times, distances] = lines.map((line) => line.match(/(\d)+/g)!);

  const totalTime = times.reduce((a, b) => a + b);
  const totalDistance = distances.reduce((a, b) => a + b);

  return { time: Number(totalTime), distance: Number(totalDistance) };
};

export const part02 = (file: string) => {
  const { time, distance } = getInput(file);
  const bestTimes = race({
    availableTime: BigInt(time),
    distanceToBeat: BigInt(distance),
    count: 0n,
    holdButton: 0n,
    traveledDistance: 0n,
  }) as bigint;

  return Number(bestTimes);
};
