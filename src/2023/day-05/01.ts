import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const input = fileContent.split(/\n\n/);

  const seeds = input[0].split("seeds: ")[1].split(" ").map(Number);
  const maps = input.map((line) =>
    line.match(/\b(\d+(?:\s+\d+){2})\b/g)!.map((match) => match.split(/\s+/).map(Number)),
  );

  maps.shift();

  return { seeds, maps };
};

const getLocationNumbers = (seeds: number[], maps: number[][][]) =>
  seeds.map((seed) => {
    let currentNumber = seed;

    maps.forEach((map) => {
      const dedicatedLine = map.find((line) => {
        const [_, source, range] = line;
        return currentNumber >= source && currentNumber <= source + range - 1;
      });

      if (dedicatedLine) {
        const [destination, source, range] = dedicatedLine;

        if (currentNumber >= source && currentNumber <= source + range - 1) {
          source > destination
            ? (currentNumber -= Math.abs(source - destination))
            : (currentNumber += Math.abs(source - destination));
        }
      }
    });

    return currentNumber;
  });

export const part01 = (file: string) => {
  const { seeds, maps } = getInput(file);
  const locationNumbers = getLocationNumbers(seeds, maps);

  return Math.min(...locationNumbers);
};
