import { readFileSync } from "fs";

// const damaged = "#";
// const operational = ".";
// const unknown = "?";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");

  const lines = fileContent.split("\n").map((line) => line.split(" "));

  return lines.map(([input, patterns]) => ({
    input: input.split(""),
    patterns: patterns.split(",").map(Number),
  }));
};

// // ???.### 1,1,3

// const checkRow = (
//   input: string[],
//   patterns: number[],
//   patternIndex = -1,
//   groupLength = 0,
// ): number => {
//   const match = input.map((spring, index) => {
//     if (spring === damaged) {
//       if (groupLength === 0) patternIndex++;
//       if (patterns[patternIndex] > patterns.length - 1) return 0;
//       groupLength++;
//     }

//     if (spring === operational) {
//     }

//     if (spring === unknown) {
//       // if (patterns[])
//     }

//     if (groupLength === 0 && patternIndex === patterns.length - 1) return 1;
//     else if (groupLength === patterns[patterns.length - 1] && patternIndex === patterns.length - 1)
//       return 1;
//     else return 0;
//   });

//   return match.reduce((acc, curr) => acc + curr, 0);
// };

// export const part01 = (file: string) => {
//   const input = getInput(file);

//   return input.map(({ input, patterns }) => checkRow(input, patterns));
// };
