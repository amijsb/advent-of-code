import { getInput, updateNumber } from "./01";

const getSeedsRanges = (seeds: number[]) =>
  seeds.reduce((acc: number[][], current: number, index: number) => {
    if (index % 2 === 0) {
      acc.push([current, current + seeds[index + 1] - 1]);
    }
    return acc;
  }, []);

const hasOverlap = (start: number, end: number, source: number, sourceEnd: number) => {
  if (start >= source && end <= sourceEnd) return true;
  if (start < source && end >= source && end <= sourceEnd) return true;
  if (start >= source && start <= sourceEnd && end > sourceEnd) return true;
  return false;
};

const testRange = (range: number[], line: number[], retest: number[][], moveOn: number[][]) => {
  const [start, end] = range;

  const [destination, source, sourceRange] = line;
  const sourceEnd = source + sourceRange - 1;

  if (start >= source && end <= sourceEnd) {
    const newStart = updateNumber(start, source, destination);
    const newEnd = updateNumber(end, source, destination);
    moveOn.push([newStart, newEnd]);
  }

  if (start < source && end >= source && end <= sourceEnd) {
    const newStart = updateNumber(source, source, destination);
    const newEnd = updateNumber(end, source, destination);

    moveOn.push([newStart, newEnd]);
    retest.push([start, source - 1]);
  }

  if (start >= source && start <= sourceEnd && end > sourceEnd) {
    const newStart = updateNumber(start, source, destination);
    const newEnd = updateNumber(sourceEnd, source, destination);

    moveOn.push([newStart, newEnd]);
    retest.push([sourceEnd + 1, end]);
  }
};

const getLocationNumbers = (seedRanges: number[][], maps: number[][][]) => {
  let ranges = seedRanges;

  maps.forEach((map) => {
    let moveOn: number[][] = [];
    let retest: number[][] = [];

    ranges.forEach((range) => {
      const [start, end] = range;

      const matchingLine = map.find((line) =>
        hasOverlap(start, end, line[1], line[1] + line[2] - 1),
      );

      matchingLine ? testRange(range, matchingLine, retest, moveOn) : moveOn.push([start, end]);
    });

    if (retest.length > 0) {
      retest.forEach((range) => {
        const [start, end] = range;

        const matchingLine = map.find((line) =>
          hasOverlap(start, end, line[1], line[1] + line[2] - 1),
        );

        matchingLine ? testRange(range, matchingLine, retest, moveOn) : moveOn.push([start, end]);
      });
    }

    ranges = moveOn;
  });

  return ranges;
};

export const part02 = (file: string) => {
  const { seeds, maps } = getInput(file);
  const seedsRanges = getSeedsRanges(seeds);

  const locationNumbers = getLocationNumbers(seedsRanges, maps).flat();
  return Math.min(...locationNumbers);
};
