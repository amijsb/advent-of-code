import { checkSafety, getInput } from "./01";

const removeElement = (array: number[], index: number) => array.filter((_, i) => i !== index);

export const part02 = (file: string) => {
  const reports = getInput(file);

  const safety = reports.map((report) =>
    report.map((_, index) => {
      const newReport = removeElement(report, index);
      return checkSafety(newReport);
    }),
  );

  return safety.filter((report) => report.includes(1)).length;
};
