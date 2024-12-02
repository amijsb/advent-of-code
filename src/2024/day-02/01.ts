import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const lines = fileContent.split("\n").map((line) => line.split(" "));

  return lines.map((line) => line.map(Number));
};

export const checkSafety = (
  report: number[],
  direction = "",
  difference = 0,
  index = 0,
  safe = true,
): number => {
  while (safe === true) {
    if (index === 0) {
      if (report[index] < report[index + 1]) direction = "ascending";
      if (report[index] > report[index + 1]) direction = "descending";

      index++;
      continue;
    }

    if (direction === "ascending") difference = report[index] - report[index - 1];
    if (direction === "descending") difference = report[index - 1] - report[index];

    if (difference < 1 || difference > 3) {
      safe = false;
      break;
    } else if (index === report.length - 1) break;

    index++;
  }

  return safe ? 1 : 0;
};

export const part01 = (file: string) => {
  const reports = getInput(file);

  const safety = reports.map((report) => checkSafety(report));
  return safety.reduce((acc, value) => acc + value, 0);
};
