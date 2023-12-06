import { readFileSync } from "fs";

interface Time {
  distance: number;
  time: number;
}

interface Race {
  availableTime: number | bigint;
  distanceToBeat: number | bigint;
  count: number | bigint;
  holdButton: number | bigint;
  traveledDistance: number | bigint;
}

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");

  const [times, distances] = lines.map((line) => line.match(/(\d)+/g)!);
  return times?.map((time, i) => ({
    distance: Number(distances[i]!),
    time: Number(time),
  }));
};

export const race = ({
  availableTime,
  distanceToBeat,
  count,
  holdButton,
  traveledDistance,
}: Race) => {
  while (availableTime > 0) {
    //@ts-ignore
    traveledDistance = holdButton * availableTime;

    if (traveledDistance > distanceToBeat) {
      count++;
    }

    availableTime--;
    holdButton++;
  }

  return count;
};

const getBestTimes = (times: Time[]) =>
  times.map(
    ({ distance, time }) =>
      race({
        availableTime: time,
        distanceToBeat: distance,
        count: 0,
        holdButton: 0,
        traveledDistance: 0,
      }) as number,
  );

export const part01 = (file: string) => {
  const input: Time[] = getInput(file);
  const bestTimes = getBestTimes(input);

  return bestTimes.reduce((a, b) => a * b);
};
