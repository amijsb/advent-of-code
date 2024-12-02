import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n").map((line) => line.split(" "));

  return lines.map((line) => line.map(Number));
};

export const checkSafety = (report: number[], direction = "", difference = 0, safe = true) =>
  report.reduce((acc, level, index) => {
    if (safe === false) return 0;

    if (index === 1) {
      if (level < acc) direction = "descending";
      if (level > acc) direction = "ascending";
    }

    if (direction === "ascending") difference = level - acc;
    if (direction === "descending") difference = acc - level;

    if (difference < 1 || difference > 3) {
      safe = false;
      return 0;
    } else if (index === report.length - 1) return 1;
    else return (acc = level);
  });

export const part01 = (file: string) => {
  const reports = getInput(file);

  const safety = reports.map((report) => checkSafety(report));
  return safety.reduce((acc, value) => acc + value, 0);
};
