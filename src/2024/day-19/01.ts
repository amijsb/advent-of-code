import { readFileSync } from "fs";

export const getInput = (file: string) => {
  const fileContent = readFileSync(file, "utf-8");
  const [towels, patterns] = fileContent.split("\n\n");

  return {
    towels: towels.split(", "),
    patterns: patterns.split("\n"),
  };
};

export const makeDesigns = (towels: string[], patterns: string[]) => {
  let possible = 0;
  let allPossible = 0;

  patterns.forEach((pattern) => {
    const filteredTowels = towels.filter((towel) => pattern.includes(towel));
    let memory: Record<string, number> = {};

    const checkDesign = (combo: string, pattern: string, n: number) => {
      if (memory[combo]) return memory[combo];
      if (combo === pattern) return 1;
      if (combo.length > pattern.length) return 0;

      for (const towel of filteredTowels) {
        const nextCombo = combo + towel;

        if (nextCombo === pattern.slice(0, nextCombo.length))
          n += checkDesign(nextCombo, pattern, 0);
      }

      memory = { ...memory, [combo]: n };
      return n;
    };

    const count = checkDesign("", pattern, 0);

    allPossible += count;
    if (count > 0) possible++;
  });

  return { possible, allPossible };
};

export const part01 = (file: string) => {
  const { towels, patterns } = getInput(file);

  return makeDesigns(towels, patterns).possible;
};
